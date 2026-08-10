import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { recordApproval } from "../protocol/approvals";
import { captureEvidence } from "../protocol/evidence";
import { transitionTo, transitionToComplete } from "../protocol/transition";
import type { RunDefinition, Risk } from "../protocol/types";
import { computeWorkspaceFingerprint } from "../protocol/workspace-fingerprint";

const DOGFOOD_CASES = [
  ["feature", "feature", "standard"],
  ["bug-fix", "bug fix", "standard"],
  ["refactor", "refactor", "standard"],
  ["dependency-change", "dependency change", "standard"],
  ["persistence-change", "persistence change", "high"],
  ["ci-change", "CI change", "standard"],
  ["stale-refresh", "stale verification", "standard"],
  ["blocked-resume", "blocked work", "standard"],
  ["high-risk-approval", "high-risk change", "high"],
  ["abandoned", "abandoned change", "standard"],
] as const;

export type DogfoodCase = {
  id: string;
  changeType: string;
  risk: Risk;
  status: "passed" | "failed";
  durationMs: number;
  frictionEvents: number;
  falseBlock: boolean;
  failure?: string;
};

export type DogfoodReport = {
  schemaVersion: 1;
  campaignId: "controlled-v0-feature-complete";
  controlled: true;
  startedAt: string;
  cases: DogfoodCase[];
  summary: { total: number; passed: number; failed: number; falseBlocks: number };
  limitations: string[];
};

export async function runDogfood(): Promise<DogfoodReport> {
  const cases: DogfoodCase[] = [];
  const startedAt = new Date().toISOString();
  for (const [id, changeType, risk] of DOGFOOD_CASES) {
    cases.push(await runCase(id, changeType, risk));
  }
  return {
    schemaVersion: 1,
    campaignId: "controlled-v0-feature-complete",
    controlled: true,
    startedAt,
    cases,
    summary: {
      total: cases.length,
      passed: cases.filter((item) => item.status === "passed").length,
      failed: cases.filter((item) => item.status === "failed").length,
      falseBlocks: cases.filter((item) => item.falseBlock).length,
    },
    limitations: [
      "controlled temporary repositories are not real operator dogfood",
      "frictionEvents count protocol interactions, not human time or agent quality",
      "the run does not execute an external provider or establish sandbox enforcement",
    ],
  };
}

async function runCase(id: string, changeType: string, risk: Risk): Promise<DogfoodCase> {
  const started = performance.now();
  const root = mkdtempSync(join(tmpdir(), `extremely-hardcore-dogfood-${id}-`));
  try {
    const runPath = createRun(root, id, risk);
    const frictionEvents = await executeCase(id, root, runPath);
    return {
      id,
      changeType,
      risk,
      status: "passed",
      durationMs: Math.round(performance.now() - started),
      frictionEvents,
      falseBlock: false,
    };
  } catch (error) {
    return {
      id,
      changeType,
      risk,
      status: "failed",
      durationMs: Math.round(performance.now() - started),
      frictionEvents: 0,
      falseBlock: true,
      failure: error instanceof Error ? error.message : String(error),
    };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

async function executeCase(id: string, root: string, runPath: string): Promise<number> {
  if (id === "abandoned") {
    const result = transitionTo(runPath, "abandoned", {
      workspaceFingerprint: computeWorkspaceFingerprint(root),
      reason: "operator stopped the change",
    });
    assertOk(result, "abandon");
    return 1;
  }

  await captureEvidence({ runPath, criterionId: "checks-pass", command: ["bun", "-e", "process.exit(0)"] });
  let frictionEvents = 1;
  if (id === "stale-refresh") {
    writeFileSync(join(root, "tracked.txt"), "changed during verification\n");
    const stale = transitionToComplete(runPath, {
      workspaceFingerprint: computeWorkspaceFingerprint(root),
    });
    if (stale.ok || !stale.errors.some(({ code }) => code === "evidence.stale")) {
      throw new Error("stale verification was not rejected");
    }
    await captureEvidence({ runPath, criterionId: "checks-pass", command: ["bun", "-e", "process.exit(0)"] });
    frictionEvents += 2;
  }
  if (id === "blocked-resume") {
    updateRun(runPath, (run) => {
      run.blockers = [{ id: "dependency", description: "Dependency is pending.", status: "open" }];
    });
    const blocked = transitionTo(runPath, "blocked", {
      workspaceFingerprint: computeWorkspaceFingerprint(root),
      reason: "dependency is pending",
    });
    assertOk(blocked, "block");
    updateRun(runPath, (run) => {
      run.blockers = [{ id: "dependency", description: "Dependency is pending.", status: "resolved" }];
    });
    const resumed = transitionTo(runPath, "implemented", {
      workspaceFingerprint: computeWorkspaceFingerprint(root),
      reason: "dependency resolved",
    });
    assertOk(resumed, "resume");
    frictionEvents += 2;
  }
  if (id === "persistence-change" || id === "high-risk-approval") {
    const missing = transitionToComplete(runPath, {
      workspaceFingerprint: computeWorkspaceFingerprint(root),
    });
    if (missing.ok || !missing.errors.some(({ code }) => code === "approval.required")) {
      throw new Error("high-risk completion was not approval-gated");
    }
    recordApproval(runPath, {
      approver: "controlled-dogfood",
      decision: "approved",
      gate: "complete",
      workspaceFingerprint: computeWorkspaceFingerprint(root),
      reason: "controlled approval path",
    });
    frictionEvents += 2;
  }
  const completed = transitionToComplete(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(root),
  });
  assertOk(completed, "complete");
  return frictionEvents + 1;
}

function createRun(root: string, id: string, risk: Risk): string {
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["config", "user.email", "dogfood@example.com"], { cwd: root });
  execFileSync("git", ["config", "user.name", "Controlled Dogfood"], { cwd: root });
  writeFileSync(join(root, "tracked.txt"), "baseline\n");
  execFileSync("git", ["add", "tracked.txt"], { cwd: root });
  execFileSync("git", ["commit", "-qm", "baseline"], { cwd: root });
  const runPath = join(root, ".extremely-hardcore", "runs", id);
  mkdirSync(runPath, { recursive: true });
  const run: RunDefinition = {
    schemaVersion: 1,
    changeId: id,
    initialState: "implemented",
    risk,
    acceptanceCriteria: [{ id: "checks-pass", description: "Checks pass.", evidenceIds: [] }],
    blockers: [],
  };
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);
  return runPath;
}

function updateRun(runPath: string, update: (run: RunDefinition) => void): void {
  const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
  update(run);
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);
}

function assertOk(result: { ok: boolean; errors: Array<{ code: string }> }, operation: string): void {
  if (!result.ok) {
    throw new Error(`${operation} failed: ${result.errors.map(({ code }) => code).join(", ")}`);
  }
}
