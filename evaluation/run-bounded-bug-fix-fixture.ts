import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, resolve } from "node:path";
import { readTransitions } from "../protocol/transition";
import { validateCompletion } from "../protocol/validate-run";
import { computeWorkspaceFingerprint } from "../protocol/workspace-fingerprint";
import type {
  ActionFixtureExecutor,
  ActionFixtureFailure,
  ActionFixtureRequest,
  ActionFixtureResult,
  ActionFixtureStage,
  ActionFixtureStageResult,
  ArtifactDigest,
} from "./types";

const FIXTURE_ROOT = fileURLToPath(new URL("./fixtures/bounded-bug-fix", import.meta.url));

export async function runBoundedBugFixFixture(options: {
  outputDir: string;
  executor: ActionFixtureExecutor;
}): Promise<ActionFixtureResult> {
  const outputDir = resolve(options.outputDir);
  if (existsSync(outputDir)) {
    throw new Error(`output directory already exists: ${outputDir}`);
  }

  const workspace = join(outputDir, "workspace");
  cpSync(FIXTURE_ROOT, workspace, { recursive: true });
  const baselineCommit = initialiseGitWorkspace(workspace);

  const runPath = join(workspace, ".extremely-hardcore", "runs", "bounded-bug-fix");
  const request = (stage: ActionFixtureStage): ActionFixtureRequest => ({
    fixtureId: "action.bounded-bug-fix",
    stage,
    workspace,
    runPath,
    taskPath: join(workspace, "FIXTURE.md"),
    criterionId: "required-test-passes",
    requiredTestCommand: ["bun", "test", "./fixture-tests/release-label.fixture.ts"],
  });

  await options.executor(request("fix"));
  const stageAFingerprint = computeWorkspaceFingerprint(workspace);
  const stageAFailures = [
    ...validateAllowedDiff(workspace, baselineCommit, ["src/release-label.ts"]),
    ...validateRequiredTest(workspace, request("fix").requiredTestCommand),
    ...toStageAEvidenceFailures(
      validateCompletion(runPath, { workspaceFingerprint: stageAFingerprint }),
    ),
    ...validateNoTransitions(runPath),
  ];
  const stageA = stageResult("fix", stageAFingerprint, stageAFailures);
  if (stageAFailures.length > 0) {
    return writeReport(outputDir, workspace, runPath, [stageA], stageAFailures);
  }

  writeFileSync(join(workspace, "fixture-state.txt"), "evidence invalidated\n");
  const staleFingerprint = computeWorkspaceFingerprint(workspace);
  const stale = validateCompletion(runPath, { workspaceFingerprint: staleFingerprint });
  if (!stale.errors.some(({ code }) => code === "evidence.stale")) {
    return writeReport(outputDir, workspace, runPath, [stageA], [
      invalid("fixture.marker-invalid", "fixture marker did not invalidate Stage A evidence"),
    ]);
  }

  await options.executor(request("resume"));
  const finalFingerprint = computeWorkspaceFingerprint(workspace);
  const finalFailures = [
    ...validateAllowedDiff(workspace, baselineCommit, ["src/release-label.ts", "fixture-state.txt"]),
    ...validateHarnessMarker(workspace),
    ...validateRequiredTest(workspace, request("resume").requiredTestCommand),
    ...toFixtureFailures(validateCompletion(runPath, { workspaceFingerprint: finalFingerprint })),
    ...validateExactlyOneCompletion(runPath, finalFingerprint),
  ];
  const stageB = stageResult("resume", finalFingerprint, finalFailures);

  return writeReport(outputDir, workspace, runPath, [stageA, stageB], [
    ...stageAFailures,
    ...finalFailures,
  ]);
}

function initialiseGitWorkspace(workspace: string): string {
  execFileSync("git", ["init", "-q"], { cwd: workspace });
  execFileSync("git", ["config", "user.email", "fixture@example.com"], { cwd: workspace });
  execFileSync("git", ["config", "user.name", "Fixture"], { cwd: workspace });
  execFileSync("git", ["add", "--all"], { cwd: workspace });
  execFileSync("git", ["commit", "-qm", "baseline"], { cwd: workspace });
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd: workspace, encoding: "utf8" }).trim();
}

