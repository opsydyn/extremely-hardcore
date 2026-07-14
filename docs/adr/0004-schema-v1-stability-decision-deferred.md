# ADR: schema version 1 stability decision deferred

## status

proposed

## context

The proof-carrying completion gate has completed four self-hosted dogfood runs. The schema is still experimental, and no compatibility or migration policy has been approved. Declaring it stable would be a public contract decision with consequences beyond the current evidence.

## decision

No decision is made in this ADR. The stability declaration is deferred pending explicit human product and architecture approval.

## options considered

### Declare version 1 stable now

Not selected. The current sample is narrow, and compatibility obligations have not been defined.

### Keep version 1 experimental

Recommended pending human confirmation. Continue collecting representative cross-agent and cross-repository evidence.

### Revise version 1 before stability

Possible if future dogfood identifies a schema defect that requires incompatible change.

## consequences

- Agents must not claim a stable compatibility guarantee.
- The blocked dogfood run remains incomplete and is documented as abandoned.
- A future decision must define compatibility policy and authority explicitly.

## review date

After representative cross-repository dogfood or when a human owner requests the stability decision.
