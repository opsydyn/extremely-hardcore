import { expect, test } from "bun:test";
import { join } from "node:path";
import type { DeclaredBaselineReport } from "../../evaluation/types";

const SCRIPT_PATH = join(import.meta.dir, "..", "..", "scripts", "evaluate-baseline.ts");
const FIXTURE_PATH = join(import.meta.dir, "fixtures", "declared-baseline.json");
const INCOMPLETE_FIXTURE_PATH = join(
  import.meta.dir,
  "fixtures",
  "declared-baseline-incomplete.json",
);

test("baseline evaluate command emits a parseable complete report", () => {
  const result = Bun.spawnSync(["bun", SCRIPT_PATH, FIXTURE_PATH], {
    stdout: "pipe",
    stderr: "pipe",
  });

  expect(result.exitCode).toBe(0);
  expect(result.stderr.toString()).toBe("");
  const report = JSON.parse(result.stdout.toString()) as DeclaredBaselineReport;
  expect(report.summary).toEqual({ total: 13, passed: 13, failed: 0, invalid: 0 });
});

test("baseline evaluate command rejects incomplete coverage", () => {
  const result = Bun.spawnSync(["bun", SCRIPT_PATH, INCOMPLETE_FIXTURE_PATH], {
    stdout: "pipe",
    stderr: "pipe",
  });

  expect(result.exitCode).toBe(1);
  expect(result.stdout.toString()).toBe("");
  expect(result.stderr.toString()).toContain("missing attempts");
});
