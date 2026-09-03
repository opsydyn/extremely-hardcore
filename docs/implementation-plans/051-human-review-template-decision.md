# implementation plan: human review template decision

## behaviour to protect

The repository records that the template is accepted as a lightweight
convention, while file-reading resume and unrelated release gates remain open.

## first failing test

Before editing the decision record, run:

```bash
bun -e 'const text = await Bun.file("docs/dogfood/decision.md").text(); if (!text.includes("Human review decision")) { console.error("expected red phase: human review decision is not recorded"); process.exit(1); }'
```

Expected result: exit 1 because the approval has not been recorded yet.

## smallest implementation

Add one dated decision section, one index status row, and concise roadmap status
updates. Keep the approval and deferral separate from release status.

## refactor step

None. Do not reorganize historical decision prose.

## checks to run

- Decision, index, and roadmap content assertions.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check` plus an untracked-file whitespace scan.
- Run 051 validation, completion, attestation, and CI projection.

## rollback plan

Remove the new dated decision and status wording plus the documentation-only
Run 051 record files. No executable or user data changes.

## notes

This records the human decision; it is not authorization to design or implement
file-reading resume.
