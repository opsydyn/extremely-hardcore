# change contract: fixture-local protocol CLI

## user intent

Resolve the held action-fixture precondition: make evidence capture and guarded completion executable inside the copied fixture workspace before any live provider adapter or self-improvement work.

## current understanding

The runner currently owns staging and scoring, while the host reference executor directly calls protocol APIs. The copied fixture has a task oracle but no local command surface for an agent to create standard evidence or request completion. A fixture-local artifact can make those actions executable, but local files alone cannot prove which external process invoked them.

## allowed scope

- Add one immutable fixture-local Bun script with fixed `evidence --stage <stage>` and `complete --stage resume` commands.
- Add a fixture-owned append-only invocation ledger and runner-local validation of the expected invocation sequence and links to standard evidence and transition records.
- Change only the deterministic reference executor and focused action-fixture tests to use that local command surface.
- Add the required decision, architecture, domain, boundary, implementation, and evidence records.

## forbidden scope

- Live provider execution, a Codex adapter, provider-side transcript collection, sandbox or network enforcement claims, benchmark comparison, or regression thresholds.
- Generic protocol schema, generic CLI, validation, or public package changes.
- SkillOpt integration, session mining, or automatic skill promotion.

## affected areas

- `evaluation/fixtures/bounded-bug-fix/`
- `evaluation/reference-bounded-bug-fix-executor.ts`
- `evaluation/run-bounded-bug-fix-fixture.ts`
- `evaluation/types.ts`
- `tests/evaluation/action-fixture.test.ts`
- Action-fixture documentation and slice records.

## public contracts

The experimental fixture gains a local command surface and retains `protocol-invocations.jsonl`. `ActionFixtureResult` remains schema version 1; its artifact list gains the local script and ledger. Generic `eh` and protocol contracts are unchanged.

## assumptions

The fixture workspace has Bun and Git, as the existing fixture already requires. The local command script may reproduce only the fixed fixture path's V1 protocol operations; the host runner remains the independent scorer.

## risks

Duplicating a narrow protocol path can drift from generic semantics. A forged local ledger cannot prove external agent identity. The runner must verify structural links and immutable assets without claiming more than it observes.

## acceptance evidence

- A red focused test fails because the fixture-local commands and ledger validation do not exist.
- The reference executor creates Stage A and Stage B evidence plus the one completion transition through local commands.
- Focused tests reject missing, malformed, wrong-stage, mismatched, and extra invocation records.
- The retained report includes the immutable local command script and invocation ledger.
- `bun run check`, `bun run test`, and `bunx tsc --noEmit` pass.

## stop conditions

- A required behaviour needs a generic protocol API/schema change.
- The design requires trusted adapter metadata to assert agent ownership.
- The slice expands into provider execution, a network-isolation claim, or a public integration contract.
