# ADR: missing evidence is a validation failure

## status

accepted

## context

The reference CLI accepts file-based run data. A criterion may reference an evidence ID whose record no longer exists. Direct filesystem reads currently turn that condition into a raw exception, bypassing the structured validation output promised by the completion gate.

## decision

Treat an absent referenced evidence record as `evidence.missing` in `ValidationResult`. The error includes the evidence ID. Validation and transition remain read-only on failure; the CLI renders the existing error format and exits non-zero.

## consequences

- Agents and reviewers receive a stable, actionable reason to recapture or repair evidence.
- The on-disk schema and CLI command grammar remain unchanged.
- Malformed records, missing logs, and schema migration remain separate decisions.

## options considered

### Preserve raw filesystem exceptions

Rejected because the error bypasses the protocol's validation contract and is difficult for agents to classify.

### Add full runtime schema validation

Rejected for this bug fix because it broadens scope beyond the observed missing-record failure.

### Return one structured missing-record error

Accepted because it repairs the observed behaviour with no schema or dependency change.

## review date

After dogfood run 5 or when malformed records are observed in real use, whichever comes first.
