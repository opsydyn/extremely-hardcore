# change contract: action-level bounded bug-fix fixture

## user intent

Implement the approved first action-level fixture so evaluation moves beyond non-discriminative prompt classification.

## current understanding

The existing deterministic runner proves protocol error conditions and the Codex adapter scores declared classifications. Neither requires a model or staged executor to inspect a workspace, make a bounded source change, retain fresh evidence, and complete a run after a state change. The approved design requires a two-stage, provider-neutral fixture.

## allowed scope

- Add one tracked Bun/TypeScript fixture and a provider-neutral staged fixture runner.
- Add action-fixture result types, a deterministic reference executor, focused tests, and a local JSON CLI.
- Use existing protocol evidence capture, fingerprinting, validation, and transition APIs without changing their semantics.
- Add decision, contract, domain, boundary, implementation, evaluation, evidence, and run records for slice 017.

## forbidden scope

- Provider calls, Codex adapter changes, retry or concurrency policy, persistent storage, CI thresholds, transcript interpretation, protocol schema changes, or a second action fixture.

## affected areas

- `evaluation/`, `scripts/`, `tests/evaluation/`, tracked fixture assets, package scripts, and evaluation documentation.
- Slice 017 documentation and completion-gate records.

## public contracts

Adds experimental `ActionFixtureResult` JSON and `bun run evaluate:action-fixture -- --output-dir <new-dir>`. Existing core, baseline, Codex, and protocol CLI contracts remain unchanged.

## assumptions

Bun and Git are available for local fixture execution. The caller selects a new writable output directory and understands the reference executor is deterministic harness validation, not an agent result.

## risks

The first fixture can overfit to its one known defect. The staged executor boundary must not let fixture-specific scoring or source changes leak into provider adapters. Retained artifacts may contain local fixture state and must remain caller-owned.

## acceptance evidence

- Red tests demonstrate the missing runner, forbidden-diff rejection, stale evidence, and missing completion failures.
- A reference executor produces a complete action-fixture result with fresh Stage B evidence and one transition.
- Existing evaluator and protocol paths remain passing.
- Static validation, full suite, typecheck, and guarded completion pass.

## stop conditions

- The fixture requires a protocol API or schema change to express its oracle.
- Correct scoring needs provider transcript parsing, hidden process state, or a write-capable external model.
