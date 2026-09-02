# Real Operator Dogfood Run 5: Enhancement resource metadata

## purpose

Exercise EHS on a real external repository change after the Run 4 commit boundary. The change is a narrow compiler hardening fix in `40k-builder`, not an EHS runtime or orchestration feature.

## change

- **Change type:** fail-closed source compiler bug fix
- **Target:** temporary worktree `/private/tmp/ehs-run5-40k`
- **Target branch:** `ehs/run5-enhancement-resource`
- **Target baseline:** `80ce5733f945c686a1617ee6b91b703948a55491`
- **Run:** `.extremely-hardcore/runs/037-real-operator-dogfood-enhancement-resource-metadata/`
- **Scope:** reject unrepresented source metadata on the audited `Enhancements` divide modifier; add one source-shaped regression.

The user's active `40k-builder` checkout contained unrelated uncommitted compiler, engine, and planning work. It remained untouched. Rzut's active checkout and untracked plans also remained untouched.

## protocol path

1. Created the target worktree from committed `HEAD` and installed dependencies.
2. Recorded the change contract, architecture assessment, decision challenge (`proceed`), domain map, and test-first plan before target edits.
3. Added the regression and confirmed the expected red failure: the compiler returned `Compiled` for an extra `metadata` key.
4. Added the exact-key guard. The first green attempt correctly surfaced that the fixture's legitimate modifier `id` key also needed to be allowlisted; the contract and implementation were corrected before final verification.
5. Captured five fresh protocol criteria, completed the run, and generated valid attestation and CI artefacts.

## operator friction

- The isolated worktree had no dependencies initially.
- `bun install --frozen-lockfile` stopped because Bun detected a lockfile mismatch. A non-frozen install completed, but rewrote `@typescript/native-preview` lock metadata; that generated change was removed and no lockfile change remains.
- The first compiler guard was too narrow because the existing fixture carries `id`; the red/green loop caught this without changing downstream code.
- Touched-file Biome took approximately 27.5 seconds. The focused tests and typecheck were sub-second to roughly one second.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 5/5 covered |
| Open blockers | 0 |
| Protocol validation | valid at final fingerprint |
| Target focused tests | 322 pass, 0 fail |
| Target typecheck | pass |
| Touched-file Biome | pass |
| Diff check | pass |
| Deliberate red phase | 1 expected failure |
| False blocks | 1 setup classifier mismatch, corrected by changing reversibility from `high` to `low`; 0 final blockers |
| Workarounds | 1 dependency-install recovery; no source or protocol bypass |
| Target commit | `cff8ea2` (`fix(bsdata): reject unsupported enhancement metadata`) |

## baseline limitations

A broader baseline selection had six unrelated failures because the temporary worktree lacks the legacy 10th-edition snapshot required by old tests. The current 11th-edition compiler/resource slice was verified independently; no legacy snapshot was fetched or restored.

## retained outputs

- Run artifacts: `/private/tmp/ehs-run5-40k/.extremely-hardcore/runs/037-real-operator-dogfood-enhancement-resource-metadata/`
- Attestation: `/tmp/extremely-hardcore-dogfood-037-attestation.json`
- CI artefacts: `/tmp/extremely-hardcore-dogfood-037-ci/`

## limitations

This is the fifth real operator change in the ten-run campaign, not release evidence. It does not establish catalogue qualification, provider, benchmark, token, cost, containment, sandbox, network-isolation, or skill-effect claims. The exact-key contract remains local-fixture-backed until a separate source audit.

## next

The target two-file diff was reviewed and committed as `cff8ea2`. Keep the next dogfood slice in another real repository area and preserve the current EHS standalone boundary.
