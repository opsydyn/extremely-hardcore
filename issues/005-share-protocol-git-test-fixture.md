# issue: share protocol Git test fixture

## outcome

Extract the repeated temporary Git workspace setup used by the CLI, evidence, and fingerprint protocol tests into one test-support helper.

## acceptance criteria

- The helper creates a committed Git workspace with a tracked fixture file.
- CLI, evidence, and fingerprint tests use the helper.
- Existing behavioural tests remain unchanged in intent and pass without production-code changes.

## non-goals

- Production protocol changes.
- New test framework dependencies.
- Shared run fixtures for tests that do not need Git.
