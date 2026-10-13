# Pi Standalone Acceptance Preflight

Date: 2026-10-05. Prepared after reviewed work was committed as `0b6c255`.
No Pi model request, auth check or credential refresh occurred during preparation.

- result: complete
- claim: A no-model Pi preflight is proposed for the current standalone skill build; live planning acceptance remains separate.
- evidence: Installed Pi 0.84.1 version/help and loader source inspected. Explicit skill paths survive disabled discovery in this build's resource loader. The reviewed commit left a clean checkout before this plan was added.
- remaining uncertainty: Current provider readiness, effective resource/tool inventory, instruction delivery and planning adherence remain unverified. CLI help attempted a global settings lock which the sandbox denied.
- next: needs review; approve the bounded no-model preflight below. Do not dispatch a planning prompt or refresh credentials as part of it.

## Scope And Challenge

Use standalone EHS, not the optional classification adapter, protocol or comparison
harness. The existing Pi adapter disables skills and tools and therefore cannot
qualify native engineering-method loading. Do not modify skills, adapters, saved
settings, dependencies, auth mechanisms or distribution. No ADR is required for
observing the existing host route without changing architecture or boundaries.

Provenance challenge verdict: **proceed**, for offline preparation and separately
approved no-model diagnostics only. Pi owns discovery, native loading, permissions
and provider traffic. EHS owns the method. Strongest objection: accepting an
explicit-path inventory could conceal ambient host instructions, settings or
extensions. Require inventories and label their limits; do not treat loader
metadata as byte attestation, prevention, adherence or comparative effectiveness.
Stop on unresolved effective resources rather than adding another runner.

## Observed Local Host

Executable:
`/Users/alancurrie/.local/share/fnm/node-versions/v24.15.0/installation/bin/pi`.
It links to the installed `@earendil-works/pi-coding-agent/dist/cli.js`.
Version: `0.84.1`. `pi --offline --help` exited 0, but stderr reported EPERM
attempting `~/.pi/agent/settings.json.lock`. No successful settings mutation was
observed; saved-settings equality was not checked during preparation. Do not
retry outside the sandbox silently or interpret that warning as failed auth.

Help advertises explicit skills, disabled resource/context discovery, selected
tools, ephemeral sessions and JSON/RPC modes. `--offline` controls startup
network operations, not model-service traffic. No CLI turn/spend cap was found
in this help output; do not assume Claude's budget flags apply to Pi.

Source inspection of `dist/core/resource-loader.js` shows noSkills retains
explicit CLI/additional skill paths and uses loadSkills with includeDefaults
false. Source inspection of `dist/core/skills.js` shows a directory loader with
diagnostics. That loader can follow symlinks: EHS staging must reject them first.
These observations require an actual no-model loading check before dispatch.

Installed source SHA-256 pins:

- skills.js: `dce4478a3f0d7aaf02fc90fa5013ca671f4fe44c9be3e1753fa64fbf9ab7afcc`.
- resource-loader.js: `dfd66250341b8cfb1a9c90ffcd73434806fb14476c824d34d94b4bed40a90ee1`.
- EHS skill snapshot: `3dec2859e4bc45808c1d5c3a381789b393f778e947ba95bd9feecf18ef505be1`.

## Proposed No-Model Steps

1. Stage exactly nine skill folders and their resources in a private symlink-free
   disposable workspace outside repository ancestry. Keep reports outside it;
   exclude repo instructions, agents, protocol, oracle, captures and memories.
   Require source/staged hashes to match and remain unchanged.
2. Recheck executable/version/source pins. Use installed native skill/resource
   loading APIs without creating an agent/model session, executing extensions or
   discovering unrelated resources. Require all nine names, canonical staged
   paths and zero diagnostics. Label this as native loader metadata only.
3. Review the effective candidate CLI profile: no session, only read tool, no
   extensions, no default skills, explicit staged skills, no prompt templates,
   themes or context files, no project approval and offline startup. Verify
   explicit staged resources remain usable under those controls. Report any
   global settings, packages, system-prompt or environment influence without
   copying private content. Stop if resource suppression cannot be demonstrated.
4. Select a concrete provider/model candidate from current local evidence;
   historical `openai-codex/gpt-5.3-codex-spark` is not current routing proof.
   Inspect auth-check command semantics before invoking a diagnostic. Only
   `auth check --json --no-refresh` is eligible; never print keys/bearer tokens,
   open auth files, refresh, log in or substitute credentials. Retain only
   readiness/provider/model/status fields, not account identity or secrets.
   A denied settings lock requires an explicit normal-host diagnostic decision.
5. Preserve host settings and source/staged equality. Retain redacted diagnostics
   and exact invocation/hashes privately. Record pass/blocked/not-observed gates;
   a completed preflight is not a successful model trial.

No print prompt, RPC prompt command, smoke marker, model session, provider eval,
catalogue update, extension install or automatic retry is authorised by these
steps. Discovery/configuration drift and missing metadata stop the preflight.

Only after reviewed preflight propose a single planning observation with a fixed
task, provider destination, build, deadline, action limits and fresh payload
consent. Reuse the original eight planning criteria, retaining historical scores.
Do not invent host-enforced turn/spend controls or relax unknown isolation gates.
Pi behaviour, implementation/consequential acceptance and release remain open.
