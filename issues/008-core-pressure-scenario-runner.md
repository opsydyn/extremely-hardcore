# issue: implement core pressure-scenario runner

## outcome

Create a deterministic local runner that exercises the completion gate's seven observed pressure conditions and emits a machine-readable JSON report.

## scenarios

- Uncovered criterion.
- Failed evidence command.
- Stale evidence after a tracked workspace change.
- Missing evidence record.
- Missing evidence log.
- Open blocker.
- Repeated completion attempt.

## acceptance criteria

- `bun run evaluate` emits one JSON report with a result for every scenario.
- Each result includes scenario ID, failure category, expected error codes, observed error codes, status, and duration.
- The stale scenario uses a real temporary Git workspace change.
- The repeated-completion scenario observes a successful first transition and a rejected second transition.
- The runner has no external dependencies or agent-orchestration integration.

## non-goals

- Cross-agent execution, Claude/Codex adapters, baseline comparisons, or model prompts.
- Twenty-scenario corpus, CI thresholds, or hosted result storage.
- Parsing natural-language agent output.
