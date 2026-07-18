# Decision Challenge Design

## Purpose

`decision-challenge` is a focused adversarial and Socratic workflow for proposals whose failure would make a product claim, execution boundary, or architecture decision misleading. It is not a general critic, implementation planner, or test runner.

## Trigger

Run the skill only when a proposal introduces or changes one or more of:

- external writable-agent execution;
- architecture, security, sandbox, isolation, or provenance boundaries;
- public contracts, persistence, CI, deployment, or observability behavior;
- a product-differentiation claim;
- a benchmark, provider-comparison, or regression-threshold claim.

It is optional for ordinary local code changes and prohibited as ceremony for typos or isolated refactors.

## Input

The skill reads the current change contract, relevant ADRs, implementation/fixture code, documented product claim, and local tool capability evidence. It may use a read-only subagent to challenge the proposal.

## Required Output

The decision record contains:

1. The proposal and the claims it makes.
2. What an existing platform or dependency already owns.
3. The durable differentiated value, if any.
4. The strongest reason not to build it.
5. A claim-to-evidence map identifying demonstrated facts, assumptions, and gaps.
6. The minimum credible slice.
7. Falsifiable stop conditions.
8. A verdict: `proceed`, `hold`, or `needs-human-decision`.

`hold` blocks implementation planning until a redesign narrows or resolves the named gap. `needs-human-decision` states the precise unresolved decision. `proceed` permits the normal planning workflow; it does not replace tests, review, or completion evidence.

## Boundaries

The challenge is read-only. It cannot modify runtime code, create provider artifacts, invoke a live provider, define scoring semantics, or make a claim true by recording it. The fixture runner and protocol remain the sole authorities for runtime scoring and completion.

## Dogfood: Live Codex Action Fixture

The first dogfood record receives `hold`.

The current fixture copies only the bounded source/test task. Its deterministic reference executor uses host protocol APIs to create evidence and completion records. A Codex process restricted to the copied workspace can repair the source but cannot independently produce the protocol behavior the fixture purports to measure. An adapter that fills this gap would measure source correction, not Extremely Hardcore compliance.

The redesign frontier is explicit: either provide an immutable fixture-local protocol CLI and allow the agent to use it, or make a source-change-only fixture with claims narrowed accordingly. Do not implement a live provider adapter until one boundary is selected and recorded.

## Testing

Skill tests must cover trigger recognition, a complete record, and rejection of a record missing a counterargument, evidence gap, stop condition, or verdict. The dogfood fixture is documentation evidence, not a live-provider test.

## Non-Goals

- A generic provider abstraction.
- Automatic implementation delegation.
- Network-isolation guarantees inferred from Codex sandbox metadata.
- A benchmark result, provider comparison, or regression threshold.
