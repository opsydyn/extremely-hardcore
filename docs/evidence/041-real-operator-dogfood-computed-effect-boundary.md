# evidence ledger: real operator dogfood computed Effect boundary

## work receipt

- result: complete
- claim: Run 9 completed a bounded `effect-oxlint` fix so literal computed Effect execution calls cannot bypass existing boundary diagnostics.
- evidence: The clean target baseline was `ac7dc2a`; the approved five-file change was committed as `444ad0e`. The red unit and CLI regressions failed for the expected missing diagnostic, the corrected regressions passed, and the full target suite passes with 406 tests. Typecheck, build, package lint, API-doc check, size, pack, diff, and all 11 post-commit protocol criteria pass. The final and CI attestations are valid with zero validation errors.
- remaining uncertainty: The shared predicate may expose additional diagnostics for literal computed calls consumed by other rules; the full checks remained stable apart from the intended computed execution diagnostic. The target commit remains isolated from the active user checkout. No live network or provider boundary was exercised.
- next: Use a fresh clean repository area for Run 10, preserve the static-only boundary, and review aggregate campaign friction after the ten-run set.

## summary

Run 9 is the ninth real operator dogfood change in the ten-run campaign. It
uses a clean isolated `effect-oxlint` worktree and targets a concrete syntax
false negative in the execution-boundary rules.

The target change is committed as `444ad0e` (`fix: recognize computed Effect
members`) on the isolated `ehs/run9-computed-effect-boundary` branch.

## changed files

Target worktree `/private/tmp/ehs-run9-oxlint`:

- `src/index.ts`
- `tests/plugin.test.ts`
- `tests/fixtures/oxlint/platform-boundary-shared.ts`
- `tests/fixtures/oxlint/server/platform-boundary-allowed.ts`
- `tests/oxlint.integration.test.ts`

EHS repository records:

- `docs/change-contracts/041-real-operator-dogfood-computed-effect-boundary.md`
- `docs/adr/041-real-operator-dogfood-computed-effect-boundary.md`
- `docs/decision-challenges/041-real-operator-dogfood-computed-effect-boundary.md`
- `docs/domain/041-real-operator-dogfood-computed-effect-boundary.md`
- `docs/implementation-plans/041-real-operator-dogfood-computed-effect-boundary.md`
- `issues/041-real-operator-dogfood-computed-effect-boundary.md`
- `docs/reviews/041-real-operator-dogfood-computed-effect-boundary.md`
- `docs/evidence/041-real-operator-dogfood-computed-effect-boundary.md`
- `docs/dogfood/041-real-operator-dogfood-computed-effect-boundary.md`

## commands run

- `bun install --frozen-lockfile` -> exit 0; 197 packages installed without
  lockfile churn.
- Baseline `bun run test` -> exit 0; 404 tests passed.
- Baseline `bun run typecheck` -> exit 0.
- Baseline `bun run build` -> exit 0; package build completed.
- Baseline `bun run lint` -> exit 0; publint reported no issues.
- Baseline `bun run docs:api:check` -> exit 0.
- Baseline `bun run size` -> exit 0; 25.62 kB brotlied under the 27 kB limit.
- Baseline `bun run pack:dry-run` -> exit 0; five package files included.
- Baseline `bun run lint:examples` -> exit 1 because intentional anti-pattern
  fixtures report their expected diagnostics; this is not a release gate.
- Focused unit regression before the fix -> exit 1 with zero computed-call
  reports, as expected.
- Focused CLI regression before the fix -> exit 1 with one hidden-execution
  report instead of two, as expected.
- Focused unit regression after the fix -> exit 0; literal computed execution
  reported and dynamic keys remained unclassified.
- Focused CLI regression after the fix -> exit 0; computed execution reported.
- Focused server-boundary CLI regression after the fix -> exit 0; computed
  execution remained allowed at the configured boundary.
- `bun run test` -> exit 0; 406 tests passed.
- `bun run typecheck` -> exit 0.
- `bun run build` -> exit 0; package build completed.
- `bun run lint` -> exit 0; publint reported no issues.
- `bun run docs:api:check` -> exit 0.
- `bun run size` -> exit 0; 25.68 kB brotlied under the 27 kB limit.
- `bun run pack:dry-run` -> exit 0; five package files included.
- `git diff --check` -> exit 0.
- Earlier pre-commit evidence capture covered all 11 criteria and remains in
  the run history as the pre-commit receipt.
- Post-commit Run 9 evidence capture -> 11 current criteria exited 0:
  `7030dbca-f782-44dd-bb3e-01bdf279b986`,
  `b4172d07-32ab-45a0-9fa2-ae2c1c79e8fc`,
  `5d2571ff-c12c-4b2e-9041-331b2b88f75f`,
  `99c69d1d-5038-4614-a684-41543f7704f4`,
  `7a12034a-490a-4d4a-a0a8-1fa513fdb063`,
  `d7cb192a-f01e-44cb-b46f-3dda32d68333`,
  `c163b247-71b0-4b26-b37b-5255dc751a88`,
  `becdd712-c511-47e4-9e46-8989bdc064c0`,
  `00bd4608-77ca-4d4e-a58d-32ce4dc5611b`,
  `f7ab5406-0de4-4b38-a835-616a6ecc87f8`, and
  `33c74ecb-5915-4715-bd73-90285dfdd99c`.
- `bun ... eh transition <run> complete` -> exit 0; transition id
  `2eef46d6-2466-426d-aaad-8433e6a8d635`.
- Final `bun ... eh validate <run>` and `bun ... eh attest <run>` -> exit 0;
  the completion gate and attestation are valid with 11/11 criteria, zero
  blockers, zero validation errors, and workspace fingerprint
  `5491986a7d182aa89f7c89b3e5af397bb85e8f7ccbd8649f7baf8ea6287c932a`.
- `bun ... eh ci <run> /tmp/extremely-hardcore-dogfood-041-ci` -> exit 0;
  the CI attestation is valid with the same workspace fingerprint and zero
  validation errors.
- Direct Oxlint fixture inspection -> exactly one additional
  `no-hidden-effect-execution` diagnostic for the computed call.

## passing checks

- The target baseline is clean and dependency installation is reproducible.
- The red/green unit and CLI regressions prove the intended static-only
  recognition boundary.
- The complete target test, type, build, package, documentation, size, pack,
  and diff checks pass after the change.
- The post-commit EHS receipt covers all 11 criteria with no blockers, and the
  final and CI attestations agree on the workspace fingerprint.

## failing checks

- The example lint command exits non-zero by design because it lints invalid
  teaching fixtures.

## architecture impact

The change is a public lint-behaviour correction inside the existing plugin
analysis boundary. It does not add dependencies, modules, persistence,
runtime execution, or integration flows.

## public contract impact

Exported rule names and configuration shapes remain unchanged. Literal computed
Effect execution calls will receive existing diagnostics outside configured
boundaries; dynamic computed keys remain outside the syntax-only claim.

## risks left open

- Shared helper fan-out may alter diagnostics for other literal computed Effect
  calls; the full package and fixture output remained stable apart from the
  intended computed execution diagnostic.
- The example lint command remains intentionally non-zero.
- The target commit `444ad0e` remains isolated from the active user checkout;
  the active checkout was not modified.
- No live provider, network, sandbox, release, or consumer migration evidence
  will be collected in this run.

## human review needed

No further decision is required for this bounded slice. The scoped five-file
target diff was reviewed and committed as `444ad0e`; no broader plugin audit or
integration is claimed.

## final recommendation

complete with noted risk
