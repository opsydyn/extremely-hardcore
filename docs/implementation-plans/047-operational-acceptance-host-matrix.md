# implementation plan: operational acceptance and current host matrix

## behaviour to protect

EHS documentation must distinguish historical protocol evidence, retained
artefacts, current host discovery, skill loading, engineering adherence, and
release readiness. Aggregate claims must name their denominator and preserve
unknowns.

## first failing test

A pre-change content assertion checks for the new aggregate and evidence
records. It fails because the records do not yet exist:

```bash
bun -e 'import { existsSync } from "node:fs"; const required = ["docs/dogfood/047-operational-acceptance-host-matrix.md", "docs/evidence/047-operational-acceptance-host-matrix.md"]; if (required.every(existsSync)) process.exit(0); console.error("expected red phase: operational acceptance records are not present yet"); process.exit(1);'
```

This is a documentation-contract assertion, not a production code test.

## smallest implementation

1. Write the aggregate governance records from the current retained evidence.
2. Add the aggregate dogfood record with explicit denominators, retention
   findings, provider states, and release limitations.
3. Refresh the dogfood decision, roadmap, and provider onboarding matrix.
4. Create a protocol run and capture content assertions plus EHS checks.
5. Validate, attest, and inspect the final diff without committing it.

Do not add a new schema, collector, adapter, model call, or historical-record
migration.

## checks to run

- Host versions: `codex --version`, `claude --version`, `pi --version`.
- Safe discovery/readiness: isolated Codex marketplace install, Claude metadata
  validation, and Pi auth check.
- Transient loading smokes: record current outcomes without retaining raw
  provider output.
- Retained path audit for all twelve dogfood records.
- EHS protocol evidence capture, validation, completion, attestation, and CI.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.

## rollback plan

Revert only the new 047 documentation and protocol records if the review is
rejected. Preserve the existing Run 12 working-tree files and all unrelated
dirty changes. No runtime or persistent service state is changed.

## notes

The result may be a complete operational review with a release hold. A passing
documentation protocol run does not clear provider, containment, adherence, or
publication gates.
