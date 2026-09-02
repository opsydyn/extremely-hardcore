# Provider onboarding

This page explains how to load the standalone EHS skills into Codex CLI,
Claude Code, or Pi from a local checkout. It separates three different claims:

1. **Package discovery:** the host can find the checkout and its metadata.
2. **Skill loading:** a model can read the EHS instructions and answer a
   harmless verification prompt from them.
3. **Engineering adherence:** the model follows EHS during real work.

The first two are useful onboarding checks. Neither proves sandbox enforcement,
network isolation, provider identity, model quality, or reliable adherence on
arbitrary tasks. The optional `eh` protocol is a separate local evidence tool;
it is not required for the Markdown skills.

## Prerequisites

Set the checkout path once in each shell:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
```

Observed local CLI versions for this guide on 2026-09-02 were Codex CLI
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
version `0.0.1`. These commands change Codex's local plugin configuration by
user choice. A repository check can use a temporary `CODEX_HOME` instead.

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

Pi has a direct session-local skill flag. Load the EHS entrypoint explicitly:

```bash
pi --skill "$EHS_ROOT/skills/using-extremely-hardcore/SKILL.md"
```

Pi's CLI help also accepts a skill directory, but the single entrypoint makes
the smoke deterministic and keeps the first context small. Directory loading
is not part of the current smoke evidence. Pi does not need a separate plugin
manifest for the verified path. A persistent Pi installation is not currently
claimed; pass `--skill` when starting a session or use Pi's own discovery
configuration only after verifying that configuration on the target version.

Before a model call, check readiness without printing credentials:

```bash
pi auth check --model provider/model-id --json --no-refresh
```

Replace `provider/model-id` with an authenticated model. Do not use `--offline`
for the model smoke; Pi documents that flag as controlling startup operations,
not provider traffic.

## Loading smoke

Run this harmless prompt after the host-specific discovery step. It must not
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
  --skill "$EHS_ROOT/skills/using-extremely-hardcore/SKILL.md" \
  --mode json \
  --print \
  --model provider/model-id \
  "Use only the loaded Extremely Hardcore skill. Do not edit files or run commands. Reply with exactly one line: EHS_SMOKE provider=pi loaded=yes first_step=change-contract trivial=skip-full-loop. Use loaded=no if the skill is not available."
```

For Pi JSON mode, inspect the final assistant message rather than treating a
successful process start as a pass. Record the host version, model, command,
and final marker. Keep raw output private.

## Current smoke matrix

| Host | Package/discovery evidence | Loading smoke | Current status |
| --- | --- | --- | --- |
| Codex CLI | Local marketplace accepted and plugin installed in isolated `CODEX_HOME` with CLI `0.147.0` | Model smoke was blocked by the local network boundary during this run | Discovery verified; model loading pending |
| Claude Code | Plugin and marketplace metadata validated with CLI `2.1.251` | Model smoke was blocked because the CLI was not authenticated | Metadata verified; model loading pending |
| Pi | Explicit `--skill` path with CLI `0.84.1` | Returned the exact `loaded=yes` marker using `openai-codex/gpt-5.3-codex-spark` | Session-local loading verified |

This matrix is onboarding evidence, not a provider compatibility score. A
provider can move from `pending` to `verified` only after a fresh smoke on the
current version. A smoke pass still does not establish broad adherence.

## Use EHS on a real change

After the smoke passes, give the host a normal non-trivial task and name the
desired method:

```text
Use Extremely Hardcore for this non-trivial change. Before editing, state the
change contract, whether an architecture decision applies, the first
verification test, and the evidence you will record. Keep the change bounded
and stop if a required assumption fails.
```

For a genuinely trivial edit, EHS should not force the full loop:

```text
Fix this one obvious spelling mistake in the README. Do not change anything else.
```

The host-facing receipt is the compact Markdown shape `result`, `claim`,
`evidence`, `remaining uncertainty`, and `next`. The receipt can be used without
the `eh` protocol.

## Optional `eh` protocol

The reference CLI remains a separate Bun workflow. Use the [user guide](user-guide.md)
for run definitions, evidence capture, validation, transitions, attestations,
and CI artefacts. Do not describe a provider smoke or a host plugin install as
protocol evidence unless the command was captured against a real run.

The provider evaluation commands in [the evaluation reference](evaluations/README.md)
are also separate. In particular, the Pi read-only adapter passes `--no-skills`
and therefore intentionally does not test Pi plus EHS loading.
