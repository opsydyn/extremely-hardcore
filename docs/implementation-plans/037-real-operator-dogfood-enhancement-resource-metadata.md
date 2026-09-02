# implementation plan: real operator dogfood enhancement resource metadata

## behaviour to protect

The Enhancement resource compiler must reject a modifier containing source metadata that the source-independent `EnhancementResourceModifier` cannot represent. Valid audited divide modifiers must continue to compile unchanged.

## first failing test

Extend `packages/bsdata/test/compiler.test.ts` with a source-shaped mutation of `catalogue-enhancement-cost-modifier.json` that adds `metadata: "unrepresented"` to the divide modifier. Run the focused compiler test before changing production code. Expected failure: the compiler incorrectly returns `Compiled` because the current branch ignores the extra key.

## smallest implementation

In `enhancementResourceModifierOf`, check `Object.keys(modifier)` against the audited keys `id`, `type`, `operator`, `field`, `value`, `conditions`, `before`, and `after` before compiling conditions. If the first unsupported key exists, emit the existing `unsupported-node` diagnostic with the source definition and return `null`. Add no helper, schema, or downstream field.

## refactor step

Review the guard for deterministic first-key reporting, source provenance, and consistency with the target's other narrow compiler branches. Do not generalise exact-key validation in this slice.

## checks to run

- Red source-shaped compiler test.
- Green focused `packages/bsdata/test/compiler.test.ts` test selection.
- `bun test packages/bsdata/test/compiler.test.ts packages/engine/test/enhancementResources.test.ts`.
- `bunx biome check packages/bsdata/src/compiler.ts packages/bsdata/test/compiler.test.ts`.
- `bunx tsc --noEmit`.
- `git diff --check`.
- EHS protocol validation, completion, summary, attestation, and CI output.

## rollback plan

Remove the one compiler guard and its regression test from the isolated target branch. No data migration, public IR change, deployment, or external-state rollback is required. Preserve the EHS run as historical evidence if the slice is abandoned.

## notes

No new ADR is required. This is an implementation correction within accepted ADR 0022 and does not alter imports or module boundaries, so a bounded-context review is not triggered.
