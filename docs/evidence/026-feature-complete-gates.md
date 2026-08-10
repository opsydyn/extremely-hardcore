# evidence ledger: feature-complete gates

## summary

Implemented the five remaining V0 mechanics: repeated full-corpus evaluation policy, risk-aware lifecycle and approval freshness, durable status/handoff output, CI summaries and attestations, and a controlled ten-case dogfood harness.

## changed files

- `protocol/types.ts`, `protocol/lifecycle.ts`, `protocol/risk.ts`, `protocol/approvals.ts`, `protocol/transition.ts`, `protocol/validate-run.ts`
- `protocol/status.ts`, `protocol/attestation.ts`
- `evaluation/full-evaluation.ts`, `evaluation/run-dogfood.ts`
- `scripts/eh.ts`, `scripts/evaluate-full.ts`, `scripts/dogfood.ts`, `package.json`
- `.github/workflows/extremely-hardcore.yml`, `docs/COMPATIBILITY.md`
- `skills/using-extremely-hardcore/SKILL.md`, critic role contracts, `README.md`, `ROADMAP.md`
- focused tests under `tests/protocol/` and `tests/evaluation/`
- change-control, ADR, domain, bounded-context, decision-challenge, implementation-plan, and this evidence ledger

## commands run

- `bun test ./tests/protocol/lifecycle.test.ts ./tests/protocol/status-attestation.test.ts ./tests/evaluation/full-evaluation.test.ts ./tests/evaluation/dogfood.test.ts`
- `bun test ./tests/protocol/cli-feature.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `bun run evaluate:full`
- `bun run dogfood`
- `bun examples/proof-carrying-completion/demo.ts`
- `git diff --check`

## passing checks

- Full repository suite: 119 tests passed, 0 failed.
- Structural validation passed.
- TypeScript reported no errors.
- Full policy report covered 20 scenarios for 3 repetitions: 3 passed, 0 failed, 0 critical failures.
- Controlled dogfood covered 10 cases: 10 passed, 0 failed, 0 false blocks.
- High-risk completion rejected missing and stale approvals, then accepted a fresh approval.
- Blocked runs required an open blocker and could not resume while it remained open.
- CI wrote human summary and machine attestation artefacts and returned non-zero before completion and zero after valid completion.
- Existing proof-carrying demo still rejected uncovered/stale evidence and completed successfully.
- No diff whitespace errors.

## failing checks

None in the final verification pass.

## architecture impact

The protocol remains local, file-based, Bun-native, and provider-neutral. Delivery, evaluation, agent skills, and dogfood consume protocol outputs without deciding protocol validity. No service, database, daemon, network path, provider adapter, or runtime dependency was added.

ADR 0018 records lifecycle and approval freshness. ADR 0019 records local CI attestation delivery. The schema remains version 1 experimental.

## public contract impact

Existing `eh evidence`, `eh validate`, and `eh transition <run> complete` behaviour remains available. New experimental commands are `status`, `approve`, `summary`, `attest`, `ci`, and additional lifecycle targets. CI uses exit 0 for a valid completed run, 1 for an invalid/incomplete run, and 2 for usage errors.

## risks left open

- Controlled temporary repositories are not real operator dogfood; ten real changes still need recording under `docs/dogfood/`.
- Declared agent attempts are assessor inputs, not provider evidence or a skills-effect comparison.
- Local approvals and attestations are traceability records, not cryptographic signatures or hostile-tamper protection.
- Provider command ownership, agent identity, sandbox enforcement, and network isolation remain unproven and gated separately.
- Concurrent writers and schema migration are still outside this slice.

## human review needed

Yes. Review the expanded experimental lifecycle contract, approve the operational dogfood campaign, and decide when schema version 1 can be treated as stable. Do not start Claude/Pi adapter work until that review accepts the V0 checkpoint.

## final recommendation

needs follow-up
