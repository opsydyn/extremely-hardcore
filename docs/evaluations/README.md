# Core pressure evaluation

Run the deterministic core suite from the repository root:

```bash
bun run evaluate
```

The command writes one JSON document to stdout. Exit status is zero only when every scenario passes.

## Report contract

```json
{
  "schemaVersion": 1,
  "results": [
    {
      "scenarioId": "core.stale-evidence",
      "category": "stale-evidence",
      "expectedErrorCodes": ["evidence.stale"],
      "observedErrorCodes": ["evidence.stale"],
      "status": "passed",
      "durationMs": 0
    }
  ]
}
```

Each scenario uses an isolated temporary workspace. The stale-evidence scenario uses a temporary Git repository, captures its fingerprint, changes a tracked file, and verifies rejection against the new fingerprint.

## Executed scenarios

`bun run evaluate` executes the seven deterministic protocol fixtures:

- `core.uncovered-criterion`
- `core.failed-evidence`
- `core.stale-evidence`
- `core.missing-evidence-record`
- `core.missing-evidence-log`
- `core.open-blocker`
- `core.repeated-completion`

## Pressure corpus

The manifest contains 20 scenarios. Each declares an `executionMode`, expected structured error codes, and a short pressure condition. Seven scenarios use `deterministic` execution; thirteen use `agent-attempt` and require a future baseline or agent adapter to supply an `AgentAttempt`.

The corpus covers scope drift, fabricated evidence, stale state, unsafe commands, premature completion, and ignored blockers. The agent-attempt scenarios are declared evaluation cases, not model runs or benchmark evidence.

## Boundary

This is a deterministic protocol harness, not an agent benchmark. It does not invoke Codex, Claude, or any model API; it does not establish baseline comparisons; and it does not apply CI merge thresholds. Later adapters must preserve this result vocabulary rather than parse natural-language output.

## Future Agent Attempts

The evaluation core now defines an experimental, provider-neutral attempt shape for future adapters:

```json
{
  "schemaVersion": 1,
  "scenarioId": "core.stale-evidence",
  "agent": { "id": "codex", "harness": "desktop" },
  "observedErrorCodes": ["evidence.stale"],
  "durationMs": 1200
}
```

The pure assessor compares the attempt to the pressure-scenario manifest and returns `passed`, `failed`, or `invalid`. It does not run the agent, parse transcripts, retain raw artefacts, or establish that adapter-supplied values are independently trustworthy. Those are future adapter and provenance decisions.

## Declared baseline

Assess a complete, self-declared no-skill baseline with:

```bash
bun run evaluate:baseline -- path/to/baseline.json
```

The input must declare `"kind": "without-extremely-hardcore"` and provide exactly one structured `AgentAttempt` for every one of the 13 `agent-attempt` scenarios. The command emits JSON containing canonical per-scenario assessments and `{ total, passed, failed, invalid }` summary counts. It rejects missing, duplicate, deterministic, or unknown scenarios with a non-zero exit.

The declaration is a caller assertion, not verified provenance. This command neither invokes an agent nor proves that a skill was absent; prompt configuration, transcripts, and external-harness details remain future adapter responsibilities.
