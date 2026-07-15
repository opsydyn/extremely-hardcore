# bounded-context review: agent-attempt evaluation contract

## proposed change

Add a manifest and pure assessor inside the evaluation context. Future adapters may depend on these types but are not implemented here.

## allowed dependencies

`future adapter -> evaluation/attempts.ts -> evaluation/scenarios.ts`.

The deterministic runner also depends on the manifest. Evaluation may depend on protocol for scenario execution. Protocol must not import evaluation or adapters.

## ownership and transaction boundary

The manifest and assessment are pure in-memory data. No protocol artefact, filesystem state, or agent transcript is written.

## suspicious dependencies

Do not introduce provider SDKs, HTTP clients, persistence, or test-runner output parsing.

## verdict

safe with noted risk. The result contract is a new experimental surface; its small shape and explicit lack of trust semantics reduce lock-in before real adapters exist.
