# adr: Codex action-fixture provenance retention

## status

accepted

## context

ADR 0012 introduced a provider-neutral staged action fixture. ADR 0013 held the live Codex proposal because the fixture could not create protocol actions locally. ADR 0014 added an immutable fixture-local protocol CLI and structural ledger, but it deliberately does not establish external-process identity. The next integration must retain provider-side process artefacts while preserving the fixture runner as the only scorer.

## decision

Add a separate experimental Codex action-fixture adapter. It invokes `codex exec` once for `fix` and once for `resume`, requesting `--sandbox workspace-write`, `--ephemeral`, `--cd`, `--json`, and `--output-last-message`. It stores each prompt, invocation metadata, raw stdout, stderr, and emitted final message under the caller-selected output directory, outside the copied fixture workspace. Its report carries digest-linked provider provenance and nests the unchanged runner-owned fixture result.

The adapter treats provider output as opaque retained evidence. It must not parse output to decide fixture pass/fail or assert command ownership, identity, no-network execution, sandbox enforcement, or protocol compliance.

## consequences

- A later operator can review provider artefacts and the fixture ledger together.
- The output directory may contain sensitive prompt or workspace context and must be reviewed before sharing.
- Two provider invocations may consume time and quota when an operator elects to run the command.
- The experimental report is a new public local CLI contract, while existing contracts remain unchanged.

## options considered

- Retained raw artefact adapter: accepted; preserves the scorer boundary and provides review material.
- Parse `--json` events into command assertions: rejected; no stable local contract or completeness guarantee supports it.
- Generic multi-provider adapter: rejected; it would encode untested provider assumptions before one proven adapter exists.
- Source-change-only adapter: rejected for this slice; ADR 0014 now supports a stronger, still carefully limited structural-provenance boundary.

## trade-offs

This is intentionally weaker than command attestation. It favours truthful evidence retention over convenient but unsupported automatic attribution. It also duplicates some process-execution mechanics from the read-only adapter to keep write-capable fixture semantics isolated.

## follow-up work

- Run the experimental command only under an explicitly approved operational protocol and assess the resulting artefacts manually.
- Consider provider-supported command attestation only if it has a stable, documented contract.

## review date

2026-10-22
