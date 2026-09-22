import { expect, test } from "bun:test";
import { AGENT_ATTEMPT_SCENARIOS } from "../../evaluation/core-scenarios";
import { assessFullEvaluation, buildFullEvaluation } from "../../evaluation/full-evaluation";
import type { AgentAttempt } from "../../evaluation/types";

function passingAttempts(): AgentAttempt[] {
  return AGENT_ATTEMPT_SCENARIOS.map((scenario) => ({
    schemaVersion: 1,
    scenarioId: scenario.scenarioId,
    agent: { id: "fixture-agent", harness: "fixture" },
    observedErrorCodes: scenario.expectedErrorCodes,
    durationMs: 1,
  }));
}

test("fails every repetition when attempts return all allowed codes", () => {
  const allCodes = [...new Set(AGENT_ATTEMPT_SCENARIOS.flatMap((scenario) => scenario.expectedErrorCodes))];
  const attempts = passingAttempts().map((attempt) => ({
    ...attempt, observedErrorCodes: allCodes,
  }));
  const report = buildFullEvaluation(attempts, 3);
  expect(report.status).toBe("failed");
  expect(report.summary).toEqual({ repetitions: 3, passed: 0, failed: 3 });
  expect(report.repetitions.every((repetition) => repetition.status === "failed")).toBe(true);
});

test("runs and assesses the full corpus for the required repetitions", () => {
  const report = buildFullEvaluation(passingAttempts(), 3);

  expect(report.policy.corpusScenarioCount).toBe(20);
  expect(report.summary).toEqual({ repetitions: 3, passed: 3, failed: 0 });
  expect(report.status).toBe("passed");
});

test("fails closed when a critical agent-attempt scenario is missing", () => {
  const attempts = passingAttempts();
  attempts.pop();
  expect(() => buildFullEvaluation(attempts, 3)).toThrow("missing attempts");
});

test("fails a repetition when a critical observed code is absent", () => {
  const attempts = passingAttempts();
  attempts[0] = { ...attempts[0]!, observedErrorCodes: [] };
  const report = assessFullEvaluation({
    schemaVersion: 1,
    repetitions: [
      {
        repetition: 1,
        deterministic: { schemaVersion: 1, results: [] },
        attempts,
      },
    ],
  });

  expect(report.status).toBe("failed");
  expect(report.repetitions[0]?.status).toBe("failed");
});
