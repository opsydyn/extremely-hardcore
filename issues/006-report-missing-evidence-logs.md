# issue: report missing evidence logs without crashing validation

## outcome

When an evidence record references a missing log file, validation reports a structured error and guarded completion remains non-mutating.

## acceptance criteria

- A missing referenced log produces `evidence.log-missing` with the evidence ID and log path.
- `eh validate` exits non-zero and renders the structured error without an `error:` exception wrapper.
- A run with previously captured evidence is rejected as stale after the workspace changes, then can complete after all evidence is refreshed.

## non-goals

- General malformed JSON or schema validation.
- Reconstructing logs or rewriting evidence records.
- New lifecycle states, dependencies, or external storage.
