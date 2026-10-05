# Claude Runtime Gate Review

Date: 2026-10-05. No-model follow-up to
[authentication refresh 082](082-claude-auth-refresh.md).

- result: needs-human-decision
- claim: The current Claude CLI supports a candidate bounded planning observation. Its version-specific profile and Anthropic payload require explicit review; no model ran.
- evidence: CLI `2.1.289`; native manifest validation, nine-skill details, session inventory and normal-host auth pass; doctor reports remote policy ineligible for this subscription; inspected endpoint-managed paths are absent; source/staged hashes match; proposed budget/tool flags parse in a no-model diagnostic.
- remaining uncertainty: Metadata and flag parsing do not attest the exact model-visible instruction/tool set, read-rule enforcement, skill invocation or adherence. Host-owned system context remains outside EHS's control.
- next: needs review; obtain consent to the version-refreshed, host-specific observation below, with those limits explicit. Do not claim isolated comparison or clear release acceptance from metadata.

## Trigger And Proposal

Review host-version, provenance and permission assumptions under
[plan 080](../implementation-plans/080-claude-standalone-planning-trial.md).
The installed CLI changed from `2.1.259` to `2.1.289`; the frozen live proposal
therefore stopped. This record proposes a refreshed candidate, not silent
execution under the old version. No upgrade was performed by the controller.

Claude owns authentication, default instructions, tool availability, permission
enforcement and managed policy. EHS owns the unchanged engineering method.
The value sought is one observable native planning case, not a runtime, byte-level
isolation claim or provider comparison. No EHS architecture, public contract,
auth mechanism or isolation implementation changes; no new ADR is required.

Strongest counterargument: native diagnostics cannot prove every instruction
byte or effective tool before a model session. Treating a local inventory as
full isolation would weaken the evaluation. User consent must explicitly cover
normal host-owned system context; it must not authorise unrelated private files.

## Claim-To-Evidence Map

| Claim | Observed evidence | Remaining requirement |
| --- | --- | --- |
| Auth route preserved | Profile auth exits 0, `claude.ai`, first-party | Recheck immediately before any dispatch |
| Staged EHS identified | Manifest valid; nine skills; only inline EHS in session inventory | Native invocation/read events during an authorised trial |
| Known managed sources assessed | Five inspected macOS policy paths absent; doctor reports remote settings not fetched because Enterprise/Team subscription is required | This is a host diagnostic, not full OS/runtime attestation |
| Known ambient sources assessed | User instructions/rules/skills/commands/agents/local settings/plugin index absent; unchanged user settings have one hook event, no enabled plugins/env/API helper; listed provider/config override env vars unset | Capture startup inventory; stop on unexpected exposure |
| Candidate arguments accepted | No-model plugin list accepts model/effort, turn/spend, persistence/output and scoped permission flags | Print-mode behaviour, resolved model and limits remain to be observed |
| Read-only planning completes | Not observed | Authorised final, trace, usage and unchanged-tree checks |

The CLI still advertises restricted mode, strict MCP configuration, explicit
tool selection and process-only settings. Managed policy takes precedence;
absence of ordinary settings does not establish instruction isolation.
Official references: [CLI controls](https://code.claude.com/docs/en/cli-reference),
[managed settings](https://code.claude.com/docs/en/managed-settings),
[remote-policy diagnostics](https://code.claude.com/docs/en/server-managed-settings).

## Minimum Credible Slice And Stop Conditions

Proposed after consent: use plan 080's exact planning prompt and unchanged nine
skills on `2.1.289`, through existing subscription auth. One fresh print-mode
invocation, `sonnet`, effort `high`, 180 seconds, at most eight agentic turns,
requested final under 600 words, requested API cost cap USD 1.00. No retry,
resume, fallback, comparison, tests, implementation or outside-tree reads.
The spend cap is a requested API-cost control, not subscription billing proof.

Retain plan 080's controls, add explicit `--no-chrome`, allow only
`Read(./plugin/skills/**)` and `Skill(extremely-hardcore:*)`, and retain raw
input/startup/tool/final/usage records privately outside the workspace. Keep
the original eight assessment criteria unchanged. Do not supply the oracle.
No credentials, memories, private captures or unrelated source are staged.
Default Claude system context and ordinary host metadata may accompany the
request; exact bytes cannot be promised by this no-model review.

Place variadic `--allowedTools` arguments before a subsequent named flag,
not directly before a subcommand. An initial diagnostic exited 1 with
`unknown option '--json'` because the variadic arguments consumed `plugin list`.
Correct ordering exits 0 and lists only EHS. Neither diagnostic invoked a model.
Accepted parsing does not exercise print-only semantics or permission enforcement.

Stop on fresh version/auth/config drift, unexpected startup plugins/tools/hooks,
outside-tree reads, non-EHS skill calls, missing required native evidence,
timeout, denied tools, model substitution or provider error. Detection is not
prevention, and stopping cannot retract a request already sent. If startup
evidence is insufficient, retain a blocked attempt rather than claim isolation.
Comparisons retain their stronger provenance gates and remain on hold.

## Verdict

**needs-human-decision**. The local managed-policy gap is narrowed by doctor,
not erased by assumptions. Consent is needed for this bounded normal-host
observation with explicit residual runtime uncertainty. Without that consent,
plan 080's live stop remains in force. Distribution and writable work remain out
of scope; do not add infrastructure merely to manufacture an acceptance pass.

## Retained Evidence

Fresh private root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-claude-083-tsANwV`.
Mode-0600 `preflight.json` SHA-256:
`07282a3ec050367c10237a76ff5f196be629f09d696849c2fbe83b17a7e9a73d`.
Skill snapshot:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Source/staged skills are unchanged and manifests match. Local source/env checks
and argument-order diagnostics are controller-captured results summarised here,
not included in that report. Earlier temporary helpers were no longer present;
a new disposable no-model helper was used without overwriting prior evidence.

The same skill bytes now receive an estimated 509 always-on tokens, versus
376 under the older CLI. Do not attribute this diagnostic difference to an EHS
change, measured consumption, quality or efficiency. All model evidence remains
unobserved; the full product suite was not rerun for this documentation review.
