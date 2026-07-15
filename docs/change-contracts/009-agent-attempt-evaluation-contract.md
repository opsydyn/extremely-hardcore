# change contract: agent-attempt evaluation contract

## intent

Add the smallest portable interface between future agent adapters and the deterministic pressure-scenario evaluator.

## current understanding

The evaluator currently runs seven core scenarios itself and returns JSON results. It has no declared scenario manifest for adapters and no way to assess an externally supplied structured attempt. The roadmap requires Codex and Claude runs later, but provider execution remains out of scope.

## allowed scope

- Extract a declarative core scenario manifest.
- Define `AgentAttempt` and `AgentAttemptAssessment` types.
- Add a pure attempt assessor with tests.
- Update evaluation and roadmap documentation.

## forbidden scope

- Agent API calls, prompts, transcripts, credentials, external state, or CI thresholds.
- Expanding beyond the existing seven scenarios.
- Treating adapter-supplied fields as tamper-proof evidence.

## affected areas

- `evaluation/`
- `tests/evaluation/`
- Evaluation docs, ADR, issue, and roadmap.

## public contract impact

Adds an experimental in-process JSON-shaped agent-attempt contract. `bun run evaluate` output and protocol run schema remain unchanged.

## acceptance evidence

- First test fails before the attempt-assessor module exists.
- A valid stale-evidence attempt passes, a missing expected code fails, and an unknown scenario is invalid.
- Existing core runner uses the same manifest and remains green.

## stop conditions

- The contract needs natural-language transcript parsing to assess an attempt.
- Provider-specific fields are required in the shared core type.
