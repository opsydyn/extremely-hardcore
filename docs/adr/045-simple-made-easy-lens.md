# adr: Simple Made Easy lens

## status

accepted; fixed inline presentation amended by [ADR 049](049-proportionate-guidance-and-functional-domain-modelling.md) on 2026-11-12. The optional structural-simplicity lens and original rationale remain; the decision below records its original form.

## context

EHS already promotes the smallest coherent change, targeted Socratic review,
domain discovery, architecture decisions, test-first work, and evidence-led
completion. It does not yet give agents a compact way to compare multiple
complete implementation paths for accidental complexity.

External examples provide useful but distinct ideas: a YAGNI/reuse ladder,
interactive grilling with shared documentation, plain-file working briefs, and
optional control-loop composition. Importing those systems wholesale would
conflict with EHS's standalone boundary.

## decision

Add one optional `simple-made-easy` Markdown skill. It defines simplicity as
structural separation rather than familiarity, line count, or shortest diff.
When multiple paths or complexity risks exist, it asks decision-bearing
questions, walks a YAGNI/reuse/standard/native/installed-dependency/new-code
ladder, checks for accidental entanglement, and selects the least entangled
complete path.

The skill emits a compact inline simplicity check in the existing change
contract or implementation plan. It does not create a separate document by
default. Durable domain or architecture decisions continue to use the existing
domain map and ADR paths. The package/plugin identity remains
`extremely-hardcore`; no runtime, protocol, tracker, scheduler, or evaluator
changes are made.

## consequences

- Agents receive a concrete anti-overengineering lens without a second
  workflow engine.
- The existing EHS skills retain clear ownership of scope, domain, boundaries,
  adversarial review, tests, and evidence.
- A new installable skill and validator requirement become public contracts.
- Structural simplicity remains a review judgment, not a numeric score.
- The lens may expose that a larger diff or more separate modules is simpler.
- One dogfood run can test clarity and friction but cannot prove a skill effect.

## options considered

- Do nothing and rely on “smallest coherent change”: rejected because the
  ladder and structural entanglement questions remain implicit.
- Add a full `grill-with-docs` or working-brief system: rejected because it
  duplicates existing EHS documents and would add ceremony and state.
- Rename EHS to Simple Made Easy: rejected because the requested change is an
  augmenting skill and the package/plugin identity should remain compatible.
- Add a separate simplicity report, score, or benchmark: rejected because
  line-count and subjective simplicity scores would create false precision.
- Add one optional Markdown lens with inline output: accepted because it is the
  smallest distinct capability that can be dogfooded and removed cleanly.

## trade-offs

The new skill adds one routing choice and a small amount of prose. It does not
enforce structural simplicity, so adoption depends on agent behavior and
review. Keeping the output inline reduces artifact count but gives Skill Issue
fewer direct fields to measure; observable signals remain the selected path,
new dependencies, boundary changes, preserved checks, and final diff.

## follow-up work

Run real external-repository dogfood before adding a template, command, score,
or deeper integration. Revisit the skill only if evidence shows duplication,
missed safeguards, or material operator friction.

## review date

2026-09-03
