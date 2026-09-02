# decision challenge: minimum complete change heuristic

## trigger

The proposal changes the user-facing skill and contract template, and it is informed by a product-differentiation assessment of HumanLayer and Ponytail. The change must remain a small guidance improvement rather than a runtime, optimiser, benchmark, or orchestration feature.

## proposal and claims

Add one minimum-complete-change decision to the `change-contract` skill and one matching template section. The decision asks for the least powerful implementation that fully satisfies the contract, while explicitly preserving validation, security, error handling, accessibility, and architectural fit.

The bounded claim is that this makes unnecessary scope easier to identify and review. It does not claim fewer tokens, lower cost, faster agents, fewer lines, improved provider performance, or a proven skill effect.

## existing-platform ownership

- `change-contract` owns intent, scope, risks, affected areas, public contracts, acceptance evidence, and stop conditions.
- `test-first-implementation` owns implementation planning and test sequencing when executable behaviour changes.
- `evidence-ledger` owns the compact receipt and verification record.
- The installed EHS surface owns engineering behaviour; protocol, orchestration, provider execution, and evaluation remain outside the skill.

## durable differentiated value

The useful EHS value is not a shortest-diff command. It is a small, reviewable change that remains complete, safe, and supported by evidence. Making that choice explicit connects scope control to the existing evidence-first method without introducing a new runtime or evaluator.

## strongest counterargument

The existing allowed and forbidden scope already discourages unnecessary work, so a new field could add ceremony and cause agents to optimise for prose or line count. The proposal is acceptable only if it remains one concise statement, preserves the trivial-edit exemption, and rejects unsafe shortcuts rather than rewarding the smallest diff.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The current contract lacks an explicit minimum-complete-change decision. | `skills/change-contract/SKILL.md` and its template have no matching field or procedure check. | No direct content assertion exists. | Pre-change red assertion and post-change positive assertion. |
| One explicit decision can improve scope review without a new mechanism. | Existing contract already owns scope, risks, and acceptance evidence; the change touches only Markdown. | Operator overhead and ambiguity are unknown. | Real Run 4 dogfood record with timing, friction, and fresh-agent readability. |
| The heuristic will not silently trade away safeguards. | The contract already names public contracts, risks, and stop conditions. | The new wording could still be read as a fewest-lines rule. | Content assertion for the protected obligations plus review of the final diff and wording. |

## minimum credible slice

Update the two `change-contract` Markdown files, add the required governance records, and complete one real protocol run that also exercises the existing `needs-human-decision` handoff. No code, schema, command, dependency, hook, or benchmark change.

## stop conditions

- The wording requires a new schema, validator rule, command, or evaluator.
- The heuristic cannot distinguish a complete solution from a merely short solution.
- The trivial-edit exemption or existing contract fields become less clear.
- The human-decision dogfood path requires lifecycle or status changes.
- The change is described using token, cost, provider, reliability, or competitive claims without new evidence.

## verdict

proceed

## rationale

The proposal is a narrow extension of an existing EHS ownership boundary. The likely benefit is concrete and reviewable, while the principal risk is added ceremony; the contract, wording guardrails, and real dogfood directly test that risk.
