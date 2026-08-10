# domain map: AgentOS containment probe assessment

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Containment environment | Runtime intended to restrict an external agent's filesystem and network access. | External platform |
| Supported entrypoint | Public package/API with a documented installation and execution contract. | Platform vendor |
| Agent runtime graph | Bundled agent software and platform dependencies resolved by a package. | Package manager |
| Dependency boundary | The local decision about what may enter this plugin. | Extremely Hardcore |

## candidate bounded contexts

- Operator control owns the adoption decision.
- AgentOS owns its SDK, runtime, and published support boundary.
- Existing fixture and Codex adapters retain their present ownership and are unaffected.

## aggregates/entities/value objects

Not applicable. No runtime report or API is introduced.

## commands

- Inspect package metadata and Bun's dependency resolution.
- Record the hold.

## events

- Supported package graph assessed.
- Internal alternative rejected as unsupported.
- Proposal held.

## policies/rules

- A no-model probe must not bundle unrelated agent software.
- Unsupported internal packages are not anti-corruption boundaries.
- No vendor documentation becomes an enforcement claim without an observed local run.

## invariants

- Existing fixture scoring has no AgentOS dependency.
- No package, CLI, report, or runtime integration exists while the proposal is held.

## external systems

- Bun and Node host runtimes.
- NPM registry metadata for AgentOS packages.

## integration points

Slice documentation only.

## ambiguity

The VM's direct execution API, Bun compatibility, filesystem policy, network denial, and guest Bun/Git availability remain intentionally untested.

## recommended next questions

Which supported containment environment offers a minimal direct execution API without importing an agent platform?
