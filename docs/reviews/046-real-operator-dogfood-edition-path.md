# bounded-context review: Flue edition snapshot path

## proposed change

Update the Flue edition writer to discover and write the current
`apps/astro/src/content/editions/<edition-id>/index.mdx` layout, with a
same-month collision guard and no change to narrative or provider behavior.

## affected contexts

- Astro edition snapshot collection and frontmatter schema.
- Flue deterministic edition metadata and generated-output writer.
- GitHub workflow artifact path projection.

## allowed dependencies

- Existing Node filesystem/path APIs.
- Existing `gray-matter`, Effect, schema, and Flue result boundaries.
- The current `YYYY-MM` directory and `index.mdx` content convention.

## suspicious dependencies

- Astro runtime imports in the tooling package.
- EHS protocol imports in the target repository.
- New content loaders, shared packages, validation dependencies, provider
  calls, or workflow permissions.

## data ownership

The Astro content collection owns the snapshot path and schema. The Flue
writer owns deterministic draft metadata and the generated index file. The
workflow owns artifact upload. No persistent service or database is involved.

## transaction boundaries

There is one local filesystem boundary: validate the target id before creating
the generated directory or writing the index. No partial blip tree is created
by this slice.

## integration events

No new events or cross-process messages are added. The existing workflow reads
the persisted `filePath` after the generator succeeds.

## anti-corruption needs

Keep the writer's path policy local and deterministic. Do not make Astro
runtime modules depend on Flue, and do not make Flue depend on EHS records.
Keep AI narrative and provenance separate from content-path allocation.

## verdict

safe with noted risk

## follow-up

Review the collision policy and the absence of blip snapshots separately before
expanding the edition authoring workflow.
