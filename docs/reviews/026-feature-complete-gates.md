# bounded-context review: feature-complete gates

## proposed change

Extend the local protocol with bounded lifecycle states and approvals, add evaluation policy and controlled dogfood orchestration, and expose derived delivery artefacts through CLI/CI adapters.

## affected contexts

- Protocol owns state, approvals, fingerprints, and validation.
- Evaluation consumes scenario contracts and does not mutate protocol semantics.
- Agent experience reads protocol state and documents commands.
- Delivery consumes validation output and writes derived artefacts.
- Dogfood creates temporary fixtures and reports metrics.

## allowed dependencies

- Protocol may use standard-library filesystem, hashing, and time utilities.
- Evaluation may import protocol and scenario contracts.
- Delivery may import protocol summaries and validation.
- Dogfood may import the public CLI-facing protocol functions.

## suspicious dependencies

- Protocol importing skills, agents, CI YAML, or provider adapters.
- Delivery changing run state or accepting agent prose as evidence.
- Evaluation changing scoring rules based on provider output.
- Dogfood writing into the repository's active run directories.

## data ownership

The run directory owns `run.json`, evidence, transitions, and approvals. Protocol validation is the semantic authority. Summaries, attestations, and dogfood reports are derived outputs and are never read back as protocol state.

## verdict

safe with noted risk

The design preserves dependency direction and local ownership. The main residual risks are experimental schema growth, concurrent writers, and the difference between controlled fixtures and real operator dogfood.
