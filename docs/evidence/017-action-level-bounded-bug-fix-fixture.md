# evidence ledger: action-level bounded bug-fix fixture

## summary

Added the local JSON CLI for the bounded action fixture. It runs the existing deterministic reference executor against a caller-selected, non-existing output directory and returns the retained `ActionFixtureResult`. This is a deterministic reference proof of the local runner, not a provider evaluation.

## changed files

- `scripts/evaluate-action-fixture.ts`
- `package.json`
- `tests/evaluation/evaluate-action-fixture-cli.test.ts`
- `docs/evaluations/README.md`
- `ROADMAP.md`
- Slice 017 protocol records under `.extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture`
- `docs/evidence/017-action-level-bounded-bug-fix-fixture.md`

## commands run

- `bun test tests/evaluation/action-fixture.test.ts tests/evaluation/evaluate-action-fixture-cli.test.ts` for the retained focused-suite evidence.
- `bun run evaluate:action-fixture -- --output-dir <new-dir>` using a new temporary directory.
- `bun run check`, `bunx tsc --noEmit`, `bun run test`, and `git diff --check`.
- `bun run eh evidence .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture fixture-contract-tested -- bun test tests/evaluation/action-fixture.test.ts tests/evaluation/evaluate-action-fixture-cli.test.ts`.
- `bun run eh evidence .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture reference-run-passed -- bun run evaluate:action-fixture -- --output-dir <new-dir>`, then `bun run eh validate .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture` and `bun run eh transition .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture complete`.

## passing checks

The focused action-fixture and public CLI suite passes 33 tests. The public package script rejects missing and already-existing output directories without overwriting the latter, and emits a passing two-stage JSON report with one completion transition for a new output directory. Static validation and TypeScript checking pass, and the full repository suite passes 74 tests. The reference executor uses only local Bun, Git, filesystem, and existing protocol APIs; no live provider call occurs.

## failing checks

The intended CLI red test initially failed because `scripts/evaluate-action-fixture.ts` did not exist. No known implementation or verification failure remains.

## architecture impact

No new architecture decision is required. This implements the local CLI boundary already accepted in ADR 0012: the runner remains provider-neutral and the deterministic reference executor remains a local harness proof.

## public contract impact

Adds experimental `bun run evaluate:action-fixture -- --output-dir <new-dir>`. The command requires exactly one caller-selected new output directory, emits `ActionFixtureResult` JSON, and exits zero only for `passed` results. Existing evaluator, Codex adapter, and protocol CLI contracts are unchanged.

## risks left open

The single fixture is intentionally bounded and its deterministic reference executor does not establish provider, model, or general agent capability. Retained output directories are caller-owned local artifacts and may require review before sharing.

## human review needed

No additional review is needed for this local proof. Live staged-provider execution remains a separate, explicitly deferred decision.

## final recommendation

merge
