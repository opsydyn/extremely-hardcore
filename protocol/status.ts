import { readApprovals } from "./approvals";
import { deriveCurrentState, readTransitions } from "./transition";
import { readRun, validateCompletion } from "./validate-run";
import type { RunState, ValidationResult } from "./types";

export type RunStatus = {
  schemaVersion: 1;
  changeId: string;
  risk: string;
  state: RunState;
  criteria: { total: number; covered: number };
  blockers: { open: number; resolved: number };
  approvals: { required: boolean; recorded: number; current: boolean };
  validation: ValidationResult;
  nextAction: string;
};

export type RunStatusOptions = {
  workspaceFingerprint: string;
};

export function readRunStatus(runPath: string, options: RunStatusOptions): RunStatus {
  const run = readRun(runPath);
  const state = deriveCurrentState(run.initialState, readTransitions(runPath));
  const validation = validateCompletion(runPath, options);
  const approvals = readApprovals(runPath);
  const currentApproval = approvals.at(-1);
  const covered = run.acceptanceCriteria.filter((criterion) => criterion.evidenceIds.length > 0).length;
  const openBlockers = run.blockers.filter((blocker) => blocker.status === "open").length;
  const nextAction = getNextAction({
    state,
    risk: run.risk,
    covered,
    total: run.acceptanceCriteria.length,
    openBlockers,
    validation,
    currentApproval: currentApproval?.workspaceFingerprint === options.workspaceFingerprint,
  });

  return {
    schemaVersion: 1,
    changeId: run.changeId,
    risk: run.risk,
    state,
    criteria: { total: run.acceptanceCriteria.length, covered },
    blockers: {
      open: openBlockers,
      resolved: run.blockers.length - openBlockers,
    },
    approvals: {
      required: run.risk === "high",
      recorded: approvals.length,
      current: run.risk !== "high" || currentApproval?.workspaceFingerprint === options.workspaceFingerprint,
    },
    validation,
    nextAction,
  };
}

function getNextAction(input: {
  state: RunState;
  risk: string;
  covered: number;
  total: number;
  openBlockers: number;
  validation: ValidationResult;
  currentApproval: boolean;
}): string {
  if (input.state === "complete") {
    return input.validation.ok
      ? "review the attestation and hand off the completed run"
      : "start a new run; completed run validation is invalid";
  }
  if (input.state === "abandoned") {
    return "start a new run; this run is terminal";
  }
  if (input.state === "needs-human-decision") {
    return input.risk === "high" && input.validation.ok
      ? "request the guarded completion transition"
      : "record the required human decision or abandon the run";
  }
  if (input.state === "blocked") {
    return input.openBlockers > 0
      ? "resolve the open blocker, then resume or abandon the run"
      : "resume the run now that blockers are resolved, or abandon it";
  }
  if (input.openBlockers > 0) {
    return "resolve the open blocker, then resume or abandon the run";
  }
  if (input.covered < input.total) {
    return "capture evidence for every uncovered criterion";
  }
  if (input.risk === "high" && !input.currentApproval) {
    return "obtain a fresh human approval for completion";
  }
  if (!input.validation.ok) {
    return "inspect validation errors and recapture or resolve the failing gate";
  }
  return "request the guarded completion transition";
}
