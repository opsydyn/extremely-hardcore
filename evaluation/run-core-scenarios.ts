import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { transitionToComplete } from "../protocol/transition";
import type { EvidenceRecord, RunDefinition, ValidationResult } from "../protocol/types";
import { validateCompletion } from "../protocol/validate-run";
import { computeWorkspaceFingerprint } from "../protocol/workspace-fingerprint";
import type { EvaluationReport, FailureCategory, ScenarioResult } from "./types";

const WORKSPACE_FINGERPRINT = "evaluation-workspace";

type TemporaryRun = {
  root: string;
  runPath: string;
};

export function runCoreScenarios(): EvaluationReport {
  return {
    schemaVersion: 1,
    results: [
      runValidationScenario(
        "uncovered-criterion",
        ["criterion.uncovered"],
        (run) => validateCompletion(run.runPath, { workspaceFingerprint: WORKSPACE_FINGERPRINT }),
      ),
      runValidationScenario("failed-evidence", ["evidence.failed"], (run) => {
        writeEvidence(run, { exitCode: 1 });
        return validateCompletion(run.runPath, { workspaceFingerprint: WORKSPACE_FINGERPRINT });
      }),
      runStaleEvidenceScenario(),
      runValidationScenario("missing-evidence-record", ["evidence.missing"], (run) => {
        updateCriterionEvidence(run, ["missing-evidence"]);
        return validateCompletion(run.runPath, { workspaceFingerprint: WORKSPACE_FINGERPRINT });
      }),
      runValidationScenario("missing-evidence-log", ["evidence.log-missing"], (run) => {
        writeEvidence(run, { writeLog: false });
        return validateCompletion(run.runPath, { workspaceFingerprint: WORKSPACE_FINGERPRINT });
      }),
      runValidationScenario("open-blocker", ["blocker.open"], (run) => {
        writeEvidence(run);
        updateRun(run, (definition) => {
          definition.blockers = [
            { id: "review-required", description: "Review is unresolved.", status: "open" },
          ];
        });
        return validateCompletion(run.runPath, { workspaceFingerprint: WORKSPACE_FINGERPRINT });
      }),
      runRepeatedCompletionScenario(),
    ],
  };
}

function runValidationScenario(
  category: Exclude<FailureCategory, "stale-evidence" | "repeated-completion">,
  expectedErrorCodes: string[],
  execute: (run: TemporaryRun) => ValidationResult,
): ScenarioResult {
  return runScenario(category, expectedErrorCodes, () => {
    const run = createTemporaryRun();
    try {
      return execute(run).errors.map(({ code }) => code);
    } finally {
      cleanup(run);
    }
  });
}

function runStaleEvidenceScenario(): ScenarioResult {
  return runScenario("stale-evidence", ["evidence.stale"], () => {
    const run = createTemporaryRun({ git: true });
    try {
      const before = computeWorkspaceFingerprint(run.root);
      writeEvidence(run, { workspaceFingerprint: before });
      writeFileSync(join(run.root, "tracked.txt"), "changed by scenario\n");
      return validateCompletion(run.runPath, {
        workspaceFingerprint: computeWorkspaceFingerprint(run.root),
      }).errors.map(({ code }) => code);
    } finally {
      cleanup(run);
    }
  });
}

function runRepeatedCompletionScenario(): ScenarioResult {
  return runScenario("repeated-completion", ["transition.invalid-state"], () => {
    const run = createTemporaryRun();
    try {
      writeEvidence(run);
      const first = transitionToComplete(run.runPath, {
        workspaceFingerprint: WORKSPACE_FINGERPRINT,
      });
      if (!first.ok) {
        throw new Error(`first completion failed: ${first.errors.map(({ code }) => code).join(", ")}`);
      }
      return transitionToComplete(run.runPath, {
        workspaceFingerprint: WORKSPACE_FINGERPRINT,
      }).errors.map(({ code }) => code);
    } finally {
      cleanup(run);
    }
  });
}

