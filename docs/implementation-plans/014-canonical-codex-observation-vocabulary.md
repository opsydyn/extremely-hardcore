# implementation plan: canonical Codex observation vocabulary

## behaviour to protect

Strict assessment must continue to require a scenario's expected canonical code. The adapter must reject unsupported code strings before emitting a report.

## first failing test

Assert that the response schema, canonical scenario input, and prompt contain the six derived behavioural codes. Assert a structured response with `SCOPE_DRIFT_OUT_OF_CONTRACT` is rejected as unsupported.

## smallest implementation

Derive a unique ordered code list from `AGENT_ATTEMPT_SCENARIOS`, reuse it in schema/input/prompt generation, and validate parsed final-response codes against it.

## refactor step

Keep vocabulary derivation local to the adapter module. Do not introduce a second manifest or change assessor behaviour.

## checks to run

- Focused Codex adapter tests.
- Existing evaluation tests, `bun run check`, `bun run test`, and `bunx tsc --noEmit`.
- Completion-gate validation.

## rollback plan

Revert the adapter vocabulary contract and ADR together. Existing artifact reports remain readable under their recorded schema.

## notes

No live adapter call or repeat comparison belongs to this implementation slice.
