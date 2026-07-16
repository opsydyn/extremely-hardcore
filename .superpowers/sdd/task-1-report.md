# Task 1 Report: Define The Action Fixture Contract

## Status

Complete for Task 1. The focused test intentionally remains red because the
runner is Task 2.

## Change

Added the exact public action-fixture contracts to `evaluation/types.ts`:

- `ActionFixtureStage`
- `ActionFixtureFailure`
- `ActionFixtureRequest`
- `ActionFixtureExecutor`
- `ActionFixtureStageResult`
- `ActionFixtureResult`

Added `tests/evaluation/action-fixture.test.ts` with the passing-fixture
contract test and local temporary output-directory helpers.

## Evidence

First red run, before the contract types:

```text
bun test v1.3.11 (af24e281)
error: Cannot find module '../../evaluation/run-bounded-bug-fix-fixture' from '/Users/alancurrie/Projects/extremely-hardcore-skill/.worktrees/action-level-bug-fix/tests/evaluation/action-fixture.test.ts'
0 pass
1 fail
1 error
Ran 1 test across 1 file.
```

Focused run after adding the types produced the same expected red result:

```text
error: Cannot find module '../../evaluation/run-bounded-bug-fix-fixture'
0 pass
1 fail
1 error
Ran 1 test across 1 file.
```

`git diff --check` passed. Self-review confirmed the change is limited to the
two Task 1 files and the signatures match the brief exactly.

## Architecture And Boundary Impact

This adds the experimental shared contract already defined by ADR 0012 and
does not change protocol behavior, persistence, provider execution, CLI
behavior, or module ownership. No new architecture decision is required.

## Concerns And Remaining Risk

The focused test cannot execute until Task 2 adds
`evaluation/run-bounded-bug-fix-fixture.ts`. No passing test claim is made for
this task. The temporary output parent created by the test helper is outside
the requested artifact directory and is not removed by the current test
because module resolution fails before test execution; Task 2 may refine the
helper when the runner exists.

## Commit

`9b71745 test: define action fixture contract`

## Recommendation

Needs follow-up: proceed to Task 2, where the runner is implemented and this
focused test is expected to turn green.

## Task 1 Reviewer Fix Report

### Status

Complete. The reviewer finding is fixed without expanding Task 1 scope.

### Fix

Updated `tests/evaluation/action-fixture.test.ts` so `createOutputDir()` retains
the unique temporary parent path alongside the artifacts path. The test now
removes the parent recursively in `finally`, which removes both the artifacts
directory and the otherwise-empty temporary parent.

### Verification

Command:

```text
bun test tests/evaluation/action-fixture.test.ts
```

Output:

```text
bun test v1.3.11 (af24e281)

tests/evaluation/action-fixture.test.ts:

# Unhandled error between tests
-------------------------------
error: Cannot find module '../../evaluation/run-bounded-bug-fix-fixture' from '/Users/alancurrie/Projects/extremely-hardcore-skill/.worktrees/action-level-bug-fix/tests/evaluation/action-fixture.test.ts'
-------------------------------


 0 pass
 1 fail
 1 error
Ran 1 test across 1 file. [86.00ms]
```

Exit code: `1`, expected because the Task 2 runner is absent.

Command:

```text
git diff --check
```

Output: no output; exit code `0`.

### Scope And Concerns

Changed file: `tests/evaluation/action-fixture.test.ts` only. No public types,
runner, or task scope were changed. The focused test intentionally remains red
until Task 2 adds `evaluation/run-bounded-bug-fix-fixture.ts`.

### Commit

Pending at report authoring time.
