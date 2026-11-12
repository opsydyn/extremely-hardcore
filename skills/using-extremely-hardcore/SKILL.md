---
name: using-extremely-hardcore
description: Route non-trivial coding changes to risk-appropriate EHS guidance.
---

# using-extremely-hardcore

## when to use

Use before non-trivial coding changes; skip the implementation guidance for assessment-only work.

Escalate according to blast radius, reversibility, security, compatibility and uncertainty, not keywords or diff size. Add the relevant architecture, delivery and test-quality review for consequential changes.

## when not to use

Skip the full loop for trivial copy, formatting or local fixes with no behaviour
impact. A one-line auth, billing, migration or deployment change is not
automatically trivial.

## required inputs

- User request.
- Repository context.
- Any explicit constraints from the user.
- Current git status.

## required output

- Scope, relevant constraints, and evidence appropriate to the change.
- Explain a routing decision only when it materially affects the work; do not report every skipped skill.

## procedure

1. Routine work follows one short path: scope and constraints -> smallest complete change -> meaningful verification -> outcome and limitations. Reuse a clear brief and accepted decisions; do not repeat them as new forms. Keep local records in the conversation unless durable records are required.
2. Start non-trivial work with `change-contract`. Load only applicable guidance, not the entire list:
   1. `change-contract`
   2. `domain-discovery` when domain rules, language or ownership are unclear or changing
   3. `simple-made-easy` when multiple complete paths or accidental-complexity risks exist
   4. `architecture-decision` for consequential new or revised decisions, not merely using an accepted design
   5. `decision-challenge` when its trigger rubric applies, before planning
   6. `test-first-implementation`
   7. `bounded-context-review` when dependency direction, ownership or integration behaviour changes
   8. `evidence-ledger` to finish every non-trivial task, including planning and review.
3. For risky work, apply relevant architecture, delivery and test-quality perspectives; optional `agents/` prompts can help, but do not manufacture three reports. Review consequential failure paths, assertion strength and plausible missed defects. Use independent review when available and authorised; otherwise label self-review. Self-review cannot replace required independent review or human approval.
4. Continue through authorised implementation and relevant verification. Pause for a material scope change, a required approval, or uncertainty that prevents safe progress; routine steps do not create new approval gates.

Respect explicit user instructions and repository requirements within host permissions. When another workflow is required, reuse its equivalent scope, plan, and evidence records instead of producing duplicates. Do not create a protocol run just to use EHS.

Before adding a document, test or review, ask whether it changes the implementation or confidence in a meaningful acceptance condition. Omit redundant process, never required safeguards or checks.

## execution approach

Honour the chosen user/host method; otherwise work inline. Recommend native
subagents only when available, authorised and worth their context/coordination
cost for independent work or fresh review. Ask only if the choice changes scope,
budget or permissions. Workers need requirements, scope and verification
expectations, not extra authority. One owner handles overlapping writes; the
parent owns integration and final verification.

## durable run handoff

When a run path already exists, inspect it before relying on conversation history:

```bash
bun run eh status <run-path>
```

Read `state`, `risk`, `criteria`, `blockers`, `validation`, and `nextAction`. Continue only from the recorded state. Use `summary` for a human review handoff, and record a reason when moving to `blocked`, `needs-human-decision`, or `abandoned`.

High-risk runs require a human approval recorded against the current workspace fingerprint before `complete`. Approval is a gate record, not a claim that the local workspace is tamper-resistant.

## quality bar

Scope and consequential architecture impact are clear; tests and completion
evidence match the risk. Routine no-ADR announcements are unnecessary.

## failure modes

- Treating a risky one-line change as trivial.
- Running every skill for a typo.
- Expanding scope because an unrelated problem looked annoying.
- Skipping evidence because commands were "obvious".
