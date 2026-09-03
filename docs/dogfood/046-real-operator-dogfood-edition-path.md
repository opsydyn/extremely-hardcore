# Real Operator Dogfood Run 12: Simple Made Easy edition snapshot path

## purpose

Exercise the optional `simple-made-easy` lens on a real external repository
change. The run tests whether EHS can reuse an existing content convention and
remove stale machinery without turning a path repair into a migration or
runtime redesign.

## change

- **Change type:** filesystem and public content-path correctness fix
- **Risk lane:** Standard
- **Target:** temporary worktree `/private/tmp/ehs-run12-tech-radar`
- **Target repository:** `tech-radar-web`
- **Target branch:** `ehs/run12-simple-made-easy`
- **Target baseline:** `a7c194a`
- **Run:** `.extremely-hardcore/runs/046-real-operator-dogfood-edition-path/`
- **Scope:** make the Flue edition writer discover and write the current
  `apps/astro/src/content/editions/<YYYY-MM>/index.mdx` layout, preserve the
  existing sequential edition number and result/provenance envelope, and
  refuse same-month collisions.

The active `/Users/alancurrie/Projects/tech-radar-web` checkout remained clean
and untouched. The target branch remains isolated from active `main`.

## simplicity decision

| Candidate | Decision | Reason |
| --- | --- | --- |
| Keep the retired `content/edition` path | Rejected | The current checkout has no live collection there. |
| Change only the root to `content/editions` | Rejected | A flat generated file would still not match the current `*/index` collection. |
| Re-enable a compatibility collection | Rejected | Adds a second content model for a stale writer contract. |
| Generate a complete copied-forward blip snapshot | Deferred | A larger content migration is not required to repair edition path reachability. |
| Use the existing monthly snapshot layout with a collision guard | Selected | Reuses target conventions and preserves a deterministic no-overwrite boundary. |

## protocol path

1. Inspected the target content config, existing snapshots, writer, prompt, and
   workflow before editing.
2. Recorded the EHS change contract, decision challenge, domain map, ADR,
   implementation plan, and boundary review.
3. Added the focused edition-draft regression and confirmed the baseline red
   result: the old implementation attempted to read the absent retired
   `apps/astro/src/content/edition` directory.
4. Changed discovery and writing to the existing snapshot layout, added the
   monthly collision guard, updated the package test script, and corrected the
   affected Flue path documentation.
5. Ran focused/package checks, Astro check/build, root tests, and the root Moon
   check. The unrelated broad failures are retained below rather than hidden.
6. Captured seven fresh EHS criteria at one pre-commit target fingerprint,
   completed the guarded transition, and generated valid standalone and CI
   attestations.
7. Committed the approved target change as `e831613`; the prior receipt became
   stale as required, so a separate post-commit run captured all seven current
   criteria and generated fresh valid attestations.

## operator friction

- The first normal commit attempt could not resolve the target's bundled Moon
  binary by name. Rerunning the same hook with its existing bundled binary on
  `PATH` succeeded; no hook bypass was used.
- The post-commit integrity capture initially compared the full Git hash with
  its abbreviated form. That command was refreshed and passed; the failed
  capture remains retained as a harness error rather than a code finding.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 7/7 covered in both pre-commit and post-commit runs |
| Open blockers | 0 |
| Protocol validation | valid at final post-commit target fingerprint |
| Focused edition tests | 4 pass, 0 fail |
| Edition-agent package tests | 9 pass, 0 fail across 2 files |
| Edition-agent typecheck | pass |
| Astro check/build | pass; 0 errors, 0 warnings, 12 existing hints; 99 pages built |
| Target root Vitest | 57 tests pass; 1 unrelated suite fails during Vanilla Extract setup |
| Root Moon check | fails on existing missing `tsc`/`prettier`, CLI, and tsconfig-format gates |
| Deliberate red phase | 1 expected stale-path failure |
| Target commit | `e831613` `fix: align Flue edition snapshot paths`, isolated branch |
| Final attestation | valid post-commit; 7/7 criteria, 0 blockers |

## retained outputs

- Pre-commit run artefacts: `/private/tmp/ehs-run12-tech-radar/.extremely-hardcore/runs/046-real-operator-dogfood-edition-path/`
- Post-commit run artefacts: `/private/tmp/ehs-run12-tech-radar/.extremely-hardcore/runs/046-real-operator-dogfood-edition-path-post-commit/`
- Post-commit attestation: `/tmp/extremely-hardcore-dogfood-046-post-commit-attestation.json`
- Post-commit CI artefacts: `/tmp/extremely-hardcore-dogfood-046-post-commit-ci/`

## limitations

This run proves deterministic path reachability and collision handling only. It
does not call Flue or an AI provider, use the network, generate blip snapshots,
prove a complete published edition, exercise GitHub Actions, or establish
provider adherence. The target-wide Vitest failure is an existing test setup
problem in `BlipHistory`/Vanilla Extract, and the root Moon failures are
repository/toolchain friction outside this slice. Neither was silently
reclassified as a passing quality gate.

## next

Human-review the isolated target diff and the monthly collision policy. The
target commit is ready for that review but remains outside active `main`. Open
a follow-up for the target-wide test/toolchain failures before treating the
repository as fully green.
