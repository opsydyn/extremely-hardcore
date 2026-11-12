---
name: change-contract
description: Define scope and acceptance evidence before non-trivial edits, especially ambiguous or consequential changes.
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

- A concise contract in the conversation for bounded local work. Use [templates/change-contract.md](templates/change-contract.md) (relative to this `SKILL.md`) for consequential changes or when a durable record is requested or required by the repository. Reuse an existing contract rather than duplicating it.
- A concise minimum-complete-change statement naming the least powerful implementation that fully satisfies the contract.
- Clear allowed scope and forbidden scope.
- Acceptance evidence that can be verified later.

A clear user brief or existing task record can already supply this contract.
Fill only material gaps; do not restate it as a second checklist or seek another
approval for work that is already authorised.

## procedure

1. Inspect relevant context and state the intended outcome, affected areas, and scope boundaries. Do not repeat an already clear user brief.
2. State the minimum complete change, including validation, security, error handling, accessibility, and architectural obligations that must not be traded away for a smaller diff.
3. Name affected public contracts, material assumptions, risks, and verifiable acceptance evidence.
4. Define stop conditions. Ask only when missing information materially changes scope, safety, or acceptance; otherwise state reasonable assumptions and continue within authorisation.

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
