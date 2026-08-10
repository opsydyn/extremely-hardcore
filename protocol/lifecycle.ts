import type { RunState } from "./types";

const TERMINAL_STATES: readonly RunState[] = ["abandoned", "complete"];

export function isTerminalState(state: RunState): boolean {
  return TERMINAL_STATES.includes(state);
}

export function isLegalTransition(from: RunState, to: RunState): boolean {
  if (isTerminalState(from) || from === to) {
    return false;
  }
  if (to === "complete") {
    return from === "implemented" || from === "blocked" || from === "needs-human-decision";
  }
  if (to === "abandoned") {
    return from === "implemented" || from === "blocked" || from === "needs-human-decision";
  }
  if (to === "blocked") {
    return from === "implemented" || from === "needs-human-decision";
  }
  if (to === "needs-human-decision") {
    return from === "implemented" || from === "blocked";
  }
  return to === "implemented" && (from === "blocked" || from === "needs-human-decision");
}
