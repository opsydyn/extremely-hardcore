# Claude Planning Fresh Attempt

Date: 2026-10-05. Prepared after approved offline
[startup regression 085](../evaluations/085-claude-startup-catalogue-regression.md).
Preparation does not authorise a model request.

- result: needs-human-decision
- claim: A fresh single-attempt controller is prepared using the corrected pinned startup predicate and unchanged task/criteria. Scoped Anthropic consent remains required.
- evidence: CLI still reports `2.1.289`; controller syntax check passes; startup/tool guards pass 21 tests with 96 assertions; no trial controller execution occurred during preparation.
- remaining uncertainty: Fresh auth/config/model availability, runtime tool actions, completion and usage remain unobserved for this attempt. Native catalogue metadata is not instruction attestation or enforcement.
- next: needs review; consent to the concrete payload and limits below, then refresh preflight and dispatch at most once. Preserve trial 084 as blocked.

## Scope And Decision

Reuse [plan 080](080-claude-standalone-planning-trial.md)'s exact text task and
all eight criteria from [plan 072](072-codex-standalone-acceptance-trial.md).
Reuse its private staging, host-owned subscription auth, Read/EHS Skill-only
actions, no persistence, no Chrome, process-only settings, strict empty MCP,
retention and stopping requirements. No skill, adapter, auth mechanism,
public contract, distribution or comparison change is proposed; no new ADR
is required.

Decision challenge verdict: **proceed**, for preparation only. Claude owns
native enforcement and host context; the controller recognises exactly the
catalogue reviewed in 085. Strongest counterargument: those known built-ins can
still affect instructions, so this is a normal-host observation, not isolated
EHS treatment or a comparison. Extra/changed catalogue entries still stop it.
No private unrelated material may be staged or read merely to obtain a pass.

## Frozen Attempt

- Destination: Anthropic through the existing signed-in Claude host.
- Payload: plan 080's parsePort planning task, nine unchanged EHS skills and
  referenced resources read within their tree, plus normal Claude system context
  and the observed built-in catalogue. No credentials, memories, capture records,
  oracle or unrelated repository files are staged for the model.
- CLI: `2.1.289`; requested model: `claude-sonnet-5-5`, effort `high`. This pins
  the exact model reported by trial 084 instead of the moving `sonnet` alias.
- Budget: one fresh process/task, 180 seconds from spawn, at most eight agentic
  turns, requested final under 600 words, requested USD 1.00 API-cost cap. This
  is not proof of subscription billing or equivalent provider spend.
- No retries, resume, fallback, tests, implementation, writes, web/app calls,
  delegation, non-EHS Skill calls or reads outside the staged skill tree.
- Startup must satisfy `acceptsClaudeStartupInventory`; retain the existing
  tested tool guard. Missing/incomplete native evidence remains blocked.
- Fresh preflight must pass version, redacted auth, configuration/policy,
  source/staged/manifest hashes and plugin checks before dispatch. Stop on drift.
  Detection cannot retract an already transmitted request or prove prevention.

Task SHA-256:
`0f489447e4de5cb3c2117fde1cc2f7a62e9e3bd3cb6ffadb5461a052bbf9d7ae`.
Skill snapshot:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Startup predicate:
`72a89c97430dc05e2eb6b321d4ca95f5d754549ea3dc3e93296335d2152d5557`.
Tool predicate:
`baf16a5b78bf40b7b443a9e7db2be5f9e879ab5b03430e9ba465dd7747e51396`.

## Prepared Controller And Evidence

Temporary controller: `/tmp/ehs-086-trial.mjs`, copied from the retained approach
without modifying historical files. It imports the corrected predicate, pins
the model, checks predicate/task hashes, and retains exact input/invocation,
startup/actions/result/usage and unchanged-state checks outside the workspace.
It must not be executed without scoped consent. Temporary helpers may disappear.

Controller SHA-256:
`4593ee8025b2b4903fdc73bfceed9c7d927af5c5c8a023aad01ec2654444bd80`.
`node --check /tmp/ehs-086-trial.mjs` passes without executing it.
`bun test tests/evaluation/claude-startup.test.ts /tmp/ehs-084-audit.test.ts`
passes 21 tests with 96 assertions. These validate the guards, not the complete
live controller. The full suite was not rerun for this preparation; record 085
retains its 199-test result. No model ran during this preparation.
