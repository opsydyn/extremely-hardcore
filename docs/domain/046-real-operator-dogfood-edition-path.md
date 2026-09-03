# domain map: real operator dogfood edition snapshot path

## domain terms

- **edition:** a dated, numbered tech-radar publication metadata document.
- **edition id:** the current `YYYY-MM` identity encoded by the snapshot
  directory and frontmatter `id`.
- **edition snapshot:** the directory containing `index.mdx` metadata and
  edition-owned `blips/` content.
- **edition draft:** reviewable generated markdown containing deterministic
  frontmatter and AI-assisted narrative.
- **existing edition:** a snapshot index already present beneath the live
  collection root.

## candidate bounded contexts

- Astro edition snapshot collection and schema.
- Flue edition-draft context and deterministic metadata builder.
- Generated-output writer and its persisted workflow metadata.
- GitHub workflow artifact boundary, which remains external to this slice.

## aggregates/entities/value objects

- The edition id is a string value object with the repository's `YYYY-MM`
  format.
- Edition metadata contains id, sequential number, title, date, and optional
  provenance.
- A generated file path is relative to the snapshot collection root and must
  point to `<edition-id>/index.mdx`.

## commands

- Discover existing edition indexes.
- Allocate the next sequential edition number.
- Derive a monthly edition id from the run date.
- Build deterministic frontmatter and narrative output.
- Persist the draft to a new snapshot directory.

## events

No new runtime events are introduced. The existing Flue session and generated
result envelope remain unchanged.

## policies/rules

- Read `index.mdx` and `index.md` beneath edition snapshot directories.
- Sort existing editions by sequential number for the next number.
- Use the run date's UTC `YYYY-MM` as the new edition id.
- Write only `index.mdx` for the generated edition index.
- Refuse an edition id that already exists before writing.
- Keep deterministic metadata separate from AI narrative and provenance.

## invariants

- The generated id, path directory, and frontmatter id agree.
- Existing snapshot content is never overwritten by a new run.
- The output path matches Astro's `*/index.{md,mdx}` collection pattern.
- No blip snapshot, canonical blip, deployment, or provider state is changed.

## external systems

- Astro content collections consume the generated index at build time.
- Flue supplies the narrative session and structured result.
- The GitHub workflow consumes the persisted relative file path.

## integration points

- `createEditionDraftContext()` discovers existing snapshot indexes.
- `buildEditionMdx()` emits deterministic edition frontmatter.
- `writeGeneratedOutputs()` creates the edition directory and writes the index.
- `.github/workflows/test-edition-agent.yml` reads `filePath` from generated
  metadata and needs no new path literal.

## ambiguity

The repository currently uses monthly ids but the sequential number suggests
that multiple editions could theoretically share a month. This slice resolves
the safety question by refusing a collision and leaves a future id policy to a
separate product decision.

## recommended next questions

- Should a future edition draft include a complete copied-forward blip snapshot
  tree before it is eligible for a publish PR?
- Should the product permit multiple drafts per month with a different stable
  id, or keep one monthly snapshot authoritative?
