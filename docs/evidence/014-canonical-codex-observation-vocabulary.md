# evidence ledger: canonical Codex observation vocabulary

## summary

Added one global, derived six-code vocabulary to the Codex response schema, canonical scenario input, and prompt. The adapter now rejects unsupported response codes before assessment; strict scenario matching is unchanged.

## changed files

- `evaluation/run-codex-adapter.ts`
- `tests/evaluation/codex-adapter.test.ts`
- Evaluation, roadmap, decision, contract, domain, boundary, plan, issue, and run records for slice 014

## commands run

- Focused adapter test failed first because schema/input/prompt omitted the vocabulary and unsupported codes reached the assessor.
- Focused adapter tests and typecheck pass after implementation.
- `bun run check`, `bun run test`, deterministic evaluation, and declared-baseline evaluation pass.
- Completion-gate evidence is recorded against the final workspace revision.

## passing checks

The response schema, input artifact, and prompt contain the same ordered vocabulary. A fake response using `SCOPE_DRIFT_OUT_OF_CONTRACT` is rejected before `report.json` can be written.

## failing checks

The intended red test failed because the global vocabulary was absent and unsupported codes were accepted. No known focused-test failures remain after implementation.

## architecture impact

Tightens the existing experimental Codex adapter boundary. Protocol and assessment architecture remain unchanged.

## public contract impact

The experimental response schema and artifacts gain a global allowed-code vocabulary; reports retain their existing shape.

## risks left open

Constrained classification is still not action-level behaviour testing. Repeated live runs remain necessary and are intentionally out of scope here.

## human review needed

No, unless a reviewer disputes the measurement boundary.

## final recommendation

merge. Controlled repeat runs remain a separate operational slice and are required before comparing declared modes.
