import { expect, test } from "bun:test";
import { join } from "node:path";

const SCRIPT_PATH = join(import.meta.dir, "..", "..", "scripts", "evaluate-codex.ts");

test("Codex adapter CLI rejects missing required arguments before invocation", () => {
  const result = Bun.spawnSync(["bun", SCRIPT_PATH], {
    stdout: "pipe",
    stderr: "pipe",
  });

  expect(result.exitCode).toBe(1);
  expect(result.stdout.toString()).toBe("");
  expect(result.stderr.toString()).toContain("--output-dir is required");
});

test("Codex adapter CLI rejects a missing requested model before invocation", () => {
  const result = Bun.spawnSync(
    [
      "bun",
      SCRIPT_PATH,
      "--output-dir",
      "/tmp/extremely-hardcore-codex-unused",
      "--mode",
      "without-extremely-hardcore",
    ],
    {
      stdout: "pipe",
      stderr: "pipe",
    },
  );

  expect(result.exitCode).toBe(1);
  expect(result.stdout.toString()).toBe("");
  expect(result.stderr.toString()).toContain("--model is required");
});
