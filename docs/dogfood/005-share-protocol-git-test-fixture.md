# Dogfood Run 3: shared protocol Git test fixture

## change

Refactor: extracted repeated temporary Git workspace setup from the CLI, evidence, and workspace-fingerprint tests into `tests/protocol/support.ts`.

Risk: standard. The change affects shared test infrastructure across three protocol test files, but does not change runtime protocol code, schema, CLI behaviour, dependencies, or deployment.

## gate record

Run directory: `.extremely-hardcore/runs/005-share-protocol-git-test-fixture/`.

The gate captures the new support-helper test, affected consumers, structural validation, full focused suite, and TypeScript check. All evidence must share one workspace fingerprint before completion.

## observed behaviour

- The first support test failed because the helper module did not exist, then passed after the minimal implementation.
- Twelve targeted tests pass across the helper and its three consumers.
- The full suite passes with 25 tests; no production files changed.
- The CLI fixture still uses a path containing spaces, so that integration coverage was retained rather than accidentally normalised away.
- Setup overhead was not separately timed and remains a campaign metric for future runs.

## finding

The completion gate is usable for a shared test-infrastructure refactor without forcing protocol changes. This is useful coverage of the standard lane, but the remaining stale-verification and real-blocker runs are more important for validating gate behaviour under operational pressure.
