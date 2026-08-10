# implementation plan: Pi read-only adapter

## behaviour to protect

The shared runner remains provider-neutral. Pi requests contain no expected error code. Raw JSONL provider output is retained and the leaf rejects non-structured final text rather than guessing.

## first failing tests

1. Pi constructs the required JSON-event, no-session, no-tools, no-project-resource, offline argv.
2. The leaf parses a JSONL stream and extracts a final assistant `message_end` response into one normalized attempt.
3. The leaf rejects malformed JSONL, missing final assistant text, code fences, prose, and unsupported codes.
4. Non-zero Pi exit retains process artefacts and fails the run.
5. Output-directory and model guards fail before process invocation.

## smallest implementation

- Add `evaluation/run-pi-adapter.ts` with an injected executor.
- Add a CLI wrapper and package script.
- Use `runAgentAdapter` for coverage, scoring, and artifact integrity.
- Use only standard-library process/filesystem APIs; do not import the global Pi package.
- Run fake-executor tests before any live call.

## checks

- Focused Pi adapter tests.
- `pi --version` and `pi --help` preflight.
- One controlled live run if authentication and model access permit.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, `git diff --check`.

## rollback

Remove the Pi leaf module, CLI, package script, tests, and Pi-specific evidence. The shared adapter contract and Claude leaf remain unchanged.
