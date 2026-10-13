# Pi 1.1 No-Model Preflight

Date: 2026-10-10. Offline control review and refreshed proposal after
[version stop 092](../evaluations/092-pi-preflight-version-stop.md).
Plan 091 and its stopped result remain historical, not retroactively updated.

- result: complete
- claim: Installed Pi 1.1.0 source supports a candidate explicit-skills profile, with additional MCP and ambient-prompt gates; refreshed no-model execution is proposed, not performed.
- evidence: CLI parser, main-to-loader wiring, resource/skill loader and built-in extension definitions inspected. Existing source hashes from 092 match. No provider, loader API or agent session was invoked during this review.
- remaining uncertainty: Native staging/loading, effective host resources/tools, model selection and saved-settings equality remain unverified. OAuth readiness is the user's separate observation, not model readiness or payload consent.
- next: needs review; approve the refreshed no-model steps below. No model run, auth refresh, skill edit or commit follows automatically.

## Contract And Challenge

Minimum useful slice: identify the changed native controls and verify nine
explicit EHS skills with no model or extension execution. No new harness,
dependency, auth mechanism, adapter, standing instruction or public contract.
No ADR is required for observing the host without changing its architecture.

Provenance challenge verdict: **proceed**, for this source review and preparation.
Pi owns tool/resource loading and provider routing. EHS owns the engineering
method. The strongest counterargument is that flags and a direct loader probe
may not represent the effective CLI host. Separate parser/source evidence,
native loader metadata and eventual runtime events; do not claim isolation or
adherence from any of the former. Stop if effective resources cannot be reviewed
without executing unrelated code or exposing private material.

| Candidate control | Installed source evidence | Remaining gate |
| --- | --- | --- |
| Explicit skills survive disabled discovery | resource-loader.js selects CLI/additional paths when noSkills is true; skill loader uses explicit paths | Load the staged nine and check exact paths/diagnostics |
| Disable built-in and discovered extensions | noExtensions selects only explicit extension paths; supply none | Native loader inventory must be empty; do not execute factories |
| Disable MCP separately | args.js parses noMcp; main.js maps it to disabledBuiltinExtensions mcp | Verify parser projection and disabled extension inventory; runtime tools still unobserved |
| Context files suppressed | noContextFiles yields empty agentsFiles | Global SYSTEM/APPEND discovery is separate and must be checked |
| No model traffic | No prompt/session during diagnostics; offline startup requested | Offline is not a model-network boundary |

## Material Changes And Limits

Installed built-ins are `llama.cpp`, `codemode`, `tool-search` and `mcp`, as
listed in dist/extensions/index.js. No explicit extension path is proposed.
Installed help in args.js says a tools allowlist retains MCP tools unless an
entry begins with `mcp__`; **`--tools read` alone is not the required profile**.
Use both `--no-extensions` and `--no-mcp`, with read as the only selected tool.
This is source-reviewed configuration, not observed permission enforcement.

Resource reload calls packageManager.resolve before resource filtering. Disabled
extensions are not evidence that configured packages were never resolved.
Inventory configured package/resource sources first; if unrelated packages or
remote sources would resolve, stop for review rather than execute them merely
to obtain a clean inventory. Do not instantiate the full CLI/agent session as
a substitute for a no-model probe.

Global SYSTEM.md and APPEND_SYSTEM.md are discovered independently of
noContextFiles. Project copies require project trust, but global copies do not.
Check their existence without copying contents; stop if present until their
inclusion or suppression is explicitly reviewed. Do not replace the native
system prompt or relocate/copy credentials to manufacture isolation.

## Frozen Candidate

Executable is the same path recorded in 091; require version `1.1.0`.
Sampled installed source pins (not a complete package attestation):

- main.js: `866d65f2d42f74d2bb72ed4a755c8ace1b8a2c497a32cb57cc4db594a4fcb2bf`.
- cli/args.js: `231eca0304b149165a35b12730052586603f23208667e3a57355638017450175`.
- core/skills.js: `0e20ec500ed9783d5b01b5399e6600134fc3fdd10e6dc46c9113bc01565c9aa5`.
- core/resource-loader.js: `0d2ed0d85c39d05d611cd5904c6e696f7e2d16b2316e35d19f9b1f747ee62444`.
- EHS snapshot: `3dec2859e4bc45808c1d5c3a381789b393f778e947ba95bd9feecf18ef505be1`.

Candidate flags to verify locally, **not an execution command**:
`--no-session --tools read --no-extensions --no-mcp --no-skills
--skill <canonical-staged-skills> --no-prompt-templates --no-themes
--no-context-files --no-approve --offline`.
No print prompt, RPC prompt command or model selector is dispatched here.

## Refreshed No-Model Steps

1. Recheck version/source/EHS pins. Inventory relevant non-secret settings,
   package/resource sources, prompt-file existence and environment override names
   before native resource loading. Record paths/counts/status, not private content
   or secret values. Do not open auth files. Unknown or additional influence stops
   the diagnostic; no silent fallback to another profile.
2. Stage only nine skill folders/resources in private symlink-free disposable
   storage outside repository ancestry. Keep reports and evaluator material
   outside the staged workspace. Require source/staged equality before and after.
3. Exercise the installed skill loader and pure argument parser without main,
   an agent/model session, provider runtime, package update or extension factory.
   Verify all nine names, canonical staged paths and zero diagnostics. Verify
   candidate flags retain explicit skills and disable the named resources.
   Any synthetic settings/API probe is labelled as such, not effective CLI proof.
4. Only if reviewed local configuration permits safe resource loading, inspect
   native resource-loader output without model or extension execution. Require
   no extensions, prompt templates, themes or AGENTS/CLAUDE context. Distinguish
   metadata from actual active tools; any missing inventory remains unqualified.
   Do not broaden the probe or add a runtime to close that gap automatically.
5. Preserve the user's provider-ready observation. If necessary, independently
   check only `auth check --provider openai-codex --json --no-refresh`, retaining
   status/provider/authType and no credentials. No login, refresh or key/token
   printing. A denied settings lock stops that diagnostic; normal-host execution
   needs an explicit decision. Model selection remains a separate local gate.
6. Retain private diagnostic commands, redacted outputs, hashes and unchanged
   settings/staging checks. Finish with pass/blocked/not-observed gates. No
   automatic retry, model run, catalog update or retrospective pass of 092.

No-model findings will determine whether a separately scoped live proposal is
appropriate. That proposal still needs a concrete provider/model, fixed task,
budget/actions, retention and fresh payload consent. No CLI turn/spend cap was
established in this review; do not import Claude flags or promise equivalent
provider spend. Comparisons, implementation acceptance and distribution remain
open. No full test suite was rerun for this documentation-only source review.
