---
name: evidence-ledger
description: Report evidence and remaining uncertainty before claiming non-trivial work complete.
---

# evidence-ledger

## when to use

Use before claiming non-trivial work is complete, ready, fixed, safe, or reviewed.

## when not to use

Do not use for trivial edits where the final answer can state the one file changed and the single check run.

## required inputs

- Git diff or changed file list.
- Commands run and outputs.
- Test, build, lint, or validation evidence.
- Known risks and review notes.
- The run path when a `.extremely-hardcore` change run exists.

## required output

- An evidence ledger, kept in the conversation for bounded local work unless a durable record is required. Use [templates/evidence-ledger.md](templates/evidence-ledger.md) (relative to this `SKILL.md`) for consequential work or repository-required records; reuse existing evidence instead of duplicating it.
- A compact work receipt at the top of the ledger with exactly five fields: `result`, `claim`, `evidence`, `remaining uncertainty`, and `next`.
- `result` is exactly one of `complete`, `blocked`, `needs-human-decision`, or `abandoned`, with no explanatory sentence in that field. Put the explanation in `claim`; put the recommendation in `next` or below the receipt. This vocabulary also applies to conversational receipts when no template is loaded.
- Final recommendation: `merge`, `hold`, `needs review`, or `needs follow-up`.

The work receipt is standalone Markdown. It is a review projection, not a runtime event, trusted attestation, JSON schema, scheduler input, or evaluator-specific protocol. Keep it shorter than the detailed ledger it summarizes. Do not require it for trivial edits.

## procedure

1. Start with the work receipt: state the result, the claim, the supporting evidence, the remaining uncertainty, and the next action.
2. Label evidence provenance plainly. Distinguish host-captured command results, agent-declared results, independent review, and evidence that was not run.
3. Record changed files, meaningful commands and results, relevant architecture or public contract impact, remaining risks, and any required human review. Keep supporting detail short and separate failures from passes; do not repeat the receipt or add empty sections.
4. Give one final recommendation from the allowed list.
5. When a protocol run exists, capture each meaningful verification command with `bun run eh evidence <run-path> <criterion-id> -- <command> [args...]` and use `bun run eh transition <run-path> complete` for the completion claim. Do not hand-author success when the gate rejects it. Standalone work does not require creating a run.

## quality bar

- A reviewer can understand the receipt in under a minute and find detail in the ledger.
- Every success claim has evidence.
- Agent-declared evidence is not presented as host-captured or independently attested.
- Protocol-backed evidence is fresh for the current workspace fingerprint.
- Failing checks are not buried.
- Remaining risk is named plainly.
- Recommendation follows the evidence.

## reusable lessons

An evidence record is not automatically a new instruction. Capture a reusable
lesson only after verification, when its non-obvious reasoning is absent from
code, tests, or existing docs and losing it would plausibly cause recurrence,
material risk, or substantial rediscovery. Otherwise write no extra lesson.
Use the repository's existing documentation convention; update an applicable
lesson instead of duplicating it. Keep historical evidence intact and label
superseded guidance. Propose changes to skills or standing instructions only
within the authorised scope; a successful task does not authorise self-editing.

## failure modes

- Writing a second full ledger inside the receipt.
- Treating a claim as proof because it is fluent or repeated.
- Omitting uncertainty because a clean completion is more convenient.
- Adding runtime or evaluator semantics to the Markdown receipt.
- Reporting confidence instead of commands.
- Omitting failing checks because they are inconvenient.
- Claiming no architecture impact without reviewing boundaries.
- Recommending merge when human decision is still required.
