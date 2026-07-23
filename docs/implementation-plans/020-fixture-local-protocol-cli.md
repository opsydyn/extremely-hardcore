# implementation plan: fixture-local protocol CLI

## behaviour to protect

The copied fixture must produce standard evidence and one guarded completion through immutable local commands. The runner must require a complete, correctly ordered ledger that links those commands to Stage A and Stage B artifacts, while generic protocol validation remains authoritative.

## first failing test

Add a focused reference-path assertion that expects the retained fixture protocol script and `protocol-invocations.jsonl`, then assert the expected `fix` evidence, `resume` evidence, and `resume` completion records. The test must fail before the local script and runner validation exist.

## smallest implementation

Add `fixture-protocol.ts` to the tracked fixture with only fixed evidence and completion commands. Add a ledger type and runner-private parsing/link validation. Replace direct host protocol calls in the reference executor with `bun fixture-protocol.ts` invocations. Retain the script and ledger in the report.

## refactor step

Keep V1 artifact writing private to the fixture script and ledger parsing private to the runner. Do not expose the fixture command through generic `eh`.

## checks to run

- `bun test tests/evaluation/action-fixture.test.ts`
- `bun test tests/evaluation/evaluate-action-fixture-cli.test.ts`
- `bun run evaluate:action-fixture -- --output-dir <new-dir>`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## rollback plan

Revert the fixture script, runner/reference changes, focused tests, and slice records together. No migration, provider account, or external state exists.

## notes

This proves local command executability and structural ledger integrity only. It does not run a provider or prove that a provider process created the records.
