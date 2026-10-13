# Claude Implementation Pre-Dispatch Auth Stop

Date: 2026-10-13. The user explicitly answered Yes to the scoped Anthropic
payload and limited Read/Skill/Edit observation in
[review 104](104-claude-implementation-boundary-review.md).
No model task was dispatched.

Follow-up: the user authorised normal subscription sign-in and reported ready.
[Record 106](106-claude-auth-restored-synced-skill-stop.md) confirms restored auth
but stops before model dispatch on a newly observed synced-skill source. The
auth failure below remains historical; another login is not the current action.

- result: blocked
- claim: Fresh Claude metadata checks pass, but both the proposed profile and default-host authentication status report no signed-in account. The implementation observation stopped before dispatch.
- evidence: CLI 2.1.289 and its binary pin match 104; nine staged skills and native validation/list/details pass. Two redacted outside-sandbox auth diagnostics each exit 1 with loggedIn false, authMethod none and apiProvider firstParty. Staged bytes and inspected settings hash remain unchanged since preflight.
- remaining uncertainty: Credential visibility or sign-out cause is undiagnosed. No runtime startup, native skill invocation, Edit, implementation, model usage or parent final verification exists for this slice.
- next: needs follow-up; restore normal Claude subscription sign-in, then request resume and refresh the unchanged preflight. Do not switch auth routes, relax permissions or automatically dispatch on a later sign-in.

## Approved Scope And Stop

The approved task remains one limited source-edit observation: synthetic
label-merge requirements/original source, 13 existing tests and nine EHS
skills/resources; 180 seconds, eight turns, requested USD 1.00 API-cost cap;
Read/Skill/Edit only, parent-run tests, no retry/resume/delegation or shell.
Normal host-owned system context was expressly included in the consent.

Model-launch count is zero; the execution timer never started. No fixture,
test payload, task prompt or implementation monitor was created. A fresh
skills-first plugin and no-model diagnostics were prepared before checking
auth. Historical temporary trial-089 helpers were absent and not reused.

Decision challenge verdict for launch: **hold**. User payload consent is
resolved, but it does not override the auth stop in 104. No new architecture,
auth mechanism, adapter or permissions change; no EHS ADR required. Native
Claude still owns credential handling and execution; do not add a runtime or
copy credentials to bypass this prerequisite.

## Current Diagnostics

| Check | Observation | Limit |
| --- | --- | --- |
| CLI/build pin | 2.1.289; binary SHA matches 104 | Not provider/model availability |
| Native plugin checks | Validation/list/details exit 0; nine skills; no bundled agents/hooks/MCPs/LSPs | Metadata, not model loading or runtime tools |
| Proposed-profile auth | 2026-10-13T11:56:15.378Z; exit 1, loggedIn false, authMethod none, firstParty | Redacted status under requested flags |
| Default-host auth | 2026-10-13T11:57:35.901Z; same exit/status | Separate diagnostic without profile flags; not a model retry |
| Saved settings since preflight | SHA unchanged | Not attestation of all host or credential-store state |
| Staged plugin files | All 17 hashes unchanged and match repository | Not exact model-visible instruction delivery |

Both auth checks ran outside the Codex sandbox. This narrows the profile-only
explanation but does not establish why credentials were unavailable or whether
another interactive process has usable credentials. Do not infer expired
tokens, account loss or an EHS defect from these status results.

Only loggedIn, authMethod, apiProvider, exit status and timestamps were retained
from auth output. Account identifiers, credentials and raw auth stdout/stderr
were not retained or printed. No login, logout, explicit refresh, credential
export, API-key substitution or model request was performed. Native internal
credential handling remains unattested.

## Recovery Boundary

The installed login help confirms the normal subscription route:

```bash
/Users/alancurrie/.local/bin/claude auth login --claudeai
```

The human completes sign-in in their normal terminal; do not share tokens or
copy credential files into staging. On a requested resume, refresh current
CLI/auth/configuration and source/staged pins, then prepare and test the
three-tool startup/action monitor and qualify the synthetic original red before
any model dispatch. The existing Read/Skill-only startup predicate is not
silently widened. Restore no vanished historical controller.

No model retry occurred, but this stop does not waive launch gates. Any changed
payload, model, budget or permission scope requires a new decision and consent.
Do not introduce Bash to obtain a result or call parent-run tests agent evidence.

## Retention

Private root: `/private/tmp/ehs-claude-105.2sKK3K`. Twenty-seven regular,
symlink-free mode-0600 artifacts are SHA-256 pinned; private directories are
0700. Retention includes the staged plugin, diagnostic helper/commands,
preflight, redacted auth records and blocked outcome, not a provider transcript.
Temporary retention may expire; review/redact before sharing.

- Preflight: `347b1c0df9f469832e5ce01c5be8086d8132a0f66ccb754541d33e1dbe563224`.
- Profile auth: `e98b59c03e82f070351a7aaee57b66fb44689f9140593c97483ab405cf1e2f76`.
- Default auth: `e96570abfa1bbfcf7442fa21aa1a193a626718621e2ece704e75fcb982436a56`.
- Manifest: `3009d1bf1eb1957aa100d5b447372c48ad5319d8705ffe9689efa6f7b314fadd`.

No product/skill/adapter changes, commit or publication occurred. Full product
tests were not rerun for this pre-dispatch diagnostic and documentation work.
