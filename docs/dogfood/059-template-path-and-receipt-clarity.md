# Template paths and receipt vocabulary

## Work receipt

- result: complete
- claim: Skill template references now identify their local base; two fresh
  handoff probes used the existing exact receipt vocabulary.
- evidence: Eight template links resolve; scaffold validation and 13 validator
  tests pass. Parent inspected a saved receipt and both agents' final responses.
- remaining uncertainty: Single trials with supplied task facts, not independent
  product verification, automatic discovery, efficiency, or broad adherence proof.
- next: Review this bounded clarification, then establish comparison prerequisites.

## Change and verification

Seven skills now use relative Markdown template links explicitly based on their
own `SKILL.md`, rather than ambiguous inline paths. The evidence-ledger entrypoint
states the existing four result values and places explanatory prose in other
fields. No receipt schema, approval gate, runtime, or template shape changed.

Historical failures are recorded in probes 056-058. Two fresh native agents,
without parent conversation history or an explicit model override, received the
revised ledger skill and task facts, but no expected receipt values:

- `01a0c002-1823-7891-bd6d-2494ce3a16b2`: requested durable handoff for a reported
  completed fix. The parent inspected `/tmp/ehs-receipt-probe.qNq0Ea/completed.md`:
  `result: complete`, all five receipt fields, and tests clearly agent-declared.
  The worker reported reading the skill-local template with no failed lookups;
  this path trace is worker-reported, not independently captured tool telemetry.
- `01a0c002-18d3-7ce1-bc51-7988dd8a6dd2`: conversational handoff for a security
  change lacking approval. Final response used `result: needs-human-decision`,
  acknowledged tests were not run, and requested the missing owner decision.
  It reported no template read, exercising the entrypoint-only wording.

The saved handoff claims document preparation complete, not independently verified
product correctness. Neither probe executed implementation or established a
comparative improvement. Temporary output is not durable evidence storage; the
observations above are retained here without claiming generalisation.
