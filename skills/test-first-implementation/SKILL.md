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

- A brief implementation and verification approach; use [templates/implementation-plan.md](templates/implementation-plan.md) (relative to this `SKILL.md`) when a durable plan is needed, not for every local fix.
- A failing behavioural test where practical, or a brief explanation of the appropriate alternative verification. Reuse existing tests when they already protect the behaviour.

## procedure

1. Identify consequential behaviour to protect and derive expected outcomes from requirements or domain contracts, independently of the implementation.
2. For a bug fix or changed behaviour, reproduce the failure with a meaningful test before implementation where practical. Confirm it fails for the expected reason; an unrelated failure is not a reproduction.
3. Exercise the actual production path at a meaningful boundary. Mock only outside that boundary; do not add tests that merely mirror implementation or manufacture failures for low-impact changes. State verification limits when a behavioural test is not appropriate.
4. Make the smallest complete implementation, then run affected tests and required repository checks. Refactor only after the relevant tests pass.
5. Ask which plausible defect these tests would miss. For consequential behaviour, demonstrate detection with the original regression or a targeted temporary mutation where useful; no mutation framework or quota is required. Broaden or repeat checks only when changes, failures, or unresolved risks justify it. Do not omit required checks.
6. Define recovery proportional to the risk; migrations and external effects need more than reverting a local diff.

## quality bar

- Tests describe behaviour, not private implementation trivia.
- Regression tests fail for the behaviour being corrected, not incidental reasons.
- Cover relevant rejection, boundary, recovery, and invariant cases in proportion to risk, not just the happy path.
- Assert observable outcomes and invariants. Existence, truthiness, call counts, or "does not throw" suffice only when they are the contract.
- Judge tests by meaningful defects they detect, not test count or coverage percentage.
- The implementation is the smallest safe change.
- Rollback is plausible.

## failure modes

- Writing tests after code and calling it discipline.
- Testing mocks instead of behaviour.
- Copying the implementation into expected values or weakening assertions to make tests pass.
- Hiding broad refactors inside "smallest implementation".
- Leaving rollback as "revert it" when migrations, contracts, or deployments are involved.
