import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, resolve } from "node:path";
import { readTransitions } from "../protocol/transition";
import { readEvidence, readRun, validateCompletion } from "../protocol/validate-run";
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
const EXPECTED_RELEASE_LABEL_SOURCE = [
  "export function releaseLabel(name: string): string {",
  "  return `release:${name.trim()}`;",
  "}",
  "",
].join("\n");

type WorkspaceInventory = {
  files: Map<string, string>;
  symlinks: string[];
};

type PinnedRunContract = {
  signature: string;
};

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
  const baselineInventory = inventoryWorkspace(workspace, runPath);
  const pinnedRunContract = pinRunContract(runPath);
  if (isFailure(pinnedRunContract)) {
    const workspaceFingerprint = computeWorkspaceFingerprint(workspace);
    const stage = stageResult("fix", workspaceFingerprint, [pinnedRunContract]);
    return writeReport(outputDir, workspace, runPath, [stage], [pinnedRunContract]);
  }
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
  const stageAArtifactFailures = validateRetainedArtifacts(workspace, runPath);
  const stageAContractFailures =
    stageAArtifactFailures.length === 0 ? validatePinnedRunContract(runPath, pinnedRunContract) : [];
  const stageAProtocolFailures =
    stageAArtifactFailures.length === 0 && stageAContractFailures.length === 0
      ? validateStageAProtocol(runPath, stageAFingerprint, request("fix"))
      : [];
  const stageAFailures = [
    ...validateAllowedDiff(
      workspace,
      baselineCommit,
      baselineInventory.files,
      runPath,
      ["src/release-label.ts"],
    ),
    ...validateExpectedSource(workspace),
    ...validateRequiredTest(workspace, request("fix").requiredTestCommand),
    ...stageAArtifactFailures,
    ...stageAContractFailures,
    ...stageAProtocolFailures,
    ...(stageAArtifactFailures.length === 0 && stageAContractFailures.length === 0
      ? validateNoTransitions(runPath)
      : []),
  ];
  const stageA = stageResult("fix", stageAFingerprint, stageAFailures);
  if (stageAFailures.length > 0) {
    return writeReport(outputDir, workspace, runPath, [stageA], stageAFailures);
  }

  writeFileSync(join(workspace, "fixture-state.txt"), "evidence invalidated\n");
  const staleFingerprint = computeWorkspaceFingerprint(workspace);
  const stale = validateCompletionSafely(runPath, staleFingerprint);
  if (isFailure(stale)) {
    return writeReport(outputDir, workspace, runPath, [stageA], [stale]);
  }
  if (!stale.errors.some(({ code }) => code === "evidence.stale")) {
    return writeReport(outputDir, workspace, runPath, [stageA], [
      invalid("fixture.marker-invalid", "fixture marker did not invalidate Stage A evidence"),
    ]);
  }

  await options.executor(request("resume"));
  const finalFingerprint = computeWorkspaceFingerprint(workspace);
  const stageBArtifactFailures = validateRetainedArtifacts(workspace, runPath);
  const stageBContractFailures =
    stageBArtifactFailures.length === 0 ? validatePinnedRunContract(runPath, pinnedRunContract) : [];
  const stageBProtocolFailures =
    stageBArtifactFailures.length === 0 && stageBContractFailures.length === 0
      ? validateStageBProtocol(runPath, finalFingerprint, request("resume"))
      : [];
  const finalFailures = [
    ...validateAllowedDiff(
      workspace,
      baselineCommit,
      baselineInventory.files,
      runPath,
      ["src/release-label.ts", "fixture-state.txt"],
    ),
    ...validateExpectedSource(workspace),
    ...validateHarnessMarker(workspace),
    ...validateRequiredTest(workspace, request("resume").requiredTestCommand),
    ...stageBArtifactFailures,
    ...stageBContractFailures,
    ...stageBProtocolFailures,
    ...(stageBArtifactFailures.length === 0 && stageBContractFailures.length === 0
      ? validateExactlyOneCompletion(runPath, finalFingerprint)
      : []),
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
  baselineFiles: Map<string, string>,
  runPath: string,
  allowedPaths: string[],
): ActionFixtureFailure[] {
  const pathspec = [".", ":(exclude).extremely-hardcore/**"];
  const tracked = execFileSync("git", ["diff", "--name-only", baselineCommit, "--", ...pathspec], {
    cwd: workspace,
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean);
  const currentInventory = inventoryWorkspace(workspace, runPath);
  const changedFiles = [
    ...new Set([...tracked, ...changedInventoryFiles(baselineFiles, currentInventory.files)]),
  ];

  return [
    ...currentInventory.symlinks.map((path) =>
      invalid("fixture.symlink-inventory", `workspace inventory contains symlink: ${path}`),
    ),
    ...changedFiles
      .sort()
      .filter((path) => !allowedPaths.includes(path))
      .map((path) => invalid("fixture.forbidden-diff", `forbidden fixture change: ${path}`)),
  ];
}

function validateExpectedSource(workspace: string): ActionFixtureFailure[] {
  const sourcePath = join(workspace, "src", "release-label.ts");
  let actual: string;
  try {
    actual = readFileSync(sourcePath, "utf8");
  } catch {
    actual = "<missing>";
  }

  if (actual === EXPECTED_RELEASE_LABEL_SOURCE) {
    return [];
  }

  return [
    invalid(
      "fixture.unexpected-source",
      "src/release-label.ts must match the fixture's expected correction exactly",
    ),
  ];
}

function inventoryWorkspace(workspace: string, runPath: string): WorkspaceInventory {
  const files = new Map<string, string>();
  const symlinks: string[] = [];

  const visit = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (path === join(workspace, ".git") || path === runPath) {
        continue;
      }
      if (entry.isSymbolicLink()) {
        symlinks.push(relative(workspace, path));
      } else if (entry.isDirectory()) {
        visit(path);
      } else if (entry.isFile()) {
        files.set(relative(workspace, path), createHash("sha256").update(readFileSync(path)).digest("hex"));
      }
    }
  };

  visit(workspace);
  return { files, symlinks: symlinks.sort() };
}

