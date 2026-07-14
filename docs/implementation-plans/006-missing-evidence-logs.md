# implementation plan: missing evidence log validation

## first failing test

Create valid evidence, delete its referenced log, then assert `eh validate` emits `evidence.log-missing` without an `error:` wrapper. The pre-implementation result should be raw `ENOENT`.

## smallest implementation

Catch only `ENOENT` around the referenced log read, append `evidence.log-missing`, and continue validation. Preserve all other errors.

## checks

- Targeted validator and CLI tests.
- A stale-evidence validation before refresh.
- `bun run check`, `bun run test`, and `bunx tsc --noEmit`.

## rollback

Revert the missing-log branch and its tests. No persisted data migration exists.
