# evidence ledger: vendor-agnostic adapter contract

## summary

Implemented the first vendor-agnostic adapter slice: a provider-neutral read-only contract, capability evidence vocabulary, shared scenario runner, centralized scoring, and fail-closed retained-artifact integrity checks.

## changed files

- `evaluation/agent-adapter.ts`
- `tests/evaluation/agent-adapter.test.ts`
- `README.md`, `ROADMAP.md`, `docs/evaluations/README.md`
- `issues/027-vendor-agnostic-adapter-contract.md`
- `docs/change-contracts/027-vendor-agnostic-adapter-contract.md`
- `docs/domain/027-vendor-agnostic-adapter-contract.md`
- `docs/decision-challenges/027-vendor-agnostic-adapter-contract.md`
- `docs/adr/0020-provider-neutral-read-only-adapter-contract.md`
- `docs/implementation-plans/027-vendor-agnostic-adapter-contract.md`
- `docs/reviews/027-vendor-agnostic-adapter-contract.md`
- this evidence ledger

## commands run

- `bun test ./tests/evaluation/agent-adapter.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`

## passing checks

- Adapter contract suite: 5 tests passed, 0 failed.
- Full repository suite before the final artifact-integrity additions: 124 tests passed, 0 failed.
- Structural validation passed.
- TypeScript reported no errors.
- The fake adapter covered all 13 read-only agent-attempt scenarios without an external executable.
- The runner kept `assessAgentAttempt` as the sole scorer and did not receive expected error codes in requests.
- Capability levels round-tripped as explicit evidence metadata.
- Missing, duplicate, unknown, malformed, outside-root, symlinked, and digest-mutated artefacts fail closed.
- Existing protocol and provider-specific adapter tests remained green.
- No diff whitespace errors.

## failing checks

None in the focused adapter pass or the preceding full-suite pass.

## architecture impact

Adds an experimental evaluation/provider boundary under `evaluation/`. The shared runner depends on the scenario manifest, normalized attempt assessor, and standard-library filesystem/hash APIs. `protocol/` remains unaware of adapters. Codex-specific invocation, prompts, sessions, parsing, runtime metadata, and raw artefacts remain in leaf modules.

ADR 0020 records the contract. No runtime dependency, protocol schema, provider executable, network path, writable workspace, or containment boundary was added.

## public contract impact

Adds experimental TypeScript/JSON shapes for `AgentAdapter`, `CapabilityDescriptor`, `ReadOnlyScenarioRequest`, `AdapterAttemptResult`, and `ProviderNeutralAdapterReport`. Existing commands, protocol records, scenario scoring, and Codex adapters are unchanged.

## risks left open

- The fake adapter proves runner mechanics, not Claude, Pi, Codex, or any provider capability.
- Capability levels are not support booleans and do not prove enforcement.
- Artifact digests prove retained-file integrity only, not process identity or command ownership.
- Sessions, resume, structured event streams, writes, network controls, and containment remain intentionally outside the shared contract.
- A concrete provider adapter still needs a direct capability preflight, leaf-specific decision challenge, controlled read-only run, and human review.

## human review needed

Yes. Review the new experimental contract before selecting the first concrete provider. Do not add Claude/Pi execution or writable capabilities until the provider-specific boundary and containment evidence are separately accepted.

## final recommendation

needs review
