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

## Current scenarios

- `uncovered-criterion`
- `failed-evidence`
- `stale-evidence`
- `missing-evidence-record`
- `missing-evidence-log`
- `open-blocker`
- `repeated-completion`

## Boundary

This is a deterministic protocol harness, not an agent benchmark. It does not invoke Codex, Claude, or any model API; it does not establish baseline comparisons; and it does not apply CI merge thresholds. Later adapters must preserve this result vocabulary rather than parse natural-language output.
