#!/usr/bin/env bun

import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const WORKSPACE = dirname(fileURLToPath(import.meta.url));
const RUN_PATH = join(WORKSPACE, ".extremely-hardcore", "runs", "bounded-bug-fix");
const REQUIRED_TEST_COMMAND = ["bun", "test", "./fixture-tests/release-label.fixture.ts"];
const MAX_LOG_BYTES = 64 * 1024;
const TRUNCATION_MARKER = Buffer.from("\n[output truncated]\n");
const USAGE = `usage:
  bun fixture-protocol.ts evidence --stage <fix|resume>
  bun fixture-protocol.ts complete --stage resume`;

type Stage = "fix" | "resume";
type RunDefinition = {
  schemaVersion: 1;
  changeId: "bounded-bug-fix";
  initialState: "implemented";
  risk: "standard";
  acceptanceCriteria: Array<{
    id: "required-test-passes";
    description: string;
    evidenceIds: string[];
  }>;
  blockers: Array<{ id: string; description: string; status: "open" | "resolved" }>;
};
type EvidenceRecord = {
  schemaVersion: 1;
  evidenceId: string;
  criterionId: "required-test-passes";
  command: { executable: string; args: string[] };
  startedAt: string;
  durationMs: number;
  exitCode: number;
  workspaceFingerprint: string;
  logPath: string;
  logSha256: string;
  summary: string;
  truncated: boolean;
};
type TransitionEvent = {
  schemaVersion: 1;
  transitionId: string;
  from: "implemented";
  to: "complete";
  at: string;
  workspaceFingerprint: string;
  evidenceIds: string[];
};
type Invocation =
  | {
      schemaVersion: 1;
      invocationId: string;
      command: "evidence";
      stage: Stage;
      at: string;
      workspaceFingerprint: string;
      evidenceId: string;
    }
  | {
      schemaVersion: 1;
      invocationId: string;
      command: "complete";
      stage: "resume";
      at: string;
      workspaceFingerprint: string;
      transitionId: string;
    };
type ValidationError = { code: string; message: string };

export async function main(args: string[]): Promise<number> {
  try {
    const [command, flag, stage] = args;
    if (command === "evidence" && flag === "--stage" && isStage(stage) && args.length === 3) {
      const evidence = await captureEvidence();
      appendInvocation({
        schemaVersion: 1,
        invocationId: randomUUID(),
        command: "evidence",
        stage,
        at: new Date().toISOString(),
        workspaceFingerprint: evidence.workspaceFingerprint,
        evidenceId: evidence.evidenceId,
      });
      console.log(`${evidence.evidenceId}: required-test-passes exited ${evidence.exitCode}`);
      return evidence.exitCode;
    }
    if (command === "complete" && flag === "--stage" && stage === "resume" && args.length === 3) {
      const transition = complete();
      appendInvocation({
        schemaVersion: 1,
        invocationId: randomUUID(),
        command: "complete",
        stage: "resume",
        at: new Date().toISOString(),
        workspaceFingerprint: transition.workspaceFingerprint,
        transitionId: transition.transitionId,
      });
      console.log(`implemented -> complete (${transition.transitionId})`);
      return 0;
    }
    throw new Error(USAGE);
  } catch (error) {
    console.error(`error: ${error instanceof Error ? error.message : String(error)}`);
    return 1;
  }
}

