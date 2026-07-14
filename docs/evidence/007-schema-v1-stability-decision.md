# evidence ledger: blocked schema version 1 stability decision

## summary

Recorded and deliberately abandoned a high-risk schema-stability declaration because no human compatibility decision exists.

## changed files

- `issues/007-decide-schema-v1-stability.md`
- `docs/adr/0004-schema-v1-stability-decision-deferred.md`
- Contract, domain, boundary, plan, dogfood, and aggregate-decision records.
- `.extremely-hardcore/runs/007-schema-v1-stability-decision/`
- Roadmap and dogfood-status updates.

## commands run

- `bun run eh transition .extremely-hardcore/runs/007-schema-v1-stability-decision complete`
- Focused transition and CLI regression tests verifying failed transitions are non-mutating.

## passing checks

- The command rejected the uncovered human-decision criterion and open blocker.
- No transition event was appended.
- No stability declaration or compatibility promise was made.

## failing checks

- The completion attempt exited 1 by design because the human decision and blocker remain unresolved.

## architecture impact

No runtime or schema change. ADR 0004 records that the stability decision is deferred to human authority.

## public contract impact

None. Schema version 1 remains experimental.

## risks left open

- Human approval and abandonment are not first-class V1 artefacts.
- Schema compatibility and migration policy remain unresolved.
- Behavioural evaluation must validate the gate outside this self-hosted repository.

## human review needed

Yes. A human product and architecture owner must decide the schema-stability question.

## final recommendation

needs review
