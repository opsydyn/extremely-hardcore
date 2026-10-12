# decision challenge: risky test-quality follow-up

## Work Receipt

- result: needs-human-decision
- claim: Prepared the bounded follow-up to Run 060; no model launch occurred.
- evidence: Current guidance, critic roles and Run 060 were inspected; the
  observation and consent boundaries below are explicit.
- remaining uncertainty: Fresh scoped OpenAI payload/delegation consent is
  pending. No trial result, independent review or sequencing evidence exists yet.
- next: hold; obtain consent before fixture execution and model launch.

## trigger

A fresh externally executed writable-agent trial, with a synthetic security
boundary and a separate independent reviewer. Run 060's one-trial consent is
spent; approval of the follow-up direction does not reuse that payload consent.

## proposal and claims

Contract: exercise risky-change review and capture test-before-implementation
evidence on a disposable authorisation fixture. Minimum complete scope is one
worker with an observed test-only checkpoint and one read-only test reviewer.
Retain source/test snapshots, parent command results and separate role receipts.
Do not change EHS skills, runtime, auth, CI or existing Pi work. No commit/push.

Candidate payload is synthetic source/tests/requirements, staged nine EHS skills
and supporting resources, architecture-critic, delivery-critic and test-critic.
The reviewer receives the same fixture contract and relevant skills/roles, plus
the original/final source, worker tests and parent verification evidence, but not
the worker's private reasoning or parent conversation.

Candidate task: correct a pure document-access check. Access requires a known
authorised role and matching, non-empty tenant identifiers; an admin role must
not bypass the tenant boundary. Unknown/missing roles fail closed. No real
identity, credential, network, storage or deployment is involved. Preserve the
function signature. Supply an existing fixture ADR defining the intended policy
so the worker can consult it rather than invent policy or skip required records.
The eventual task explicitly authorises this synthetic security correction.

The worker would first be allowed to edit tests only, then stop. The parent
would compare the source to its initial bytes, retain test/source snapshots and
run the tests against the unchanged defective implementation. Implementation
would be released only after a behavioural rejection test fails for the expected
reason. Resume the same worker, not a fresh attempt. Snapshot the final patch,
independently rerun checks, then ask a fresh read-only reviewer to assess test
strength and consequential gaps. Do not repair findings during the trial.

This is controller-checkpointed sequencing, not an unbiased test of spontaneous
test-first behaviour. Matching snapshots do not prove absence of intermediate
edits or hostile tampering. Actual skill use/routing needs observed evidence;
role declarations alone are worker-declared. Explicit reviewer dispatch proves
that a review was requested, not autonomous risk-triggered delegation.

## existing-platform ownership

Native Codex owns model invocation, inherited settings and host permissions.
Fixture-only write/read instructions do not establish sandbox or network
isolation. Provider traffic to OpenAI is expected; unrelated network tools are
forbidden. The parent owns case selection, snapshots, execution and scoring.

## durable differentiated value

An inspectable, bounded engineering-method observation. No new scheduler,
framework, state-machine runtime or production security capability is proposed.
No new EHS architecture decision is required: this repeats existing disposable
native dogfood; the synthetic fixture's policy is documented separately.

## strongest counterargument

Forcing a test-only phase can make weak guidance appear disciplined. A small
synthetic authorisation function cannot establish real security adequacy, broad
agent adherence or improvement caused by the revised testing instructions.
Separate these limitations rather than extending the harness to hide them.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Meaningful tests precede the final patch at a checkpoint | Run 060 supports final test discrimination only | Chronology | Parent initial/source/test snapshots and behavioural failing command before implementation release |
| Final policy is correct for the bounded fixture | No new execution | Functional outcome | Parent direct contract cases and passing worker tests |
| Tests protect consequential rejection paths | Updated test-first/test-critic guidance | New security-fixture coverage | Worker tests reject original cross-tenant bug and predeclared defect variants |
| Test review is independent of the implementer | Native fresh-agent capability available | Review not run | Separate fresh reviewer, own findings and evidence limits |
| Risk-triggered roles were considered | Entry point routes architecture/delivery/test review | Worker behaviour unknown | Inspect worker output/available evidence; label self-review and prompted review accurately |

## minimum credible slice

Candidate ceiling: one fresh native worker, inherited model, 240 seconds total
active worker time across two phases; one fresh read-only reviewer, inherited
model, 90 seconds. No retries, installs, network tools, git actions, further
delegation or edits outside the disposable fixture. Time awaiting parent checks
does not consume active worker budget. These are attempt/time bounds, not token
or spend caps. No claim of automatic skill discovery or model attestation.

Before launch, freeze concrete fixture inputs and scoring: checkpoint red,
final green, independent contract cases, and defects covering cross-tenant admin
access, missing tenant identity, unknown role and denied valid same-tenant access.
All variant failures must be behavioural rather than syntax/setup failures.

## stop conditions

Stop without retry if either budget expires, an observed action exceeds scope,
the source differs at the test-only checkpoint, the red check fails incidentally,
the worker does not stop at the checkpoint, or reviewer/worker output is missing.
Do not relax criteria or patch the worker result to convert failure to success.
An independently found consequential test gap remains a finding, not a new
authorisation for remediation. No credential or unrelated-file inspection.

## verdict

needs-human-decision

## rationale

The follow-up direction is approved. The concrete new payload and the two-agent
budget/delegation must be explicitly authorised before execution. Reuse existing
local evidence conventions, keeping this proposal separate from trial results.
