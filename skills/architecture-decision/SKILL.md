---
name: architecture-decision
description: Use for consequential new or revised decisions about ownership, compatibility, data, dependencies, security or operations, not routine implementation of an accepted design.
---

# architecture-decision

## when to use

Use when choosing or revising architecture with material consequences:

- New ownership, dependency direction, cross-context flow or domain invariant.
- Public API/shared-contract compatibility, schema or persistence semantics.
- Runtime, framework or external dependency choices.
- Security/auth, deployment, CI or observability policy and operational behaviour.

First reuse an accepted decision when its scope and assumptions still hold.
Changed assumptions, incompatible behaviour or new risks need review.
Reusing a decision does not waive required approval or verification.

## when not to use

Do not create a new ADR for a local fix or extension within an accepted design
whose assumptions still hold. A familiar pattern is not an exemption for a
material security, compatibility, data or operational change.

## repository ADR convention

Installation never scaffolds the user's repository. Reuse its existing ADR
convention (`docs/adr/`, `adr/`, `docs/decisions/`, or a documented alternative).
If none exists, propose `docs/adr/` in the contract and create it only with the
first required ADR in the approved change, never as an empty setup directory.
EHS's own decision directory is not part of the user's project.

## required inputs

- Change contract.
- Current architecture shape.
- Options considered.
- Known constraints and trade-offs.

## required output

- An ADR from [templates/adr.md](templates/adr.md) for a consequential new or revised decision; otherwise reference the accepted decision only when useful to the work. No standalone no-ADR statement is required for routine work.

## procedure

1. Inspect existing decisions and the actual consequences of the proposed change.
2. Reuse a covered decision, or record the new/revised choice, context, alternatives
   and consequences. Do not duplicate the accepted record.
3. Name owned follow-ups and a review condition for provisional decisions.

## quality bar

The decision explains the trade-off against plausible alternatives, including
costs, compatibility and ownership.

## failure modes

- Making architecture changes in code only.
- Recording a decision with no alternatives.
- Calling an irreversible decision "temporary".
- Adding dependencies without an ADR.
