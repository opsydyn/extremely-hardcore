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

## required output

- Evidence ledger from `templates/evidence-ledger.md`.
- Final recommendation: `merge`, `hold`, `needs review`, or `needs follow-up`.

## procedure

1. Summarise the change.
2. List changed files.
3. Record meaningful commands run.
4. Separate passing checks from failing checks.
5. State architecture impact.
6. State public contract impact.
7. Record risks left open.
8. Say whether human review is needed.
9. Give one final recommendation from the allowed list.

## quality bar

- Every success claim has evidence.
- Failing checks are not buried.
- Remaining risk is named plainly.
- Recommendation follows the evidence.

## failure modes

- Reporting confidence instead of commands.
- Omitting failing checks because they are inconvenient.
- Claiming no architecture impact without reviewing boundaries.
- Recommending merge when human decision is still required.
