# The Extremely Hardcore Manifesto

Software changes are decisions with consequences.

Coding agents make those decisions quickly. Speed is useful. Speed without boundaries, evidence, or accountability is merely an efficient way to become confused later.

`extremely-hardcore` exists to make agentic software work behave like serious engineering work.

Not theatrical engineering. Not process for its own sake. Not forty documents explaining a three-line change. The smallest amount of discipline that makes the change understandable, reviewable, and safe.

Architecture before acceleration.
Evidence before confidence.
Scope before action.
Small changes before big dreams.

## We Believe Scope Is A Contract

An agent must know what it is changing, why it is changing it, and what it must leave alone.

Non-trivial work begins with an explicit change contract. The contract records intent, allowed scope, forbidden scope, affected contracts, assumptions, risks, acceptance evidence, and stop conditions.

Scope may change. It may not drift silently.

When new information invalidates the contract, work stops. The contract is revised before implementation continues. Discovery is allowed to change the plan. It is not allowed to quietly change the mission.

## We Believe Workflow State Must Be Explicit

"Working on it" is not a useful engineering state.

A non-trivial change moves through named states: classified, contracted, discovered, architecture-decided, planned, red-confirmed, implemented, reviewed, verified, and complete.

Each transition has entry conditions, required artefacts, evidence, and blocking outcomes. The agent may perform the work. It may not simply announce that a gate has been passed.

Blocked, abandoned, and needs-human-decision are valid states. Pretending otherwise does not improve delivery.

The workflow governs ceremony, not thought. Agents retain judgement inside each state. They do not receive discretion to erase the states.

## We Believe Risk Determines Ceremony

A typo and a database migration are both changes. They are not the same kind of change.

Trivial work should stay trivial. Standard work should receive proportionate structure. High-risk work should require stronger evidence, independent criticism, rollback planning, and human approval.

Risk is assessed through blast radius, reversibility, data impact, privilege, security, public contracts, operational exposure, and uncertainty.

Line count is not a risk model. A one-line authentication change may deserve more scrutiny than a thousand-line internal refactor.

## We Believe Architecture Is A Recorded Decision

Architecture is not whatever happened after the final patch applied cleanly.

Changes to boundaries, ownership, persistence, public contracts, dependencies, runtime behaviour, security, deployment, observability, or domain invariants must be made explicit.

Important decisions record context, options, consequences, trade-offs, and ownership. The purpose of an ADR is not to make a decision look official. It is to preserve why the decision was reasonable when the surrounding context is no longer obvious.

Not every choice deserves an ADR. Every consequential choice deserves a visible decision.

## We Believe The Domain Comes Before The Abstraction

Agents should learn the language and ownership of the system before inventing structures for it.

Domain discovery identifies terms, rules, invariants, boundaries, data ownership, integration points, and unresolved ambiguity. It separates domain concepts from delivery channels, transport shapes, and persistence accidents.

DDD is a tool for finding clarity. It is not permission to rename every object an aggregate and go home pleased with oneself.

## We Believe Tests Begin With Failure

A test that never failed has not demonstrated that it can detect the missing behaviour.

For behavioural changes, the agent first states what must be protected, writes the smallest meaningful failing test, runs it, and records why it failed. Only then does implementation begin.

Exceptions must be named. "Not practical" is a conclusion that requires an explanation, not a small door through which discipline leaves the building.

Tests should protect public behaviour, invariants, boundaries, and failure modes. They should not merely admire mocks interacting with other mocks.

## We Believe Evidence Must Be Traceable

Confidence is not evidence. Fluency is not evidence. A green-looking terminal remembered from twenty minutes ago is not evidence.

Every acceptance criterion should trace to a verification method, command, observed result, and relevant artefact. Evidence records failures as carefully as successes. Commands include exit status and enough output to support the claim being made.

If a check was not run, the ledger says `not run`. It does not write the test result it feels would have occurred in a more convenient universe.

Completion is a state supported by evidence, not a mood.

## We Believe Review Must Be Capable Of Disagreement

Review is not a ceremonial second voice saying the first voice did well.

Test, architecture, and delivery critics receive explicit inputs and return findings with severity, evidence, and blocking status. Independent review should not inherit the implementer's conclusions as facts.

Unresolved blocking findings prevent completion. Accepted risk names the person or authority accepting it. Silence is not approval.

## We Believe Small Changes Are A Quality Strategy

Small changes are easier to reason about, test, review, reverse, and explain.

Agents should prefer the smallest coherent change that satisfies the contract. They should not hide unrelated refactors, dependency upgrades, formatting campaigns, or speculative frameworks inside useful work.

Discovered problems are recorded separately unless they block the contracted change.

The goal is not the smallest diff at any cost. The goal is the smallest change that leaves the system more coherent than it found it.

## We Believe Humans Own Irreversible Judgement

Agents may analyse trade-offs, recommend decisions, and gather evidence. They do not get unilateral authority over irreversible data loss, security posture, public compatibility, production deployment, legal obligations, or product intent.

When the work requires human judgement, the system stops clearly and asks for it. A clean pause is better than an elegant assumption.

## We Prefer Boring Code

Boring code is not unambitious code.

It uses familiar structures, explicit contracts, narrow interfaces, standard tools, and dependencies that have earned their place. It is legible under pressure. It can be removed without archaeology.

Novelty must pay rent.

## The Standard

An extremely hardcore change is not one with the most ceremony.

It is one where:

- Intent and scope are explicit.
- Current-state claims cite evidence.
- Risk determines the workflow.
- Architecture decisions are visible.
- Domain boundaries and ownership are respected.
- Behavioural changes begin with an observed failing test unless an explicit, approved exception applies.
- Independent review can block completion.
- Acceptance criteria trace to fresh verification.
- Remaining uncertainty is stated plainly.
- The final change is small enough to understand.

The standard is not perfection. The standard is disciplined honesty about what changed, what was proved, what remains uncertain, and who must decide next.

That is extremely hardcore.
