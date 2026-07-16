# change contract: action-fixture protocol hardening

## user intent

Harden Task 3's bounded action-fixture runner against mutable run contracts, substituted evidence commands, malformed run state, and symlinked input or retained artifacts.

## current understanding

The runner owns staged scoring and report construction. Existing protocol APIs own generic evidence capture, validation, fingerprints, and transitions. The action fixture's known request command and initial run contract are runner-owned inputs.

## allowed scope

- Modify the bounded action-fixture runner and its focused runner tests.
- Pin and validate immutable run-contract fields while allowing evidence reference refreshes.
- Validate evidence argv against the request command, return reports for invalid run JSON, and reject symlinks before inventory or artifact retention.

## forbidden scope

- Protocol API or schema changes, generic protocol tests, staged-executor interface changes, provider adapter changes, or changes to fixture semantics.

## affected areas

- `evaluation/run-bounded-bug-fix-fixture.ts`
- `tests/evaluation/action-fixture.test.ts`

## public contracts

`ActionFixtureResult` and the existing two-stage execution sequence remain unchanged. New findings are represented through the existing `ActionFixtureFailure` fields.

## assumptions

The only permitted `run.json` mutation is replacement of acceptance-criterion `evidenceIds` by existing evidence capture behaviour.

## risks

Malformed executor-owned artifacts must be scored invalid without allowing report generation itself to follow unsafe paths.

## acceptance evidence

- Focused red tests prove each confirmed finding against the prior runner.
- Focused and full checks pass after the smallest runner-only implementation.

## stop conditions

- A fix requires a protocol schema/API change or changes the stage callback, report schema, or transition rules.
