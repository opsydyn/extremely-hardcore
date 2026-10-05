# Claude standalone planning trial

Date: 2026-09-27. Status: prepared; no model run authorised by preparation.

## Contract

Prepare one Claude Code standalone planning observation equivalent in task
intent to [Codex version 2](076-codex-planning-explicit-inspection.md).
Use the nine installed-method skills, not the optional protocol, classification
adapter or native comparison eval. Do not edit skills, saved host settings,
authentication, adapters, CI or distribution. Do not upgrade Claude, copy
credentials or make provider-comparison claims.

Installed CLI observed locally: `2.1.259`. `--help` advertises restricted mode,
native plugin loading, tool selection, print/stream output and no persistence.
The existing `evaluation/run-claude-adapter.ts` uses no tools and classification
JSON; it cannot establish native EHS loading for this task. Reuse no scorer or
adapter requirement. No ADR is required for preparing an observation of the
existing host; any new isolation/auth mechanism requires renewed review.

## Decision Challenge

Trigger: host-specific instruction/tool provenance and permission assumptions.
Proposal: qualify the requested Claude profile locally before a separately
approved model attempt. Claude owns tool availability, permissions and loading;
EHS owns the engineering method. The value is host-specific acceptance evidence,
not a new framework or a claim of superiority.

Strongest counterargument: local plugin metadata does not establish the complete
model-visible instruction/tool inventory. Restricted mode may still retain
managed configuration or other ambient material. Do not send private unrelated
instructions just to complete this trial.

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Candidate profile exists | Installed CLI help and official reference | Accepted effective profile not captured | Local preflight and retained startup metadata |
| Nine EHS skills load | Existing manifest and source tree | Staged native inventory not checked | Staged validation/details and native loading/read events |
| No unrelated ambient material | Not established | Managed/global discovery and instruction loading | Local source/inventory assessment; stop if unresolved |
| Read-only task can complete | Codex case only | No Claude task outcome | Separately authorised final/usage/tool capture |

Minimum credible slice: first a no-model loading/configuration preflight, then
at most one planning task if its gates and payload consent are satisfied.
Stop on unknown effective controls, missing inventory, unsupported flags,
version/schema drift or authentication change. Do not patch around a failure.

Verdict: **proceed**, for the no-model preflight only. Live execution stays
unapproved until preflight evidence and Anthropic payload consent are reviewed.

## No-Model Preflight

1. Stage a private, symlink-free disposable workspace outside repository ancestry.
   Include only `plugin/.claude-plugin/plugin.json` and `plugin/skills/` copied
   unchanged from EHS. Exclude agents, marketplace metadata, hooks, Bun tooling,
   docs, captures, memories, oracle and unrelated checkout files. Hash source
   and staged skills and require equality. Keep all reports outside the workspace.
2. Refresh CLI version/help. Run staged `plugin validate` and `plugin details`
   diagnostics without `--print`, a task prompt, eval init or a model session.
   Require exactly nine staged skills and no bundled agents/hooks/MCPs. The
   details command measures this plugin, not every ambient instruction source.
3. Review the proposed restricted/settings/MCP controls using local configuration
   evidence without copying private content into the workspace or publishing it.
   Check effective discovery of user/project/managed skills, instructions, hooks,
   plugins, memory, integrations and provider routing. Record sources and limits;
   do not equate empty settings sources with instruction-byte isolation.
4. Preserve host-owned subscription auth. `--bare` explicitly disables OAuth and
   keychain auth in this CLI, so do not substitute it, export tokens or create a
   new API credential. Redact account identity in any authentication report.
5. If the profile cannot establish the required gates without new machinery,
   stop and report the limitation. Local validators are not model acceptance.

Candidate CLI controls to verify, not an execution command:
`--restricted`, `--setting-sources ""`, `--strict-mcp-config` with an empty
MCP inventory, process-only disabled hooks/memory where supported,
`--tools Read,Skill`, `--permission-mode dontAsk`, read permission limited to
the canonical staged skill tree and Skill permission limited to the EHS
namespace. No Bash, Write, Edit, web, application or delegation tools.
Managed controls still apply; accepted flags alone are not enforcement proof.

References: [CLI controls](https://code.claude.com/docs/en/cli-reference),
[permission semantics](https://code.claude.com/docs/en/permissions),
[native skill loading](https://code.claude.com/docs/en/skills).

## Proposed Live Budget And Evidence

Only after separate approval and explicit consent to send the task and staged
EHS content to Anthropic through the signed-in host: one fresh CLI invocation,
one user task, 180 seconds from spawn, requested final under 600 words, no retry
or resume. Proposed model selector: `sonnet`, effort `high`; record the resolved
model/provider, stop on substitution or unavailable routing, no fallback.
Use `--max-turns 8` and `--max-budget-usd 1.00` if accepted by this host. These
allow bounded native skill/read steps; one Claude agentic step is not a Codex
user turn. This is not a token/spend-equivalent provider comparison. Record
reported usage and label cost estimates separately from subscription billing.

Use print mode with verbose stream JSON and no session persistence. Retain exact
argv/input, staged hashes, effective startup inventory, native EHS invocation,
file reads, final result, success/error envelope, turn/step count, usage, elapsed
time and unchanged-tree checks. Observe only authorised `Read`/EHS `Skill` calls;
stop on outside-tree reads or other actions. Detection is not prevention.
Do not inject the skill body as a system prompt or substitute an echo marker.
If native invocation cannot be evidenced, report it unavailable rather than pass.

## Proposed Task Version

Freeze before approved execution. Native entrypoint is requested explicitly by
name; this tests instructed loading, not discovery on natural user phrasing.
Only the path/tool instructions differ from Codex version 2; no expected answer,
numeric witness, ADR conclusion, receipt or scoring rubric is supplied.

```text
Use the extremely-hardcore:using-extremely-hardcore skill to plan this bounded
bug fix. Do not implement it, execute tests, or change files. Keep the response
under 600 words.

This disposable workspace is intentionally not a git repository. There is
no project checkout to inspect; current git status is not applicable. The
function below is the complete implementation context for this task.

You may use Skill only for the staged extremely-hardcore plugin and Read only
for files under plugin/skills/. No shell commands, writes, tests, web or app
calls, external research, subagent delegation or reads outside that tree.

Available skill directories under plugin/skills/ are:
using-extremely-hardcore, change-contract, domain-discovery,
architecture-decision, decision-challenge, bounded-context-review,
simple-made-easy, test-first-implementation, evidence-ledger.
Each contains SKILL.md; referenced resources may be read within that tree.

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

## Assessment And Follow-Up

Use the eight behavioural/evidence criteria from
[plan 072](072-codex-standalone-acceptance-trial.md), with Claude-native input,
tool and completion events replacing Codex event types. Keep the concrete
numeric witness and explicit ADR decision criteria. Mark pass/fail/not observed;
do not use reviewer supplementation to change the agent's response score.
Hash private retained artefacts and redact before sharing. Missing required
evidence, denied tools, timeout or authentication errors are failed/blocked
attempts, not permission to retry or weaken the rubric.

A pass establishes only this constrained Claude planning observation, not
implementation qualification, cross-surface parity, effect or release approval.
No model run, preflight execution or authentication check occurred during plan
preparation; only local version/help and source reads. Next bounded action:
the no-model preflight above. Distribution remains last.
