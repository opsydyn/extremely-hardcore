# issue: AgentOS containment probe

## intent

Assess whether AgentOS has a supported, proportionate dependency path for a future no-model, no-network containment probe after the live Codex pilot read outside its copied workspace.

## accepted scope

- Inspect the supported SDK and lower-level package dependency graphs.
- Record whether a direct VM probe can be added without importing agent software or unsupported internals.

## exclusions

- No VM execution, Codex or Flue session, model request, credential, host mount, fixture execution, provider execution, or benchmark.
- No package, lockfile, CLI, report schema, protocol, CI, or fixture change.

## outcome

Held before implementation. The supported `@rivet-dev/agentos@0.2.15` package resolves bundled Codex, Claude, Pi, OpenCode, AgentOS runtime and sidecar packages, React/RivetKit, native modules, and cloud integrations. The lower-level `@rivet-dev/agentos-core@0.2.15` package describes itself as an unsupported transitive implementation and declares the same agent-software dependencies.

## acceptance checks

- A supported direct dependency must exclude agent software and unsupported internal APIs. This check failed.
- No AgentOS package, lockfile, source, CLI, or test is retained.

## stop conditions

- The supported SDK bundles agent software or the lower-level package is unsupported. This occurred.
- Do not use an unsupported core package, direct sidecar protocol, Node workaround, or external sandbox without a new decision challenge.
