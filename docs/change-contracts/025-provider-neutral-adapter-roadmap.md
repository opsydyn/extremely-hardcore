# change contract: provider-neutral agent adapter roadmap

## user intent

Backlog generalisation for Claude and Pi, then identify what remains before calling the current product feature-complete.

## current understanding

The protocol, deterministic scenarios, fixture scorer, skills, and evidence ledger are provider-neutral. The current adapters are Codex-specific and use Codex flags, response schemas, event capture, and sandbox labels. The live Codex writable pilot demonstrated an out-of-workspace read; the Docker/Colima probe proves only a tested container boundary. Risk-aware lifecycle, full skill integration, CI attestation, and release dogfood remain incomplete.

## allowed scope

- Roadmap and planning records only.
- A clear future adapter direction with capability and evidence gates.
- A current-state feature-complete checklist.

## forbidden scope

- Runtime, package, lockfile, CLI, protocol, persistence, CI, deployment, provider, credential, benchmark, or adapter changes.
- Any Claude or Pi execution.
- Any accepted adapter API or provider-comparison claim.

## affected areas

- `ROADMAP.md`.
- Roadmap decision, domain, and evidence records.

## public contracts

None changed. The future `AgentAdapter` contract is a named proposal only. An ADR is required before it is adopted.

## assumptions

- The existing provider-neutral evaluator can remain the scorer for future adapters.
- Claude and Pi differences can be isolated in leaf adapters, but this requires direct capability evidence.

## risks

- A generic adapter abstraction could erase meaningful provider differences.
- Provider-specific sandbox claims could be mistaken for enforcement evidence.
- Feature-complete scope could expand indefinitely unless the V0 checkpoint is explicit.

## architecture decision check

No ADR is required for this documentation-only change. A future adapter contract changes an external integration boundary and therefore requires an ADR, decision challenge, and focused implementation plan before code.

## acceptance evidence

- `ROADMAP.md` names remaining V0 gates and the deferred Claude/Pi track.
- Current status remains distinct from proposed future capability.
- `bun run check` and `git diff --check` pass.

## stop conditions

- Do not implement provider support in this slice.
- Do not claim feature completion until the named V0 gates have evidence.

