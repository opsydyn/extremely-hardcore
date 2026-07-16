# bounded-context review: canonical Codex observation vocabulary

## proposed change

Expose a derived global observation vocabulary at the existing Codex adapter boundary and enforce it when parsing structured final responses.

## affected contexts

- Evaluation core: derives vocabulary from behavioural scenario expectations.
- Codex adapter: serializes and validates the vocabulary.
- Assessor: unchanged strict comparison.
- Protocol and baseline evaluator: unchanged.

## allowed dependencies

`Codex adapter -> AGENT_ATTEMPT_SCENARIOS -> scenario expectations`; the adapter may not write to scenario definitions or import protocol state.

## suspicious dependencies

Provider-specific alias maps, natural-language normalization, duplicate vocabulary constants, or changed assessment semantics.

## data ownership

The vocabulary is derived in memory and written only to caller-owned adapter artifacts. The manifest remains source of truth.

## transaction boundaries

Schema and input artifacts are written before execution. Parser rejection prevents the aggregate report when a response violates the vocabulary.

## integration events

No new events. A future real run consumes the existing Codex CLI boundary.

## anti-corruption needs

Global vocabulary constrains provider output while preserving the assessor's distinction between a valid code and the correct code.

## verdict

safe. The change tightens an experimental adapter boundary without changing the protocol or assessment domain.
