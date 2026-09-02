# domain map: provider onboarding and status reconciliation

## domain terms

- EHS skill: the provider-neutral Markdown engineering method.
- Host: Codex CLI, Claude Code, or Pi.
- Package discovery: the host finds the checkout and its manifest.
- Skill loading: a model receives the EHS instructions for a session.
- Engineering adherence: the model follows EHS during real work.
- Loading smoke: a harmless prompt that checks two distinctive EHS rules.
- Local marketplace: host metadata that makes a checkout installable.
- Provider evaluation: the existing read-only scenario adapter, separate from
  skill loading.
- Operational acceptance: the human review of ten real dogfood records.

## candidate bounded contexts

- EHS method: owns skill content, receipts, and engineering behaviour.
- Host packaging: owns Codex and Claude manifests plus local install commands.
- Provider runtime: owns credentials, model routing, sessions, and transport.
- Protocol and evaluation: owns `eh`, run evidence, deterministic scoring, and
  provider adapter boundaries.
- Dogfood and roadmap: owns campaign status and release decisions.

## aggregates/entities/value objects

Useful records are small and document-shaped:

- A provider manifest identifies one host package entry.
- A loading smoke record identifies one host version, model, command, and final
  marker.
- A campaign record identifies one real operator change and its evidence.

No new runtime aggregate or persistent domain model is required.

## commands

- Register a local marketplace.
- Install or load a host plugin.
- Load a Pi skill file explicitly.
- Validate plugin metadata.
- Run the loading smoke.
- Record pass, blocked, or pending evidence.
- Review the ten-run campaign.

## events

- Package discovered.
- Plugin metadata validated.
- Session-local skill loaded.
- Loading smoke passed or was blocked.
- Real dogfood campaign completed.
- Operational acceptance remains pending or is decided.

## policies/rules

- Package discovery is not skill loading.
- Skill loading is not engineering adherence.
- A provider smoke must not send credentials or retain raw private transcripts
  in the repository.
- A blocked provider preflight is not a provider failure.
- Current-version evidence must identify the host version and model.
- Read-only provider evaluations must not be presented as EHS-loading tests.
- Ten dogfood records support operational review but do not create a benchmark
  or containment claim.

## invariants

- `result`, `claim`, `evidence`, `remaining uncertainty`, and `next` remain the
  standalone receipt fields.
- The installed Codex and Claude plugin versions must match the existing
  `.codex-plugin/plugin.json` version.
- Pi's verified path remains explicit and session-local.
- No provider-specific flag leaks into `protocol/` or the standalone skills.

## external systems

- Codex CLI and its local plugin configuration.
- Claude Code CLI and its plugin marketplace/configuration.
- Pi CLI, provider authentication, and model API.
- The network boundary used by provider model calls.

## integration points

- `.codex-plugin/plugin.json` and `.claude-plugin/` metadata.
- Host-specific CLI commands in `docs/provider-onboarding.md`.
- Existing `evaluation/run-*-adapter.ts` commands, which remain separate.
- `docs/dogfood/` campaign records and `ROADMAP.md` status.

## ambiguity

- Host plugin discovery and skill triggering can vary by CLI version.
- Claude and Codex model smokes require authentication and network access.
- Pi has a verified explicit loading path but no persistent package claim.
- A model can return the expected marker without demonstrating adherence on a
  real change.

## recommended next questions

- Which released marketplace will own public EHS installation?
- Should Pi gain a persistent package entry only after repeated user demand?
- What independent evidence should be required before calling provider loading
  current and supported?
- What aggregate dogfood threshold is sufficient for operational acceptance?
