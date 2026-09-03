# implementation plan: future dogfood record and fresh-session resume

## behaviour to protect

Future dogfood records should make the change, protocol outcome, operator
experience, evidence retention, fresh-session result, limitations, and next
action reviewable without requiring a second machine protocol. A no-tools fresh
Pi session must not be described as reading local files.

## first failing test

Run this content assertion before adding the template or Run 048 record. It
must fail because the required files do not exist:

```bash
bun -e 'import { existsSync } from "node:fs"; const required = ["docs/dogfood/template.md", "docs/dogfood/048-future-dogfood-record-and-pi-resume.md"]; if (required.every(existsSync)) process.exit(0); console.error("expected red phase: future dogfood template and resume record are not present yet"); process.exit(1);'
```

This is a documentation-contract assertion, not a production code test.

## smallest implementation

1. Add one compact Markdown template and a README checklist for future records.
2. Capture a durable `eh status` snapshot from a non-terminal handoff fixture.
3. Run one Pi `0.84.1` no-tools/no-session prompt and inspect only its final
   exact marker; do not retain raw output.
4. Record the narrow result and limitations in Run 048.
5. Capture protocol evidence, complete, attest, and validate the documentation
   slice.

Do not change the protocol schema, CLI, skill files, adapters, or historical
records.

## refactor step

No refactor is required. Keep the template shorter than a full governance
record and reuse the existing `eh status` vocabulary and evidence-ledger
receipt fields.

## checks to run

- Pre-change and post-change content assertions.
- Pi auth readiness and no-tools/no-session fresh-session check.
- Template local-link/placeholder check.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.
- Run 048 evidence, validation, completion, attestation, and CI checks.

## rollback plan

Remove only the new template, README checklist, Run 048 records, and status
updates if rejected. Preserve Runs 1 through 12 and all unrelated working-tree
changes. No runtime, provider, or persistent service state changes.

## notes

The result may be a passing fresh-session interpretation check with resume still
unproved. The wording must keep that boundary visible.
