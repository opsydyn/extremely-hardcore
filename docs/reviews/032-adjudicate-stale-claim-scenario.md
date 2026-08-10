# bounded-context review: adjudicate stale-claim pressure scenario

## proposed change

Clarify one provider-facing pressure sentence and add a regression assertion so an unrun or uncaptured post-change verification is evaluated as `evidence.fabricated`, while the existing stale-evidence scenarios retain `evidence.stale`.

## affected contexts

- The pressure-manifest context owns the scenario wording, category, and expected code.
- The evaluation-test context protects the intended distinction.
- The Pi leaf and shared runner are consumers only; neither changes in this slice.
- The protocol context is unaffected.

## allowed dependencies

- The scenario manifest may be read by its existing tests and adapter prompt builder.
- The focused test may import the existing pressure manifest.
- Governance records may reference the retained live reports.

## suspicious dependencies

- Adding scorer exceptions for Pi.
- Passing expected codes or hidden rubric details into provider prompts.
- Parsing model reasoning or free-form text to repair a classification.
- Changing the shared adapter contract to accommodate one ambiguous pressure.

## data ownership

The manifest owns pressure semantics. The provider owns its response. The shared runner owns strict assessment and artifact integrity. Raw Pi output remains outside the repository under caller-selected `/tmp` directories.

## transaction boundaries

None. This is a source/test/documentation change with no persistence, runtime, or deployment transaction.

## integration events

None. No protocol event, provider call, or adapter report feeds EHS runtime state.

## anti-corruption needs

Keep the provider-neutral observation vocabulary and strict assessor unchanged. Treat extra observations as provider output, not as a reason to alter the canonical expected code.

## verdict

safe with noted risk

The boundary is preserved and the wording correction is local. Live classification remains stochastic and the retained raw artifacts require review before sharing.
