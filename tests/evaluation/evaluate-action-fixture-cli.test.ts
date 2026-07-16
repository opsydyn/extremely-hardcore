import { expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ActionFixtureResult } from "../../evaluation/types";

const PACKAGE_COMMAND = ["bun", "run", "evaluate:action-fixture", "--"];

test("action fixture CLI rejects a missing output directory", () => {
  const result = Bun.spawnSync(PACKAGE_COMMAND, { stdout: "pipe", stderr: "pipe" });

  expect(result.exitCode).toBe(1);
  expect(result.stdout.toString()).toBe("");
  expect(result.stderr.toString()).toContain("--output-dir is required");
});

test("action fixture CLI emits a passing deterministic reference report", () => {
  const parentPath = mkdtempSync(join(tmpdir(), "extremely-hardcore-action-fixture-cli-"));
  const outputDir = join(parentPath, "artifacts");

  try {
    const result = Bun.spawnSync([...PACKAGE_COMMAND, "--output-dir", outputDir], {
      stdout: "pipe",
      stderr: "pipe",
    });

    expect(result.exitCode).toBe(0);
    expect(result.stderr.toString()).not.toContain("action fixture evaluation failed");
    const report = JSON.parse(result.stdout.toString()) as ActionFixtureResult;
    expect(report).toMatchObject({ status: "passed", transitionCount: 1 });
    expect(report.stages).toEqual([
      expect.objectContaining({ stage: "fix", status: "passed" }),
      expect.objectContaining({ stage: "resume", status: "passed" }),
    ]);
    expect(existsSync(join(outputDir, "report.json"))).toBe(true);
    expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(report);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("action fixture CLI rejects an existing output directory without overwriting it", () => {
  const parentPath = mkdtempSync(join(tmpdir(), "extremely-hardcore-action-fixture-cli-"));
  const outputDir = join(parentPath, "artifacts");
  const sentinelPath = join(outputDir, "sentinel.txt");

  try {
    mkdirSync(outputDir);
    writeFileSync(sentinelPath, "preserve me\n");

    const result = Bun.spawnSync([...PACKAGE_COMMAND, "--output-dir", outputDir], {
      stdout: "pipe",
      stderr: "pipe",
    });

    expect(result.exitCode).toBe(1);
    expect(result.stdout.toString()).toBe("");
    expect(result.stderr.toString()).toContain(`output directory already exists: ${outputDir}`);
    expect(readFileSync(sentinelPath, "utf8")).toBe("preserve me\n");
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});
