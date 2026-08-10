import { randomUUID } from "node:crypto";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SCHEMA_VERSION } from "./schema-version";
import { isLegalTransition } from "./lifecycle";
import type { RunState, TransitionEvent, TransitionResult } from "./types";
import { readRun, validateCompletion } from "./validate-run";

export type TransitionOptions = {
  workspaceFingerprint: string;
  reason?: string;
};

export function transitionToComplete(
  runPath: string,
  options: TransitionOptions,
): TransitionResult {
  return transitionTo(runPath, "complete", options);
}

export function transitionTo(
  runPath: string,
  target: RunState,
  options: TransitionOptions,
): TransitionResult {
  const run = readRun(runPath);
  const transitions = readTransitions(runPath);
  const currentState = deriveCurrentState(run.initialState, transitions);
  if (!isLegalTransition(currentState, target)) {
    return {
      ok: false,
      errors: [
        {
          code: "transition.invalid-state",
          message: `cannot transition from ${currentState} to ${target}`,
        },
      ],
    };
  }

  if (!options.reason?.trim() && target !== "complete") {
    return {
      ok: false,
      errors: [{ code: "transition.reason-required", message: `${target} transitions require a reason` }],
    };
  }

  if (target === "blocked" && !run.blockers.some((blocker) => blocker.status === "open")) {
    return {
      ok: false,
      errors: [{ code: "blocker.required", message: "blocked state requires an open blocker" }],
    };
  }

  if (target === "implemented" && currentState === "blocked" && run.blockers.some((blocker) => blocker.status === "open")) {
    return {
      ok: false,
      errors: [{ code: "blocker.open", message: "blocked run cannot resume while a blocker is open" }],
    };
  }

  if (target === "complete") {
    const validation = validateCompletion(runPath, options);
    if (!validation.ok) {
      return validation;
    }
  }

  const event: TransitionEvent = {
    schemaVersion: SCHEMA_VERSION,
    transitionId: randomUUID(),
    from: currentState,
    to: target,
    at: new Date().toISOString(),
    workspaceFingerprint: options.workspaceFingerprint,
    evidenceIds: [...new Set(run.acceptanceCriteria.flatMap((criterion) => criterion.evidenceIds))],
    ...(options.reason?.trim() ? { reason: options.reason.trim() } : {}),
  };

  appendFileSync(join(runPath, "transitions.jsonl"), `${JSON.stringify(event)}\n`);
  return { ok: true, errors: [], event };
}

export function readTransitions(runPath: string): TransitionEvent[] {
  const path = join(runPath, "transitions.jsonl");
  if (!existsSync(path)) {
    return [];
  }

  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as TransitionEvent);
}

export function deriveCurrentState(
  initialState: RunState,
  transitions: TransitionEvent[],
): RunState {
  return transitions.reduce<RunState>((state, transition) => {
    if (transition.from !== state || !isLegalTransition(transition.from, transition.to)) {
      throw new Error(`invalid transition history: expected ${state}, got ${transition.from}`);
    }
    return transition.to;
  }, initialState);
}
