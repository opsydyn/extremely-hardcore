import type { SCHEMA_VERSION } from "./schema-version";

export type Risk = "trivial" | "standard" | "high";
export type RunState = "implemented" | "complete";

export type AcceptanceCriterion = {
  id: string;
  description: string;
  evidenceIds: string[];
};

export type Blocker = {
  id: string;
  description: string;
  status: "open" | "resolved";
};

export type RunDefinition = {
  schemaVersion: typeof SCHEMA_VERSION;
  changeId: string;
  initialState: "implemented";
  risk: Risk;
  acceptanceCriteria: AcceptanceCriterion[];
  blockers: Blocker[];
};

export type EvidenceRecord = {
  schemaVersion: typeof SCHEMA_VERSION;
  evidenceId: string;
  criterionId: string;
  command: {
    executable: string;
    args: string[];
  };
  startedAt: string;
  durationMs: number;
  exitCode: number;
  workspaceFingerprint: string;
  logPath: string;
  logSha256: string;
  summary: string;
  truncated: boolean;
};

export type ValidationError = {
  code: string;
  message: string;
};

export type ValidationResult = {
  ok: boolean;
  errors: ValidationError[];
};

export type TransitionEvent = {
  schemaVersion: typeof SCHEMA_VERSION;
  transitionId: string;
  from: "implemented";
  to: "complete";
  at: string;
  workspaceFingerprint: string;
  evidenceIds: string[];
};

export type TransitionResult = ValidationResult & {
  event?: TransitionEvent;
};
