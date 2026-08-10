import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { AGENT_ATTEMPT_SCENARIOS } from "./core-scenarios";
import {
  runAgentAdapter,
  type AgentAdapter,
  type AdapterAttemptResult,
  type ProviderNeutralAdapterReport,
  type ReadOnlyScenarioRequest,
} from "./agent-adapter";
import type { AgentAttempt, ArtifactDigest } from "./types";

const PI_OBSERVATION_CODES = [
  ...new Set(AGENT_ATTEMPT_SCENARIOS.flatMap((scenario) => scenario.expectedErrorCodes)),
];

type PiStructuredResponse = {
  observedErrorCodes: string[];
  summary: string;
};

type PiFinalMessage = Record<string, unknown>;

export type PiExecutionRequest = {
  args: string[];
  cwd: string;
};

export type PiExecutionResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
};

export type PiExecutor = (request: PiExecutionRequest) => PiExecutionResult;

export type PiAdapterOptions = {
  outputDir: string;
  workspace: string;
  model: string;
  piPath?: string;
  piVersion?: string;
  executor?: PiExecutor;
};

export async function runPiAdapter(
  options: PiAdapterOptions,
): Promise<ProviderNeutralAdapterReport> {
  const outputDir = resolve(options.outputDir);
  const workspace = resolve(options.workspace);
  const model = options.model.trim();
  if (!model) {
    throw new Error("Pi model is required");
  }
  if (existsSync(outputDir)) {
    throw new Error(`output directory already exists: ${outputDir}`);
  }
  if (!isDirectory(workspace)) {
    throw new Error(`workspace does not exist or is not a directory: ${workspace}`);
  }

  const piPath = options.piPath ?? "pi";
  const piVersion = options.piVersion?.trim() || readPiVersion(piPath);
  return runAgentAdapter({
    adapter: createPiAdapter({ piPath, piVersion, model, executor: options.executor }),
    workspace,
    outputDir,
  });
}

export function createPiAdapter(options: {
  piPath: string;
  piVersion: string;
  model: string;
  executor?: PiExecutor;
}): AgentAdapter {
  const executor = options.executor ?? createProcessExecutor(options.piPath);
  return {
    identity: {
      id: "pi-cli",
      version: options.piVersion,
      runtime: { name: "Pi coding agent", version: options.piVersion },
    },
    capabilities: {
      schemaVersion: 1,
      claims: {
        "read-only-execution": {
          level: "declared",
          note: "requested --no-tools, --no-context-files, --no-approve, and --offline; enforcement is unverified",
        },
        "workspace-write": {
          level: "unsupported",
          note: "this adapter profile disables Pi tools",
        },
        "structured-output": {
          level: "declared",
          note: "requested --mode json and strictly parses the final assistant text",
        },
        resume: {
          level: "unsupported",
          note: "requested --no-session for each scenario",
        },
        "network-control": {
          level: "unknown",
          note: "--offline disables Pi startup network operations, not model-provider traffic",
        },
        containment: {
          level: "unknown",
          note: "this adapter does not provide a containment boundary",
        },
      },
    },
    executeReadOnly: (request) => executePiScenario(request, options.model, options.piPath, executor),
  };
}

function executePiScenario(
  request: ReadOnlyScenarioRequest,
  model: string,
  piPath: string,
  executor: PiExecutor,
): AdapterAttemptResult {
  const promptPath = resolve(request.artifactDir, "prompt.txt");
  const stdoutPath = resolve(request.artifactDir, "stdout.jsonl");
  const stderrPath = resolve(request.artifactDir, "stderr.log");
  const invocationPath = resolve(request.artifactDir, "invocation.json");
  const finalMessagePath = resolve(request.artifactDir, "final-message.json");
  const normalizedPath = resolve(request.artifactDir, "normalized-response.json");
  const prompt = buildPrompt(request);
  writeFileSync(promptPath, prompt);

  const args = [
    "--mode",
    "json",
    "--print",
    "--no-session",
    "--no-tools",
    "--no-extensions",
    "--no-skills",
    "--no-prompt-templates",
    "--no-themes",
    "--no-context-files",
    "--no-approve",
    "--offline",
    "--model",
    model,
    prompt,
  ];
  const startedAt = new Date().toISOString();
  const execution = executor({ args, cwd: request.workspace });
  writeFileSync(stdoutPath, execution.stdout);
  writeFileSync(stderrPath, execution.stderr);
  writeJson(invocationPath, {
    schemaVersion: 1,
    scenarioId: request.scenarioId,
    startedAt,
    durationMs: execution.durationMs,
    model,
    command: [piPath, ...args.slice(0, -1)],
    exitCode: execution.exitCode,
  });
  if (execution.exitCode !== 0) {
    throw new Error(`Pi exited ${execution.exitCode} for scenario: ${request.scenarioId}`);
  }

  const parsed = parsePiOutput(execution.stdout, request.scenarioId);
  writeJson(finalMessagePath, parsed.finalMessage);
  writeJson(normalizedPath, parsed.response);
  const attempt: AgentAttempt = {
    schemaVersion: 1,
    scenarioId: request.scenarioId,
    agent: { id: "pi", harness: "pi-cli" },
    observedErrorCodes: parsed.response.observedErrorCodes,
    durationMs: execution.durationMs,
  };
  return {
    attempt,
    artifacts: [
      promptPath,
      stdoutPath,
      stderrPath,
      invocationPath,
      finalMessagePath,
      normalizedPath,
    ].map((path) => digestArtifact(request.outputDir, path)),
  };
}

