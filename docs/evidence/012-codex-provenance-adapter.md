# evidence ledger: Codex provenance adapter

## summary

Added a real local Codex CLI adapter that runs the thirteen behavioural scenarios in read-only ephemeral mode, parses schema-constrained final responses, and writes a hash-addressed artifact/report directory. The adapter mode is caller-declared metadata only.

## changed files

- `evaluation/run-codex-adapter.ts` and experimental adapter/provenance types
- `scripts/evaluate-codex.ts` and `package.json`
- Fake-executor adapter and CLI argument tests
- Evaluation, roadmap, decision, contract, domain, boundary, plan, issue, and run records for slice 012

## commands run

- `codex exec --help` confirmed local support for read-only sandbox, ephemeral sessions, output schema, and final-message capture.
- Focused adapter tests failed first because the adapter module and CLI were absent.
- Focused fake-executor tests pass after implementation; no live model call was made.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, deterministic evaluation, and declared-baseline evaluation pass.
- The Codex CLI rejects missing arguments before any invocation.
- Completion-gate evidence is recorded against the final workspace revision.

## passing checks

The fake executor verifies thirteen constrained invocations, complete attempts and assessments, and SHA-256 digests for retained artifacts. Invalid structured output leaves failure artifacts but prevents `report.json`. The CLI rejects missing arguments before invoking Codex.

## failing checks

The intended red tests failed because the adapter module and CLI did not exist. No known implementation failures remain after the fake-executor tests.

## architecture impact

Adds a constrained external-executable adapter and experimental provenance report. Protocol and deterministic evaluation architecture remain unchanged.

## public contract impact

Adds the experimental Codex adapter CLI and artifact report. Mode is descriptive metadata, not verified provenance.

## risks left open

Artifacts may contain sensitive context; real run retention, redaction, and benchmark comparison remain unimplemented.

## human review needed

No, unless a reviewer disputes artifact retention or the declared-mode boundary.

## final recommendation

merge. A real artifact directory must be inspected and redacted before any comparison or benchmark claim.
