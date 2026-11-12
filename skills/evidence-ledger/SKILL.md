---
name: evidence-ledger
description: Report evidence and remaining uncertainty before claiming non-trivial work complete.
---

# evidence-ledger

## when to use

Use when closing non-trivial implementation, planning or review work. Completion applies only to the authorised scope; state what was not performed.

## when not to use

Do not use for trivial edits where the final answer can state the one file changed and the single check run.

## required inputs

The diff/conclusions, actual verification output, review notes and remaining
risks; the run path when a `.extremely-hardcore` change run exists.

## required output

- What changed or was concluded, supporting checks and outcomes, and what remains
  unverified or blocked. A concise paragraph or short bullets are enough; no fixed
  fields or result vocabulary are required for ordinary human reports.
- State the next action only when a decision, review or follow-up is needed.
- Use [templates/evidence-ledger.md](templates/evidence-ledger.md) for required
  durable records, omitting irrelevant sections and reusing existing evidence.
  Repository-required records and formats remain binding, as do existing protocol
  states, schemas, evidence and approval gates.

The human report is not a runtime event, trusted attestation, scheduler input or
evaluator-specific protocol. Flexible presentation does not relax verification.

## procedure

1. State the authorised outcome, supporting checks and their results, and remaining uncertainty without duplicating the detailed evidence.
2. Label evidence provenance plainly. Distinguish host-captured command results, agent-declared results, independent review, and evidence that was not run.
3. Include meaningful commands and results, material architecture/contract impact and any required review. Separate failures from passes; do not add empty sections or routine no-impact declarations.
4. Make any recommendation follow the evidence; do not imply that reporting completion grants merge, publication or deployment authority.
5. When a protocol run exists, capture each meaningful verification command with `bun run eh evidence <run-path> <criterion-id> -- <command> [args...]` and use `bun run eh transition <run-path> complete` for the completion claim. Do not hand-author success when the gate rejects it. Standalone work does not require creating a run.

## quality bar

Claims trace to actual results with honest provenance and limits. Failures are
visible; protocol-backed evidence is fresh for the current workspace fingerprint.

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

- Duplicating a ledger or treating fluent claims as proof.
- Omitting failed/unrun checks, uncertainty or required human decisions.
- Adding runtime/evaluator semantics to a human report.
- Declaring no architecture impact without inspecting relevant boundaries.
