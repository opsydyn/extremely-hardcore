# implementation plan: vendor-agnostic adapter contract

## behaviour to protect

The existing assessor remains the sole scorer. Current Codex adapters retain their behaviour. A provider-neutral runner accepts exactly one attempt for each of the 13 agent-attempt scenarios and reports artifact-integrity failures without invoking a provider.

## first failing tests

1. A fake adapter with complete attempts produces a passing shared report.
2. The request supplied to the adapter contains no expected error code.
3. Missing, duplicate, or unknown scenario results fail closed.
4. A missing, outside-root, symlinked, or digest-mutated artefact makes provenance invalid.
5. Capability levels round-trip without being converted to boolean support.

## smallest implementation

- Add shared types and a `runAgentAdapter` function in `evaluation/agent-adapter.ts`.
- Add runner-owned safe artifact verification.
- Add fake adapters in tests only.
- Leave Codex files and the canonical assessor untouched.

## checks

- Focused adapter contract tests.
- Existing evaluation and protocol tests.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.

## rollback

Remove the new adapter module and contract tests. Existing provider-specific adapters and the `AgentAttempt` assessor remain independent and unchanged.
