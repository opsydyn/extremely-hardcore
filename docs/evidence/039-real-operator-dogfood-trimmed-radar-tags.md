# evidence ledger: real operator dogfood trimmed radar tags

## work receipt

- result: complete
- claim: Run 7 completed a real isolated `tech-radar-web` dogfood change that makes normalized radar tag options match source tags containing surrounding whitespace.
- evidence: The pre-change regression failed with `Cloud` available but no matching blip; the corrected focused test passed; the combined search utility tests passed 15 tests; Astro check/build passed with 0 errors; app lint and `git diff --check` exited 0; EHS validation completed with 5/5 criteria, no blockers, and valid attestation/CI output.
- remaining uncertainty: The repository-wide Vitest command retains one pre-existing Vanilla Extract file-scope failure in `BlipHistory.test.ts`, Moon check is unavailable without a task identifier in this non-TTY environment, and commit `ffc985c` remains isolated in its temporary worktree.
- next: Preserve the local tag-identity boundary for future content-model work and continue the dogfood campaign in another clean repository area.

## summary

Run 7 dogfooded EHS on a real frontend behavior fix in a temporary `tech-radar-web` worktree. The fix aligns source-tag comparison with the existing trimmed, case-insensitive available-tag projection.

## changed files

Target worktree `/private/tmp/ehs-run7-tech-radar`:

- `apps/astro/src/hooks/useBlipSearch.ts`
- `apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts`

EHS repository records:

- `docs/change-contracts/039-real-operator-dogfood-trimmed-radar-tags.md`
- `docs/adr/039-real-operator-dogfood-trimmed-radar-tags.md`
- `docs/domain/039-real-operator-dogfood-trimmed-radar-tags.md`
- `docs/implementation-plans/039-real-operator-dogfood-trimmed-radar-tags.md`
- `issues/039-real-operator-dogfood-trimmed-radar-tags.md`
- `docs/reviews/039-real-operator-dogfood-trimmed-radar-tags.md`
- `docs/evidence/039-real-operator-dogfood-trimmed-radar-tags.md`
- `docs/dogfood/039-real-operator-dogfood-trimmed-radar-tags.md`

## commands run

- `bun install --frozen-lockfile` -> exit 0; 2,744 packages installed.
- `bun run test -- apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts` on the clean baseline -> exit 0; 7 tests passed.
- `bun run test` on the clean baseline -> exit 1; 53 tests passed and `BlipHistory.test.ts` failed during Vanilla Extract file-scope setup.
- `bun run --cwd apps/astro build` on the clean baseline -> exit 0; Astro check/build passed with 0 errors and 12 hints.
- `bun run moon:check` on the clean baseline -> exit 1; Moon required an explicit task identifier in the non-TTY environment.
- `bun run --cwd apps/astro lint` on the clean baseline -> exit 0; 337 existing warnings and 0 errors.
- `bun run test -- apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts -t "matches tags after trimming source whitespace"` before the fix -> exit 1; expected red phase.
- The same focused regression after the fix -> exit 0; 1 test passed.
- `bun run test -- apps/astro/src/hooks/useBlipSearch.test.ts apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts` -> exit 0; 15 tests passed.
- `bun run --cwd apps/astro build` -> exit 0; Astro check/build passed with 0 errors and 12 hints.
- `bun run --cwd apps/astro lint` -> exit 0; 337 warnings and 0 errors.
- `bun run test` -> exit 1; 54 tests passed and the same pre-existing `BlipHistory.test.ts` setup failure remained.
- `git diff --check` -> exit 0.
- Post-commit EHS evidence capture -> five criteria exited 0: `cc0ee194-b742-4774-9631-01215e755c61`, `2020bae0-0ef6-4942-b651-00119ee2c255`, `fbf1acec-1e95-4180-b59d-798fab073db4`, `174ff5c0-0ed6-4d43-b18d-332006bf87bb`, and `ee9ba7f3-0b70-4188-9ce1-9c33a60d1d07`.
- `bun ... eh validate <run>` -> exit 0; completion gate valid.
- `bun ... eh transition <run> complete` -> exit 0; transition `44679c97-cc0a-405a-9476-c84f68953f55`.
- `bun ... eh summary <run>` -> exit 0; 5/5 criteria, 0 blockers, validation valid.
- `bun ... eh attest <run> /tmp/extremely-hardcore-dogfood-039-attestation.json` -> exit 0; valid attestation.
- `bun ... eh ci <run> /tmp/extremely-hardcore-dogfood-039-ci` -> exit 0; valid CI attestation and summary.

## passing checks

- Normalized available tag values now select source tags with surrounding whitespace.
- Existing search and tag-filter behavior remains covered by 15 passing focused tests.
- Astro typecheck/static build passes with no errors.
- App lint exits successfully; existing warnings are outside the touched files.
- Final target diff has no whitespace errors and contains only the two intended source/test files.
- Run 7 protocol evidence is fresh at committed-workspace fingerprint `48cbb6cbc14934bd7c03a2fafb0f750fdaf74e08c454cd94840c84fc46a5c6b7`.
- Attestation `/tmp/extremely-hardcore-dogfood-039-attestation.json` and CI artefacts `/tmp/extremely-hardcore-dogfood-039-ci/` are valid.

## failing checks

- The deliberate pre-change regression failed as expected.
- The repository-wide Vitest command failed before and after the change in `BlipHistory.test.ts` during Vanilla Extract setup; this is a known unrelated baseline failure.
- `bun run moon:check` failed because Moon requires an explicit task identifier in the non-TTY environment.

## architecture impact

The architecture assessment records no architecture change. The fix remains inside the existing radar search hook; no imports, module boundaries, content schema, persistence, routes, dependencies, or deployment behavior changed.

## public contract impact

No exported TypeScript or persisted contract changed. The user-facing tag filter now agrees with the existing normalized available-tag projection.

## risks left open

- The repository-wide `BlipHistory.test.ts` setup failure remains unresolved and should be addressed separately.
- App lint has 337 existing warnings; this slice does not claim a warning-free repository.
- The test is unit-level and does not establish manual browser or visual QA for every radar view.
- Target commit `ffc985c` remains isolated in its temporary worktree; the active user checkout was not modified.
- Protocol attestation provides local traceability, not cryptographic signing, agent identity, sandbox enforcement, or provider compliance.

## human review needed

The scoped two-file target diff was reviewed and committed as `ffc985c`. Do not infer a content-ingestion or persisted canonicalization decision from this local UI fix; any broader canonicalization requires separate review.

## final recommendation

complete with noted risk
