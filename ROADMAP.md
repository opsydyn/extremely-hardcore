# Extremely Hardcore Product Roadmap

## Product Position

`extremely-hardcore` is the verifiable control plane for high-risk agentic software changes.

It does not compete by owning the largest skill catalogue. It makes one narrower promise:

> A change may advance only when its risk-adjusted gate is satisfied by durable, traceable evidence.

Skills provide judgement. The protocol records state. The reference CLI captures evidence and enforces transitions. Humans retain authority over irreversible decisions.

## Target User

The initial user is a senior engineer, platform team, or engineering leader delegating non-trivial repository work to coding agents. They care about architecture, public contracts, data safety, reviewability, and being able to resume or audit work after the original agent session has disappeared.

The initial product is not aimed at trivial edits, autonomous production deployment, or replacing issue trackers and CI systems.

## North-Star Outcome

A fresh agent can inspect a change run and answer, without trusting prior conversation:

- What is being changed and what is forbidden?
- What state is the change in?
- Why was it allowed to enter that state?
- Which acceptance criteria remain unproved?
- Which evidence was produced, by which command, against which workspace revision?
- Which risks or blocking findings remain?
- Which human decisions are still required?

## Product Principles

- Protocol before platform.
- Local files before services.
- Read-only validation before automatic mutation.
- Append-only history before rewritten summaries.
- Risk-adjusted ceremony before one universal workflow.
- Captured evidence before agent-authored claims.
- Cross-harness artefacts before harness-specific orchestration.
- Honest traceability before claims of hostile tamper resistance.

## Success Measures

The roadmap is working when:

- A completed run cannot contain uncovered acceptance criteria.
- Stale evidence is detected after the workspace changes.
- A new agent can resume a run in under two minutes without conversation history.
- Standard-lane overhead stays below one minute excluding the checks themselves.
- High-risk runs cannot complete without their required human approvals.
- Behavioural evaluations show at least 90% compliance with scope, evidence, and transition rules across supported agents.
- Ten real dogfood changes produce fewer false completion claims than the skills-only baseline.

## Milestones

### 0. Confirm The Product Boundary

**Estimated effort:** 1-2 focused days

**Outcome:** Agree that the product is an open change protocol plus reference CLI, with skills as adapters.

**Deliverables:**

- Review and accept, revise, or reject `docs/adr/0001-open-change-protocol-and-reference-cli.md`.
- Freeze core vocabulary: change run, gate, transition, evidence, criterion, blocker, approval, workspace fingerprint.
- Define the non-adversarial V1 threat model.

**Exit criteria:** The team can explain the product boundary in one paragraph and name what V1 explicitly does not guarantee.

### 1. Proof-Carrying Completion Gate

**Estimated effort:** 5 focused engineering days

**Status:** Implemented; five dogfood runs recorded. Schema version 1 remains experimental.

**Outcome:** Prove the central differentiator with one guarded transition: `implemented -> complete`.

**Deliverables:**

- Versioned `run.json` protocol fixture.
- Bun CLI for command evidence capture, run validation, and guarded completion.
- Workspace fingerprint bound to captured evidence.
- Append-only transition record.
- Tests for missing, failed, stale, and complete evidence.
- One executable example and one skill integration.

**Exit criteria:** The CLI rejects completion when any criterion lacks fresh passing evidence, when a blocker remains open, or when the workspace fingerprint has changed. It accepts a valid run and records why.

**Build brief:** `issues/002-proof-carrying-completion-gate.md`.

### 2. Behavioural Evaluation Harness

**Estimated effort:** 2 weeks

**Status:** The 20-scenario corpus, seven-scenario deterministic runner, declared no-skill baseline assessor, and Codex artifact/provenance adapter are implemented; inspected real runs, a second provider, comparison policy, and regression thresholds remain pending. Operate under the experimental schema boundary recorded in ADR 0004.

**Outcome:** Measure whether agents actually obey the completion protocol under pressure.

**Deliverables:**

- Baseline scenarios without `extremely-hardcore`.
- Cross-agent runs for Codex and Claude.
- Failure taxonomy: scope drift, fabricated evidence, stale state, unsafe command, premature completion, ignored blocker.
- Machine-readable evaluation results and regression thresholds.

