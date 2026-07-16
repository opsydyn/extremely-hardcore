# evidence ledger: declared baseline runner

## summary

Added a strict JSON-only declared-baseline evaluator and CLI. A baseline input must declare `without-extremely-hardcore` and include exactly one attempt for each of the 13 behavioural scenarios. The report contains canonical assessments and aggregate counts.

## changed files

- `evaluation/core-scenarios.ts`, `evaluation/types.ts`, and `evaluation/run-declared-baseline.ts`
- `scripts/evaluate-baseline.ts` and `package.json`
- Baseline unit and CLI tests plus valid and incomplete fixtures
- Evaluation, roadmap, decision, contract, domain, boundary, plan, issue, and run records for slice 011

## commands run

- Focused baseline tests failed first because the evaluator and CLI did not exist.
- Focused baseline tests pass after implementation, including a CLI rejection of incomplete coverage.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, `bun run evaluate`, and the valid baseline CLI command pass.
- The incomplete baseline CLI command exits 1 with an exact missing-coverage error, as expected.
- Completion-gate evidence is recorded against the final workspace revision.

## passing checks

The complete fixture yields 13 passing assessments and exact summary counts. Incomplete and duplicate coverage are rejected; the CLI emits no report on incomplete input.

## failing checks

The intended red test failed because `run-declared-baseline` and `evaluate-baseline.ts` did not exist. No known failures remain after implementation.

## architecture impact

Adds an evaluation delivery CLI over a provider-neutral, in-memory assessment contract. Protocol architecture is unchanged.

## public contract impact

Adds experimental declared-baseline JSON input/output plus a Bun script. It does not attest to provenance.

## risks left open

Self-reported baseline declarations are not independently verified, and raw artefacts are not retained.

## human review needed

No, unless the completeness rule or self-report boundary needs product reconsideration.

## final recommendation

merge. The CLI establishes complete declared-baseline assessment mechanics only; provenance and real agent behaviour remain future work.
