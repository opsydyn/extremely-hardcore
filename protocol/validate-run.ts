import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { EvidenceRecord, RunDefinition, ValidationError, ValidationResult } from "./types";

export type CompletionValidationOptions = {
  workspaceFingerprint: string;
};

export function validateCompletion(
  runPath: string,
  options: CompletionValidationOptions,
): ValidationResult {
  const run = readRun(runPath);
  const errors: ValidationError[] = run.acceptanceCriteria
    .filter((criterion) => criterion.evidenceIds.length === 0)
    .map((criterion) => ({
      code: "criterion.uncovered",
      message: `${criterion.id} has no evidence`,
    }));

  for (const criterion of run.acceptanceCriteria) {
    for (const evidenceId of criterion.evidenceIds) {
      const evidence = readEvidence(runPath, evidenceId);
      if (evidence.exitCode !== 0) {
        errors.push({
          code: "evidence.failed",
          message: `${evidenceId} exited with status ${evidence.exitCode}`,
        });
      }
      if (evidence.workspaceFingerprint !== options.workspaceFingerprint) {
        errors.push({
          code: "evidence.stale",
          message: `${evidenceId} belongs to a different workspace fingerprint`,
        });
      }
      if (evidence.criterionId !== criterion.id) {
        errors.push({
          code: "evidence.criterion-mismatch",
          message: `${evidenceId} belongs to ${evidence.criterionId}, not ${criterion.id}`,
        });
      }

      const log = readFileSync(join(runPath, evidence.logPath));
      const digest = createHash("sha256").update(log).digest("hex");
      if (digest !== evidence.logSha256) {
        errors.push({
          code: "evidence.log-digest-mismatch",
          message: `${evidenceId} log digest does not match ${evidence.logPath}`,
        });
      }
    }
  }

  for (const blocker of run.blockers) {
    if (blocker.status === "open") {
      errors.push({
        code: "blocker.open",
        message: `${blocker.id} is still open`,
      });
    }
  }

  return { ok: errors.length === 0, errors };
}

export function readRun(runPath: string): RunDefinition {
  return JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
}

export function readEvidence(runPath: string, evidenceId: string): EvidenceRecord {
  return JSON.parse(
    readFileSync(join(runPath, "evidence", `${evidenceId}.json`), "utf8"),
  ) as EvidenceRecord;
}
