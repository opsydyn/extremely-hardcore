---
name: domain-discovery
description: Clarify unclear or changing domain language, business rules, valid states and ownership before implementing domain-sensitive behaviour.
---

# domain-discovery

## when to use

Use when domain language, rules, valid states or ownership are unclear or changing.
An API, persistence or integration change warrants discovery when it raises
these questions, not merely because it touches those technologies.

## when not to use

Skip discovery when the relevant rules and ownership are already understood and
unchanged. Reuse the existing model; do not catalogue the domain again for a
mechanical edit or routine extension.

## required inputs

The existing contract and relevant domain code, terminology, contracts and decisions.

## required output

- Scoped domain findings, kept in the conversation for bounded local work. Use [templates/domain-map.md](templates/domain-map.md) (relative to this `SKILL.md`) for consequential changes or when a durable record is requested or required by the repository; reuse an existing domain map rather than duplicating it.
- Recommended next questions where ambiguity remains.

## procedure

1. Use ubiquitous language: the domain's agreed terms consistently in conversation,
   code, tests and documentation within each bounded context. Clarify ambiguous
   or conflicting terms while preserving legitimate differences between contexts.
   Reuse existing definitions; do not create a glossary by default. Ask only
   questions whose answers change the design or acceptance conditions.
2. When behaviour is non-trivial, model the relevant workflow: inputs, valid states,
   expected rejections, outputs and effects. Do not begin with tables or classes.
3. Express meaningful invariants using existing types and validated construction
   where proportionate. Prefer explicit alternatives to contradictory flags and
   optional fields; entities and aggregates are useful only when identity or
   consistency requires them.
4. Keep decision logic separate from I/O where it clarifies ownership and testing.
   Distinguish external DTOs from domain values when their rules differ. Types do
   not replace runtime validation, authorisation, freshness or concurrency checks.
5. Identify actual domain/data ownership and integration contracts. Technical
   layers or different clients are not automatically separate bounded contexts.
6. Capture only unresolved ambiguity or reasoning absent from existing code and
   records. Do not require a functional language, library, new layers or wrapper
   types for every value.

This selective lens draws on Scott Wlaschin's
[Domain Modeling Made Functional](https://store.pragprog.com/titles/swdddf/domain-modeling-made-functional/)
and his [warning against indiscriminate railway-oriented programming](https://fsharpforfunandprofit.com/posts/against-railway-oriented-programming/).
Use the repository's error conventions; make expected outcomes explicit without
turning every exception into a new result framework.

## quality bar

The model uses product language, exposes meaningful invariants/ownership and
avoids speculative abstractions. Existing code can be sufficient documentation.

## failure modes

- Creating a grand taxonomy for a small change.
- Ignoring persistence and API shape.
- Mistaking DTOs for domain objects.
- Failing to ask the question the code cannot answer.
