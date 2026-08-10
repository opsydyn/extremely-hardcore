# bounded-context review: AgentOS containment probe assessment

## proposed change

Assess whether an isolated AgentOS adapter can be added without importing unrelated agent-runtime contexts.

## affected contexts

- Operator control
- AgentOS package boundary
- Existing evaluation documentation

## allowed dependencies

None added. Existing fixture runner and Codex adapters retain no AgentOS dependency.

## suspicious dependencies

Agent/model packages, sidecars, React/RivetKit, native modules, cloud integrations, unsupported internal APIs, host mounts, credentials, provider output, and runtime fallbacks.

## data ownership

No runtime report is created. Existing fixture and provider artefacts retain their current ownership.

## transaction boundaries

No runtime transaction is introduced; the assessment stops after dependency inspection.

## integration events

No transport, persistence event, or output report is introduced.

## anti-corruption needs

Do not allow a vendor package's broad dependency graph to cross into the evaluation core simply because its public API offers a VM abstraction.

## verdict

needs redesign

The supported package crosses the no-model/no-agent boundary before an adapter exists, and the internal package is unsupported. A different supported integration shape is required.
