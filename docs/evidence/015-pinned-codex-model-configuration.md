# evidence ledger: pinned Codex model configuration

## summary

Required a requested Codex model for adapter evaluations, forwarded it to every scenario invocation, and retained it in aggregate and per-scenario provenance. This is configuration control for the next repeated measurement, not a live provider result.

## changed files

- `evaluation/run-codex-adapter.ts`
- `evaluation/types.ts`
- `scripts/evaluate-codex.ts`
- `tests/evaluation/codex-adapter.test.ts`
- `tests/evaluation/evaluate-codex-cli.test.ts`
- Evaluation documentation, roadmap, ADR, change contract, domain, boundary, plan, issue, and run records for slice 015

## commands run

- Focused adapter and CLI tests first failed because the adapter omitted `--model` and the CLI did not reject its absence.
- Focused tests, deterministic evaluation, declared-baseline evaluation, static checks, full suite, and typecheck were rerun after implementation.
- Fresh completion-gate evidence is captured for this final workspace revision.

## passing checks

The fake executor receives `--model gpt-5.6-sol` in every scenario request; the report and invocation JSON retain the same value. The CLI rejects omitted `--model` before adapter execution. Existing evaluation paths and repository checks pass.

## failing checks

The intended red adapter test failed on the missing `--model` argument. A bare declared-baseline command also failed with its documented missing-input usage error; the fixture-backed command passes. No implementation regression remains.

## architecture impact

Tightens the existing external Codex adapter configuration boundary. Scenario, protocol, and assessment architecture remain unchanged.

## public contract impact

`bun run evaluate:codex` now requires `--model <model>`. Experimental report and invocation artifact JSON gain requested-model provenance.

## risks left open

The requested model name does not independently prove provider-side routing or availability. No live run verifies the corrected configuration yet; that belongs to the next controlled repetition slice.

## human review needed

No. The next operational comparison should preserve one explicit model across every repetition.

## final recommendation

merge. Begin repeated controlled Codex runs only with the required model configuration.
