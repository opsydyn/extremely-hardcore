# implementation plan: missing evidence record validation

## first failing test

Create a CLI fixture whose criterion references `missing-evidence` without creating `evidence/missing-evidence.json`. Assert `eh validate` exits 1, prints `evidence.missing: missing-evidence evidence record is missing`, and does not print a raw `error:` wrapper.

## smallest implementation

Catch only the absent-record filesystem condition while validating a referenced evidence ID and append `evidence.missing` to the normal error list. Preserve other failures.

## checks

- Targeted validator and CLI tests.
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## rollback

Revert the validator branch and the associated error-code tests. No data migration or external state exists.
