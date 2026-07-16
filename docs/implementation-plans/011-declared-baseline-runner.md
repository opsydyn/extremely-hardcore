# implementation plan: declared baseline runner

## behaviour to protect

The deterministic core evaluator remains unchanged. Every declared baseline report has complete, unique coverage of only the 13 behavioural scenarios.

## first failing test

Import the missing baseline evaluator with a complete fixture and assert 13 passing results and matching summary counts. Assert missing coverage and a duplicate scenario are rejected.

## smallest implementation

Export the agent-attempt subset from the manifest, add baseline types plus a pure coverage validator/assessor, then add a file-to-stdout CLI and package script.

## refactor step

Use the manifest's canonical agent-attempt ordering for validation and reports. Avoid a second scenario list.

## checks to run

- Focused baseline and existing evaluation tests.
- Valid and invalid CLI fixture runs.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and the completion gate.

## rollback plan

Revert the experimental evaluator, CLI, fixture, and ADR together. No protocol state or external service is changed.

## notes

The fixture proves contract mechanics, not no-skill agent behaviour.
