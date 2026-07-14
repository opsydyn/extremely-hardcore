# issue: report missing evidence records without crashing validation

## outcome

When a run references an evidence ID whose JSON record is absent, `eh validate` and `eh transition` must reject the run with a structured, actionable validation error instead of surfacing a raw filesystem exception.

## acceptance criteria

- A referenced missing record produces `evidence.missing` with the exact evidence ID.
- `eh validate` exits non-zero and renders that validation error without an `error:` exception wrapper.
- A rejected transition still leaves `run.json` and `transitions.jsonl` unchanged.

## non-goals

- General runtime schema validation.
- Recovery, reconstruction, or deletion of orphan logs.
- Missing-log handling.
- New lifecycle states, dependencies, or external storage.
