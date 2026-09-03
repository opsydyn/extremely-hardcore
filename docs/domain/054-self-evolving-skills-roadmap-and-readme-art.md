# Domain map: self-evolving skills roadmap and README art

## domain terms

- **self-evolving skill:** a skill document changed through a bounded,
  evaluated, human-controlled promotion process.
- **candidate skill:** an untrusted proposed copy or diff that has not been
  adopted.
- **protected skill:** an evaluator, policy, promotion, or foundational skill
  that candidate generation cannot change.
- **held-out evaluation:** an independent test split used after candidate
  selection to check generalisation and critical regressions.
- **promotion:** a human-approved adoption decision after evidence review.
- **moat hypothesis:** a differentiator claim that still needs durable,
  repeatable evidence before it can be treated as a product advantage.

## candidate bounded contexts

- **engineering method:** the installed EHS skills and their engineering
  guidance; remains standalone and human-readable.
- **evaluation:** fixtures, baselines, held-out tests, and regression policy;
  judges candidate behaviour without becoming a skill editor.
- **governed evolution:** candidate proposal, review, promotion, and history;
  remains backlogged and human-controlled.
- **repository presentation:** README and static artwork; unrelated to runtime
  skill behaviour.

## aggregates/entities/value objects

No runtime aggregate or schema is introduced. The roadmap refers to candidate
diffs, evaluation reports, promotion records, protected skills, and evidence as
future concepts only.

## commands

- Update the roadmap hypothesis and staged gates.
- Add and reference the supplied static image.
- Validate the documentation-only Run 054.

No candidate generation, optimiser, provider, or adoption command is in scope.

## events

- Run 054 records the roadmap and README change.
- Future candidate proposal, evaluation, and promotion events are not emitted
  by this slice.

## policies/rules

- Self-evolving skills are a hypothesis, not a current moat claim.
- Candidate changes remain untrusted until independent held-out evaluation,
  critical-regression checks, human review, and promotion.
- Protected evaluator and governance skills remain immutable to candidates.
- An external optimiser may propose offline candidates later but cannot adopt
  them.
- README artwork has no bearing on capability or evidence claims.

## invariants

- EHS remains useful without a skill-evolution system.
- Roadmap ambition does not change the current installed skill surface.
- No public runtime, provider, persistence, CI, or protocol boundary changes.
- Product differentiation claims remain subordinate to reproducible evidence.

## external systems

None are contacted. The image is copied from the supplied local attachment;
there is no network fetch or optimiser invocation.

## integration points

The only new presentation integration is a relative README reference to a
tracked static asset. Future evolution work would integrate with evaluation
and human review, but those boundaries remain unimplemented.

## ambiguity

The roadmap does not choose an optimiser, mutation strategy, evaluator model,
storage owner, or promotion workflow. Those choices require a separate design
after the current evaluator and provider evidence are credible.

## recommended next questions

- Which protected skill and single fixture should be used for the first sandbox
  experiment?
- What held-out critical-regression threshold is credible before promotion?
- Which evidence must be retained to show that an improvement persists across
  versions and providers?
