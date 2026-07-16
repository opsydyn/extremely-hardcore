# issue: constrain Codex responses to the global observation vocabulary

## outcome

Remove identifier-formatting variance from Codex adapter assessment by exposing the complete global behavioural observation vocabulary in the response schema, canonical scenario input, and prompt.

## acceptance criteria

- The adapter derives one ordered global vocabulary from all `agent-attempt` scenario expected codes.
- The response schema and prompt expose that complete vocabulary, not a scenario-specific expected answer.
- The parser rejects codes outside the global vocabulary even if a provider ignores the schema.
- Existing strict assessment still determines whether the model selected the correct code for the scenario.
- No live Codex call, scenario expansion, benchmark claim, or comparison rerun occurs in this slice.

## non-goals

- Semantic normalization of arbitrary provider prose or identifiers.
- Giving a per-scenario expected code to Codex.
- Changing the assessor, provider setup, or policy taxonomy.
