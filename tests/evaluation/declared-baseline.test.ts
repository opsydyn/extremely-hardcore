import { expect, test } from "bun:test";
import { AGENT_ATTEMPT_SCENARIOS } from "../../evaluation/core-scenarios";
import { assessDeclaredBaseline } from "../../evaluation/run-declared-baseline";
import type { DeclaredBaselineInput } from "../../evaluation/types";

function completeBaseline(): DeclaredBaselineInput {
  return {
    schemaVersion: 1,
    baseline: {
      id: "fixture-baseline",
      kind: "without-extremely-hardcore",
      harness: "fixture",
    },
    attempts: AGENT_ATTEMPT_SCENARIOS.map((scenario) => ({
      schemaVersion: 1,
      scenarioId: scenario.scenarioId,
      agent: { id: "fixture-agent", harness: "fixture" },
      observedErrorCodes: scenario.expectedErrorCodes,
      durationMs: 1,
    })),
  };
}

test("assesses one complete declared baseline across every behavioural scenario", () => {
  const report = assessDeclaredBaseline(completeBaseline());

  expect(report.schemaVersion).toBe(1);
  expect(report.baseline).toEqual({
    id: "fixture-baseline",
    kind: "without-extremely-hardcore",
    harness: "fixture",
  });
  expect(report.results).toHaveLength(13);
  expect(report.results.every((result) => result.status === "passed")).toBe(true);
  expect(report.summary).toEqual({ total: 13, passed: 13, failed: 0, invalid: 0 });
});

test("rejects incomplete and duplicate baseline scenario coverage", () => {
  const incomplete = completeBaseline();
  incomplete.attempts.pop();
  expect(() => assessDeclaredBaseline(incomplete)).toThrow("missing attempts");

  const duplicate = completeBaseline();
  duplicate.attempts[1] = duplicate.attempts[0]!;
  expect(() => assessDeclaredBaseline(duplicate)).toThrow("duplicate attempt");
});
