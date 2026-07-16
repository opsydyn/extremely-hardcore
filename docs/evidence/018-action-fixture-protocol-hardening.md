# evidence ledger: action-fixture protocol hardening

## summary

The bounded action-fixture runner now pins its initialized run contract, requires the exact fixture test argv in referenced evidence, reports unreadable run JSON as invalid state, and rejects symlinks from workspace inventory and retained artifacts.

## changed files

- `evaluation/run-bounded-bug-fix-fixture.ts`
- `tests/evaluation/action-fixture.test.ts`
- `docs/change-contracts/018-action-fixture-protocol-hardening.md`
- `docs/domain/018-action-fixture-protocol-hardening.md`
- `docs/reviews/018-action-fixture-protocol-hardening.md`
- `docs/implementation-plans/018-action-fixture-protocol-hardening.md`
- `docs/evidence/018-action-fixture-protocol-hardening.md`

## commands run

- `bun test tests/evaluation/action-fixture.test.ts`
- `bun run check`
- `bun run evaluate`
- `bun run evaluate:baseline -- tests/evaluation/fixtures/declared-baseline.json`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`

## passing checks

Focused runner tests cover contract mutation, substitute evidence argv, missing and malformed run JSON, workspace-inventory symlinks, and retained-artifact symlinks. Repository validation, deterministic evaluation, declared baseline assessment, full tests, and TypeScript typechecking are recorded with this change.

## failing checks

`bun run evaluate:action-fixture` is not available in the current `package.json`. The command is documented for a future Task 4 CLI and is outside this runner-only hardening slice.

## architecture impact

No architecture or protocol ownership change. Fixture-specific integrity checks remain in the action runner.

## public contract impact

No external API, staged executor, report schema, or transition-semantic change.

## risks left open

The action-fixture CLI remains absent from this checkout. Generic protocol validation still intentionally accepts arbitrary commands because command binding belongs to the fixture request boundary.

## human review needed

No additional review required for this bounded runner-only change.

## final recommendation

merge
