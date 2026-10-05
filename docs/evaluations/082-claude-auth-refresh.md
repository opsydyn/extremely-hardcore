# Claude Authentication Refresh

Date: 2026-09-30. No-model follow-up after the user reported renewed sign-in.
Preserves the failed observations in [preflight 081](081-claude-no-model-preflight.md).

- result: complete
- claim: Claude subscription authentication is available through normal host credential access; the requested diagnostic profile recognises the staged EHS plugin.
- evidence: Outside-sandbox default and profile auth checks exit 0 with `loggedIn: true`, `authMethod: claude.ai`, first-party provider; session inventory contains only EHS; fresh native manifest/details checks pass; source/staged hashes and user settings remain unchanged.
- remaining uncertainty: Sandboxed auth still reports logged out. Native metadata does not establish effective model-visible instructions/tools, managed-policy enforcement, invocation or adherence. No model ran.
- next: needs follow-up; review the remaining runtime-exposure gate in plan 080 and separate Anthropic payload consent before model dispatch. Use normal host credential access, not a new credential route.

## Observations

The initial sandboxed default auth check exited 1 with `loggedIn: false` and
`authMethod: none`. The read-only check outside that sandbox exited 0 with
`loggedIn: true` and `authMethod: claude.ai`. The requested diagnostic profile
also authenticated outside the sandbox. This difference establishes that the
current sandbox check is not authoritative for host sign-in; it does not
justify copying tokens or changing authentication mechanisms.

Claude remains `2.1.259 (Claude Code)`. Reusing the existing no-model preflight
driver created a fresh private skills-only staging directory. Native manifest
validation exits 0 with no errors/warnings and empty component contents;
plugin details lists nine skills, zero agents/hooks/MCP/LSP and the same
estimated 376 always-on tokens. Skill-content validation remains a known CLI
coverage limit, not newly proved acceptance.

Under the proposed restricted/settings/MCP/tool diagnostic profile, native
`plugin list --json` exits 0 and lists only `extremely-hardcore@inline`, version
`0.0.1`, enabled in session scope, at the fresh staging path. Profile flags
remain requested controls, not runtime attestation. The ambient local source
inventory is unchanged from 081; user settings remain unchanged too.

Source and staged skill hashes match before and after the refresh:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Source and staged manifest hash remains:
`855bcacf50cc45aa0df79777ae7fc6baf3abd7768411979c1405e6ef718ca33d`.

## Retention And Limits

Fresh private temporary root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-claude-081-k8s2lj`.
The reused driver retains its `081` directory prefix; this is a new capture,
not an overwrite of the earlier record or reports.

- `preflight.json`: `d5818563f013ca207bcfe2d513e4cbdba1ce54929b0b9fd35a191a14d38b382e`.
- `auth-refresh.json`: `945661fd82683248094a2a266a0607517575d0bc1792bf733ae71191d71a4251`.

Reports are mode-0600 files outside the staged workspace. The auth refresh
retains only selected status fields, plugin inventory and unchanged-file
checks, not credentials or account identity. Initial default auth checks are
controller-captured observations summarised here, not included in that report.
Temporary files may disappear with system cleanup.

No model, login, install, update or eval command ran. No saved settings, skills,
adapter or public contract changed; no ADR is required. Authentication recovery
does not clear the runtime-exposure stop condition or grant Anthropic model
payload consent in [plan 080](../implementation-plans/080-claude-standalone-planning-trial.md).
Claude behavioural acceptance remains open, comparisons remain on hold and
distribution remains last.
