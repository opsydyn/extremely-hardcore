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

## repository ADR convention

EHS is installed as a skill. Installation does not scaffold or mutate the
user's repository.

When an ADR is required:

1. Inspect the repository for an existing decision convention, such as
   `docs/adr/`, `adr/`, `docs/decisions/`, or a documented project-specific
   path. Reuse that convention.
2. If no convention exists, state the proposed `docs/adr/` path in the change
   contract and create the directory only with the first ADR, as part of that
   approved change.
3. Do not create an empty directory, create an ADR for a change that does not
   meet the trigger list, or treat EHS's own `docs/adr/` as part of the user
   repository.

The directory choice is repository-local documentation policy, not an EHS
installation or runtime requirement.

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
