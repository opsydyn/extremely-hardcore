# evidence ledger: dogfood program setup

## summary

Recorded the first real completion-gate run and established the documentation contract for the remaining four required dogfood changes.

## changed files

- `docs/change-contracts/003-dogfood-proof-carrying-completion.md`
- `docs/dogfood/README.md`
- `docs/dogfood/002-proof-carrying-completion.md`
- `docs/evidence/003-dogfood-program.md`
- `issues/003-dogfood-proof-carrying-completion.md`

## commands run

- Read the completed run definition, transition event, evidence records, and captured logs.
- `bun run check`

## passing checks

- The completed run records four passing commands at one workspace fingerprint.
- The run has one completion transition with the evidence IDs that justified it.
- The campaign record preserves the roadmap requirement for five representative runs.

## failing checks

- None. No product behaviour was changed in this documentation slice.

## architecture impact

None. The CLI, protocol schema, and runtime dependency direction remain unchanged. No ADR is required.

## public contract impact

None.

## risks left open

- Four representative runs remain before the next milestone decision.
- Setup overhead has not yet been measured consistently.
- Run 1 is self-hosted and may not represent day-to-day change work.

## human review needed

No. The campaign follows the accepted roadmap gate; future product changes need evidence from the campaign.

## final recommendation

merge
