# evidence ledger: real operator dogfood enhancement resource metadata

## work receipt

- result: complete
- claim: Run 5 completed a real isolated `40k-builder` dogfood change that hardens the Enhancement resource compiler against unrepresented source metadata without changing downstream IR or runtime behaviour.
- evidence: The pre-change regression failed with `Received: "Compiled"`; the corrected red/green test pair passed; the focused compiler/evaluator selection passed 322 tests and 2,618 expectations; target typecheck, touched-file Biome, and `git diff --check` exited 0; EHS validation completed with 5/5 criteria, no blockers, valid attestation, and CI output at the retained Run 5 paths.
- remaining uncertainty: The full target suite was not a clean release gate because six legacy snapshot tests require unavailable 10th-edition files; the exact source-key set is local-fixture-backed rather than a fresh upstream corpus audit; commit `cff8ea2` remains isolated from the user's active checkout.
- next: Continue the ten-run campaign without widening the compiler boundary; perform a separate source-key audit before accepting additional upstream shapes.

## summary

Run 5 dogfooded EHS on a real source-compiler hardening change in a temporary `40k-builder` worktree. The fix adds an exact-key guard to the existing Enhancement divide branch and a source-shaped regression for an unrepresented `metadata` key.

## changed files

Target worktree `/private/tmp/ehs-run5-40k`:

- `packages/bsdata/src/compiler.ts`
- `packages/bsdata/test/compiler.test.ts`

EHS repository records:

- `docs/change-contracts/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `docs/decision-challenges/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `docs/domain/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `docs/implementation-plans/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `docs/adr/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `issues/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `docs/reviews/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `docs/evidence/037-real-operator-dogfood-enhancement-resource-metadata.md`
- `docs/dogfood/037-real-operator-dogfood-enhancement-resource-metadata.md`

## commands run

- `bun test packages/bsdata/test/compiler.test.ts -t 'unrepresented metadata'` before the compiler edit -> exit 1; expected red phase, received `Compiled`.
- `bun test packages/bsdata/test/compiler.test.ts -t 'Enhancement cost-type divide|unrepresented metadata'` -> exit 0; 2 pass.
- `bun test packages/bsdata/test/compiler.test.ts packages/engine/test/enhancementResources.test.ts` -> exit 0; 322 pass, 0 fail, 2,618 expect calls.
- `bun run typecheck` -> exit 0.
- `bunx biome check packages/bsdata/src/compiler.ts packages/bsdata/test/compiler.test.ts` -> exit 0.
- `git diff --check` -> exit 0.
- `bun ... eh validate <run>` -> exit 0; completion gate valid.
- `bun ... eh transition <run> complete` -> exit 0.
- `bun ... eh summary <run>` -> exit 0; 5/5 criteria, 0 blockers, validation valid.
- `bun ... eh attest <run> /tmp/extremely-hardcore-dogfood-037-attestation.json` -> exit 0; valid attestation.
- `bun ... eh ci <run> /tmp/extremely-hardcore-dogfood-037-ci` -> exit 0; valid CI attestation and summary.

## passing checks

- Source-shaped metadata rejection and existing valid divide compilation pass together.
- The focused compiler and Enhancement resource evaluator selection passes.
- Target TypeScript and touched-file Biome checks pass.
- The target diff has no whitespace errors and contains two source/test files only.
- Run 5 protocol evidence is fresh at committed workspace fingerprint `c64ef34e0270d17edf91bd6c38017ec359d32b2f3d00ea3406bacb8f96d31f58`.
- Attestation `/tmp/extremely-hardcore-dogfood-037-attestation.json` is valid.
- CI artefacts `/tmp/extremely-hardcore-dogfood-037-ci/` are valid.

## failing checks

- The deliberate pre-change regression failed as expected.
- The broader baseline `packages/engine/test/roster.test.ts` selection had six unrelated failures because the isolated worktree does not contain the legacy `wh40k-10e-main/Warhammer 40,000.gst` snapshot. No fix was attempted.
- `bun install --frozen-lockfile` reported that the committed lockfile would change; the subsequent setup rewrote only generated lockfile metadata, which was removed before final verification. No dependency change remains.

## architecture impact

No new ADR is required. The change tightens an existing accepted ADR 0022 compiler/ACL boundary and leaves module dependencies, IR, evaluator, API, persistence, runtime, deployment, and qualification policy unchanged.

## public contract impact

The source compiler now rejects one class of unrepresented Enhancement modifier metadata with a blocking diagnostic. The compiled IR and downstream contracts are unchanged.

## risks left open

- The allowlist is justified by the committed fixture and existing audited branch, not a newly fetched full upstream snapshot.
- Full repository release evidence and catalogue qualification remain outside this slice and fail-closed.
- Target commit `cff8ea2` contains only the compiler and regression-test changes; the active user checkout was not modified.

## human review needed

The scoped target diff was reviewed and committed. Review whether the local source-key evidence is sufficient before the next upstream audit.

## final recommendation

complete with noted risk
