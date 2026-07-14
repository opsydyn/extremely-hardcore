# bounded-context review: missing evidence records

## proposed change

Translate a missing `evidence/<id>.json` file into `evidence.missing` during completion validation.

## affected contexts

- Protocol validation owns the rule and error code.
- Filesystem access remains an internal protocol implementation detail.
- The CLI renders the existing `ValidationResult` shape.

## dependencies

Allowed: `scripts/eh.ts -> protocol/validate-run.ts -> Node standard library`.

Suspicious: moving filesystem recovery into the CLI, adding a schema library, or changing evidence capture to repair missing records.

## data and transaction boundary

Validation remains read-only. Transition calls validation before appending history, so a missing record rejects before any mutation.

## verdict

safe. The change preserves dependency direction and data ownership; it only normalises one expected persisted-state failure.
