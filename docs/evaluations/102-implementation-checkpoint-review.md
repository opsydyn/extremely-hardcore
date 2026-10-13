# Implementation Checkpoint And Budget Review

Date: 2026-10-13. Local review authorised after
[result 101](101-implementation-dogfood-budget-stop.md). No new worker or model
request. The earlier execution consent is spent.

Execution follow-up: the user subsequently approved the explicit fresh payload,
native Codex worker and single-phase cap. [Result 103](103-implementation-existing-regressions-result.md)
records that new attempt. The original review/consent disposition below remains
historical; 101 is not resumed or relabelled.

- result: complete
- claim: Coordination review is complete; the next proposed observation reuses the qualified regressions and removes the mid-trial handoff, rather than increasing the budget or changing EHS.
- evidence: Retained dispatch/outcome/checkpoint records and all 48 artifact hashes were checked. Local reruns reproduce original 6 pass/7 fail, parent reference 13 pass/0 fail and sorted-output 8 pass/5 fail. Original fixture source remains unchanged.
- remaining uncertainty: Exact worker completion time and the cause of the elapsed coordination delay are unavailable. A new implementation result, spontaneous TDD, EHS effectiveness and Pi writable qualification are not established.
- next: needs review; obtain fresh scoped consent for the candidate below. Keep 101 incomplete; do not reopen its worker or alter its evidence.

## Contract

Minimum complete local work: identify the observed stopping boundary, recheck
the retained tests and propose the least powerful next observation. Allowed
repository changes are this review and its roadmap/index links. No skill,
runtime, adapter, dependency, auth, public contract or production code changes.
No new ADR is needed: the candidate reuses the existing native disposable
Codex route, without changing host permissions or EHS architecture.

## Observed Boundary

Record 101's deadline was 180 seconds after dispatch. At approximately 174
seconds, native close returned a completed tests-only receipt. Implementation
was never released. Parent checkpoint verification was recorded after closure.
This establishes an incomplete two-phase observation, not failed implementation
or a demonstrated worker timeout. The exact phase-1 completion time is unknown;
do not attribute all elapsed time to the worker, skills or model speed.

The successful historical probes are not matched comparisons:
[060](../dogfood/060-test-quality-probe.md) used an uninterrupted 180-second
worker task; [062](../dogfood/062-risky-test-quality-result.md) used a different
240-second active-worker budget excluding the checkpoint interval. Neither
establishes how long this task should take or justifies a performance claim.

Inference: the required parent release is an avoidable dependency for the
remaining implementation question. Removing it prevents this specific handoff
from withholding implementation, but does not guarantee a completed task.

## Options And Trade-Off

1. Reuse the 13 tests in a fresh single-phase implementation observation with
   the same 180-second wall-clock cap. Recommended: tests already protect the
   contract, and EHS explicitly permits reusing existing regressions.
2. Repeat test-writing and the parent release with a larger budget. This retains
   the chronology question but repeats qualified work and adds another spending
   decision without evidence that EHS instructions need changing.
3. Have the parent fix the fixture. Useful local checking, but not a fresh-worker
   implementation observation. Do not label it as agent acceptance.

Prefer subtraction. Do not add a scheduler, permission shim, receipt schema,
standing checkpoint rule or instruction text from this result.

## Decision Challenge

Trigger: a proposed fresh external writable-agent task and a changed observation
shape. This is a new attempt, not continuation under the earlier consent.

Native Codex owns invocation and permissions; EHS owns the engineering method.
The useful evidence is a small, reviewable fix under meaningful regressions,
not a new orchestrator. Scope instructions are not isolation guarantees.

Strongest counterargument: supplying tests removes test-authoring from the task
and makes the exercise easier. That is acceptable only if the claim narrows to
implementation under existing regressions. Do not combine the two attempts into
one successful worker red-green history or compare their elapsed times as an
efficiency result. They are development observations, not hidden holdouts.

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Existing tests can be reused | Direct export assertions; original and ordering defects rejected; reference passes | No new final worker source | Parent reruns against the new worker source |
| The handoff can be removed | No implementation release in 101; qualified tests already exist | Completion still uncertain | One uninterrupted, separately authorised worker result |
| The original attempt is complete | None; original source is unchanged | Fix never performed | Keep 101 incomplete; record any new result separately |
| Pi writable acceptance is established | None | Separate execution-boundary decision | Do not infer it from a Codex trial |

### Minimum Credible Slice

Candidate only, pending consent: one fresh native Codex worker with
fork_context false, inherited model/effort and no override. Its OpenAI payload
is the synthetic label-merge requirements/source, the unchanged 13 retained
tests, nine current EHS skills/resources and test-critic. No parent oracle,
reference implementations, conversation, credentials, unrelated project files,
memories or provider captures are deliberately staged. Exact platform-mandatory
instruction delivery and host-wide access remain unattested.

The only authorised worker write would be merge-labels.ts in a fresh private
fixture. Existing tests, requirements and staged guidance stay byte-identical.
No installs, unrelated network tools, git, EHS edits, reviewer agent or further
delegation. Expected provider traffic is not a network-offline or cost-cap claim.
Consent must expressly cover this new payload and delegation.

Qualify and freeze the fresh fixture locally before dispatch. The worker has one
uninterrupted implementation-and-verification task, with no parent release step
or follow-up prompt. Keep a 180-second wall-clock cap from dispatch initiation
through terminal observation/closure; preparation occurs before it and parent
verification after worker closure. Neither permits extra model time.

Success would require a completed worker response within the cap, only the
source changing, the unchanged 13 tests passing, all nine parent contract cases
passing and an honest receipt distinguishing its checks from independent ones.
This observes a fix under pre-existing red tests, not worker-authored or
spontaneous TDD. No baseline, causal EHS, provider-parity or release claim.

Stop before launch on missing consent, changed inputs or failed local
qualification. Stop without retry, resume, budget extension or parent repair on
deadline, observed forbidden action, test/input drift or incomplete/failed
acceptance. Wait calls must fit the remaining cap; the deadline is not reset.

Verdict: **needs-human-decision**. The local review is complete; the narrower
payload, fresh worker and new attempt require explicit consent before execution.

## Local Verification

Private retention remains `/private/tmp/ehs-implementation-100.XZ7IFf`.
Read-only verification checked all 48 manifest entries as regular non-symlink
mode-0600 files with matching SHA-256 values. Sixteen staged skill/resource
files also match the current repository. The original source and worker test
hashes match 101; staged test-critic matches the current repository too.
No retained captures were rewritten.

Three parent Bun reruns reproduce the discrimination results above. These
are current host checks of retained variants, not historical chronology or a
worker fix. Product tests were not rerun for this documentation-only review.
Repository scaffold validation, 109 local links across the five pending
documents and whitespace/diff checks pass. No commit or publication occurred.
