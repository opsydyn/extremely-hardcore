# bounded-context review: missing evidence logs

## proposed change

Translate an absent log referenced by an evidence record into `evidence.log-missing` during completion validation.

## contexts and dependencies

Protocol validation owns the rule. Filesystem reads remain inside `protocol/validate-run.ts`. The CLI consumes the unchanged `ValidationResult` contract. Allowed direction remains `CLI -> protocol -> Node standard library`.

## data and transaction boundary

Validation stays read-only. Transition validation happens before JSONL append, so missing logs reject without changing run data or history.

## suspicious changes

Do not add log repair, capture retries, path sanitisation, or a schema library in this bug fix.

## verdict

safe. This normalises a known persisted-artifact absence without changing ownership or the on-disk schema.
