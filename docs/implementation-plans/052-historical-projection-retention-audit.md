# implementation plan: historical projection retention audit

## behaviour to protect

Historical completion evidence must remain distinguishable from current
revalidation. Missing original projections must be reported rather than
recreated from a changed workspace and presented as historical proof.

## first failing test

Before editing the decision record, run:

```bash
bun -e 'const text = await Bun.file("docs/dogfood/decision.md").text(); if (!text.includes("Historical projection retention audit (2026-09-03)")) { console.error("expected red phase: historical projection retention audit is not recorded"); process.exit(1); }'
```

Expected result: exit 1 because the audit decision has not been recorded yet.

## smallest implementation

Add one audit decision, one template retention rule, aligned index and roadmap
status, and the documentation-only Run 052 records. Use the existing CLI in
disposable output directories to capture the current invalid result. Do not
change the protocol implementation or historical run files.

## refactor step

None. Keep the existing projection commands and historical records unchanged.

## checks to run

- Retained-path and missing-projection assertions.
- Current `eh status` output for Runs 033 through 035.
- Disposable `eh ci` regeneration attempts with expected invalid results.
- Decision, template, index, and roadmap content assertions.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check` and an untracked-file whitespace scan.
- Protocol validation, completion, attestation, and CI projection for Run 052.

## rollback plan

Remove the new audit wording, template guidance, and Run 052 documentation
records. Do not touch Runs 033 through 035 or any runtime files.

## notes

The temporary projections are intentionally invalid and disposable. They are
evidence of the current regeneration boundary, not replacement artefacts.
