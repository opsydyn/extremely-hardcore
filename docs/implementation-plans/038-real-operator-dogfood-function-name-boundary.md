# implementation plan: real operator dogfood function name boundary

## behaviour to protect

The adapter must reject unsafe `functionName` values before writing generated output and must preserve the current output for valid names.

## first failing test

Add a table-driven `generateAzureSwaFiles` test for `""`, `"."`, `".."`, `"../outside"`, `"nested/server"`, `"..\\outside"`, and a NUL-containing value. Run the focused test before changing production code. Expected failure: the current generator resolves or accepts the value instead of rejecting it.

## smallest implementation

Add one local validation function in `packages/astro-azure-swa/src/generate.ts` and call it as the first operation in `generateAzureSwaFiles`. Reject only empty, separator-containing, NUL-containing, and complete dot-segment values with one actionable error. Do not add a helper package or alter valid output generation.

## refactor step

Review that validation precedes every write, that both slash forms are covered for cross-platform behavior, and that the error does not expose filesystem internals. Keep the path-safety rule local to this public generator boundary.

## checks to run

- Red unsafe-name test.
- Green focused generator tests.
- `bun run check`.
- `bun run lint`.
- `git diff --check`.
- EHS protocol validation, completion, summary, attestation, and CI output.

## rollback plan

Remove the validation function, its focused test, and the README constraint from the isolated target branch. No data migration, runtime deployment, or external-state rollback is required.

## notes

An ADR is required because this tightens a public option at a filesystem security boundary. The bounded-context review is safe with noted risk because the change stays within the adapter's existing generation context and introduces no new dependency or integration flow.
