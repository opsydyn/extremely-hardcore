# Real Operator Dogfood Run 10: Bun port validation

## purpose

Exercise EHS on a real external package change that closes malformed and
out-of-range environment port acceptance in a Bun custom-handler adapter.

## change

- **Change type:** public runtime configuration correctness bug fix
- **Risk lane:** Standard
- **Target:** temporary worktree `/private/tmp/ehs-run10-elysia`
- **Target repository:** `elysia-azurefunc-adapter`
- **Target branch:** `ehs/run10-port-validation`
- **Target baseline:** `51ce593`
- **Run:** `.extremely-hardcore/runs/042-real-operator-dogfood-port-validation/`
- **Scope:** accept only trimmed decimal environment ports in `1..65535`,
  preserve valid custom-handler precedence, and fall through to `PORT` or the
  existing fallback when a higher-priority candidate is invalid.

The active `elysia-azurefunc-adapter` checkout contains an unrelated untracked
`.DS_Store` and remained untouched. The EHS repository and unrelated active
repositories remain outside the target worktree.

## protocol path

1. Selected a fresh external package and created an isolated worktree from
   committed `main`.
2. Installed the frozen dependency graph with Bun and removed its generated
   untracked lockfile so the baseline remained unchanged.
3. Recorded the Run 10 contract, accepted ADR 042, `proceed` decision challenge,
   domain map, safe-with-risk boundary review, and test-first plan before target
   implementation.
4. Added the invalid-port regression and confirmed the expected red result
   against the baseline build.
5. Implemented static environment validation only, then ran focused and full
   checks.
6. Captured the initial EHS criteria and completed the pre-commit run.
7. Committed the approved target change as `4cbe2a9`; the pre-commit receipt
   became stale at the changed Git fingerprint, and EHS directed a fresh run.
8. Captured all ten criteria against the committed target, completed the
   post-commit revalidation run, and generated final and CI attestations.

## operator friction

- The first post-commit package-lint capture hit root-owned files in the host
  npm cache. Rerunning with `NPM_CONFIG_CACHE=/private/tmp/ehs-run10-npm-cache`
  passed without changing the target dependency graph.
- The stale pre-commit receipt was detected after the approved commit. The
  protocol required fresh post-commit evidence rather than reusing it.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 10/10 covered |
| Open blockers | 0 |
| Protocol validation | valid at final post-commit fingerprint |
| Invalid-port regression | 1 focused test pass; malformed and out-of-range values fall through |
| Full target tests | 83 pass, 0 fail |
| Typecheck/build/package checks | pass |
| Size check | 2.23 kB brotlied under the 5 kB limit |
| Deliberate red phase | 1 expected baseline failure |
| Target commit | `4cbe2a9` `fix: validate Bun custom-handler ports` |
| Final attestation | valid; 10/10 criteria, 0 blockers, 0 validation errors |

## retained outputs

- Pre-commit run artefacts: `/private/tmp/ehs-run10-elysia/.extremely-hardcore/runs/042-real-operator-dogfood-port-validation/`
- Post-commit run artefacts: `/private/tmp/ehs-run10-elysia/.extremely-hardcore/runs/042-real-operator-dogfood-port-validation-post-commit/`
- Attestation: `/tmp/extremely-hardcore-dogfood-042-post-commit-attestation.json`
- CI artefacts: `/tmp/extremely-hardcore-dogfood-042-post-commit-ci/`

## limitations

This is the tenth real operator change in the campaign, not release evidence.
It does not establish Azure deployment reachability, runtime startup behavior,
provider behavior, sandbox or network isolation, consumer migration, benchmark
claims, or a skill effect. It intentionally does not decide whether invalid
production configuration should throw.

## next

Review the aggregate ten-run friction, false-block, and evidence-quality
record. The target commit remains isolated and is not integrated into active
`main`.