**Exit criteria:** At least 20 pressure scenarios run repeatedly, with published pass criteria and reproducible results. Protocol or skill changes cannot merge when they regress critical completion behaviours.

### 3. Risk-Aware Lifecycle

**Estimated effort:** 1-2 weeks

**Outcome:** Extend the completion proof into a resumable lifecycle with proportionate gates.

**Deliverables:**

- Trivial, standard, and high-risk lanes.
- Risk rubric covering blast radius, reversibility, data, privilege, public contracts, operations, and uncertainty.
- Full transition graph with blocked, abandoned, and needs-human-decision states.
- Artefact revision checks and invalidation rules.
- Human approval records for high-risk gates.

**Exit criteria:** The validator rejects illegal transitions and stale approvals; every lane has documented entry, exit, and escalation rules.

### 4. Agent Experience And Skill Integration

**Estimated effort:** 1-2 weeks

**Outcome:** Make the protocol feel like useful supervision rather than form filling.

**Deliverables:**

- `using-extremely-hardcore` routes changes into the correct lane.
- Skills read and update the same durable run.
- Brief-to-change-run charter adapter: durable finish line, vocabulary, decision frontier, and advisory ownership claims feed a scoped change contract without replacing protocol evidence or gates.
- Critic roles have explicit inputs, outputs, severity, and blocking contracts.
- Concise status and next-action output.
- Resume and handoff workflow tested across fresh sessions.

**Exit criteria:** A user can start, resume, inspect, and complete a standard run without manually reconciling artefacts or reading protocol documentation.

### 5. CI And Pull-Request Attestation

**Estimated effort:** 2 weeks

**Outcome:** Make completion evidence visible at the normal review boundary.

**Deliverables:**

- CI validation command with stable exit codes.
- Human-readable PR summary generated from run state.
- Machine-readable attestation artefact.
- GitHub Action reference integration.

**Exit criteria:** A pull request can show which criteria are proved, stale, blocked, waived, or awaiting human approval without trusting the agent's prose summary.

### 6. Dogfood, Harden, And Release

**Estimated effort:** ongoing, with a release decision after 10 runs

**Outcome:** Replace design confidence with operating evidence.

**Deliverables:**

- Ten documented real-world runs across features, bugs, refactors, dependencies, persistence, and CI changes.
- Friction and false-block log.
- Protocol compatibility policy.
- Codex and Claude installation paths.
- Public benchmark and worked examples.

**Exit criteria:** The protocol catches material agent failures, users can understand its decisions, and the measured overhead is proportionate to risk.

## Recommended First Slice

Build the proof-carrying completion gate in Milestone 1.

This slice has the highest leverage because it converts the manifesto's strongest claim into executable behaviour while avoiding a premature workflow engine. It creates an immediate demonstration:

1. Define two acceptance criteria.
2. Capture one passing command against one criterion.
3. Attempt completion and receive a precise rejection for the uncovered criterion.
4. Capture the second result.
5. Change the workspace and see stale evidence rejected.
6. Re-run the check and complete successfully.

That demo is understandable in minutes, difficult to reproduce honestly with prose alone, and directly supports future FSM, evaluation, and CI work.

## Explicitly Not Now

- Hosted service or dashboard.
- Database or daemon.
- General-purpose agent orchestration.
- Automatic code modification.
- Issue-tracker replacement.
- Cryptographic signing or hostile tamper resistance.
- Full lifecycle implementation before the completion gate is dogfooded.
- More engineering skills merely to increase catalogue size.

## Decision Gates

- Do not start Milestone 2 until the first slice has completed five dogfood runs.
- Do not start Milestone 3 until critical completion-gate evaluations pass across supported agents.
- Do not claim a moat until behavioural evaluations exist.
- Do not claim tamper-proof evidence without an explicit threat model and external trust anchor.
- Stop or simplify if standard-lane protocol overhead exceeds one minute before checks run.
- Revisit the product boundary if users value the skills but routinely bypass the protocol.
