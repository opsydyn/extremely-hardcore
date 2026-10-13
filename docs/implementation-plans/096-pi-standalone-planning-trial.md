# Pi Standalone Planning Trial

Date: 2026-10-12. Status: prepared; no model launch authorised.

Execution follow-up, 2026-10-13: the user approved the stated payload/profile;
[control review 097](../evaluations/097-pi-capture-control-review.md) found the
required pre-dispatch tool inventory unresolved in the reviewed bundled CLI.
No task was dispatched. The original proposal and criteria below remain
unchanged; a narrower observation needs a separate scope decision.

- result: complete
- claim: One Pi-native, read-only planning observation is specified using the current EHS snapshot and original task/criteria.
- evidence: [Refresh 095](../evaluations/095-pi-refreshed-no-model-result.md) passes nine-skill loading, candidate parser assertions and no-refresh auth/local-model resolution.
- remaining uncertainty: Full CLI resources/tools, provider-side availability and instruction delivery remain unobserved. Read scope and turn limits are requested/monitored, not a Pi sandbox; internal retries remain enabled.
- next: needs review; approve this profile's limits and explicitly consent to its OpenAI payload before any launch. Preparation is not execution approval.

## Contract And Decision Challenge

Trigger: instruction/tool provenance and isolation assumptions for a native host
observation. Proposal: prepare one bounded planning task, not writable execution,
a provider comparison or an EHS adapter. Pi owns loading, tools, authentication,
retry behaviour and routing; EHS owns the engineering method. Durable value is
an inspectable host-specific acceptance record, not new orchestration.

Strongest counterargument: clean loader metadata neither establishes the full
CLI's callable tools nor prevents reads outside staging. A constrained planning
task cannot prove implementation quality or isolate EHS's causal effect.

| Claim | Evidence | Gap / required evidence |
| --- | --- | --- |
| Nine current skills load | Diagnostic 095 | Full CLI delivery and observed skill-file reads |
| Candidate provider/model resolves locally | No-refresh model auth check | Actual assistant model/provider metadata and successful completion |
| Task stays within read-only scope | Parser/source profile only | Reviewed runtime evidence; requested path scope is not enforcement |
| Planning follows EHS | Not observed | Final answer and unchanged original criteria |

Minimum credible slice: one fresh process/task, native EHS file inspection,
retained events/final/usage and manual assessment. Stop on version/resource drift,
unknown or private influence, unsupported controls, missing required capture,
provider failure, timeout or unexpected action. No bypass or automatic relaunch.
Verdict: **proceed**, for preparation only; live execution remains separately
gated. No new ADR: observe the existing host without changing architecture,
saved configuration, auth, dependency or permission boundaries.

## Frozen Profile And Launch Gates

Use Pi 1.1.0 at the exact executable in 095; recheck its sampled source and bundle
pins, global source inventory and saved-settings hash immediately before launch.
Stage only the nine skills/resources at snapshot
`ebb0960549c7976b3f062eaad3d8f86f9ecf5182ab3f5777fc37ba549fdeb197`
in a fresh private, symlink-free workspace outside repository ancestry. Keep
the proposal, rubric, captures and launcher outside the workspace. Stop on drift
instead of silently updating the frozen task. No auth/settings relocation.

Candidate argument profile, not a command to run now:

```text
--mode json --print --no-session --provider openai-codex --model gpt-5.5
--thinking medium --tools read --no-extensions --no-mcp --no-skills
--skill <canonical-staged-skills> --no-prompt-templates --no-themes
--no-context-files --no-approve --offline
```

Process-only PI_OFFLINE=1 and PI_TELEMETRY=0. Offline suppresses startup network
operations, not model traffic. --no-approve ignores project-local files; it is
not a sandbox or permission denial. Read can address arbitrary host paths; the
task restriction and event monitor do not create a confidentiality boundary.
Do not dispatch if enforced filesystem isolation is a requirement of approval.

