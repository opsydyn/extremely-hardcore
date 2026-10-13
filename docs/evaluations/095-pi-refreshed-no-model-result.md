# Pi Refreshed No-Model Result

Date: 2026-10-12. Authorised refresh of [diagnostic 094](094-pi-no-model-loading-result.md)
under the existing [control review 093](../implementation-plans/093-pi-1-1-no-model-preflight.md).
Earlier results remain historical.

- result: complete
- claim: The current nine EHS skills load cleanly in the bounded Pi 1.1.0 native loader probe; no-refresh OAuth readiness is independently observed.
- evidence: Direct and resource loaders return exactly nine canonical staged skill paths, no diagnostics or extension factory calls; parser assertions pass; source/staging and saved-settings equality pass. Both provider-only and explicit-model auth status checks return ready/openai-codex/oauth, exit 0.
- remaining uncertainty: This is a settings-snapshot/sentinel probe, not the full bundled CLI, active-tool inventory or a model session. Local model resolution is not provider-side availability, exact instruction delivery or behavioural acceptance.
- next: needs follow-up; review [proposal 096](../implementation-plans/096-pi-standalone-planning-trial.md), including its native retry and filesystem limits, before giving fresh payload consent.

## Contract And Host Review

Minimum complete refresh: inspect current version, sampled source, non-secret
configuration and ambient source existence; stage current skills; reuse the
approved native loader probe; retain a separate result. No skill, adapter,
dependency, authentication mechanism or saved configuration changed. No new ADR
is needed for observing the existing host without changing its boundaries.

Pi still reports `1.1.0`. The four source pins in plan 093 match. Additional
reviewed samples:

| File under installed dist/ | SHA-256 |
| --- | --- |
| core/settings-manager.js | `7ded026cd47cbc9890e9e4e7076d2ee3182bfd43a8d9e9a567913af92581ff26` |
| extensions/index.js | `ed7f805d46160c30db9be874b2350d0bd01f8b390f94a55ec1d8d4ed9474bf9b` |
| modes/print-mode.js | `f2eb170b9620c1d37e68b788ff71257a4402a23e7f3999575feee8e5d9e13b3f` |
| bundle/cli.js | `e79626f2dd6f94aa45d30f3fa63cd84319a6eefcd150b353cfaf274366926774` |
| bundle/cli-runtime.js | `c30fd8f7f1a50fdf4860b87613fc6e906d04cc1d4646360826e001abbd1f2152` |

Executable: `/Users/alancurrie/.local/share/fnm/node-versions/v24.15.0/installation/bin/pi`.
It resolves to installed `dist/bundle/cli.js`, which loads `cli-runtime.js`.
Bundle hashes freeze the candidate; reading the separate dist modules does not
prove bundle equivalence or effective CLI behaviour.

Global settings still have only lastChangelogVersion, theme, defaultProvider,
defaultModel and defaultThinkingLevel. Candidate: `openai-codex/gpt-5.5`, medium.
No configured package/resource source, global SYSTEM/APPEND/AGENTS/CLAUDE file,
models.json, Pi extension/skill/prompt/theme directory or checked PI/provider/
proxy/Node override is present. Global ~/.agents/skills has one entry; disabled
discovery is not a guarantee of zero metadata enumeration.

## Observations And Limits

The unchanged diagnostic method loads current skills through installed
loadSkills and DefaultResourceLoader, using actual settings via
SettingsManager.inMemory and four throw-on-execution built-in sentinels. Exactly
nine skills, zero diagnostics, extensions, factory calls, prompts, themes or
context files. No global system/append prompt was returned.

Pure parseArgs accepts the existing controls and the proposed JSON/print,
explicit provider/model/medium additions, with no task dispatched. Parsed tool
selection is read only; actual active tools and filesystem restrictions are
not established. No full CLI agent startup, provider inference or model task ran.

Host-captured commands, separate from the retained loader report:

```text
pi --version
pi auth check --provider openai-codex --json --no-refresh
pi auth check --provider openai-codex --model gpt-5.5 --json --no-refresh
```

The exact executable above was used. Both auth checks return
`{"status":"ready","provider":"openai-codex","authType":"oauth"}`.
The explicit-model check additionally exercises local model resolution; neither
contacts the inference service to prove availability. The native auth command
reads its credential store internally; no auth file was directly inspected,
credential printed/copied, login performed or refresh requested.

Installed source enables agent retries by default. RPC set_auto_retry delegates
to SettingsManager.setRetryEnabled, which saves global settings. No retry toggle
was sent. Proposal 096 must not promise a process-only no-retry switch or a
native turn/spend cap that this review did not establish.

## Verification And Retention

`node --check /tmp/ehs-095-pi-preflight.mjs` and the single
`bun /tmp/ehs-095-pi-preflight.mjs` invocation exit 0. Runtime assertions protect
pins, exact catalogue/paths, controls, resource suppression and state equality;
this throwaway diagnostic does not add product code or a regression suite.

EHS HEAD: `13422f8067438ca800bd51f5854c5abf4e4d6e25`.
Source/staged skill snapshot before/after:
`ebb0960549c7976b3f062eaad3d8f86f9ecf5182ab3f5777fc37ba549fdeb197`.
Workspace inventory before/after:
`4a7e4d096e61a621fa9272b2a8d66a674f69a26d73041f1a087f6265c2af11b5`.
Saved settings before/after probe and after both no-refresh auth checks:
`10e7bae6c557e57f308dd8861089d80b5224015575d22b05e2931457e3abc8f2`.

Private temporary root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-pi-095-15f6rV`.
Root/workspace mode 0700; retained preflight.json and preflight.mjs mode 0600,
outside the symlink-free staged skill workspace. Temporary retention may expire.

- Report SHA-256: `5d7cf39fbcb4254d37e22ff1636797de527f9eafb1eb96c51b7d3bc8e3b538d7`.
- Helper SHA-256: `f420efd0a881f261c20f258c2c18697848c5c2e4646fe85133834ad41e611276`.

Version/configuration/bundle/auth observations are separate host captures, not
falsely attributed to the loader report, which says authCheckPerformed false.
No model, retry of a failed trial, commit, installation or publication occurred.
Implementation, consequential-boundary and release acceptance remain open.

Documentation checks: `bun run validate`, `git diff --check` and local
link/whitespace checks for records 095/096 pass. No full product test suite was
rerun for this diagnostic/documentation-only change.