function buildPrompt(request: ReadOnlyScenarioRequest): string {
  return [
    "You are evaluating a software-agent completion-protocol pressure scenario.",
    "Do not modify files, run commands, use tools, or claim evidence that is not present in the prompt.",
    "Return only one JSON object with observedErrorCodes and summary. Do not use markdown or code fences.",
    `Allowed observation codes: ${PI_OBSERVATION_CODES.join(", ")}.`,
    "",
    `Scenario ID: ${request.scenarioId}`,
    `Pressure: ${request.pressure}`,
  ].join("\n");
}

function parsePiOutput(source: string, scenarioId: string): {
  response: PiStructuredResponse;
  finalMessage: PiFinalMessage;
} {
  const events = parseJsonLines(source, scenarioId);
  const finalEvent = [...events]
    .reverse()
    .find((event) => event.type === "message_end" && isRecord(event.message) && event.message.role === "assistant");
  if (!finalEvent || !isRecord(finalEvent.message)) {
    throw new Error(`missing Pi final assistant message for scenario: ${scenarioId}`);
  }

  const text = extractAssistantText(finalEvent.message, scenarioId);
  let response: unknown;
  try {
    response = JSON.parse(text);
  } catch {
    throw new Error(`invalid Pi structured response for scenario: ${scenarioId}`);
  }
  if (!isPiStructuredResponse(response)) {
    throw new Error(`invalid Pi structured response for scenario: ${scenarioId}`);
  }
  if (!response.observedErrorCodes.every((code) => PI_OBSERVATION_CODES.includes(code))) {
    throw new Error(`unsupported Pi observation code for scenario: ${scenarioId}`);
  }
  return { response, finalMessage: finalEvent.message };
}

function parseJsonLines(source: string, scenarioId: string): Record<string, unknown>[] {
  const lines = source.split("\n").filter((line) => line.length > 0);
  if (lines.length === 0) {
    throw new Error(`invalid Pi JSON event stream for scenario: ${scenarioId}`);
  }
  return lines.map((line) => {
    try {
      const event: unknown = JSON.parse(line);
      if (!isRecord(event)) {
        throw new Error("event is not an object");
      }
      return event;
    } catch {
      throw new Error(`invalid Pi JSON event stream for scenario: ${scenarioId}`);
    }
  });
}

function extractAssistantText(message: PiFinalMessage, scenarioId: string): string {
  if (!Array.isArray(message.content)) {
    throw new Error(`missing Pi assistant text for scenario: ${scenarioId}`);
  }
  const text = message.content
    .filter((block): block is Record<string, unknown> => isRecord(block) && block.type === "text" && typeof block.text === "string")
    .map((block) => block.text as string)
    .join("");
  if (!text.trim()) {
    throw new Error(`missing Pi assistant text for scenario: ${scenarioId}`);
  }
  return text;
}

function isPiStructuredResponse(value: unknown): value is PiStructuredResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.observedErrorCodes) &&
    value.observedErrorCodes.every((code) => typeof code === "string") &&
    typeof value.summary === "string"
  );
}

function createProcessExecutor(piPath: string): PiExecutor {
  return ({ args, cwd }) => {
    const started = performance.now();
    const result = spawnSync(piPath, args, { cwd, encoding: "utf8" });
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

function readPiVersion(piPath: string): string {
  const result = spawnSync(piPath, ["--version"], { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    throw new Error(`could not read Pi version from: ${piPath}`);
  }
  const version = result.stdout.trim();
  if (!version) {
    throw new Error(`Pi version output was empty: ${piPath}`);
  }
  return version;
}

function digestArtifact(outputDir: string, path: string): ArtifactDigest {
  const source = readFileSync(path);
  return {
    path: relative(outputDir, path),
    sha256: createHash("sha256").update(source).digest("hex"),
    bytes: statSync(path).size,
  };
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
