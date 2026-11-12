---
name: bounded-context-review
description: Review changes to dependency direction, domain/data ownership, transaction boundaries or integration contracts, not routine imports within an established boundary.
---

# bounded-context-review

## when to use

Use when edits change dependency direction, module responsibilities, shared
contracts, data ownership, transaction boundaries or cross-context behaviour.
Review schema and integration changes for these effects, not just file location.

## when not to use

An import change alone, an adapter extension or use of a shared package within
accepted dependency rules does not require another boundary review. Check that
ownership and contracts remain intact; escalate actual changes or uncertainty.

## required inputs

- Change contract.
- Domain map when available.
- Proposed files and dependencies.
- Current module and data ownership.

## required output

- A scoped boundary review, kept in the conversation for bounded local work. Use [templates/bounded-context-review.md](templates/bounded-context-review.md) (relative to this `SKILL.md`) for consequential changes or when a durable record is requested or required by the repository; reuse an existing review rather than duplicating it.
- Verdict: `safe`, `safe with noted risk`, `needs redesign`, or `needs human decision`.

## procedure

1. Inspect the proposed change, affected ownership/contracts, dependency direction
   and transaction boundaries; reuse the existing domain map.
2. For consequential operations, check how required preconditions reach the
   operation and whether callers can omit them or substitute checks for a
   different actor or resource. Prefer existing project mechanisms; consider
   proof-carrying types only when proportionate. Types do not replace runtime
   policy checks, freshness checks, or evidence validation.
3. Check changed integration contracts and give one verdict, naming actual risks.
   Stop for redesign or human decision when the verdict requires it.

## quality bar

The verdict makes changed dependencies, ownership and unresolved risk clear to
the implementer without inventing new boundaries.

## failure modes

- Letting UI, delivery, or persistence details leak into domain code.
- Adding a shared package because two files were inconveniently far apart.
- Crossing transaction boundaries without saying so.
- Giving a cheerful verdict with unreviewed risk.
