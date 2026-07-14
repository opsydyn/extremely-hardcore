import { randomUUID } from "node:crypto";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SCHEMA_VERSION } from "./schema-version";
import type { RunState, TransitionEvent, TransitionResult } from "./types";
import { readRun, validateCompletion } from "./validate-run";

export type TransitionOptions = {
  workspaceFingerprint: string;
};

export function transitionToComplete(
  runPath: string,
  options: TransitionOptions,
): TransitionResult {
  const validation = validateCompletion(runPath, options);
  if (!validation.ok) {
    return validation;
  }

  const run = readRun(runPath);
  const transitions = readTransitions(runPath);
  const currentState = deriveCurrentState(run.initialState, transitions);
  if (currentState !== "implemented") {
    return {
      ok: false,
      errors: [
        {
          code: "transition.invalid-state",
          message: `cannot transition from ${currentState} to complete`,
        },
      ],
    };
  }

  const event: TransitionEvent = {
    schemaVersion: SCHEMA_VERSION,
    transitionId: randomUUID(),
    from: "implemented",
    to: "complete",
    at: new Date().toISOString(),
    workspaceFingerprint: options.workspaceFingerprint,
    evidenceIds: [...new Set(run.acceptanceCriteria.flatMap((criterion) => criterion.evidenceIds))],
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
    if (transition.from !== state) {
      throw new Error(`invalid transition history: expected ${state}, got ${transition.from}`);
    }
    return transition.to;
  }, initialState);
}
