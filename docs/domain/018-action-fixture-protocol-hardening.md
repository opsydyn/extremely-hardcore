# domain map: action-fixture protocol hardening

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Pinned run contract | Initial `run.json` excluding refreshable criterion evidence references. | Fixture runner |
| Evidence command binding | Exact executable and argv required for evidence referenced by the fixture criterion. | Fixture runner |
| Invalid run state | Missing or malformed executor-owned run data that must produce a report. | Fixture runner |
| Retained artifact | Fixture output included in `ActionFixtureResult.artifacts`. | Fixture runner |

## candidate bounded contexts

- The fixture runner owns request-specific integrity checks and report safety.
- Protocol continues to own generic evidence and transition validation.
- Executors own their work and protocol writes, but cannot redefine the fixture contract.

## policies/rules

- Evidence references may change; all other initial run-contract content must remain unchanged.
- Criterion evidence must record the exact requested executable and argument vector.
- Missing or malformed run JSON is invalid fixture state, not a thrown runner error.
- Symlinks are never hashable workspace inventory entries or retained artifacts.

## invariants

- Existing staged semantics and public result types remain unchanged.
- Integrity failures retain a machine-readable report.
