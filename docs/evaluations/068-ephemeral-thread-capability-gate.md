# Ephemeral thread capability gate

Date: 2026-09-23. No `turn/start`, model response, A/A run, or saved-config
change occurred.

## Contract and decision boundary

The approved slice was a no-model host capability probe: start one ephemeral
read-only control thread and one treatment thread in disposable workspaces,
inspect effective permissions, instruction sources, and tool-related host
status, then stop. The [comparison hold](065-comparison-control-and-scoring-readiness.md)
still governs any model comparison. EHS skills and the review scorer were not
changed.

The strongest counterargument to advancing is that a read-only command sandbox
does not constrain app/connector calls, and a server's listed tool definitions
are not the exact set presented to the model. The probe therefore tested
effective app callability separately; it does not promote catalog parity into
an instruction or isolation attestation. [Official OpenAI security guidance](https://learn.chatgpt.com/docs/agent-approvals-security)
distinguishes command-network controls from app and MCP traffic. The
[App Server reference](https://learn.chatgpt.com/docs/app-server) documents the
read-only inventory and thread methods used here.

## Host-captured evidence

The installed host was `codex-cli 0.154.0`. It used the signed-in home with
process-only overrides, not `skills/config/write` or saved settings. The
disposable treatment workspace contained a byte-matched copy of all nine EHS
skills; control had none. The source and staged skill snapshot SHA-256 both
equal `950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.

The first override form quoted MCP IDs inside dotted keys. The CLI rejected it
before `initialize` with `invalid transport`. Removing those inner quotes
passed an inventory-only probe. Subsequent no-model probes changed one
isolation control at a time:

| Process-only controls | Host observation |
| --- | --- |
| Disable 17 ambient skills, four configured MCP servers, and web search | 0 enabled control skills, 9 treatment skills; configured MCPs disabled, but host plugin and app surfaces remained |
| Add `features.plugins=false` | Bundled plugin skills and Computer History/computer-use plugin servers disappeared; the 189-definition `codex_apps` runtime remained |
| Add `features.remote_plugin=false` | No further reduction in that runtime |
| Disable all 24 previously inventoried app IDs with `apps.<id>.enabled=false` | `app/installed` reported 24 disabled and **0 callable** in each thread |

The final private raw capture is at
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-review-capture-yvFTcR/capture.json`
(SHA-256 `361dcc1be563bd18914edfe93e69f1a9c7758e4b1f5ce0134db1b6c62e65a8b7`).
Review and redact it before sharing; temporary host data may disappear. Its
request log contains `initialize`, `initialized`, `skills/list`, two
`config/read`, `hooks/list`, two `thread/start`, two `mcpServerStatus/list`, and
two `app/installed` calls. There is no `turn/start`.

Both ephemeral `thread/start` responses returned model `gpt-6-astra`, provider
`openai`, `approvalPolicy: never`, `sandbox.type: readOnly`,
`sandbox.networkAccess: false`, and `instructionSources: []`. The control had
zero enabled skills; treatment had the nine staged EHS skills. Both arms had
the same effective-config digest
`414f3255a47e4c88eeb27b1c06e41851e4753e779d6dd0cbed6f7a5a8fe9af11`
and the same hook-inventory digest
`31b84aee9efd9c27ac13b0c4f34e2a77293908c17cd405f1e990f760b7a4f6c6`.
The one trusted `sessionStart` hook remained enabled in both; the probe process
unset its Herdr transport environment so the inspected hook script had no
socket destination. The host still listed 189 `codex_apps` tool definitions,
but the effective installed-app projection was identical and reported zero
callable apps in both arms (digest
`853d209f8d81ae27c2de11dadcfbb18198a5a4d5b9b7bdea480bd579eba529c2`).
No `mcpServerStatus/list` page cursor remained.

## Result and next gate

The evidence-derived `arm-record.json` is retained beside the final capture
(SHA-256 `d0c8ae66d05d0a922f3970d0f27149b2d34dafcb92aa9d8360b7dfa736311f3d`).
It leaves the complete model-visible tool inventory absent and turn trace
retention false. `bun run evaluate:review -- preflight <arm-record>` exited 1
with `status: blocked`; those fields were not fabricated to obtain `ready`.

**Verdict: hold** on A/A. The host has demonstrated matched no-model skill,
config, hook, MCP-status, and app-callability projections plus accepted
read-only thread policies. It has not demonstrated the exact model input,
built-in tool exposure, actual turn trace/usage retention under this isolated
configuration, or an independently scored review outcome. App IDs and host
capabilities can drift, so a later run must refresh and recheck them. A single
bounded control-only turn could test trace retention and accepted task input,
but cannot alone prove tool-list completeness or EHS effect; it needs a new
explicit model-run boundary and predeclared budget.

- result: complete
- claim: Process-only controls produced matching read-only threads with zero callable apps and preserved the staged EHS inventory; comparison remains unqualified.
- evidence: Private request/response capture, matched hashes, zero-callable app projections, and a blocked preflight.
- remaining uncertainty: Exact model-visible tools and instruction bytes, turn traces and usage, host drift, review quality.
- next: Predeclare and review a single control-only trace probe before any A/A.

Recommendation: hold.
