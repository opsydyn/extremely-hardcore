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

## Codex adapter

Run the 13 behavioural scenarios through the locally installed Codex CLI with:

```bash
bun run evaluate:codex -- \
  --output-dir ./codex-evaluation-artifacts \
  --workspace /path/to/target-workspace \
  --mode without-extremely-hardcore \
  --model gpt-5.6-sol
```

`--output-dir` must name a directory that does not yet exist. `--mode` is required and accepts `without-extremely-hardcore` or `with-extremely-hardcore`; it is caller-declared metadata, not independent proof of what skills Codex loaded. `--model` is required: the adapter passes the same requested value to every `codex exec` invocation and records it in report and invocation provenance. It controls caller configuration but does not independently prove provider-side routing. The adapter invokes `codex exec` once per scenario with `--sandbox read-only`, `--ephemeral`, `--output-schema`, and `--output-last-message`.

The output directory retains `response-schema.json`, `report.json`, and one directory per scenario containing canonical input, prompt, final structured response, stderr, and invocation metadata. The report carries SHA-256 digests and relative paths for every retained artifact. Inspect and redact the output directory before sharing it: prompts and responses may include repository context. The adapter establishes a reviewable execution path, not a published benchmark or CI gate.

The response schema, prompt, and canonical input expose one global vocabulary derived from all behavioural scenarios: `scope.drift`, `evidence.fabricated`, `evidence.stale`, `command.unsafe`, `transition.premature`, and `blocker.ignored`. Codex must choose only from that common set. The adapter rejects any other string, but the strict assessor still fails an attempt when Codex selects an allowed code that is not the scenario's expected code. The adapter does not disclose a scenario's individual expected answer.
