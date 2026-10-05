# Extremely Hardcore Product Roadmap

Updated 2026-10-05. This is a work-priority map, not release approval or a fresh
provider-health check.

## Product Boundary

EHS is a standalone engineering method for coding agents: explicit scope,
structural simplicity, proportionate verification, evidence, and meaningful
human decision boundaries. Routine work should not require a stack of documents.

The Bun protocol, CLI, provider adapters, and evaluation tooling are optional
consumers, not installation prerequisites. Orchestration, scheduling, retries,
budgets, and experiment scoring remain outside the installed skills. This follows
the accepted [standalone receipt decision](docs/adr/0023-standalone-work-receipt.md).
Earlier protocol-first plans remain history, not the current product definition.

## Done

Implemented does not mean fully qualified, generally effective, or release-ready.

| Area | Delivered | Evidence and limits |
| --- | --- | --- |
| Standalone skills | Nine skills, simplicity lens, compact receipt, onboarding | [User guide](docs/user-guide.md); installation is separate from adherence |
| Optional protocol | Evidence capture, fingerprints, risk lanes, lifecycle, approvals, status and handoff | [Lifecycle ADR](docs/adr/0018-risk-aware-lifecycle-and-approval-freshness.md); schema v1 remains experimental |
| Evaluation mechanics | Scenario corpus, deterministic fixtures, declared attempts, read-only provider adapters, action fixture | [Evaluation reference](docs/evaluations/README.md); not proof of skill effect |
| CI projections | Summary, attestation, exit codes, reference workflow | [Delivery ADR](docs/adr/0019-local-ci-attestation-delivery.md); durable retention and adoption remain open |
| Operator dogfood | Ten real operator changes and aggregate review | [Operational review](docs/dogfood/047-operational-acceptance-host-matrix.md); not release or productivity evidence |
| Instruction pruning | Conversational local records, conditional loading, proportional verification | Commit `034751d`; [bounded fix probe](docs/dogfood/056-instruction-pruning-bounded-probe.md) |
| Approval probes | Security change held; missing approval held; approved fixture resumed | [Boundary probes](docs/dogfood/057-consequential-approval-boundaries.md), [approved resume](docs/dogfood/058-approved-fixture-resume.md); single trials |
| Status regression | Valid approved high-risk runs receive guarded-completion guidance | Commit `8652ee7`; seven new regression cases, 44 protocol tests passed at that checkpoint |
| Learning guidance | Selective lesson capture and controlled comparison protocol | Commit `6b1e6b3`; experiments not run |
| Instruction clarity | Skill-relative template links and exact receipt result values in the entrypoint | [Handoff probes](docs/dogfood/059-template-path-and-receipt-clarity.md); two narrow trials, not broad adherence proof |
| Read-only review evaluation | Frozen seeded review task, executable witness scorer, pinned material, fail-closed supplied-record preflight | [Fixture and preflight](docs/evaluations/066-read-only-review-fixture-and-preflight.md); no model comparison or host attestation |
| Host capability inventories | Captured skill/config/hook projections, accepted read-only ephemeral threads, process-only app/MCP controls | [Host capture](docs/evaluations/067-no-model-host-arm-capture.md), [thread gate](docs/evaluations/068-ephemeral-thread-capability-gate.md); exact model-visible tools/instructions remain unknown |
| MCP preflight regression | Known disabled entries accepted; active, unknown, malformed, duplicate, and paginated inventories rejected | [Offline correction](docs/evaluations/070-control-mcp-gate-regression.md); retained capture replay only, no host/model retry |
| Local metadata and onboarding cleanup | Seven Claude agent definitions have minimal frontmatter; old smoke results explicitly dated; loading claims clarified | [Cleanup evidence](docs/evidence/071-local-metadata-and-onboarding-cleanup.md); no live model acceptance implied |

## Next

The planned standalone feature set is implemented; release qualification is
not complete. Stop adding capabilities and finish acceptance. These two tracks
have separate gates: comparative superiority is not a prerequisite for a
clearly labelled standalone release, and releasing skills does not qualify the
optional protocol or evaluator.

### Ship EHS

The evaluation and documentation consolidation is included in this slice.
Preserve failed attempts and historical limits; do not include private host
captures in the package.

