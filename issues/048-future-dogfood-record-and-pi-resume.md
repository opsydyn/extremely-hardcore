# issue: future dogfood record and fresh-session resume

## intent

Standardize the minimum fields for future EHS dogfood records and run one
authorized fresh Pi session against a durable handoff snapshot.

## scope

- Add one compact Markdown record template and README checklist.
- Preserve historical records without migration.
- Supply a captured `eh status` snapshot to one Pi no-tools/no-session smoke.
- Record exact host/version, expected marker, observed marker, and limitations.
- Complete a local EHS protocol run for the documentation slice.

## completion criteria

- Future record fields cover identity, protocol result, timing, friction,
  false-block outcome, evidence retention, fresh-session result, limitations,
  and next action.
- The Pi result is recorded as prompt-fed interpretation only.
- Run 048 has fresh evidence, valid completion, attestation, and CI output.
- No credentials, raw provider output, protocol schema, or historical record is
  changed.

## non-goals

- No file-reading or writable resume implementation.
- No provider comparison, adherence, containment, or release claim.
- No metrics collector, JSON schema, validator, adapter, or dependency.
