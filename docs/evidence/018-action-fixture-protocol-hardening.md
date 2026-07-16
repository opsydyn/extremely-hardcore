# evidence ledger: action-fixture protocol hardening

## summary

The bounded action-fixture runner now rejects a symlinked run directory before any Stage A or Stage B workspace fingerprint is computed. Report construction also omits artifact paths with a symlinked ancestor, so it cannot digest the symlink target. Stage B now classifies malformed executor-owned evidence and log artifacts as `invalid`, while genuine failed or stale evidence remains `failed`.

## changed files

- `evaluation/run-bounded-bug-fix-fixture.ts`
- `tests/evaluation/action-fixture.test.ts`
- `docs/evidence/018-action-fixture-protocol-hardening.md`

## commands run

- `bun test tests/evaluation/action-fixture.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`

## passing checks

The focused runner suite has 30 passing tests, including a run-directory symlink regression that asserts the empty pre-fingerprint value and excludes the redirected run target from the report. It also covers a fresh Stage B evidence log replaced by a directory after completion, which now produces `evidence.log-invalid` with `kind: invalid`. The full repository suite has 71 passing tests.

## failing checks

None.

## architecture impact

No architecture or protocol ownership change. The runner continues to own fixture-specific integrity scoring and report construction; the generic protocol APIs are unchanged.

## public contract impact

No external API, staged executor, report schema, transition semantic, or fixture-test discovery change.

## risks left open

The runner only has a fixture-owned view of filesystem safety. Generic protocol validation intentionally remains reusable and does not acquire fixture-specific command binding or artifact traversal policy.

## human review needed

No additional review required for this bounded runner-only change.

## final recommendation

merge
