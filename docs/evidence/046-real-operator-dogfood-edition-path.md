# evidence ledger: real operator dogfood edition snapshot path

## work receipt

- result: complete with noted risk
- claim: Run 12 completed a bounded `tech-radar-web` repair so the Flue edition writer uses the live monthly snapshot layout and refuses same-month overwrite; the approved target change is committed as isolated `e831613`.
- evidence: The baseline focused test failed on the retired `content/edition` path; the corrected focused tests pass 4/4, the package gate passes 9/9, typecheck passes, Astro check/build passes with 99 pages, the stale-path and commit-integrity checks pass, and the post-commit EHS run is valid at one final fingerprint with 7/7 criteria and 0 blockers.
- remaining uncertainty: The target-wide Vitest command has an unrelated Vanilla Extract setup failure after 57 passing tests, and `moon check --all` has existing missing-tool and formatting-task failures. No Flue provider execution, network, full blip snapshot, or publication was performed.
- next: Human-review the isolated target commit and track the unrelated target test/toolchain repair separately.

## summary

This ledger records the twelfth targeted real-operator dogfood run. It applies
the `simple-made-easy` lens to a concrete stale-path defect in the external
`tech-radar-web` Flue edition writer.

The selected implementation was committed as `e831613` on the isolated target
branch and reuses the current
`apps/astro/src/content/editions/<YYYY-MM>/index.{md,mdx}` convention. It does
not add a compatibility loader, shared path module, content migration, blip
generator, provider call, or workflow change.

## changed files

Target worktree `/private/tmp/ehs-run12-tech-radar`:

- `tooling/tech-radar-edition-agent/src/editionDraft.ts`
- `tooling/tech-radar-edition-agent/src/generateEditionFile.ts`
- `tooling/tech-radar-edition-agent/src/editionDraft.test.ts`
- `tooling/tech-radar-edition-agent/package.json`
- `tooling/tech-radar-edition-agent/.agents/skills/compose-edition/SKILL.md`
- `docs/flue/how-to-run-the-edition-agent.md`
- `docs/flue/reference.md`

EHS repository records:

- `docs/change-contracts/046-real-operator-dogfood-edition-path.md`
- `docs/decision-challenges/046-real-operator-dogfood-edition-path.md`
- `docs/domain/046-real-operator-dogfood-edition-path.md`
- `docs/adr/046-real-operator-dogfood-edition-path.md`
- `docs/implementation-plans/046-real-operator-dogfood-edition-path.md`
- `docs/reviews/046-real-operator-dogfood-edition-path.md`
- `issues/046-real-operator-dogfood-edition-path.md`
- `docs/dogfood/046-real-operator-dogfood-edition-path.md`
- this evidence ledger

## commands run

- `bun install --frozen-lockfile` in the isolated target -> exit 0; 2744
  packages installed without dependency or lockfile changes.
- Baseline `bunx vitest run src/editionDraft.test.ts` -> exit 1 with the
  expected `ENOENT` for the retired `apps/astro/src/content/edition` path.
- Focused `bunx vitest run src/editionDraft.test.ts` after implementation ->
  exit 0; 4 tests passed.
- Target package `bun run test` -> exit 0; 9 tests passed across 2 files.
- Target package `bun run typecheck` -> exit 0.
- `bun run --cwd apps/astro build` -> exit 0; Astro reported 0 errors, 0
  warnings, 12 hints, and built 99 pages. Existing deprecated Markdown
  configuration and empty legacy `blip` collection warnings remain.
- Root `bun run test` -> exit 1; 57 tests passed, while
  `apps/astro/src/components/BlipHistory.test.ts` failed during Vanilla Extract
  style setup before running tests.
- Root `bun run moon:check` -> exit 1 because the non-interactive invocation
  requires explicit project ids.
- `bunx moon check --all` -> exit 1 on existing missing `tsc`/`prettier`
  binaries, a `tsconfig` format CLI incompatibility, and three existing shared
  tsconfig formatting errors; the edition-agent typecheck and Astro tasks
  passed within that run.
