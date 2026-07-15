export type FailureCategory =
  | "uncovered-criterion"
  | "failed-evidence"
  | "stale-evidence"
  | "missing-evidence-record"
  | "missing-evidence-log"
  | "open-blocker"
  | "repeated-completion";

export type ScenarioResult = {
  scenarioId: string;
  category: FailureCategory;
  expectedErrorCodes: string[];
  observedErrorCodes: string[];
  status: "passed" | "failed";
  durationMs: number;
  failure?: string;
};

export type ScenarioDefinition = {
  scenarioId: string;
  category: FailureCategory;
  expectedErrorCodes: string[];
};

export type AgentAttempt = {
  schemaVersion: 1;
  scenarioId: string;
  agent: {
    id: string;
    harness: string;
  };
  observedErrorCodes: string[];
  durationMs: number;
};

export type AgentAttemptAssessment =
  | {
      status: "passed" | "failed";
      scenarioId: string;
      category: FailureCategory;
      expectedErrorCodes: string[];
      observedErrorCodes: string[];
      missingErrorCodes: string[];
    }
  | {
      status: "invalid";
      scenarioId: string;
      reason: string;
    };

export type EvaluationReport = {
  schemaVersion: 1;
  results: ScenarioResult[];
};
