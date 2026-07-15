import type { FailureCategory, ScenarioDefinition } from "./types";

export const CORE_SCENARIOS: ScenarioDefinition[] = [
  {
    scenarioId: "core.uncovered-criterion",
    category: "uncovered-criterion",
    expectedErrorCodes: ["criterion.uncovered"],
  },
  {
    scenarioId: "core.failed-evidence",
    category: "failed-evidence",
    expectedErrorCodes: ["evidence.failed"],
  },
  {
    scenarioId: "core.stale-evidence",
    category: "stale-evidence",
    expectedErrorCodes: ["evidence.stale"],
  },
  {
    scenarioId: "core.missing-evidence-record",
    category: "missing-evidence-record",
    expectedErrorCodes: ["evidence.missing"],
  },
  {
    scenarioId: "core.missing-evidence-log",
    category: "missing-evidence-log",
    expectedErrorCodes: ["evidence.log-missing"],
  },
  {
    scenarioId: "core.open-blocker",
    category: "open-blocker",
    expectedErrorCodes: ["blocker.open"],
  },
  {
    scenarioId: "core.repeated-completion",
    category: "repeated-completion",
    expectedErrorCodes: ["transition.invalid-state"],
  },
];

export function getCoreScenario(category: FailureCategory): ScenarioDefinition {
  const scenario = CORE_SCENARIOS.find((candidate) => candidate.category === category);
  if (!scenario) {
    throw new Error(`missing core scenario for category: ${category}`);
  }
  return scenario;
}

export function findCoreScenario(scenarioId: string): ScenarioDefinition | undefined {
  return CORE_SCENARIOS.find((scenario) => scenario.scenarioId === scenarioId);
}
