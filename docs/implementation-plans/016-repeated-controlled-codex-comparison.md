# implementation plan: repeated controlled Codex comparison

## behaviour to protect

The adapter, scenario corpus, schema, prompts, and strict assessor remain byte-for-byte the committed implementation. The two mode workspaces differ only by the documented removal of `AGENTS.md` and `skills/`.

## first failing test

Not applicable: this is an operational, documentation-only slice. Existing adapter tests protect the execution contract; live reports provide the campaign evidence.

## smallest implementation

Prepare one temporary clone per declared mode, validate the baseline deletion-only diff, run three order-balanced pairs with a constant requested model, independently inspect report/digest integrity, and write a redacted summary.

## refactor step

None. Do not change source code or introduce run orchestration into the repository.

## checks to run

- Login, CLI-version, commit, and workspace-diff checks.
- Report-count, model-provenance, artifact-digest, and conservative secret-pattern checks for all six artifact roots.
- `bun run check`, `bun run test`, and completion-gate validation after documentation is complete.

## rollback plan

Delete caller-owned temporary artifacts if retention is no longer needed. The tracked documentation-only record can be reverted without changing adapter behaviour.

## notes

Runs execute sequentially. The balanced sequence is baseline then skill, skill then baseline, baseline then skill. A failed run stops the campaign rather than being retried.
