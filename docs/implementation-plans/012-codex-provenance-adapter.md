# implementation plan: Codex provenance adapter

## behaviour to protect

The adapter must not alter protocol or deterministic evaluation. Every emitted attempt has parseable structured output and hash-addressed raw artifacts.

## first failing test

Import the missing adapter with an injected fake executor and assert 13 read-only ephemeral invocations, one complete report, and valid response digests. Assert malformed structured output fails before a report is written.

## smallest implementation

Export a Codex adapter function that creates a new output directory, writes canonical files, invokes an injected executor, parses its final-message file, assesses the attempt, and writes one report after all scenarios pass. Add a thin argument-parsing CLI.

## refactor step

Keep response-schema creation and artifact hashing as small local helpers. Do not move provider behavior into evaluation core.

## checks to run

- Focused adapter and CLI argument tests.
- Existing evaluation tests and both existing evaluation commands.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and the completion gate.

## rollback plan

Revert the adapter, CLI, experimental types, fixtures, and ADR together. Existing evaluators and protocol data remain usable.

## notes

No live Codex invocation is part of automated verification; the fake executor validates the invocation contract.
