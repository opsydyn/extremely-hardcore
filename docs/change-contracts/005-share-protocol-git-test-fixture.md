# change contract: share protocol Git test fixture

## intent

Remove repeated temporary Git repository setup from protocol tests while preserving each test's behavioural scenario.

## current understanding

`cli.test.ts`, `evidence.test.ts`, and `workspace-fingerprint.test.ts` independently initialise Git, configure identity, create `tracked.txt`, and commit it. This duplication makes fixture changes error-prone and obscures the behaviour under test.

## allowed scope

- Add one test-only Git workspace helper.
- Move the repeated repository initialisation into that helper.
- Update the three consumers and add focused helper coverage.
- Record dogfood run 3 and an evidence ledger.

## forbidden scope

- Changes under `protocol/` or `scripts/`.
- Production dependencies or test framework replacement.
- Sharing run-specific fixtures with tests that do not require Git.

## affected areas

- `tests/protocol/` only, plus dogfood and evidence records.

## public contract impact

None. The refactor is test infrastructure only.

## risks and assumptions

- The helper must allow fixture paths containing spaces because the CLI test depends on that behaviour.
- Existing tests retain ownership of their run definitions and cleanup lifecycle.

## acceptance evidence

- The helper's first test fails before it exists.
- Targeted test files and the full focused suite pass after extraction.
- `bun run check` and `bunx tsc --noEmit` pass.

## stop conditions

- A common helper requires changing product behaviour or fixture data specific to one test scenario.
- The extracted helper makes an existing test less explicit about its domain setup.
