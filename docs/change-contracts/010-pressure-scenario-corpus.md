# change contract: pressure-scenario corpus

## user intent

Start the next behavioural-evaluation slice by defining the 20-scenario pressure corpus recommended by the roadmap.

## current understanding

The evaluation context has seven executable protocol scenarios and a pure `AgentAttempt` assessor. The roadmap requires a 20-scenario behavioural corpus, a baseline, and cross-agent runs, but neither a baseline nor an adapter exists.

## allowed scope

- Expand the declarative scenario manifest to 20 scenarios.
- Add explicit scenario execution modes, pressure descriptions, and the missing behavioural taxonomy categories.
- Add deterministic manifest validation and assessor coverage tests.
- Update the evaluation documentation, ADR, implementation plan, issue, and evidence ledger.

## forbidden scope

- Agent execution, prompts, SDKs, transcript parsing, credentials, persistence, CI thresholds, or benchmark claims.
- New protocol validator errors, changed completion semantics, or new CLI commands.
- Treating adapter-reported results as independently verified evidence.

## affected areas

- `evaluation/` and `tests/evaluation/`.
- Evaluation documentation and the local proof-carrying run record.

## public contracts

The experimental in-process scenario manifest gains execution mode and pressure-description fields, and `FailureCategory` expands to cover the roadmap taxonomy. `bun run evaluate` continues to emit only the seven executable scenarios. Protocol schemas and CLI grammar remain unchanged.

## assumptions

Future adapters can report the declared structured codes without requiring those codes to be emitted by the protocol CLI itself.

## risks

Declarative behavioural cases can be mistaken for executed agent evaluations. Execution mode and documentation must make the distinction explicit.

## acceptance evidence

- The first manifest test fails because only seven scenarios exist.
- The corpus contains 20 unique IDs and all required taxonomy categories.
- The deterministic report still contains only seven executable passing cases.
- The assessor accepts a declared behavioural scenario and preserves unknown-scenario rejection.
- Existing project checks, tests, typecheck, and completion gate pass.

## stop conditions

- A scenario cannot be represented using structured expected codes and a short pressure description.
- The slice requires provider-specific fields or an alteration of protocol error semantics.
