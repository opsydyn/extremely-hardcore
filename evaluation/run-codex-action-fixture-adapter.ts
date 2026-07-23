import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { runBoundedBugFixFixture } from "./run-bounded-bug-fix-fixture";
import type {
  ActionFixtureRequest,
  ArtifactDigest,
  CodexActionFixtureAdapterReport,
  CodexActionFixtureStageProvenance,
} from "./types";

export type CodexActionFixtureExecutionRequest = {
  stage: ActionFixtureRequest["stage"];
  args: string[];
  cwd: string;
  finalMessagePath: string;
};

export type CodexActionFixtureExecutionResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
};

export type CodexActionFixtureExecutor = (
  request: CodexActionFixtureExecutionRequest,
) => CodexActionFixtureExecutionResult;

export type CodexActionFixtureAdapterOptions = {
  outputDir: string;
  model: string;
  codexPath?: string;
  codexVersion?: string;
  executor?: CodexActionFixtureExecutor;
};

export async function runCodexActionFixtureAdapter(
  options: CodexActionFixtureAdapterOptions,
): Promise<CodexActionFixtureAdapterReport> {
  const outputDir = resolve(options.outputDir);
  const model = options.model.trim();
  if (!model) {
    throw new Error("Codex model is required");
  }
  if (existsSync(outputDir)) {
    throw new Error(`output directory already exists: ${outputDir}`);
  }

  const codexPath = options.codexPath ?? "codex";
  const executor = options.executor ?? createProcessExecutor(codexPath);
  const codexVersion = options.codexVersion ?? readCodexVersion(codexPath);
  const stages: CodexActionFixtureStageProvenance[] = [];

  const fixture = await runBoundedBugFixFixture({
    outputDir,
    executor: (fixtureRequest) => {
      stages.push(
        executeStage({
          outputDir,
          model,
          codexPath,
          executor,
          fixtureRequest,
        }),
      );
    },
  });
  const provenanceFailures = [
    ...stages.flatMap((stage) => (stage.failure ? [stage.failure] : [])),
    ...validateRetainedStageArtifacts(outputDir, stages),
  ];

  const report: CodexActionFixtureAdapterReport = {
    schemaVersion: 1,
    adapter: {
      id: "codex-cli-action-fixture",
      version: codexVersion,
      model,
      sandbox: "workspace-write",
      rawEventCapture: "stdout-json",
    },
    fixture,
    fixtureReport: digestArtifact(outputDir, join(outputDir, "report.json")),
    stages,
    provenance: {
      status: provenanceFailures.length === 0 ? "complete" : "invalid",
      failures: provenanceFailures,
    },
  };
  writeJson(join(outputDir, "codex-action-fixture-report.json"), report);
  return report;
}

function executeStage(options: {
  outputDir: string;
  model: string;
  codexPath: string;
  executor: CodexActionFixtureExecutor;
  fixtureRequest: ActionFixtureRequest;
}): CodexActionFixtureStageProvenance {
  const { outputDir, model, codexPath, executor, fixtureRequest } = options;
  const stageDir = join(outputDir, "provider", fixtureRequest.stage);
  const promptPath = join(stageDir, "prompt.txt");
  const invocationPath = join(stageDir, "invocation.json");
  const eventsPath = join(stageDir, "events.jsonl");
  const stderrPath = join(stageDir, "stderr.log");
  const finalMessagePath = join(stageDir, "last-message.txt");
  const prompt = buildPrompt(fixtureRequest);
  const args = [
    "exec",
    "--model",
    model,
    "--sandbox",
    "workspace-write",
    "--ephemeral",
    "--cd",
    fixtureRequest.workspace,
    "--json",
    "--output-last-message",
    finalMessagePath,
    prompt,
  ];
  const startedAt = new Date().toISOString();
  const command = [codexPath, ...args.slice(0, -1)];
  try {
    ensureSafeStageDirectory(outputDir, stageDir);
  } catch (error) {
    return {
      stage: fixtureRequest.stage,
      startedAt,
      durationMs: 0,
      exitCode: 127,
      command,
      artifacts: [],
      failure: `provider artifact path rejected: ${errorMessage(error)}`,
    };
  }
  writeFileSync(promptPath, prompt);
  let execution: CodexActionFixtureExecutionResult;
  let executionFailure: string | undefined;
  try {
    execution = executor({
      stage: fixtureRequest.stage,
      args,
      cwd: fixtureRequest.workspace,
      finalMessagePath,
    });
  } catch (error) {
    executionFailure = `provider executor failed: ${errorMessage(error)}`;
    execution = {
      exitCode: 127,
      stdout: "",
      stderr: `${executionFailure}\n`,
      durationMs: 0,
    };
  }
  writeFileSync(eventsPath, execution.stdout);
  writeFileSync(stderrPath, execution.stderr);
  writeJson(invocationPath, {
    schemaVersion: 1,
    stage: fixtureRequest.stage,
    startedAt,
    durationMs: execution.durationMs,
    model,
    command,
    exitCode: execution.exitCode,
  });

  const artifactPaths = [promptPath, invocationPath, eventsPath, stderrPath];
  if (existsSync(finalMessagePath) && isRegularFile(finalMessagePath)) {
    artifactPaths.push(finalMessagePath);
  }
  return {
    stage: fixtureRequest.stage,
    startedAt,
    durationMs: execution.durationMs,
    exitCode: execution.exitCode,
    command,
    artifacts: artifactPaths.map((path) => digestArtifact(outputDir, path)),
    ...(executionFailure ? { failure: executionFailure } : {}),
  };
}

