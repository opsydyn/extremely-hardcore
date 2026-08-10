# implementation plan: feature-complete gates

## behaviour to protect

Existing V1 runs still validate and complete. New runs expose risk-aware legal states, high-risk approval freshness, concise status, reproducible evaluation policy, and CI artefacts without external execution.

## first failing tests

1. A high-risk run with passing evidence but no approval is rejected with `approval.required`.
2. A run with an approval from an earlier fingerprint is rejected with `approval.stale`.
3. A terminal run rejects a second transition.
4. A full-corpus report with one missing scenario or critical failure is rejected by policy.
5. A valid completed run produces a passing attestation and CI exit 0.
6. The dogfood runner reports exactly ten completed controlled cases.

## smallest implementation

- Add typed lifecycle states, approval records, risk rubric, and transition validation.
- Add protocol status/summary/attestation modules and thin CLI dispatch.
- Add evaluation policy and repeated-run assessor around existing scenario/attempt contracts.
- Add a deterministic controlled dogfood runner using temporary Git workspaces.
- Update skill/critic contracts, README, roadmap, compatibility document, and reference workflow.

## checks

- Focused protocol, evaluation, CLI, and dogfood tests.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `bun run evaluate:full`.
- `bun run dogfood`.
- `bun examples/proof-carrying-completion/demo.ts`.

## rollback

Remove only the new commands and optional lifecycle artefacts. Existing `implemented -> complete` records and commands remain valid. Do not rewrite historical transition or evidence files.
