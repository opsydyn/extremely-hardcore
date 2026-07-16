# change contract: controlled Codex comparison

## user intent

Run the next planned operational evaluation: one declared no-skill Codex run and one declared skill-assisted Codex run, then inspect the resulting artifacts before recording a bounded comparison.

## current understanding

Commit `e4c0c3c` contains the Codex adapter. Codex CLI 0.144.4 is locally authenticated. The adapter runs all thirteen behavioural scenarios in read-only ephemeral mode and writes raw artifacts plus a report. Its mode marker is caller-declared only.

## allowed scope

- Create a temporary clone of the current commit and remove only `AGENTS.md` and `skills/` for the declared no-skill workspace.
- Run the existing adapter twice, using separate temporary output directories.
- Inspect report shape, assessments, artifact hashes, and retained raw responses.
- Record a comparison summary, operational evidence ledger, issue, and run record without copying raw artifacts into the repository.

## forbidden scope

- Source-code changes, altered prompts, model configuration changes, benchmark publication, CI thresholds, provider comparisons, or claims that mode is independently verified.
- Copying raw Codex artifacts, prompts, or responses into the tracked repository.

## affected areas

- Temporary caller-owned workspaces and output directories outside the repository.
- Operational documentation and run record only.

## public contracts

No API or schema change. This run exercises the existing experimental adapter contract under ADR 0009.

## assumptions

The temporary clone and the current checkout expose the same commit content except for the removed agent-instruction files. Codex account access is available for both runs.

## risks

One run per mode is not a benchmark. Mode remains self-declared, and raw output may contain sensitive context. An adapter failure may leave partial artifacts that must be retained outside the repository and recorded honestly.

## acceptance evidence

- Commit identity and the baseline workspace diff prove the controlled workspace setup.
- Each adapter report has 13 attempts, 13 assessments, and per-scenario provenance.
- Artifact digest verification passes for both reports.
- The comparison record names all failures and does not make statistical or causal claims.
- Completion-gate evidence covers setup verification, artifact inspection, report validation, documentation validation, and full repository tests.

## stop conditions

- Codex authentication fails, the adapter produces invalid output, or artifact review identifies sensitive content unsuitable for the planned summary.
- The two workspaces differ beyond the allowed removal of `AGENTS.md` and `skills/`.
