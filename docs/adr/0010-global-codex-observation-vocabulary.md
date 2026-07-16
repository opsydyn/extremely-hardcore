# adr: global Codex observation vocabulary

## status

accepted

## context

The first controlled Codex comparison produced semantically correct summaries but many strict assessment failures because the adapter accepted arbitrary strings and did not state canonical observation codes. Normalizing arbitrary aliases after the fact would hide response-contract ambiguity; supplying each scenario's expected code would leak the answer.

## decision

Derive one ordered global vocabulary from every agent-attempt scenario's expected codes. Include it in the Codex response schema, scenario input artifact, and prompt. Reject any final-response code outside this vocabulary. Keep per-scenario strict assessment unchanged.

## consequences

- Identifier-formatting variance no longer confounds strict assessment.
- Codex chooses among a common set of candidate codes rather than receiving the answer to a scenario.
- The adapter remains a constrained classification harness, not an end-to-end behavioural benchmark.

## options considered

### Normalize arbitrary provider aliases

Rejected because inferred mappings can conceal incorrect or ambiguous observations.

### Put each expected code in its scenario schema

Rejected because it would make each answer mechanically discoverable.

### Use one global derived vocabulary

Accepted because it controls output formatting while retaining meaningful scenario selection.

## trade-offs

The vocabulary itself provides evaluation context and may make classification easier. That is acceptable for measuring selection accuracy, but it does not validate action-level compliance.

## follow-up work

Repeat controlled declared-mode runs, then decide whether behaviour fixtures need richer task environments.

## review date

After the first repeated controlled run set.
