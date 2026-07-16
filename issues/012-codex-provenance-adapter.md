# issue: add the Codex provenance adapter

## outcome

Run Codex CLI against the thirteen behavioural pressure scenarios and retain a complete, hash-addressed artifact set that produces the existing structured attempts.

## acceptance criteria

- The adapter invokes `codex exec` with `--sandbox read-only`, `--ephemeral`, a response schema, and a final-message file.
- Each successful scenario retains canonical scenario input, prompt, final response, stderr, invocation metadata, and SHA-256 digests.
- The aggregate report contains structured attempts, assessments, adapter version, explicit mode declaration, and per-scenario provenance.
- A fake executor proves command construction and artifact/report mechanics without invoking a model in tests.
- No benchmark, cross-agent comparison, persistence service, CI threshold, or claim that mode declarations are independently verified is added.

## non-goals

- Prompt optimization, autonomous code changes, transcript interpretation beyond the structured final response, or executing a paid model call during test verification.
