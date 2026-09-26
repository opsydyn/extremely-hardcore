# No-model host arm capture

Date: 2026-09-22. No thread, turn, model call, provider comparison, or repository
settings write was made.

## Contract

Capture fresh signed-in host records for the review fixture's control and EHS
arms, inspect parity, and run the preflight without filling unknown fields from
assumptions. Scope: disposable workspaces, process-only ambient-skill disable,
`skills/list`, `config/read`, and `hooks/list`. No A/A execution. The existing
[comparison decision](065-comparison-control-and-scoring-readiness.md) still
holds model runs; this is its approved no-model evidence step.

## Host evidence

The installed CLI was `codex-cli 0.154.0`. A sandboxed first attempt stopped
before `initialize`: its SQLite state under `~/.codex` could not open. The
approved signed-in retry used fresh disposable control and treatment workspaces,
with the nine current skill directories copied only into treatment. A
process-only `skills.config` override disabled the 17 previously identified
ambient `SKILL.md` paths in both arms. The final request log contains only
`initialize`, `initialized`, `skills/list`, two `config/read` calls, and
`hooks/list`. No saved configuration was changed.

The raw local capture is at
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-review-capture-22Ag74/capture.json`
(SHA-256 `ce791c3cff2ffd694e782af08db6d1bba1f1fe91d47c8aa76a7b1a5527cab5a1`).
It is private temporary host data and may disappear; do not publish it without
review and redaction. The source and staged skill snapshot SHA-256 values both
equal `950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
The local pin also covers the task, executable fixture, output schema, and
canonical explicit invocation path; it is retained in the private arm record.

| Observed item | Control | Treatment |
| --- | --- | --- |
| `skills/list` enabled | 0 | 9 EHS |
| Disabled ambient skills | 17 | Same 17 |
| Discovery errors | 0 | 0 |
| Effective config canonical digest | `0a1dd06d526818c2b78cc552ce4939398ca9624f9552fee6d03d67f7b406839b` | Same |
| `hooks/list` digest | `31b84aee9efd9c27ac13b0c4f34e2a77293908c17cd405f1e990f760b7a4f6c6` | Same |

Both hook inventories contain one enabled, trusted `sessionStart` command hook
with the same current hash. Both effective configs name four MCP servers and
model `gpt-6-astra`. These are matching configured inventories, not proof of
equal hook effects, MCP connection status, or model-turn tool exposure.
`config/read` reports the default sandbox as `danger-full-access`; a future
read-only thread request has not been made or accepted in this capture.

## Preflight result and path decision

The host canonicalises staged paths through `/private/var`, while the local
temporary directory is reported as `/var`. The preflight now resolves skill
files before comparing paths, and its regression test covers that alias. It
still rejects symlinks in the pinned skill snapshot and requires the actual
native invocation JSON to match its pinned digest. This is a local path-identity
correction, not a relaxation of the skill snapshot or invocation boundary.

The evidence-derived arm record is retained beside the capture as
`arm-record.json` (SHA-256
`986818cee93da5059697abeeef1fc84814eb3124f57bbb0455cd92b64c7d7aab`).
Its `tools` and `instructionSources` fields are absent; trace retention is
false and the permissions reflect unverified defaults. `bun run
evaluate:review -- preflight <arm-record>` exited 1 with `status: blocked`
and `incomplete or malformed preflight evidence`. These gaps must not be
invented to obtain `ready`.

## Decision

**Hold** on A/A. A fresh no-model catalog and configuration parity check is
useful, but cannot establish a matched model-turn tool set, delivered
instructions, accepted read-only/no-network permissions, or retained traces.
The active session-start hook and configured MCPs remain possible influences.
Before a model run, predeclare the experiment budget, repetition/order and
stopping criteria; prove the requested turn configuration and raw event/usage
retention in a bounded capability check; and decide how to isolate or account
for hook and MCP effects. Do not turn this capture into an EHS-effect claim.

- result: complete
- claim: Fresh no-model skill, config, and hook inventories match on observable fields; comparison preflight remains blocked.
- evidence: Private raw host responses and request log, matching skill/config/hook digests, blocked preflight, focused path regression test.
- remaining uncertainty: Tool inventory, instruction delivery, live MCP effects, hook effects, accepted turn permissions, trace retention.
- next: Resolve those host-capability gates before any A/A turn.

Recommendation: hold.
