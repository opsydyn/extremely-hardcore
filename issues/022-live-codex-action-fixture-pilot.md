# issue: live Codex action-fixture pilot

## intent

Execute one controlled live run of the committed Codex action-fixture adapter and inspect the retained provider artefacts alongside the independently scored fixture ledger.

## accepted scope

- Preflight the local Codex CLI and authenticated session.
- Run exactly one `evaluate:codex-action-fixture` command with one requested model and a new temporary output directory.
- Inspect report metadata, fixture ledger, retained-artifact integrity status, and the provider artefact inventory.
- Record the observed result and limitations in an evidence ledger.

## exclusions

- No code, skill, protocol, or adapter change.
- No retry, second model, second provider, comparison, threshold, or benchmark claim.
- No no-network, agent-identity, command-ownership, sandbox-enforcement, skill-loading, or provider-performance claim.
- No sharing of raw provider artefacts outside the local output directory.

## acceptance checks

- The output directory is new and contains an adapter report, runner report, provider artefact directories, and fixture protocol ledger.
- The report records the requested model and local Codex version.
- `fixture.status` and `provenance.status` are inspected independently.
- Any non-passing or invalid state is reported as such without retry or repair.

## stop conditions

- Stop on missing authentication, unavailable model, command failure, fixture failure, invalid provenance, unexpected workspace change, or any output containing material that should not be inspected further.
- Stop after the first completed attempt, regardless of outcome.
- Stop before making any stronger operational, provider, security, or benchmark claim.
