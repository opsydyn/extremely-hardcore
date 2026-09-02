# Real Operator Dogfood Run 6: function name boundary

## purpose

Exercise EHS on a real external repository security-boundary change after the Run 5 compiler hardening slice. This run stays within the standalone skill and local protocol boundary.

## change

- **Change type:** public option and filesystem-boundary bug fix
- **Target:** temporary worktree `/private/tmp/ehs-run6-astro`
- **Target repository:** `astro-azure-integration`
- **Target branch:** `ehs/run6-function-name-boundary`
- **Target baseline:** `8685a58485c64b35d9a12c0db0539bd3982b7983`
- **Run:** `.extremely-hardcore/runs/038-real-operator-dogfood-function-name-boundary/`
- **Scope:** reject unsafe `functionName` values before generated Azure Functions output is written; add regression coverage and package documentation.

The active `astro-azure-integration` checkout was clean and remained untouched. Other active repositories, including the dirty `40k-builder` and `rzut` checkouts, also remained untouched.

## protocol path

1. Selected a clean external repository and created an isolated worktree from committed `HEAD`.
2. Installed the committed Bun dependency graph with `bun install --frozen-lockfile`.
3. Recorded the change contract, accepted ADR 038, decision challenge (`proceed`), domain map, bounded-context review, and test-first plan before target edits.
4. Added the table-driven regression and confirmed the expected red failure: unsafe names were accepted or produced raw filesystem errors.
5. Added the pre-write validator, strengthened the test to prove `dist/api` is absent, and documented the single-segment contract.
6. Captured five fresh protocol criteria, completed the run, and generated valid attestation and CI artefacts.

## operator friction

- The clean worktree required dependency installation; frozen Bun installation completed without lockfile churn.
- The initial regression exposed three observable pre-fix behaviors, including raw filesystem errors for dot segments and NUL. The final guard normalized these into one actionable boundary error.
- No false blocks, source workarounds, generated-code churn, or unrelated failures occurred.
- Target `bun run check` completed in approximately 12 seconds; package lint completed in approximately 2 seconds.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 5/5 covered |
| Open blockers | 0 |
| Protocol validation | valid at final fingerprint |
| Unsafe-name regression | 7 pass, 0 fail |
| Generator test file | 20 pass, 0 fail |
| Root check | build, typecheck, 46 tests, example check/build pass |
| Package release lint | publint and attw pass |
| Diff check | pass |
| Deliberate red phase | 1 expected failure |
| False blocks | 0 |
| Target commit | `560a5d0 fix(adapter): reject unsafe function names` |

## retained outputs

- Run artifacts: `/private/tmp/ehs-run6-astro/.extremely-hardcore/runs/038-real-operator-dogfood-function-name-boundary/`
- Attestation: `/tmp/extremely-hardcore-dogfood-038-attestation.json`
- CI artefacts: `/tmp/extremely-hardcore-dogfood-038-ci/`

## limitations

This is the sixth real operator change in the ten-run campaign, not release evidence. It does not establish Azure deployment compatibility, complete platform naming rules, containment, sandbox, network isolation, provider, benchmark, qualification, or skill-effect claims. The target commit remains isolated in its temporary worktree.

## next

The three-file target diff was reviewed and committed as `560a5d0`. Keep Run 7 in another clean real repository area and preserve the current EHS standalone boundary.
