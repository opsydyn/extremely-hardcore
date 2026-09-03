# implementation plan: user-guide real-change record workflow

## behaviour to protect

A new user can find the future dogfood template, understand that it is a
human-readable convention, and know not to invent missing measurements or
rewrite historical records.

## first failing test

Before editing `docs/user-guide.md`, run:

```bash
bun -e 'const text = await Bun.file("docs/user-guide.md").text(); if (!text.includes("dogfood/template.md")) { console.error("expected red phase: user guide does not link the dogfood template"); process.exit(1); }'
```

Expected result: exit 1 because the guide has no template link yet.

## smallest implementation

Add one short subsection near the real-change `eh` workflow with a relative
link to `dogfood/template.md`, the no-backfill rule, and the explicit
unavailable-measurement rule. Do not copy the full template.

## refactor step

None unless the new paragraph duplicates an existing boundary statement.

## checks to run

- Content assertions for the template link and minimum rules.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check` plus an untracked-file trailing-whitespace scan.
- Run 049 validation, completion, attestation, and CI projection.

## rollback plan

Remove the added subsection and its documentation-only record files. No runtime
or persisted user data is changed.

## notes

This is one of two real documentation changes used to assess the template's
field burden. Do not claim a measured time reduction from this slice.
