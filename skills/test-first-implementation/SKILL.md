---
name: test-first-implementation
description: Choose meaningful regression tests and verification for implementation changes.
---

# test-first-implementation

## when to use

Use before writing code for features, bug fixes, refactors, API changes, state changes, persistence changes, and package changes.

## when not to use

Do not use when the user explicitly approves a throwaway spike, generated code, or configuration-only change. Still record what was not tested.

## required inputs

- Change contract.
- Acceptance evidence.
- Existing tests and test commands.
- Architecture and domain notes when applicable.

## required output

- A brief implementation and verification approach; use `templates/implementation-plan.md` when a durable plan is needed, not for every local fix.
- A failing behavioural test where practical, or a brief explanation of the appropriate alternative verification. Reuse existing tests when they already protect the behaviour.

## procedure

1. Identify behaviour to protect.
2. For a bug fix or changed behaviour, reproduce the failure with a meaningful test before implementation where practical. Confirm it fails for the expected reason; an unrelated failure is not a reproduction.
3. Do not add tests that merely mirror implementation or manufacture failures for low-impact changes. State verification limits when a behavioural test is not appropriate.
4. Make the smallest complete implementation, then run affected tests and required repository checks. Refactor only after the relevant tests pass.
5. Broaden or repeat checks only when changes, failures, or unresolved risks justify it. Do not omit required checks.
6. Define recovery proportional to the risk; migrations and external effects need more than reverting a local diff.

## quality bar

- Tests describe behaviour, not private implementation trivia.
- Regression tests fail for the behaviour being corrected, not incidental reasons.
- The implementation is the smallest safe change.
- Rollback is plausible.

## failure modes

- Writing tests after code and calling it discipline.
- Testing mocks instead of behaviour.
- Hiding broad refactors inside "smallest implementation".
- Leaving rollback as "revert it" when migrations, contracts, or deployments are involved.
