# Pi No-Model Loading Result

Date: 2026-10-10. Approved diagnostics under
[refreshed plan 093](../implementation-plans/093-pi-1-1-no-model-preflight.md).

- result: complete
- claim: Pi 1.1.0's installed skill loader and bounded resource-loader probe recognise the nine staged EHS skills without diagnostics or extension execution; no live acceptance is claimed.
- evidence: Frozen source/build pins match; parser controls pass; direct and resource loaders return exactly nine canonical staged skill paths; zero extensions/templates/themes/context files and zero sentinel factory calls; settings and source/staged hashes remain unchanged.
- remaining uncertainty: Resource loading used an in-memory snapshot of actual settings and throw-on-execution built-in sentinels, not a full CLI session. Actual active tools, model availability, instruction delivery and behaviour remain unobserved. OAuth readiness remains user-reported.
- next: needs follow-up; prepare one bounded Pi planning proposal with a model-selection gate, explicit OpenAI payload consent and retained runtime evidence. Do not run it or widen tooling automatically.

## Host And Configuration

Installed package is 1.1.0; all four sampled source pins match plan 093. No
install, update, downgrade or full CLI startup was performed here. Current
non-secret global settings contain only lastChangelogVersion, theme,
defaultProvider, defaultModel and defaultThinkingLevel. No configured packages,
extensions, skills, prompts or themes; no custom models.json or relevant
PI/provider/proxy/Node override environment variables were found.

Global SYSTEM.md, APPEND_SYSTEM.md, AGENTS.md and CLAUDE.md are absent. The
usual Pi extension/skill/prompt/theme directories are absent. Global
~/.agents/skills exists with one entry; its contents were not loaded into the
returned skill inventory. Native package resolution can enumerate its paths;
no claim is made that disabled discovery prevents all metadata inspection.

The local settings candidate is **openai-codex/gpt-5.5**, thinking medium. This
is configuration evidence only, not resolved model availability or routing
proof. The user's preceding auth diagnostic reports ready/openai-codex/oauth;
it was not independently rerun. No auth file was opened, key/token printed,
credential refreshed, login performed or provider runtime created here.

## Native Loading And Probe Limits

Private disposable staging contains only the nine unchanged skill folders and
their resources, with no symlinks, repo instructions, optional agents, protocol,
oracle, memories or captures. Reports/helper remain outside the staged workspace.

The installed pure parser accepted the candidate profile with no unknown flags
or diagnostics: no session, tools read, no extensions/MCP/default skills,
explicit staged skills, no prompt templates/themes/context files, project trust
false and offline startup. No message or file argument was provided. This is
argument parsing, not active-tool evidence.

Direct loadSkills with includeDefaults false returned the expected nine names
and canonical staged SKILL.md paths, with zero diagnostics. Native
DefaultResourceLoader.reload returned the same nine skills and no extensions,
prompts, themes, AGENTS/CLAUDE context, discovered global system prompt or append
prompt. Extension warnings/errors and skill/prompt/theme diagnostics were empty.

The resource-loader used the actual global settings snapshot through
SettingsManager.inMemory with project trust false. Its four built-in factory
entries matched the reviewed names but were replaced by throw-on-execution
sentinels. None ran. This verifies selection in the bounded native API probe
without executing unrelated factories. It does **not** exercise main.js, the
real factories, CLI migrations/trust flow, model runtime or tool construction.
No settings-path/credential relocation or native system-prompt replacement was
used. Process-only PI_OFFLINE=1 and PI_TELEMETRY=0 were applied to the probe.

## Gate Disposition

| Gate | Result | Limit |
| --- | --- | --- |
| Reviewed package/source/EHS pins | Pass | Sampled pins, not whole-package attestation |
| Symlink-free equal staging | Pass | Disposable skill tree only |
| Nine native-loaded skills and clean diagnostics | Pass | No model adherence proof |
| Candidate argument controls | Pass | No effective CLI tool inventory |
| Bounded resource suppression | Pass | Settings-snapshot/sentinel probe, not full host parity |
| Saved settings and source/staging equality | Pass | Checked files/tree only, not arbitrary host state |
| Provider auth | User-reported ready | No independent refresh/check needed for this diagnostic |
| Concrete model availability/active runtime tools | Not observed | Required before accepting a live result |
| Instruction delivery/planning behaviour | Not observed | Requires separately consented trial |

No new ADR is required: the existing host was observed without changing auth,
architecture, dependencies, public contracts or saved settings. No skill or
adapter changed. Record 092 remains blocked on its historical frozen build;
this is a new diagnostic, not a retry of the old pins or retrospective pass.
Comparison, implementation/consequential acceptance and publication remain open.

## Verification And Private Retention

`node --check /tmp/ehs-094-pi-preflight.mjs` and the single
`bun /tmp/ehs-094-pi-preflight.mjs` invocation exit 0. Runtime assertions check
the catalogue/controls/diagnostics and state equality; they are not a regression
suite or a model trial. No full product suite was rerun for these diagnostics.

Source/staged skill snapshot before/after:
`3dec2859e4bc45808c1d5c3a381789b393f778e947ba95bd9feecf18ef505be1`.
Workspace inventory before/after:
`dfdacf1e98bc1b2ebb3d4c18e0ff6c9988fe97ed39c968f08ebbba757882b640`.
Saved settings before/after:
`10e7bae6c557e57f308dd8861089d80b5224015575d22b05e2931457e3abc8f2`.

Private temporary root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-pi-094-lReH9y`.
preflight.json and retained helper are mode 0600 outside staging. Temporary
files may disappear; review private paths/status before sharing.

- Report SHA-256: `5b3782dfa53398c106062445d9e7f134b7dea430c09af8997d9e5e8742c6e775`.
- Helper SHA-256: `4825709c872f710ef6c88bea3293c7acc2a66818c1a89cfe76030f374fb42fc2`.

The initial configuration/source/directory inventory commands are host-captured
observations summarised here; they are not falsely attributed to the retained
report. No model request, planning prompt, catalog update, credential mutation,
retry, commit or publication occurred during this preflight.
