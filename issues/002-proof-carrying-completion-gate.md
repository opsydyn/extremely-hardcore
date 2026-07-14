# issue: proof-carrying completion gate

## outcome

Implement the smallest executable proof of the product promise: a change run cannot transition from `implemented` to `complete` unless every acceptance criterion has fresh passing command evidence and no blocker remains open.

## product hypothesis

Agents and reviewers will trust completion claims more when the claim is generated from captured evidence at a known workspace state rather than authored as prose by the implementing agent.

## user story

As an engineer delegating a non-trivial change, I can validate the run and see exactly which criterion, blocker, failed command, or stale workspace prevents completion.

## protocol slice

Store each run under:

```text
.extremely-hardcore/runs/<change-id>/
  run.json
  transitions.jsonl
  evidence/
    <evidence-id>.json
  logs/
    <evidence-id>.log
```

`run.json` must contain:

- `schemaVersion`.
- `changeId`.
- `initialState`, fixed to `implemented` in this slice.
- `risk`, recorded but not yet used for branching gates.
- Acceptance criteria with stable IDs and evidence references.
- Open and resolved blockers with stable IDs.

The current state is derived from `initialState` and `transitions.jsonl`. The transition log is append-only; transition commands must never rewrite earlier events.

An evidence record must contain:

- Evidence ID and criterion ID.
- Exact command and arguments executed by the CLI.
- Start time and duration.
- Exit code.
- Workspace fingerprint.
- Log path and SHA-256 digest.
- A bounded output summary generated from the captured log.

The workspace fingerprint must bind evidence to `HEAD` plus the content of tracked changes and untracked files, excluding `.extremely-hardcore/` to prevent evidence capture from invalidating itself.

## CLI contract

Provide these commands through a Bun entry point:

```text
eh evidence <run-path> <criterion-id> -- <command> [args...]
eh validate <run-path>
eh transition <run-path> complete
```

`evidence` executes the command itself, writes the bounded log and evidence record, and exits with the wrapped command's exit code.

`validate` is read-only. It prints actionable failures and exits non-zero when the run is invalid, evidence is stale or failed, a criterion is uncovered, or a blocker remains open.

`transition` validates the gate and appends one transition event only when validation succeeds. A failed transition must not modify the run definition or transition log.

## acceptance criteria

- A run with an uncovered criterion cannot complete.
- Evidence from a command with non-zero exit status cannot satisfy a criterion.
- Evidence captured against a different workspace fingerprint is stale and cannot satisfy a criterion.
- A run with any open blocker cannot complete.
- A valid run with fresh passing evidence for every criterion can complete.
- Successful completion appends a transition containing previous state, next state, timestamp, workspace fingerprint, and evidence IDs.
- Failed transition attempts leave `run.json` and `transitions.jsonl` byte-for-byte unchanged.
- Validation errors identify the exact criterion, blocker, or evidence record responsible.
- Paths and command arguments containing spaces are handled without shell interpolation.
- Logs have a documented size limit and truncation marker.
- The implementation uses Bun and Node standard-library APIs only unless an ADR justifies a dependency.

## test-first plan

Implement in vertical slices:

1. Failing test: uncovered criterion blocks completion.
2. Minimal run parser and completion validator.
3. Failing test: non-zero evidence does not satisfy a criterion.
4. Evidence record validation.
5. Failing test: changed workspace makes evidence stale.
6. Workspace fingerprint implementation.
7. Failing test: open blocker prevents completion.
8. Blocker validation.
9. Failing CLI integration test: unsuccessful transition does not mutate the run.
10. Guarded transition and append-only JSONL history.
11. End-to-end test: capture two commands, reject stale evidence, refresh evidence, complete.

Every test must be observed failing for the expected reason before its implementation is added.

## likely files

```text
protocol/schema-version.ts
protocol/types.ts
protocol/validate-run.ts
protocol/workspace-fingerprint.ts
protocol/evidence.ts
protocol/transition.ts
scripts/eh.ts
tests/protocol/*.test.ts
examples/proof-carrying-completion/
```

Final paths may follow a clearer boundary discovered during implementation, but scope must not expand beyond the completion gate.

## demo

The example must demonstrate:

1. Completion rejected because criterion B has no evidence.
2. Completion rejected after criterion B passes because criterion A evidence became stale.
3. Completion accepted after both criteria have fresh passing evidence.
4. The completed run explains the accepted transition without relying on conversation history.

## non-goals

- Full lifecycle FSM.
- Risk-dependent gates.
- Human approval records.
- Hosted storage.
- CI integration.
- Agent orchestration.
- Cryptographic signing.
- Protection against an adversary with unrestricted write access to the repository.
- YAML support.

## stop conditions

- Workspace fingerprinting cannot exclude protocol artefacts deterministically.
- Capturing commands safely requires shell interpolation.
- The protocol needs a database, daemon, or external service.
- Completion rules cannot be explained in one screen of CLI output.
- The slice grows into general lifecycle orchestration.

## success measure

Dogfood the gate on five non-trivial changes. Record false blocks, missed invalid states, time added before checks, and whether a fresh agent can understand the run without prior conversation.
