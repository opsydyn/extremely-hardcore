import { expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ActionFixtureResult } from "../../evaluation/types";

const SCRIPT_PATH = join(import.meta.dir, "..", "..", "scripts", "evaluate-action-fixture.ts");

test("action fixture CLI rejects a missing output directory", () => {
  const result = Bun.spawnSync(["bun", SCRIPT_PATH], { stdout: "pipe", stderr: "pipe" });

  expect(result.exitCode).toBe(1);
  expect(result.stdout.toString()).toBe("");
  expect(result.stderr.toString()).toContain("--output-dir is required");
});

test("action fixture CLI emits a passing deterministic reference report", () => {
  const parentPath = mkdtempSync(join(tmpdir(), "extremely-hardcore-action-fixture-cli-"));
  const outputDir = join(parentPath, "artifacts");

  try {
    const result = Bun.spawnSync(["bun", SCRIPT_PATH, "--output-dir", outputDir], {
      stdout: "pipe",
      stderr: "pipe",
    });

    expect(result.exitCode).toBe(0);
    expect(result.stderr.toString()).toBe("");
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
