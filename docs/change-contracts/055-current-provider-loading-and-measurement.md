# Change contract: current provider loading and measurement

## user intent

Refresh current Codex and Claude loading evidence and run a small standardized
measurement campaign for the EHS operator/protocol path, while keeping provider
comparison, writable execution, and release approval out of scope.

## current understanding

- The provider guide records Codex CLI `0.147.0`, Claude Code `2.1.251`, and
  Pi `0.84.1` from the 2026-09-03 host snapshot.
- Codex package discovery was previously verified, but current model loading
  was blocked by a disposable unauthenticated home.
- Claude metadata validation was previously verified with existing warnings,
  but current model loading was blocked by an expired OAuth session.
- The roadmap identifies fresh Codex/Claude loading and standardized
  measurement as the next gated slice.
- Existing dogfood records do not contain consistent host-captured operator
  timing. A bounded protocol-command timing probe can measure command wall
  time, but cannot establish human active time or productivity.

## allowed scope

- Capture current CLI versions and Codex discovery/plugin state.
- Run the documented read-only Codex and Claude loading smokes in the current
  host environment, without printing or retaining credentials or raw output.
- Run three repetitions of a fixed read-only EHS status/summary path and record
  command wall time, exit state, and the measurement boundary.
- Update the provider guide, dogfood index/decision, and roadmap with observed
  results and explicit limits.
- Create and complete documentation-only Run 055 with evidence and a ledger.
- Run repository validation, tests, typecheck, whitespace, and hygiene checks.

## forbidden scope

- Do not run writable provider execution, provider comparison, benchmarks,
  skills-effect experiments, containment probes, or network-isolation claims.
- Do not modify runtime code, skill instructions, provider adapters, protocol
  schemas, CI, persistence, or host configuration beyond disposable local
  discovery state if required by the documented check.
- Do not use, print, copy, or persist credentials, raw provider transcripts,
  or provider session state.
- Do not call command wall time human operator time, adherence, model quality,
  provider equivalence, or release evidence.
- Do not repair or backfill historical dogfood measurements or loading claims.

## affected areas

- `docs/provider-onboarding.md` current host matrix.
- `docs/dogfood/README.md` and `docs/dogfood/decision.md` operational status.
- `ROADMAP.md` next-gate status.
- Documentation-only Run 055 records under `docs/` and `issues/`.

## minimum complete change

Run the same current-version read-only loading checks for Codex and Claude,
classify pass versus environment block without inference, and report three
repetitions of a fixed status/summary command path with a clear timing
boundary. Align the public records and leave release, adherence, comparison,
and writable execution open.

## architecture-decision check

No ADR is required for this slice. It invokes existing provider CLIs and local
protocol commands for evidence and changes documentation only; it does not
change runtime architecture, persistence, schema, CI, or integration
behaviour. Any new provider adapter, execution boundary, or measurement
collector requires a separate contract and ADR check.

## public contracts

The provider onboarding matrix, dogfood status, and roadmap gain current
host-captured observations and a command-wall-time measurement boundary. No
machine-readable, provider, CLI, plugin, skill, or protocol contract changes.

## assumptions

- The current host's configured authentication state is the authority for this
  loading attempt; a missing or expired session is an environment result.
- A loading marker proves only that the host answered the harmless prompt from
  the loaded skill path.
- Three repetitions are enough for a small timing observation, not a stable
  performance estimate.

## risks

- Provider output may contain sensitive context; wrappers must emit only a
  classified summary and keep raw output out of repository records.
- Command wall time can be mistaken for active human effort; the ledger must
  state that active operator time remains unmeasured.
- A smoke pass can be mistaken for engineering adherence; the records must
  keep those claims separate.

## acceptance evidence

- Current versions and Codex discovery are captured without secrets.
- Codex and Claude loading results are classified from the exact marker or a
  bounded authentication/environment result.
- Three repetitions of the fixed status/summary path report durations and
  exit states, with no claim beyond command wall time.
- Provider guide, dogfood records, and roadmap align with the fresh results.
- Run 055 has fresh evidence, required high-risk approval, zero blockers, and
  valid local attestation and CI projection.
- Repository validation, tests, typecheck, whitespace, and hygiene checks pass.

## stop conditions

Stop if a provider command requires exposing credentials or persisting raw
output, if a smoke result cannot be classified honestly, if timing is presented
as human active time, or if the work expands into comparison, adherence,
containment, writable execution, or release approval.
