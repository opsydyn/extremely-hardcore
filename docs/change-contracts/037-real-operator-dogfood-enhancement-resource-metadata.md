# change contract: real operator dogfood enhancement resource metadata

## user intent

Run the fifth real EHS dogfood change in an isolated external repository. Harden the committed `40k-builder` BSData compiler so an `Enhancements` divide modifier with unrelated source metadata is rejected instead of silently discarding that metadata.

## current understanding

The target is `40k-builder` at committed `HEAD` `80ce573` in `/private/tmp/ehs-run5-40k`, a temporary branch created from the active repository's committed baseline. The user's active `/Users/alancurrie/Projects/40k-builder` checkout contains unrelated uncommitted compiler work and is protected.

The existing `enhancementResourceModifierOf` branch already checks the native divide operator, upgrade ownership, absent separate scope/target, divide values `2` or `3`, conditions, and ordering dependencies. It does not reject unknown keys on the source modifier, so a source field that could affect semantics can be accepted and omitted from the source-independent IR.

The target's accepted ADR 0022 requires the BSData ACL/compiler to emit complete source-independent IR or blocking diagnostics. This slice strengthens that existing boundary without changing the IR, evaluator, API, persistence, or qualification policy.

## allowed scope

- Add one source-shaped compiler regression to `packages/bsdata/test/compiler.test.ts`.
- Add one exact source-key guard to `packages/bsdata/src/compiler.ts` for the audited Enhancement divide shape.
- Use the existing `catalogue-enhancement-cost-modifier.json` fixture through a targeted mutation; do not add upstream data.
- Record the EHS Run 5 protocol in the isolated target worktree.
- Record Run 5 governance, review, evidence, and operator notes in this EHS repository.

## forbidden scope

- Do not edit the user's active `40k-builder` or `rzut` checkouts.
- Do not change `packages/engine`, the IR, compiled-document/API schemas, persistence, state, or UI.
- Do not widen Enhancement resource semantics, add new operators, alter points calculation, or change qualification/publication behaviour.
- Do not add dependencies, commands, runtime orchestration, provider adapters, benchmark claims, or network acquisition.
- Do not rewrite the source fixture or accept any unverified upstream shape.
- Do not claim the whole catalogue is qualified; the existing publication gate remains fail-closed.

## affected areas

- `@aab/bsdata` compiler acceptance boundary and compiler regression tests.
- Existing ADR 0022 source-independent IR boundary.
- EHS Run 5 protocol and evidence records.

## minimum complete change

Add one exact-key allowlist for the audited Enhancement divide modifier, emit a blocking `unsupported-node` diagnostic naming the first unsupported key, and prove it with a failing-then-passing source-shaped compiler test. Preserve the existing operator, ownership, value, condition, ordering, validation, provenance, and fail-closed obligations; do not trade those away for a smaller diff.

## public contracts

The source compiler contract becomes stricter for one already-audited Enhancement divide shape: unsupported source metadata is no longer accepted. The emitted IR and all downstream runtime/API contracts remain unchanged. No new ADR is required because this conforms to accepted ADR 0022 and changes no architecture, module dependency, persistence, runtime, or deployment boundary.

## assumptions

- The audited direct Enhancement divide modifier's supported source keys are `id`, `type`, `operator`, `field`, `value`, `conditions`, `before`, and `after`; the fixture also uses `id` as source identity metadata.
- Unknown source metadata must block compilation rather than be silently dropped.
- A focused `@aab/bsdata` compiler test is sufficient to protect this ACL boundary; evaluator and document tests are unnecessary because the public IR shape does not change.
- The temporary worktree can install from the target lockfile without modifying the committed dependency contract.

## risks

- A future upstream modifier may add legitimate metadata to this family; the correct response is a source audit and an explicit contract update, not silent acceptance.
- The target repository has known legacy snapshot tests that require unavailable 10th-edition files; those are baseline limitations and are outside this slice.
- At contract creation the target change remained uncommitted pending separate approval; it was later committed as `cff8ea2` without widening the contract.

## acceptance evidence

- The source-shaped extra-key test fails before the compiler edit for the expected reason: the result is incorrectly `Compiled`.
- The same test passes after the exact-key guard and asserts a blocking diagnostic naming the unsupported metadata.
- The focused compiler and Enhancement resource engine tests pass.
- Touched-file Biome, target typecheck, and `git diff --check` pass where the target's current toolchain supports them.
- The EHS protocol run has fresh evidence for every criterion, validates at the final target fingerprint, completes, and produces a valid attestation/CI output.
- The operator record reports setup time, baseline limitations, friction, false blocks, workarounds, and remaining uncertainty.

## stop conditions

Stop and record a blocker if the exact source key set cannot be justified from the committed fixture/ADR, the red test does not fail for the intended reason, the guard requires an IR/API change, the target baseline requires unrelated fixes, the isolated worktree boundary is lost, or verification cannot distinguish this slice from pre-existing failures.
