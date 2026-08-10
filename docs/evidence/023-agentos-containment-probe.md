# evidence ledger: AgentOS containment probe assessment

## summary

Held the proposed no-model AgentOS containment probe before runtime implementation. The supported `@rivet-dev/agentos@0.2.15` package resolves broad bundled agent software and platform dependencies, including Codex, Claude, Pi, OpenCode, AgentOS runtime/sidecars, React/RivetKit, native modules, and cloud integrations. The lower-level `@rivet-dev/agentos-core@0.2.15` package explicitly describes itself as an unsupported transitive implementation and declares the same agent-software dependencies.

## changed files

- `issues/023-agentos-containment-probe.md`
- `docs/change-contracts/023-agentos-containment-probe.md`
- `docs/decision-challenges/023-agentos-containment-probe.md`
- `docs/adr/0016-agentos-no-model-containment-probe.md`
- `docs/domain/023-agentos-containment-probe.md`
- `docs/reviews/023-agentos-containment-probe.md`
- `docs/implementation-plans/023-agentos-containment-probe.md`
- `docs/evidence/023-agentos-containment-probe.md`

## commands run

- `bun --version`
- `node --version`
- `npm view @rivet-dev/agentos@0.2.15 dependencies peerDependencies engines --json`
- `bun add --exact @rivet-dev/agentos@0.2.15 --verbose`
- `npm view @rivet-dev/agentos-core@0.2.15 description engines dependencies peerDependencies exports repository --json`
- `bun remove @rivet-dev/agentos`
- `git diff -- package.json bun.lock`
- `git diff --check`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`

## passing checks

- Local Node is `v24.15.0`, satisfying the public package's declared Node 22+ engine requirement.
- The final worktree retains no AgentOS package, lockfile, source, CLI, or test integration.
- `bun run check` passed.
- `bun run test` passed: 99 tests, 0 failures.
- `bunx tsc --noEmit` passed.

## failing checks

- The public SDK dependency graph violates the no-model/no-agent boundary for this slice.
- The lower-level package is unsupported and does not reduce the dependency graph.
- No local VM ran, so there is no enforcement evidence for filesystem, symlink, network, Bun, or Git behaviour.

## architecture impact

No runtime architecture changed. ADR 0016 records the decision not to make AgentOS part of the local evaluation core. Existing fixture and Codex adapter boundaries remain unchanged.

## public contract impact

None. No command, report schema, package, lockfile, CI, deployment, persistence, or provider contract was added or changed.

## risks left open

- The live Codex pilot's out-of-workspace read remains unresolved.
- AgentOS may still be viable through a future supported minimal SDK or separate environment, but this repository has not tested it.
- No statement can be made about AgentOS containment, network denial, Bun/Git availability, or Codex integration from this assessment.

## human review needed

Yes. Choose a different supported containment mechanism or wait for a supported minimal AgentOS entrypoint. Any workaround must begin with a new decision challenge.

## final recommendation

hold
