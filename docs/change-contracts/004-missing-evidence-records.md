# change contract: missing evidence record validation

## intent

Fix a completion-gate bug discovered during dogfood: missing evidence records are invalid run state, not exceptional CLI failures.

## current understanding

`run.json` stores criterion-to-evidence references. `validateCompletion` reads each referenced JSON file directly. If the file is absent, the read throws, `eh validate` prints a raw `error:` message, and `eh transition` cannot return its normal validation result.

## allowed scope

- Add a structured `evidence.missing` validation error for an absent referenced evidence record.
- Cover validator and CLI rendering behaviour with tests.
- Record this as dogfood run 2 and add an evidence ledger.

## forbidden scope

- Broad runtime schema validation.
- Missing-log handling, automatic repair, or record reconstruction.
- Changes to evidence capture, workspace fingerprints, transition history, risk gates, or dependencies.

## affected areas

- `protocol/validate-run.ts`
- `tests/protocol/validate-run.test.ts`
- `tests/protocol/cli.test.ts`
- Dogfood and decision records.

## public contract impact

The experimental CLI changes failure output for one invalid persisted state: from a raw filesystem exception to `evidence.missing: <id> evidence record is missing`.

## assumptions and risks

- Missing evidence records represent incomplete or manually damaged run state.
- An explicit validation error gives an agent or reviewer enough information to repair or recapture evidence.
- Other malformed records remain out of scope and may still throw until separately observed and prioritised.

## acceptance evidence

- A new CLI subprocess test observes the old raw exception before implementation.
- Unit and CLI tests pass after the smallest validator change.
- A guarded transition against a missing record remains non-mutating.

## stop conditions

- Returning the error requires changing the on-disk schema or adding a dependency.
- The change must distinguish more than absent evidence files to be useful.
