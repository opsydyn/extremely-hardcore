import { expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PACKAGE_COMMAND = ["bun", "run", "evaluate:codex-action-fixture", "--"];

test("Codex action-fixture CLI requires a new output directory and model", () => {
  const missing = Bun.spawnSync(PACKAGE_COMMAND, { stdout: "pipe", stderr: "pipe" });
  expect(missing.exitCode).toBe(1);
  expect(missing.stdout.toString()).toBe("");
  expect(missing.stderr.toString()).toContain("--output-dir is required");

  const withoutModel = Bun.spawnSync(
    [...PACKAGE_COMMAND, "--output-dir", "/tmp/extremely-hardcore-codex-action-fixture-missing-model"],
    { stdout: "pipe", stderr: "pipe" },
  );
  expect(withoutModel.exitCode).toBe(1);
  expect(withoutModel.stdout.toString()).toBe("");
  expect(withoutModel.stderr.toString()).toContain("--model is required");
});

test("Codex action-fixture CLI preserves an existing output directory before invoking Codex", () => {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-codex-action-fixture-cli-"));
  const outputDir = join(root, "artifacts");
  const sentinelPath = join(outputDir, "sentinel.txt");
  try {
    mkdirSync(outputDir);
    writeFileSync(sentinelPath, "preserve me\n");

    const result = Bun.spawnSync(
      [...PACKAGE_COMMAND, "--output-dir", outputDir, "--model", "gpt-5.6-sol"],
      { stdout: "pipe", stderr: "pipe" },
    );

    expect(result.exitCode).toBe(1);
    expect(result.stdout.toString()).toBe("");
    expect(result.stderr.toString()).toContain(`output directory already exists: ${outputDir}`);
    expect(readFileSync(sentinelPath, "utf8")).toBe("preserve me\n");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
