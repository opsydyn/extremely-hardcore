# domain map: minimum complete change heuristic

## domain terms

- **minimum complete change:** the least powerful implementation that fully satisfies the user intent and change contract.
- **protected obligations:** validation, security, error handling, accessibility, and architectural fit that must not be removed for a smaller diff.
- **scope boundary:** the files, contracts, and behaviours explicitly allowed by the change contract.
- **scope shortcut:** an omission that makes a change smaller while leaving the contract incomplete or unsafe.

## candidate bounded contexts

- **change contract:** owns the explicit minimum-complete-change decision and the allowed/forbidden scope.
- **implementation planning:** interprets the decision into the smallest safe implementation plan.
- **evidence ledger:** records whether the chosen change was complete and what remains uncertain.

## aggregates/entities/value objects

- Change contract.
- Minimum-complete-change statement.
- Protected-obligation list.
- Acceptance criteria and evidence record.

## commands

- Inspect the relevant repository and current behaviour.
- State the minimum complete change before editing.
- Name safeguards that cannot be traded away.
- Review the implementation and evidence against the statement.

## events

- The contract records the minimum complete change.
- The implementation plan maps it to a bounded file set.
- Verification confirms the guidance and repository remain valid.
- The dogfood receipt records friction and remaining uncertainty.

## policies/rules

- Minimum means complete and safe, not fewest lines.
- The trivial-edit exemption remains unchanged.
- A smaller diff is not acceptable if it removes a protected obligation.
- The skill does not calculate a minimum, mutate a repository automatically, or score providers.

## invariants

- Existing intent, scope, risk, public-contract, evidence, and stop-condition fields remain available.
- The minimum-complete-change decision stays inside the change-contract context.
- No runtime, persistence, lifecycle, or adapter state is introduced.
- EHS remains useful without the optional local protocol.

## external systems

- The coding-agent host renders the Markdown skill.
- Git provides the workspace and diff reviewed during dogfood.
- Bun runs repository validation and checks.

## integration points

- `skills/change-contract/SKILL.md` provides the rule and procedure.
- `skills/change-contract/templates/change-contract.md` provides the authoring field.
- The existing EHS protocol records verification and the `needs-human-decision` handoff during dogfood.

## ambiguity

"Minimum" can be misread as a line-count or token target. The skill must define it as the least powerful complete solution and name the safeguards that remain mandatory.

## recommended next questions

- After more real dogfood, does the field improve scope decisions enough to justify remaining required prose?
- Do operators consistently distinguish a minimum complete change from a deferred enhancement?
