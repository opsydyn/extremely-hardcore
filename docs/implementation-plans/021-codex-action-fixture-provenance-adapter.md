# implementation plan: Codex action-fixture provenance adapter

## behaviour to protect

The fixture runner remains the sole scorer. A Codex-specific executor receives each stage request, uses one fixed writable invocation shape, retains raw provider artefacts outside the workspace, and returns an experimental report with digest-linked provenance. No provider output is parsed for fixture status.

## first failing test

Create `tests/evaluation/codex-action-fixture-adapter.test.ts` importing the absent adapter. Use an injected executor that performs the allowed source correction and fixture-local commands. Assert two `workspace-write` requests, per-stage raw artefacts, digest-linked report contents, and the runner-produced passing result. The import must fail before implementation exists.

## smallest implementation

Add isolated adapter types, `evaluation/run-codex-action-fixture-adapter.ts`, and `scripts/evaluate-codex-action-fixture.ts`. The default executor wraps `codex exec`; the injected executor makes tests deterministic. Add one package script and brief evaluation documentation.

## refactor step

Share only low-level digest conventions already present locally if the duplication is demonstrably safe. Do not merge write-capable fixture execution into the read-only behavioural adapter.

## checks to run

- `bun test tests/evaluation/codex-action-fixture-adapter.test.ts`
- `bun test tests/evaluation/evaluate-codex-action-fixture-cli.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`

## rollback plan

Remove the new adapter, CLI, package script, tests, docs, and ADR together. The output format is experimental, no remote state is written by this repository, and existing adapters remain independent.

## notes

Do not run the default executor as a verification command. A future operational run requires separately reviewed local output and must retain the limits recorded in the decision challenge.