function changedInventoryFiles(
  baselineFiles: Map<string, string>,
  currentFiles: Map<string, string>,
): string[] {
  return [...new Set([...baselineFiles.keys(), ...currentFiles.keys()])].filter(
    (path) => baselineFiles.get(path) !== currentFiles.get(path),
  );
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

function validateStageAProtocol(
  runPath: string,
  workspaceFingerprint: string,
  request: ActionFixtureRequest,
): ActionFixtureFailure[] {
  const completion = validateCompletionSafely(runPath, workspaceFingerprint);
  if (isFailure(completion)) {
    return [completion];
  }

  return [
    ...toStageAEvidenceFailures(completion),
    ...validateEvidenceCommands(runPath, request),
  ];
}

function validateStageBProtocol(
  runPath: string,
  workspaceFingerprint: string,
  request: ActionFixtureRequest,
): ActionFixtureFailure[] {
  const completion = validateCompletionSafely(runPath, workspaceFingerprint);
  if (isFailure(completion)) {
    return [completion];
  }

  return [
    ...toFixtureFailures(completion),
    ...validateEvidenceCommands(runPath, request),
  ];
}

function validateCompletionSafely(
  runPath: string,
  workspaceFingerprint: string,
): ReturnType<typeof validateCompletion> | ActionFixtureFailure {
  try {
    return validateCompletion(runPath, { workspaceFingerprint });
  } catch {
    return invalid("fixture.run-contract-invalid", "run.json is missing or malformed");
  }
}

function validateEvidenceCommands(
  runPath: string,
  request: ActionFixtureRequest,
): ActionFixtureFailure[] {
  try {
    const run = readRun(runPath);
    const criterion = run.acceptanceCriteria.find((candidate) => candidate.id === request.criterionId);
    if (!criterion) {
      return [];
    }

    const [executable, ...args] = request.requiredTestCommand;
    return criterion.evidenceIds.flatMap((evidenceId) => {
      try {
        const evidence = readEvidence(runPath, evidenceId);
        if (
          evidence.command.executable === executable &&
          evidence.command.args.length === args.length &&
          evidence.command.args.every((argument, index) => argument === args[index])
        ) {
          return [];
        }
      } catch {
        return [invalid("fixture.evidence-command-invalid", `${evidenceId} could not be read`)];
      }

      return [
        invalid(
          "fixture.evidence-command-mismatch",
          `${evidenceId} must record ${JSON.stringify(request.requiredTestCommand)}`,
        ),
      ];
    });
  } catch {
    return [invalid("fixture.run-contract-invalid", "run.json is missing or malformed")];
  }
}

function pinRunContract(runPath: string): PinnedRunContract | ActionFixtureFailure {
  try {
    const run = readRun(runPath);
    if (!Array.isArray(run.acceptanceCriteria)) {
      return invalid("fixture.run-contract-invalid", "run.json is missing acceptance criteria");
    }

    const contract = {
      ...run,
      acceptanceCriteria: run.acceptanceCriteria.map((criterion) => {
        if (!Array.isArray(criterion.evidenceIds)) {
          throw new Error("acceptance criterion evidenceIds must be an array");
        }
        return { ...criterion, evidenceIds: [] };
      }),
    };
    return { signature: JSON.stringify(contract) };
  } catch {
    return invalid("fixture.run-contract-invalid", "run.json is missing or malformed");
  }
}

function validatePinnedRunContract(
  runPath: string,
  pinned: PinnedRunContract,
): ActionFixtureFailure[] {
  const current = pinRunContract(runPath);
  if (isFailure(current)) {
    return [current];
  }
  if (current.signature !== pinned.signature) {
    return [
      invalid(
        "fixture.run-contract-mutated",
        "run.json changed outside refreshable acceptance-criterion evidence references",
      ),
    ];
  }
  return [];
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
    transitionCount: readTransitionsSafely(runPath).length,
    artifacts: collectArtifacts(outputDir, workspace, runPath),
    failures,
  };
  writeFileSync(join(outputDir, "report.json"), `${JSON.stringify(result, null, 2)}\n`);
  return result;
}

