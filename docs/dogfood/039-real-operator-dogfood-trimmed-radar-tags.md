# Real Operator Dogfood Run 7: trimmed radar tags

## purpose

Exercise EHS on a real external frontend behavior change after the Run 6 adapter boundary fix. This run stays within the standalone skill and local protocol boundary.

## change

- **Change type:** frontend filtering bug fix
- **Target:** temporary worktree `/private/tmp/ehs-run7-tech-radar`
- **Target repository:** `tech-radar-web`
- **Target branch:** `ehs/run7-trimmed-radar-tags`
- **Target baseline:** `a7c194a4867e6c933c8d17ba8f5d874e9109bb3d`
- **Run:** `.extremely-hardcore/runs/039-real-operator-dogfood-trimmed-radar-tags/`
- **Scope:** make trimmed available radar tags match source tags containing surrounding whitespace; add focused regression coverage.

The active `tech-radar-web` checkout was clean and remained untouched. Other active repositories, including the dirty `40k-builder` and `rzut` checkouts, also remained untouched.

## protocol path

1. Selected a clean external repository and created an isolated worktree from committed `HEAD`.
2. Installed the committed Bun dependency graph with `bun install --frozen-lockfile`.
3. Recorded the change contract, architecture assessment, domain map, and test-first plan before target edits. Decision challenge and bounded-context review were not applicable because the slice is local and does not cross an architecture, public-contract, persistence, integration, or execution boundary.
4. Added the normalized-option regression and confirmed the expected red failure: the visible `Cloud` option returned no blips for source tag `" Cloud "`.
5. Added one `trim()` call at the existing comparison point and kept all other search and filter behavior unchanged.
6. Captured five fresh protocol criteria, completed the run, and generated valid attestation and CI artefacts.

## operator friction

- The clean worktree required dependency installation; frozen Bun installation completed without lockfile churn.
- The repository-wide Vitest command failed in the same unrelated `BlipHistory.test.ts` Vanilla Extract setup path before and after the fix. This was recorded rather than bypassed.
- `bun run moon:check` could not run in the non-TTY operator environment because Moon required an explicit task identifier.
- App lint exited successfully but reported 337 existing CSS ordering/style warnings.
- No false completion block, source workaround, generated-code churn, or unrelated source edit occurred.
- The focused test suite completed in under one second; the Astro build completed in approximately 10 seconds.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 5/5 covered |
| Open blockers | 0 |
| Protocol validation | valid at final fingerprint |
| Focused search/filter tests | 15 pass, 0 fail |
| Astro check/build | pass; 0 errors, 12 hints |
| App lint | pass; 0 errors, 337 existing warnings |
| Diff check | pass |
| Deliberate red phase | 1 expected failure |
| Repository-wide test | 54 pass; 1 pre-existing Vanilla Extract suite failure |
| Target commit | `ffc985c` `fix(radar): match trimmed tags` |

## retained outputs

- Run artifacts: `/private/tmp/ehs-run7-tech-radar/.extremely-hardcore/runs/039-real-operator-dogfood-trimmed-radar-tags/`
- Attestation: `/tmp/extremely-hardcore-dogfood-039-attestation.json`
- CI artefacts: `/tmp/extremely-hardcore-dogfood-039-ci/`

## limitations

This is the seventh real operator change in the ten-run campaign, not release evidence. It does not establish browser visual QA, repository-wide test health, content-ingestion normalization, provider, benchmark, containment, sandbox, network-isolation, or skill-effect claims. Commit `ffc985c` remains isolated in its temporary worktree; it was not integrated into the active checkout.

## next

The two-file target diff was reviewed and committed as `ffc985c`. Keep it isolated, preserve the current local tag-identity boundary, then use another clean repository area for Run 8.
