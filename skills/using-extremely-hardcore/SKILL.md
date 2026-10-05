---
name: using-extremely-hardcore
description: Route non-trivial coding changes to risk-appropriate EHS guidance.
---

# using-extremely-hardcore

## when to use

Use this before non-trivial coding work. Non-trivial work includes a feature, bug fix with uncertain cause, refactor, API change, state management change, persistence change, package change, deployment change, or CI change.

Use the full loop for risky edits. Add architecture and delivery critics when public contracts, persistence, auth, CI, deployment, observability, or shared package contracts may change.

## when not to use

Do not run the full loop for trivial edits:

- Typo.
- Local copy change.
- One-line test fix.
- Local style change with no behaviour impact.

Still use judgement. If the one-line change is in auth, billing, schema migration, or deployment, it is not trivial. Nice try.

## required inputs

- User request.
- Repository context.
- Any explicit constraints from the user.
- Current git status.

## required output

- Scope, relevant constraints, and evidence appropriate to the change.
- Explain a routing decision only when it materially affects the work; do not report every skipped skill.

## procedure

1. Classify the change as trivial, non-trivial, or risky. For bounded local work, keep the contract and plan in the conversation unless a durable record is requested or required by the repository.
2. Start non-trivial work with `change-contract`. Load only applicable guidance, not the entire list:
   1. `change-contract`
   2. `domain-discovery` when domain, persistence, API, or cross-context logic is involved
   3. `simple-made-easy` when multiple complete paths or accidental-complexity risks exist
   4. `architecture-decision` when its trigger list applies
   5. `decision-challenge` when its trigger rubric applies, before planning
   6. `test-first-implementation`
   7. `bounded-context-review` before boundary-sensitive edits
   8. `evidence-ledger` to finish every non-trivial task, including planning and review.
3. For risky work, add `architecture-critic` and `delivery-critic` review roles.
4. Continue through authorised implementation and relevant verification. Pause for a material scope change, a required approval, or uncertainty that prevents safe progress; routine steps do not create new approval gates.

Respect explicit user instructions and repository requirements within host permissions. When another workflow is required, reuse its equivalent scope, plan, and evidence records instead of producing duplicates. Do not create a protocol run just to use EHS.

## durable run handoff

When a run path already exists, inspect it before relying on conversation history:

```bash
bun run eh status <run-path>
```

Read `state`, `risk`, `criteria`, `blockers`, `validation`, and `nextAction`. Continue only from the recorded state. Use `summary` for a human review handoff, and record a reason when moving to `blocked`, `needs-human-decision`, or `abandoned`.

High-risk runs require a human approval recorded against the current workspace fingerprint before `complete`. Approval is a gate record, not a claim that the local workspace is tamper-resistant.

## quality bar

- Scope is explicit before edits.
- Architecture impact is named.
- Tests protect behaviour before implementation where practical.
- Final claims include evidence, not vibes in a hard hat.

## failure modes

- Treating a risky one-line change as trivial.
- Running every skill for a typo.
- Expanding scope because an unrelated problem looked annoying.
- Skipping evidence because commands were "obvious".
