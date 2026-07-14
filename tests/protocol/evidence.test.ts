import { afterEach, describe, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { captureEvidence, TRUNCATION_MARKER } from "../../protocol/evidence";
import { computeWorkspaceFingerprint } from "../../protocol/workspace-fingerprint";
import type { EvidenceRecord, RunDefinition } from "../../protocol/types";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function createFixture(): { root: string; runPath: string } {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-evidence-"));
  roots.push(root);
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  execFileSync("git", ["config", "user.name", "Test User"], { cwd: root });
  writeFileSync(join(root, "tracked.txt"), "protected work\n");
  execFileSync("git", ["add", "tracked.txt"], { cwd: root });
  execFileSync("git", ["commit", "-qm", "initial"], { cwd: root });

  const runPath = join(root, ".extremely-hardcore", "runs", "example-change");
  mkdirSync(join(runPath, "evidence"), { recursive: true });
  mkdirSync(join(runPath, "logs"), { recursive: true });
  writeFileSync(join(runPath, "transitions.jsonl"), "");
  writeFileSync(
    join(runPath, "run.json"),
    JSON.stringify(
      {
        schemaVersion: 1,
        changeId: "example-change",
        initialState: "implemented",
        risk: "standard",
        acceptanceCriteria: [
          {
            id: "criterion-a",
            description: "The command preserves an argument containing spaces.",
            evidenceIds: [],
          },
        ],
        blockers: [],
      },
      null,
      2,
    ),
  );

  return { root, runPath };
}

describe("captureEvidence", () => {
  test("executes a command without shell interpolation and records passing evidence", async () => {
    const { root, runPath } = createFixture();
    const fingerprint = computeWorkspaceFingerprint(root);

    const evidence = await captureEvidence({
      runPath,
      criterionId: "criterion-a",
      command: ["bun", "-e", "console.log(process.argv[1])", "hello world"],
    });

    expect(evidence.exitCode).toBe(0);
    expect(evidence.command).toEqual({
      executable: "bun",
      args: ["-e", "console.log(process.argv[1])", "hello world"],
    });
    expect(evidence.workspaceFingerprint).toBe(fingerprint);
    expect(readFileSync(join(runPath, evidence.logPath), "utf8")).toContain("hello world");

    const stored = JSON.parse(
      readFileSync(join(runPath, "evidence", `${evidence.evidenceId}.json`), "utf8"),
    ) as EvidenceRecord;
    expect(stored).toEqual(evidence);

    const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
    expect(run.acceptanceCriteria[0]?.evidenceIds).toEqual([evidence.evidenceId]);
  });

  test("refreshes a criterion reference while retaining the earlier evidence record", async () => {
    const { runPath } = createFixture();
    const first = await captureEvidence({
      runPath,
      criterionId: "criterion-a",
      command: ["bun", "-e", "process.exit(0)"],
    });

    const second = await captureEvidence({
      runPath,
      criterionId: "criterion-a",
      command: ["bun", "-e", "process.exit(0)"],
    });

    const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
    expect(run.acceptanceCriteria[0]?.evidenceIds).toEqual([second.evidenceId]);
    expect(readFileSync(join(runPath, "evidence", `${first.evidenceId}.json`), "utf8"))
      .toContain(first.evidenceId);
  });

  test("bounds captured logs and marks truncation", async () => {
    const { runPath } = createFixture();

    const evidence = await captureEvidence({
      runPath,
      criterionId: "criterion-a",
      command: ["bun", "-e", "console.log('x'.repeat(1000))"],
      maxLogBytes: 80,
    });

    const log = readFileSync(join(runPath, evidence.logPath));
    expect(log.length).toBe(80);
    expect(log.subarray(-TRUNCATION_MARKER.length)).toEqual(TRUNCATION_MARKER);
    expect(evidence.truncated).toBe(true);
  });
});
