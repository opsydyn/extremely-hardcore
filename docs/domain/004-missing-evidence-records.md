# domain map: missing evidence records

## terms and ownership

| Term | Owner | Rule |
| --- | --- | --- |
| Change run | `run.json` | References evidence required by each criterion. |
| Acceptance criterion | `run.json` | Is not proved when its referenced evidence record is unavailable. |
| Evidence record | `evidence/<id>.json` | Supplies command result and fingerprint for a referenced ID. |
| Validation error | `validateCompletion` | Explains invalid run state without mutating it. |
| CLI | `scripts/eh.ts` | Renders protocol validation results and selects exit status. |

## invariant

A criterion that references a missing evidence record cannot justify completion. The absence belongs to run validation, not to transport or filesystem error presentation.

## integration boundary

The filesystem adapter reads records. It must translate an absent record into a protocol-level validation error before the CLI renders output. No external systems or new context ownership are involved.

## ambiguity retained

Malformed JSON, incompatible schema versions, and missing log files are distinct invalid states. They are deliberately excluded from this bug fix until a dogfood run shows their operational impact.
