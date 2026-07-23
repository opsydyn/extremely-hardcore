# evidence ledger: fixture-local protocol CLI

## summary

Added immutable fixture-local evidence and completion commands plus a retained invocation ledger. The reference executor now uses those commands. The runner validates the exact Stage A and Stage B sequence, links ledger entries to standard protocol artifacts, requires unique invocation IDs, and pins the approved Stage A invocation, evidence record, and log digest before the stale-state intervention.

## changed files

- `evaluation/fixtures/bounded-bug-fix/fixture-protocol.ts`
- `evaluation/fixtures/bounded-bug-fix/FIXTURE.md`
- `evaluation/reference-bounded-bug-fix-executor.ts`
- `evaluation/run-bounded-bug-fix-fixture.ts`
- `tests/evaluation/action-fixture.test.ts`
- `docs/evaluations/README.md`
- `ROADMAP.md`
- Slice 020 issue, contract, decision challenge, ADR, domain map, boundary review, implementation plan, and this ledger.

## commands run

- `bun test tests/evaluation/action-fixture.test.ts --test-name-pattern 'retains fixture-local protocol command provenance'` failed first because the fixture script and ledger were absent, then passed after implementation.
- `bun test tests/evaluation/action-fixture.test.ts --test-name-pattern 'rewrites the approved Stage A invocation'` failed first because the runner accepted the rewritten Stage A ledger entry, then passed after the runner pinned it.
- `bun test tests/evaluation/action-fixture.test.ts --test-name-pattern 'deletes the pinned Stage A evidence artifacts|duplicate fixture protocol invocation IDs'` failed first because the runner accepted both cases, then passed after it pinned retained evidence/log artifacts and rejected duplicate IDs.
- `bun test tests/evaluation/action-fixture.test.ts`
- `bun test tests/evaluation/evaluate-action-fixture-cli.test.ts`
- `bun run evaluate:action-fixture -- --output-dir /tmp/extremely-hardcore-fixture-local-protocol-proof-<unique>`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`

## passing checks

- Focused action-fixture tests cover the reference command path and missing, malformed, wrong-stage, rewritten, extra, duplicate-ID, and removed-pinned-artifact ledger cases.
- The public action-fixture CLI emits a passing deterministic report with retained script and ledger artifacts.
- Static validation, the full repository suite, TypeScript checking, and whitespace checking pass.

## failing checks

- The three red test commands above failed for their intended missing-feature, Stage A rewrite, and retained-artifact/duplicate-ID reasons before the corresponding implementation changes.

## architecture impact

ADR 0014 adds a fixture-local execution boundary. Generic protocol modules remain the scoring and semantic authority; the fixture's duplicated fixed V1 path is deliberately narrow and immutable under runner diff validation.

## public contract impact

The experimental bounded fixture now exposes `bun fixture-protocol.ts evidence --stage <fix|resume>` and `bun fixture-protocol.ts complete --stage resume`, and retains `protocol-invocations.jsonl`. `ActionFixtureResult` remains schema version 1. Generic `eh`, protocol schema, provider adapters, CI, and deployment contracts are unchanged.

## risks left open

- The local ledger proves structural artifact links, not external agent identity, provider compliance, or network isolation.
- The fixture-local V1 implementation can drift from generic protocol behaviour; runner validation and focused tests limit but do not eliminate that risk.
- Provider-side process provenance correlation, live execution, comparisons, and thresholds remain separate future work.

## human review needed

No human decision is needed for this bounded local slice. A fresh decision challenge and architecture review are required before introducing a live provider adapter or making a provider-compliance claim.

## final recommendation

merge
