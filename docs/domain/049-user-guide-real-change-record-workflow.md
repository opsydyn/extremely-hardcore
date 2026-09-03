# domain map: real-change record workflow

## terms

- **real-change record:** a human-readable account of one non-trivial change,
  its evidence, limitations, and next action.
- **dogfood template:** the recommended Markdown starting point for future
  records; it is not a second protocol schema.
- **historical record:** an earlier record preserved as evidence of what was
  captured at that time; it is not backfilled to satisfy later conventions.
- **unavailable measurement:** a field explicitly marked unavailable with a
  reason rather than inferred from silence.

## ownership

- `docs/dogfood/template.md` owns the minimum record shape.
- `docs/user-guide.md` owns discoverability and first-use guidance.
- The `eh` protocol owns executable run state and evidence, when a user opts
  into it.
- The evidence ledger owns the compact work receipt and final claim limits.

## rules and invariants

- A new real change starts a new record.
- Missing timing or measurement data is named with a reason.
- Historical records remain unchanged.
- Standalone Markdown use does not require the `eh` protocol.
- The guide must not imply that prose is a substitute for executable evidence.

## ambiguity to preserve

The template is recommended for real non-trivial dogfood, but not every typo or
trivial copy edit needs the full EHS loop. The guide should preserve that
distinction rather than turning the template into a universal form.

## next question

After two or three uses, is the template short enough that operators complete
it without omitting timing, limitation, or evidence-provenance fields?
