# Claude No-Model Preflight

Date: 2026-09-30. Approved local preflight for
[the Claude planning proposal](../implementation-plans/080-claude-standalone-planning-trial.md).

- result: complete
- claim: The skills-only staging and native plugin metadata checks passed. Model dispatch remains held: this host reports no signed-in Claude account.
- evidence: Nine unchanged staged skills; native manifest validation exits 0; plugin details and session inventory expose only the intended plugin; redacted auth checks inside and outside the sandbox exit 1 with `loggedIn: false`; `bun run validate` passes.
- remaining uncertainty: No model startup, skill invocation, effective runtime tool/instruction inventory, managed-policy enforcement or behavioural adherence was observed. Native validation did not check skill contents.
- next: needs follow-up; restore Claude sign-in through the normal host, refresh the auth/config checks, then review runtime gates and obtain separate Anthropic payload consent before one bounded model trial.

## Scope And Staging

Claude executable: `/Users/alancurrie/.local/bin/claude`, reporting
`2.1.259 (Claude Code)`. No model, print/task, login, install, update or eval
command was invoked. No credentials were copied, saved settings changed, or
source skills edited. No new architecture or ADR is needed for observing the
already proposed host configuration.

A private disposable workspace outside repository ancestry contains only
`plugin/.claude-plugin/plugin.json` and `plugin/skills/`. The snapshot helper
rejects symlinks and requires all nine skill directories. Optional agents,
hooks, runtime code, repository instructions, private captures and memories
were not staged. Reports remain outside the model-readable workspace.

Source and staged skill snapshots matched before and after diagnostics:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Source and staged manifest hash:
`855bcacf50cc45aa0df79777ae7fc6baf3abd7768411979c1405e6ef718ca33d`.
The final check also confirmed the inspected user settings file was unchanged.

## Native Diagnostics

The details/list/auth diagnostic profile requested `--restricted`, empty
`--setting-sources`, process-only `disableAllHooks: true` and
`autoMemoryEnabled: false`, strict empty MCP configuration, `Read,Skill`
tools, `dontAsk` permissions and the explicit staged plugin directory.
Existing host authentication was preserved; `--bare` was not used.

| Check | Observed result | Limit |
| --- | --- | --- |
| Plugin-root `plugin validate --strict --json` | Exit 0, manifest success, no errors/warnings | `contents: []`; not skill-content validation |
| Profile `plugin details extremely-hardcore` | Exit 0; nine skills, zero agents/hooks/MCP/LSP | Metadata and estimates, not model loading/adherence |
| Profile `plugin list --json` | Exit 0; only `extremely-hardcore@inline`, version `0.0.1`, enabled, session scope | Plugin inventory, not complete runtime exposure |
| Validate the skills parent directory | Exit 0, manifest null, empty contents | No component validation coverage |
| Validate each of nine `SKILL.md` paths | All exit 1, treated as plugin JSON with invalid-number parsing errors | Unsuitable targets for this CLI; not nine broken skills |
| Validate the `change-contract` directory | Exit 1, no plugin manifest found | Confirms this invocation does not validate a skill directory |
| Redacted auth under requested profile | Exit 1, `loggedIn: false`, `authMethod: none`, first-party provider | No model readiness |
| Redacted default auth, sandboxed and outside sandbox | Both exit 1 with the same status | Sandbox credential visibility did not explain the result |
| Repository `bun run validate` | Exit 0, scaffold complete | Structural repository check, not native semantic or model acceptance |

Claude estimates about **376 always-on tokens** for this skills-only plugin.
On-invocation estimates range from roughly 360 to 1,100 tokens per skill.
These rounded diagnostics are not measured model usage or evidence of
efficiency; optional agents were deliberately excluded, not audited.

## Ambient Sources And Limits

Metadata inspection found one user settings file with one hook event, no
enabled plugins, no configured MCP servers and no environment/model/API-key
helper overrides in that file. User instructions, rules, skills, commands,
agents, local settings and the installed-plugin index were absent at the
inspected paths. Inspected macOS managed files and workspace-ancestor
instruction/rule paths were absent. Listed provider override environment
variables were unset. No credential contents or account identity were retained.

The profile requests suppression of ordinary hooks and memory. This is not
attestation of the effective runtime: remote-managed/MDM policy and embedded
instructions remain unknown. In particular, process-level hook suppression
does not override managed hooks. See the
[official hook settings guidance](https://code.claude.com/docs/en/hooks).
The metadata commands cannot establish the exact model-visible instruction
and tool set. Do not clear those gates from flags or absent local files alone.

## Retention And Disposition

Private temporary root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-claude-081-wnsjXi`.
Reports are local mode-0600 files and may disappear with temporary cleanup:

- `preflight.json`: `bd7cb0da1935625df3b66f4111c59421366f11de421c06d7227427d97b0c76f8`.
- `checks.json`: `d2b584d9d8745cb4df8bebd76e05e320fdf33b33c1128114174037663cf7d5ce`.

Documentation follow-up checks: `bun test ./scripts/validate.test.ts` passes
20 tests with 64 assertions; `git diff --check` passes; all 58 local links in
the roadmap, evaluation index and this record resolve. The full protocol and
evaluation test suite was not rerun for this documentation-only follow-up.

Those reports retain the main diagnostics and redacted profile auth result.
The additional parent/directory validation, default/outside-sandbox auth,
final hash recheck and repository validation are controller-captured command
results summarised here, not falsely attributed to those report files.

No Anthropic task/skill payload consent was requested or consumed and no
model ran. Authentication recovery is a user-owned host action, not a reason
to change the adapter, skill or authentication route. After recovery, recheck
the host and unresolved runtime gates before reviewing model dispatch.
Standalone Claude acceptance, Pi acceptance, comparisons and publication
remain open; distribution stays last. Earlier Codex scores are unchanged.
