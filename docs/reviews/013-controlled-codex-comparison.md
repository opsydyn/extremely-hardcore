# bounded-context review: controlled Codex comparison

## proposed change

Operate the existing Codex adapter against two controlled local workspaces and record only a redacted comparison summary in the repository.

## affected contexts

- Evaluation operator: prepares workspaces and retains raw artifacts.
- Codex adapter: executes and reports under its existing contract.
- Repository documentation: records redacted outcome and limitations.
- Protocol: unchanged.

## allowed dependencies

Temporary clone -> existing adapter -> temporary artifact directories. Documentation may summarize inspected report fields only.

## suspicious dependencies

Any source-code modification, raw artifact commit, provider configuration difference, or claim that the adapter mode proves skill usage.

## data ownership

Temporary clone and artifact directories are operator-owned. The repository owns only redacted operational records.

## transaction boundaries

Each adapter invocation is independent. Comparison starts only after both reports and hashes validate.

## integration events

Two local external-process executions through the existing Codex adapter.

## anti-corruption needs

Mode remains declared metadata. Artifact review separates verified report structure from unverified claims about instruction adherence.

## verdict

safe with noted risk. The execution is controlled and artifact-backed, but a single declared comparison cannot establish causality or benchmark performance.
