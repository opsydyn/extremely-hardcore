import { expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
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
      "workspace/fixture-tests/release-label.fixture.ts",
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

test("invalidates an executor that commits a forbidden fixture-test edit during Stage A", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeFileSync(
            join(request.workspace, "src", "release-label.ts"),
            [
              "export function releaseLabel(name: string): string {",
              "  return `release:${name.trim()}`;",
              "}",
              "",
            ].join("\n"),
          );
          writeFileSync(
            join(request.workspace, "fixture-tests", "release-label.fixture.ts"),
            [
              "// Executor-controlled fixture edit.",
              'import { expect, test } from "bun:test";',
              'import { releaseLabel } from "../src/release-label";',
              "",
              'test("prefixes a trimmed release label", () => {',
              '  expect(releaseLabel("  Candidate  ")).toBe("release:Candidate");',
              "});",
              "",
            ].join("\n"),
          );
          execFileSync("git", ["add", "fixture-tests/release-label.fixture.ts"], {
            cwd: request.workspace,
          });
          execFileSync("git", ["commit", "-qm", "tamper fixture test"], {
            cwd: request.workspace,
          });
          await captureEvidence({
            runPath: request.runPath,
            criterionId: request.criterionId,
            command: request.requiredTestCommand,
          });
        }
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.forbidden-diff", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("fails an executor that exits before Bun runs the required test assertion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "process.exit(0);",
            "",
            "export function releaseLabel(name: string): string {",
            "  return name.trim();",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
      },
    });

    expect(result).toMatchObject({ status: "failed" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.required-test-failed" }),
        ]),
      }),
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

test("invalidates an executor that rewrites the harness-owned marker during resume", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeFileSync(
            join(request.workspace, "src", "release-label.ts"),
            [
              "export function releaseLabel(name: string): string {",
              "  return `release:${name.trim()}`;",
              "}",
              "",
            ].join("\n"),
          );
        } else {
          writeFileSync(join(request.workspace, "fixture-state.txt"), "executor controlled\n");
        }

        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });

        if (request.stage === "resume") {
          const transition = transitionToComplete(request.runPath, {
            workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
          });
          expect(transition.ok).toBe(true);
        }
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "resume",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.marker-modified", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a correct Stage A source fix with no protocol evidence", async () => {
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
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "criterion.uncovered", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a correct Stage A source fix with failed evidence capture", async () => {
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
          command: ["bun", "-e", "process.exit(1)"],
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "evidence.failed", kind: "invalid" }),
        ]),
      }),
    );
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
