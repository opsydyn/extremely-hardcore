# domain map: missing evidence logs

## terms and ownership

| Term | Owner | Rule |
| --- | --- | --- |
| Evidence record | `evidence/<id>.json` | Names the captured log and expected digest. |
| Evidence log | `logs/<id>.log` | Is required to validate the evidence record's digest. |
| Acceptance criterion | `run.json` | Cannot be proved when its referenced evidence log is absent. |
| Validation error | `validateCompletion` | Classifies missing required artefacts without mutating run state. |
| CLI | `scripts/eh.ts` | Renders protocol-level validation errors. |

## invariant

Evidence without its referenced log cannot justify completion because the claimed digest cannot be recomputed.

## integration boundary

Filesystem access is an internal validation concern. A missing log is translated into the protocol error `evidence.log-missing`; the CLI must not expose a raw adapter error.

## ambiguity retained

Malformed log paths, permissions failures, and malformed evidence JSON are separate invalid states and remain outside this dogfood fix.
