import { createHash } from "node:crypto";
import { lstatSync, readFileSync } from "node:fs";
import { basename, isAbsolute, join, normalize, relative, resolve, sep } from "node:path";
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
      let evidence: EvidenceRecord;
      try {
        evidence = readEvidence(runPath, evidenceId);
      } catch (error) {
        if (isMissingFile(error)) {
          errors.push({
            code: "evidence.missing",
            message: `${evidenceId} evidence record is missing`,
          });
          continue;
        }
        errors.push({
          code: "evidence.invalid",
          message: `${evidenceId} evidence record is not a canonical regular file`,
        });
        continue;
      }
      if (!isEvidenceRecord(evidence)) {
        errors.push({
          code: "evidence.invalid",
          message: `${evidenceId} evidence record is malformed`,
        });
        continue;
      }
      if (evidence.evidenceId !== evidenceId) {
        errors.push({
          code: "evidence.id-mismatch",
          message: `${evidenceId} evidence record declares ${evidence.evidenceId}`,
        });
        continue;
      }
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

      let log: Buffer;
      try {
        log = readEvidenceLog(runPath, evidence.logPath);
      } catch (error) {
        if (isMissingFile(error)) {
          errors.push({
            code: "evidence.log-missing",
            message: `${evidenceId} log is missing at ${evidence.logPath}`,
          });
          continue;
        }
        errors.push({
          code: "evidence.log-invalid",
          message: `${evidenceId} log is not a canonical regular file below logs`,
        });
        continue;
      }
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
  if (!isCanonicalFileName(evidenceId)) {
    throw new UnsafeRunArtifactPathError();
  }
  return JSON.parse(readRegularFileBelow(join(runPath, "evidence"), `${evidenceId}.json`, "utf8")) as EvidenceRecord;
}

function readEvidenceLog(runPath: string, logPath: string): Buffer {
  if (!logPath.startsWith("logs/")) {
    throw new UnsafeRunArtifactPathError();
  }
  return readRegularFileBelow(join(runPath, "logs"), logPath.slice("logs/".length));
}

function readRegularFileBelow(root: string, filePath: string, encoding: BufferEncoding): string;
function readRegularFileBelow(root: string, filePath: string): Buffer;
function readRegularFileBelow(
  root: string,
  filePath: string,
  encoding?: BufferEncoding,
): string | Buffer {
  if (!isCanonicalRelativePath(filePath)) {
    throw new UnsafeRunArtifactPathError();
  }

  const rootPath = resolve(root);
  const targetPath = resolve(rootPath, filePath);
  const targetRelativePath = relative(rootPath, targetPath);
  if (
    targetRelativePath === ".." ||
    targetRelativePath.startsWith(`..${sep}`) ||
    isAbsolute(targetRelativePath)
  ) {
    throw new UnsafeRunArtifactPathError();
  }

  let currentPath = rootPath;
  const rootStat = lstatSync(currentPath);
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) {
    throw new UnsafeRunArtifactPathError();
  }

  const segments = filePath.split("/");
  for (const [index, segment] of segments.entries()) {
    currentPath = join(currentPath, segment);
    const stat = lstatSync(currentPath);
    const isFinalSegment = index === segments.length - 1;
    if (
      stat.isSymbolicLink() ||
      (isFinalSegment ? !stat.isFile() : !stat.isDirectory())
    ) {
      throw new UnsafeRunArtifactPathError();
    }
  }

  return encoding ? readFileSync(targetPath, encoding) : readFileSync(targetPath);
}

function isCanonicalFileName(value: string): boolean {
  return value.length > 0 && value === basename(value) && !value.includes("\\") && !value.includes("\0");
}

function isCanonicalRelativePath(value: string): boolean {
  return (
    value.length > 0 &&
    !value.startsWith("/") &&
    !value.includes("\\") &&
    !value.includes("\0") &&
    normalize(value) === value &&
    value !== "." &&
    !value.startsWith("../")
  );
}

function isEvidenceRecord(value: unknown): value is EvidenceRecord {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const evidence = value as Partial<EvidenceRecord>;
  return (
    evidence.schemaVersion === 1 &&
    typeof evidence.evidenceId === "string" &&
    typeof evidence.criterionId === "string" &&
    typeof evidence.command?.executable === "string" &&
    Array.isArray(evidence.command.args) &&
    evidence.command.args.every((argument) => typeof argument === "string") &&
    typeof evidence.startedAt === "string" &&
    typeof evidence.durationMs === "number" &&
    typeof evidence.exitCode === "number" &&
    typeof evidence.workspaceFingerprint === "string" &&
    typeof evidence.logPath === "string" &&
    typeof evidence.logSha256 === "string" &&
    typeof evidence.summary === "string" &&
    typeof evidence.truncated === "boolean"
  );
}

class UnsafeRunArtifactPathError extends Error {}

function isMissingFile(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