async function captureEvidence(): Promise<EvidenceRecord> {
  const run = readRun();
  const criterion = run.acceptanceCriteria.find(({ id }) => id === "required-test-passes");
  if (!criterion) {
    throw new Error("required-test-passes is missing from run.json");
  }

  const [executable, ...args] = REQUIRED_TEST_COMMAND;
  const startedAt = new Date().toISOString();
  const started = performance.now();
  const commandResult = await runCommand(executable, args);
  const evidenceId = randomUUID();
  const logPath = `logs/${evidenceId}.log`;
  const evidence: EvidenceRecord = {
    schemaVersion: 1,
    evidenceId,
    criterionId: "required-test-passes",
    command: { executable, args },
    startedAt,
    durationMs: Math.round(performance.now() - started),
    exitCode: commandResult.exitCode,
    workspaceFingerprint: computeWorkspaceFingerprint(),
    logPath,
    logSha256: createHash("sha256").update(commandResult.log).digest("hex"),
    summary: commandResult.log.toString("utf8").trim().slice(0, 500),
    truncated: commandResult.truncated,
  };

  mkdirSync(join(RUN_PATH, "logs"), { recursive: true });
  mkdirSync(join(RUN_PATH, "evidence"), { recursive: true });
  writeFileSync(join(RUN_PATH, logPath), commandResult.log);
  writeFileSync(join(RUN_PATH, "evidence", `${evidenceId}.json`), `${JSON.stringify(evidence, null, 2)}\n`);
  criterion.evidenceIds = [evidenceId];
  writeRunAtomically(run);
  return evidence;
}

function complete(): TransitionEvent {
  const workspaceFingerprint = computeWorkspaceFingerprint();
  const errors = validateCompletion(workspaceFingerprint);
  if (errors.length > 0) {
    throw new Error(errors.map(({ code, message }) => `${code}: ${message}`).join("\n"));
  }

  const transitions = readTransitions();
  if (transitions.length > 0) {
    throw new Error("transition.invalid-state: run is no longer implemented");
  }
  const run = readRun();
  const event: TransitionEvent = {
    schemaVersion: 1,
    transitionId: randomUUID(),
    from: "implemented",
    to: "complete",
    at: new Date().toISOString(),
    workspaceFingerprint,
    evidenceIds: [...new Set(run.acceptanceCriteria.flatMap((criterion) => criterion.evidenceIds))],
  };
  appendFileSync(join(RUN_PATH, "transitions.jsonl"), `${JSON.stringify(event)}\n`);
  return event;
}

function validateCompletion(workspaceFingerprint: string): ValidationError[] {
  const run = readRun();
  const errors: ValidationError[] = [];
  for (const criterion of run.acceptanceCriteria) {
    if (criterion.evidenceIds.length === 0) {
      errors.push({ code: "criterion.uncovered", message: `${criterion.id} has no evidence` });
      continue;
    }
    for (const evidenceId of criterion.evidenceIds) {
      const evidence = readEvidence(evidenceId);
      if (evidence.exitCode !== 0) {
        errors.push({ code: "evidence.failed", message: `${evidenceId} exited with status ${evidence.exitCode}` });
      }
      if (evidence.workspaceFingerprint !== workspaceFingerprint) {
        errors.push({ code: "evidence.stale", message: `${evidenceId} belongs to a different workspace fingerprint` });
      }
      if (evidence.criterionId !== criterion.id) {
        errors.push({
          code: "evidence.criterion-mismatch",
          message: `${evidenceId} belongs to ${evidence.criterionId}, not ${criterion.id}`,
        });
      }
      const log = readFileSync(join(RUN_PATH, evidence.logPath));
      if (createHash("sha256").update(log).digest("hex") !== evidence.logSha256) {
        errors.push({ code: "evidence.log-digest-mismatch", message: `${evidenceId} log digest does not match` });
      }
    }
  }
  for (const blocker of run.blockers) {
    if (blocker.status === "open") {
      errors.push({ code: "blocker.open", message: `${blocker.id} is still open` });
    }
  }
  return errors;
}

function readRun(): RunDefinition {
  return JSON.parse(readFileSync(join(RUN_PATH, "run.json"), "utf8")) as RunDefinition;
}

function readEvidence(evidenceId: string): EvidenceRecord {
  if (!/^[A-Za-z0-9-]+$/.test(evidenceId)) {
    throw new Error(`evidence.invalid: invalid evidence ID ${JSON.stringify(evidenceId)}`);
  }
  return JSON.parse(readFileSync(join(RUN_PATH, "evidence", `${evidenceId}.json`), "utf8")) as EvidenceRecord;
}

