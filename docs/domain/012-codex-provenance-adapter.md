# domain map: Codex provenance adapter

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Adapter mode | Caller declaration of `without-extremely-hardcore` or `with-extremely-hardcore`. | Caller |
| Scenario input | Canonical manifest fields supplied to one Codex invocation. | Evaluation core |
| Structured final response | Schema-constrained Codex final message containing observed codes. | Codex adapter |
| Raw artifact | Input, prompt, response, stderr, schema, or invocation record retained by the adapter. | Caller-selected output directory |
| Provenance record | Hashes and relative paths tying one attempt to its raw artifacts and invocation. | Codex adapter |
| Adapter report | Aggregate attempts, assessments, adapter identity, and provenance. | Codex adapter |

## candidate bounded contexts

- Evaluation core owns scenario identity, expected observations, and assessment.
- Codex adapter owns command construction, structured-response parsing, raw artifact writes, and provenance.
- Delivery CLI owns argument parsing and report path selection.
- Codex CLI is an external executable; it owns model invocation and final response generation.

## policies/rules

- Every run uses read-only sandboxing and ephemeral Codex sessions.
- Every successful attempt has a canonical scenario input, prompt, final response, stderr log, invocation record, and SHA-256 digests.
- The output directory must not exist before a run starts, avoiding accidental artifact mixing.
- Structured final responses provide only `observedErrorCodes`; prose is retained but never assessed.
- Mode is descriptive metadata, never independent proof of skill presence or absence.

## invariants

- Scenario order follows `AGENT_ATTEMPT_SCENARIOS`.
- A non-zero Codex process or invalid final response prevents a report from being written.
- Protocol and deterministic evaluation do not depend on the Codex adapter.

## external systems

The local `codex` executable. Authentication, model selection, and network access remain Codex CLI concerns.

## ambiguity

Prompt fixture depth, redaction rules, retries, multi-agent comparability, and benchmark storage are deferred.

## recommended next questions

Which redaction and retention policy is required before sharing real adapter artifacts outside the originating workspace?
