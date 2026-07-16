# adr: Codex CLI provenance adapter

## status

accepted

## context

The declared-baseline runner can assess a full corpus but cannot create real agent attempts or retain raw artifacts. Local Codex CLI 0.144.4 supports non-interactive execution with read-only sandboxing, ephemeral sessions, JSON response schemas, and final-message files. A provider SDK would add credentials and dependency coupling without improving the initial artifact boundary.

## decision

Use the local `codex exec` command as the first adapter. For each behavioural scenario, invoke it with `--sandbox read-only`, `--ephemeral`, `--output-schema`, and `--output-last-message`. Retain scenario input, prompt, response, stderr, and invocation metadata in a new caller-selected directory. Hash each retained artifact and emit an aggregate report containing attempts, assessments, and provenance.

Adapter mode is an explicit caller declaration: `without-extremely-hardcore` or `with-extremely-hardcore`. It is metadata only, not independently verified provenance.

## consequences

- The project gains a real Codex execution path without provider SDK coupling.
- Results can be inspected against raw, hash-addressed artifacts.
- The adapter still cannot prove what skills were loaded, whether raw artifacts are safe to publish, or whether one run establishes a benchmark.

## options considered

### Use a Codex SDK or API directly

Rejected because it adds credential and dependency commitments before artifact/provenance semantics are proven.

### Parse free-form final prose

Rejected because it makes evaluator inputs brittle and ambiguous.

### Use Codex CLI with a schema and raw artifacts

Accepted because it is locally available, constrained, and preserves a reviewable boundary.

## trade-offs

The implementation depends on the local CLI's supported flags and runs scenarios sequentially. Artifact retention can expose context, so publication requires a later redaction decision.

## follow-up work

Run and inspect a real declared baseline and a skill-assisted run in controlled workspaces, then define comparison and redaction policy before publication.

## review date

Before changing CLI flags, adding a second provider, or publishing real results.
