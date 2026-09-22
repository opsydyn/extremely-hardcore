# Extremely Hardcore Product Roadmap

Updated 2026-09-20. This is a work-priority map, not release approval or a fresh
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

## Next

Work in this order. New capabilities must not substitute for acceptance evidence.

1. **Review the instruction-clarity slice.** Template paths and result vocabulary
   are clarified with two narrow handoff probes. Include these behaviours in later
   end-to-end trials; do not grow instructions on the strength of one pass.
2. **Establish comparison prerequisites.** Verify pinned skill-build selection,
   actual loading, fresh sessions, trace retention, independent outcome checks,
   and observable usage. Refresh the relevant provider configuration first.
   Report missing capabilities rather than substituting a static audit.
   [Local preflight](docs/evaluations/060-comparison-readiness.md) found no verified
   skill-build selection/loading. The scorer's all-codes false positives are now
   fixed with regression coverage across all 13 classifications and aggregate
   reports. [Capability assessment](docs/evaluations/061-pinned-loading-capability.md)
   confirms explicit skill-path input in the installed host schema, not runtime
   loading. The [no-model discovery probe](docs/evaluations/062-codex-skill-discovery-probe.md)
   found all nine staged EHS skills and none in an empty control. Next: qualify
   explicit-path delivery in a harmless, traced turn before choosing integration.
   Keep comparative execution on hold until the remaining gaps are resolved.
3. **Run an authorised controlled comparison.** Follow the
   [comparison protocol](docs/evaluations/README.md#controlled-instruction-comparisons):
   same-build A/A controls, then baseline versus pruned EHS under fixed conditions,
   predeclared budgets and criteria, and held-out tasks. Include correctness,
   regressions, scope violations, approval behaviour, and completion accuracy
   alongside time, tokens, cost, and human intervention where measurable.
4. **Refresh host acceptance.** Demonstrate current loading and bounded engineering
   adherence for Codex, Claude, and Pi before expanding supported-host claims.
   Refresh whichever host is used for measurement before step 3; the wider matrix
   can follow.
5. **Close the applicable release gates below.** Findings that could invalidate
   evidence or scoring take precedence over comparative claims.

The recent probes are development cases, not hidden holdouts or an A/B baseline.
Fewer words, green tests, and one successful trial do not establish efficiency.

## Release Gates

No gate is cleared by this consolidation. Standalone package acceptance,
optional protocol qualification, and comparative claims are separate decisions.

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
