# Pi Capture And Control Review

Date: 2026-10-13. Local review after approval of
[proposal 096](../implementation-plans/096-pi-standalone-planning-trial.md),
then a request to try again. No planning task was dispatched.

- result: needs-human-decision
- claim: The reviewed native CLI profile does not expose the required pre-dispatch callable-tool inventory. Proposal 096's launch gate therefore remains unresolved, including after checking the actual bundle.
- evidence: Existing sampled source/settings/EHS pins match 095. AST inspection of the installed main bundle confirms print mode emits a session header, binds events and then prompts; RPC get_state and get_commands do not enumerate callable tools.
- remaining uncertainty: Effective tools, full CLI loading and model behaviour remain unobserved. No capture controller or deadline/termination wiring was executed; the earlier inventory gate stopped preparation first. Prior OAuth readiness was not rechecked in this review.
- next: hold the strict trial. Decide whether to prepare a narrower observational trial with criterion 8 explicitly unverified, without changing the original scoring or claiming full acceptance.

## Contract And Observations

Review the native event/inspection path before sending the authorised task.
Reuse plan 096's scope, limits and stop conditions. No skill, adapter, runtime,
settings, credential, dependency, rubric or public contract changed. No new ADR
is required for this read-only review; the alternative below is a recommendation,
not an implemented change to the execution contract.

The user approved the stated fixed task/EHS payload and limits. That approval
does not supply missing inventory evidence or waive the proposal's gates.
The later request to try again prompted additional inspection of the actual
bundled route, not a second model attempt. There has been no first model attempt.

The executable wrapper loads bundle/cli-runtime.js, which imports
bundle/chunks/chunk-OIM2DMFI.js. Using the existing TypeScript parser/printer,
local AST reads of that installed chunk confirm the relevant control flow:

| Reviewed native path | Observation | What it does not establish |
| --- | --- | --- |
| runPrintMode, JSON output | Session header, subscriptions, then initialMessage/session.prompt | No pre-prompt callable-tool inventory or acknowledged inventory handshake |
| SessionHeader | Session/version/id/time/cwd/parent metadata | No tool list or permissions projection |
| RPC get_state | Model, thinking, session and streaming/compaction state | No callable tools |
| RPC get_commands | Extension commands, prompt templates and skills | Slash commands are not callable-tool definitions |
| RPC get_available_models | Available model snapshot | No tool inventory or inference-service availability proof |

These conclusions are limited to the reviewed CLI paths. The SDK has other
inspection surfaces; adding an extension, SDK worker, inspector attachment or
host patch would be a different execution/provenance mechanism, not completion
of this frozen profile. None was introduced or exercised.

JSON event subscriptions support capture of emitted events during a task, but
that source evidence is not a tested capture controller, runtime inventory,
deadline/kill test or proof that a monitor prevents an out-of-scope read.
Flags, the settings-snapshot loader probe and absence of observed calls cannot
replace the required inventory check. RPC would also be a different mode from
the frozen JSON/print profile; no RPC process was started merely to obtain
metadata that the source already shows is insufficient.

## Decision Challenge

Trigger: changing a pre-dispatch provenance/evidence gate. Proposed alternative:
observe planning behaviour under the same task, provider/model and budget while
reporting the inventory gap; do not manufacture an 8/8 acceptance result.
Pi still owns execution and tools; EHS supplies the method. The strongest
counterargument is that the weaker observation cannot clear the strict host
acceptance gate, and monitored read paths still are not a sandbox.

| Claim | Evidence | Gap / required decision |
| --- | --- | --- |
| Strict profile is ready to launch | Loader/parser evidence only | Required pre-dispatch inventory is missing; do not launch |
| A behavioural observation may still be useful | Fixed task and seven behavioural criteria are available | Human decision to revise the launch prerequisite, then tested capture/termination wiring |
| We can retain honest assessment | Original eight criteria remain unchanged | Criterion 8 must not pass without its required evidence |

Minimum useful alternative: one separately agreed observational task, with no
new instrumentation framework, criterion 8 fail/not observed as warranted,
and no host-parity, sandbox, efficiency or release claim. Stop on unresolved
capture/termination, unreviewed sources, drift, unexpected action or model error.
Verdict: **needs-human-decision**. No revised execution plan or live attempt
follows automatically. Prefer this limited observation to building new machinery
solely to make the original fixture pass; retaining the strict gate and parking
Pi acceptance is also valid.

## Verification Boundary

Read-only hash checks confirm Pi package version 1.1.0, all seven sampled dist
pins in 095, the settings hash and the current EHS snapshot unchanged.
Both executable wrapper hashes still match 095. Additional inspected hashes:

| Installed file under dist/ | SHA-256 |
| --- | --- |
| bundle/chunks/chunk-OIM2DMFI.js | `463db439b55a9c580d4c153492dcdd4e215fe4709ee71a876d4edff1074cdb8f` |
| modes/rpc/rpc-types.d.ts | `68b6dc2e47a3969c09c961a40d0462473407b6786f3bd02715fa035e816e2af1` |
| modes/rpc/rpc-mode.js | `631697cd35928fc827f4a423538c43ff227b8cbf63c2a2f11060616f55eba6db` |
| modes/json-event.js | `5f3756470739fa4a1595feeaf1ce2dfd29e36a2cffd9e642f914fc23f540d606` |
| core/session-manager.d.ts | `2288b69c82272311dc877da61ff2057bb04df49038ddef7eef6c8753c09f5313` |

This is sampled source inspection, not whole-package attestation or a full CLI
session. Local AST queries print the relevant case/function bodies without
executing installed bundle code. No provider request, model task, auth refresh,
saved-setting mutation, capture driver, skill edit, commit or publication ran.
No full product test suite was rerun for this documentation-only review.
