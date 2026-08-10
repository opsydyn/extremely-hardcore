# evidence ledger: standalone EHS work receipt

## work receipt

- result: complete
- claim: The standalone EHS evidence ledger now produces a compact, five-field work receipt without adding orchestration, evaluator, provider, or runtime coupling.
- evidence: Host-captured repository checks, the focused receipt-contract assertion, and a fresh `eh` completion run recorded below.
- remaining uncertainty: The receipt has not yet been reviewed across five real operator changes; duplicate prose and review-time impact remain open.
- next: Dogfood the receipt on representative EHS changes and revise only if observed friction justifies it.

## summary

Added a small standalone work receipt to the existing `evidence-ledger` skill. The receipt contains `result`, `claim`, `evidence`, `remaining uncertainty`, and `next`. The detailed ledger remains the full record, and the receipt is explicitly Markdown-only rather than a runtime or evaluation protocol.

## changed files

- `skills/evidence-ledger/SKILL.md`
- `skills/evidence-ledger/templates/evidence-ledger.md`
- `MANIFESTO.md`
- `README.md`
- `ROADMAP.md`
- `docs/user-guide.md`
- `docs/change-contracts/031-standalone-work-receipt.md`
- `docs/decision-challenges/031-standalone-work-receipt.md`
- `docs/adr/0023-standalone-work-receipt.md`
- `docs/reviews/031-standalone-work-receipt.md`
- this evidence ledger

The worktree contained unrelated changes before this slice. They were left untouched.

## commands run

- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- focused receipt-contract content assertion using `bun -e`
- fresh `eh` evidence, status, validation, transition, summary, and CI commands for run `031-standalone-work-receipt`

## passing checks

- Structural validation passed.
- 132 tests passed across 27 files with 0 failures and 469 expect calls.
- TypeScript emitted no errors.
- `git diff --check` passed.
- The focused assertion found all five receipt fields in both the skill and template and confirmed the standalone/trivial-edit boundaries.
- The receipt contract passed through a fresh completion run with all criteria covered and a valid completion transition.

## failing checks

None.

No provider execution, loop runtime, network probe, or comparative evaluation was run. Those are outside this standalone EHS slice.

## architecture impact

The installed skill contract gained a Markdown projection only. No runtime, protocol schema, event model, scheduler, evaluator, provider adapter, dependency, or package command changed. ADR 0023 records the boundary and its trade-offs.

## public contract impact

Non-trivial evidence ledgers now start with a five-field work receipt. Trivial edits remain outside the evidence-ledger contract. The receipt does not attest command execution and does not define machine parsing or orchestration semantics.

## risks left open

- A receipt can become duplicate prose if agents repeat the full ledger in its five fields.
- Agent-declared evidence can still be overstated unless provenance is labelled honestly.
- Review-time reduction and operator friction are not established until real dogfood runs occur.

## human review needed

Yes. Review the receipt after representative real changes, especially whether it improves scanning without increasing ceremony.

## final recommendation

merge
