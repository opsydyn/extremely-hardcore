# Implementation plan: retention policy decision

## behaviour to protect

Historical completion and current revalidation must remain distinct. The
confirmed missing projections must stay visible, while future release records
must not treat ephemeral projections as sufficient evidence.

## first failing test

Before editing the decision record, run:

```bash
bun -e 'const text = await Bun.file("docs/dogfood/decision.md").text(); if (!text.includes("Retention policy decision (2026-09-03)")) { console.error("expected red phase: retention policy decision is not recorded"); process.exit(1); }'
```

Expected result: exit 1 because the approved decision has not yet been
recorded.

## smallest implementation

Add the dated decision, one future durable-retention rule to the template,
aligned dogfood and roadmap wording, and the documentation-only Run 053
records. Do not change protocol code, historical runs, or provider behaviour.

## refactor step

None. Keep the existing projection commands, schema, and record structure
unchanged.

## checks to run

- Decision, template, index, roadmap, and supporting-record content checks.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check` and an untracked-file whitespace scan.
- Run 053 protocol validation, completion, attestation, and CI projection.

## rollback plan

Remove the Run 053 documentation and revert only the retention-policy wording
added to the decision, index, template, and roadmap. Do not touch Runs 033
through 035 or the runtime.

## notes

The future durable-retention requirement is a policy boundary. Its storage
owner, retention period, access model, and enforcement are intentionally left
for a separate implementation proposal.
