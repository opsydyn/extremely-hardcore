export type FailureCategory =
  | "scope-drift"
  | "fabricated-evidence"
  | "uncovered-criterion"
  | "failed-evidence"
  | "stale-evidence"
  | "missing-evidence-record"
  | "missing-evidence-log"
  | "open-blocker"
  | "repeated-completion"
  | "unsafe-command"
  | "premature-completion"
  | "ignored-blocker";

export type ScenarioExecutionMode = "deterministic" | "agent-attempt";

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
  executionMode: ScenarioExecutionMode;
  pressure: string;
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

export type DeclaredBaseline = {
  id: string;
  kind: "without-extremely-hardcore";
  harness: string;
};

export type DeclaredBaselineInput = {
  schemaVersion: 1;
  baseline: DeclaredBaseline;
  attempts: AgentAttempt[];
};

export type DeclaredBaselineReport = {
  schemaVersion: 1;
  baseline: DeclaredBaseline;
  results: AgentAttemptAssessment[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    invalid: number;
  };
};

export type AdapterMode = "without-extremely-hardcore" | "with-extremely-hardcore";

export type ArtifactDigest = {
  path: string;
  sha256: string;
  bytes: number;
};

export type ActionFixtureStage = "fix" | "resume";

export type ActionFixtureFailure = {
  code: string;
  kind: "failed" | "invalid";
  message: string;
};

export type ActionFixtureRequest = {
  fixtureId: "action.bounded-bug-fix";
  stage: ActionFixtureStage;
  workspace: string;
  runPath: string;
  taskPath: string;
  criterionId: "required-test-passes";
  requiredTestCommand: ["bun", "test", "tests/release-label.test.ts"];
};

export type ActionFixtureExecutor = (request: ActionFixtureRequest) => Promise<void> | void;

export type ActionFixtureStageResult = {
  stage: ActionFixtureStage;
  status: "passed" | "failed" | "invalid";
  workspaceFingerprint: string;
  failures: ActionFixtureFailure[];
};

export type ActionFixtureResult = {
  schemaVersion: 1;
  fixtureId: "action.bounded-bug-fix";
  status: "passed" | "failed" | "invalid";
  stages: ActionFixtureStageResult[];
  transitionCount: number;
  artifacts: ArtifactDigest[];
  failures: ActionFixtureFailure[];
};

export type CodexAttemptProvenance = {
  scenarioId: string;
  startedAt: string;
  durationMs: number;
  command: string[];
  artifacts: ArtifactDigest[];
};

export type CodexAdapterReport = {
  schemaVersion: 1;
  adapter: {
    id: "codex-cli";
    version: string;
    model: string;
    mode: AdapterMode;
    sandbox: "read-only";
  };
  attempts: AgentAttempt[];
  assessments: AgentAttemptAssessment[];
  sharedArtifacts: ArtifactDigest[];
  provenance: CodexAttemptProvenance[];
};

export type EvaluationReport = {
  schemaVersion: 1;
  results: ScenarioResult[];
};
