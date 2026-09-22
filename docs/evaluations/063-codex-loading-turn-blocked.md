# Codex explicit-path loading turn: blocked preflight

Date: 2026-09-22. Follow-up to the approved
[no-model discovery probe](062-codex-skill-discovery-probe.md).

Historical preflight. The user later approved signed-in access and provider
transfer; the [corrected loading turn](064-codex-explicit-skill-turn.md) completed.
The observations below describe the earlier blocked attempt, not current status.

## Scope

One harmless, ephemeral Codex app-server turn using the staged
`simple-made-easy` skill by absolute path. The task was a short design choice
between a direct in-memory map and a new cached service. The request specified
read-only sandboxing, no approvals, and no file or tool use. Control and
treatment `skills/list` inventories, host events, available usage, and final
output were to be retained. No repository implementation change or comparison
run was in scope. No new ADR applies to a probe that never reached a turn.

## Local preparation

The source was clean commit `5e19c43ed1c8e93d3826d20f2adc164a58f1a158`.
All nine skills, including templates, were copied into a temporary workspace
at `.agents/skills`. The 16-file path/size/SHA-256 manifest matched the source
before the attempt and was stable afterward. Manifest digest:
`5a19b8108349ce3dd71450ad3639302dd2779e829ef1ea537979e95674665043`.
The local probe script and first-attempt report are under
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-loading-iDjO8L/`;
the host may later remove this temporary directory.

## Observed boundary

The sandboxed app-server process exited before responding to `initialize`:
it could not initialise SQLite state under the signed-in `~/.codex` directory.
No `skills/list` response, thread, turn, model output, token usage, or loading
event was produced in this attempt.

An escalated retry of the same script was rejected by automatic approval
review before execution. The rejection identified two unapproved effects:
access to persistent signed-in Codex state and possible transfer of private
EHS skill contents to the provider. It explicitly disallowed bypassing the
decision through another path. No retry or workaround was performed.

## Status and next decision

The [earlier no-model discovery result](062-codex-skill-discovery-probe.md)
still establishes inventory only. This attempt adds no instruction-delivery
or behavioural evidence. Comparative execution remains on hold.

To retry, the user must explicitly approve one signed-in Codex app-server
turn that may write normal Codex state under `~/.codex` and send the staged
EHS skill text and harmless task to the model provider. The intended turn
would remain ephemeral and read-only with respect to the temporary workspace
and repository; raw host events would stay local for review. Automatic review
may still reject the operation, in which case stop and report the block.

- result: blocked
- claim: The explicit-path loading turn did not start.
- evidence: Pre-initialisation SQLite error and automatic review rejection.
- remaining uncertainty: Skill injection, model adherence, trace, and usage remain unobserved.
- next: Obtain explicit approval for signed-in state access and provider transfer before retrying.

Recommendation: hold.
