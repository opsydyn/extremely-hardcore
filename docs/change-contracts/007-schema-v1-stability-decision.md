# change contract: schema version 1 stability decision

## intent

Dogfood the completion gate against a genuine high-risk blocker: whether to declare protocol schema version 1 stable.

## current understanding

Schema version 1 is an experimental file contract for runs, evidence, and transitions. The accepted protocol ADR says schema compatibility and migration are product responsibilities, while the roadmap requires dogfood evidence before expanding the lifecycle. No human authority has approved a compatibility policy or release promise.

## allowed scope

- Record the decision request and its explicit blocker.
- Attempt completion and preserve the rejection.
- Deliberately abandon the run without changing public protocol claims.
- Record the aggregate dogfood decision.

## forbidden scope

- Declaring schema version 1 stable.
- Adding a migration policy, compatibility guarantee, release, or new schema version.
- Treating agent-authored prose as human approval.

## affected areas

- Dogfood records, decision ADR, and one blocked run directory.

## public contract impact

None. The run is blocked specifically to avoid an unauthorised public-contract change.

## acceptance evidence

- `eh transition` rejects the open blocker without mutating `run.json` or `transitions.jsonl`.
- The run is explicitly recorded as abandoned.
- The aggregate dogfood decision does not overclaim readiness for the behavioural evaluation harness.

## stop condition

Stop at the open blocker. Only a human decision can reopen the stability declaration.
