# bounded-context review: decision challenge

## proposed change

Add a reusable skill that challenges high-consequence proposals before implementation planning and records a bounded verdict.

## affected contexts

- Skill workflow: trigger and record template.
- Architecture governance: ADR captures the decision boundary.
- Evaluation/provider adapter planning: dogfood consumer only.

## allowed dependencies

`change-contract -> decision-challenge -> architecture-decision -> writing-plans`. The challenge may read repository docs, contracts, ADRs, and local tool help. It must not import runtime modules or invoke providers.

## suspicious dependencies

Provider SDKs, evaluation runner imports, protocol mutation, generic agent orchestration, external issue trackers, and automatic implementation agents.

## data ownership

The repository owns decision records and ADRs. The challenge owns no runtime state and writes no provider artifacts.

## transaction boundaries

One proposal review produces one decision record. A `hold` is a planning boundary, not a persistent runtime state transition.

## integration events

Optional subagent review is local and read-only. No provider execution, network call, or repository mutation follows from the verdict.

## anti-corruption needs

The challenge must not let provider transcript claims become fixture scoring facts. It distinguishes declared configuration from independently demonstrated isolation or behavior.

## verdict

safe with noted risk. The workflow adds a governance dependency but leaves runtime and protocol ownership unchanged.
