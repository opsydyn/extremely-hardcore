# issue: add the declared baseline assessment runner

## outcome

Provide a strict JSON-only runner that assesses one declared no-skill attempt for every behavioural pressure scenario and emits an aggregate report.

## acceptance criteria

- A baseline input declares `without-extremely-hardcore` and contains one attempt for every `agent-attempt` scenario.
- Missing, duplicate, deterministic, or unknown scenario attempts are rejected before assessment.
- A valid full input emits machine-readable assessments and summary counts.
- The runner does not invoke models, accept prompts, retain transcripts, or claim that the no-skill declaration is independently verified.

## non-goals

- Codex or Claude adapters, model invocation, transcripts, persistence, benchmark storage, or CI thresholds.
- Proving the factual absence of a skill from a self-declared input.
