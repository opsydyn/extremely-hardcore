# domain map: canonical Codex observation vocabulary

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Observation vocabulary | Ordered set of all canonical behavioural codes that Codex may emit. | Evaluation core |
| Scenario expectation | Canonical code(s) required for one scenario to pass strict assessment. | Evaluation core |
| Allowed code | A member of the global vocabulary accepted by the adapter parser. | Codex adapter |
| Strict match | An attempt containing every scenario expectation. | Evaluation assessor |

## candidate bounded contexts

- Evaluation core owns scenario expectations and the global vocabulary derivation.
- Codex adapter owns response-schema generation, prompt/input exposure, and parser enforcement.
- The assessor remains the sole owner of pass/fail comparison.

## policies/rules

- The global vocabulary is derived from agent-attempt scenarios; it is not maintained as a second hand-written list.
- Every Codex invocation receives the same vocabulary.
- A final response may contain only vocabulary members.
- The adapter does not transform aliases or infer intended codes.

## invariants

- The schema, prompt, and input artifact contain the same ordered vocabulary.
- A response code outside that set blocks an aggregate report.
- A valid but incorrect vocabulary member remains a strict assessment failure.

## external systems

Codex CLI consumes the generated schema and prompt. No live invocation is needed to verify this contract.

## ambiguity

Whether a later behaviour fixture should use a different response vocabulary is deferred until classification measurements are repeated.

## recommended next questions

After repeated controlled runs, do scenario fixtures need to model actual repository actions rather than policy classification?
