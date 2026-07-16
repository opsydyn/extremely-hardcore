# domain map: pressure-scenario corpus

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Pressure scenario | A reproducible condition that tests whether an agent respects a completion-protocol rule. | Evaluation core |
| Execution mode | Whether the evaluation core can execute the scenario itself or requires an adapter-submitted attempt. | Evaluation core |
| Deterministic scenario | A fixture whose expected protocol error is produced locally by the core runner. | Evaluation runner |
| Agent-attempt scenario | A behavioural case whose observation is supplied later by a provider-neutral adapter. | Future adapter |
| Expected error code | Structured expected observation used by the assessor. | Evaluation core |

## candidate bounded contexts

- Evaluation core owns the corpus, taxonomy, and comparison semantics.
- The protocol owns actual validation and transition error codes.
- Future adapters own invocation, prompts, raw artefacts, and conversion into attempts.

## policies/rules

- Every scenario has one unique ID, category, expected codes, execution mode, and pressure description.
- A deterministic runner executes only deterministic scenarios.
- An agent-attempt scenario cannot be presented as an executed core result.
- An attempt passes only when it reports every expected code.

## invariants

- The corpus contains all required roadmap categories.
- The existing seven protocol fixtures remain deterministic.
- Unknown scenario IDs remain invalid.

## external systems

None in this slice. Provider harnesses remain future adapter concerns.

## ambiguity

The exact prompt fixtures, captured artefacts, retry policy, and baseline comparison rules are deferred until the first adapter and baseline runner are designed.

## recommended next questions

What portable raw artefacts must a future adapter retain so its structured observations can be audited?
