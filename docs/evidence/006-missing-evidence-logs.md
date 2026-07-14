# evidence ledger: missing evidence log validation

## summary

Converted absent evidence logs from raw filesystem exceptions into `evidence.log-missing`, and exercised a real stale-evidence rejection before refreshing and completing the run.

## changed files

- `protocol/validate-run.ts`
- `tests/protocol/validate-run.test.ts`
- `tests/protocol/cli.test.ts`
- `docs/adr/0003-missing-evidence-log-is-validation-failure.md`
- Contract, domain, boundary, plan, issue, dogfood, and run records for dogfood run 4.

## commands run

- Baseline evidence capture: `bun run check`, `bun run test`, `bunx tsc --noEmit`.
- Pre-implementation targeted tests: failed with raw `ENOENT`.
- `bun run eh validate .extremely-hardcore/runs/006-missing-evidence-logs`: rejected stale baseline evidence.
- Targeted validator and CLI tests after implementation.
- Refreshed evidence capture and guarded completion.

## passing checks

- Missing logs return a structured error with exact evidence and path.
- Missing-log transitions are non-mutating.
- Stale baseline evidence blocks completion until refreshed.
- Structural validation, focused tests, and TypeScript checks pass after refresh.

## failing checks

- The initial validator and CLI regression tests failed with raw `ENOENT` as expected.
- The intentional stale validation failed with one uncovered criterion and three stale evidence records.
- No failing checks remain after refresh.

## architecture impact

Validation now normalises one expected filesystem absence at the protocol boundary. Dependency direction and the on-disk schema remain unchanged. Bounded-context review verdict: `safe`.

## public contract impact

For a missing evidence log, the experimental CLI emits `evidence.log-missing: <id> log is missing at <path>` instead of raw `ENOENT`.

## risks left open

- Other filesystem failures and malformed evidence remain separate failure modes.
- Run 5 must test an unresolved blocker or rejected completion rooted in engineering judgement.

## human review needed

No. ADR 0003 records the narrow contract change.

## final recommendation

merge
