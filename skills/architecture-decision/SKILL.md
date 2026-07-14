---
name: architecture-decision
description: Use when a change may alter architecture, runtime, framework, schema, persistence, public API, auth, deployment, CI, observability, cross-context flow, dependency, shared package contract, or domain invariant.
---

# architecture-decision

## when to use

Use when changing any of:

- Runtime.
- Framework.
- Database schema.
- Persistence model.
- Public API.
- Auth.
- Deployment.
- CI.
- Observability.
- Cross-context flow.
- Shared package contract.
- External dependency.
- Domain model invariant.

## when not to use

Do not use for local implementation choices that do not affect contracts, boundaries, operations, dependencies, or future architecture.

## required inputs

- Change contract.
- Current architecture shape.
- Options considered.
- Known constraints and trade-offs.

## required output

- ADR from `templates/adr.md`, or a clear statement that no ADR is required and why.

## procedure

1. Check the trigger list.
2. If any trigger applies, write an ADR.
3. State context without rewriting project history as folklore.
4. Record the decision.
5. List consequences, options considered, and trade-offs.
6. Add follow-up work only when it is real and owned.
7. Set a review date when the decision is provisional.

## quality bar

- The ADR explains why this choice is better than plausible alternatives.
- Consequences include costs, not just optimism.
- Trade-offs are explicit.
- Follow-up work is not a dumping ground for regret.

## failure modes

- Making architecture changes in code only.
- Recording a decision with no alternatives.
- Calling an irreversible decision "temporary".
- Adding dependencies without an ADR.
