# implementation plan: share protocol Git test fixture

## first failing test

Add `support.test.ts` that imports `createGitWorkspace` and asserts it creates a repository with committed `tracked.txt`. The test initially fails because the support module does not exist.

## smallest implementation

Create `tests/protocol/support.ts` with only Git workspace setup. Then replace duplicated setup in CLI, evidence, and fingerprint tests while keeping run definitions and cleanup local.

## checks

- `bun test tests/protocol/support.test.ts`
- Targeted affected test files.
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## rollback

Revert the helper and restore local setup in the three test files. Production code and persisted data are unaffected.
