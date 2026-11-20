# Fresh-Session EHS Check

For the human starting ordinary work in a new session. No task, model run or
host configuration change is performed by this handoff. Use EHS normally;
do not try to reproduce our old scores or prove that it works.

## Before Starting

1. Use the [recommended skills-only ZIP](https://github.com/opsydyn/extremely-hardcore/releases/download/v0.0.2/extremely-hardcore-0.0.2-guidance-31e0592-skills-only-preview.zip), not GitHub's automatic full-source archives. Extract it outside this development checkout and use its own README. Do not rebuild or edit the skills for this check. Record the exact archive and revision used; different previews can have the same manifest version.
2. Use your chosen project's normal safety rules and permissions. Disable Superpowers through your host's supported controls before the new session, including any separately installed copies/hooks or global instructions that load it. Verify what is actually active; a prompt saying "do not use Superpowers" is not removal.
3. Start a new conversation, not a fork/resume of this one. Do not supply this chat, retrospective, evaluations or expected answers. Turn off memory injection for this check where the host supports it, or record that it remained active. No transcript export or private-reasoning capture is required.
4. Keep other unavoidable host/repository instructions and note their presence. Do not weaken safety controls or remove required repository guidance to manufacture isolation.

Codex reads global and project `AGENTS.md` guidance at startup; a new chat does
not by itself remove those sources. See [official instruction-discovery documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
For Codex CLI, the [documented command controls](https://learn.chatgpt.com/docs/developer-commands)
include `/plugins` for plugin availability and `/memories` for memory injection/
generation. Those CLI controls are not a verified desktop-app recipe, and this
handoff does not change them for you. If Superpowers still appears as active or
mandatory, do not label the session "without Superpowers"; resolve that through
the supported host setup or retain the limitation honestly.

## Minimal Task Prompt

Use the actual extracted package path and a real task you already need:

```text
Use EHS from <extracted-package>/skills/using-extremely-hardcore/SKILL.md for this task:

<Your actual task, constraints and normal acceptance criteria.>
```

Do not paste our workflow checklist, scoring criteria or known solution into
the prompt. Let the skill supply its own engineering guidance. Only the released
skill resources and normal task materials need be introduced to the agent.

## Afterward

Keep the ordinary final diff, actual verification results and completion report,
including any failure. A short note on setup confusion, unnecessary ceremony,
human intervention and useful behaviour is enough; no new receipt schema or
harness is needed. Note the host/model, package version and other active guidance
where observable. Do not record missing usage/cost data as zero.

This removes intentional carryover from this chat and aims to exclude
Superpowers. It is not zero bias or an EHS-versus-baseline experiment, and no
outcome automatically qualifies another host, changes EHS or approves release.
