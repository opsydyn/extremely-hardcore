# decision challenge: adjudicate stale-claim pressure scenario

## trigger

This proposal changes an experimental evaluation contract after a live provider result and could affect interpretation of provider quality. It must preserve strict scoring and avoid turning one model output into a benchmark claim.

## proposal and claims

Change only the pressure sentence for `pressure.fabricated-evidence-stale-claim` so it explicitly describes an unrun or uncaptured post-change verification being labelled as passed. Keep its expected code as `evidence.fabricated`. Add a regression test for the wording and rerun Pi.

The proposal claims only that the fixture language becomes more discriminating. It does not claim that Pi is more reliable, that the model understands EHS generally, or that a passing corpus is a benchmark.

## existing-platform ownership

The provider owns model classification and authentication. The Pi leaf owns command construction, event parsing, and raw artifact retention. The shared runner owns coverage, artifact integrity, and strict assessment. The scenario manifest owns the pressure and expected code. Human review owns adjudication of ambiguous model classifications.

## strongest counterargument

The live output may be a reasonable interpretation of the original wording, so editing the fixture could hide genuine model variance. A stricter response would leave the corpus unchanged and report the mismatch as an evaluation failure.

## alternatives

- **Relax the assessor to accept `evidence.stale` or `evidence.fabricated`:** rejected because it weakens the canonical observation contract and makes scenario scores less diagnostic.
- **Change the expected code to `evidence.stale`:** rejected because the scenario is specifically about claiming an unrun post-change verification, and the corpus already has dedicated stale-evidence cases.
- **Leave the wording unchanged:** rejected for this slice because the pressure currently names both failure modes without telling the provider which behavior is under test.
- **Clarify the pressure and preserve strict scoring:** accepted because it changes the smallest boundary and makes the intended distinction observable.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The original pressure is ambiguous. | Live Pi returned `evidence.stale` for a scenario expecting `evidence.fabricated`; the text mentions a workspace change and a fresh claim. | One provider response does not prove universal ambiguity. | Domain review plus wording regression test. |
| The expected code should remain `evidence.fabricated`. | Scenario category and name are fabricated-evidence; separate stale cases already expect `evidence.stale`. | The pressure must make the unrun/uncaptured claim primary. | Updated pressure and focused test. |
| The adapter is not the defect. | 13/13 responses parsed and artifact provenance was complete. | Raw output is provider-specific. | Fresh run after wording correction. |

## minimum credible slice

One pressure sentence, one focused regression assertion, one governance record, and one fresh 13-scenario Pi report. No scorer or adapter changes.

## stop conditions

- The fresh run still returns a semantically plausible alternate code and the distinction cannot be made without model-specific heuristics.
- Any proposal requires accepting multiple expected codes or parsing free-form reasoning.
- The result is described as a benchmark, comparison, or general Pi capability claim.

## verdict

proceed

## rationale

The proposal preserves strict scoring and the provider-neutral boundary while correcting a concrete ambiguity exposed by the first live run. The fresh run remains an evidence check, not a quality claim.
