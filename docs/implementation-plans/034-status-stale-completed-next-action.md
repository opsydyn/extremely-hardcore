# implementation plan: stale completed status next action

## behaviour to protect

`eh status` must align its next action with current validation. A valid completed run must continue to say `review the attestation and hand off the completed run`. A completed run whose evidence is stale or otherwise invalid must say `start a new run; completed run validation is invalid` and expose the validation errors.

## first failing test

Extend `tests/protocol/status-attestation.test.ts` with a real tracked-file mutation after `createCompletedRun()` returns. Read status against the new fingerprint and assert `validation.ok` is false and the new fresh-run action is returned. Run the focused test before changing `protocol/status.ts`; it must fail because the current code returns the valid-completed handoff action first.

## smallest implementation

Move the invalid-validation check ahead of the completed-state branch in `getNextAction`, with a terminal-specific message for invalid completed runs. Keep the existing generic invalid-validation action for active runs and preserve all other branches.

## refactor step

Do not refactor the status projection or introduce action enums in this slice. After the focused test passes, inspect the diff for accidental message or branch changes.

## checks to run

- Focused status regression test.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.
- Fresh EHS evidence, validation, completion transition, summary, attestation, and CI output.

## rollback plan

Revert the single `getNextAction` branch correction and its focused regression test. Keep the run and governance records as historical evidence of the attempted dogfood slice; no migration or deployment rollback is required.

## notes

No ADR is required: no schema, lifecycle, persistence, module boundary, dependency, or runtime architecture changes. The public-output correction is covered by decision challenge 034.