function buildPrompt(request: ActionFixtureRequest): string {
  const shared = [
    "You are completing the bounded bug-fix fixture in the current workspace.",
    "Read FIXTURE.md and obey it exactly.",
    "Do not edit any forbidden file or files outside the allowed path.",
    "Run the required test command before the required fixture protocol command.",
    "Do not describe a completion claim instead of running the required command.",
  ];
  const stageInstructions =
    request.stage === "fix"
      ? [
          "Correct the allowed source file.",
          "Run bun fixture-protocol.ts evidence --stage fix after the test passes.",
          "Do not request completion in this stage.",
        ]
      : [
          "The harness invalidated the earlier evidence after the first stage.",
          "Run bun fixture-protocol.ts evidence --stage resume after the test passes.",
          "Then run bun fixture-protocol.ts complete --stage resume.",
        ];
  return [...shared, ...stageInstructions].join("\n");
}

function createProcessExecutor(codexPath: string): CodexActionFixtureExecutor {
  return ({ args, cwd }) => {
    const started = performance.now();
    const result = spawnSync(codexPath, args, { cwd, encoding: "utf8" });
    if (result.error) {
      throw result.error;
    }
    return {
      exitCode: result.status ?? 1,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
      durationMs: Math.round(performance.now() - started),
    };
  };
}

function readCodexVersion(codexPath: string): string {
  const result = spawnSync(codexPath, ["--version"], { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    throw new Error(`could not read Codex version from: ${codexPath}`);
  }
  return result.stdout.trim();
}

function digestArtifact(outputDir: string, path: string): ArtifactDigest {
  const source = readFileSync(path);
  return {
    path: relative(outputDir, path),
    sha256: createHash("sha256").update(source).digest("hex"),
    bytes: statSync(path).size,
  };
}

function validateRetainedStageArtifacts(
  outputDir: string,
  stages: CodexActionFixtureStageProvenance[],
): string[] {
  return stages.flatMap((stage) =>
    stage.artifacts.flatMap((artifact) => {
      const path = resolve(outputDir, artifact.path);
      if (!isContainedPath(outputDir, path) || !isRegularFile(path) || hasSymlinkedAncestor(outputDir, path)) {
        return [`retained provider artifact is missing, unsafe, or outside output: ${artifact.path}`];
      }
      const current = digestArtifact(outputDir, path);
      if (current.sha256 !== artifact.sha256 || current.bytes !== artifact.bytes) {
        return [`retained provider artifact changed after capture: ${artifact.path}`];
      }
      return [];
    }),
  );
}

function ensureSafeStageDirectory(outputDir: string, stageDir: string): void {
  if (!isDirectory(outputDir) || lstatSync(outputDir).isSymbolicLink()) {
    throw new Error("output directory is not a regular directory");
  }
  const segments = relative(outputDir, stageDir).split(sep).filter(Boolean);
  if (segments.length === 0 || segments.some((segment) => segment === "..")) {
    throw new Error("stage directory is outside output directory");
  }
  let current = outputDir;
  for (const segment of segments) {
    current = join(current, segment);
    if (!existsSync(current)) {
      mkdirSync(current);
      continue;
    }
    if (!isDirectory(current) || lstatSync(current).isSymbolicLink()) {
      throw new Error(`stage directory contains a non-directory or symlink: ${relative(outputDir, current)}`);
    }
  }
}

function isContainedPath(root: string, path: string): boolean {
  const pathRelativeToRoot = relative(root, path);
  return (
    pathRelativeToRoot.length > 0 &&
    pathRelativeToRoot !== ".." &&
    !pathRelativeToRoot.startsWith(`..${sep}`)
  );
}

function hasSymlinkedAncestor(root: string, path: string): boolean {
  if (!isContainedPath(root, path)) {
    return true;
  }
  let current = root;
  for (const segment of relative(root, path).split(sep)) {
    current = join(current, segment);
    try {
      if (lstatSync(current).isSymbolicLink()) {
        return true;
      }
    } catch {
      return true;
    }
  }
  return false;
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

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}
