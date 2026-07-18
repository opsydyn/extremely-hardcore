# change contract: decision challenge

## user intent

Add a reusable adversarial and Socratic decision-challenge skill, then dogfood it against the proposed live Codex action-fixture adapter before implementation planning resumes.

## current understanding

The provider-neutral fixture runner is complete, but an adversarial review established that its copied workspace cannot itself create protocol evidence or a completion transition. A live provider adapter would therefore measure only the known source patch unless the fixture boundary changes. The current skills provide planning and implementation discipline but no explicit claim-to-evidence challenge gate.

## allowed scope

- Add one decision-challenge skill with a bounded trigger rubric and structured output.
- Add a dogfooding decision record for the live Codex adapter proposal.
- Record the architecture decision, domain map, and bounded-context review.
- Add focused skill tests or fixtures if the existing skill-testing convention supports them.

## forbidden scope

- No live provider invocation, adapter implementation, fixture/protocol changes, network isolation claim, comparison policy, or regression threshold.
- No mandatory adversarial review for trivial or local changes.
- No automatic scope expansion or implementation edits based only on a challenge result.

## affected areas

- `skills/decision-challenge/`
- `docs/adr/0013-decision-challenge-gate.md`
- Decision, design, and evidence documentation for the live Codex adapter proposal.

## public contracts

The skill exposes a structured decision record with a verdict: `proceed`, `hold`, or `needs-human-decision`. Existing protocol, fixture, provider, and CLI contracts remain unchanged.

## assumptions

The challenge is a planning and governance artifact. It can require a redesign before implementation but does not replace test-first implementation, code review, or proof-carrying completion.

## risks

An unbounded critic can become process theatre or veto useful work indefinitely. The trigger rubric, claim-to-evidence map, and explicit stop conditions constrain that risk.

## acceptance evidence

- A documented trigger rubric distinguishes high-consequence decisions from ordinary edits.
- The dogfood record identifies the fixture self-sufficiency gap and reaches `hold` without changing runtime code.
- The skill output names duplication, strongest counterargument, minimum credible slice, evidence gaps, and falsifiable stop conditions.

## stop conditions

- Stop if the skill needs to own implementation planning, runtime scoring, or provider execution.
- Stop if the dogfood review cannot state a falsifiable conclusion from repository evidence.
