# bounded-context review: pinned Codex model configuration

## proposed change

Add a required requested-model field at the existing Codex CLI adapter boundary, forward it to `codex exec`, and retain it in adapter provenance.

## affected contexts

- Evaluation CLI: parses the operator's declared configuration.
- Codex adapter: creates external process arguments and provenance artifacts.
- Evaluation core and assessor: unchanged consumers of attempts and assessments.

## allowed dependencies

`evaluation CLI -> Codex adapter -> local Codex CLI`; the adapter may extend its own report type but may not infer provider state from stderr or modify scenario expectations.

## suspicious dependencies

Provider SDK imports, model-default lookup calls, parsing transient provider logs, or configuration ownership leaking into the assessor.

## data ownership

The operator owns the requested value. The adapter writes it only into caller-owned artifacts. The provider owns actual serving-model routing.

## transaction boundaries

Argument validation completes before output-directory creation or external execution. Each scenario receives the same immutable options value.

## integration events

No new event or package boundary. The existing external-process invocation gains one documented argument.

## anti-corruption needs

Label the field `model` as requested configuration and do not claim it verifies backend routing.

## verdict

safe with noted risk. The adapter API becomes intentionally stricter, while provider-side routing remains unverified.
