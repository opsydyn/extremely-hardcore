# evidence ledger: shared protocol Git test fixture

## summary

Extracted repeated Git workspace initialisation into a test-only support helper shared by the CLI, evidence, and workspace-fingerprint tests.

## changed files

- `tests/protocol/support.ts`
- `tests/protocol/support.test.ts`
- `tests/protocol/cli.test.ts`
- `tests/protocol/evidence.test.ts`
- `tests/protocol/workspace-fingerprint.test.ts`
- Contract, bounded-context review, plan, issue, and dogfood records for run 3.

## commands run

- `bun test tests/protocol/support.test.ts` before implementation: failed because the helper module did not exist.
- `bun test tests/protocol/support.test.ts tests/protocol/cli.test.ts tests/protocol/evidence.test.ts tests/protocol/workspace-fingerprint.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## passing checks

- The helper creates a clean committed repository with `tracked.txt`.
- All three consuming test files pass unchanged behavioural scenarios.
- The full focused suite has 25 passing tests.
- Structural validation and TypeScript checks pass.

## failing checks

- The pre-implementation support test failed for the expected missing-module reason.
- No failing checks remain.

## architecture impact

Test setup ownership is centralised in a test-only module. Production imports, module boundaries, protocol data ownership, and runtime dependency direction are unchanged. Bounded-context review verdict: `safe`.

## public contract impact

None.

## risks left open

- The helper intentionally does not absorb run definitions, evidence records, or command scenarios, which remain local to each test.
- Dogfood runs 4 and 5 still need a real stale-verification case and a real blocker or rejected completion case.

## human review needed

No.

## final recommendation

merge
