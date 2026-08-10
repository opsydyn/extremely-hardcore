# change contract: AgentOS containment probe assessment

## user intent

Establish whether the recommended AgentOS no-model, no-network slice can be added safely after the live Codex CLI pilot read `/Users/alancurrie/.codex/memories/MEMORY.md` outside the copied workspace.

## current understanding

AgentOS documents a virtual filesystem and denied guest network by default. Its supported `@rivet-dev/agentos` 0.2.15 package declares Node 22+ and React peers. The local Node runtime is v24.15.0; the repository uses Bun. Existing fixture and Codex adapter boundaries remain independent.

## allowed scope

- Inspect package metadata and Bun's resolved dependency graph.
- Record a hold if there is no supported, proportionate no-agent dependency path.

## forbidden scope

- Runtime, package, lockfile, CLI, test, fixture, provider, credential, host-mount, CI, or protocol changes.
- Any containment, Bun/Git, provider, or model claim without a VM execution result.

## affected areas

- Slice decision records only.

## public contracts

None. The proposed `evaluate:agentos-containment` command is not added.

## assumptions

- A supported public SDK could support a no-agent probe without importing bundled agent software. This was falsified.

## risks

- The public package's broad graph violates the no-model/no-agent boundary.
- The internal core package is unsupported and does not reduce the graph.

## acceptance evidence

- NPM metadata and Bun dependency resolution show the dependency boundary.
- The final worktree contains no AgentOS package, lockfile, source, CLI, or test integration.

## stop conditions

- Stop when the supported package bundles agent software or the alternative package is unsupported. This occurred.
- Do not add a workaround without a new decision challenge.
