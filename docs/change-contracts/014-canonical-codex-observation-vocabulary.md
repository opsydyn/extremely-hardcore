# change contract: canonical Codex observation vocabulary

## user intent

Fix the adapter measurement flaw found in the controlled Codex comparison before repeating live runs.

## current understanding

Both controlled runs recognized every pressure condition in prose, but the strict assessor rejected many results because Codex emitted non-canonical identifiers. The adapter response schema accepted arbitrary strings and the prompt did not state the valid global vocabulary. The current strict assessor correctly compares expected canonical codes and should remain unchanged.

## allowed scope

- Derive one ordered vocabulary from `AGENT_ATTEMPT_SCENARIOS` expected codes.
- Include that vocabulary in the Codex response schema, canonical scenario input, and prompt.
- Runtime-validate final response codes against the vocabulary.
- Add focused tests and update evaluation docs, ADR, roadmap, and proof records.

## forbidden scope

- Per-scenario answer disclosure, fuzzy normalization, new error codes, scenario changes, live provider calls, comparison repetition, CI thresholds, or benchmark claims.
- Changes to deterministic evaluation, declared-baseline assessment, or protocol validation.

## affected areas

- `evaluation/run-codex-adapter.ts`, focused adapter tests, and evaluation documentation.
- Slice 014 decision, contract, domain, boundary, plan, evidence, issue, and run records.

## public contracts

The experimental Codex response schema, scenario input artifact, and prompt gain a global allowed-code vocabulary. Adapter reports retain the existing attempt and assessment shapes.

## assumptions

Selecting from a global vocabulary does not reveal the expected answer for a given scenario because multiple candidate codes remain available on every invocation.

## risks

The vocabulary can still make the task a constrained classification exercise rather than an end-to-end behaviour test. The provider may choose an incorrect allowed code, which strict assessment must continue to detect.

## acceptance evidence

- A first adapter test fails because the response schema and prompt do not expose the global vocabulary.
- A fake executor verifies all six allowed codes are present but no scenario-specific code is injected as a unique answer.
- A non-canonical code is rejected even when the structured response is otherwise valid.
- Existing project checks, tests, typecheck, and completion gate pass.

## stop conditions

- The change needs semantic guessing or a provider-specific normalization library.
- The schema must encode the single expected code for each scenario.
