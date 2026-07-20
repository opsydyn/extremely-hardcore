# implementation plan: dogfood decision-challenge skill

## behaviour to protect

ADR 0012 keeps the bounded fixture runner and deterministic reference executor provider-neutral. ADR 0013 holds the live Codex adapter until a provider process can own the protocol actions it is claimed to demonstrate. The protocol, fixture runner, reference executor, and provider adapter remain unchanged. The scaffold validator must reject an incomplete decision-challenge trigger rubric or record template.

## first failing test

Add focused tests for a complete decision-challenge skill/template, then for each required missing semantic element. Confirm they fail because the scaffold validator only checks presence and generic headings before adding the narrow validation rules.

## smallest implementation

Add the narrow validator rules, restore the complete trigger routing, add the durable differentiated value template/record content, and correct the dogfood self-sufficiency gap. Update the project-native issue, implementation plan, README, and evidence ledger. Commit every tracked review fix before creating the ignored proof-carrying run.

## refactor step

None. Do not alter fixture, protocol, provider, or evaluation-runtime boundaries.

## checks to run

- `bun test scripts/validate.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- `bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill decision-challenge-validated -- bun run check`
- `bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill documentation-complete -- bun test scripts/validate.test.ts`
- `bun run eh transition .extremely-hardcore/runs/019-decision-challenge-skill complete`
- `bun run eh validate .extremely-hardcore/runs/019-decision-challenge-skill`

## rollback plan

Revert the full Task 3 branch change as one commit series, including the decision-challenge skill and template, `AGENTS.md` routing, scaffold validator and tests, decision record, issue, implementation plan, evidence ledger, README, and roadmap status; then remove the ignored local run directory. No protocol state outside the ignored run, public API, provider configuration, persistence, or external system requires migration.

## notes

Live provider execution remains out of scope. The documented `hold` verdict applies only to the live adapter proposal; it does not block this skill documentation and dogfood slice.
