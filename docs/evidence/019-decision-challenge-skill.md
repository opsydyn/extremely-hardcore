# evidence ledger: decision-challenge skill dogfood

## summary

Dogfooded the accepted decision-challenge skill against the proposed live Codex action-fixture adapter. The record holds the live adapter because the copied fixture cannot yet create agent-owned evidence and completion records. This documentation and proof-carrying-run slice is complete independently of that held proposal.

## changed files

- `docs/decision-challenges/019-live-codex-action-fixture.md`
- `issues/019-decision-challenge-skill.md`
- `docs/implementation-plans/019-decision-challenge-skill.md`
- `docs/evidence/019-decision-challenge-skill.md`
- `ROADMAP.md`
- Ignored local records under `.extremely-hardcore/runs/019-decision-challenge-skill/`

## commands run

- `bun test scripts/validate.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- `bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill decision-challenge-validated -- bun run check`
- `bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill documentation-complete -- bun test scripts/validate.test.ts`
- `bun run eh transition .extremely-hardcore/runs/019-decision-challenge-skill complete`
- `bun run eh validate .extremely-hardcore/runs/019-decision-challenge-skill`

## passing checks

Before the tracked documentation commit, the focused validator test passed 4 tests, the scaffold check passed, the full suite passed 75 tests, typecheck passed, and `git diff --check` passed. The committed workspace must repeat these commands and record fresh passing protocol evidence before completion is claimed.

## failing checks

No Task 3 implementation or verification check failed. The live adapter is intentionally held because its current design cannot prove agent-owned protocol compliance; this is a decision outcome, not a failed check for this documentation slice.

## architecture impact

No new architecture decision is required. This records and dogfoods the boundaries already accepted in ADR 0012 and ADR 0013: the fixture runner remains provider-neutral, the reference executor remains a local oracle proof, and live provider execution remains deferred.

## public contract impact

No public API, protocol schema, CLI, provider adapter, authentication, persistence, CI, deployment, or observability behaviour changes. The roadmap status now makes the held adapter decision explicit without changing provider-execution, comparison-policy, or threshold status.

## risks left open

The fixture still lacks an immutable fixture-local protocol CLI and direct no-network attestation. Until one redesign path is accepted and implemented, a live adapter could only demonstrate a source change, not Extremely Hardcore compliance.

## human review needed

No additional review is required to merge this bounded documentation slice. A human decision is required before resuming live provider-adapter design, either to approve fixture self-sufficiency work or to accept the narrower source-change-only claim.

## final recommendation

merge