function runScenario(
  category: FailureCategory,
  expectedErrorCodes: string[],
  execute: () => string[],
): ScenarioResult {
  const started = performance.now();
  try {
    const observedErrorCodes = execute();
    return {
      scenarioId: `core.${category}`,
      category,
      expectedErrorCodes,
      observedErrorCodes,
      status: expectedErrorCodes.every((code) => observedErrorCodes.includes(code))
        ? "passed"
        : "failed",
      durationMs: Math.round(performance.now() - started),
    };
  } catch (error) {
    return {
      scenarioId: `core.${category}`,
      category,
      expectedErrorCodes,
      observedErrorCodes: [],
      status: "failed",
      durationMs: Math.round(performance.now() - started),
      failure: error instanceof Error ? error.message : String(error),
    };
  }
}

function createTemporaryRun(options: { git?: boolean } = {}): TemporaryRun {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-evaluation-"));
  if (options.git) {
    execFileSync("git", ["init", "-q"], { cwd: root });
    execFileSync("git", ["config", "user.email", "evaluation@example.com"], { cwd: root });
    execFileSync("git", ["config", "user.name", "Evaluation"], { cwd: root });
    writeFileSync(join(root, "tracked.txt"), "baseline\n");
    execFileSync("git", ["add", "tracked.txt"], { cwd: root });
    execFileSync("git", ["commit", "-qm", "baseline"], { cwd: root });
  }

  const runPath = join(root, ".extremely-hardcore", "runs", "core-pressure-scenario");
  mkdirSync(join(runPath, "evidence"), { recursive: true });
  mkdirSync(join(runPath, "logs"), { recursive: true });
  writeFileSync(join(runPath, "transitions.jsonl"), "");
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(baseRun(), null, 2)}\n`);
  return { root, runPath };
}

function baseRun(): RunDefinition {
  return {
    schemaVersion: 1,
    changeId: "core-pressure-scenario",
    initialState: "implemented",
    risk: "standard",
    acceptanceCriteria: [
      {
        id: "criterion-a",
        description: "The scenario validation is recorded.",
        evidenceIds: [],
      },
    ],
    blockers: [],
  };
}

function writeEvidence(
  run: TemporaryRun,
  options: {
    evidenceId?: string;
    exitCode?: number;
    workspaceFingerprint?: string;
    writeLog?: boolean;
  } = {},
): void {
  const evidenceId = options.evidenceId ?? "evidence-a";
  const logPath = `logs/${evidenceId}.log`;
  const log = "scenario output\n";
  if (options.writeLog !== false) {
    writeFileSync(join(run.runPath, logPath), log);
  }
  const evidence: EvidenceRecord = {
    schemaVersion: 1,
    evidenceId,
    criterionId: "criterion-a",
    command: { executable: "bun", args: ["test"] },
    startedAt: "2026-07-14T00:00:00.000Z",
    durationMs: 1,
    exitCode: options.exitCode ?? 0,
    workspaceFingerprint: options.workspaceFingerprint ?? WORKSPACE_FINGERPRINT,
    logPath,
    logSha256: createHash("sha256").update(log).digest("hex"),
    summary: "scenario output",
    truncated: false,
  };
  writeFileSync(
    join(run.runPath, "evidence", `${evidenceId}.json`),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );
  updateCriterionEvidence(run, [evidenceId]);
}

function updateCriterionEvidence(run: TemporaryRun, evidenceIds: string[]): void {
  updateRun(run, (definition) => {
    definition.acceptanceCriteria[0]!.evidenceIds = evidenceIds;
  });
}

function updateRun(run: TemporaryRun, update: (definition: RunDefinition) => void): void {
  const definition = JSON.parse(readFileSync(join(run.runPath, "run.json"), "utf8")) as RunDefinition;
  update(definition);
  writeFileSync(join(run.runPath, "run.json"), `${JSON.stringify(definition, null, 2)}\n`);
}

function cleanup(run: TemporaryRun): void {
  rmSync(run.root, { recursive: true, force: true });
}
