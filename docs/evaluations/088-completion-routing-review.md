# Completion Routing Review

Date: 2026-10-05. Approved offline review of
[Claude result 087](087-claude-planning-result.md). No skill edit or provider run.

- result: complete
- claim: Standalone completion routing has a plausible planning-only ambiguity; two sentence-level clarifications are recommended, not implemented.
- evidence: AGENTS requires an evidence-ledger finish; the staged entrypoint places it under applicable guidance; the ledger describes completion without explicitly naming planning; Claude skipped it and provided no receipt despite receiving the entrypoint body.
- remaining uncertainty: This is a plausible cause, not demonstrated causality. Turn-budget headroom, host context and model variation remain confounders; a wording change is not proven to improve adherence.
- next: needs review; approve the two scoped substitutions below, with focused structural checks. No blanket ADR boilerplate, new capability or automatic model trial.

## Findings

1. **Mandatory completion is easy to read as optional.**
   [Entrypoint procedure](../../skills/using-extremely-hardcore/SKILL.md) says to
   load only applicable guidance, then lists `evidence-ledger` without a closing
   condition. In contrast, repository AGENTS explicitly requires it at the end.
   AGENTS was intentionally not staged: an installed skill cannot rely on the
   development repository's instructions to supply missing routing rules.
2. **Planning completion is not explicit.**
   [Ledger applicability](../../skills/evidence-ledger/SKILL.md) refers to claiming
   non-trivial work complete, ready, fixed, safe or reviewed. Its inputs emphasise
   diffs, commands and verification. An agent can incorrectly read this as applying
   only after implementation and postpone evidence reporting until a future fix.
   Claude's evidence-to-report-later section is consistent with this interpretation,
   but the transcript does not prove why it omitted the ledger.

The actual outcome is unchanged: Claude passed six criteria and failed the
explicit ADR conclusion and receipt criteria. Its 640-word answer and inaccurate
original integer-check explanation remain recorded. Nothing here revises that
score, clears acceptance or attributes the defects causally to EHS.

## Smallest Recommended Edit

Replace only the entrypoint's bare `evidence-ledger` routing item with:

> `evidence-ledger` to finish every non-trivial task, including planning and review.

Replace only the ledger's current when-to-use sentence with:

> Use when closing non-trivial implementation, planning or review work. Completion applies only to the authorised scope; state what was not performed.

These make the existing closing obligation discoverable without duplicating
receipt fields, result vocabulary, templates or the fixture rubric. Keep the
trivial-work exception, conditional loading, conversational local evidence and
consequential-work approval gates. No ledger document, protocol run or receipt
schema is added. No changes to AGENTS, manifests or other skills are proposed.

No ADR is required for this review or for clarifying existing routing; no
architecture, dependency, persistence, auth or public format changes. Domain
language and module boundaries are unchanged. Stop if implementation discovers
a need to change the receipt contract or risk gates instead of clarifying them.

## What Not To Optimise

Do not require an explicit no-ADR paragraph for every ordinary task. The
entrypoint already asks for architecture impact and conditional ADR guidance.
The fixture's explicit-decision criterion remains failed historically, but
optimising installed instructions for that phrase would add ceremony without
demonstrating engineering value. Keep proportionate reasoning, with an explicit
decision when it materially helps review or resolves an actual architecture
question; do not create empty ADR directories or weaken consequential triggers.

The successful Claude attempt reported seven turns against an eight-turn cap
and had no permission denial or budget-limit error. It did not hit that cap,
so the cap is not evidence of a forced omission. However, mandatory completion
guidance may require another tool step: review host-specific headroom before
any future trial. Do not assume another Skill call always fits, silently raise
budgets, or present extra calls as proof of quality. No new live budget is
proposed here, and no provider was invoked to investigate it.

The proposed edit does not fix inaccurate JavaScript explanations or establish
efficiency. The smallest next implementation is the two substitutions plus
focused semantic/structural regression checks. Full repository validation must
remain green; static checks cannot establish model adherence. Any later model
test needs a fresh declared task/build/budget and scoped payload consent, not
an automatic repetition until 8/8. Preserve earlier evidence and scores.
