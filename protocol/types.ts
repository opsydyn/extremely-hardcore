import type { SCHEMA_VERSION } from "./schema-version";

export type Risk = "trivial" | "standard" | "high";
export type RiskFactor =
  | "blast-radius"
  | "reversibility"
  | "data-sensitivity"
  | "privilege"
  | "public-contract"
  | "operational-impact"
  | "uncertainty";
export type RiskLevel = "low" | "medium" | "high";
export type RiskAssessment = {
  factors: Partial<Record<RiskFactor, RiskLevel>>;
  rationale?: string;
};
export type RunState =
  | "implemented"
  | "blocked"
  | "needs-human-decision"
  | "abandoned"
  | "complete";

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
  riskAssessment?: RiskAssessment;
  acceptanceCriteria: AcceptanceCriterion[];
  blockers: Blocker[];
};

export type ApprovalDecision = "approved" | "rejected";

export type ApprovalRecord = {
  schemaVersion: typeof SCHEMA_VERSION;
  approvalId: string;
  approver: string;
  decision: ApprovalDecision;
  gate: "complete";
  at: string;
  workspaceFingerprint: string;
  reason: string;
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
  from: RunState;
  to: RunState;
  at: string;
  workspaceFingerprint: string;
  evidenceIds: string[];
  reason?: string;
};

export type TransitionResult = ValidationResult & {
  event?: TransitionEvent;
};
