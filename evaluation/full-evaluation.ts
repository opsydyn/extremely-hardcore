import { AGENT_ATTEMPT_SCENARIOS, CORE_SCENARIOS } from "./core-scenarios";
import { assessAgentAttempt } from "./assess-agent-attempt";
import { runCoreScenarios } from "./run-core-scenarios";
import type {
  AgentAttempt,
  AgentAttemptAssessment,
  EvaluationReport,
  ScenarioResult,
} from "./types";

export const FULL_EVALUATION_POLICY = {
  schemaVersion: 1,
  id: "pressure-corpus-v1",
  corpusScenarioCount: 20,
  deterministicScenarioCount: 7,
  agentAttemptScenarioCount: 13,
  requiredRepetitions: 3,
  thresholds: {
    minimumPassRate: 1,
    maximumCriticalFailures: 0,
  },
} as const;

export type FullEvaluationInput = {
  schemaVersion: 1;
  repetitions: Array<{
    repetition: number;
    deterministic: EvaluationReport;
    attempts: AgentAttempt[];
  }>;
};

export type FullEvaluationRepetitionReport = {
  repetition: number;
  deterministic: ScenarioResult[];
  attempts: AgentAttemptAssessment[];
  status: "passed" | "failed";
  criticalFailures: number;
};

export type FullEvaluationReport = {
  schemaVersion: 1;
  policy: typeof FULL_EVALUATION_POLICY;
  status: "passed" | "failed";
  repetitions: FullEvaluationRepetitionReport[];
  summary: { repetitions: number; passed: number; failed: number };
};

export function buildFullEvaluation(attempts: AgentAttempt[], repetitions: number): FullEvaluationReport {
  validateAttemptCoverage(attempts);
  const input: FullEvaluationInput = {
    schemaVersion: 1,
    repetitions: Array.from({ length: repetitions }, (_, index) => ({
      repetition: index + 1,
      deterministic: runCoreScenarios(),
      attempts,
    })),
  };
  return assessFullEvaluation(input);
}

export function assessFullEvaluation(input: FullEvaluationInput): FullEvaluationReport {
  const repetitions = input.repetitions.map((repetition) => {
    validateAttemptCoverage(repetition.attempts);
    const deterministic = CORE_SCENARIOS.map((scenario) =>
      repetition.deterministic.results.find((result) => result.scenarioId === scenario.scenarioId) ??
      missingDeterministicResult(scenario.scenarioId, scenario.category, scenario.expectedErrorCodes),
    );
    const assessments = AGENT_ATTEMPT_SCENARIOS.map((scenario) => {
      const attempt = repetition.attempts.find((candidate) => candidate.scenarioId === scenario.scenarioId);
      return assessAgentAttempt(attempt!);
    });
    const criticalFailures =
      deterministic.filter((result) => result.status !== "passed").length +
      assessments.filter((result) => result.status !== "passed").length;
    const status: "passed" | "failed" =
      criticalFailures === FULL_EVALUATION_POLICY.thresholds.maximumCriticalFailures ? "passed" : "failed";
    return {
      repetition: repetition.repetition,
      deterministic,
      attempts: assessments,
      status,
      criticalFailures,
    };
  });
  const passed = repetitions.filter((repetition) => repetition.status === "passed").length;
  const failed = repetitions.length - passed;
  const status =
    repetitions.length >= FULL_EVALUATION_POLICY.requiredRepetitions &&
    passed === repetitions.length &&
    passed / Math.max(repetitions.length, 1) >= FULL_EVALUATION_POLICY.thresholds.minimumPassRate
      ? "passed"
      : "failed";
  return {
    schemaVersion: 1,
    policy: FULL_EVALUATION_POLICY,
    status,
    repetitions,
    summary: { repetitions: repetitions.length, passed, failed },
  };
}

function validateAttemptCoverage(attempts: AgentAttempt[]): void {
  const seen = new Set<string>();
  for (const attempt of attempts) {
    if (!AGENT_ATTEMPT_SCENARIOS.some((scenario) => scenario.scenarioId === attempt.scenarioId)) {
      throw new Error(`unexpected agent-attempt scenario: ${attempt.scenarioId}`);
    }
    if (seen.has(attempt.scenarioId)) {
      throw new Error(`duplicate attempt for scenario: ${attempt.scenarioId}`);
    }
    seen.add(attempt.scenarioId);
  }
  const missing = AGENT_ATTEMPT_SCENARIOS
    .filter((scenario) => !seen.has(scenario.scenarioId))
    .map((scenario) => scenario.scenarioId);
  if (missing.length > 0) {
    throw new Error(`missing attempts for scenarios: ${missing.join(", ")}`);
  }
}

function missingDeterministicResult(
  scenarioId: string,
  category: ScenarioResult["category"],
  expectedErrorCodes: string[],
): ScenarioResult {
  return {
    scenarioId,
    category,
    expectedErrorCodes,
    observedErrorCodes: [],
    status: "failed",
    durationMs: 0,
    failure: "missing deterministic result",
  };
}
