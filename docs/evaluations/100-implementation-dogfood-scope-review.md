# Implementation Dogfood Scope Review

Date: 2026-10-13. Next bounded work after [Pi observation 099](099-pi-bounded-planning-result.md)
and local commit `cbdd7b2`. Preparation only; no new agent or fixture execution.

Execution follow-up: the user approved the specified Codex payload, subagent
and total budget. [Result 101](101-implementation-dogfood-budget-stop.md) records
one stopped attempt: tests-only phase complete, no implementation release and
no full acceptance. The original scope decision below remains historical.

- result: needs-human-decision
- claim: A representative implementation observation is proposed on the existing native Codex path, not by expanding the Pi read-only approval into writable execution.
- evidence: Current EHS guidance, results 099/060/062, accepted Pi adapter/containment decisions and installed Pi write/path/shell source were reviewed. Native Codex fresh-agent delegation is available; no delegate was launched.
- remaining uncertainty: Fresh scoped OpenAI payload and subagent consent are pending. Fixture/oracle/capture qualification has not run; Pi writable containment and all full-host acceptance gates remain open.
- next: needs review; approve the concrete case and one-worker budget below, or retain Pi focus for a separate writable-boundary decision. No implementation or model launch follows from preparation alone.

## Contract And Existing Guidance

Minimum complete outcome: observe a bounded fix, meaningful failing regression,
final verification and a truthful work receipt. Reuse existing disposable-native
dogfood conventions, not the optional protocol, provider adapter or a new runner.
Do not edit EHS instructions to chase the port fixture's reporting score.

Review of the three omissions in 099 found:

- Test-first guidance already asks for a failure reproduced for the expected
  reason. The planning fixture's explicit numeric witness is more specific
  than that general engineering requirement. Preserve the historical failure;
  do not make a numeric witness a universal requirement.
- The entrypoint loads architecture-decision only when its triggers apply and
  discourages reporting every skipped skill. That is a possible mismatch with
  the planning fixture's unconditional explicit no-ADR sentence. Do not change
  its score or add skipped-skill boilerplate. Observe consequential architectural
  choices when relevant in future work.
- Evidence-ledger already requires stating what was not performed. Pi's missing
  test-status sentence remains an observed reporting omission, not a missing
  verification capability or justification for a second receipt format.

## Trigger And Host Choice

Trigger: a new externally executed writable worker and new payload, after
one read-only Pi trial. Its consent is spent and does not authorise this trial.

Installed Pi writeSchema accepts relative or absolute paths, resolveToCwd handles
absolute paths and home expansion, and write operations then create directories
and write that resolved path. Its local shell executes commands with host
process authority. --tools selects tools; --no-approve controls project-file
trust. Neither establishes fixture-only write enforcement. These source reads
are not a full active-runtime tool inventory or a newly executed denial probe.

The accepted [Pi leaf decision](../adr/0022-pi-read-only-leaf-adapter.md) explicitly
excludes writes/action fixtures and calls for review before writable expansion.
The [containment decision](../adr/0017-dedicated-colima-docker-containment-probe.md)
does not authorise provider execution or credential transfer to its no-network
container. Do not bypass either decision with a writable Pi invocation, a
custom permission shim, a new runtime, or copied credentials.

Options:

1. Fresh native Codex worker, as used in [060](../dogfood/060-test-quality-probe.md)
   and [062](../dogfood/062-risky-test-quality-result.md): recommended for this
   implementation observation. Current host permissions remain platform-owned;
   fixture-only instructions are not a new sandbox/confidentiality claim.
2. Writable Pi trial: hold for a separate accepted execution-boundary decision;
   not silently substituted for the completed read-only profile.
3. Parent-only local fix: useful development checking, but not a fresh-worker or
   Pi acceptance observation. Do not relabel it as one.

No new EHS ADR is needed for the proposed reuse of native disposable Codex
dogfood with existing permissions and no architecture/dependency changes. A new
Pi isolation/execution mechanism would require separate architecture review.

## Proposed Case And Payload

Synthetic business-rule defect, not a production incident or hidden holdout:
merge display labels from current and incoming lists. Preserve the signature:

```ts
export function mergeLabels(
  current: readonly string[],
  incoming: readonly string[],
): string[] {
  return [...current, ...incoming]
    .map((label) => label.trim())
    .filter((label) => label.length > 0);
}
```

