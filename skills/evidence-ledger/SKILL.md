---
name: evidence-ledger
description: Use at the end of non-trivial work to record changed files, commands, passing and failing checks, architecture impact, public contract impact, remaining risks, and final recommendation.
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

- Evidence ledger from `templates/evidence-ledger.md`.
- A compact work receipt at the top of the ledger with exactly five fields: `result`, `claim`, `evidence`, `remaining uncertainty`, and `next`.
- Final recommendation: `merge`, `hold`, `needs review`, or `needs follow-up`.

The work receipt is standalone Markdown. It is a review projection, not a runtime event, trusted attestation, JSON schema, scheduler input, or evaluator-specific protocol. Keep it shorter than the detailed ledger it summarizes. Do not require it for trivial edits.

## procedure

1. Start with the work receipt: state the result, the claim, the supporting evidence, the remaining uncertainty, and the next action.
2. Label evidence provenance plainly. Distinguish host-captured command results, agent-declared results, independent review, and evidence that was not run.
3. Summarise the change.
4. List changed files.
5. Record meaningful commands run.
6. Separate passing checks from failing checks.
7. State architecture impact.
8. State public contract impact.
9. Record risks left open.
10. Say whether human review is needed.
11. Give one final recommendation from the allowed list.
12. When a protocol run exists, capture each meaningful verification command with `bun run eh evidence <run-path> <criterion-id> -- <command> [args...]`.
13. Use `bun run eh transition <run-path> complete` for the completion claim. Do not hand-author success when the gate rejects it.

## quality bar

- A reviewer can understand the receipt in under a minute and find detail in the ledger.
- Every success claim has evidence.
- Agent-declared evidence is not presented as host-captured or independently attested.
- Protocol-backed evidence is fresh for the current workspace fingerprint.
- Failing checks are not buried.
- Remaining risk is named plainly.
- Recommendation follows the evidence.

## failure modes

- Writing a second full ledger inside the receipt.
- Treating a claim as proof because it is fluent or repeated.
- Omitting uncertainty because a clean completion is more convenient.
- Adding runtime or evaluator semantics to the Markdown receipt.
- Reporting confidence instead of commands.
- Omitting failing checks because they are inconvenient.
- Claiming no architecture impact without reviewing boundaries.
- Recommending merge when human decision is still required.
