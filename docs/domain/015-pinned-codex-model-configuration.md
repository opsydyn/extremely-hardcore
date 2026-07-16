# domain map: pinned Codex model configuration

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Requested model | Caller-selected Codex CLI model identifier for one adapter run. | Evaluation operator |
| Invocation provenance | Per-scenario record of the exact command configuration requested. | Codex adapter |
| Adapter report | Aggregate, reviewable record of a run's declared configuration and assessments. | Codex adapter |
| Serving model | Backend model that actually served a request. | Codex provider |

## candidate bounded contexts

- Evaluation operator selects the requested model at the CLI boundary.
- Codex adapter validates, forwards, and records that selection.
- Codex provider owns actual routing and any model availability behaviour.
- Evaluation assessor remains independent of model configuration.

## policies/rules

- A Codex evaluation must name one non-empty requested model.
- Every scenario in a run uses that same requested value.
- The report and invocation artifacts preserve the requested value.
- Requested configuration is not misrepresented as independently verified serving provenance.

## invariants

- `--model` appears once in every generated Codex execution command.
- The report model equals the value passed to every invocation.
- Mode, sandbox, scenario content, and assessment semantics do not change.

## external systems

The locally installed Codex CLI accepts the model option and invokes the remote provider.

## ambiguity

Provider-side aliases and backend routing are outside adapter control; a future provider receipt contract would be required to verify them.

## recommended next questions

After three controlled repetitions, are results stable enough to justify richer action-level fixtures?
