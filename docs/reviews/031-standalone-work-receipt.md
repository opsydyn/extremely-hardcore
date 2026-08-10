# bounded-context review: standalone EHS work receipt

## proposed change

Add a compact Markdown work receipt to the existing `evidence-ledger` skill and template, while documenting that EHS remains independent of orchestration and evaluation runtimes.

## affected contexts

- EHS skill method owns the receipt vocabulary and guidance.
- The detailed evidence ledger remains the source of the full human-readable record.
- The host or command runner owns execution capture.
- Protocol and evaluation code remain optional consumers and are not changed.

## allowed dependencies

- The receipt may refer to existing ledger sections, commands, logs, diffs, reviews, and handoff actions.
- Documentation may describe the existing protocol and evaluator as optional repository surfaces.

## suspicious dependencies

- Importing TypeScript protocol types into Markdown skill guidance.
- Defining receipt events, leases, retries, budgets, or scheduler transitions.
- Treating a prose receipt as proof of command ownership or sandbox enforcement.
- Adding evaluator-specific fields or comparison semantics to the EHS contract.

## data ownership

The agent proposes claims and records uncertainty. The host captures commands when it actually runs them. The evidence ledger records both without conflating them. No receipt field owns loop state, provider state, or evaluation scores.

## verdict

safe with noted risk

The boundary is sound for a standalone documentation contract. The remaining risk is duplicate prose or downstream over-interpretation, which is addressed by keeping the receipt five fields, Markdown-only, and explicitly non-attested.
