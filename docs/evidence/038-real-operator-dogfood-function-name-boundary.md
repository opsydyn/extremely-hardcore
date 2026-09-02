# evidence ledger: real operator dogfood function name boundary

## work receipt

- result: complete
- claim: Run 6 completed a real isolated `astro-azure-integration` dogfood change that blocks unsafe `functionName` values before generated output writes without changing valid adapter output.
- evidence: The pre-change table-driven regression failed because unsafe values were accepted or surfaced raw filesystem errors; the corrected test passed 7 cases and proved `dist/api` was not created; the full target check passed 46 tests, typechecking, adapter build, example check, and example build; package lint, public README contract check, and `git diff --check` exited 0; EHS validation completed with 5/5 criteria, no blockers, and valid attestation/CI output.
- remaining uncertainty: The rule covers filesystem path hazards but not a complete Azure function-name grammar or live deployment behavior; commit `560a5d0` remains isolated in its temporary worktree.
- next: Preserve the path-safety boundary for later platform audits and continue the ten-run dogfood campaign without widening this slice.

## summary

Run 6 dogfooded EHS on a real adapter security-boundary change in a temporary `astro-azure-integration` worktree. The fix validates the public `functionName` before generated Azure Static Web Apps files are written and documents the single-path-segment contract.

## changed files

Target worktree `/private/tmp/ehs-run6-astro`:

- `packages/astro-azure-swa/src/generate.ts`
- `packages/astro-azure-swa/test/generate.test.ts`
- `packages/astro-azure-swa/README.md`

EHS repository records:

- `docs/change-contracts/038-real-operator-dogfood-function-name-boundary.md`
- `docs/decision-challenges/038-real-operator-dogfood-function-name-boundary.md`
- `docs/domain/038-real-operator-dogfood-function-name-boundary.md`
- `docs/implementation-plans/038-real-operator-dogfood-function-name-boundary.md`
- `docs/adr/038-real-operator-dogfood-function-name-boundary.md`
- `issues/038-real-operator-dogfood-function-name-boundary.md`
- `docs/reviews/038-real-operator-dogfood-function-name-boundary.md`
- `docs/evidence/038-real-operator-dogfood-function-name-boundary.md`
- `docs/dogfood/038-real-operator-dogfood-function-name-boundary.md`

## commands run

- `bun install --frozen-lockfile` -> exit 0; 2,052 packages installed.
- `bun test packages/astro-azure-swa/test/generate.test.ts` on the clean baseline -> exit 0; 13 pass.
- `bun test packages/astro-azure-swa/test/generate.test.ts -t 'unsafe function names'` before the guard -> exit 1; expected red phase, unsafe values were not rejected.
- `bun test packages/astro-azure-swa/test/generate.test.ts -t 'unsafe function names'` after the guard -> exit 0; 7 pass.
- `bun test packages/astro-azure-swa/test/generate.test.ts` -> exit 0; 20 pass, 29 expect calls.
- `bun run check` -> exit 0; adapter build, typecheck, 46 tests, example typecheck, and example build passed.
- `bun run lint` -> exit 0; package build, publint, and attw passed.
- `git diff --check` -> exit 0.
- `bun ... eh validate <run>` -> exit 0; completion gate valid.
- `bun ... eh transition <run> complete` -> exit 0.
- `bun ... eh summary <run>` -> exit 0; 5/5 criteria, 0 blockers, validation valid.
- `bun ... eh attest <run> /tmp/extremely-hardcore-dogfood-038-attestation.json` -> exit 0; valid attestation.
- `bun ... eh ci <run> /tmp/extremely-hardcore-dogfood-038-ci` -> exit 0; valid CI attestation and summary.

## passing checks

- Unsafe names are rejected before the generated `dist/api` directory exists.
- Existing valid generator output and configuration behavior remain covered.
- The target build, typecheck, complete test suite, and example build pass.
- Package publication compatibility checks pass.
- README contract documentation is present.
- The final target diff has no whitespace errors and contains only three intended files.
- Run 6 protocol evidence is fresh at committed-workspace fingerprint `5e61ea8c848a64296e6be1d5955c8bb432f5a3d6933c0e76ed5f35644c724311`.
- Attestation `/tmp/extremely-hardcore-dogfood-038-attestation.json` and CI artefacts `/tmp/extremely-hardcore-dogfood-038-ci/` are valid.

## failing checks

- The deliberate pre-change regression failed as expected.
- No unrelated target failure was observed in the final focused or repository checks.

## architecture impact

ADR 038 records the public filesystem-boundary decision. No dependency, module, runtime bridge, routing, persistence, deployment workflow, or generated valid-output shape changed.

## public contract impact

The public `functionName` option now rejects empty values, path separators, NUL, and complete `.` or `..` values. Exported TypeScript types are unchanged.

## risks left open

- The safety rule is not a complete Azure function-name grammar and has no live deployment proof.
- Target commit `560a5d0` remains isolated; the active user checkout was not modified.
- Protocol attestation provides local traceability, not cryptographic signing, agent identity, sandbox enforcement, or provider compliance.

## human review needed

The scoped three-file diff was reviewed and committed as `560a5d0`. Any broader Azure naming or deployment claim requires a separate review.

## final recommendation

complete with noted risk
