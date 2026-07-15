# implementation plan: agent-attempt evaluation contract

## first failing test

Import the missing assessor and assert that a stale-evidence attempt observing `evidence.stale` passes, while a missing code fails and an unknown scenario is invalid.

## smallest implementation

Create a seven-entry manifest extracted from the deterministic runner, then add a pure comparator over `AgentAttempt` values. Update the runner to read category and expected codes from the manifest.

## checks

- Targeted attempt-assessment and core-runner tests.
- `bun run evaluate`
- `bun run check`, `bun run test`, and `bunx tsc --noEmit`.

## rollback

Remove the manifest and assessor, restore local scenario expectations in the runner, and leave protocol code untouched.
