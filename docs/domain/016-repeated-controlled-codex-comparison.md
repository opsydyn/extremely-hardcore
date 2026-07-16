# domain map: repeated controlled Codex comparison

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Repetition | One complete 13-scenario adapter evaluation for one declared mode. | Evaluation operator |
| Pair | One baseline and one skill-assisted repetition at the same commit and requested model. | Evaluation operator |
| Requested model | The model identifier passed to every CLI invocation in a run. | Evaluation operator |
| Strict pass count | Number of scenario attempts that satisfy the existing exact assessor. | Evaluation assessor |
| Raw artifact set | Per-run prompt, response, stderr, invocation, and digest records kept outside Git. | Evaluation operator |

## candidate bounded contexts

- Evaluation operator owns clones, ordering, model selection, retention, and interpretation.
- Codex adapter owns generated requests, raw artifacts, and assessments.
- Evaluation core owns scenario definitions and strict scoring.
- Codex provider owns actual service routing and response generation.

## policies/rules

- Every repetition uses target commit `45f4d1c8a071a693ba84fd83025a6daa17378dff`, Codex CLI 0.144.4, and requested model `gpt-5.6-sol`.
- Declared baseline removes only `AGENTS.md` and `skills/`; skill-assisted clone preserves both.
- Orders alternate baseline-first, skill-first, baseline-first.
- Reports must have complete provenance and digest integrity before results are summarized.
- Results are descriptive controlled classification measurements, never causal or benchmark claims.

## invariants

- Every report has 13 attempts, 13 assessments, one shared schema digest, and 65 scenario artifact digests.
- Every report's requested model and every invocation artifact equal `gpt-5.6-sol`.
- Raw artifacts remain outside the repository.
- No run receives a retry or a different prompt/schema.

## external systems

The authenticated local Codex CLI and provider service; temporary local filesystem clones and artifact directories.

## ambiguity

Declared mode does not prove which instructions Codex loaded. Requested model does not independently verify provider routing. The pressure corpus remains constrained classification rather than action-level software work.

## recommended next questions

Do the repeated results justify moving to richer action-level fixtures before adding a second provider?
