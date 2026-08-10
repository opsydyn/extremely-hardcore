# Extremely Hardcore Product Roadmap

## Product Position

`extremely-hardcore` is the verifiable control plane for high-risk agentic software changes.

It does not compete by owning the largest skill catalogue. It makes one narrower promise:

> A change may advance only when its risk-adjusted gate is satisfied by durable, traceable evidence.

Skills provide judgement. The protocol records state. The reference CLI captures evidence and enforces transitions. Humans retain authority over irreversible decisions.

## Target User

The initial user is a senior engineer, platform team, or engineering leader delegating non-trivial repository work to coding agents. They care about architecture, public contracts, data safety, reviewability, and being able to resume or audit work after the original agent session has disappeared.

The initial product is not aimed at trivial edits, autonomous production deployment, or replacing issue trackers and CI systems.

The installed EHS surface remains standalone: it owns engineering behaviour and a compact work receipt. The local protocol and evaluation/provider code are optional repository consumers, not prerequisites for using the skills. General orchestration, scheduling, retries, budgets, and experiment scoring remain outside EHS.

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
- Standalone engineering method before orchestration.
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

**Status:** The 20-scenario corpus, seven-scenario deterministic runner, declared no-skill baseline assessor, and read-only Codex artifact/provenance adapter are implemented. Three corrected, model-pinned Codex repetitions per declared mode produced stable 13/13 strict classification results in both modes; this validates repeatable mechanics but is non-discriminative and cannot support a skills-effect claim. The first deterministic, provider-neutral action-level fixture now has immutable fixture-local evidence and completion commands plus a validated structural invocation ledger. An experimental two-stage Codex action-fixture adapter retains digest-validated raw provider-process artifacts beside that ledger, without using them as scoring input. One non-retried live Codex pilot passed the fixture and retained-artifact integrity checks, but its raw process output showed a successful read of the operator's `.codex/memories/MEMORY.md` outside the copied fixture workspace. It therefore demonstrates neither workspace-read isolation nor sandbox enforcement, and requires human review before any repeated or comparative execution. This proves local command executability and reviewable requested-process provenance, not agent identity, command ownership, sandbox or network enforcement, provider compliance, or provider performance. A second provider, comparison policy, and regression thresholds remain pending. Operate under the experimental schema boundary recorded in ADR 0004.

Containment slice 024 adds a no-model, no-network Docker probe in a fresh named Colima profile. The final pinned-image run at `/tmp/extremely-hardcore-docker-containment-024-final-code` blocked exact host-path, traversal, symlink, and guest-network attempts while recording Docker policy, image identity, effective Lima configuration, and Bun/Git availability. The effective VM still has Colima's writable home mount and port-forwarding rules, so this is container-boundary evidence only; it does not clear provider execution or prove VM escape resistance.

**Outcome:** Measure whether agents actually obey the completion protocol under pressure.

**Deliverables:**

- Baseline scenarios without `extremely-hardcore`.
- Cross-agent runs for Codex and Claude.
- Failure taxonomy: scope drift, fabricated evidence, stale state, unsafe command, premature completion, ignored blocker.
- Machine-readable evaluation results and regression thresholds.

**Exit criteria:** At least 20 pressure scenarios run repeatedly, with published pass criteria and reproducible results. Protocol or skill changes cannot merge when they regress critical completion behaviours.

### 3. Risk-Aware Lifecycle

**Estimated effort:** 1-2 weeks

**Status:** Local protocol mechanics implemented in ADR 0018; real operator acceptance remains open.

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

**Status:** Local status, handoff, next-action, and critic contracts implemented; cross-agent adoption remains open.

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

**Status:** Local summary, attestation, exit codes, and reference workflow implemented; repository adoption remains open.

**Outcome:** Make completion evidence visible at the normal review boundary.

**Deliverables:**

- CI validation command with stable exit codes.
- Human-readable PR summary generated from run state.
- Machine-readable attestation artefact.
- GitHub Action reference integration.

**Exit criteria:** A pull request can show which criteria are proved, stale, blocked, waived, or awaiting human approval without trusting the agent's prose summary.

### 6. Dogfood, Harden, And Release

**Estimated effort:** ongoing, with a release decision after 10 runs

**Status:** Controlled ten-case harness implemented; ten real operator runs and release evidence remain open.

**Outcome:** Replace design confidence with operating evidence.

**Deliverables:**

- Ten documented real-world runs across features, bugs, refactors, dependencies, persistence, and CI changes.
- Friction and false-block log.
- Protocol compatibility policy.
- Codex and Claude installation paths.
- Public benchmark and worked examples.

**Exit criteria:** The protocol catches material agent failures, users can understand its decisions, and the measured overhead is proportionate to risk.

## V0 Feature-Complete Checkpoint

**Current status:** V0 implementation gates are complete and locally verified. Schema version 1 remains experimental, and operational acceptance still requires real operator dogfood beyond the controlled harness plus a separately approved provider execution plan.

Before expanding the provider surface, complete these gates:

