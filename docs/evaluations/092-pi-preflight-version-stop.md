# Pi Preflight Version Stop

Date: 2026-10-10. Approved no-model execution of
[plan 091](../implementation-plans/091-pi-standalone-preflight.md).

- result: blocked
- claim: The frozen Pi preflight stopped on host-version and loader-source drift before staging or native loading; no EHS behavioural result exists.
- evidence: The pinned executable now reports 1.1.0, not 0.84.1, and both inspected loader-source digests differ from plan 091. EHS skill snapshot remains unchanged. The user's separate auth diagnostic reports ready for openai-codex OAuth.
- remaining uncertainty: Effective resources, tools, model selection, instruction delivery and adherence on Pi 1.1.0 remain unverified. Provider readiness is user-reported, not independently rechecked here.
- next: needs follow-up; review Pi 1.1.0's loading/configuration controls offline and propose a refreshed no-model preflight. Do not silently accept new hashes, downgrade, repeat the old preflight or dispatch a model.

## Observed Drift

The same executable path from plan 091 reports `1.1.0` with exit 0:
`/Users/alancurrie/.local/share/fnm/node-versions/v24.15.0/installation/bin/pi`.
No install, upgrade or downgrade was performed by this preflight.

Installed source SHA-256:

| Source | Plan 091 pin | Current observation |
| --- | --- | --- |
| dist/core/skills.js | dce4478a3f0d7aaf02fc90fa5013ca671f4fe44c9be3e1753fa64fbf9ab7afcc | 0e20ec500ed9783d5b01b5399e6600134fc3fdd10e6dc46c9113bc01565c9aa5 |
| dist/core/resource-loader.js | dfd66250341b8cfb1a9c90ffcd73434806fb14476c824d34d94b4bed40a90ee1 | 0d2ed0d85c39d05d611cd5904c6e696f7e2d16b2316e35d19f9b1f747ee62444 |

The initial local inspection also read portions of resource-loader.js and main.js.
Those were source reads, not native loader execution or an agent session. The
new source mentions built-in extensions and an MCP command path; their presence
is a reason to review the current controls, not proof of enabled exposure or a
permission breach. Old line offsets/control assumptions cannot qualify this build.

EHS snapshot remains:
`3dec2859e4bc45808c1d5c3a381789b393f778e947ba95bd9feecf18ef505be1`.
Current repository commit is `0b6c255`. Earlier captures and scores are unchanged.

## Boundaries And Disposition

No disposable staging was created, native loader API executed, provider/model
catalogue queried, auth check repeated, credential refreshed/read/printed, model
session created, prompt transmitted or live retry attempted. No Pi configuration
was intentionally changed; saved host settings equality was not measured by this
limited check, so it is not asserted. Authentication readiness does not override
the pinned-build stop or grant model-payload consent.

No ADR is required for observing drift without changing architecture, auth,
dependencies, public contracts or host controls. The minimum next slice is a
source-grounded, offline review of the new build, not a new runner or skill edit.
Keep plan 091 historical; a refreshed proposal must explicitly name the new
build, candidate resource/tool controls and remaining limits before execution.
Pi acceptance, comparisons and publication remain open.

Verification is limited to host-captured version/hash commands, installed source
reads and the source skill snapshot. No behavioural test or full suite was run
for the stopped diagnostic. Documentation follow-up uses scaffold validation
and diff checks, not a retrospective preflight pass.
