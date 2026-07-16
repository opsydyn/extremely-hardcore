# ADR: provider-neutral staged action fixture

## status

accepted

## context

Repeated declared-mode Codex classification runs now produce the same strict result in both modes. The existing `AgentAttempt` contract records observed codes but cannot score an agent that changes a workspace, captures evidence, survives a stale-state intervention, and completes a run. Coupling the first action fixture to a provider would entangle scoring with model execution before the local oracle is proven.

## decision

Create one provider-neutral bounded bug-fix fixture and a two-stage runner. The runner copies tracked fixture assets into a Git workspace, calls an injected `fix` executor, verifies Stage A state, applies one exact tracked marker mutation, calls an injected `resume` executor, and scores final workspace/protocol state. Reuse existing evidence, fingerprint, validation, and transition APIs. Ship a deterministic reference executor only to dogfood the local oracle.

## consequences

- The evaluator can measure observable action-level protocol behaviour without provider calls.
- Provider adapters later implement a narrow staged-executor boundary instead of defining result semantics.
- The first fixture is intentionally small and may not generalise beyond its bounded change/task shape.
- Output roots retain workspace artifacts and require the same caller-owned review discipline as current adapter artifacts.

## options considered

### Add more classification scenarios

Rejected because the corrected corpus is stable but non-discriminative and still does not observe repository action.

### Build a Codex-specific staged runner first

Rejected because it would make provider execution and prompt handling part of the scoring contract before the fixture oracle is independently testable.

### Use one provider-neutral staged runner with a reference executor

Accepted because it separates durable fixture semantics from future execution adapters.

## trade-offs

The runner needs explicit temporary-workspace, diff, and stage lifecycle code. A deterministic reference executor proves the harness, not an agent. The fixture uses a known expected patch and must not be presented as a broad capability benchmark.

## follow-up work

After local dogfood, define a narrow provider adapter that preserves stage boundaries and raw provenance without interpreting transcripts.

## review date

Before adding the first live staged provider run.
