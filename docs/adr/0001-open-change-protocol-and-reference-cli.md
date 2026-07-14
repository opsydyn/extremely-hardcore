# ADR: open change protocol and reference CLI

## status

accepted

## context

`extremely-hardcore` currently ships architecture-first skills, templates, role prompts, policies, and a structural validator. The product thesis is stronger than a general engineering skill collection: agentic changes should move through explicit, risk-adjusted states, and every state transition should be justified by durable evidence.

Competing skill collections already cover planning, TDD, debugging, domain modelling, architecture, review, issue state machines, and durable progress. Markdown guidance alone is easy to copy and difficult to verify. A defensible product must make useful properties mechanically observable across agents, models, and sessions.

The repository's original non-goals reject a large framework and unnecessary runtime code. Any implementation must preserve that constraint.

## decision

Adopt an open, file-based change protocol with a small reference CLI.

The protocol will define:

- Change-run identity and schema version.
- Risk classification.
- Lifecycle state and append-only transition history.
- Required artefacts and gate conditions.
- Acceptance criteria and evidence references.
- Blocking findings and human approvals.
- Workspace revision or fingerprint associated with evidence.

The reference CLI will validate runs, capture command evidence, and permit guarded transitions. Skills remain the agent-facing reasoning and interaction layer. They will read and update protocol artefacts rather than maintaining workflow state only in conversation.

The protocol will be local-first, human-readable, versioned, and independent of any one agent harness. V1 will use JSON and the filesystem to avoid a parser dependency, server, database, daemon, or hosted control plane.

This decision is accepted for the proof-carrying completion gate. The broader product direction remains subject to review after dogfood evidence shows whether the protocol improves reliability without making ordinary work intolerable.

## consequences

- `extremely-hardcore` becomes a protocol and reference implementation, not only a skill collection.
- State and evidence can survive session compaction, agent handoff, and model changes.
- Deterministic validation can reject incomplete or stale completion claims.
- Skills must be revised to compose with protocol state and gates.
- Schema compatibility and migration become product responsibilities.
- Runtime code and tests increase, although the implementation remains deliberately small.
- The tool can provide traceability, not a hostile-security guarantee. Agents with unrestricted filesystem access can edit local artefacts; stronger attestation requires a separate threat model.

## options considered

### remain skills-only

Keep improving markdown, templates, and behavioural prompts.

Rejected as the strategic direction because it does not make state transitions or evidence mechanically verifiable and is straightforward to imitate.

### build a complete workflow engine

Provide orchestration, storage, agent execution, review scheduling, CI integration, and dashboards.

Rejected for now because it creates a framework before the core product claim has been proved.

### open protocol plus reference CLI

Define portable artefacts and implement only enough tooling to capture evidence and enforce gates.

Recommended because it creates a testable product boundary while preserving local ownership and low operational weight.

## trade-offs

The protocol adds ceremony and schema design to a product that currently consists mostly of prose. In return, it creates an observable contract that can be tested across agents and integrated into CI. JSON is less pleasant for long-form human writing than Markdown, so run state should reference Markdown artefacts rather than absorbing them.

The first slice intentionally enforces only the completion boundary. This leaves most lifecycle states advisory until later milestones, but proves the highest-value claim before broadening the machine.

## follow-up work

- Implement the proof-carrying completion gate.
- Dogfood it on at least five non-trivial changes.
- Measure completion-gate failures, false blocks, and operator overhead.
- Accept, revise, or reject this ADR using those results.
- Define a threat model before describing evidence as tamper-proof or cryptographically trusted.

## review date

After five dogfood runs or before beginning the full risk-aware FSM, whichever comes first.
