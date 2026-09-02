# bounded-context review: resolved blocked status next action

## proposed change

Correct the status projection for a blocked run after its blocker is resolved, keeping open-blocker behavior and lifecycle transitions unchanged.

## affected contexts

- Blocker records own open/resolved facts.
- Lifecycle owns `implemented`, `blocked`, and resume transitions.
- Status projection owns the next action derived from state and blocker count.
- Completion validation remains the owner of the open-blocker completion gate.

## allowed dependencies

- `protocol/status.ts` may use the existing `openBlockers` count.
- The focused test may use existing Git workspace, transition, and fingerprint helpers.
- The operator run may use the existing `eh` CLI and direct run-definition boundary for blocker resolution.

## suspicious dependencies

- Changing lifecycle legality to make the status message pass.
- Adding a blocker-resolution command or new event schema.
- Treating a status action as proof that a human decision was substantively correct.
- Altering the human-decision branch because it is adjacent to blocker handling.

## data ownership

The run definition owns blocker status. Transition history owns state. `readRunStatus` owns only the read-only handoff. It must not mutate blockers or transitions.

## transaction boundaries

Blocking and resumption append lifecycle events. Blocker resolution is an existing run-definition update between those events. Status inspection is read-only and must expose the legal next step at both points.

## integration events

No new runtime events or cross-context calls. The run retains the existing `blocked` and `implemented` transition events.

## anti-corruption needs

Keep a resolved blocker distinct from a human-decision state. Do not infer substantive review approval from the `resolved` string; this slice only corrects the handoff wording.

## verdict

safe with noted risk

The change is one local branch split with focused coverage and a real CLI lifecycle path. The only noted risk is a corrected human-readable string for an intermediate blocked state; the public shape and transition rules remain stable.
