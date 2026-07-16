# implementation plan: action-level bounded bug-fix fixture

## behaviour to protect

Existing protocol validation and transition semantics remain the authority for evidence freshness and completion. Existing deterministic, declared-baseline, and Codex evaluation contracts remain unchanged.

## first failing test

Add `tests/evaluation/action-fixture.test.ts` importing the absent action fixture runner. Its first case invokes the fixture with a staged reference executor and expects an initial failed test, permitted source fix, stale Stage A evidence after marker mutation, fresh Stage B evidence, and exactly one completion transition.

## smallest implementation

Add one tracked fixture directory, action-fixture result/executor types, a provider-neutral two-stage runner, and a deterministic reference executor. Expose the reference run through a JSON CLI with a caller-selected new output directory.

## refactor step

Keep fixture-specific source expectations in tracked fixture metadata or assets. Keep protocol APIs unchanged and do not fold action-fixture status into `AgentAttemptAssessment`.

## checks to run

- Focused action-fixture tests, including forbidden-diff, missing Stage A evidence, stale Stage B evidence, and premature completion cases.
- `bun run evaluate:action-fixture -- --output-dir <new-dir>`.
- Existing evaluators, `bun run check`, `bun run test`, `bunx tsc --noEmit`, and a slice 017 completion gate.

## rollback plan

Revert the new fixture runner, reference executor, fixtures, CLI, types, documentation, and ADR as one slice. No protocol schema, provider account, or persistent external state changes.

## notes

This slice proves the local action oracle only. No live model run, declared-mode comparison, or provider adapter is allowed.

## review-fix coverage

The public `bun run evaluate:action-fixture -- --output-dir <new-dir>` package-script boundary is covered directly. The CLI suite also protects existing-output-directory rejection and preservation of its contents. The runner already implemented this rejection, so these review tests are expected to pass without a production-code change. The retained focused-suite evidence command is `bun test tests/evaluation/action-fixture.test.ts tests/evaluation/evaluate-action-fixture-cli.test.ts`.
