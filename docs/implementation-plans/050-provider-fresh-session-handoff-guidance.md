# implementation plan: provider-neutral fresh-session handoff guidance

## behaviour to protect

A new provider user can hand a durable status snapshot to a fresh session and
record the session boundary without confusing prompt-fed interpretation with
file-reading resume, adherence, or containment evidence.

## first failing test

Before editing `docs/provider-onboarding.md`, run:

```bash
bun -e 'const text = await Bun.file("docs/provider-onboarding.md").text(); if (!text.includes("Fresh-session handoff")) { console.error("expected red phase: provider guide has no fresh-session handoff section"); process.exit(1); }'
```

Expected result: exit 1 because the guide has no such subsection yet.

## smallest implementation

Add one short provider-neutral subsection with the optional status command,
boundary fields, expected/observed distinction, and explicit not-proved list.
Link Run 048 only as a narrow example.

## refactor step

None unless the new wording duplicates an existing provider claim limit; if it
does, keep the more specific host matrix wording and shorten the new section.

## checks to run

- Content assertions for the handoff section and claim boundaries.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check` plus an untracked-file trailing-whitespace scan.
- Run 050 validation, completion, attestation, and CI projection.

## rollback plan

Remove the added onboarding subsection and its documentation-only record files.
No provider state, credentials, or runtime behavior is changed.

## notes

This is the second real documentation change used to assess the template's
field burden. It must remain provider-neutral and narrower than a resume
implementation.
