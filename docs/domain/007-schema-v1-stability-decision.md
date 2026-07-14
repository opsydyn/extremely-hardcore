# domain map: schema version 1 stability decision

## terms and ownership

| Term | Owner | Rule |
| --- | --- | --- |
| Schema version 1 | Protocol product owner | Defines the durable file contract. |
| Stability declaration | Human product and architecture authority | Creates a compatibility expectation and cannot be inferred by an agent. |
| Compatibility policy | Human product and architecture authority | Defines what future schema changes owe existing runs. |
| Blocker | Run definition | Prevents completion until its named decision is resolved. |

## invariant

An agent cannot use passing commands as a substitute for a missing public-contract decision.

## integration boundary

The completion gate records the blocker mechanically. The decision remains outside the protocol because V1 intentionally has no human approval record type.

## ambiguity retained

The future compatibility policy, migration window, and release authority are intentionally unresolved and require human direction.
