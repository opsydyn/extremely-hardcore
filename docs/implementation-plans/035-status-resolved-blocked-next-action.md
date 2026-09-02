# implementation plan: resolved blocked status next action

## behaviour to protect

`eh status` must distinguish an open blocker from a resolved blocker while the run is still in `blocked` state. Open blockers retain `resolve the open blocker, then resume or abandon the run`. Zero open blockers return `resume the run now that blockers are resolved, or abandon it`. The existing `blocked -> implemented` transition must continue to work.

## first failing test

Extend `tests/protocol/status-attestation.test.ts` with a real Git-backed run that transitions to `blocked`, changes its blocker to `resolved`, and reads status before resuming. Run the focused test before changing `protocol/status.ts`; it must fail because the current blocked branch returns the open-blocker action even when `openBlockers` is zero.

## smallest implementation

Split the current combined condition in `getNextAction`:

1. For `state === "blocked"`, return the existing resolution action when `openBlockers > 0`, otherwise return the resume-or-abandon action.
2. For a non-blocked state with `openBlockers > 0`, retain the existing resolution action.
3. Leave complete, abandoned, human-decision, uncovered-criterion, approval, and validation branches unchanged.

## refactor step

Do not introduce a status action enum, blocker command, or new helper abstraction. Inspect the diff for branch-order changes after the focused test passes.

## checks to run

- Focused status/lifecycle regression test.
- Real CLI blocker path: block, inspect, resolve, inspect, resume.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.
- Fresh EHS evidence, validation, completion transition, summary, attestation, and CI output.

## rollback plan

Revert the Run 3 status branch and regression test only. Preserve Run 2's existing correction and records. No migration, deployment, or external state rollback is required.

## notes

No ADR is required: no lifecycle, schema, persistence, module boundary, dependency, or runtime architecture changes. The public-output correction is covered by decision challenge 035.
