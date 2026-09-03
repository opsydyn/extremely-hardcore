# issue: audit historical projection retention

## intent

Determine whether the missing attestation and CI projection artefacts for Runs
033 through 035 can be recovered without misrepresenting current output as
historical proof.

## scope

- Inspect retained run, evidence, log, and transition files.
- Check the documented original projection paths.
- Attempt current `eh ci` generation only in disposable directories.
- Record the result and a future no-backfill retention rule.

## completion criteria

- The audit records the retained source artefacts and missing projections.
- Current regeneration is shown to be invalid because the evidence is stale.
- The decision, template, index, and roadmap preserve the gap and keep release
  open.
- Run 052 has fresh evidence, no blockers, and a valid attestation and CI
  projection for the audit itself.

## non-goals

- No historical backfill, projection archive, schema, persistence, CI, provider,
  network, sandbox, or writable execution change.
- No release approval or claim that the original projections can be recovered.
