# domain map: decision challenge

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Decision challenge | A bounded adversarial review of a high-consequence proposal before implementation planning. | Skill workflow |
| Product claim | A statement about capability, isolation, evaluation, or differentiation that needs independent evidence. | Proposal author |
| Claim-to-evidence map | The explicit link between each claim and a verifying artifact or test. | Decision record |
| Stop condition | A falsifiable condition requiring hold or redesign. | Decision record |
| Dogfood review | Applying the skill to this repository's own proposed change. | Repository maintainers |

## candidate bounded contexts

- Skill workflow: decides whether a challenge is required and records the result.
- Architecture governance: owns ADRs for architecture, provider, security, or public-contract decisions.
- Evaluation fixture: remains provider-neutral and owns observable task scoring.
- Provider adapter: future executor-only integration; not changed by this slice.

## aggregates/entities/value objects

- `DecisionChallengeRecord`: proposal, trigger reasons, claims, counterarguments, verdict, and stop conditions.
- `ChallengeVerdict`: `proceed`, `hold`, or `needs-human-decision`.
- `ClaimEvidence`: one claim, its current evidence, and its evidence gap.

## commands

- Challenge a proposal.
- Record a decision.
- Dogfood the challenge against a repository proposal.

## events

- Challenge completed.
- Proposal held for redesign.
- Human decision required.

## policies/rules

- Trigger only for external execution, architecture/security boundaries, public contracts, product differentiation claims, or benchmark claims.
- A challenge must state the strongest reason not to build the proposal.
- A `hold` verdict blocks implementation planning until the named gap is resolved or explicitly narrowed.
- The challenger advises; it never changes code or scores provider output.

## invariants

- Every verdict has concrete repository evidence and falsifiable stop conditions.
- The decision record distinguishes observed facts from assumptions.
- Existing completion evidence remains authoritative for implementation claims.

## external systems

- Coding-agent providers are only relevant when a proposal introduces provider execution.

## integration points

- `change-contract` may trigger `decision-challenge`.
- `architecture-decision` records durable consequences when the trigger crosses a boundary.
- `writing-plans` may proceed only after a `proceed` verdict or an accepted narrowed redesign.

## ambiguity

The precise template format and whether reviews are performed by a subagent or the primary agent remain implementation choices; the required output is fixed.

## recommended next questions

Should an accepted `hold` require an ADR update, or only a decision record, when no architectural change is made?
