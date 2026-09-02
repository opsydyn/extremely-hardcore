# change contract: minimum complete change heuristic

## user intent

Strengthen the standalone EHS `change-contract` skill with one concise minimum-complete-change decision, based on the external competitor assessment, then dogfood that documentation change as real operator run 4. The guidance must reduce unnecessary scope without turning EHS into a code-size optimiser, runtime, or orchestration framework.

## current understanding

The current `change-contract` skill requires intent, scope, affected areas, public contracts, risks, acceptance evidence, and stop conditions, but it does not explicitly ask for the smallest complete implementation. Its template contains matching headings for those fields but no minimum-complete-change field.

The installed EHS surface is deliberately standalone. Engineering behaviour and a compact work receipt belong in EHS; scheduling, retries, budgets, orchestration, and experiment scoring remain outside it. The repository validator checks skill structure, not the semantic content of individual guidance lines.

The worktree contains the intentional uncommitted Run 2 and Run 3 dogfood changes. Run 4 must preserve them and add only this bounded skill/documentation slice and its records.

## allowed scope

- Update `skills/change-contract/SKILL.md` with one explicit minimum-complete-change output and procedure check.
- Update `skills/change-contract/templates/change-contract.md` with the matching section.
- State that minimality must not trade away validation, security, error handling, accessibility, or architectural fit.
- Create and complete `.extremely-hardcore/runs/036-minimum-complete-change-heuristic/` using the existing protocol.
- Exercise the existing `implemented -> needs-human-decision -> implemented` status handoff during the real dogfood run.
- Add the Run 4 contract, decision challenge, domain map, implementation plan, review, issue, evidence ledger, and dogfood record.

## forbidden scope

- No runtime, protocol, lifecycle, status schema, CLI command, dependency, adapter, evaluator, scheduler, or orchestration changes.
- No new skill, receipt field, benchmark, token/cost claim, provider claim, or competitor-specific syntax.
- No hooks, modes, debt ledger, event bus, or automatic minimum-diff scoring.
- No change to the existing Run 2 or Run 3 source, tests, records, or retained run artefacts.
- No unrelated README, roadmap, policy, or formatting changes.

## affected areas

- `skills/change-contract/SKILL.md` guidance and required output.
- `skills/change-contract/templates/change-contract.md` contract template.
- Run 4 protocol, evidence, governance, and dogfood records.

## minimum complete change

Change only the two `change-contract` Markdown files. Add one required decision stating the least powerful implementation that fully satisfies the contract, one procedure step that checks it, and one guard against unsafe shortcuts. Do not add a new abstraction, command, schema, or validator rule.

## public contracts

This changes the user-facing skill guidance and template: new non-trivial change contracts are expected to state a minimum complete change. No runtime, JSON, CLI, API, persistence, lifecycle, or provider contract changes. No architecture decision record is required because the change stays within existing Markdown skill ownership and does not alter a system boundary, dependency, runtime, or operational mechanism.

## assumptions

- A single explicit decision is enough to make minimality reviewable without adding a separate skill or scoring system.
- "Minimum" means the least powerful complete solution, not the fewest lines or files.
- A real operator can exercise the existing human-decision state with a reason and resume transition without a new decision record or command.
- A content assertion, repository checks, diff review, and real dogfood are sufficient evidence for this documentation behaviour change; a source-code red/green test is not applicable.

## risks

- Agents could interpret the heuristic as permission to remove necessary safeguards; the wording must name the protected obligations explicitly.
- A new required field could add ceremony to otherwise small changes; the field should remain one concise statement and the skill must retain its trivial-edit exemption.
- Evidence fingerprints include the inherited Run 2 and Run 3 work until a commit boundary is approved.

## acceptance evidence

- A pre-change content assertion fails because the two target files do not yet contain the minimum-complete-change guidance.
- The final content assertion confirms both files contain the decision, procedure, and safety guard.
- The real Run 4 path records `implemented -> needs-human-decision`, exposes the existing decision handoff, records `needs-human-decision -> implemented`, and completes normally.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass.
- The fresh run covers all criteria, validates, completes, and produces valid attestation and CI artefacts.
- The dogfood record reports timing, friction, false blocks, workarounds, and fresh-agent readability.

## stop conditions

Stop and record a blocker if the change needs runtime or schema work, the existing human-decision path cannot be exercised, the content assertion or repository checks fail after the edit, the heuristic cannot be stated without unsafe ambiguity, or the diff expands beyond the two target skill files and Run 4 records.
