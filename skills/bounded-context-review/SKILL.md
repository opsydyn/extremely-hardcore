---
name: bounded-context-review
description: Use before changing imports, module boundaries, shared packages, database shape, integration flows, data ownership, transaction boundaries, or cross-context behaviour.
---

# bounded-context-review

## when to use

Use before edits that affect imports, module boundaries, shared packages, database shape, integration flows, data ownership, transaction boundaries, or cross-context behaviour.

## when not to use

Do not use for isolated local implementation details that do not cross module, data, or integration boundaries.

## required inputs

- Change contract.
- Domain map when available.
- Proposed files and dependencies.
- Current module and data ownership.

## required output

- Review from [templates/bounded-context-review.md](templates/bounded-context-review.md) (relative to this `SKILL.md`).
- Verdict: `safe`, `safe with noted risk`, `needs redesign`, or `needs human decision`.

## procedure

1. State the proposed change.
2. List affected contexts.
3. Identify allowed dependencies.
4. Identify suspicious dependencies.
5. State data ownership and transaction boundaries.
6. Check integration events and anti-corruption needs.
7. Give one verdict from the allowed list.
8. Stop for redesign or human decision when the verdict requires it.

## quality bar

- Dependency direction is explicit.
- Data ownership is not guessed.
- Cross-context shortcuts are named.
- The verdict is usable by someone about to edit code.

## failure modes

- Letting UI, delivery, or persistence details leak into domain code.
- Adding a shared package because two files were inconveniently far apart.
- Crossing transaction boundaries without saying so.
- Giving a cheerful verdict with unreviewed risk.