- Targeted static path audit -> exit 0; no exact retired writer path remains
  in the affected generator or Flue authoring docs.
- `git diff --check` plus isolated branch/worktree assertion -> exit 0.
- EHS pre-commit evidence capture for seven criteria -> all seven commands
  exited 0; the initial run completed with a valid 7/7 attestation.
- `git commit` with the normal target hook -> the first attempt could not
  resolve `moon`; rerunning with the existing bundled Moon binary on `PATH`
  passed the hook and created `e831613`.
- The pre-commit evidence became stale at the changed Git fingerprint, as
  expected. A separate post-commit run captured seven criteria -> all seven
  commands exited 0; the initial commit-integrity command had a full-versus-
  short-hash harness error and was refreshed successfully.
- EHS post-commit evidence ids were `ddf13bb3-269d-4f48-96ca-6da64bdc9bbc`,
  `40a890e8-6606-4270-b1e2-10bd952a64c5`,
  `c3843f05-dc50-4521-8cdb-c51a0c1e87e2`,
  `a70902b1-1b4a-4447-a6a4-b7ea68782f54`,
  `47522e5d-e97d-42d7-ac8e-32749ab15830`,
  `a1a4fd53-2983-4e94-a7a0-a3022c1347f5`, and
  `c931c757-3477-4f8c-9bac-16a51aadc321`.
- EHS post-commit `validate`, guarded `transition ... complete`, `summary`,
  `attest`, and `ci` -> exit 0; 7/7 criteria, 0 blockers, valid attestation
  and CI projection at fingerprint
  `776de6eefea40f0a768f7e1537f2fcb2dabd9755bbbb250d66f35e82fb61a7a3`.

## passing checks

- The red/green regression proves the writer no longer depends on the absent
  retired collection and that the monthly path/frontmatter/collision contract
  is covered.
- The normal edition-agent package test script now includes both relationship
  and edition-draft tests.
- Typecheck, Astro check/build, targeted static audit, diff check, and the
  protocol completion gate pass.
- The active target checkout remained clean and the target change was committed
  as `e831613` on an isolated branch.

## failing checks

- The target-wide Vitest command is non-zero because `BlipHistory.test.ts`
  cannot assign Vanilla Extract styles in the current test setup. This is
  unrelated to the edition-agent change and was not converted into a passing
  acceptance criterion.
- `bun run moon:check` needs explicit ids in this non-TTY context.
- `bunx moon check --all` reaches the changed package and Astro checks but also
  fails existing repository-wide toolchain and formatting tasks.
- The first commit attempt could not resolve the bundled Moon binary by name;
  the normal hook passed when that existing binary was placed on `PATH`.
- The first post-commit integrity capture used an abbreviated-hash comparison
  against a full hash; the criterion was refreshed successfully. The failed
  capture is retained as a harness error.

## architecture impact

The target change stays inside the existing Flue edition generation boundary.
It changes deterministic filesystem discovery, generated path construction,
and collision behavior. It adds no dependency, module boundary, persistence,
provider, network, workflow, deployment, or runtime orchestration behavior.

## public contract impact

The persisted `fileName` and `filePath` now identify
`<YYYY-MM>/index.mdx` beneath the live edition snapshot root. The result
envelope, narrative fields, provenance fields, execution target, and workflow
field names remain unchanged. Existing `index.md` snapshots remain readable.

## risks left open

- A generated edition index without blip snapshots is path-reachable but not a
  complete publishable edition.
- A second edition in the same month is rejected; supporting multiple monthly
  drafts would need an explicit product decision.
- The target repository's broad test/toolchain gates are not fully green.
- No provider, network, publishing, GitHub Actions, or consumer migration
  evidence was collected.
- The target commit remains isolated from active `main`.

## human review needed

Yes. Review the isolated target commit and whether monthly identity should
remain the collision policy. Review the unrelated target-wide test/toolchain
failures before calling the target repository fully green. The target commit
was made only on the isolated branch; it was not integrated into active `main`.

## final recommendation

needs review
