# Claude Completion Routing Check

Date: 2026-10-05. Offline preparation after the approved two substitutions from
[review 088](../evaluations/088-completion-routing-review.md).
Preparation is not payload consent or model execution.

- result: needs-human-decision
- claim: One bounded read-only observation is prepared for the clarified skill build; fresh scoped Anthropic consent is required before launch.
- evidence: CLI remains 2.1.289; controller syntax check passes; unchanged startup/tool guards pass 21 tests with 96 assertions; current skill snapshot is pinned below. The preceding edit passed 201 local tests and scaffold validation.
- remaining uncertainty: Fresh authentication/configuration, effective runtime inventory, turn headroom and adherence remain unobserved. Static guards are not instruction attestation or preventive isolation.
- next: needs review; obtain scoped payload consent, refresh preflight and dispatch at most once. Do not retry or commit automatically.

## Contract And Challenge

Reuse [plan 080](080-claude-standalone-planning-trial.md)'s exact parsePort prompt,
private staging, read-only controls and all eight criteria from
[plan 072](072-codex-standalone-acceptance-trial.md). Do not add a receipt hint,
expected answer, ADR boilerplate or scoring rubric to the prompt. This explicitly
requested native loading check is not natural-discovery acceptance.

The only treatment change is the two approved sentences. Preserve trial 087's
6/8 and every earlier result. This repeated development case can observe whether
the new response supplies a planning-scoped receipt; it cannot establish causal
improvement, efficiency, provider superiority or release readiness.

Reuse 080/086's boundary challenge: **proceed**, for preparation only. Claude
owns enforcement and ambient instructions; EHS owns the method. Strongest
counterargument: one repeated case under the normal host may pass by variation
or fail through budget pressure. The minimum useful slice is one observation,
not a retry loop or new harness. Existing provenance/isolation limitations remain.
No new ADR is required: no architecture, auth mechanism, public contract or
boundary change is proposed. Stop on drift rather than relaxing the guards.

## Frozen Payload And Limits

- Destination: Anthropic through the existing signed-in Claude host.
- Payload: unchanged plan 080 prompt; nine current EHS skills and any referenced
  resources read within their staged tree; normal Claude system context and the
  built-in catalogue reviewed in 085. No credentials, unrelated repository files,
  memories, captures, previous answers or evaluator oracle are staged.
- CLI 2.1.289; model `claude-sonnet-5-5`; effort high.
- One fresh process, 180 seconds from spawn, at most eight agentic turns,
  requested final under 600 words, requested USD 1.00 API-cost cap. This cap does
  not establish subscription billing. No retries, resume or fallback.
- Only Read within the staged skill tree and native EHS Skill calls. No tests,
  implementation, writes, shell, web/app tools, delegation or non-EHS Skill calls.
- Retain the 086 startup/tool guards, restricted/settings controls, empty strict
  MCP, disabled hooks/memory, no Chrome and no session persistence. Refresh
  redacted auth, source/staged/manifest equality and configuration/policy checks
  before launch. Do not run the old controller against the new build.

Trial 087 reported seven turns under eight, without a budget error. That leaves
nominal headroom, not a guarantee that another Skill call fits. Keep the cap
unchanged; record a capped/incomplete response as budget-limited and inconclusive
about wording effectiveness. Do not silently increase it or make another attempt.

## Frozen Material And Assessment

Task SHA-256:
`0f489447e4de5cb3c2117fde1cc2f7a62e9e3bd3cb6ffadb5461a052bbf9d7ae`.
Current skill snapshot:
`3dec2859e4bc45808c1d5c3a381789b393f778e947ba95bd9feecf18ef505be1`.
Startup predicate:
`72a89c97430dc05e2eb6b321d4ca95f5d754549ea3dc3e93296335d2152d5557`.
Tool predicate:
`baf16a5b78bf40b7b443a9e7db2be5f9e879ab5b03430e9ba465dd7747e51396`.
Prepared controller `/tmp/ehs-089-trial.mjs`:
`16f646080b132847eda44a942be94a44ef750baaf0c1dcfeabe3cab32d318a78`.

The copied controller changes only the attempt identifier, consent reference and
skill-build pin. Syntax and guard tests do not execute or fully test its live
path. Temporary helpers may disappear; stop if unavailable or changed.

Retain exact prompt/argv, private native trace, final, usage, elapsed time,
source/staged/workspace/settings checks and artefact hashes outside model-readable
staging. Check successful native invocation and skill-body delivery events rather
than echoed markers. Review the actual five-field receipt, result vocabulary,
scope and evidence honesty; do not require a particular ledger tool-call count.
Score all eight original criteria unchanged, including the explicit no-ADR
criterion; record the word limit and explanation accuracy separately. Reviewer
supplementation cannot repair the agent's score. Missing native evidence,
permissions, timeout or changed state stops the attempt without a retry.

No model or authentication check was run during this preparation. No saved host
settings, repository skills, adapters or historical records were changed here.
Distribution and the wider acceptance gates remain open.
