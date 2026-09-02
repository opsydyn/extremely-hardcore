# domain map: real operator dogfood enhancement resource metadata

## domain terms

- **Enhancement resource:** a non-points accounting resource used by the 11th-edition catalogue for duplicate Enhancement limits.
- **divide modifier:** the audited source operation that reduces one Enhancement resource amount when a duplicate threshold is met.
- **source metadata:** fields on a BSData modifier that may carry semantics and must not be silently discarded.
- **blocking diagnostic:** compiler evidence that prevents an incomplete source shape from becoming published IR.
- **provenance:** source file, definition, path, and snapshot identity retained on the diagnostic or compiled rule.

## candidate bounded contexts

- **BSData ACL/compiler:** decodes source-shaped records and decides whether the exact audited form can cross into IR.
- **Engine IR:** owns the typed Enhancement resource modifier after compilation; unchanged in this slice.
- **Roster evaluator:** applies the typed resource rule; unchanged in this slice.
- **EHS evidence protocol:** records the operator's change and verification; it does not interpret game rules.

## aggregates/entities/value objects

- Source modifier record.
- `EnhancementResourceModifier` IR value.
- Compiler diagnostic with source provenance.
- EHS change run and evidence records.

## commands

- Inspect the committed source fixture and compiler branch.
- Add a source-shaped unknown-metadata regression.
- Reject unsupported metadata before constructing the IR value.
- Run focused compiler and repository checks.

## events

- Source shape is observed.
- Red regression demonstrates silent acceptance.
- Compiler emits a blocking diagnostic.
- Green verification proves the accepted shape remains unchanged.

## policies/rules

- Source metadata with unrepresented semantics must fail closed; source `id` is accepted as identity metadata even though it is not promoted into the IR.
- Only divide values `2` and `3` are admitted for this audited family.
- The modifier is upgrade-owned and does not declare a separate scope or target.
- The IR must not receive raw source metadata or native source IDs.

## invariants

- No unsupported source key crosses the compiler boundary.
- Existing valid Enhancement resource fixtures still compile.
- Points evaluation and the resource ledger remain unchanged.
- Diagnostics retain the source path and target definition.

## external systems

- `BSData/wh40k-11e` is the upstream source model referenced by the target ADR; no network access is needed for this run.
- Bun is the target repository's test/typecheck/lint runtime.
- Git provides the isolated worktree and diff boundary.

## integration points

- `packages/bsdata/src/compiler.ts` constructs the typed IR.
- `packages/bsdata/test/compiler.test.ts` protects source acceptance and rejection.
- `packages/engine` consumes the existing typed value but is not changed.
- EHS captures target commands through the run path.

## ambiguity

The committed local fixture establishes the intended keys for this audited tracer, but it is not a complete upstream corpus. A future source audit is required before admitting additional metadata keys.

## recommended next questions

- Does the pinned source contain any legitimate optional keys on this exact Enhancement divide family that should be explicitly admitted?
- Should the target later extract shared exact-key validation only if multiple compiler branches demonstrate the same need?
