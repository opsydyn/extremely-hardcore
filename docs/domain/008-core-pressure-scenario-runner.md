# domain map: core pressure-scenario runner

## terms and ownership

| Term | Owner | Rule |
| --- | --- | --- |
| Pressure scenario | Evaluation module | Reproduces one gate condition in an isolated workspace. |
| Failure category | Evaluation taxonomy | Names the class under test, independent of a specific error code. |
| Expected error codes | Scenario | Defines the observable protocol behaviour required for a pass. |
| Observed error codes | Runner | Captures validation or transition outcomes without prose parsing. |
| Evaluation report | Runner | Aggregates deterministic results for later comparison. |
| Agent adapter | Future integration | May supply attempts later but is not owned by this slice. |

## invariants

- A scenario passes only when every declared expected error code is observed, or when a declared success condition occurs.
- Results retain expected and observed values so a failure is diagnosable without re-running the scenario.
- The stale scenario mutates a tracked file after capturing its fingerprint.

## contexts

The protocol owns validation and transitions. Evaluation owns isolated setup, expectation matching, and reporting. The Bun script is a delivery adapter over evaluation. No agent, model, or hosted system is in the dependency graph.

## ambiguity retained

How external agents create attempts, how baselines without the skill are collected, and what thresholds block merges are deferred until this deterministic contract is stable.
