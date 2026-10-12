---
name: decision-challenge
description: Use before planning high-consequence proposals involving external writable-agent execution, boundary changes, product differentiation, or comparison claims.
---

# decision-challenge

## when to use

Use before planning a proposal that introduces external writable-agent execution; changes an architecture, security, sandbox, isolation, or provenance boundary; changes public contracts, persistence, CI, deployment, or observability behaviour; or makes a product-differentiation, benchmark, provider-comparison, or regression-threshold claim.

## when not to use

Do not use for ordinary local changes that do not meet the trigger rubric.

## required inputs

- Completed change contract.
- Relevant ADRs and reviews.
- Code boundaries.
- Local tool capability evidence.
- Stated proposal.

## required output

- A Markdown decision record from [templates/decision-challenge.md](templates/decision-challenge.md) (relative to this `SKILL.md`).
- Exactly one verdict: `proceed`, `hold`, or `needs-human-decision`.

## procedure

1. Check the trigger rubric; skip the skill for ordinary local changes.
2. Read the change contract, relevant ADRs/reviews, code boundaries, and local tool capability evidence.
3. State every product, isolation, evaluation, or architecture claim the proposal makes.
4. State what an existing platform already owns and the durable differentiated value left for this repository.
5. State the strongest reason not to build the proposal.
6. Build a claim-to-evidence map that distinguishes observed facts, assumptions, and gaps.
7. Name the minimum credible slice and falsifiable stop conditions.
8. Choose exactly one verdict: `proceed`, `hold`, or `needs-human-decision`.
9. Write the record from [templates/decision-challenge.md](templates/decision-challenge.md) (relative to this `SKILL.md`).
10. When verdict is `hold` or `needs-human-decision`, stop before implementation planning.

## quality bar

- The trigger and proposal claims are explicit.
- Platform-owned capabilities are separated from repository-owned durable value.
- Evidence distinguishes observed facts from assumptions and gaps.
- The minimum credible slice and stop conditions can falsify the proposal.
- The verdict is singular and usable before planning.

## failure modes

- Adding ceremony for trivial changes instead of skipping the skill.
- Executing a provider during review rather than evaluating local evidence.
- Treating declared sandbox settings as proof of isolation.
- Changing runtime code while conducting the challenge.
- Letting the challenger redefine fixture scoring.
- Continuing into implementation planning after a `hold` or `needs-human-decision` verdict.
