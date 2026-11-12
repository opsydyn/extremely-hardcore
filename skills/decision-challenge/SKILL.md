---
name: decision-challenge
description: "Challenge high-consequence proposals before planning: new writable-agent execution, material boundary or policy changes, or differentiation and comparison claims."
---

# decision-challenge

## when to use

Use before planning a proposal that introduces external writable-agent execution;
changes an architecture, security, sandbox, isolation, or provenance boundary;
changes public contracts, persistence, CI, deployment, or observability behaviour
with material compatibility, data, security or operational consequences; or makes
a product-differentiation, benchmark, provider-comparison, or regression-threshold
claim. Judge consequences and uncertainty, not the presence of a keyword.

## when not to use

Do not use for routine implementation within an accepted design whose assumptions
still hold and which introduces no material boundary, policy or compatibility
change. Reuse an applicable accepted challenge; revisit changed assumptions or
new consequences. Required approvals remain binding regardless of familiarity.

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

1. Check applicability and inspect the contract, relevant decisions, boundaries
   and local capability evidence. Do not execute a provider to review it.
2. Use the template to separate platform ownership from proposed value, challenge
   the strongest counterargument and map claims to observed evidence or gaps.
3. Define the minimum credible slice, falsifiable stop conditions and one verdict.
   Reuse equivalent sections of an existing decision record rather than duplicate it.
4. When verdict is `hold` or `needs-human-decision`, stop before implementation planning.

## quality bar

Claims, platform ownership, counterevidence and stop conditions make the verdict
reviewable. Observed evidence is distinct from assumptions and missing proof.

## failure modes

- Adding ceremony for trivial changes instead of skipping the skill.
- Executing a provider during review rather than evaluating local evidence.
- Treating declared sandbox settings as proof of isolation.
- Changing runtime code while conducting the challenge.
- Letting the challenger redefine fixture scoring.
- Continuing into implementation planning after a `hold` or `needs-human-decision` verdict.
