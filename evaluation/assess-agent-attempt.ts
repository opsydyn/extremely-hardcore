import { findCoreScenario } from "./core-scenarios";
import type { AgentAttempt, AgentAttemptAssessment } from "./types";

export function assessAgentAttempt(attempt: AgentAttempt): AgentAttemptAssessment {
  const scenario = findCoreScenario(attempt.scenarioId);
  if (!scenario) {
    return {
      status: "invalid",
      scenarioId: attempt.scenarioId,
      reason: `unknown scenario: ${attempt.scenarioId}`,
    };
  }

  const missingErrorCodes = scenario.expectedErrorCodes.filter(
    (code) => !attempt.observedErrorCodes.includes(code),
  );
  return {
    status: missingErrorCodes.length === 0 ? "passed" : "failed",
    scenarioId: scenario.scenarioId,
    category: scenario.category,
    expectedErrorCodes: scenario.expectedErrorCodes,
    observedErrorCodes: attempt.observedErrorCodes,
    missingErrorCodes,
  };
}
