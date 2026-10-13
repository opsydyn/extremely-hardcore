# Standalone Release Scope Review

Date: 2026-10-13. Approved assessment after committing the 111-112 evidence
bundle locally as `92bee7c`. No push, release, new model task or install.

Approved follow-up: review 113 was committed as `fda87b1`. The user then
approved the bounded standalone-first documentation pass and the root MIT
notice for 2026 Alan Currie. That cleanup is recorded below; the original
assessment and release-scope verdict remain historical, not publication approval.

- result: complete
- claim: Release scope is assessed: prepare a standalone skills-first preview with explicit host limits, not a blanket fully-qualified three-host release.
- evidence: Fresh 201 tests/792 assertions, scaffold validation and typecheck pass. Current guides/manifests, accepted standalone boundary and Codex/Claude/Pi records were reviewed. Both manifests declare MIT, but the root directory and tracked-file inventory contain no licence file.
- remaining uncertainty: Licence confirmation, target distribution, chosen installed-route qualification, optional-agent context cost and public support approval remain open. The onboarding-friction judgement is inferred from document order, not a measured newcomer study.
- next: needs review; approve a bounded standalone-first documentation/licence cleanup, then decide the preview support scope before packaging. No publication, permission expansion or new trial is implied.

## Change Contract

Assess what the current evidence can support, identify actual release loose ends,
and recommend the smallest next slice. Reuse existing records, not a new scorer,
runner or support framework. Do not rescore failed observations, change skills,
approve distribution, infer current authentication or modify public support
statements during this review. No ADR is required for assessment alone.

User progress sought: load EHS into an existing coding host and use its method
without first adopting the optional Bun protocol. The current alternative is
following a checkout/testing guide that reaches host loading only in section 7.
This is a documentation-path judgement, not evidence of measured adoption loss.

## Evidence By Surface

These are retained observations, not freshly executed host health checks or
provider rankings. Scores concern different tasks and are not comparable.

| Surface | Retained evidence | Honest limit |
| --- | --- | --- |
| Codex native delegated worker | [112](112-uninterrupted-test-first-result.md): current staged EHS reads, worker-authored red/fix/green, discriminating tests and honest receipt; nine frozen criteria pass | Explicit synthetic task with ambient superpowers; not a current Codex CLI marketplace-install or arbitrary-work qualification |
| Claude Code | [090](090-claude-completion-routing-result.md): native loading/planning, seven of eight criteria; [108](108-claude-implementation-turn-counter-stop.md): source fix and parent green | 108's original rejection stands; [110](110-claude-counter-regression-result.md) is a local prospective correction. No worker-executed tests or full method qualification; no Chat/Cowork parity |
| Pi session-local skills | [099](099-pi-bounded-planning-result.md): six current staged reads and bounded planning; four behavioural passes, three failures, inventory criterion not observed | No implementation/consequential-work qualification. Read-only adapter limits do not forbid a user loading the standalone method; they do not authorise a writable adapter either |

Recommended preview language should name these surfaces and limits. None becomes
generally "fully qualified" from this review. Preserve local-checkout loading
instructions as requests with dated evidence, not proof that a future release
artifact was installed successfully. Do not transfer Codex evidence to Claude/Pi.

## Concrete Loose Ends

1. **Licence:** `.codex-plugin/plugin.json` and `.claude-plugin/plugin.json`
   declare MIT; no root LICENSE/LICENCE/COPYING file is present or tracked.
   The ignored `superpowers-main/LICENSE` belongs to the reference checkout,
   not EHS. Confirm the intended licence and copyright notice before adding one.
   This is a source/package completeness finding, not a legal-rights audit.
2. **Standalone-first onboarding:** the [user guide](../user-guide.md) starts
   with Git/Bun, dependencies, evaluations and `eh` demos. Put the skill-only
   path first; label Bun/protocol/developer testing as optional separate paths.
   The skills themselves are Markdown. Do not remove useful tooling examples,
   fabricate a successful install or silently change host commands.
3. **Artifact and support scope:** the source package is private, version 0.0.1,
   with a local-development marketplace. Decide the delivery target, optional
   agent inclusion/context-cost audit, clean artifact contents and actual
   installed-route checks before distribution. No registry/portal availability
   or packaging qualification is established here.

The product feature set is not the remaining problem. Protocol integrity,
retention, containment and comparisons retain their separate optional gates
under [the roadmap](../../ROADMAP.md) and
[standalone receipt ADR 0023](../adr/0023-standalone-work-receipt.md).

## Decision Challenge

### Trigger

