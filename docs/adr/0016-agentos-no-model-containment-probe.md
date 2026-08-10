# ADR: Reject AgentOS no-model containment probe as a local dependency

## status

accepted

## context

The experimental Codex action-fixture adapter requested `workspace-write`, but one live pilot read the operator's `.codex/memories/MEMORY.md` outside the copied fixture workspace. AgentOS documents a virtual guest filesystem and explicit policy enforcement, but it is beta and this repository needs a small Bun-compatible containment probe, not a complete agent platform.

## decision

Do not add AgentOS for the proposed no-model probe. The supported `@rivet-dev/agentos@0.2.15` package resolves bundled coding-agent software, AgentOS runtime/sidecars, React/RivetKit, native modules, and cloud integrations. The lower-level `@rivet-dev/agentos-core` package is explicitly unsupported for direct installation and retains the same agent-software dependencies.

No probe command, dependency, or runtime boundary is introduced. A future proposal needs a supported minimal AgentOS entrypoint or a different supported containment mechanism, and must begin with a new decision challenge.

## consequences

- The plugin does not absorb a broad beta agent runtime to test one isolation hypothesis.
- The live Codex read-isolation failure remains unresolved; provider action-fixture work stays held.
- A direct AgentOS probe remains an option only if a proportionate supported entrypoint is available.

## options considered

- Direct probe via `@rivet-dev/agentos`: rejected due to its broad bundled dependency graph.
- Direct probe via `@rivet-dev/agentos-core`: rejected because it is unsupported and retains the same graph.
- Re-run Codex with stronger flags: rejected because the relevant sandbox assumption was already falsified.
- Add Flue or change the fixture runtime: rejected as architecture expansion before containment evidence.

## trade-offs

This leaves the containment question unanswered but avoids treating a large bundled agent runtime as an innocuous execution library.

## follow-up work

- Monitor for a supported minimal AgentOS entrypoint or evaluate another containment environment under a new decision challenge.
- Do not resume Codex action-fixture execution without direct containment evidence.

## review date

2026-10-28
