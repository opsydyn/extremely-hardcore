# Control MCP gate regression

Date: 2026-09-26. No host process or model was invoked in this follow-up.

## Contract and decision

Correct the local predicate that stopped [the trace attempt](069-control-only-trace-probe.md)
on explicitly disabled MCP entries. Keep the original failed attempt and
budget intact. Do not restart the probe, alter saved settings, change the
comparison preflight/scorer, or claim comparison readiness.

Decision challenge verdict: **proceed**, for offline predicate correction.
The strongest objection is that accepting the `codex_apps` catalog could be
misread as isolation proof. It remains an explicit host-catalog exception:
the caller must separately verify zero enabled/callable apps, and neither
that projection nor this check proves exact model-visible tool exposure.
Codex owns runtime isolation; the helper only checks supplied inventory data.
The retained response is evidence for the false rejection, not current-host
attestation. A fresh attempt must reacquire all inventories.

Boundary review: **safe**. The one-off temporary probe imports a pure helper
from `evaluation/control-mcp-status.ts`; tests import the same helper. No
dependency on the scorer, skill instructions, protocol runtime, or provider
invocation is introduced. No ADR is needed for this internal correction: no
architecture, security policy, persistence, or public contract changes.

## Behaviour and evidence

The extracted old predicate reproduced the disabled-entry rejection before
correction (focused suite: 2 pass, 3 fail). The corrected predicate accepts
known configured servers only when explicitly disabled with no listed tools.
It rejects unknown names even when disabled, duplicate names, active or
indeterminate configured statuses, malformed required fields, and any cursor
other than explicit `null`. Hosts may omit disabled entries.

The `codex_apps` exception accepts `notStarted`, `starting`, or `connected`
catalog status, or `disabled` with zero tools. Unknown/error states fail
closed. This is not permission to call catalog tools.

The focused regression suite passes five tests with 38 assertions. Offline
replay of the private capture from 069 accepts its `codex_apps` catalog plus
five known disabled/zero-tool servers, with no remaining cursor. Its request
log still contains zero `turn/start` calls. The temporary probe now imports
this tested predicate; it was not rerun. Repo tests do not start app-server.

Final repository checks: `bun run test` passed 172 tests with 619 assertions
across 29 files; `bun run validate`, `git diff --check`, and
`bunx --no-install tsc --noEmit` passed. Since the root TypeScript config
includes only `scripts/**/*.ts`, the helper and its test were also checked
explicitly with strict TypeScript options; that check passed.

- result: complete
- claim: The local false rejection is corrected and regression-tested without retrying the model probe.
- evidence: Red/green tests and offline replay of the retained raw host response.
- remaining uncertainty: Fresh host state, actual turn trace/usage retention, and exact model-visible tools/instructions remain unverified.
- next: Propose a new one-turn, 120-second control-only trace attempt with refreshed inventories and no retries.

Recommendation: needs follow-up. A/A remains hold.
