# evidence ledger: decision-challenge skill dogfood

## summary

Dogfooded the accepted decision-challenge skill against the proposed live Codex action-fixture adapter and closed final review findings. The record holds the live adapter because the copied fixture has no fixture-local protocol instruction or interface through which the provider could create agent-owned evidence and completion records. `FIXTURE.md` remains the task oracle only. This skill, validator, documentation, and proof-carrying-run slice is complete independently of that held proposal.

## changed files

- `docs/decision-challenges/019-live-codex-action-fixture.md`
- `skills/decision-challenge/SKILL.md`
- `skills/decision-challenge/templates/decision-challenge.md`
- `AGENTS.md`
- `README.md`
- `scripts/validate.ts`
- `scripts/validate.test.ts`
- `issues/019-decision-challenge-skill.md`
- `docs/implementation-plans/019-decision-challenge-skill.md`
- `docs/evidence/019-decision-challenge-skill.md`
- `ROADMAP.md`
- `.superpowers/sdd/task-3-report.md` (ignored local report)
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

Before the tracked review-fix commit, the focused validator test passed 11 tests, the full suite passed 82 tests with 247 expectations across 16 files, the scaffold check passed, typecheck passed, and `git diff --check` passed. The focused validator test proves that the complete decision-challenge skill/template passes and that missing trigger, strongest-counterargument, evidence-gap map, stop-conditions, or verdict content is rejected. The committed workspace must record fresh passing protocol evidence before completion is claimed.

## failing checks

No Task 3 implementation or verification check failed. The live adapter is intentionally held because its current design cannot prove agent-owned protocol compliance; this is a decision outcome, not a failed check for this documentation slice.

## architecture impact

No new architecture decision is required. This enforces and dogfoods the boundaries already accepted in ADR 0012 and ADR 0013: the fixture runner remains provider-neutral, the reference executor remains a local oracle proof, and live provider execution remains deferred.

## public contract impact

The public skill/scaffold contract now requires the full decision-challenge trigger rubric and record template, including durable differentiated value, strongest counterargument, evidence-gap map, stop conditions, and verdict. No runtime API, protocol schema, CLI, provider adapter, authentication, persistence, CI, deployment, or observability behaviour changes. The roadmap status remains unchanged: the live provider adapter is held and provider execution, comparison policy, and regression thresholds remain pending.

## risks left open

The fixture still lacks an immutable fixture-local protocol CLI and direct no-network attestation. Until one redesign path is accepted and implemented, a live adapter could only demonstrate a source change, not Extremely Hardcore compliance.

## human review needed

No additional review is required to merge this bounded documentation slice. A human decision is required before resuming live provider-adapter design, either to approve fixture self-sufficiency work or to accept the narrower source-change-only claim.

## final recommendation

merge
