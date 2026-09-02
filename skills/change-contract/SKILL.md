---
name: change-contract
description: Use before editing for non-trivial work to define user intent, allowed scope, forbidden scope, affected areas, the minimum complete change, public contracts, risks, acceptance evidence, and stop conditions.
---

# change-contract

## when to use

Use before non-trivial edits. Use especially when the request is broad, ambiguous, risky, or likely to touch public contracts, persistence, APIs, CI, deployment, shared packages, or domain rules.

## when not to use

Do not use for trivial copy, typo, formatting, or one-line local test fixes with no behaviour impact.

## required inputs

- User request.
- Relevant files and current behaviour.
- Known constraints.
- Current git status.

## required output

- A completed change contract, preferably written from `templates/change-contract.md`.
- A concise minimum-complete-change statement naming the least powerful implementation that fully satisfies the contract.
- Clear allowed scope and forbidden scope.
- Acceptance evidence that can be verified later.

## procedure

1. Restate user intent in concrete terms.
2. List current understanding from repository inspection.
3. Define allowed scope.
4. Define forbidden scope.
5. Identify affected areas.
6. State the minimum complete change: the least powerful implementation that fully satisfies the contract. Name validation, security, error handling, accessibility, and architectural obligations that must not be traded away for a smaller diff.
7. Identify changed or potentially changed public contracts.
8. Record assumptions and risks.
9. Define acceptance evidence.
10. Define stop conditions.
11. Stop before editing if scope is unclear or acceptance evidence cannot be stated.

## quality bar

- A reviewer can tell what must change and what must not change.
- The minimum complete change is specific enough to reject unnecessary scope without rewarding unsafe shortcuts.
- Public contracts are named explicitly.
- Stop conditions are specific enough to actually stop work.
- Acceptance evidence maps to commands, tests, screenshots, logs, or review artefacts.

## failure modes

- Hiding product decisions inside implementation.
- Calling scope "small" without naming forbidden scope.
- Optimising for the fewest lines while dropping required validation, security, error handling, accessibility, or architectural fit.
- Treating assumptions as facts.
- Editing before the contract exists.
