# domain map: Codex action-fixture provenance adapter

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Provider stage | One requested Codex process for `fix` or `resume`. | Adapter |
| Raw provider artefact | Uninterpreted prompt, invocation metadata, stdout, stderr, or final message. | Adapter |
| Fixture ledger | Immutable fixture command record linked to protocol artefacts. | Fixture CLI |
| Fixture result | Staged pass/fail report derived by the runner. | Fixture runner |
| Provenance report | Digest-linked inventory joining retained provider artefacts and fixture result. | Adapter |

## candidate bounded contexts

- The provider adapter owns Codex invocation and raw process artefacts.
- The bounded fixture owns task instructions and local protocol commands.
- The fixture runner owns scoring and output workspace lifecycle.
- Generic protocol owns V1 evidence and completion validation.

## aggregates/entities/value objects

- `CodexActionFixtureStageProvenance`: requested stage, duration, exit status, command metadata, and retained artefact digests.
- `CodexActionFixtureAdapterReport`: adapter metadata, unmodified fixture result, fixture report digest, and stage provenance.
- `ActionFixtureRequest`: existing stage handoff from runner to executor.

## commands

- Evaluate Codex action fixture.
- Execute requested `fix` or `resume` provider stage.
- Retain provider stage artefacts.

## events

- Provider stage invoked.
- Provider artefacts retained.
- Fixture stage scored.

## policies/rules

- Provider artefacts live outside the copied workspace, so fixture diff validation cannot be affected by their storage.
- Raw provider stdout is not parsed for scoring.
- The requested model and sandbox value are recorded as request metadata only.
- The adapter report may describe retained artefacts but not agent identity or applied isolation.

## invariants

- The runner is the sole pass/fail authority.
- There are exactly two provider stages when the fixture reaches both stages: `fix`, then `resume`.
- Every reported provider artefact digest resolves below the caller-selected output directory.
- The adapter never writes fixture protocol artefacts itself.

## external systems

Local Codex CLI is the only external executable. Its authentication, model routing, execution semantics, and JSON event format remain provider-owned.

## integration points

The adapter implements the runner's `ActionFixtureExecutor` handoff and places retained artefacts adjacent to the runner output. No generic protocol import or schema change is needed.

## ambiguity

Codex event JSON does not have a locally verified stable schema or documented guarantee that every shell command is emitted. Therefore no automatic command correlation is part of this model.

## recommended next questions

What provider-supported, stable attestation could bind a command invocation to a specific execution process without promoting raw transcript parsing into a scorer?
