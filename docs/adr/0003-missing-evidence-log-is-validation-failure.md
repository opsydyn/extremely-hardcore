# ADR: missing evidence log is a validation failure

## status

accepted

## context

Completion validation recomputes an evidence log digest. An absent log currently throws a raw filesystem exception, bypassing the structured validation output. This is operationally equivalent to the missing evidence-record condition accepted in ADR 0002, but the missing artefact is the log rather than the record.

## decision

Treat an absent evidence log as `evidence.log-missing`. Include the evidence ID and declared log path. Keep validation and failed transitions read-only, preserve the existing schema, and leave other filesystem failures unchanged.

## consequences

- A fresh agent can identify the record and artefact that needs recapture or repair.
- CLI rendering and exit semantics use the existing validation-result pathway.
- Missing logs are not automatically repaired or reconstructed.

## options considered

### Preserve the raw filesystem exception

Rejected because it bypasses the protocol error contract.

### Reuse `evidence.missing`

Rejected because the evidence record exists and identifies a distinct recovery action.

### Add `evidence.log-missing`

Accepted because it accurately classifies the persisted state with no schema or dependency change.

## review date

After dogfood run 5 or when additional filesystem failure modes are observed.
