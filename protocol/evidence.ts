import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { readRun } from "./validate-run";
import { computeWorkspaceFingerprint, findWorkspaceRoot } from "./workspace-fingerprint";
import type { EvidenceRecord } from "./types";

export const DEFAULT_MAX_LOG_BYTES = 64 * 1024;
export const TRUNCATION_MARKER = Buffer.from("\n[output truncated]\n");

export type CaptureEvidenceOptions = {
  runPath: string;
  criterionId: string;
  command: string[];
  maxLogBytes?: number;
};

export async function captureEvidence(
  options: CaptureEvidenceOptions,
): Promise<EvidenceRecord> {
  const [executable, ...args] = options.command;
  if (!executable) {
    throw new Error("evidence command must not be empty");
  }

  const run = readRun(options.runPath);
  const criterion = run.acceptanceCriteria.find(({ id }) => id === options.criterionId);
  if (!criterion) {
    throw new Error(`unknown acceptance criterion: ${options.criterionId}`);
  }

  const workspaceRoot = findWorkspaceRoot(options.runPath);
  const startedAt = new Date().toISOString();
  const started = performance.now();
  const commandResult = await runCommand(
    executable,
    args,
    workspaceRoot,
    options.maxLogBytes ?? DEFAULT_MAX_LOG_BYTES,
  );
  const durationMs = Math.round(performance.now() - started);
  const workspaceFingerprint = computeWorkspaceFingerprint(workspaceRoot);
  const evidenceId = randomUUID();
  const logPath = `logs/${evidenceId}.log`;
  const logSha256 = createHash("sha256").update(commandResult.log).digest("hex");
  const evidence: EvidenceRecord = {
    schemaVersion: 1,
    evidenceId,
    criterionId: options.criterionId,
    command: { executable, args },
    startedAt,
    durationMs,
    exitCode: commandResult.exitCode,
    workspaceFingerprint,
    logPath,
    logSha256,
    summary: commandResult.log.toString("utf8").trim().slice(0, 500),
    truncated: commandResult.truncated,
  };

  mkdirSync(join(options.runPath, "logs"), { recursive: true });
  mkdirSync(join(options.runPath, "evidence"), { recursive: true });
  writeFileSync(join(options.runPath, logPath), commandResult.log);
  writeFileSync(
    join(options.runPath, "evidence", `${evidenceId}.json`),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );

  criterion.evidenceIds = [evidenceId];
  writeRunAtomically(options.runPath, run);

  return evidence;
}

async function runCommand(
  executable: string,
  args: string[],
  cwd: string,
  maxLogBytes: number,
): Promise<{ exitCode: number; log: Buffer; truncated: boolean }> {
  if (maxLogBytes <= TRUNCATION_MARKER.length) {
    throw new Error("maxLogBytes must leave room for the truncation marker");
  }

  const chunks: Buffer[] = [];
  let capturedBytes = 0;
  let truncated = false;
  const append = (source: "stdout" | "stderr", value: Buffer | string): void => {
    const chunk = Buffer.concat([Buffer.from(`[${source}]\n`), Buffer.from(value)]);
    const remaining = maxLogBytes - capturedBytes;
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

  const child = spawn(executable, args, {
    cwd,
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });
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
    log = Buffer.concat([
      log.subarray(0, maxLogBytes - TRUNCATION_MARKER.length),
      TRUNCATION_MARKER,
    ]);
  }
  return { exitCode, log, truncated };
}

function writeRunAtomically(runPath: string, run: ReturnType<typeof readRun>): void {
  const target = join(runPath, "run.json");
  const temporary = join(runPath, `.run-${randomUUID()}.tmp`);
  writeFileSync(temporary, `${JSON.stringify(run, null, 2)}\n`);
  renameSync(temporary, target);
}
