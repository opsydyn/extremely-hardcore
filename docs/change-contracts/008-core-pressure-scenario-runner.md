# change contract: core pressure-scenario runner

## intent

Build the smallest reproducible evaluation harness for the completion gate: seven deterministic pressure scenarios and one machine-readable report.

## current understanding

The gate has unit and CLI tests plus five self-hosted dogfood runs. Those prove local behaviour but do not provide a reusable evaluation contract or comparable result artefact. The roadmap requires behavioural evaluation, but cross-agent orchestration is explicitly out of scope for this first slice.

## allowed scope

- Add an evaluation module, seven core scenarios, and a Bun CLI report command.
- Use temporary local files and Git repositories to reproduce protocol conditions.
- Emit JSON to stdout and cover the runner with tests.
- Add evaluation documentation and evidence records.

## forbidden scope

- Agent API integrations, prompts, model execution, or transcript parsing.
- CI gating, result storage, dashboarding, or external dependencies.
- New production lifecycle states or schema versions.

## affected areas

- `evaluation/`
- `scripts/evaluate.ts`
- `tests/evaluation/`
- Package scripts and evaluation documentation.

## public contract impact

Adds experimental `bun run evaluate` JSON output. Existing `eh` command behaviour and protocol schema remain unchanged.

## assumptions and risks

- Deterministic protocol pressure is a necessary foundation, not evidence of agent compliance.
- Result JSON must remain explicit enough for later agent adapters to populate without parsing prose.
- Temporary Git setup is available in the local evaluation environment.

## acceptance evidence

- The first runner test fails before the module exists.
- The report contains seven passing scenario results with the declared categories and error codes.
- `bun run evaluate` produces parseable JSON.
- Existing checks remain green.

## stop conditions

- A scenario needs agent orchestration or a database to run.
- Result data cannot be represented in one JSON report without inventing an unstable general workflow format.
