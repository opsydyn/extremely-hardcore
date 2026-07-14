# evidence ledger: core pressure-scenario runner

## summary

Implemented a deterministic local evaluation context that runs seven completion-gate pressure scenarios and emits one JSON report through `bun run evaluate`.

## changed files

- `evaluation/types.ts`
- `evaluation/run-core-scenarios.ts`
- `scripts/evaluate.ts`
- `tests/evaluation/`
- `package.json`, `README.md`, `ROADMAP.md`, and `docs/evaluations/README.md`
- ADR, contract, domain, boundary, plan, issue, and proof-carrying run records.

## commands run

- `bun test tests/evaluation/core-scenarios.test.ts` before implementation: failed because the runner module was absent.
- `bun test tests/evaluation/evaluate-cli.test.ts` before implementation: failed because the script was absent.
- `bun test tests/evaluation/core-scenarios.test.ts tests/evaluation/evaluate-cli.test.ts`
- `bun run evaluate`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## passing checks

- Seven scenarios report the expected protocol categories and error codes.
- The stale scenario uses a real temporary Git tracked-file change.
- The evaluation command emits parseable JSON and exits zero only when every scenario passes.
- The root test command includes evaluation tests.

## failing checks

- The two pre-implementation tests failed for the expected missing-module and missing-script reasons.
- An evaluator implementation error using a nonexistent synchronous Bun file API was found, diagnosed from the structured report, and corrected before final verification.
- No failing checks remain.

## architecture impact

Adds `scripts/evaluate.ts -> evaluation/ -> protocol/` with one-way dependencies. The protocol remains unaware of evaluation. ADR 0005 records the experimental JSON result surface.

## public contract impact

Adds experimental `bun run evaluate` JSON stdout. Existing protocol records and `eh` CLI behaviour are unchanged.

## risks left open

- The runner proves deterministic protocol behaviour, not agent compliance.
- Agent adapters, no-skill baselines, thresholds, CI, persistence, and the remaining 13-plus pressure scenarios are deferred.
- Result schema version 1 is experimental.

## human review needed

No for this isolated slice. Review is needed before presenting results as cross-agent benchmark evidence.

## final recommendation

merge
