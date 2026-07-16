# implementation plan: action-fixture protocol hardening

## behaviour to protect

The runner must score only the initialized fixture contract, evidence from its required command, safe filesystem artifacts, and existing staged protocol state.

## first failing test

Add focused action-fixture tests for run-contract mutation, substituted evidence argv, missing and malformed `run.json`, inventory symlinks, and retained-artifact symlinks.

## smallest implementation

Add runner-local contract snapshots, safe protocol-validation wrappers, evidence-command comparison, and lstat-based traversal checks. Do not modify protocol modules.

## refactor step

Keep command binding, snapshot, and traversal helpers private to the runner.

## checks to run

- `bun test tests/evaluation/action-fixture.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## rollback plan

Revert the runner, focused tests, and this scope record as one change. No persistent data or public API changes require migration.
