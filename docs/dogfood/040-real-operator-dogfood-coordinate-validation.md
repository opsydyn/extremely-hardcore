# Real Operator Dogfood Run 8: postcode coordinate validation

## purpose

Exercise EHS on a real external public API wrapper change after the Run 7 radar
filtering slice. This run stays within the standalone skill and local protocol
boundary.

## change

- **Change type:** public input validation bug fix
- **Target:** temporary worktree `/private/tmp/ehs-run8-postcodesio`
- **Target repository:** `postcodesio-effect-client`
- **Target branch:** `ehs/run8-validate-search-coordinates`
- **Target baseline:** `dbaf17e32c19e94acd63d2f1c9f7f5958ada5f7b`
- **Run:** `.extremely-hardcore/runs/040-real-operator-dogfood-coordinate-validation/`
- **Scope:** reject non-finite and out-of-range postcode search coordinates before
  transport; add public-boundary regression coverage.

The active `postcodesio-effect-client` checkout was clean and remained untouched.
Other active repositories also remained untouched.

## protocol path

1. Selected a clean external repository and created an isolated worktree from
   committed `main`.
2. Installed the committed Bun dependency graph with
   `bun install --frozen-lockfile`.
3. Recorded the change contract, accepted ADR 040, `proceed` decision challenge,
   domain map, and test-first plan before target edits. A bounded-context review
   was checked and was not applicable because the slice does not cross module,
   data, package, or integration boundaries.
4. Added the public no-request regression and confirmed the expected red failure:
   invalid coordinates reached a transport trap.
5. Added finite and range checks to the existing validator, then reshaped the
   implementation to satisfy the repository's Effect-specific lint rules.
6. Captured eight fresh protocol criteria, completed the run, and generated valid
   attestation and CI artefacts.

## operator friction

- The clean worktree required dependency installation; frozen Bun installation
  completed without lockfile churn.
- The first implementation shape failed four repository Effect lint rules. The
  failure was actionable and led to a local `Match`-based validation shape and a
  flat test pipeline, with no scope expansion.
- After evidence capture, the target's broad `bun run fmt:check` command included
  generated EHS JSON and failed. The source/test formatter command passed; the
  limitation was recorded rather than changing the target formatter config.
- The package lint command passed with one existing repository URL suggestion.
- No false completion block, generated-code churn, dependency change, or
  unrelated source edit occurred.
- The focused test suite completed in under one second; package checks and build
  completed in approximately two seconds.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 8/8 covered |
| Open blockers | 0 |
| Protocol validation | valid at final fingerprint |
| Coordinate regression | 3 invalid cases pass; 0 transport calls |
| Target test suite | 40 pass, 0 fail |
| Package check | pass; typecheck and tests |
| Package build | pass |
| Code lint | pass |
| Source/test formatting | pass |
| Packed-package lint | pass; 1 existing suggestion |
| Diff check | pass |
| Deliberate red phase | 1 expected failure |
| Full formatter after protocol capture | limitation; generated protocol JSON included |
| Target commit | `c5f0716` `fix(client): validate search coordinates` |

## retained outputs

- Run artefacts: `/private/tmp/ehs-run8-postcodesio/.extremely-hardcore/runs/040-real-operator-dogfood-coordinate-validation/`
- Attestation: `/tmp/extremely-hardcore-dogfood-040-attestation.json`
- CI artefacts: `/tmp/extremely-hardcore-dogfood-040-ci/`

## limitations

This is the eighth real operator change in the ten-run campaign, not release
evidence. It does not establish live postcodes.io compatibility, network
reliability, release readiness, consumer migration, complete query-domain
validation, provider, benchmark, containment, sandbox, or skill-effect claims.
Target commit `c5f0716` remains isolated in its temporary worktree and is not
integrated into the active checkout.

## next

The two-file target diff is reviewed and committed. Preserve the coordinate-only
validation boundary, then use another clean repository area for Run 9.
