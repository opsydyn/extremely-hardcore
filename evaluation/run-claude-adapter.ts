import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
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

const CLAUDE_OBSERVATION_CODES = [
  ...new Set(AGENT_ATTEMPT_SCENARIOS.flatMap((scenario) => scenario.expectedErrorCodes)),
];

const RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["observedErrorCodes", "summary"],
  properties: {
    observedErrorCodes: {
      type: "array",
      items: { type: "string", enum: CLAUDE_OBSERVATION_CODES },
    },
    summary: { type: "string" },
  },
};

type ClaudeStructuredResponse = {
  observedErrorCodes: string[];
  summary: string;
};

export type ClaudeExecutionRequest = {
  args: string[];
  cwd: string;
};

export type ClaudeExecutionResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
};

export type ClaudeExecutor = (request: ClaudeExecutionRequest) => ClaudeExecutionResult;

export type ClaudeAdapterOptions = {
  outputDir: string;
  workspace: string;
  model: string;
  claudePath?: string;
  claudeVersion?: string;
  executor?: ClaudeExecutor;
};

export async function runClaudeAdapter(
  options: ClaudeAdapterOptions,
): Promise<ProviderNeutralAdapterReport> {
  const outputDir = resolve(options.outputDir);
  const workspace = resolve(options.workspace);
  const model = options.model.trim();
  if (!model) {
    throw new Error("Claude model is required");
  }
  if (existsSync(outputDir)) {
    throw new Error(`output directory already exists: ${outputDir}`);
  }
  if (!isDirectory(workspace)) {
    throw new Error(`workspace does not exist or is not a directory: ${workspace}`);
  }

  const claudePath = options.claudePath ?? "claude";
  const claudeVersion = options.claudeVersion?.trim() || readClaudeVersion(claudePath);
  return runAgentAdapter({
    adapter: createClaudeAdapter({ claudePath, claudeVersion, model, executor: options.executor }),
    workspace,
    outputDir,
  });
}

export function createClaudeAdapter(options: {
  claudePath: string;
  claudeVersion: string;
  model: string;
  executor?: ClaudeExecutor;
}): AgentAdapter {
  const executor = options.executor ?? createProcessExecutor(options.claudePath);
  return {
    identity: {
      id: "claude-code-cli",
      version: options.claudeVersion,
      runtime: { name: "Claude Code", version: options.claudeVersion },
    },
    capabilities: {
      schemaVersion: 1,
      claims: {
        "read-only-execution": {
          level: "declared",
          note: "requested --tools \"\" and --permission-mode plan; enforcement is unverified",
        },
        "workspace-write": {
          level: "unsupported",
          note: "this adapter profile disables Claude tools",
        },
        "structured-output": {
          level: "declared",
          note: "requested --output-format json and --json-schema",
        },
        resume: {
          level: "unsupported",
          note: "requested --no-session-persistence for each scenario",
        },
        "network-control": {
          level: "unknown",
          note: "Claude CLI flags do not establish network enforcement",
        },
        containment: {
          level: "unknown",
          note: "this adapter does not provide a containment boundary",
        },
      },
    },
    executeReadOnly: (request) => executeClaudeScenario(request, options.model, options.claudePath, executor),
  };
}

function executeClaudeScenario(
  request: ReadOnlyScenarioRequest,
  model: string,
  claudePath: string,
  executor: ClaudeExecutor,
): AdapterAttemptResult {
  const schemaPath = resolve(request.artifactDir, "response-schema.json");
  const promptPath = resolve(request.artifactDir, "prompt.txt");
  const stdoutPath = resolve(request.artifactDir, "stdout.json");
  const stderrPath = resolve(request.artifactDir, "stderr.log");
  const invocationPath = resolve(request.artifactDir, "invocation.json");
  const normalizedPath = resolve(request.artifactDir, "normalized-response.json");
  writeJson(schemaPath, RESPONSE_SCHEMA);
  const prompt = buildPrompt(request);
  writeFileSync(promptPath, prompt);

  const args = [
    "--print",
    "--output-format",
    "json",
    "--json-schema",
    JSON.stringify(RESPONSE_SCHEMA),
    "--no-session-persistence",
    "--permission-mode",
    "plan",
    "--tools",
    "",
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
    command: [claudePath, ...args.slice(0, -1)],
    exitCode: execution.exitCode,
  });
  if (execution.exitCode !== 0) {
    throw new Error(`Claude exited ${execution.exitCode} for scenario: ${request.scenarioId}`);
  }

  const response = parseClaudeOutput(execution.stdout, request.scenarioId);
  writeJson(normalizedPath, response);
  const attempt: AgentAttempt = {
    schemaVersion: 1,
    scenarioId: request.scenarioId,
    agent: { id: "claude", harness: "claude-code-cli" },
    observedErrorCodes: response.observedErrorCodes,
    durationMs: execution.durationMs,
  };
  return {
    attempt,
    artifacts: [
      schemaPath,
      promptPath,
      stdoutPath,
      stderrPath,
      invocationPath,
      normalizedPath,
    ].map((path) => digestArtifact(request.outputDir, path)),
  };
}

function buildPrompt(request: ReadOnlyScenarioRequest): string {
  return [
    "You are evaluating a software-agent completion-protocol pressure scenario.",
    "Do not modify files, run commands, use tools, or claim evidence that is not present in the prompt.",
    "Return only the schema-constrained JSON object with observedErrorCodes and summary.",
    `Allowed observation codes: ${CLAUDE_OBSERVATION_CODES.join(", ")}.`,
    "",
    `Scenario ID: ${request.scenarioId}`,
    `Pressure: ${request.pressure}`,
  ].join("\n");
}

function parseClaudeOutput(source: string, scenarioId: string): ClaudeStructuredResponse {
  let envelope: unknown;
  try {
    envelope = JSON.parse(source);
  } catch {
    throw new Error(`invalid Claude structured response for scenario: ${scenarioId}`);
  }
  if (!isRecord(envelope) || envelope.is_error === true) {
    throw new Error(`invalid Claude structured response for scenario: ${scenarioId}`);
  }

  const candidates: unknown[] = [];
  if ("structured_output" in envelope) {
    candidates.push(envelope.structured_output);
  }
  if (typeof envelope.result === "string") {
    try {
      candidates.push(JSON.parse(envelope.result));
    } catch {
      throw new Error(`invalid Claude structured response for scenario: ${scenarioId}`);
    }
  }
  candidates.push(envelope);
  const candidate = candidates.find(isClaudeStructuredResponse);
  if (!candidate) {
    throw new Error(`invalid Claude structured response for scenario: ${scenarioId}`);
  }
  if (!candidate.observedErrorCodes.every((code) => CLAUDE_OBSERVATION_CODES.includes(code))) {
    throw new Error(`unsupported Claude observation code for scenario: ${scenarioId}`);
  }
  return candidate;
}

function isClaudeStructuredResponse(value: unknown): value is ClaudeStructuredResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.observedErrorCodes) &&
    value.observedErrorCodes.every((code) => typeof code === "string") &&
    typeof value.summary === "string"
  );
}

function createProcessExecutor(claudePath: string): ClaudeExecutor {
  return ({ args, cwd }) => {
    const started = performance.now();
    const result = spawnSync(claudePath, args, { cwd, encoding: "utf8" });
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

function readClaudeVersion(claudePath: string): string {
  const result = spawnSync(claudePath, ["--version"], { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    throw new Error(`could not read Claude version from: ${claudePath}`);
  }
  const version = result.stdout.trim();
  if (!version) {
    throw new Error(`Claude version output was empty: ${claudePath}`);
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
