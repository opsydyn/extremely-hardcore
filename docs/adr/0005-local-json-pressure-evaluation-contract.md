# ADR: local JSON pressure-evaluation contract

## status

accepted

## context

Milestone 2 needs reproducible evidence that the gate behaves correctly under pressure, eventually across agents and repositories. The current code has targeted tests but no stable evaluation result contract. Introducing agent orchestration first would couple the product to a harness before the scenario semantics are proven.

## decision

Create a local deterministic evaluation module that runs core protocol pressure scenarios in temporary workspaces and emits one JSON report. A result contains the scenario ID, failure category, expected error codes, observed error codes, pass/fail status, and duration.

The first slice includes seven core gate conditions. Cross-agent adapters, baseline comparisons, result persistence, and regression thresholds are deferred.

## consequences

- Evaluation output is machine-readable and reproducible without a model provider.
- The protocol stays independent of evaluation machinery.
- Later adapters can compare agent attempts against the same scenario and result vocabulary.
- Passing deterministic scenarios does not demonstrate agent compliance or establish benchmark claims.

## options considered

### Start with Codex and Claude orchestration

Rejected because it introduces unavailable credentials, provider variability, and prompt design before defining a stable scenario contract.

### Reuse unit-test output as evaluation results

Rejected because test runner output is not a product-level result format and lacks category and expectation data.

### Local scenario runner with JSON report

Accepted because it establishes reproducible semantics with no external dependency.

## review date

After the first cross-agent adapter or before adding CI merge thresholds.
