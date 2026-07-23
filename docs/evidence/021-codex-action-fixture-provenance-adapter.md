# evidence ledger: Codex action-fixture provenance adapter

## summary

Added the experimental two-stage Codex action-fixture adapter. It maps the runner's `fix` and `resume` requests to constrained writable Codex invocations and retains raw provider prompts, invocation metadata, stdout event streams, stderr, and emitted final messages outside the scored workspace. The runner remains the sole fixture scorer. The adapter verifies retained-artifact containment, regular-file status, symlink ancestry, and digests immediately before report emission.

## changed files

- `evaluation/types.ts`
- `evaluation/run-codex-action-fixture-adapter.ts`
- `scripts/evaluate-codex-action-fixture.ts`
- `tests/evaluation/codex-action-fixture-adapter.test.ts`
- `tests/evaluation/evaluate-codex-action-fixture-cli.test.ts`
- `package.json`
- `docs/evaluations/README.md`
- `ROADMAP.md`
- `issues/021-codex-action-fixture-provenance-adapter.md`
- `docs/change-contracts/021-codex-action-fixture-provenance-adapter.md`
- `docs/decision-challenges/021-codex-action-fixture-provenance-adapter.md`
- `docs/adr/0015-codex-action-fixture-provenance-retention.md`
- `docs/domain/021-codex-action-fixture-provenance-adapter.md`
- `docs/reviews/021-codex-action-fixture-provenance-adapter.md`
- `docs/implementation-plans/021-codex-action-fixture-provenance-adapter.md`
- `docs/evidence/021-codex-action-fixture-provenance-adapter.md`

## commands run

- `bun test tests/evaluation/codex-action-fixture-adapter.test.ts tests/evaluation/evaluate-codex-action-fixture-cli.test.ts`
- `bun run test`
- `bun run check`
- `bunx tsc --noEmit`
- `bun run evaluate:action-fixture -- --output-dir /tmp/extremely-hardcore-action-fixture-021-proof`
- `git diff --check`

## passing checks

- Focused adapter and CLI suites: 8 passing tests after the independent review fixes.
- Full repository suite: 99 passing tests, 0 failures.
- Scaffold validation and TypeScript checking passed.
- The deterministic reference fixture passed both stages with one completion transition and retained its fixture-local invocation ledger.
- Independent adversarial review findings were resolved with deterministic tests for prior-stage provider-artifact mutation, provider-directory symlink redirection, and a thrown executor launch failure.

## failing checks

None.

## architecture impact

Adds an isolated Codex-specific integration boundary. It does not change the provider-neutral fixture runner, generic protocol validation, or the existing read-only Codex adapter. The adapter's output-integrity status is independent from the fixture result and does not reinterpret fixture evidence.

## public contract impact

Adds experimental `bun run evaluate:codex-action-fixture -- --output-dir <new-dir> --model <model>`. It returns a V1 adapter report with fixture result, raw-artifact digests, and `provenance.status`. The command exits non-zero when either the fixture fails or retained adapter provenance is invalid. Existing public commands are unchanged.

## risks left open

- No live provider action-fixture run has been performed.
- Raw provider artefacts are review material only; they do not prove agent identity, command ownership, skill loading, provider capability, protocol compliance, sandbox enforcement, or no-network execution.
- Outputs may contain sensitive context and require redaction before sharing.

## human review needed

Yes, before any operational live run or any stronger claim based on its output.

## final recommendation

needs review
