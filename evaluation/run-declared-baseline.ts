import { assessAgentAttempt } from "./assess-agent-attempt";
import { AGENT_ATTEMPT_SCENARIOS } from "./core-scenarios";
import type { DeclaredBaselineInput, DeclaredBaselineReport } from "./types";

export function assessDeclaredBaseline(input: DeclaredBaselineInput): DeclaredBaselineReport {
  const attemptsByScenarioId = new Map<string, DeclaredBaselineInput["attempts"][number]>();

  for (const attempt of input.attempts) {
    const scenario = AGENT_ATTEMPT_SCENARIOS.find(
      (candidate) => candidate.scenarioId === attempt.scenarioId,
    );
    if (!scenario) {
      throw new Error(`unexpected baseline scenario: ${attempt.scenarioId}`);
    }
    if (attemptsByScenarioId.has(attempt.scenarioId)) {
      throw new Error(`duplicate attempt for scenario: ${attempt.scenarioId}`);
    }
    attemptsByScenarioId.set(attempt.scenarioId, attempt);
  }

  const missingScenarioIds = AGENT_ATTEMPT_SCENARIOS.filter(
    (scenario) => !attemptsByScenarioId.has(scenario.scenarioId),
  ).map((scenario) => scenario.scenarioId);
  if (missingScenarioIds.length > 0) {
    throw new Error(`missing attempts for scenarios: ${missingScenarioIds.join(", ")}`);
  }

  const results = AGENT_ATTEMPT_SCENARIOS.map((scenario) =>
    assessAgentAttempt(attemptsByScenarioId.get(scenario.scenarioId)!),
  );
  return {
    schemaVersion: 1,
    baseline: input.baseline,
    results,
    summary: {
      total: results.length,
      passed: results.filter((result) => result.status === "passed").length,
      failed: results.filter((result) => result.status === "failed").length,
      invalid: results.filter((result) => result.status === "invalid").length,
    },
  };
}
