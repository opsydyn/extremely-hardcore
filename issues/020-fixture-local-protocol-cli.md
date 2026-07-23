# issue: fixture-local protocol CLI

## intent

Make the bounded bug-fix fixture capable of producing its own evidence and completion artifacts through immutable local commands. Retain an invocation ledger that a later provider adapter can correlate with provider-side artifacts.

## accepted scope

- Add a fixture-local Bun CLI with fixed `evidence` and `complete` commands.
- Add an append-only fixture invocation ledger and runner validation for its command, stage, evidence, transition, and fingerprint links.
- Make the deterministic reference executor invoke the fixture-local commands instead of host protocol APIs.
- Update focused tests and the action-fixture documentation.

## exclusions

- No live provider execution, Codex adapter, provider-side transcript capture, comparison policy, or regression threshold.
- No claim that a fixture-local ledger alone proves agent identity, no-network execution, or provider compliance.
- No generic protocol schema, CLI, or validation change.
- No SkillOpt integration or candidate-skill evolution work.

## acceptance checks

- The reference path passes through fixture-local `evidence` and `complete` commands.
- The runner rejects missing, malformed, wrong-stage, mismatched, or extra fixture invocation records.
- The copied fixture's command surface and task instructions are immutable under existing diff rules.
- The retained report contains the fixture protocol script and invocation ledger.
- Focused, full, static, and type checks pass without a provider invocation.

## stop conditions

- Stop if the local CLI requires a generic protocol API or schema change.
- Stop if runner validation must trust adapter-declared provenance as proof of agent ownership.
- Stop for human review if a live provider, sandbox, network, or public adapter contract is introduced.
