---
name: test-first-implementation
description: Use before implementation to protect behaviour with tests, define the first failing test, choose the smallest code change, list checks, and prepare rollback.
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

- Implementation plan from `templates/implementation-plan.md`.
- First failing test, or a written reason why test-first is not practical.

## procedure

1. Identify behaviour to protect.
2. Write or update tests before implementation where practical.
3. Define the first failing test.
4. Run the test and confirm it fails for the expected reason.
5. Make the smallest implementation.
6. Refactor only after tests pass.
7. List checks to run.
8. Define rollback plan.

## quality bar

- Tests describe behaviour, not private implementation trivia.
- The first failing test is specific.
- The implementation is the smallest safe change.
- Rollback is plausible.

## failure modes

- Writing tests after code and calling it discipline.
- Testing mocks instead of behaviour.
- Hiding broad refactors inside "smallest implementation".
- Leaving rollback as "revert it" when migrations, contracts, or deployments are involved.
