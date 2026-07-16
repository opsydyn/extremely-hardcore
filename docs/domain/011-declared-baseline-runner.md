# domain map: declared baseline runner

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Baseline declaration | A caller statement that its attempts were made without `extremely-hardcore`. | External harness |
| Baseline input | One complete set of structured attempts for the agent-attempt corpus. | External harness |
| Baseline runner | Validates coverage and applies the evaluation-core assessor. | Evaluation core |
| Baseline report | Machine-readable results and aggregate counts for one declared input. | Evaluation core |
| Provenance | Raw prompts, transcripts, and harness configuration required to audit a declaration. | Future adapter or harness |

## candidate bounded contexts

- Evaluation core owns corpus membership, structural validation, assessment, and summary calculations.
- Delivery CLI owns file input, JSON output, and exit status.
- External harness owns generation and truthfulness of attempts and the declaration.

## policies/rules

- A baseline is complete only when it has exactly one attempt for each `agent-attempt` scenario.
- Deterministic scenarios cannot appear in baseline input.
- An invalid input fails before an aggregate report is produced.
- A declaration labels the data but does not establish trusted provenance.

## invariants

- Report result ordering follows the manifest's agent-attempt order.
- Summary counts equal the report results.
- The baseline runner never invokes an agent.

## external systems

None. Future agent harnesses are input producers only.

## ambiguity

No persistence or retry model exists for partial baselines. Raw-artifact retention and independent provenance remain deferred.

## recommended next questions

Which portable prompt and transcript artefacts must the first real adapter preserve to make a declared baseline auditable?
