# adr: align the Flue edition writer with snapshot content

## status

accepted

## context

The Astro application now loads edition metadata from
`apps/astro/src/content/editions/*/index.{md,mdx}`. The Flue edition writer
still reads `apps/astro/src/content/edition` and emits a flat generated file.
That path is retired and is not consumed by the current collection loader.

The writer needs a deterministic path policy that can be tested without
running an AI provider. The repository already uses `YYYY-MM` directories for
edition snapshots and its workflow already receives a persisted `filePath`.

## decision

Align the writer with the existing snapshot convention. Discover existing
edition indexes below `apps/astro/src/content/editions`, derive the new id as
the run date's UTC `YYYY-MM`, use `<YYYY-MM>/index.mdx` as the generated filename
relative to that root, set frontmatter `id` to the same value, and refuse an
existing id before writing.

Keep the sequential edition number, title, date, narrative schema, provenance,
Flue session, provider, and workflow result envelope unchanged. Do not add
blip snapshot generation or re-enable the retired collection.

## consequences

- Generated edition indexes are visible to the current Astro collection.
- Existing `index.mdx` and `index.md` metadata can seed the next edition number.
- A same-month run fails explicitly instead of overwriting a snapshot.
- A generated index can still be incomplete as a publishable edition because
  blip snapshots are outside this slice.
- `fileName` becomes a path relative to the snapshot root, while `filePath`
  remains the persisted repository-relative output path.

## options considered

- Keep writing the retired path: rejected because the current app cannot load
  the result and a clean checkout cannot discover existing editions there.
- Change only the root directory: rejected because a flat file directly under
  `content/editions` does not match `*/index.{md,mdx}`.
- Re-enable a compatibility collection: rejected because it duplicates the
  content model and hides path drift.
- Generate a full edition plus copied-forward blips: deferred because it
  expands into content ownership and publication completeness.
- Reuse the current snapshot path with a collision guard: accepted because it
  is the least entangled complete repair for path reachability.

## trade-offs

The path is compatible with the current loader but enforces one edition per
month. Refusing collisions is safer than overwriting, but a future product
decision may need a different id policy. The writer remains independent from
Astro runtime imports and EHS protocol code.

## follow-up work

Decide separately whether generated edition drafts must include a complete
edition-owned blip snapshot tree before the workflow can propose publication.

## review date

2026-09-03
