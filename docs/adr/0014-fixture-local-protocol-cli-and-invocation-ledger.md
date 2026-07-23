# ADR: fixture-local protocol CLI and invocation ledger

## status

accepted

## context

ADR 0012 created a provider-neutral staged action fixture. The first decision challenge found that its host reference executor creates evidence and completion through generic protocol imports, so a copied fixture workspace cannot make those actions itself. That blocks any later claim that a provider process followed the protocol.

## decision

Add an immutable, fixture-specific Bun command script with fixed evidence and completion operations. The script creates existing V1 evidence and transition artifacts and appends a fixture invocation ledger. The runner validates the expected stage sequence and links between ledger entries, evidence, transition, and workspace fingerprint. The ledger records structural command provenance only; it is not proof of an external agent identity.

## consequences

- The deterministic reference proof uses the same command surface a future provider process would use.
- The fixture gains a narrow duplicate implementation of fixed V1 operations, while the host protocol remains the scorer and semantic authority.
- A future adapter has a concrete artifact to correlate with provider-side execution records.
- The ledger cannot defeat a writable workspace adversary and must not support isolation or compliance claims alone.

## options considered

### Keep host protocol calls in the reference executor

Rejected because it leaves the fixture unable to execute its own protocol actions.

### Make the copied fixture import the host protocol package

Rejected because the copied workspace would depend on host-specific paths and would not be self-contained.

### Add a fixture-specific local script and validated ledger

Accepted because it supplies the missing execution interface while containing duplication to one immutable fixture.

## trade-offs

The fixture-specific script may drift from generic protocol semantics. Runner validation and focused tests constrain that risk, but do not eliminate it. The design adds retained artifacts and checks before any provider value is demonstrated.

## follow-up work

- Define a provider adapter that retains raw provider-side command provenance and correlates it to the fixture ledger.
- Add independent action fixtures before making a comparison or regression-threshold claim.

## review date

Before the first live staged provider run.
