# domain map: human review of the record convention

## terms

- **accepted convention:** a human-approved recommendation to use the existing
  Markdown template for future non-trivial records.
- **deferred capability:** file-reading resume remains outside the current
  product contract and needs a separate proposal.
- **release gate:** an unresolved evidence or governance condition that remains
  open even after this documentation convention is accepted.

## ownership

- `docs/dogfood/decision.md` owns the durable human decision.
- `docs/dogfood/README.md` owns discoverability of the current dogfood state.
- `ROADMAP.md` owns product sequencing and open gates.
- The `eh` protocol and provider adapters remain unchanged.

## rules and invariants

- Accepting the template does not approve release.
- Deferring file-reading resume does not authorize an implementation.
- Timing and productivity remain unmeasured until directly captured.
- Retention, current provider loading, adherence, and containment remain open.

## ambiguity to preserve

The approval accepts the current documentation convention, not every future
field or any future resume design. A later proposal must be reviewed on its own
security, provenance, and operational evidence.

## next question

Which remaining release gate should be measured or repaired next, without
starting file-reading resume prematurely?
