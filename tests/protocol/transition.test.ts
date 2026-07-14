import { afterEach, describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { transitionToComplete } from "../../protocol/transition";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function createRun(): string {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-transition-"));
  roots.push(root);
  mkdirSync(join(root, "evidence"), { recursive: true });
  mkdirSync(join(root, "logs"), { recursive: true });
  writeFileSync(join(root, "transitions.jsonl"), "");
  writeFileSync(
    join(root, "run.json"),
    `${JSON.stringify(
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
      },
      null,
      2,
    )}\n`,
  );
  return root;
}

function coverCriterion(runPath: string): void {
  const log = Buffer.from("verification passed\n");
  writeFileSync(join(runPath, "logs", "evidence-a.log"), log);
  writeFileSync(
    join(runPath, "evidence", "evidence-a.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        evidenceId: "evidence-a",
        criterionId: "criterion-a",
        command: { executable: "bun", args: ["test"] },
        startedAt: "2026-07-14T12:00:00.000Z",
        durationMs: 10,
        exitCode: 0,
        workspaceFingerprint: "workspace-a",
        logPath: "logs/evidence-a.log",
        logSha256: createHash("sha256").update(log).digest("hex"),
        summary: "verification passed",
        truncated: false,
      },
      null,
      2,
    )}\n`,
  );

  const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8"));
  run.acceptanceCriteria[0].evidenceIds.push("evidence-a");
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);
}

describe("transitionToComplete", () => {
  test("does not modify the run when completion validation fails", () => {
    const runPath = createRun();
    const runBefore = readFileSync(join(runPath, "run.json"));
    const transitionsBefore = readFileSync(join(runPath, "transitions.jsonl"));

    const result = transitionToComplete(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result.ok).toBe(false);
    expect(readFileSync(join(runPath, "run.json"))).toEqual(runBefore);
    expect(readFileSync(join(runPath, "transitions.jsonl"))).toEqual(transitionsBefore);
  });

  test("appends one completion event with the evidence that justified it", () => {
    const runPath = createRun();
    coverCriterion(runPath);

    const result = transitionToComplete(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result.ok).toBe(true);
    expect(result.event).toMatchObject({
      schemaVersion: 1,
      from: "implemented",
      to: "complete",
      workspaceFingerprint: "workspace-a",
      evidenceIds: ["evidence-a"],
    });
    const lines = readFileSync(join(runPath, "transitions.jsonl"), "utf8")
      .trim()
      .split("\n");
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0])).toEqual(result.event);
  });

  test("rejects a repeated completion without appending another event", () => {
    const runPath = createRun();
    coverCriterion(runPath);
    expect(
      transitionToComplete(runPath, { workspaceFingerprint: "workspace-a" }).ok,
    ).toBe(true);
    const before = readFileSync(join(runPath, "transitions.jsonl"));

    const result = transitionToComplete(runPath, {
      workspaceFingerprint: "workspace-a",
    });

    expect(result).toEqual({
      ok: false,
      errors: [
        {
          code: "transition.invalid-state",
          message: "cannot transition from complete to complete",
        },
      ],
    });
    expect(readFileSync(join(runPath, "transitions.jsonl"))).toEqual(before);
  });
});
