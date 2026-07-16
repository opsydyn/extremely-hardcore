# change contract: repeated controlled Codex comparison

## user intent

Continue the evaluation roadmap with the first repeated, corrected declared-mode Codex comparison.

## current understanding

The initial one-pair comparison exposed identifier-formatting variance. Slice 014 supplied a global allowed observation vocabulary without disclosing per-scenario answers, and slice 015 now requires and records a requested model. Codex CLI 0.144.4 is authenticated locally; `gpt-5.6-sol` is the requested model for this campaign.

## allowed scope

- Create two clean temporary clones at `45f4d1c8a071a693ba84fd83025a6daa17378dff`.
- Remove only `AGENTS.md` and `skills/` from the declared baseline clone.
- Run each declared mode three times in balanced order using the existing read-only, ephemeral adapter and `--model gpt-5.6-sol`.
- Verify reports, artifact digests, requested model provenance, and conservative secret-pattern scans.
- Record redacted aggregate results, documentation, issue, and a protocol run.

## forbidden scope

- Source-code changes, scenario changes, retries, model/CLI changes between runs, provider comparison, CI thresholds, raw artifact commits, causal claims, or claims that declared mode proves loaded skills.

## affected areas

- Caller-owned temporary clones and artifact directories outside the repository.
- Operational documentation and slice 016 protocol records only.

## public contracts

No contract changes. This exercise uses the existing experimental adapter contract from ADRs 0009, 0010, and 0011.

## assumptions

The local Codex CLI accepts the pinned requested model for all six adapter runs. Separate ephemeral executions reduce state carry-over. The existing adapter's output schema and prompts are identical for both declared modes.

## risks

Three observations per mode remain a small descriptive sample. Provider routing, reasoning configuration, hidden system state, and actual skill loading remain outside independent verification. Raw artifacts may include sensitive repository context.

## acceptance evidence

- Commit identity, baseline deletion-only diff, local CLI version, and login status are captured before execution.
- Six reports pass report-shape, requested-model, and artifact-digest verification.
- The report summary captures strict pass counts per repetition and a redacted artifact scan outcome.
- Repository validation, full tests, and completion gate pass after documentation is complete.

## stop conditions

- Authentication or a live adapter run fails, the requested model is unavailable, a report is invalid, a digest mismatches, workspaces differ beyond allowed deletions, or artifact review finds unsafe material for a redacted summary.