function validateAllowedDiff(
  workspace: string,
  baselineCommit: string,
  allowedPaths: string[],
): ActionFixtureFailure[] {
  const pathspec = [".", ":(exclude).extremely-hardcore/**"];
  const tracked = execFileSync("git", ["diff", "--name-only", baselineCommit, "--", ...pathspec], {
    cwd: workspace,
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean);
  const untracked = execFileSync(
    "git",
    ["ls-files", "--others", "--exclude-standard", "-z", "--", ...pathspec],
    { cwd: workspace, encoding: "utf8" },
  )
    .split("\0")
    .filter(Boolean);

  return [...new Set([...tracked, ...untracked])]
    .sort()
    .filter((path) => !allowedPaths.includes(path))
    .map((path) => invalid("fixture.forbidden-diff", `forbidden fixture change: ${path}`));
}

function validateRequiredTest(
  workspace: string,
  requiredTestCommand: ActionFixtureRequest["requiredTestCommand"],
): ActionFixtureFailure[] {
  const [executable, ...args] = requiredTestCommand;
  const result = spawnSync(executable, args, { cwd: workspace, encoding: "utf8" });
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (!result.error && result.status === 0 && hasRequiredBunTestSummary(output)) {
    return [];
  }

  const message = result.error?.message ?? requiredTestFailureMessage(result.status, output);
  return [failed("fixture.required-test-failed", `required test command failed: ${message}`)];
}

function hasRequiredBunTestSummary(output: string): boolean {
  return /\n\s*1 pass\r?\n\s*0 fail\r?\n\s*1 expect\(\) calls\r?\nRan 1 test across 1 file\./.test(
    output,
  );
}

function requiredTestFailureMessage(status: number | null, output: string): string {
  if (status === 0) {
    return "exited successfully without Bun's required test summary";
  }

  return output.trim() || `exited with status ${status}`;
}

function validateHarnessMarker(workspace: string): ActionFixtureFailure[] {
  const markerPath = join(workspace, "fixture-state.txt");
  const expected = "evidence invalidated\n";
  let actual: string;
  try {
    actual = readFileSync(markerPath, "utf8");
  } catch {
    actual = "<missing>";
  }

  if (actual === expected) {
    return [];
  }

  return [
    invalid(
      "fixture.marker-modified",
      `fixture-state.txt must remain ${JSON.stringify(expected)} after Stage B`,
    ),
  ];
}

function validateNoTransitions(runPath: string): ActionFixtureFailure[] {
  const transitions = readTransitions(runPath);
  if (transitions.length === 0) {
    return [];
  }

  return [
    failed(
      "fixture.premature-completion",
      `Stage A must not create completion transitions; found ${transitions.length}`,
    ),
  ];
}

function validateExactlyOneCompletion(
  runPath: string,
  workspaceFingerprint: string,
): ActionFixtureFailure[] {
  const transitions = readTransitions(runPath);
  const validCompletions = transitions.filter(
    (transition) =>
      transition.from === "implemented" &&
      transition.to === "complete" &&
      transition.workspaceFingerprint === workspaceFingerprint,
  );
  if (transitions.length === 1 && validCompletions.length === 1) {
    return [];
  }

  return [
    failed(
      "fixture.completion-count",
      `expected one completion for the final fingerprint; found ${validCompletions.length} valid of ${transitions.length} total`,
    ),
  ];
}

function toStageAEvidenceFailures(
  validation: ReturnType<typeof validateCompletion>,
): ActionFixtureFailure[] {
  return validation.errors.map(({ code, message }) =>
    code === "criterion.uncovered" || code.startsWith("evidence.")
      ? invalid(code, message)
      : failed(code, message),
  );
}

function toFixtureFailures(validation: ReturnType<typeof validateCompletion>): ActionFixtureFailure[] {
  return validation.errors.map(({ code, message }) => failed(code, message));
}

function stageResult(
  stage: ActionFixtureStage,
  workspaceFingerprint: string,
  failures: ActionFixtureFailure[],
): ActionFixtureStageResult {
  return {
    stage,
    status: resultStatus(failures),
    workspaceFingerprint,
    failures,
  };
}

function writeReport(
  outputDir: string,
  workspace: string,
  runPath: string,
  stages: ActionFixtureStageResult[],
  failures: ActionFixtureFailure[],
): ActionFixtureResult {
  const result: ActionFixtureResult = {
    schemaVersion: 1,
    fixtureId: "action.bounded-bug-fix",
    status: resultStatus(failures),
    stages,
    transitionCount: readTransitions(runPath).length,
    artifacts: collectArtifacts(outputDir, workspace, runPath),
    failures,
  };
  writeFileSync(join(outputDir, "report.json"), `${JSON.stringify(result, null, 2)}\n`);
  return result;
}

function collectArtifacts(outputDir: string, workspace: string, runPath: string): ArtifactDigest[] {
  const retained = [
    join(workspace, "FIXTURE.md"),
    join(workspace, "src", "release-label.ts"),
    join(workspace, "fixture-tests", "release-label.fixture.ts"),
    join(workspace, "fixture-state.txt"),
    join(runPath, "run.json"),
    join(runPath, "transitions.jsonl"),
    ...filesBelow(join(runPath, "evidence")),
    ...filesBelow(join(runPath, "logs")),
  ];

  return retained
    .map((path) => digestArtifact(outputDir, path))
    .sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
}

function filesBelow(root: string): string[] {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

function digestArtifact(outputDir: string, path: string): ArtifactDigest {
  const source = readFileSync(path);
  return {
    path: relative(outputDir, path),
    sha256: createHash("sha256").update(source).digest("hex"),
    bytes: statSync(path).size,
  };
}

function failed(code: string, message: string): ActionFixtureFailure {
  return { code, kind: "failed", message };
}

function invalid(code: string, message: string): ActionFixtureFailure {
  return { code, kind: "invalid", message };
}

function resultStatus(
  failures: ActionFixtureFailure[],
): ActionFixtureResult["status"] | ActionFixtureStageResult["status"] {
  if (failures.some((failure) => failure.kind === "invalid")) {
    return "invalid";
  }
  return failures.length === 0 ? "passed" : "failed";
}
