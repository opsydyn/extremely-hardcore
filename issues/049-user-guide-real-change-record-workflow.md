# issue: expose the real-change record workflow in the user guide

## intent

Help a new EHS user discover how to record a future non-trivial change without
guessing where the dogfood template lives or treating it as a second protocol.

## scope

- Add a concise link and usage note to `docs/user-guide.md`.
- Preserve the distinction between standalone Markdown and optional `eh`.
- Preserve explicit reasons for unavailable measurements and no historical
  backfill.

## completion criteria

- The guide links `dogfood/template.md` and explains the minimum usage boundary.
- Run 049 has fresh evidence for all criteria, no blockers, and a valid
  attestation.
- No runtime or machine-readable contract changes are introduced.

## non-goals

- No template schema, CLI, tracker, metrics collector, or historical migration.
- No provider, network, writable execution, or deployment work.
