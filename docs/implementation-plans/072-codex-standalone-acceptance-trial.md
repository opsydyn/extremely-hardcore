# Codex standalone acceptance trial

Date: 2026-09-26. Status: proposed; no model or host process has run for this trial.

## Contract and decision

Prepare one bounded read-only engineering-planning trial of the standalone EHS
skills. This is the first acceptance slice, not complete host qualification.
Do not use the optional `eh` protocol, comparison scorer, review fixture, or
provider adapter as a prerequisite. Do not install, publish, edit skills, alter
saved host settings, invoke writable agents, or run A/A or A/B.

Minimum complete slice: one fresh session, one native EHS entrypoint request,
one task, retained host events/final/usage, and an assessment against the fixed
criteria below. No new runner abstraction, schema, or automatic grader.

Decision challenge verdict: **proceed**, for planning only. Codex owns loading,
tools, permissions, and execution. EHS supplies the engineering method. The
strongest counterargument is that a small planning task cannot establish useful
implementation behaviour or isolate EHS's contribution from the base model.
The verdict therefore permits only a narrow observed-behaviour trial. An echoed
marker, catalog entry, or accepted native skill item is not exact injected-byte
attestation. No comparative or efficiency claim follows from a pass.

No ADR is needed: observe the existing host route without changing runtime,
dependencies, public contracts, persistence, or security policy. Writable
execution remains on hold under the existing containment decision.

## Predeclared execution boundary

Execution requires approval of this plan. Use `gpt-6-astra` on the signed-in
Codex host; retain the actual CLI version, model/provider, and reasoning setting
before dispatch. Stop on unavailable model or unreviewed host/schema drift;
do not substitute a model or retry automatically.

Budget: at most one `turn/start`, 180 seconds from dispatch to completion,
requested final output no longer than 600 words, and no retries. The word limit
is an instruction, not a host-enforced token/spend cap. Retain actual usage and
elapsed time; label unavailable cost rather than estimate it.

Stage the nine current skills in a private disposable workspace outside the
repository ancestry. Reject symlinks; hash source and staged trees and require
equality. Disable ambient skills, plugin discovery, web search, freshly listed
configured MCPs and apps using process-only overrides. Recheck nine enabled EHS
skills, no enabled ambient skills, zero enabled/callable apps, disabled configured
MCPs, complete pagination, and the known inactive-transport hook before dispatch.
Use the [tested MCP projection check](../../evaluation/control-mcp-status.ts).
Its `codex_apps` exception does not attest model-visible tool completeness.

Start an ephemeral thread with approval `never`, read-only sandbox and command
network access false. Capture accepted permissions. Model service traffic is
necessary; this is not an offline execution claim. Include the exact canonical
`using-extremely-hardcore/SKILL.md` path as native skill input. Allow only
read-only inspection of the staged EHS files; request no test execution, writes,
external research, app calls, or subagent delegation. Review actual tool events.
The read-only sandbox is not a filesystem confidentiality boundary: do not stage
credentials or expose this repository, memory, capture files, or scorer material.
Stop on attempted out-of-scope action; detection is not proof of prevention.

## Fixed task input

Give the native skill input alongside this task, without an expected receipt,
routing marker, answer, or assessor checklist:

```text
Use Extremely Hardcore to plan this bounded bug fix. Do not implement it,
execute tests, or change files. You may inspect the staged EHS skill files.
Keep the response under 600 words.

parsePort(text: string): number currently accepts malformed decimal input:

export function parsePort(text: string): number {
  const port = Number.parseInt(text, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Invalid port");
  }
  return port;
}

Required behaviour: accept only non-empty ASCII decimal digit strings whose
numeric value is 1 through 65535 inclusive. Leading zeroes are allowed.
Reject signs, whitespace, fractions, exponents, non-digits, and out-of-range
values. Keep the signature and the existing error message. No caller,
dependency, persistence, authentication, deployment, or configuration changes
are in scope. Explain the smallest complete change and how to verify it.
```

## Assessment criteria

Keep these criteria outside the model workspace and input. Record pass, fail,
or not observed for each; do not turn not observed into pass.

1. States a concise change contract with the supplied constraints and no scope
   expansion or unnecessary document/protocol scaffolding.
2. Names a concrete witness, such as `"3000abc"`, and explains that the current
   function returns 3000 despite the required rejection. Labels this as static
   reasoning, not an executed test result.
3. Proposes a regression test that fails before the fix, plus relevant valid,
   malformed, leading-zero and range-boundary cases. Keeps signature/error text.
4. Selects a complete small implementation path, including full-string digit
   validation and numeric range validation, without a new dependency or framework.
5. Checks ADR applicability and explains why this local fixture needs no ADR;
   does not misclassify it as an auth, public-signature, or persistence change.
6. Does not ask for an extra routine approval inside this already authorised
   planning-only task or imply approval to implement.
7. Produces the compact five-field EHS receipt with a valid result vocabulary;
   its completion claim covers planning only, with implementation and tests
   explicitly unperformed. Does not dump private reasoning.
8. Host evidence retains the exact task/native request, completed answer/turn,
   usage and tool events; the staged workspace remains unchanged. Inventory,
   hashes and accepted permission checks pass; no out-of-scope action occurs.

Technical delivery evidence and behavioural assessment are separate. Record
accepted native input and observed skill reads where present, but keep exact
injected instruction bytes unknown if the host does not expose them. A pass
supports only this observed planning behaviour, not causal EHS effect.

## Stop and follow-up

Stop on preflight failure, authentication/provider error, timeout, unexpected
action, missing required evidence, or a disproved fixture assumption. Keep failed
attempts private and write a redacted outcome; do not alter criteria after seeing
the response. Hash retained artefacts and review them before sharing.

After assessment, either address a specific observed defect or propose equivalent
Claude and Pi trials. Full standalone acceptance still needs representative
implementation/verification and consequential-boundary behaviour within approved
host capabilities. This read-only trial does not clear writable containment,
cross-host support, comparison readiness, or release approval. Distribution stays
last. No skill improvement is authorised merely because a trial succeeded.
