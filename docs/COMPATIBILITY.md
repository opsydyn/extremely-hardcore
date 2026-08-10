# Compatibility policy

The protocol is currently schema version 1 and experimental.

## Compatibility rules

- Existing `run.json` files with `initialState: "implemented"` remain readable.
- Existing `implemented -> complete` transition records remain valid.
- New states, approvals, summaries, and attestations are additive local artefacts.
- The validator never rewrites historical evidence or transition records.
- A schema-version change requires a new ADR, migration strategy, fixture replay, and an explicit review.
- CI artefacts are derived outputs and must not be used as protocol input.

## Operational boundary

This policy describes local traceability. It does not provide cryptographic signing, hostile tamper resistance, command ownership, agent identity, provider compliance, or sandbox enforcement.
