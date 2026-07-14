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

export type EvaluationReport = {
  schemaVersion: 1;
  results: ScenarioResult[];
};
