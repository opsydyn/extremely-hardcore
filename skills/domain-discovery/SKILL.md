---
name: domain-discovery
description: Use when work involves domain language, persistence, API shape, cross-context logic, business rules, invariants, external systems, or ambiguity about ownership.
---

# domain-discovery

## when to use

Use when the change involves domain terms, persistence shape, API shape, integration flows, business rules, invariants, or unclear ownership between contexts.

## when not to use

Do not use for mechanical edits with no domain meaning. Renaming a CSS class is not a bounded context. Try to remain indoors.

## required inputs

- Change contract.
- Relevant domain code, schemas, API contracts, and docs.
- User-facing terminology.
- Existing integrations.

## required output

- Domain map from [templates/domain-map.md](templates/domain-map.md) (relative to this `SKILL.md`).
- Recommended next questions where ambiguity remains.

## procedure

1. Extract domain terms from the request and code.
2. Identify candidate bounded contexts.
3. List aggregates, entities, and value objects only when useful.
4. Record commands, events, policies, rules, and invariants.
5. Identify external systems and integration points.
6. Name ambiguity directly.
7. Recommend the next questions needed to reduce risk.

## quality bar

- Uses the language of the product and codebase.
- Avoids over-modelling.
- Separates domain rules from transport, UI, and persistence details.
- Identifies ownership and ambiguity.

## failure modes

- Creating a grand taxonomy for a small change.
- Ignoring persistence and API shape.
- Mistaking DTOs for domain objects.
- Failing to ask the question the code cannot answer.