Proposed public release/support scope; preserve the existing claim boundary
before planning distribution or broader compatibility promises.

### Proposal And Claims

Prepare a skills-first preview rather than promise fully-qualified host parity.
Keep Codex native observations distinct from CLI installation, label Claude/Pi
limits explicitly, and exclude optional-tooling guarantees. This does not
change release gates or authorise their waiver.

### Existing-Platform Ownership

Hosts own instruction delivery, execution, permissions and authentication.
EHS owns the engineering method and honest documentation of observed support.

### Durable Differentiated Value

Useful scope, test-quality and evidence guidance without a compulsory runtime.
No superiority, productivity or self-evolution moat claim is supported here.

### Strongest Counterargument

Even an experimental label can conceal the absence of a tested installed path.
Another synthetic retry would not fix licence, onboarding or package provenance;
shipping an unsupported promise would not fix them either.

### Claim-To-Evidence Map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The method can support bounded test-first work | Native 112 and parent checks | One coached case, ambient instructions | Preserve narrow label; broader claims need separate representative evidence |
| New users need Bun to use the skills | Guide's current first-run path; Markdown skill source | First-run tooling path is not a skill prerequisite | Standalone-first guide that distinguishes optional tooling |
| All hosts have equivalent qualified support | No such evidence | Different routes, task coverage and limits | Surface-specific decision and selected installed-route checks; no inferred parity |
| MIT source packaging is complete | Manifest declarations only | Root licence missing; rights not audited | Owner confirmation and the intended licence/notice |

### Minimum Credible Slice

Proposed documentation/licence cleanup only: README, user guide and provider
guide clarity, plus a root licence after owner confirmation. Preserve nine
skills, manifests/version, existing commands, protocol, agents and scores.
Suggested appetite: one 30-minute local pass, no model calls; package/installed-route
work remains a separately approved slice. No newcomer-effort baseline exists.
Review success by whether the guide presents skill-only use before Bun/`eh`,
accurately labels each surface and retains working local links.

### Stop Conditions

Stop before licence changes without confirmation, command changes without
current evidence, new support promises, packaging/publication, permission
expansion or a live trial. Do not claim user-effort improvement without a
separate measurement or treat the preview label as clearing release gates.

### Verdict

**needs-human-decision**

### Rationale

The lower-risk next investment is release hygiene and clear scope, not another
capability. Licence ownership and preview support scope need explicit approval;
no implementation plan, bundle, new model run or release follows from this
assessment. Fresh commit checks passed 123 links and 47 retained pins before
`92bee7c`. The three assessment documents pass 130 local links, scaffold
validation and whitespace checks; they remain uncommitted pending review.

## Approved Documentation And Licence Follow-up

The authorised cleanup changes README, user guide and provider onboarding,
adds [LICENSE](../../LICENSE), and updates current roadmap/index pointers.
No new ADR is required: this implements the approved documentation scope and
the MIT choice already declared by the manifests, without architecture, runtime
or permission changes. The licence text follows
[SPDX's MIT reference](https://spdx.org/licenses/MIT.html), with the approved
copyright notice; this is not an audit of third-party rights.

The user guide now starts with host loading and a bounded task; prerequisites,
health checks, evaluations, protocol demos and CLI runs are explicitly optional.
README presents all three host paths before optional tooling. The provider guide
owns one linked current-evidence table; it distinguishes native staged Codex work,
limited Claude Code observations and Pi session-local planning, without inferring
CLI installation, full qualification or Chat/Cowork parity. Its model smoke is
an optional diagnostic, not an onboarding prerequisite.

Verification compares shell fences with `fda87b1`: all **38** remain byte-for-byte
identical (README 12, user guide 14, provider guide 12), including optional
tooling examples. Standalone section order and the approved copyright/manifest
licence consistency pass. Existing skills, agents, commands, manifests/versions,
protocol, tests and scores are unchanged. No behavioural unit tests are added
for prose rearrangement; document, metadata and repository checks fit this scope.

The missing-notice and first-run-order findings are resolved in the working diff.
Fresh closure checks pass: 201 tests/792 assertions, repository typecheck,
scaffold validation, 170 local links across six documents, the two evidence-table
anchors, README image existence and whitespace. The untracked LICENSE no-index
check emits no diagnostics; exit 1 indicates its new-file diff. No protected
skill/runtime/manifest/test files differ from `fda87b1`.

This does not clear installed-artifact qualification, optional-agent/context-cost
review, support/publication decisions or the separate optional-tooling gates.
The cleanup itself remains uncommitted for review; no new model-bearing host
task was launched, package built, dependency installed, push made or publication
attempted.