Before dispatch, review the actual capture/termination wiring locally, without
a model request. Require parseable native events, bounded termination and
hashing/unchanged-tree checks. Do not use the optional evaluation adapter,
system-prompt replacement or a new reusable runner to fill evidence gaps.
Unresolved required inventory/capture gates stop launch, not a relaxed rubric.

## Budget And Consent

One fresh CLI process, one task, 180 seconds from spawn, requested final under
600 words, at most eight observed assistant turns. Terminate on the next turn,
deadline or unexpected tool/path; record overshoot and termination. These are
external monitoring limits, not native CLI turn/token/spend caps. No relaunch,
resume or automatic retry of the trial.

Native agent/provider retries may occur inside that one process. Agent retries
default to enabled/maxRetries 3; provider retry limits are not established here.
Record exposed retry events/counts and mark hidden provider attempts unknown.
They remain subject to the total deadline. **This proposed budget does not claim
zero provider requests/retries.** Do not invoke RPC retry/compaction toggles:
they save global settings. If zero internal retries is required, hold this
profile for a separate controls decision; do not edit settings to force it.

Consent must explicitly cover this task, nine current EHS skills and any staged
resources read, sent to OpenAI through Pi's signed-in openai-codex provider,
with the limits above. No unrelated project, credential, memory, capture or
assessor material is staged. Authentication readiness is not payload consent.
No model substitution or fallback. Capture reported usage/cost separately from
subscription billing; unavailable cost remains unavailable.

## Fixed Task Input

Only the host-specific read/path directions differ from task version 2. No
expected witness, implementation, ADR verdict, receipt or rubric is supplied.

```text
Use the using-extremely-hardcore skill at
skills/using-extremely-hardcore/SKILL.md to plan this bounded bug fix.
Read that file and applicable staged skill instructions with the read tool.
Do not implement it, execute tests, or change files. Keep the response
under 600 words.

This disposable workspace is intentionally not a git repository. There is
no project checkout to inspect; current git status is not applicable. The
function below is the complete implementation context for this task.

You may use read only for files under skills/. No shell commands, writes,
tests, web or app calls, external research, subagent delegation or reads
outside that tree.

Available skill directories under skills/ are:
using-extremely-hardcore, change-contract, domain-discovery,
architecture-decision, decision-challenge, bounded-context-review,
simple-made-easy, test-first-implementation, evidence-ledger.
Each contains SKILL.md; referenced resources may be read within that tree.

parsePort(text: string): number currently accepts malformed decimal input:

export function parsePort(text: string): number {
  const port = Number.parseInt(text, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Invalid port");
  }
  return port;
}

Required behaviour: accept only non-empty ASCII decimal digit strings whose
numeric value is 1 through 65535 inclusive. Leading zeroes are allowed.
Reject signs, whitespace, fractions, exponents, non-digits, and out-of-range
values. Keep the signature and the existing error message. No caller,
dependency, persistence, authentication, deployment, or configuration changes
are in scope. Explain the smallest complete change and how to verify it.
```

## Evidence And Assessment

Retain exact argv/input, executable/source/stage hashes, reviewed resource/tool
inventory with provenance, stdout JSONL/stderr, assistant/tool events, final
answer, actual reported provider/model, usage, retries, turn count, elapsed time,
termination/exit and state equality. Use private files outside staging; hash
artefacts and redact before sharing. Do not retain private reasoning dumps in
the public result. Zero exit alone is insufficient: JSON print mode needs final
assistant stopReason/error and completed-agent evidence checked separately.

Assess all eight original [criteria in plan 072](072-codex-standalone-acceptance-trial.md)
unchanged, using Pi-native events. Do not award an inventory/adherence pass from
parser flags, a settings-snapshot probe, absent observed calls or an echoed skill
name. Unsupported full inventory/exact injected bytes remain explicitly unknown;
if required evidence is missing, report fail/not observed, not 8/8.

One successful observation does not qualify implementation, consequential-work
approval boundaries, cross-host parity, productivity or release. No skill edit,
commit, new adapter or distribution follows automatically.
