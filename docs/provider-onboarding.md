# Provider onboarding

This page explains how to load the standalone EHS skills into Codex CLI,
Claude Code, or Pi. It separates three different claims:

1. **Package discovery:** the host can find the checkout and its metadata.
2. **Skill loading:** the host supplies the EHS instructions to the model.
   Discovery and an echoed smoke marker alone do not demonstrate this.
3. **Engineering adherence:** the model follows EHS during real work.

The first two are distinct onboarding checks. Neither proves sandbox enforcement,
network isolation, provider identity, model quality, or reliable adherence on
arbitrary tasks. The optional `eh` protocol is a separate local evidence tool;
it is not required for the Markdown skills. Use your host's normal setup and sign
in for model work; Bun and the local evaluations are optional.

## Published preview ZIP

Download the [recommended experimental v0.0.2 skills-only ZIP](https://github.com/opsydyn/extremely-hardcore/releases/download/v0.0.2/extremely-hardcore-0.0.2-guidance-31e0592-skills-only-preview.zip).
Extract it outside the target project and follow the README inside the ZIP for
your host. Do not use GitHub's automatic source archives or the checkout
marketplace commands below with the ZIP. The preview is not generally
host-qualified and does not automatically update installed copies.

## Native Pi Git install

For a persistent Pi package, use the [native Git install instructions](../README.md#installing-for-pi).
Pi fetches the source repository, not the preview ZIP. This route does not
require an existing checkout or an extracted archive.

## Local source checkout

Use the host commands below if you already have a source checkout. The checkout
also has optional development tooling omitted from the ZIP. Set its path once
in each shell:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
```

Observed local CLI versions for this guide on 2026-09-03 were Codex CLI
`0.147.0`, Claude Code `2.1.251`, and Pi `0.84.1`. These are evidence
snapshots, not minimum-version promises. Re-run the version command when a host
has been updated.

The skills are plain Markdown under `$EHS_ROOT/skills/`. Do not copy provider
credentials into this repository or commit raw provider transcripts.

## Codex CLI

The checkout contains `.codex-plugin/plugin.json` and a local marketplace entry
under `.claude-plugin/marketplace.json`. Add the checkout as a local marketplace
and install the plugin:

```bash
codex plugin marketplace add "$EHS_ROOT"
codex plugin add extremely-hardcore@extremely-hardcore-dev
codex plugin list
```

The final command should show `extremely-hardcore` as `installed, enabled` with
the version in the checkout's `.codex-plugin/plugin.json`. These commands change
Codex's local plugin configuration by user choice. A repository check can use a
temporary `CODEX_HOME` instead.

Start a new session in the target project and run the smoke prompt below. For a
non-interactive read-only check, use `codex exec --ephemeral --sandbox
read-only`.

If a local marketplace is not available in the Codex environment, use the
host's configured marketplace or an explicit checkout reference. The repository
does not claim that an arbitrary Codex installation has a built-in local path.

## Claude Code

The checkout contains `.claude-plugin/plugin.json` and a local marketplace
entry. Validate the metadata before installing:

```bash
claude plugin validate "$EHS_ROOT/.claude-plugin/plugin.json"
claude plugin validate "$EHS_ROOT"
```

For one session, load the checkout directly:

```bash
claude --plugin-dir "$EHS_ROOT"
```

For a persistent local marketplace installation, opt in at the desired scope:

```bash
claude plugin marketplace add "$EHS_ROOT" --scope user
claude plugin install extremely-hardcore@extremely-hardcore-dev
```

Use `--scope project` or `--scope local` when the installation should belong to
one project or one checkout rather than the user account. Start a new Claude
session after installing.

The installed CLI may validate the plugin while the model remains
unauthenticated. Treat authentication failure as a blocked smoke, not as a
skill failure.

## Pi

For native user installation, update/removal and discovery verification, follow
the [README's Pi instructions](../README.md#installing-for-pi). Pi `1.5.2` native
package management and nine-skill discovery were tested without model calls in
isolated configuration; see [ADR 050](adr/050-native-pi-skill-package.md).

The existing direct session-local flag remains available:

```bash
pi --skill "$EHS_ROOT/skills/"
```

Pass the directory: a single SKILL.md file registers only that skill, not its
siblings. Check the native catalogue for all nine names and inspect diagnostics;
discovery still does not establish model loading or adherence.
The historical smoke used a single entrypoint, not a full-directory install.
Later no-model diagnostics and planning observations used a staged EHS tree;
see the evidence limits below. Neither qualifies every installed configuration.
Pi does not need a separate plugin manifest for this session-local path.
Native installation persists a package declaration in Pi's settings; explicit
`--skill` remains a session-only alternative. Discovery is not engineering adherence.

Before a model call, check readiness without printing credentials:

```bash
pi auth check --model provider/model-id --json --no-refresh
```

Replace `provider/model-id` with an authenticated model. Do not use `--offline`
for the model smoke; Pi documents that flag as controlling startup operations,
not provider traffic.

## Evidence and limits

The following retained observations are not a fresh authentication check,
installed-release test or provider comparison. Do not compare their scores
across different tasks.

They predate the [consistency-pass instruction edits](evaluations/115-standalone-consistency-pass.md)
and [proportionate guidance update](adr/049-proportionate-guidance-and-functional-domain-modelling.md).
They describe their retained snapshots, not model adherence to the revised source.

| Surface | Observed | Not established |
| --- | --- | --- |
| Codex native worker | [2026-10-13 result 112](evaluations/112-uninterrupted-test-first-result.md): six staged skill reads, meaningful worker-authored red/fix/green, useful tests and honest receipt | Current CLI marketplace installation or broad adherence; ambient superpowers prevent isolated EHS attribution |
| Claude Code | [Planning result 090](evaluations/090-claude-completion-routing-result.md): native EHS loading and seven of eight criteria; [2026-10-13 observation 108](evaluations/108-claude-implementation-turn-counter-stop.md): parent-verified source fix | Worker-run tests or full qualification; 108's original observer rejection remains despite the [offline correction](evaluations/110-claude-counter-regression-result.md); no Chat/Cowork parity |
| Pi session-local skills | [2026-10-13 result 099](evaluations/099-pi-bounded-planning-result.md): six staged reads and bounded planning; four behavioural passes, three failures, inventory criterion unobserved | Implementation/consequential-work qualification, full tool inventory or a writable evaluation adapter |

All three have checkout-loading paths above, with different evidence limits.
A read-only adapter limit is not a ban on using the standalone method in Pi or
Claude; it is also not permission to expand that adapter. Full host acceptance
and the actual installed release artifact remain open. See the
[release-scope review](evaluations/113-standalone-release-scope-review.md).

## Use EHS on a real change

After inspecting discovery/loading evidence, give the host a normal non-trivial
task and name the desired method. Do not treat the smoke marker as its approval
or acceptance evidence:

```text
Use Extremely Hardcore to <the actual task>. Preserve <the compatibility or
safety constraint>. Verify <the observable outcome> and report checks and limits.
```

For a genuinely trivial edit, EHS should not force the full loop:

```text
Fix this one obvious spelling mistake in the README. Do not change anything else.
```

Ordinary completion can be a concise paragraph with the outcome, supporting
checks/results and limitations. There is no required field list or `eh` run;
existing repository records, formats and approvals remain binding.

## Loading smoke

This optional diagnostic contacts the configured model provider. Review its
payload and budget before running it; it is not required to use the skills.

Run this read-only prompt after the host-specific discovery step. It must not
edit files, run commands, or inspect project content. The expected answer is
exactly:

```text
EHS_SMOKE provider=<host> loaded=yes first_step=change-contract trivial=skip-full-loop
```

Codex CLI:

```bash
codex exec --ephemeral --sandbox read-only \
  -C /path/to/target-project \
  "Use the installed Extremely Hardcore skill. Do not edit files or run shell commands. Reply with exactly one line: EHS_SMOKE provider=codex loaded=yes first_step=change-contract trivial=skip-full-loop. Use loaded=no if the skill is not available."
```

Claude Code:

```bash
claude --plugin-dir "$EHS_ROOT" \
  --no-session-persistence \
  --tools "" \
  --model sonnet \
  -p "Use the loaded Extremely Hardcore skill. Do not edit files or run shell commands. Reply with exactly one line: EHS_SMOKE provider=claude loaded=yes first_step=change-contract trivial=skip-full-loop. Use loaded=no if the skill is not available."
```

Pi:

```bash
pi --no-session \
  --no-tools \
  --no-context-files \
  --skill "$EHS_ROOT/skills/" \
  --mode json \
  --print \
  --model provider/model-id \
  "Use only the loaded Extremely Hardcore skill. Do not edit files or run commands. Reply with exactly one line: EHS_SMOKE provider=pi loaded=yes first_step=change-contract trivial=skip-full-loop. Use loaded=no if the skill is not available."
```

For Pi JSON mode, inspect the final assistant message rather than treating a
successful process start as a pass. Record the host version, model, command,
and final marker. Keep raw output private.

## Historical smoke matrix (2026-09-03)

| Host | Package/discovery evidence | Loading smoke | Status at that checkpoint |
| --- | --- | --- | --- |
| Codex CLI | Default `codex plugin list` with CLI `0.147.0` did not list the local EHS plugin | Bounded 15-second read-only smoke timed out before a marker with exit 143 | That configuration did not load EHS; smoke was environment-blocked |
| Claude Code | Plugin and marketplace metadata validated with CLI `2.1.251`; plugin validation exited 0 with seven agent-frontmatter warnings and marketplace validation exited 0 | Read-only model smoke exited before a marker at the host authentication boundary | Metadata verified with warnings; smoke was authentication-blocked |
| Pi | Explicit `--skill` path with CLI `0.84.1`; `pi auth check --json --no-refresh` reported ready | Returned the exact `loaded=yes` marker using `openai-codex/gpt-5.3-codex-spark` | Session-local loading verified |

This is dated onboarding evidence from Run 055, not current authentication,
installation, or compatibility status. Preserve it rather than overwriting it
with newer observations. A smoke marker alone is self-report, not proof of
instruction delivery or engineering adherence. The prompt above supplies the
expected routing answer, so repeating it cannot establish that the skill was
read. Retain host discovery/loading evidence separately and test representative
behaviour before making supported-host claims.

## Later evidence and remaining acceptance

The [explicit-path Codex turn](evaluations/064-codex-explicit-skill-turn.md)
retained native skill input, events, and usage, but not exact injected bytes.
The [no-model thread gate](evaluations/068-ephemeral-thread-capability-gate.md)
and [offline MCP regression correction](evaluations/070-control-mcp-gate-regression.md)
add partial capability evidence, not general adherence or comparison readiness.
The control-only trace attempt stopped before model dispatch.

On 2026-09-26, Claude Code `2.1.259` validated the plugin and marketplace after
the seven agent definitions received `name` and `description` frontmatter,
without warnings. No Claude model loading or authentication check was run in
that cleanup. Metadata validation does not supersede the historical smoke or
clear Claude acceptance. The later observations in the evidence table above
also retain their own limits. The [roadmap](../ROADMAP.md) keeps the remaining
standalone support and installed-artifact decisions separate.

## Fresh-session handoff

For a non-trivial run that already has durable `eh` state, capture the current
status from the original workspace:

```bash
bun run eh status "$RUN_PATH"
```

Give the resulting snapshot to the fresh session as prompt input and ask it to
restate the state, next action, and limitation before doing any work. Record
the host and version, model, tools, session persistence, context files,
expected result, observed result, and remaining uncertainty. Label this result
as **prompt-fed interpretation** when the new session receives the snapshot as
text. It does not prove file-reading resume, arbitrary workspace continuation,
protocol enforcement, engineering adherence, containment, provider comparison,
or release readiness.

Provider-specific session flags and loading mechanics remain in the host
sections above; do not infer that one provider's resume controls exist on
another. [Run 048](dogfood/048-future-dogfood-record-and-pi-resume.md) is a
narrow Pi example of this boundary, not a cross-provider result.

## Optional `eh` protocol

The reference CLI remains a separate Bun workflow. Use the [user guide](user-guide.md)
for run definitions, evidence capture, validation, transitions, attestations,
and CI artefacts. Do not describe a provider smoke or a host plugin install as
protocol evidence unless the command was captured against a real run.

The provider evaluation commands in [the evaluation reference](evaluations/README.md)
are also separate. In particular, the Pi read-only adapter passes `--no-skills`
and therefore intentionally does not test Pi plus EHS loading.

## Optional protocol-command measurement

Run 055 also repeated the existing local receipt path three times:

```bash
bun run eh status "$RUN_PATH"
bun run eh summary "$RUN_PATH"
```

The host-captured command wall-time sample was:

| Command | Repetitions | Min | Median | Max | Exit state |
| --- | ---: | ---: | ---: | ---: | --- |
| `eh status` | 3 | 46.21 ms | 46.33 ms | 51.42 ms | `0` each time |
| `eh summary` | 3 | 46.29 ms | 46.33 ms | 48.77 ms | `1` each time; Run 055 was incomplete during the probe |

This is a descriptive local command measurement, not human active time, a
productivity result, a benchmark, or a provider comparison. Active operator
time and a baseline remain unmeasured. The summary exit state is expected while
the run lacks final evidence; it is not classified as a repository failure.