- [x] Behavioural Evaluation Harness mechanics: full 20-scenario policy, three-repetition local report, published thresholds, and provider-claim limits.
- [x] Risk-Aware Lifecycle mechanics: risk rubric, legal transitions, stale approval invalidation, blocked/abandoned/needs-human-decision states, and high-risk human approval records.
- [x] Agent Experience And Skill Integration mechanics: durable status/handoff output, resume guidance, next-action output, and explicit critic contracts.
- [x] CI And Pull-Request Attestation mechanics: stable validation exit codes, human-readable summaries, machine-readable attestations, and a reference workflow.
- [x] Controlled Dogfood, Harden, And Release mechanics: ten temporary-repository cases, friction-event counts, compatibility policy, installation paths, and worked commands.

The controlled harness is not a substitute for ten real operator changes. Record those separately under `docs/dogfood/` before calling the product operationally proven.

The current next bounded slice is ten real operator dogfood runs and the resulting friction/false-block review. Provider expansion should follow that acceptance checkpoint rather than becoming a substitute for it.

## Completed First Slice

The proof-carrying completion gate in Milestone 1 is implemented and dogfooded.

It converted the manifesto's strongest claim into executable behaviour while avoiding a premature workflow engine:

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

## Deferred, Gated Initiatives

### Provider-Neutral Agent Adapter Surface: Claude And Pi

**Status:** The provider-neutral read-only contract and runner are implemented in ADR 0020. The Claude Code read-only leaf is implemented in ADR 0021 and has a complete explicit 2.1.224 live report: 13/13 structured attempts, 7/13 strict classifications passed, and 6/13 failed. The Pi 0.84.1 read-only leaf is implemented in ADR 0022 with fake-executor coverage and direct JSON-event preflight; live Pi evidence is blocked on provider authentication. Comparison claims and containment claims remain pending.

**Outcome:** Let Claude and Pi consume the same protocol and evaluation kernel through leaf adapters without leaking provider-specific command, session, output, sandbox, or resume assumptions into `protocol/` or the deterministic scorer.

**Reusable foundation:** Skills, change-run protocol, scenario corpus, fixture scorer, evidence ledger, artefact integrity checks, and claim limits remain shared.

**Future deliverables:**

- [x] Provider-neutral adapter contract for capabilities, execution requests, raw artefacts, structured observations, and provenance status.
- [x] Capability matrix distinguishing read-only execution, workspace writes, structured output, resume support, network controls, and containment evidence.
- [x] Claude and Pi read-only leaves against the same agent-attempt scenarios.
- [ ] Repeated controlled runs before any cross-provider comparison or regression claim.
- [ ] Writable fixture adapters only after each runtime is executed inside an accepted containment boundary.

**Guardrails:**

- Do not generalise by swapping an executable path into the Codex adapter.
- Keep provider-specific flags, session mechanics, parsers, and artefacts in leaf adapters.
- Treat provider self-report and requested sandbox settings as untrusted until directly observed.
- Require an ADR and decision challenge before adopting the adapter contract or adding provider dependencies.

**Completed first slice:** Define the adapter contract and capability vocabulary, centralize scoring, fail closed on unsafe or mutated retained artefacts, and add Claude and Pi read-only leaves with provider-specific constrained argv and strict output parsing. The leaves are intentionally narrow and do not establish runtime enforcement.

**Next gated slice:** Authenticate one intentionally selected Pi provider and run one controlled 13-scenario read-only evaluation, then review prompt discriminability and repeatability. Do not compare providers or add writable execution until both runtimes have repeated direct evidence and an accepted containment boundary.

### Governed Skill Evolution Sandbox (SkillOpt-Informed)

**Status:** Backlogged. No optimiser integration or autonomous skill adoption is approved.

**Outcome:** Evaluate bounded candidate edits to nominated skill documents using independent behavioural evidence, then promote only human-reviewed improvements.

**Preconditions:**

- The action fixture provides an immutable fixture-local protocol CLI, a structural invocation ledger, and digest-validated retained provider-process artifacts; command ownership remains unproven.
- Multiple action-level fixtures support independent train, selection, and hidden holdout splits.
- Baseline, repeated provider runs, and critical-regression policy are defined before any comparative claim.

**Guardrails:**

- The evaluator, policy, promotion record, and protected skills remain Bun-native.
- `change-contract`, `architecture-decision`, `decision-challenge`, `test-first-implementation`, and `evidence-ledger` are immutable to candidate generation.
- An external optimiser, including SkillOpt, is optional and offline; it can propose bounded candidate diffs but cannot adopt them.
- Candidate promotion requires independent held-out results, no critical integrity regression, a decision challenge where triggered, human review, and an evidence ledger.
- Do not mine or send session transcripts to an external provider by default.

**First eventual slice:** Build a Bun candidate-skill sandbox that evaluates one non-protected skill copy against the fixture suite and emits a reviewable promotion record. Consider SkillOpt only as one candidate proposer after the evaluator is credible.

## Decision Gates

- Do not start Milestone 2 until the first slice has completed five dogfood runs.
- Do not start Milestone 3 until critical completion-gate evaluations pass across supported agents.
- Do not claim a moat until behavioural evaluations exist.
- Do not claim tamper-proof evidence without an explicit threat model and external trust anchor.
- Stop or simplify if standard-lane protocol overhead exceeds one minute before checks run.
- Revisit the product boundary if users value the skills but routinely bypass the protocol.
