# bounded-context review: pressure-scenario corpus

## proposed change

Extend the evaluation manifest with 13 adapter-assessed behavioural scenarios and explicit execution modes, while preserving the deterministic runner's ownership of the existing seven protocol fixtures.

## affected contexts

- Evaluation core: scenario definitions, taxonomy, and attempt assessment.
- Evaluation runner: filters and executes deterministic scenarios.
- Protocol: unchanged producer of its real validation codes.
- Future adapters: consumers of agent-attempt scenario definitions only.

## allowed dependencies

`future adapters -> evaluation manifest and assessor`; `evaluation runner -> evaluation manifest -> protocol`. Protocol must not import evaluation or adapters.

## suspicious dependencies

Provider SDKs, prompt templates, transcript parsers, CI/reporting systems, or protocol imports of behavioural-only codes.

## data ownership

The manifest is static evaluation data. Protocol state and run artefacts remain protocol-owned. No adapter data is persisted in this slice.

## transaction boundaries

None. Manifest validation and attempt assessment are pure in-memory operations; deterministic scenarios continue to use temporary workspaces.

## integration events

None. A future adapter may submit an `AgentAttempt`, but no transport or persistence boundary is introduced now.

## anti-corruption needs

Execution mode prevents behavioural expectations from leaking into claims about actual protocol CLI output.

## verdict

safe with noted risk. The taxonomy becomes a broader experimental contract, but execution mode preserves the boundary between core facts and future adapter observations.
