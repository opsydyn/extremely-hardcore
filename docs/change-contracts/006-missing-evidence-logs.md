# change contract: missing evidence log validation

## intent

Fix a second persisted-artifact validation bug and dogfood the stale-evidence gate against a real workspace change.

## current understanding

Evidence records store a relative log path and digest. `validateCompletion` reads that log directly; if it is absent, the filesystem exception bypasses `ValidationResult`. The previous run fixed the equivalent missing evidence-record path but deliberately left missing logs out of scope.

## allowed scope

- Add one structured `evidence.log-missing` validation error.
- Cover validator, CLI, and non-mutating transition behaviour.
- Capture baseline proof, demonstrate staleness after this code change, refresh, and complete dogfood run 4.

## forbidden scope

- Generic schema validation, log reconstruction, or orphan cleanup.
- Evidence capture changes, protocol schema changes, risk gates, CI, or dependencies.

## affected areas

- `protocol/validate-run.ts`
- Validator and CLI regression tests.
- ADR, domain, bounded-context, dogfood, and evidence records.

## public contract impact

The experimental CLI reports `evidence.log-missing: <id> log is missing at <path>` for an absent referenced log instead of exposing a raw filesystem exception.

## assumptions and risks

- Log availability is required to verify the digest and therefore required for completion.
- Other filesystem failures remain exceptions unless separately observed.

## acceptance evidence

- The first missing-log tests fail with raw `ENOENT` before implementation.
- A run with baseline evidence produces `evidence.stale` after tracked changes.
- Refreshed evidence validates and completes.

## stop conditions

- The fix requires changing the evidence schema or capture command.
- A missing log cannot be unambiguously distinguished from another filesystem failure.
