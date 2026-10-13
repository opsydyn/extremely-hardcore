# Pi Bounded Planning Observation

Date: 2026-10-13. Approved narrower observation after
[control review 097](../evaluations/097-pi-capture-control-review.md).

Execution follow-up: [result 099](../evaluations/099-pi-bounded-planning-result.md)
records the single completed observation: four behavioural criteria pass,
three fail and criterion 8 remains not observed. No automatic retry follows.

## Approved Scope

The user approved the fixed task/EHS OpenAI payload, then explicitly approved
the narrower observation. Resolve 097's human-decision gate by allowing this
observation without a pre-dispatch callable-tool inventory. This does not waive
the original scoring requirement: criterion 8 remains unverified. All eight
original criteria are retained; seven behavioural criteria can be assessed from
the answer, but no 8/8/full-host acceptance claim is permitted.

Reuse [plan 096](096-pi-standalone-planning-trial.md)'s exact Fixed Task Input,
Pi 1.1.0 executable/profile, openai-codex/gpt-5.5/medium, nine-skill snapshot,
private staging and payload. One CLI task, 180 seconds from spawn, at most eight
observed assistant turns, requested final under 600 words. No relaunch, resume,
model substitution, implementation or tests of the supplied function. Native
internal retries can occur within the deadline; hidden provider attempts stay
unknown. Read paths are monitored, not sandbox-enforced.

Decision-challenge verdict: **proceed**, for the now-approved observation only.
Pi owns runtime controls; EHS owns engineering guidance. The strongest objection
remains missing full runtime provenance. Preserve that gap rather than adding
an extension, SDK worker, host patch or reusable harness. No ADR is required:
native execution mechanisms, saved settings, dependencies and public contracts
are unchanged; only the expressly approved observational claim is narrower.

## Capture And Verification

Use a single-use temporary capture helper outside the model workspace. Locally
test actual child-process capture and termination before invoking Pi. Tests
cover canonical in-tree reads, traversal/symlinks, malformed/split JSON, wrong
tools, turn cap, tool/assistant errors, missing completion, deadline escalation,
UTF-8 chunk boundaries and model substitution. These are monitor tests, not Pi
containment or behaviour proof. Stop on any failed capture gate.

Recheck frozen source, bundle/settings and source/staged skill hashes. Preserve
the no-refresh auth diagnostic separately from payload consent. Retain exact
prompt/argv, helper/tests, native stdout/stderr, final/usage, timestamps,
retry events, exit/termination and state equality privately. An exclusive
dispatch marker prevents accidental re-invocation. Do not refresh credentials,
toggle retry/compaction settings, replace the system prompt or copy auth files.

Monitor read/tool arguments and observed model metadata; terminate on unexpected
actions, explicit assistant/tool errors, truncation, turn limit or deadline.
Monitoring is detection, not prevention. Native credential handling and hidden
provider requests are not independently attested. Zero exit without a successful
final assistant message and agent_end is not completion.

Keep reports and assessment outside staging. Assess the original
[plan 072 criteria](072-codex-standalone-acceptance-trial.md) without reviewer
supplementation. Retain a redacted result separately from failed/stopped earlier
records. No skill edit, automatic retry, commit or distribution follows.
