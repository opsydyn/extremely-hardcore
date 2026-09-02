# review: minimum complete change heuristic

## proposed change

Add a concise minimum-complete-change decision to the existing `change-contract` skill and template. The guidance defines minimum as the least powerful complete solution and protects validation, security, error handling, accessibility, and architectural fit.

## review findings

- The diff is limited to the two named Markdown files.
- The trivial-edit exemption remains unchanged.
- No runtime, protocol, schema, command, dependency, adapter, or orchestration surface changes.
- The wording rejects fewest-lines optimisation and does not import competitor-specific syntax or claims.
- The matching skill and template fields are clear enough for a fresh author to use.

## risks

- Requiring one additional statement may add small overhead to non-trivial contracts.
- The repository validator cannot judge whether an agent's chosen change is actually minimal or complete; that remains a review and dogfood concern.

## verdict

safe with noted risk

## follow-up

Use Run 4 to measure operator friction and fresh-agent readability. Do not add scoring, automation, or another schema unless later dogfood shows a concrete need.
