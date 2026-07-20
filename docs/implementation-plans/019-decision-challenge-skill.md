# implementation plan: dogfood decision-challenge skill

## behaviour to protect

ADR 0012 keeps the bounded fixture runner and deterministic reference executor provider-neutral. ADR 0013 holds the live Codex adapter until a provider process can own the protocol actions it is claimed to demonstrate. The protocol, fixture runner, reference executor, validator, and provider adapter remain unchanged.

## first failing test

Not applicable: this slice adds no executable behaviour or production code. The mandatory decision-challenge scaffold contract was added and tested in the preceding slice; the Task 3 checks re-run that focused validator test and the existing full suite to protect the unchanged behaviour.

## smallest implementation

Create one dogfooded decision record, project-native issue, implementation plan, evidence ledger, and targeted roadmap status update. Commit every tracked documentation change before creating the ignored proof-carrying run.

## refactor step

None. Do not alter shared templates or implementation boundaries while closing this documentation-only slice.

## checks to run

- `bun test scripts/validate.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- `bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill decision-challenge-validated -- bun run check`
- `bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill documentation-complete -- bun test scripts/validate.test.ts`
- `bun run eh transition .extremely-hardcore/runs/019-decision-challenge-skill complete`
- `bun run eh validate .extremely-hardcore/runs/019-decision-challenge-skill`

## rollback plan

Revert the five tracked documentation changes as one commit and remove the ignored local run directory. No protocol state outside the ignored run, public API, provider configuration, persistence, or external system requires migration.

## notes

Live provider execution remains out of scope. The documented `hold` verdict applies only to the live adapter proposal; it does not block this skill documentation and dogfood slice.
