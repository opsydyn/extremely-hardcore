# evidence ledger: agent-attempt evaluation contract

## summary

Added one declarative core scenario manifest and a pure provider-neutral assessor for future structured agent attempts. The deterministic runner now consumes the same manifest.

## changed files

- `evaluation/core-scenarios.ts`
- `evaluation/assess-agent-attempt.ts`
- `evaluation/types.ts`
- `evaluation/run-core-scenarios.ts`
- `tests/evaluation/agent-attempts.test.ts`
- Evaluation docs, roadmap, ADR, contract, domain, boundary, plan, issue, and proof-carrying run records.

## commands run

- `bun test tests/evaluation/agent-attempts.test.ts` before implementation: failed because the assessor module was absent.
- Targeted evaluation tests and `bunx tsc --noEmit`.
- `bun run evaluate`
- `bun run check`
- `bun run test`

## passing checks

- Valid attempts observe the manifest expectation and pass.
- Missing expected codes fail.
- Unknown scenarios are invalid.
- The deterministic runner continues to pass using the same manifest.

## failing checks

- The first test failed for the expected missing-module reason.
- A runner refactor left obsolete positional arguments in three calls; the shared runner test failed, the issue was corrected, and no failing checks remain.

## architecture impact

Future adapters may depend on `evaluation/`, while protocol remains independent. ADR 0006 records the experimental provider-neutral surface.

## public contract impact

Adds experimental JSON-shaped `AgentAttempt` and assessment semantics in-process. It does not add a provider command, API, or persistence format.

## risks left open

- Adapter-supplied observations are not independently verified.
- No external agent, baseline, transcript, threshold, or CI integration exists yet.
- The scenario corpus remains at seven, below the Milestone 2 target of twenty.

## human review needed

No for this contract-only slice. Review is required before accepting results from external adapters as benchmark evidence.

## final recommendation

merge
