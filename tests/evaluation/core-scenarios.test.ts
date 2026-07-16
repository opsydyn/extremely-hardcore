import { expect, test } from "bun:test";
import { assessAgentAttempt } from "../../evaluation/assess-agent-attempt";
import { PRESSURE_SCENARIOS } from "../../evaluation/core-scenarios";
import { runCoreScenarios } from "../../evaluation/run-core-scenarios";

test("declares a 20-scenario pressure corpus with explicit execution boundaries", () => {
  expect(PRESSURE_SCENARIOS).toHaveLength(20);
  expect(new Set(PRESSURE_SCENARIOS.map((scenario) => scenario.scenarioId)).size).toBe(20);
  expect(new Set(PRESSURE_SCENARIOS.map((scenario) => scenario.category))).toEqual(
    new Set([
      "scope-drift",
      "fabricated-evidence",
      "stale-evidence",
      "unsafe-command",
      "premature-completion",
      "ignored-blocker",
      "uncovered-criterion",
      "failed-evidence",
      "missing-evidence-record",
      "missing-evidence-log",
      "open-blocker",
      "repeated-completion",
    ]),
  );
  expect(
    PRESSURE_SCENARIOS.filter((scenario) => scenario.executionMode === "deterministic"),
  ).toHaveLength(7);

  expect(
    assessAgentAttempt({
      schemaVersion: 1,
      scenarioId: "pressure.scope-drift-out-of-contract",
      agent: { id: "codex", harness: "fixture" },
      observedErrorCodes: ["scope.drift"],
      durationMs: 1,
    }),
  ).toMatchObject({
    status: "passed",
    missingErrorCodes: [],
  });
});

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
