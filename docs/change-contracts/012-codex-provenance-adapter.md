# change contract: Codex provenance adapter

## user intent

Implement the first real Codex adapter after the declared baseline runner.

## current understanding

Codex CLI 0.144.4 is available locally and supports non-interactive execution, read-only sandboxing, ephemeral sessions, a JSON output schema, and a final-message output file. The evaluator has thirteen agent-attempt scenarios and a complete baseline assessor, but neither raw artifacts nor a real provider invocation path.

## allowed scope

- Add a Codex CLI adapter that runs agent-attempt scenarios sequentially in read-only, ephemeral mode.
- Define portable, hash-addressed per-scenario provenance and an aggregate adapter report.
- Add a JSON-only CLI that writes artifacts and one report to a caller-selected new directory.
- Test the adapter with an injected fake executor and update documentation, ADR, and proof records.

## forbidden scope

- Running model calls in tests or verification, provider SDKs, credentials, network APIs, retry policies, concurrency, transcript interpretation, benchmark publication, persistence, or CI thresholds.
- Changing protocol validation, deterministic core evaluation, or declared-baseline semantics.
- Claiming the adapter verifies a no-skill or skill-assisted mode declaration.

## affected areas

- `evaluation/`, `scripts/`, `tests/evaluation/`, `package.json`, and evaluation documentation.
- Slice 012 decision, contract, domain, boundary, plan, evidence, issue, and run records.

## public contracts

Adds experimental Codex adapter report/provenance JSON and `bun run evaluate:codex -- --output-dir <new-dir> --mode <mode>`. Existing evaluation report and baseline contracts remain unchanged.

## assumptions

The caller controls a valid Codex login and any model cost. The workspace selected for a run is safe for read-only agent inspection.

## risks

Model output is still provider-generated and mode is still caller-declared. Raw artifacts can contain sensitive repository context, so the output directory must be caller-selected and excluded from automatic publication.

## acceptance evidence

- The first adapter test fails because the module is absent.
- Fake execution verifies required Codex arguments, 13 attempts, assessments, and content digests.
- Invalid structured final output fails with retained artifacts.
- The CLI validates arguments without invoking Codex.
- Existing checks, tests, typecheck, and completion gate pass.

## stop conditions

- The adapter needs write-capable model access, provider SDK credentials, or hidden prompt/transcript inference.
- Artifact provenance cannot be captured without storing data outside the caller-selected directory.
