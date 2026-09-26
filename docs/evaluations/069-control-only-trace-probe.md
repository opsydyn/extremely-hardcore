# Control-only trace probe

Date: 2026-09-26.

## Contract and predeclared budget

One harmless control-only turn tests task-input, final-answer, event, and usage
retention. No EHS skill, seeded review task, scorer oracle, treatment, A/A,
A/B, saved configuration change, or writable-agent execution is authorised.
Use the signed-in `codex-cli 0.154.0`, model `gpt-6-astra`, a fresh disposable
workspace, ephemeral thread, `approvalPolicy: never`, and read-only command
sandbox with network access false. Model service traffic is necessary; this
is not a claim of wholly offline execution.

Budget: at most one `turn/start`, no retries, 120 seconds from dispatch to
completion, and a requested one-line answer. This is a wall-time/turn budget,
not a host-enforced token or spend cap. Record actual usage; do not estimate
cost. Inventory-only processes may precede the turn. Never run a model if the
fresh inventory checks fail.

Fixed input: `Without using tools, files, apps, or the network, compute 17 + 25.
Reply with exactly: TRACE_PROBE_OK 42`.

Acceptance: retain the exact request, a matching host user-message event,
completed final answer, completed-turn event, usage notification, and an
unchanged empty workspace. Retain failed attempts. Stop on timeout, host
error, unexpected tool/action item or server request, enabled control skill,
callable/enabled app, active configured MCP, changed accepted permission, or
missing required trace. Detecting an unexpected action is not proof that it
was prevented before execution.

## Decision challenge

Trigger: isolation/provenance claims. Codex owns execution, permissions, and
events; EHS owns only the evidence assessment, not a new runtime.

The strongest counterargument is that inventory projections do not expose
the full model-visible tool list. Therefore this probe can establish observed
trace retention only, not exact tool or instruction parity. Disable ambient
skills, plugin discovery, configured MCPs, web search, and all freshly listed
apps using process-only overrides; recheck before the turn. Keep the existing
Herdr hook's transport environment inactive.

| Claim | Evidence before execution | Gap | Required evidence |
| --- | --- | --- | --- |
| Host can retain an isolated control turn | Earlier native turn and no-model gate | No turn under refreshed controls | This single raw capture |
| Apps are disabled for this thread | Earlier zero-callable projection | Host drift | Fresh post-override app inventory |
| Comparison is qualified | None | Exact model-visible tools/instructions and experiment design | Not addressed by this probe |

Minimum credible slice: one arithmetic turn and private trace capture.
Verdict: **proceed**, for this capability probe only. A/A remains **hold**.
No ADR is required: this observes the existing host route without changing
architecture, dependencies, persisted settings, or public contracts.

## Outcome

The attempt stopped before `turn/start`: **zero model turns**, no retry,
no final answer, and no usage evidence. Both app-server processes exited.
The private raw capture is retained at
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-control-trace-LbcFtm/capture.json`,
SHA-256 `6f7fbf1907dbfc7ad9827e7e2bb0712bf924dfb36f31396545f5ca8cab674bc4`.
Its `report.json` records `status: blocked` and `turns: 0`. Review and redact
host data before sharing; temporary artefacts may disappear.

Fresh discovery found nine ambient skills, 27 enabled/callable apps, and five
configured MCPs, including the newly listed `osad`. These inventory requests
did not request a model turn or app/tool action. A second process disabled
every freshly discovered skill, app, and configured MCP. The resulting
inventory showed zero enabled skills, 27 disabled apps and zero callable apps,
web search disabled, and all five configured MCPs disabled. The known Herdr
hook hash and command matched; its transport environment was inactive.
The accepted ephemeral thread returned `gpt-6-astra`, provider `openai`,
approval `never`, and a read-only sandbox with network access false.

The final MCP status response listed `codex_apps` with 252 definitions and
`runtimeStatus: starting`, plus the five configured servers each explicitly
`runtimeStatus: disabled` with zero tools. No page cursor remained. The
one-off probe mistakenly rejected every server name except `codex_apps`,
including disabled entries. This is an over-strict local gate, **not observed
active-MCP exposure or proof of failed host isolation**. The no-retry rule
was honoured; neither the predicate nor the budget was relaxed to obtain a
passing model result.

The [official App Server reference](https://learn.chatgpt.com/docs/app-server)
documents the status and turn surfaces. Listed definitions still do not
establish exact model-visible tools. This capture does not qualify A/A,
instruction parity, trace retention, or an EHS effectiveness claim.

- result: blocked
- claim: Fresh inventories were retained, but the local MCP gate stopped the approved trace probe before model dispatch.
- evidence: Raw capture and blocked report; zero `turn/start` requests; zero enabled skills/callable apps; configured MCPs explicitly disabled.
- remaining uncertainty: Actual turn input/final/usage retention and exact model-visible tools/instructions remain untested.
- next: Regression-check the MCP predicate against disabled, active, unknown, and paginated entries without a model, then propose a fresh bounded trace attempt.

Recommendation: needs follow-up. Comparison remains hold.
