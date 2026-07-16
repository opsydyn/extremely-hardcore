# implementation plan: controlled Codex comparison

## behaviour to protect

The existing adapter remains unchanged. The two evaluations differ only by the stated workspace instruction/skill removal.

## first failing test

Not applicable: this slice changes no source code. The existing adapter suite is the executable contract; live runs are operational evidence.

## smallest implementation

Create a temporary clone at the current commit, remove only baseline instruction assets, run the existing CLI twice, independently verify report digests, inspect raw artifacts, and record a redacted result.

## refactor step

None.

## checks to run

- Commit and workspace-diff checks.
- Adapter report shape and artifact-digest verification for both output directories.
- Existing repository validation, tests, and completion gate.

## rollback plan

Remove temporary workspaces and artifact directories. The repository change is documentation-only and can be reverted without affecting the adapter.

## notes

No claim of benchmark quality or independently verified skill usage is permitted.
