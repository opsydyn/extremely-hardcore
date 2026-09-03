# change contract: real operator dogfood edition snapshot path

## user intent

Run an external dogfood of `simple-made-easy` against `tech-radar-web`. Repair
the Flue edition writer so a generated edition draft is read from and written
to the repository's current edition-snapshot collection, without turning this
run into a full content migration or an AI execution experiment.

## current understanding

The target is `tech-radar-web` at committed `main` `a7c194a`. Its Astro content
config loads edition metadata from
`apps/astro/src/content/editions/*/index.{md,mdx}` and edition blips from the
same directory's `*/blips/*.{md,mdx}` files. The checked-in snapshots are
`2025-09` and `2026-05`.

The Flue edition generator in
`tooling/tech-radar-edition-agent/src/editionDraft.ts` still reads
`apps/astro/src/content/edition` and emits a flat filename. The current clean
checkout has no live collection at that path. Even if a legacy directory were
created, the Astro collection would not load a flat generated file from it.
`generateEditionFile.ts` writes the returned filename directly and the
workflow already consumes its persisted `filePath` output.

## allowed scope

- Work only in an isolated target worktree derived from target `main`.
- Update edition draft discovery and output-path handling to use
  `apps/astro/src/content/editions/<edition-id>/index.mdx`.
- Derive the edition id from the generated ISO date as `YYYY-MM`, preserve the
  existing sequential edition number, and use the edition id in frontmatter.
- Refuse to generate over an existing edition id.
- Add focused tests for current-layout discovery, path metadata, frontmatter,
  and the collision guard.
- Include the new focused test in the target package's existing test script so
  the normal package gate executes it.
- Update the affected Flue prompt and docs so the path contract is explicit.
- Record this EHS contract, challenge, domain map, ADR, boundary review, plan,
  dogfood result, and evidence in this repository.

## forbidden scope

- Do not edit the active `/Users/alancurrie/Projects/tech-radar-web` checkout.
- Do not call an AI provider, use network access, or run GitHub Actions.
- Do not add dependencies, change Flue's execution target, or alter model,
  provenance, session, role, or narrative contracts.
- Do not generate or migrate edition blip snapshots, canonical blips, or
  historical content in this slice.
- Do not re-enable the retired `content/edition` Astro collection.
- Do not change workflow permissions, deployment, published routes, or the
  active target `main` branch.
- Do not import EHS code into the target package.

## affected areas

- Flue edition context discovery and deterministic metadata.
- Generated edition file path and parent-directory creation.
- Edition narrative prompt context and authoring documentation.
- Target package tests, typecheck, Astro check/build, and diff evidence.

## minimum complete change

Enumerate existing edition snapshot directories, read their `index.mdx` or
`index.md` metadata, derive a new `YYYY-MM` id from the run date, return a
relative `YYYY-MM/index.mdx` filename, write the generated document beneath
the current snapshot root, and reject an already-existing id before any write.
Keep frontmatter deterministic, preserve the existing result and provenance
fields, and leave blip snapshot generation for a separate change.

## public contracts

The generator's persisted `filePath` and `fileName` now identify a file inside
the live snapshot collection rather than the retired flat directory. The
Flue result envelope, narrative fields, provenance fields, execution target,
and workflow input/output names remain unchanged.

## simplicity check

- **outcome:** make the existing edition draft generator produce a reviewable
  file that the current Astro collection can load.
- **options checked:** keep the retired path; change only the root directory;
  re-enable a compatibility collection; or align discovery/writing with the
  existing `YYYY-MM/index.mdx` convention.
- **selected path:** reuse the current snapshot layout, derive one id/path
  policy, and add a local collision guard.
- **entanglement avoided:** no second content model, compatibility loader,
  runtime import, workflow-specific path, or AI/session change.
- **safeguards preserved:** deterministic metadata, schema validation,
  provenance capture, no-overwrite behavior, focused tests, typecheck, build,
  and reviewable diff.
- **omitted scope:** blip snapshot creation, content migration, deployment,
  provider execution, and centralized path refactoring.
- **remaining uncertainty:** whether future editions should use a full date id
  or allow multiple editions in one month remains a product decision; this
  slice preserves the repository's current monthly id convention and refuses
  collisions.

## assumptions

- The existing `YYYY-MM` directory convention is the target's current public
  content identity.
- A same-month generation is safer as an explicit refusal than a silent
  overwrite or an invented second directory convention.
- `index.mdx` is the generated extension; existing `index.md` remains readable
  for discovery.
- The workflow's dynamic `filePath` output is sufficient after the writer is
  corrected.

## risks

- The writer can create an edition index without any blip snapshots, so this
  slice fixes path reachability but does not make a complete published edition.
- A collision refusal may require an explicit future edition-id policy for
  multiple drafts in one month.
- The target repository's broad `CLAUDE.md` is older than parts of its current
  static snapshot architecture; current source and content config are the
  authority for this slice.

## acceptance evidence

- A focused baseline test fails because the current writer does not discover a
  current-layout edition root.
- Focused tests pass for discovery, generated path/frontmatter, and collision
  refusal.
- The target package test and typecheck gates pass; the target root test suite
  is attempted and any unrelated suite-setup failure is recorded separately.
- Astro check/build pass, and no retired writer path remains in the affected
  generator or its authoring docs.
- The EHS protocol run captures fresh evidence for every criterion, validates
  at the final target fingerprint, and produces a valid attestation and CI
  projection.
- The dogfood record separates observed path alignment from any claim that the
  full AI or publishing workflow has been proven.

## stop conditions

Stop and record a blocker if the target layout cannot support a generated index,
the first failing test does not expose the stale-path defect, a same-month run
would overwrite content, the change needs a dependency or provider call, the
workflow requires a new contract, or the isolated worktree boundary is lost.
