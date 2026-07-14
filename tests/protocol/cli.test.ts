import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { RunDefinition, TransitionEvent } from "../../protocol/types";
import { createGitWorkspace } from "./support";

const CLI_PATH = join(import.meta.dir, "..", "..", "scripts", "eh.ts");
const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function createFixture(): { root: string; runPath: string } {
  const root = createGitWorkspace("extremely hardcore cli ");
  roots.push(root);

  const runPath = join(root, ".extremely-hardcore", "runs", "change with spaces");
  mkdirSync(join(runPath, "evidence"), { recursive: true });
  mkdirSync(join(runPath, "logs"), { recursive: true });
  writeFileSync(join(runPath, "transitions.jsonl"), "");
  writeFileSync(
    join(runPath, "run.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        changeId: "change-with-spaces",
        initialState: "implemented",
        risk: "standard",
        acceptanceCriteria: [
          { id: "criterion-a", description: "First check passes.", evidenceIds: [] },
          { id: "criterion-b", description: "Second check passes.", evidenceIds: [] },
        ],
        blockers: [],
      },
      null,
      2,
    )}\n`,
  );
  return { root, runPath };
}

function runCli(root: string, args: string[]): ReturnType<typeof Bun.spawnSync> {
  return Bun.spawnSync(["bun", CLI_PATH, ...args], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  });
}

describe("eh CLI", () => {
  test("reports a missing referenced evidence log as a validation error", () => {
    const { root, runPath } = createFixture();
    expect(
      runCli(root, [
        "evidence",
        runPath,
        "criterion-a",
        "--",
        "bun",
        "-e",
        "process.exit(0)",
      ]).exitCode,
    ).toBe(0);
    const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
    const evidenceId = run.acceptanceCriteria[0]?.evidenceIds[0];
    expect(evidenceId).toBeDefined();
    const evidence = JSON.parse(
      readFileSync(join(runPath, "evidence", `${evidenceId}.json`), "utf8"),
    ) as { logPath: string };
    unlinkSync(join(runPath, evidence.logPath));

    const result = runCli(root, ["validate", runPath]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr.toString()).toContain(
      `evidence.log-missing: ${evidenceId} log is missing at ${evidence.logPath}`,
    );
    expect(result.stderr.toString()).not.toContain("error:");
  });

  test("does not append a transition when a referenced evidence log is missing", () => {
    const { root, runPath } = createFixture();
    expect(
      runCli(root, [
        "evidence",
        runPath,
        "criterion-a",
        "--",
        "bun",
        "-e",
        "process.exit(0)",
      ]).exitCode,
    ).toBe(0);
    const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
    const evidenceId = run.acceptanceCriteria[0]?.evidenceIds[0];
    expect(evidenceId).toBeDefined();
    const evidence = JSON.parse(
      readFileSync(join(runPath, "evidence", `${evidenceId}.json`), "utf8"),
    ) as { logPath: string };
    unlinkSync(join(runPath, evidence.logPath));
    const runBefore = readFileSync(join(runPath, "run.json"));
    const transitionsBefore = readFileSync(join(runPath, "transitions.jsonl"));

    const result = runCli(root, ["transition", runPath, "complete"]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr.toString()).toContain(
      `evidence.log-missing: ${evidenceId} log is missing at ${evidence.logPath}`,
    );
    expect(readFileSync(join(runPath, "run.json"))).toEqual(runBefore);
    expect(readFileSync(join(runPath, "transitions.jsonl"))).toEqual(transitionsBefore);
  });

  test("reports a missing referenced evidence record as a validation error", () => {
    const { root, runPath } = createFixture();
    const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
    run.acceptanceCriteria = [
      {
        id: "criterion-a",
        description: "Evidence must exist.",
        evidenceIds: ["missing-evidence"],
      },
    ];
    writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);

    const result = runCli(root, ["validate", runPath]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr.toString()).toContain(
      "evidence.missing: missing-evidence evidence record is missing",
    );
    expect(result.stderr.toString()).not.toContain("error:");
  });

  test("does not append a transition when a referenced evidence record is missing", () => {
    const { root, runPath } = createFixture();
    const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
    run.acceptanceCriteria = [
      {
        id: "criterion-a",
        description: "Evidence must exist.",
        evidenceIds: ["missing-evidence"],
      },
    ];
    writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);
    const runBefore = readFileSync(join(runPath, "run.json"));
    const transitionsBefore = readFileSync(join(runPath, "transitions.jsonl"));

    const result = runCli(root, ["transition", runPath, "complete"]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr.toString()).toContain(
      "evidence.missing: missing-evidence evidence record is missing",
    );
    expect(readFileSync(join(runPath, "run.json"))).toEqual(runBefore);
    expect(readFileSync(join(runPath, "transitions.jsonl"))).toEqual(transitionsBefore);
  });

  test("a failed transition reports exact criteria and leaves run files unchanged", () => {
    const { root, runPath } = createFixture();
    const runBefore = readFileSync(join(runPath, "run.json"));
    const transitionsBefore = readFileSync(join(runPath, "transitions.jsonl"));

    const result = runCli(root, ["transition", runPath, "complete"]);

    expect(result.exitCode).toBe(1);
    const error = result.stderr.toString();
    expect(error).toContain("criterion.uncovered: criterion-a has no evidence");
    expect(error).toContain("criterion.uncovered: criterion-b has no evidence");
    expect(readFileSync(join(runPath, "run.json"))).toEqual(runBefore);
    expect(readFileSync(join(runPath, "transitions.jsonl"))).toEqual(transitionsBefore);
  });

  test("captures, rejects stale evidence, refreshes, and completes", () => {
    const { root, runPath } = createFixture();
    const command = ["--", "bun", "-e", "process.exit(0)"];

    expect(runCli(root, ["evidence", runPath, "criterion-a", ...command]).exitCode)
      .toBe(0);
    const afterFirst = JSON.parse(
      readFileSync(join(runPath, "run.json"), "utf8"),
    ) as RunDefinition;
    const staleEvidenceId = afterFirst.acceptanceCriteria[0]?.evidenceIds[0];
    writeFileSync(join(root, "tracked.txt"), "changed work\n");

    expect(runCli(root, ["evidence", runPath, "criterion-b", ...command]).exitCode)
      .toBe(0);
    const stale = runCli(root, ["transition", runPath, "complete"]);
    expect(stale.exitCode).toBe(1);
    expect(stale.stderr.toString()).toContain(
      `evidence.stale: ${staleEvidenceId} belongs to a different workspace fingerprint`,
    );

    expect(runCli(root, ["evidence", runPath, "criterion-a", ...command]).exitCode)
      .toBe(0);
    const completed = runCli(root, ["transition", runPath, "complete"]);
    expect(completed.exitCode).toBe(0);
    expect(completed.stdout.toString()).toContain("implemented -> complete");

    const events = readFileSync(join(runPath, "transitions.jsonl"), "utf8")
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as TransitionEvent);
    expect(events).toHaveLength(1);
    expect(events[0]?.evidenceIds).toHaveLength(2);
  });
});
