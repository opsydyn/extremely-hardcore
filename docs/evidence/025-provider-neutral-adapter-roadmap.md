# evidence ledger: provider-neutral agent adapter roadmap

## summary

Added a roadmap-only track for generalising the evaluation surface to Claude and Pi, and made the remaining V0 feature-complete gates explicit. No provider adapter, package, CLI, protocol, or public runtime contract changed.

## changed files

- `ROADMAP.md`
- `issues/025-provider-neutral-adapter-roadmap.md`
- `docs/change-contracts/025-provider-neutral-adapter-roadmap.md`
- `docs/decision-challenges/025-provider-neutral-adapter-roadmap.md`
- `docs/domain/025-provider-neutral-adapter-roadmap.md`
- `docs/evidence/025-provider-neutral-adapter-roadmap.md`

## commands run

- Read current roadmap, protocol, evaluator, Codex adapter, skill, policy, and evidence files.
- `git status --short`
- `bun run check`
- `git diff --check`

## passing checks

- The roadmap distinguishes implemented core capability from remaining V0 lifecycle, evaluation, integration, CI, and release gates.
- Claude/Pi generalisation is explicitly backlogged behind V0 feature completion.
- The future adapter contract is marked as requiring a later ADR and decision challenge.
- No runtime or package file was changed.
- `bun run check` passed.
- `git diff --check` passed.

## failing checks

- No implementation check was applicable; Claude and Pi adapters were intentionally not built or executed.

## architecture impact

No architecture changed. The records state that a future adapter contract crosses an external integration boundary and therefore requires a new ADR, decision challenge, bounded-context review, and focused implementation plan before code.

## public contract impact

None. The roadmap names a future contract but does not adopt it.

## risks left open

- The V0 feature-complete gates remain incomplete.
- Claude and Pi capabilities have not been locally verified.
- A generic adapter may erase provider-specific session, output, resume, or containment differences.
- Provider comparison and writable execution remain unsupported claims.

## human review needed

No new human decision is required for this roadmap-only edit. Human review is required before implementing the adapter contract or declaring V0 feature complete.

## final recommendation

needs follow-up

