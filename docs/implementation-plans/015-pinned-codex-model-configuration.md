# implementation plan: pinned Codex model configuration

## behaviour to protect

All Codex scenarios remain read-only, ephemeral, and assessed by the existing strict evaluator. A single run must use one explicit requested model throughout its provenance.

## first failing test

Assert the fake executor sees `--model gpt-5.6-sol` on all 13 requests and that report and invocation JSON retain that value. Assert the CLI rejects otherwise valid options when `--model` is omitted.

## smallest implementation

Add a required `model` option to adapter options and report types. Include `--model <value>` in generated arguments and record it. Parse and require the CLI flag.

## refactor step

Keep configuration local to the CLI and adapter. Do not add provider discovery, defaults, or a shared configuration subsystem.

## checks to run

- Focused Codex adapter and CLI tests.
- Existing evaluations, `bun run check`, `bun run test`, and `bunx tsc --noEmit`.
- Completion-gate evidence against the final workspace revision.

## rollback plan

Revert the adapter, CLI, report-type, documentation, and ADR changes together. No persistent remote state or migration is introduced.

## notes

No live adapter call belongs to this contract-hardening slice; repeated live runs start only after it is complete.
