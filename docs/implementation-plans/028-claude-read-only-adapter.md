# implementation plan: Claude read-only adapter

## behaviour to protect

The shared runner remains provider-neutral. Claude requests contain no expected error code. Raw provider artefacts are retained and the leaf rejects non-structured output rather than guessing.

## first failing tests

1. Claude constructs the required print-mode JSON/schema argv with tools disabled and no session persistence.
2. The leaf parses a structured Claude JSON envelope into one normalized attempt.
3. The leaf parses a JSON-encoded result field but rejects free-form or malformed output.
4. Non-zero Claude exit retains process artefacts and fails the run.
5. Output-directory and model guards fail before process invocation.

## smallest implementation

- Add `evaluation/run-claude-adapter.ts` with an injected executor.
- Add a CLI wrapper and package script.
- Use `runAgentAdapter` for coverage, scoring, and artifact integrity.
- Add only fake-executor tests before a live run.

## checks

- Focused Claude adapter tests.
- `claude --version` and `claude --help` preflight.
- One controlled live run if access permits.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, `git diff --check`.

## rollback

Remove the Claude leaf module, CLI, package script, tests, and Claude-specific evidence. The shared adapter contract and existing provider adapters remain unchanged.
