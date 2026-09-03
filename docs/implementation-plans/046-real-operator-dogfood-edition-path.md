# implementation plan: real operator dogfood edition snapshot path

## behaviour to protect

The Flue edition writer discovers the current snapshot collection, allocates
the next number, emits a matching monthly id/path/frontmatter, and refuses to
overwrite an existing monthly snapshot. Narrative and provenance behavior are
unchanged.

## first failing test

Add `tooling/tech-radar-edition-agent/src/editionDraft.test.ts` with a temporary
repository containing only
`apps/astro/src/content/editions/2026-05/index.mdx`. Call
`createEditionDraftContext({ repoRoot, runDate: "2026-09-03" })` and expect the
existing edition to be read, `nextEditionNumber` to be `7`, and `fileName` to
be `2026-09/index.mdx`. The baseline should fail because the implementation
still reads the retired `content/edition` directory.

Add assertions that `buildEditionMdx()` uses `2026-09` in frontmatter and that
a second existing `2026-09/index.mdx` causes a clear collision error.

## smallest implementation

1. Create the focused temp-repository tests and run the red test.
2. Change edition discovery to enumerate snapshot directories and read their
   `index.mdx` or `index.md` files.
3. Derive a UTC monthly id, return a root-relative
   `<edition-id>/index.mdx` filename, and use that id in frontmatter.
4. Guard an existing id and create only the generated file's parent directory
   before writing.
5. Update the compose prompt and narrow Flue docs to describe the path.

Keep the focused edition test in the target package's normal `bun run test`
script; a regression that is not part of the package gate is not complete.

Do not add a shared path module, dependency, Astro import, AI call, blip
generator, workflow permission, or result-envelope field.

## refactor step

Reuse the target's existing snapshot naming and relationship-agent conventions.
Refactor only if the path or collision policy would otherwise be duplicated in
the writer. Keep the deterministic metadata boundary obvious.

## checks to run

- Focused edition-draft test in red and green phases.
- `bun run test`.
- `bun run typecheck` from `tooling/tech-radar-edition-agent`.
- `bun run build` from `apps/astro`.
- `bunx moon check --all` at the repository root; record unrelated existing
  toolchain failures without expanding this slice.
- Targeted static search proving the retired writer path is gone.
- `git diff --check`.
- EHS evidence, validation, completion, attestation, and CI output from the
  isolated target worktree.

## rollback plan

Discard the isolated target worktree or revert its bounded branch. The change
has no migration, dependency, persistent runtime state, or deployment mutation.

## notes

The dogfood must report that path reachability was tested without a provider
call and that a generated index alone does not prove a complete published
edition.
