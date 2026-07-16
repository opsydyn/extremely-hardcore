# evidence ledger: pressure-scenario corpus

## summary

Expanded the evaluation manifest from seven deterministic protocol fixtures to a 20-scenario pressure corpus. The added behavioural scenarios are explicitly `agent-attempt` cases; the local runner continues to execute only the seven deterministic fixtures.

## changed files

- `evaluation/types.ts` and `evaluation/core-scenarios.ts`
- `tests/evaluation/core-scenarios.test.ts`
- Evaluation, roadmap, decision, contract, domain, boundary, plan, issue, and run records for slice 010

## commands run

- `bun test tests/evaluation/core-scenarios.test.ts` failed first because `PRESSURE_SCENARIOS` did not exist.
- Focused evaluation tests and `bun run evaluate` pass after implementation.
- `bun run check`, `bun run test`, and `bunx tsc --noEmit` pass and are captured in run 010.
- `bun run eh validate .extremely-hardcore/runs/010-pressure-scenario-corpus` validates the final proof.

## passing checks

Focused evaluation tests confirm 20 unique scenarios, the required taxonomy, seven deterministic fixtures, and behavioural attempt assessment.

## failing checks

The intended pre-implementation test failed because the scenario manifest had no `PRESSURE_SCENARIOS` export. No known failures remain after implementation.

## architecture impact

The evaluation manifest gains an explicit execution-mode boundary; protocol architecture is unchanged.

## public contract impact

The experimental in-process evaluation contract expands. CLI and protocol artefacts remain unchanged.

## risks left open

The corpus is not an executed behavioural benchmark until baseline and adapter runners exist.

## human review needed

No, unless a reviewer disputes the taxonomy or execution-mode boundary.

## final recommendation

merge. The corpus is intentionally not presented as an executed cross-agent benchmark; baseline and adapter execution remain the next owned work.
