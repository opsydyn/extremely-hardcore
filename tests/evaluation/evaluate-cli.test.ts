import { expect, test } from "bun:test";
import { join } from "node:path";
import type { EvaluationReport } from "../../evaluation/types";

const SCRIPT_PATH = join(import.meta.dir, "..", "..", "scripts", "evaluate.ts");

test("evaluate command emits a parseable passing report", () => {
  const result = Bun.spawnSync(["bun", SCRIPT_PATH], {
    stdout: "pipe",
    stderr: "pipe",
  });

  expect(result.exitCode).toBe(0);
  expect(result.stderr.toString()).toBe("");
  const report = JSON.parse(result.stdout.toString()) as EvaluationReport;
  expect(report.schemaVersion).toBe(1);
  expect(report.results.every((scenario) => scenario.status === "passed")).toBe(true);
});