Required behaviour: trim surrounding whitespace, discard empty labels, compare
identity with JavaScript String.toLowerCase, and retain only the first label for
each identity across current followed by incoming. Preserve that first trimmed
spelling and first-occurrence order. Do not mutate either input; calls must be
independent. No Unicode normalization, sorting, persistence or caller changes.

On approval, stage only fixture requirements/source and the nine unchanged EHS
skills/resources plus optional test-critic self-review guidance in a private
disposable workspace. Initial tests are the worker's responsibility; the parent
owns independent contract cases outside the model workspace. Writable paths are
merge-labels.ts and merge-labels.test.ts only. No repository, credentials,
memories, captures, parent conversation or evaluator answers are deliberately
included in the new payload. Platform-mandatory instructions and exact model
visibility are not independently attested.

Fresh consent must cover this fixture/task, staged EHS content/resources and
test-critic, sent to OpenAI through one native Codex subagent. Use a fresh prompt,
fork_context false and inherited model/effort; no override or further delegation.
This does not run Pi, compare providers or qualify Pi implementation behaviour.

## Observation Boundary

One worker, 180 seconds total from initial spawn, including the parent checkpoint,
two authorised phases and no retry/relaunch. No reviewer agent, installs,
unrelated network tools, git operations, EHS edits or writes outside the fixture.
Provider traffic is expected; this is not a network-offline or spend-capped claim.

First permit tests only and require the worker to stop. The parent retains
source/test snapshots and executes the tests against unchanged original source.
Release implementation to the same worker only after a meaningful duplicate
rejection/assertion fails for the contract reason, not import/setup errors.
Then retain the final source/tests and independently rerun verification.
This is controller-checkpointed sequencing, not spontaneous TDD adherence or
tamper-proof history. No new general orchestration layer is proposed.

Predeclare acceptance independently of the worker's implementation:

| Behaviour | Required observation |
| --- | --- |
| Test-before-fix at checkpoint | Source bytes unchanged; worker tests fail on the original duplicate behaviour |
| Bounded complete fix | Only allowed paths change; worker tests and parent contract cases pass |
| Meaningful contract coverage | Cross-list and within-list duplicates, trimming/empty input, first spelling/order, input immutability and independent calls |
| Discriminating tests | Assert actual exported behaviour; reject the original defect and a contract-breaking sorted-output variant for behavioural reasons |
| Honest completion | Receipt distinguishes worker-declared checks, parent checks, unperformed work and remaining limits; no claims beyond this fixture |

Parent contract cases are development checks, not hidden benchmark holdouts.
No mandatory skipped-skill or numeric-witness sentence is added to this task.
No comparison/efficiency threshold is inferred from success or test count.
Source equality and final inventory do not prove no intermediate/out-of-scope
host access. Worker role/skill claims are agent-declared unless actual evidence
is available. No raw tool-attestation or containment pass is assumed.

Stop before launch on consent or fixture qualification failure. Stop the trial
without retry on deadline, incidental red, source changes before the checkpoint,
out-of-scope action, missing result or failed final acceptance. Do not repair
the worker outcome to manufacture a pass. Retain and redact source/tests,
prompts, receipts, host command outputs and hashes using existing conventions.

## Decision Challenge

Native Codex owns model execution and permissions; EHS owns the engineering
method. The differentiated value is bounded, reviewable engineering evidence,
not a scheduler, sandbox, agent runtime or new protocol.

Strongest counterargument: a small constructed label helper and forced test-only
checkpoint are less representative than ordinary repository work. This cannot
establish spontaneous TDD, EHS effectiveness or a Pi support claim. Accept those
limits rather than inventing a new writable execution environment.

| Claim | Current evidence | Gap / required evidence |
| --- | --- | --- |
| A fresh implementation observation can use an existing route | Native capability and historical 060/062 | New consent, exact fixture qualification and a new result |
| Test chronology is inspectable | Proposed source/test checkpoint | Parent snapshots and a behavioural failing command before releasing the fix |
| Tests protect meaningful outcomes | Concrete independent contract above | Passing worker/parent checks and rejection of the original/ordering defects |
| Pi writable qualification is complete | None; reviewed source shows ordinary host-path authority | Separate accepted boundary review; this trial cannot supply it |

Verdict: **needs-human-decision**. The direction is approved, but the host change,
concrete new payload and subagent budget/delegation need explicit consent before
fixture implementation and execution. No implementation plan, worker, auth check,
installation, skill edit, commit or model request occurred during this review.
