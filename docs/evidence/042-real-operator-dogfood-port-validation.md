# evidence ledger: real operator dogfood Bun port validation

## work receipt

- result: complete
- claim: Run 10 completed a bounded `elysia-azurefunc-adapter` fix so malformed environment port values cannot reach the Bun custom-handler server boundary.
- evidence: The clean target baseline was `51ce593`; the approved two-file target fix was committed as `4cbe2a9`. The initial completed receipt correctly became stale after that commit, and the fresh post-commit revalidation run captured all ten current criteria, 83 passing tests, passing typecheck/build/package/API-doc/size/pack/diff checks, a valid completion transition `3fdbd181-c766-4859-9c2e-ad424cc7b9d1`, and valid standalone and CI attestations at fingerprint `8fe1c768e20ebd0e43c3dc75e6795cfae709840006c3a4d82d207dcf50fbf752`.
- remaining uncertainty: The first-valid fallback policy is a local compatibility decision and does not prove Azure deployment reachability or whether production should fail fast on invalid configuration. The target commit remains isolated from the active checkout, and no live Azure or network boundary was exercised.
- next: Review the aggregate ten-run friction, false-block, and evidence-quality record, then hand off the isolated target commit.

## summary

Run 10 is the final real operator dogfood change in the ten-run campaign. It
uses a clean isolated `elysia-azurefunc-adapter` worktree and targets a concrete
configuration parsing false positive in the Bun custom-handler path.

## changed files

Target worktree `/private/tmp/ehs-run10-elysia`:

- `src/bun.ts`
- `test/bun.test.ts`

EHS repository records:

- `docs/change-contracts/042-real-operator-dogfood-port-validation.md`
- `docs/adr/042-real-operator-dogfood-port-validation.md`
- `docs/decision-challenges/042-real-operator-dogfood-port-validation.md`
- `docs/domain/042-real-operator-dogfood-port-validation.md`
- `docs/implementation-plans/042-real-operator-dogfood-port-validation.md`
- `issues/042-real-operator-dogfood-port-validation.md`
- `docs/reviews/042-real-operator-dogfood-port-validation.md`
- `docs/evidence/042-real-operator-dogfood-port-validation.md`
- `docs/dogfood/042-real-operator-dogfood-port-validation.md`

## commands run

- `bun install --frozen-lockfile` -> exit 0; 279 packages installed. Bun
  generated an untracked lockfile, which was removed without changing the
  target baseline.
- Baseline `bun run test` -> exit 0; 82 tests passed.
- Baseline `bun run typecheck` -> exit 0.
- Baseline `bun run build` -> exit 0.
- Baseline `bun run lint:all` -> exit 0; publint reported one repository URL
  suggestion, with no package errors.
- Baseline `bun run docs:api:check` -> exit 0.
- Baseline `bun run size` -> exit 0; 2.23 kB brotlied under the 5 kB limit.
- Baseline `bun run pack:dry-run` -> exit 0; 24 package files included.
- Direct baseline port probe with `FUNCTIONS_CUSTOMHANDLER_PORT=7071junk` ->
  output `7071`, confirming prefix acceptance.
- Deliberate red regression against the baseline -> 1 expected failure because
  the old parser accepted a numeric prefix.
- Post-commit focused invalid-port regression -> exit 0; 1 test passed and 0
  failed.
- Post-commit `bun run test` -> exit 0; 83 tests passed and 0 failed.
- Post-commit `bun run typecheck`, `bun run build`, and `bun run docs:api:check`
  -> exit 0.
- Post-commit `bun run lint:all` first hit the host npm cache permission error;
  the same gate passed with the isolated `NPM_CONFIG_CACHE` path. The existing
  repository URL suggestion remained non-blocking.
- Post-commit `bun run size` -> exit 0; 2.23 kB brotlied under the 5 kB limit.
- Post-commit `bun run pack:dry-run` with the isolated npm cache -> exit 0; 24
  package files included.
- Post-commit `git diff --check` -> exit 0.
- `bun run eh transition ... complete` -> exit 0; the post-commit run
  transitioned from `implemented` to `complete`.
- `bun run eh attest ...` and `bun run eh ci ...` -> exit 0; both post-commit
  attestations are valid at workspace fingerprint
  `8fe1c768e20ebd0e43c3dc75e6795cfae709840006c3a4d82d207dcf50fbf752`.

## passing checks

- The invalid-port regression rejects malformed and out-of-range environment
  values, preserves valid custom-handler precedence, and falls through to a
  valid `PORT` or the existing fallback.
- The full target suite passes with 83 tests and no failures.
- Typecheck, build, package lint, API documentation, size, pack, and diff
  checks pass.
- The post-commit protocol run covers all ten criteria with no blockers and
  valid standalone and CI attestations.

## failing checks

The deliberate red regression failed as expected against the baseline because
the old parser accepted a numeric prefix. The first post-commit package-lint
capture also failed because of the host npm cache permissions; its isolated
cache rerun passed, and no final quality gate failed.

## architecture impact

The change stays inside the existing Bun adapter configuration boundary. It adds
no dependencies, modules, persistence, deployment behavior, or integration
flows.

## public contract impact

The exported `getAzureCustomHandlerPort` function keeps its signature. Invalid
environment strings will no longer be interpreted as valid numeric prefixes;
valid values, fallback behavior, and explicit config ports remain unchanged.

## risks left open

- First-valid fallback may hide an invalid Azure-specific environment variable.
- The package's npm lockfile/toolchain remains unchanged; Bun is used to run the
  checks but its generated lockfile is not part of the target patch.
- No live Azure, network, sandbox, provider, release, or consumer migration
  evidence will be collected.

## human review needed

The fallback choice and exact two-file target diff were reviewed and committed
as `4cbe2a9`. The broader question of fail-fast deployment diagnostics remains
separate.

## final recommendation

complete with noted risk
