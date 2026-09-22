# Controlled comparison: isolation and scoring readiness

Date: 2026-09-22. No model turn or provider comparison was run for this review.
The previous [single skill turn](064-codex-explicit-skill-turn.md) is a loading
probe, not a baseline.

## Contract and architecture

Assess whether this signed-in Codex host can provide a clean control and EHS
treatment without modifying saved user settings, and choose a primary outcome
that would measure the installed engineering method rather than the evaluator's
plumbing. Scope: official host guidance, current adapter/scorer inspection, and
no-model capability checks. No provider batch, writable-agent execution,
threshold change, new adapter, or installed-skill change. The accepted
provider-neutral attempt contract in ADR 0006 remains unchanged. A later
adapter or provenance contract change needs its own architecture review.

Minimum complete result: a host-tested skill inventory boundary, a predeclared
outcome boundary, explicit residual risks, and a usable go/no-go decision for
the next experiment. Stop if the host cannot isolate treatment or if no
independent outcome exists.

## Decision challenge trigger

Proposal under review: treat the current 13-scenario Codex classifier as a
credible baseline-versus-EHS comparison now that explicit skill invocation
works. This would make a provider-comparison and possibly product-effect claim.

## Existing-platform ownership and durable value

Codex owns authentication, instruction loading, process configuration, tools,
hooks, and event emission. EHS owns its pinned skill material and task-specific
engineering criteria. The evaluation layer owns task assignment, independent
outcomes, trace retention, and interpretation. EHS skills remain standalone.

## Strongest counterargument

The current pressure corpus asks an agent to select violation codes. Even a
perfectly isolated increase in those scores would establish classification
accuracy for those prompts, not better code changes, fewer regressions, useful
receipts, or less needless ceremony. The last answer also came from a host with
17 ambient skills, a hook, and MCP startup activity; its 22,835 input tokens
cannot be assigned to EHS.

## Claim-to-evidence map

| Claim | Observed evidence | Remaining gap |
| --- | --- | --- |
| Fresh home isolates user context | A new `CODEX_HOME` with either existing or temporary `HOME` returned `Not logged in` from `codex login status` | Signed-in model runs cannot simply move to that home without a separate login decision |
| Process-only skill disable works | In a disposable unauthenticated home, `-c skills.config=[{path=".../SKILL.md",enabled=false}]` changed a bundled skill from enabled to disabled; folder-path override did not | This is version-specific behavior, not a cross-host guarantee |
| Signed-in control and treatment inventories can differ only by EHS skills | A no-model signed-in app-server `skills/list` with a process-only override marked all 17 ambient skills disabled in both workspaces; control had zero enabled skills and treatment had the nine staged EHS skills enabled; both had zero discovery errors | Enabled catalog inventory is not proof that no other instructions, hooks, apps, or tools influence turns |
| Existing classifier is independent evidence of engineering effect | `assessAgentAttempt` now rejects missing and surplus labels against 13 manifest answers | It scores response labels, not independent task outcomes or coding behavior |
| Current traces support a comparison | The single turn retained native skill input, final answer, events, and usage | The host did not expose exact injected skill bytes; no model control, repeated run, matched hook/tool inventory, or predeclared task oracle exists |

The signed-in inventory was run with `codex-cli 0.154.0` and a temporary
command-line `-c` override. It did not call `skills/config/write` or change
`~/.codex/config.toml`. The override listed each ambient skill's discovered
absolute `SKILL.md` path. Results are retained locally in
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-loading-kJKTNn/signed-in-inventory.json`
(SHA-256 `5691615473e92a664997fd3f7a982fc93b11b068c87fb761b3cd5a8efd92a9fb`).
The temporary directory may be removed by the host. No model turn was started
for this follow-up.

The [official configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
describes per-skill enablement; the installed host was tested because the
documented folder-path type did not disable a skill in this version. The
[app-server documentation](https://learn.chatgpt.com/docs/app-server) describes
native skill input and skills inventory. Do not rely on documentation alone
where the local schema or behavior differs.

## Minimum credible next slice

Prepare a **read-only engineering review fixture**, not another label task:

1. Freeze a small code diff containing a known regression and plausible
   distractors. Keep the intended finding and disallowed false positives in an
   independent oracle unavailable to either model arm. Require the same
   structured finding fields for both arms: affected location, concrete failure,
   supporting evidence, and remaining uncertainty. The scorer checks the
   finding against the fixture, not the agent's confidence or its EHS receipt.
   Missing required findings and unsupported extra findings both fail; do not
   reward a list of every plausible defect.
2. Add a no-model preflight that fails closed unless both arms use the same
   pinned task input, model, permissions, tools, hook/MCP inventory, output
   schema, and trace retention. Only the nominated EHS skill snapshot and its
   explicit native invocation may differ. Check `skills/list` on fresh
   workspaces: zero enabled skills in control, nine pinned EHS skills in
   treatment, no duplicate names. Capture snapshot and invocation digests.
3. Predeclare repetitions, budget, success criteria, stopping rule, and how to
   handle missing usage or an unverified host input. Run same-arm A/A before
   baseline-versus-EHS, with fresh ephemeral sessions and interleaved order.
   Keep unsuccessful attempts. If prompt text differs to invoke EHS, report the
   result as the effect of **explicit EHS use**, not a pure skill-text effect.

This first slice can only support a bounded review-quality and comparison-
plumbing claim. It cannot establish implementation quality or productivity.
Whole-task coding comparisons remain gated by accepted writable containment
and independent tests on disposable workspaces. Do not adapt the oracle to
observed answers, call the 13 label cases engineering outcomes, or infer a
threshold from one trial.

## Stop conditions and verdict

Stop before comparative provider runs if ambient skills remain enabled, an
instruction source or hook/tool set differs across arms, build paths or hashes
drift, raw trace or usage is missing without an explicit exception, or an
independent review fixture and oracle are not frozen. An echoed skill marker,
successful `skills/list`, or one skill-shaped answer cannot clear these gates.

**Verdict: hold** on running or claiming a controlled EHS comparison now. The
no-model catalog isolation mechanism is demonstrated, but outcome validity and
whole-host parity are not. The next authorised work is fixture and preflight
design/implementation without provider calls.

- result: complete
- claim: Process-only catalog isolation is available on this host; comparison readiness is not established.
- evidence: Two no-model skill-disable probes, signed-in 0-versus-9 inventory, adapter/scorer inspection.
- remaining uncertainty: Hook/tool parity, exact instruction delivery, independent review oracle, and coding-task containment.
- next: Freeze one read-only review fixture and its independent scorer, then preflight both arms before any A/A model run.

Recommendation: hold.