1. **Refresh claimed-host acceptance.** Demonstrate current loading and
   representative bounded engineering adherence for Codex, Claude, and Pi.
   Include skill-relative templates, exact receipt result vocabulary, useful
   uncertainty, proportionate verification, and consequential-work approval
   boundaries. Retain evidence and document host-specific limits; narrow support
   claims if a host cannot be qualified. Installation alone is insufficient.
2. **Make an explicit standalone release decision, with distribution last.** Review the acceptance
   evidence, onboarding, package contents, and residual risks against the
   standalone gate below. Publish only within the demonstrated support scope;
   keep optional tooling experimental where its own gates remain open.

Distribution work is deliberately postponed: no lean bundle, export automation,
marketplace publication, version bump, GitHub setup, or portal submission in the
current cleanup. Once acceptance and the applicable loose ends below are resolved
or explicitly deferred, prepare the chosen distribution and review it before
publication.

### Claude Release Preparation

Queued for release preparation, not authorised execution or publication. Follow
the [Claude plugin guidance](https://claude.com/blog/build-plugins-for-claude)
without turning EHS into an integration service. Preserve the existing Codex
manifest and Pi skill-loading path; no MCP server is required for the method.

1. **Audit context cost before packaging.** Use Claude's
   [plugin details and skill diagnostics](https://code.claude.com/docs/en/plugins/measure)
   to record always-on versus on-invocation estimates and observed triggering.
   Inspect optional agents alongside the nine skills. Prune only demonstrated
   overhead and recheck triggering; invocation counts are not quality evidence.
2. **Assess native eval tooling before adding custom infrastructure.** Evaluate
   [Claude plugin eval](https://code.claude.com/docs/en/plugin-evals) as a possible
   replacement for Claude-specific runner plumbing, not a mandatory EHS dependency.
   Check installed-version/feature eligibility first. Any model run needs its own
   payload consent, budget, tools, retention and sharing decision; defaults may
   run repetitions, a no-plugin baseline and judge calls. Keep independent outcome
   checks and comparison gates; neither skill invocation nor a grader score proves
   improvement. No native eval migration or baseline run is approved by this item.
3. **Prepare and review a lean skills-first distribution last.** Reuse the
   existing Claude manifest; decide whether optional agents belong in the chosen
   bundle and exclude development/evaluation/private artefacts. Declare and test
   [surface-specific support](https://claude.com/docs/plugins/platform-support):
   loading in Chat is not repository-engineering parity with Claude Code or Cowork.
   After qualified support and release approval, establish the public GitHub
   source and use the [directory submission process](https://claude.com/docs/directory/publish)
   for validation, security review and controlled publication. Portal adoption
   analytics may guide maintenance, but do not establish engineering effectiveness.

Release completion means reviewed package contents, demonstrated support,
documented cost/limits and an explicit publication decision. These tasks do not
clear standalone acceptance, optional protocol qualification or comparisons.

### Prove Improvement

1. **Finish the bounded control trace capability check.** The
   [first control attempt](docs/evaluations/069-control-only-trace-probe.md)
   stopped before dispatch because its local predicate rejected disabled MCP
   entries. The [offline correction](docs/evaluations/070-control-mcp-gate-regression.md)
   is tested, but actual turn input/final/usage retention under refreshed
   controls remains unverified. A fresh attempt needs explicit authorisation,
   fresh inventories, at most one turn, a 120-second deadline, and no retries.
   The interrupted follow-up did not launch a host process or model request.
2. **Resolve comparison provenance and isolation gaps.** Establish pinned skill
   selection/loading and the exact relevant instruction/tool exposure; retain
   raw traces and observable usage. The
   [explicit-path turn](docs/evaluations/064-codex-explicit-skill-turn.md)
   and no-model inventories are partial evidence, not full parity. The seeded
   witness scorer measures a narrow review outcome, not implementation quality;
   classification scores do not measure engineering effect. Report unavailable
   capabilities honestly and keep comparison on hold if they cannot be resolved.
3. **Predeclare and authorise controlled comparisons.** Follow the
   [comparison protocol](docs/evaluations/README.md#controlled-instruction-comparisons):
   same-build A/A controls, then baseline versus pruned EHS under fixed conditions,
   predeclared budgets and criteria, and held-out tasks. Include correctness,
   regressions, scope violations, approval behaviour, and completion accuracy
   alongside time, tokens, cost, and human intervention where measurable.
   Refresh the measured host before execution. Only replicated independent
   results can support comparative effectiveness or moat claims.

The [first Codex standalone acceptance plan](docs/implementation-plans/072-codex-standalone-acceptance-trial.md)
defines one read-only engineering-planning task with loading-request evidence,
assessment criteria, budget, and stop conditions. Its
[approved attempt](docs/evaluations/073-codex-standalone-planning-attempt.md)
retained native input and four skill-file reads but stopped on a local driver's
false rejection of a shell-wrapped read. No final plan or usage was retained;
no retry occurred. The [offline read regression](docs/evaluations/074-staged-skill-read-regression.md)
now passes, including replay of the retained read events. A
[fresh approved attempt](docs/evaluations/075-codex-planning-inspection-stop.md)
stopped on repository-status/discovery outside the staged-file-read allowance;
no final plan or usage was retained and no retry occurred. The
[version 2 plan](docs/implementation-plans/076-codex-planning-explicit-inspection.md)
now makes the non-repository fixture and literal-read allowance explicit;
execution was approved but [launch auto-review stopped before any host process](docs/evaluations/077-version-2-launch-approval-stop.md),
pending explicit payload/destination consent. After that consent, the
[version 2 result](docs/evaluations/078-codex-version-2-planning-result.md)
retained a completed plan/turn and usage within budget, with six of eight
criteria met. Concrete numeric witness and explicit no-ADR explanation remain
gaps; no retry or skill edit followed. An
[offline reviewer follow-up](docs/evaluations/079-planning-gap-review.md)
confirmed the numeric witness in 28 fixture checks and recorded why no ADR is
required. Those proposal questions are resolved; the agent's 6/8 response score
is unchanged. The [Claude planning proposal](docs/implementation-plans/080-claude-standalone-planning-trial.md)
has an [executed no-model preflight](docs/evaluations/081-claude-no-model-preflight.md):
the nine staged skills and native plugin metadata checks pass, but both
sandboxed and outside-sandbox auth checks report no signed-in account.
The [authentication refresh](docs/evaluations/082-claude-auth-refresh.md)
subsequently confirmed signed-in subscription access outside the sandbox and
an unchanged staged plugin; sandboxed auth still reports logged out. Native
validation leaves skill contents unchecked; exact runtime exposure remains
unverified. Review that remaining gate and separate Anthropic payload consent
before model dispatch, not a repetition of Codex solely for preferred wording.
The [current runtime review](docs/evaluations/083-claude-runtime-gate-review.md)
records CLI drift to `2.1.289`, passing native diagnostics and subscription auth,
remote-policy ineligibility and absent inspected endpoint-policy paths. A
version-refreshed normal-host observation needs explicit Anthropic consent and
acceptance of its stated runtime limits; no model ran and comparisons remain hold.
The [approved Claude attempt](docs/evaluations/084-claude-startup-inventory-stop.md)
then reached native startup but stopped after 1.7 seconds on three additional
host-labelled built-in plugins omitted by the no-model plugin list. Read/Skill
were the only exposed tools; all nine EHS skills were catalogued, but no native
invocation, tool call, final or usage was observed. No retry occurred. Review
built-in catalogue handling and test the startup predicate offline before
proposing another attempt; this is not an EHS behavioural score.
The [offline catalogue regression](docs/evaluations/085-claude-startup-catalogue-regression.md)
now accepts the exact retained normal-host startup and rejects changed/unknown
entries, tools, paths, models and controls. Thirteen focused tests and 199
repository tests pass. No provider ran; trial 084 remains blocked. The next
slice is a separately authorised fresh planning attempt with refreshed preflight,
not another skill change or relaxed comparison gate.
The [fresh Claude proposal](docs/implementation-plans/086-claude-planning-fresh-attempt.md)
now pins the observed model and tested startup catalogue, preserves the task,
criteria and budget, and awaits renewed scoped Anthropic consent. Controller
preparation and guard tests did not invoke a model.
After scoped consent, the [fresh Claude result](docs/evaluations/087-claude-planning-result.md)
completed in 20.5 seconds with native EHS invocation and unchanged files, meeting
six of eight criteria. Explicit no-ADR decision and receipt remain missing;
the answer exceeded its requested word limit and included an inaccurate
original-code explanation. Independent candidate checks pass 28 cases but do
not change the response score. Review completion-routing clarity offline before
more trials; no automatic retry or skill edit follows.
The [offline completion review](docs/evaluations/088-completion-routing-review.md)
recommends two sentence-level clarifications making the existing ledger finish
explicit for non-trivial planning/review. No skill was edited. Keep ADR routing
conditional and review host turn-budget headroom before future trials; no
blanket no-ADR boilerplate, receipt duplication or new capability is proposed.
After approval, both substitutions were implemented on 2026-10-05. Two focused
structural checks failed before the edits and passed afterwards; the full local
suite passed 201 tests and scaffold validation passed. These checks establish
instruction coverage, not agent adherence; historical trial scores remain unchanged.
The [bounded completion check](docs/implementation-plans/089-claude-completion-routing-check.md)
is prepared with the unchanged task, eight-turn cap and corrected build pin;
fresh scoped Anthropic consent and preflight are required before its single launch.
After consent, [completion result 090](docs/evaluations/090-claude-completion-routing-result.md)
completed once in 21.6 seconds/six turns, with a 599-word answer and valid
planning-only receipt. Seven of eight original criteria pass; explicit no-ADR
conclusion remains absent. Earlier scores remain unchanged. No causal or
efficiency claim, boilerplate addition or automatic retry follows.
These trials cannot qualify implementation behaviour or clear
the full standalone release gate. Claude and Pi follow under equivalent
host-appropriate checks. Do not substitute more infrastructure for this work.

The recent probes are development cases, not hidden holdouts or an A/B baseline.
Fewer words, green tests, and one successful trial do not establish efficiency.

## Loose Ends

| Item | Status | Next bounded action |
| --- | --- | --- |
| Claude agent metadata and stale onboarding labels | Locally corrected; metadata validation is not model acceptance | Keep the regression checks; do not overwrite historical smokes |
| Codex, Claude, Pi standalone acceptance | Open; Claude latest planning case 7/8 with valid receipt; earlier 6/8 retained | Review accumulated local changes, then propose the next independently authorised acceptance slice; Pi and implementation acceptance remain open; do not chase this fixture's 8/8 with boilerplate |
| Control-only trace retention | Open; first attempt stopped before a turn, local MCP predicate corrected | Obtain fresh inventories for one separately authorised bounded attempt |
| Comparative effectiveness | Hold | Resolve provenance/isolation gaps before A/A, then predeclare independent comparisons |
| Optional protocol integrity and durable evidence retention | Separate open qualification gates | Assess runtime input/evidence/approval binding and future CI retention against existing decisions; retain experimental status until qualified |
| Writable external execution | Hold; not needed for standalone installation | Do not expand adapters or run comparative writable tasks without accepted containment |
| Distribution and directory publication | Last; Claude cost audit, native-eval assessment and skills-first portal preparation queued | Follow Claude Release Preparation after acceptance/support decisions; no publication or new runtime implied |

Do not treat this list as one approval for live model runs, writable execution,
new infrastructure, or publication. Optional surfaces may remain explicitly
experimental or deferred without blocking the standalone skills release.

## Release Gates

No gate is cleared by this consolidation. The standalone package gate governs
the installed skills. Protocol integrity, durable protocol evidence, evaluator
credibility, and writable-execution containment govern those optional surfaces,
not installation or standalone skill use. Comparative claims require their own
evidence regardless of release status.

- **Standalone package:** current loading and representative adherence on each
  claimed host; useful receipts; documented limits; no needless pauses or weakened
  consequential-work boundaries.
- **Protocol integrity:** revalidate runtime input checks, command-time workspace
  changes, approval freshness, and evidence/approval binding to the intended
  acceptance contract. Happy-path probes do not qualify malformed inputs or forged
  records. Keep schema v1 experimental pending its separate stability decision.
- **Evaluator credibility:** establish scorer discrimination, version/loading
  provenance, isolation, repeatability, and retained evidence. Classification
  scores alone do not establish engineering productivity.
- **Writable external execution:** require accepted containment and explicit
  authorisation before repeated or comparative provider runs. Requested sandbox
  flags and native fixture probes are not enforcement proof.
- **Durable protocol evidence:** implement and demonstrate retention of future
  release projections, then establish repository/CI adoption. An accepted
  retention policy is not its implementation.
- **Release and claims:** review actual evidence and residual risks. Measure
  active time before productivity claims; require replicated independent results
  before comparative or moat claims. Tamper-proof claims require an explicit
  threat model and external trust anchor.

## Historical Evidence

These are dated snapshots, not current authentication or compatibility checks.
Preserve them rather than backfilling observations that were never retained.

- [Run 055, 2026-09-03](docs/dogfood/055-current-provider-loading-and-measurement.md):
  Codex CLI `0.147.0` did not load EHS in its default configuration and a smoke
  timed out; Claude Code `2.1.251` metadata validated with plugin warnings but
  model loading was authentication-blocked; Pi had a session-local loading result.
  An echoed loading marker is insufficient for the new comparison protocol.
- [Provider onboarding](docs/provider-onboarding.md) and the
  [evaluation reference](docs/evaluations/README.md) retain historical paths and
  claim limits. Read-only adapter results do not prove loading or rank providers.
- [Repeated classification report](docs/evaluations/016-repeated-controlled-codex-comparison-2026-07-16.md):
  both declared modes reached the same reported classifications. This was
  non-discriminative for skill effect, not evidence of equivalence or improvement.
- [Action-fixture provenance ADR](docs/adr/0015-codex-action-fixture-provenance-retention.md):
  retained artefacts do not prove command ownership or containment. The historical
  writable pilot read host memory outside its fixture; containment remains open.
- [Container probe ADR](docs/adr/0017-dedicated-colima-docker-containment-probe.md):
  no-model container checks did not remove the effective VM's home mount or
  port-forwarding exposure and did not clear provider execution.
- [Run 048](docs/dogfood/048-future-dogfood-record-and-pi-resume.md) supplied Pi a
  status snapshot in its prompt; it did not prove file-reading resume. Runs 057/058
  add narrow native-agent durable-state probes, not cross-host qualification.
- [Run 052](docs/dogfood/052-historical-projection-retention-audit.md) found missing
  projections for Runs 033-035; [Run 053](docs/dogfood/053-retention-policy-decision.md)
  accepted that limitation and required future retention. No historical recovery
  or release approval is implied.

Earlier milestone estimates and numerical aspirations remain in Git history
(roadmap at `6b1e6b3`). They are not measured outcomes or substitutes for
predeclared experiment criteria. No evaluator policy or threshold changes here.

## Deferred

- **Governed skill evolution:** a hypothesis, not a proven moat. Establish
  credible baselines, A/A variation, independent selection and hidden holdouts
  before offline candidate edits to one non-protected skill. Retain evidence,
  rollback, and human promotion; no autonomous adoption.
- **Evolution safeguards:** evaluator, policy, and promotion records remain
  Bun-native. `change-contract`, `architecture-decision`, `decision-challenge`,
  `test-first-implementation`, and `evidence-ledger` stay protected from candidate
  generation. SkillOpt or another optimiser is optional, cannot promote itself,
  and receives no session transcripts by default.
- **Optional retrieval and triage:** Osad/Jev/tgrep remain proposals in the
  [handoff](osad-tgrep-codex-handoff.md), not EHS dependencies. Confidence cannot
  replace tests, approval, or evidence provenance.
- **Competing approaches:** only for a consequential unresolved choice with a
  justified budget; no mandatory bakeoff, new top-level skill, or dispatch framework.
- **Provider expansion:** existing read-only leaves remain available. Additional
  writable adapters require accepted containment, applicable ADR/challenge review,
  and repeated evidence. Provider mechanics remain leaf concerns.
- **Brief-to-contract adapter and wider resume:** revisit after demonstrated
  friction; do not replace existing contracts or infer portability from one fixture.

No hosted dashboard, daemon, general scheduler, issue tracker, catalogue growth
for its own sake, or cryptographic attestation programme is planned in this pass.
Capture reusable lessons only when verified reasoning is absent from code, tests,
or existing docs. Maintain operative guidance without erasing historical evidence.
