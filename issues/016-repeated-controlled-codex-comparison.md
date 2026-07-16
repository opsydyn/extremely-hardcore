# issue: repeat the corrected controlled Codex comparison

## outcome

Run three paired declared-mode Codex evaluations with the corrected global vocabulary and one pinned requested model. Retain raw artifacts outside the repository and publish only redacted aggregate and integrity evidence.

## acceptance criteria

- Three runs exist for each declared mode at one target commit and requested model.
- Each report contains 13 attempts, 13 assessments, and valid digests for every retained artifact.
- Run order is balanced across repetitions to reduce simple sequence bias.
- The tracked comparison record reports per-repetition results and descriptive range only.
- It makes no causal, benchmark, regression-threshold, or independently verified skill-loading claim.

## non-goals

- Source changes, provider comparison, retries, CI integration, or action-level repository tasks.