function readTransitions(): TransitionEvent[] {
  const path = join(RUN_PATH, "transitions.jsonl");
  if (!existsSync(path)) {
    return [];
  }
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as TransitionEvent);
}

function appendInvocation(invocation: Invocation): void {
  appendFileSync(join(RUN_PATH, "protocol-invocations.jsonl"), `${JSON.stringify(invocation)}\n`);
}

async function runCommand(
  executable: string,
  args: string[],
): Promise<{ exitCode: number; log: Buffer; truncated: boolean }> {
  const chunks: Buffer[] = [];
  let capturedBytes = 0;
  let truncated = false;
  const append = (source: "stdout" | "stderr", value: Buffer | string): void => {
    const chunk = Buffer.concat([Buffer.from(`[${source}]\n`), Buffer.from(value)]);
    const remaining = MAX_LOG_BYTES - capturedBytes;
    if (remaining <= 0) {
      truncated = true;
      return;
    }
    if (chunk.length > remaining) {
      chunks.push(chunk.subarray(0, remaining));
      capturedBytes += remaining;
      truncated = true;
      return;
    }
    chunks.push(chunk);
    capturedBytes += chunk.length;
  };

  const child = spawn(executable, args, { cwd: WORKSPACE, shell: false, stdio: ["ignore", "pipe", "pipe"] });
  child.stdout.on("data", (chunk: Buffer) => append("stdout", chunk));
  child.stderr.on("data", (chunk: Buffer) => append("stderr", chunk));
  const exitCode = await new Promise<number>((resolve) => {
    let settled = false;
    child.on("error", (error) => {
      append("stderr", error.message);
      if (!settled) {
        settled = true;
        resolve(127);
      }
    });
    child.on("close", (code) => {
      if (!settled) {
        settled = true;
        resolve(code ?? 1);
      }
    });
  });
  let log = Buffer.concat(chunks);
  if (truncated) {
    log = Buffer.concat([log.subarray(0, MAX_LOG_BYTES - TRUNCATION_MARKER.length), TRUNCATION_MARKER]);
  }
  return { exitCode, log, truncated };
}

function writeRunAtomically(run: RunDefinition): void {
  const target = join(RUN_PATH, "run.json");
  const temporary = join(RUN_PATH, `.run-${randomUUID()}.tmp`);
  writeFileSync(temporary, `${JSON.stringify(run, null, 2)}\n`);
  renameSync(temporary, target);
}

function computeWorkspaceFingerprint(): string {
  const head = gitText(["rev-parse", "HEAD"]);
  const pathspec = [".", ":(exclude).extremely-hardcore/**"];
  const diff = gitBuffer(["diff", "--binary", "HEAD", "--", ...pathspec]);
  const untracked = gitText(["ls-files", "--others", "--exclude-standard", "-z", "--", ...pathspec])
    .split("\0")
    .filter(Boolean)
    .sort();
  const hash = createHash("sha256").update(head).update("\0").update(diff);
  for (const path of untracked) {
    hash.update("\0").update(path).update("\0").update(readFileSync(join(WORKSPACE, path)));
  }
  return hash.digest("hex");
}

function gitText(args: string[]): string {
  return Bun.spawnSync(["git", ...args], { cwd: WORKSPACE, stdout: "pipe" }).stdout.toString();
}

function gitBuffer(args: string[]): Buffer {
  return Buffer.from(Bun.spawnSync(["git", ...args], { cwd: WORKSPACE, stdout: "pipe" }).stdout);
}

function isStage(value: string | undefined): value is Stage {
  return value === "fix" || value === "resume";
}

if (import.meta.main) {
  process.exitCode = await main(Bun.argv.slice(2));
}
