# Real Operator Dogfood Run 9: computed Effect boundary

## purpose

Exercise EHS on a real external package change that closes a literal computed
member bypass in the `effect-oxlint` execution-boundary rules.

## change

- **Change type:** public lint-rule correctness bug fix
- **Risk lane:** Standard
- **Target:** temporary worktree `/private/tmp/ehs-run9-oxlint`
- **Target repository:** `effect-oxlint`
- **Target branch:** `ehs/run9-computed-effect-boundary`
- **Target baseline:** `ac7dc2a`
- **Run:** `.extremely-hardcore/runs/041-real-operator-dogfood-computed-effect-boundary/`
- **Scope:** recognize `Effect["runPromise"](...)` and equivalent literal static
  members through the existing predicate; keep dynamic keys unclassified.

The active `effect-oxlint` checkout was clean and remained untouched. The EHS
repository and unrelated active repositories remain outside the target worktree.

## protocol path

1. Selected a clean external package and created an isolated worktree from
   committed `main`.
2. Installed the frozen Bun dependency graph and recorded baseline checks.
3. Recorded the Run 9 contract, accepted ADR 041, `proceed` decision challenge,
   domain map, safe-with-risk boundary review, and test-first plan before target
   implementation.
4. Added the computed-call regressions and confirmed the expected red result before
   changing the shared recognizer.
5. Implemented static literal recognition only, then ran focused and full
   checks.
6. Captured 11 pre-commit EHS criteria, validated the receipt, and reviewed the
   target diagnostic diff.
7. Committed the approved target change as `444ad0e`, recaptured all 11
   criteria against the committed workspace, transitioned the run to
   `complete`, and generated valid final and CI attestations.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 11/11 covered |
| Open blockers | 0 |
| Protocol validation | valid final receipt |
| Computed execution regression | unit and CLI pass; dynamic key remains unclassified |
| Full target tests | 406 pass, 0 fail |
| Typecheck/build/package checks | pass |
| Deliberate red phase | 2 expected focused failures |
| Target commit | `444ad0e` `fix: recognize computed Effect members` |
| Final attestation | valid, 11/11 criteria, 0 blockers, 0 validation errors |

## retained outputs

- Run artefacts: `/private/tmp/ehs-run9-oxlint/.extremely-hardcore/runs/041-real-operator-dogfood-computed-effect-boundary/`
- Attestation: `/tmp/extremely-hardcore-dogfood-041-attestation.json`
- CI artefacts: `/tmp/extremely-hardcore-dogfood-041-ci/`

## limitations

This is the ninth real operator change in the ten-run campaign, not release
evidence. It does not establish provider behaviour, runtime enforcement,
sandbox or network isolation, consumer migration, benchmark claims, or a skill
effect. The target has no live network requirement.

## next

Use a fresh clean repository area for Run 10, then review aggregate friction and
false-block evidence across the ten-run campaign. The target commit remains
isolated and is not presented as integrated into active `main`.
