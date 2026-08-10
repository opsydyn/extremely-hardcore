# change contract: feature-complete gates

## user intent

Move the repository through the five remaining V0 feature-complete gates before beginning Claude or Pi adapter work.

## current understanding

The repository has a local JSON protocol with an experimental schema 1, a guarded `implemented -> complete` transition, a seven-scenario deterministic runner, a 20-scenario manifest with 13 structured agent-attempt scenarios, and experimental fixture/provenance tooling. The run schema has risk labels but no lifecycle state beyond `implemented` and `complete`, no approvals, no status command, and no CI attestation surface.

## allowed scope

- Extend protocol state and transition validation with backward-compatible schema 1 fields.
- Add risk-lane classification and high-risk approval records tied to workspace fingerprints.
- Add read-only status, approval, summary, and attestation delivery commands.
- Add repeated evaluation policy and local dogfood orchestration.
- Update skills, agent role contracts, README, roadmap, compatibility guidance, and worked examples.
- Add focused tests and local reference fixtures.

## forbidden scope

- Provider adapters or provider comparison claims.
- External writable-agent execution, network access, sandbox implementation, or isolation claims.
- Services, databases, daemons, hosted state, or new runtime dependencies.
- Silent schema-version promotion or removal of existing commands.
- Automatic transition approval or automatic code modification.

## affected areas

- `protocol/`: run state, approvals, risk, transitions, validation, summaries.
- `evaluation/`: policy, repeated full-corpus assessment, dogfood orchestration.
- `scripts/`: stable command and CI delivery adapters.
- `skills/`, `agents/`, `README.md`, `ROADMAP.md`, `.github/`: agent and delivery contracts.
- `tests/`, `docs/`: behavioural proof and evidence.

## public contracts

Existing commands remain valid. New experimental local contracts are `eh status`, `eh approve`, `eh summary`, `eh attest`, `eh ci`, the lifecycle transition targets, the evaluation policy/report JSON, and the attestation JSON. All remain explicitly schema version 1 and local-only.

## risks

- The lifecycle expands the experimental state machine and can create invalid histories if transition validation is incomplete.
- Approval records are traceability, not an external trust anchor.
- Declared agent-attempt fixtures are assessor inputs, not evidence of provider behaviour.
- Ten controlled fixture runs do not substitute for ten real repository dogfood changes.
- CI integration may be copied into repositories with different run paths or Bun availability.

## acceptance evidence

- Red-first tests for transition legality, risk classification, approval freshness, status, attestation, policy assessment, and dogfood counts.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, full evaluation, dogfood, and example commands.
- Reviewable ADR, domain map, bounded-context review, decision challenge, implementation plan, and evidence ledger.

## stop conditions

Stop and update this contract if implementation needs a provider, network, service, migration, new dependency, or a claim stronger than local traceability.
