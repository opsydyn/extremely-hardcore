# bounded-context review: vendor-agnostic adapter contract

## proposed change

Add a provider-neutral read-only adapter contract and runner under `evaluation/`, with provider artefacts retained and integrity-checked by the runner.

## affected contexts

- Evaluation contract owns requests, report shape, coverage, and scoring orchestration.
- Scenario manifest owns expected observations.
- Provider leaf adapters own runtime invocation, sessions, parsing, and artefacts.
- Containment and human review remain outside the shared runner.

## allowed dependencies

- The shared runner may import `core-scenarios`, `assess-agent-attempt`, and standard-library hashing/filesystem APIs.
- Provider adapters may implement the shared interface and may depend on their own runtime APIs.
- The scorer may consume only the normalized `AgentAttempt` returned by the adapter.

## suspicious dependencies

- `protocol/` importing the adapter contract.
- The shared runner importing Codex, Claude, Pi, AgentOS, or provider SDKs.
- The shared runner parsing raw provider events or constructing provider flags.
- Capability metadata changing scenario scoring.

## data ownership

The adapter owns raw provider artefacts. The runner owns report-level digest validation and normalized attempt assessment. The scenario manifest owns expected codes. No derived report is fed back into protocol state.

## verdict

safe with noted risk

The dependency direction is sound if the contract stays read-only and provider-free. The remaining risk is future pressure to add sessions, writes, or sandbox semantics to the lowest-common-denominator interface; those must split into separate contracts.
