import { expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { captureEvidence } from "../../protocol/evidence";
import { transitionToComplete } from "../../protocol/transition";
import { computeWorkspaceFingerprint } from "../../protocol/workspace-fingerprint";
import { createReferenceBoundedBugFixExecutor } from "../../evaluation/reference-bounded-bug-fix-executor";
import { runBoundedBugFixFixture } from "../../evaluation/run-bounded-bug-fix-fixture";
import type { ActionFixtureExecutor } from "../../evaluation/types";

function createOutputDir(): { parentPath: string; outputDir: string } {
  const parentPath = mkdtempSync(join(tmpdir(), "extremely-hardcore-action-fixture-"));

  return { parentPath, outputDir: join(parentPath, "artifacts") };
}

function createFixOnlyExecutor(): ActionFixtureExecutor {
  return async (request) => {
    if (request.stage !== "fix") return;

    writeFileSync(
      join(request.workspace, "src", "release-label.ts"),
      [
        "export function releaseLabel(name: string): string {",
        "  return `release:${name.trim()}`;",
        "}",
        "",
      ].join("\n"),
    );
    await captureEvidence({
      runPath: request.runPath,
      criterionId: request.criterionId,
      command: request.requiredTestCommand,
    });
  };
}

test("runs the bounded bug-fix fixture through fresh evidence and completion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: createReferenceBoundedBugFixExecutor(),
    });

    expect(result.status).toBe("passed");
    expect(result.stages).toEqual([
      expect.objectContaining({ stage: "fix", status: "passed" }),
      expect.objectContaining({ stage: "resume", status: "passed" }),
    ]);
    expect(result.transitionCount).toBe(1);
    expect(result.artifacts.map(({ path }) => path)).toEqual([
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/run.json",
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/transitions.jsonl",
      "workspace/FIXTURE.md",
      "workspace/fixture-state.txt",
      "workspace/src/release-label.ts",
      "workspace/tests/release-label.test.ts",
      ...result.artifacts
        .map(({ path }) => path)
        .filter((path) => path.includes("/evidence/") || path.includes("/logs/"))
        .sort(),
    ].sort());
    expect(result.artifacts.map(({ path }) => path)).not.toContain("report.json");
    expect(result.artifacts.every(({ sha256 }) => sha256.length === 64)).toBe(true);
    expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("fails an executor that changes a forbidden path", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeFileSync(join(request.workspace, "package.json"), "{}\n");
        }
      },
    });

    expect(result).toMatchObject({ status: "failed" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.forbidden-diff" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("fails when Stage B leaves Stage A evidence stale", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: createFixOnlyExecutor(),
    });

    expect(result).toMatchObject({ status: "failed" });
    expect(result.failures).toContainEqual(expect.objectContaining({ code: "evidence.stale" }));
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("fails a completion transition attempted during Stage A", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
        const transition = transitionToComplete(request.runPath, {
          workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
        });
        expect(transition.ok).toBe(true);
      },
    });

    expect(result).toMatchObject({ status: "failed" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.premature-completion" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});