function collectArtifacts(outputDir: string, workspace: string, runPath: string): ArtifactDigest[] {
  return retainedArtifactPaths(workspace, runPath)
    .filter((path) => isRegularFile(path))
    .map((path) => digestArtifact(outputDir, path))
    .sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
}

function retainedArtifactPaths(workspace: string, runPath: string): string[] {
  return [
    join(workspace, "FIXTURE.md"),
    join(workspace, "src", "release-label.ts"),
    join(workspace, "fixture-tests", "release-label.fixture.ts"),
    join(workspace, "fixture-state.txt"),
    join(runPath, "run.json"),
    join(runPath, "transitions.jsonl"),
    ...filesBelow(join(runPath, "evidence")),
    ...filesBelow(join(runPath, "logs")),
  ];
}

function validateRetainedArtifacts(workspace: string, runPath: string): ActionFixtureFailure[] {
  const retained = retainedArtifactPaths(workspace, runPath);
  const symlinks = [
    ...retained.filter((path) => isSymlink(path)),
    ...findSymlinksBelow(join(runPath, "evidence")),
    ...findSymlinksBelow(join(runPath, "logs")),
  ];
  return [...new Set(symlinks)]
    .sort()
    .map((path) =>
      invalid(
        "fixture.symlink-retained-artifact",
        `retained artifact is a symlink: ${relative(workspace, path)}`,
      ),
    );
}

function filesBelow(root: string): string[] {
  if (!isDirectory(root)) {
    return [];
  }

  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isSymbolicLink() ? [] : entry.isDirectory() ? filesBelow(path) : [path];
  });
}

function findSymlinksBelow(root: string): string[] {
  if (isSymlink(root)) {
    return [root];
  }
  if (!isDirectory(root)) {
    return [];
  }

  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isSymbolicLink() ? [path] : entry.isDirectory() ? findSymlinksBelow(path) : [];
  });
}

function isRegularFile(path: string): boolean {
  try {
    return lstatSync(path).isFile();
  } catch {
    return false;
  }
}

function isDirectory(path: string): boolean {
  try {
    return lstatSync(path).isDirectory();
  } catch {
    return false;
  }
}

function isSymlink(path: string): boolean {
  try {
    return lstatSync(path).isSymbolicLink();
  } catch {
    return false;
  }
}

function digestArtifact(outputDir: string, path: string): ArtifactDigest {
  const source = readFileSync(path);
  return {
    path: relative(outputDir, path),
    sha256: createHash("sha256").update(source).digest("hex"),
    bytes: lstatSync(path).size,
  };
}

function failed(code: string, message: string): ActionFixtureFailure {
  return { code, kind: "failed", message };
}

function invalid(code: string, message: string): ActionFixtureFailure {
  return { code, kind: "invalid", message };
}

function isFailure(
  value: ReturnType<typeof validateCompletion> | ActionFixtureFailure | PinnedRunContract,
): value is ActionFixtureFailure {
  return "kind" in value;
}

function readTransitionsSafely(runPath: string): ReturnType<typeof readTransitions> {
  const transitionsPath = join(runPath, "transitions.jsonl");
  if (isSymlink(transitionsPath)) {
    return [];
  }
  try {
    return readTransitions(runPath);
  } catch {
    return [];
  }
}

function resultStatus(
  failures: ActionFixtureFailure[],
): ActionFixtureResult["status"] | ActionFixtureStageResult["status"] {
  if (failures.some((failure) => failure.kind === "invalid")) {
    return "invalid";
  }
  return failures.length === 0 ? "passed" : "failed";
}
