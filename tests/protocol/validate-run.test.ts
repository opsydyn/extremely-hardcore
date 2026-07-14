import { afterEach, describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateCompletion } from "../../protocol/validate-run";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function createRun(overrides: Record<string, unknown> = {}): string {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-run-"));
  roots.push(root);
  mkdirSync(join(root, "evidence"), { recursive: true });
  mkdirSync(join(root, "logs"), { recursive: true });
  writeFileSync(join(root, "transitions.jsonl"), "");
  writeFileSync(
    join(root, "run.json"),
    JSON.stringify(
      {
        schemaVersion: 1,
        changeId: "example-change",
        initialState: "implemented",
        risk: "standard",
        acceptanceCriteria: [
          {
            id: "criterion-a",
            description: "The protected behaviour is verified.",
            evidenceIds: [],
          },
        ],
        blockers: [],
        ...overrides,
      },
      null,
      2,
    ),
  );
  return root;
}

function writeEvidence(
  runPath: string,
  overrides: Record<string, unknown> = {},
): void {
  const evidenceId = "evidence-a";
  const log = "command output\n";
  writeFileSync(join(runPath, "logs", `${evidenceId}.log`), log);
  writeFileSync(
    join(runPath, "evidence", `${evidenceId}.json`),
    JSON.stringify(
      {
        schemaVersion: 1,
        evidenceId,
        criterionId: "criterion-a",
        command: {
          executable: "bun",
          args: ["test"],
        },
        startedAt: "2026-07-14T10:00:00.000Z",
        durationMs: 10,
        exitCode: 0,
        workspaceFingerprint: "workspace-a",
        logPath: `logs/${evidenceId}.log`,
        logSha256: createHash("sha256").update(log).digest("hex"),
        summary: "command output",
        truncated: false,
        ...overrides,
      },
      null,
      2,
    ),
  );
}

describe("validateCompletion", () => {
  test("rejects a run with an uncovered acceptance criterion", () => {
    const runPath = createRun();

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({
      code: "criterion.uncovered",
      message: "criterion-a has no evidence",
    });
  });

  test("rejects evidence from a command that failed", () => {
    const runPath = createRun({
      acceptanceCriteria: [
        {
          id: "criterion-a",
          description: "The protected behaviour is verified.",
          evidenceIds: ["evidence-a"],
        },
      ],
    });
    writeEvidence(runPath, { exitCode: 1 });

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({
      code: "evidence.failed",
      message: "evidence-a exited with status 1",
    });
  });

  test("reports a referenced evidence record that is missing", () => {
    const runPath = createRun({
      acceptanceCriteria: [
        {
          id: "criterion-a",
          description: "The protected behaviour is verified.",
          evidenceIds: ["missing-evidence"],
        },
      ],
    });

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result).toEqual({
      ok: false,
      errors: [
        {
          code: "evidence.missing",
          message: "missing-evidence evidence record is missing",
        },
      ],
    });
  });

  test("reports a referenced evidence log that is missing", () => {
    const runPath = createRun({
      acceptanceCriteria: [
        {
          id: "criterion-a",
          description: "The protected behaviour is verified.",
          evidenceIds: ["evidence-a"],
        },
      ],
    });
    writeEvidence(runPath);
    unlinkSync(join(runPath, "logs", "evidence-a.log"));

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result).toEqual({
      ok: false,
      errors: [
        {
          code: "evidence.log-missing",
          message: "evidence-a log is missing at logs/evidence-a.log",
        },
      ],
    });
  });

  test("rejects passing evidence from a stale workspace", () => {
    const runPath = createRun({
      acceptanceCriteria: [
        {
          id: "criterion-a",
          description: "The protected behaviour is verified.",
          evidenceIds: ["evidence-a"],
        },
      ],
    });
    writeEvidence(runPath);

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-b",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({
      code: "evidence.stale",
      message: "evidence-a belongs to a different workspace fingerprint",
    });
  });

  test("rejects a run with an open blocker", () => {
    const runPath = createRun({
      acceptanceCriteria: [
        {
          id: "criterion-a",
          description: "The protected behaviour is verified.",
          evidenceIds: ["evidence-a"],
        },
      ],
      blockers: [
        {
          id: "blocker-a",
          description: "Architecture review is unresolved.",
          status: "open",
        },
      ],
    });
    writeEvidence(runPath);

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({
      code: "blocker.open",
      message: "blocker-a is still open",
    });
  });

  test("rejects evidence attached to a different criterion", () => {
    const runPath = createRun({
      acceptanceCriteria: [
        {
          id: "criterion-a",
          description: "The protected behaviour is verified.",
          evidenceIds: ["evidence-a"],
        },
      ],
    });
    writeEvidence(runPath, { criterionId: "criterion-b" });

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result.errors).toContainEqual({
      code: "evidence.criterion-mismatch",
      message: "evidence-a belongs to criterion-b, not criterion-a",
    });
  });

  test("rejects evidence when its log digest does not match", () => {
    const runPath = createRun({
      acceptanceCriteria: [
        {
          id: "criterion-a",
          description: "The protected behaviour is verified.",
          evidenceIds: ["evidence-a"],
        },
      ],
    });
    writeEvidence(runPath, { logSha256: "not-the-log-digest" });

    const result = validateCompletion(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result.errors).toContainEqual({
      code: "evidence.log-digest-mismatch",
      message: "evidence-a log digest does not match logs/evidence-a.log",
    });
  });
});
