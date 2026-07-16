# change contract: declared baseline runner

## user intent

Implement the next roadmap slice: a baseline runner without `extremely-hardcore`.

## current understanding

The pressure manifest contains seven deterministic fixtures and thirteen `agent-attempt` scenarios. The pure assessor can compare one attempt, but there is no full-corpus input contract or aggregate report. A local CLI cannot establish how an external agent was prompted or whether it actually lacked the skill.

## allowed scope

- Define experimental baseline-input and aggregate-report types.
- Add pure validation and assessment for a complete declared baseline input.
- Add a JSON-only CLI that reads one input file and writes one report.
- Add fixtures, tests, documentation, ADR, and proof-run artefacts.

## forbidden scope

- Provider SDKs, prompts, model execution, transcript parsing or retention, credentials, persistence, benchmark publication, or CI gating.
- Changes to protocol validation, completion semantics, or the deterministic `bun run evaluate` command.
- Claims that the runner independently proves the absence of `extremely-hardcore`.

## affected areas

- `evaluation/`, `scripts/`, `tests/evaluation/`, `package.json`, and evaluation documentation.
- Slice 011 decision, contract, domain, boundary, plan, evidence, issue, and run records.

## public contracts

Adds experimental JSON input and output contracts plus `bun run evaluate:baseline -- <input-path>`. Existing protocol schemas and `bun run evaluate` output remain unchanged.

## assumptions

An external harness can create structured `AgentAttempt` data and explicitly declare that it ran without the skill.

## risks

The declaration is self-reported and must not be treated as benchmark provenance. Requiring complete corpus coverage may require a later resumable storage design.

## acceptance evidence

- A first test fails because no baseline evaluator exists.
- A complete fixture yields 13 assessments and correct summary counts.
- Missing or duplicate scenario coverage is rejected.
- CLI output is parseable JSON and no model invocation occurs.
- Existing checks, tests, typecheck, and completion gate pass.

## stop conditions

- The runner needs a model SDK, transcript parser, or provider-specific field.
- The contract needs to claim independently verified provenance.
