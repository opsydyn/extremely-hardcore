# Read-only review fixture and no-model preflight

Date: 2026-09-22. This is a local experimental evaluation slice, not a provider
comparison. No model turn was run.

## Contract and boundary

The approved minimum change is one frozen review task, an independent executable
witness scorer, and a fail-closed check of two supplied arm records. It does not
change installed EHS skills, ADR 0006's agent-attempt contract, provider adapters,
or host configuration. The earlier [decision challenge](065-comparison-control-and-scoring-readiness.md)
held comparative execution and authorised this no-model preparation. No new ADR
is needed: this is internal evaluation tooling with no runtime, dependency,
shared-package, or public product-contract change.

The task is [`task.md`](../../evaluation/fixtures/review-pagination/task.md).
Only that file may be staged for either model arm. Never mount this repository,
the executable fixture source, the scorer, or this document into an agent
workspace; doing so would expose the outcome. The fixture contains one seeded
pagination regression and a harmless local-variable rename. The scorer requires
one finding at the changed line with an input/output witness that reproduces the
regression. Zero findings, surplus findings, wrong locations, malformed fields,
and witnesses without an observed failure fail. It does not judge prose semantics
beyond non-empty `failure` and `remainingUncertainty`; a passing witness is not
proof of a good written review or of coding ability.

## Commands

Freeze the pin before collecting answers, using the staged nine-skill directory
that would be enabled in treatment:

```bash
bun run evaluate:review -- pin /absolute/path/to/staged/skills
```

Keep that JSON with the experiment record. It hashes the task, executable
fixture, output schema, entire staged skill tree, and the planned native
`using-extremely-hardcore` invocation. Do not regenerate pins after observing
answers. To score a structured answer or check arm evidence:

```bash
bun run evaluate:review -- score /path/to/answer.json
bun run evaluate:review -- preflight /path/to/arm-record.json
```

`score` and `preflight` emit JSON and return nonzero for a failed/invalid or
blocked result. The arm record is a JSON object with `schemaVersion: 1`, `pin`
from the earlier command, and `control` and `treatment` objects. Each arm must
include the pinned `taskSha256` and `outputSchemaSha256`, a `model`,
`permissions` (`sandbox`, `approval`, `network`), string arrays `tools`, `hooks`,
`mcpServers`, and `instructionSources`, a `trace` object with boolean `events`,
`final`, `usage`, and `toolCalls`, a `skills` array of unique
`{name,path,enabled}` entries, and `invocation`. Control invocation is
`{"kind":"none"}`. Treatment adds absolute `skillRoot` and uses
`{"kind":"native-skill","path":"/absolute/path/to/staged/skills/using-extremely-hardcore/SKILL.md"}`.

The preflight requires matching task, model, permissions, tools, hooks, MCPs,
instruction sources, schema, and full trace retention. Both arms request
read-only sandbox and disabled network. The control has zero enabled skills and
no staged EHS skills; treatment has exactly nine enabled EHS skills, and all
other discovered skills are disabled and identical in both arms. Duplicate
names or incomplete fields block. The staged tree is read and hashed locally,
including templates, with symlinks rejected. `ready` means only that this
record is internally consistent with the local pinned material.
On macOS, stage paths may appear as `/var` locally and `/private/var` in
`skills/list`; the preflight compares their resolved file identity while
requiring the exact native invocation JSON to match the pinned digest.

## Remaining gates

The record is caller-supplied. This command cannot attest that its skill list
came from `skills/list`, that hooks and tools match real host state, that
instructions were delivered, or that read-only/no-network settings were
enforced. Retain raw host inventory and event traces separately, inspect them,
and stop if they do not match the record. A future A/A model run still needs
predeclared repetitions, budget, order, stopping rule, and treatment of missing
usage. A/B and any EHS-effect claim remain on hold. This fixture can only
support a narrow seeded review-witness outcome, not implementation quality.

- result: complete
- claim: The no-model fixture, scorer, and supplied-record preflight are available; comparison readiness is not established.
- evidence: Focused fixture and preflight tests; project verification recorded in the implementing turn.
- remaining uncertainty: Host provenance and actual model input, semantic quality of prose, repeated-run variation, writable-task containment.
- next: Freeze a run-specific pin and obtain raw no-model host records before considering A/A.

Recommendation: hold on model comparison.
