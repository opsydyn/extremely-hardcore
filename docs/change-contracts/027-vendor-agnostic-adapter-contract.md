# change contract: vendor-agnostic adapter contract

## user intent

Work on the vendor-agnostic adapter roadmap by implementing the first shared adapter contract and runner while preserving provider-specific leaf boundaries.

## current understanding

`AgentAttempt` and `assessAgentAttempt` are already provider-neutral. Codex adapters own Codex command flags, response schemas, invocation metadata, raw artefacts, and declared sandbox labels. The deterministic scenario runner and protocol scorer must remain independent of any provider.

## allowed scope

- Add `evaluation/agent-adapter.ts` or equivalent provider-neutral types and runner.
- Add capability claim levels: `unknown`, `unsupported`, `declared`, `observed`, `attested`.
- Add digest validation for adapter-retained artefacts below a caller-owned output root.
- Add tests with an in-memory/fake adapter that never launches a provider.
- Add an ADR, domain map, bounded-context review, decision challenge, implementation plan, roadmap update, and evidence ledger.

## forbidden scope

- Provider adapters or provider execution.
- Generic executable-path substitution for Codex.
- Prompt, session, transcript, sandbox, network, or resume abstraction.
- Writes to `protocol/`, changes to scenario scoring, or new dependencies.
- Comparison, benchmark, or provider-equivalence claims.

## affected areas

- `evaluation/`: shared adapter contract and runner.
- `tests/evaluation/`: contract and integrity tests.
- `ROADMAP.md`, `docs/evaluations/README.md`, and adapter governance records.

## public contracts

Adds an experimental local TypeScript/JSON contract for `AgentAdapter`, `CapabilityDescriptor`, `AdapterAttemptResult`, and `ProviderNeutralAdapterReport`. It does not alter the protocol schema or existing CLI commands.

## risks

- A lowest-common-denominator contract could erase material provider differences.
- Capability metadata could be misread as enforcement evidence.
- Artifact digest validation proves retained-file integrity only, not process identity or command ownership.
- A fake adapter proves runner mechanics, not any provider capability.

## acceptance evidence

- Red-first tests for complete coverage, scorer ownership, capability claims, and artifact path/digest failures.
- Focused and full test suites, type check, structural validation, and diff check.
- Adapter docs explicitly state that provider-specific execution remains in leaf adapters.

## stop conditions

Stop before implementation if the shared contract requires provider-specific process or sandbox semantics. In that case, split the provider capability into a leaf adapter and return to decision challenge.
