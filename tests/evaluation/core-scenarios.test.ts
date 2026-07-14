import { expect, test } from "bun:test";
import { runCoreScenarios } from "../../evaluation/run-core-scenarios";

test("runs every core pressure scenario and reports expected protocol outcomes", () => {
  const report = runCoreScenarios();

  expect(report.schemaVersion).toBe(1);
  expect(report.results).toHaveLength(7);
  expect(report.results.every((result) => result.status === "passed")).toBe(true);
  expect(report.results.map((result) => result.category)).toEqual([
    "uncovered-criterion",
    "failed-evidence",
    "stale-evidence",
    "missing-evidence-record",
    "missing-evidence-log",
    "open-blocker",
    "repeated-completion",
  ]);
  expect(
    report.results.find((result) => result.category === "stale-evidence")?.observedErrorCodes,
  ).toContain("evidence.stale");
  expect(
    report.results.find((result) => result.category === "repeated-completion")?.observedErrorCodes,
  ).toContain("transition.invalid-state");
});
