# evidence ledger: missing evidence record validation

## summary

Converted an absent referenced evidence JSON file from a raw CLI filesystem exception into the structured `evidence.missing` validation error.

## changed files

- `protocol/validate-run.ts`
- `tests/protocol/validate-run.test.ts`
- `tests/protocol/cli.test.ts`
- `docs/adr/0002-missing-evidence-is-validation-failure.md`
- Dogfood, contract, domain, review, plan, and issue records for run 2.

## commands run

- `bun test tests/protocol/cli.test.ts` before implementation: failed with raw `ENOENT`.
- `bun test tests/protocol/validate-run.test.ts` before implementation: failed with raw `ENOENT`.
- `bun test tests/protocol/validate-run.test.ts tests/protocol/cli.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## passing checks

- Missing evidence records return `evidence.missing` with the exact ID.
- The CLI renders the structured error without an `error:` exception wrapper.
- Failed transitions against missing evidence leave `run.json` and `transitions.jsonl` unchanged.
- 24 focused tests, structural validation, and TypeScript checks pass.

## failing checks

- The two pre-implementation regression tests failed as expected with raw `ENOENT` errors.
- No failing checks remain.

## architecture impact

The protocol now normalises one expected filesystem absence at its validation boundary. CLI dependency direction and on-disk schema remain unchanged. The bounded-context review verdict is `safe`.

## public contract impact

For a missing referenced evidence record, the experimental CLI now emits `evidence.missing: <id> evidence record is missing` instead of a raw filesystem exception.

## risks left open

- Malformed evidence JSON and missing logs remain separate observed-failure candidates.
- Four more dogfood category requirements remain, including stale verification and a real blocker.

## human review needed

No. ADR 0002 captures the intentionally narrow error-contract change.

## final recommendation

merge
