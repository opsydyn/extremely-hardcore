# Extremely Hardcore

Version `0.0.1`, local preview candidate. Not a published or generally qualified
release.

EHS is a standalone engineering method for coding agents: explicit scope,
structural simplicity, meaningful verification and evidence before completion.
This package contains nine Markdown skills, their seven templates, two existing
plugin manifests and the MIT licence. Bun and the EHS reference CLI are not
required. Optional role prompts, marketplace metadata and development/evaluation
records are not included.

## Skills

- [using-extremely-hardcore](skills/using-extremely-hardcore/SKILL.md): start here; route work by risk.
- [change-contract](skills/change-contract/SKILL.md): intent, scope and acceptance.
- [domain-discovery](skills/domain-discovery/SKILL.md): language, rules and ownership.
- [simple-made-easy](skills/simple-made-easy/SKILL.md): choose the least entangled complete path.
- [architecture-decision](skills/architecture-decision/SKILL.md): record consequential decisions.
- [decision-challenge](skills/decision-challenge/SKILL.md): challenge high-consequence proposals.
- [bounded-context-review](skills/bounded-context-review/SKILL.md): check boundaries and coupling.
- [test-first-implementation](skills/test-first-implementation/SKILL.md): protect meaningful behaviour.
- [evidence-ledger](skills/evidence-ledger/SKILL.md): report evidence and uncertainty.

## Loading Requests

Unpack the archive and set the root to its extracted `extremely-hardcore` folder:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore
```

Claude Code, for one session:

```bash
claude --plugin-dir "$EHS_ROOT"
```

Pi, with all nine skills discoverable:

```bash
pi --skill "$EHS_ROOT/skills/"
```

Codex: give your host the actual path to the entrypoint linked above and ask it
to read the applicable sibling skills. Codex metadata is included, but no
marketplace entry or qualified marketplace-install recipe is provided here.

These are loading requests, not proof of installation or engineering adherence.
Starting a coding host can contact its configured model provider. Use its normal
setup, sign-in and permissions; EHS grants no additional authority.

## First Change

Give the host a concrete bounded task and acceptance criteria:

```text
Use Extremely Hardcore for this change. State intent, allowed scope and
acceptance evidence before editing. Verify the relevant behaviour, then report
result, claim, evidence, remaining uncertainty and next.
```

Ordinary records can stay in the conversation. Consequential work retains
required durable records and approvals. Trivial edits do not need the full loop.
Keep an existing user/host execution choice; otherwise bounded work defaults
inline, with native delegation considered only when available, authorised and
useful. Optional named role prompts are not a prerequisite for skills-only use.

## Limits

Loading and representative engineering adherence for this exact candidate are
not fully qualified. File hashes and metadata do not prove model-visible
instruction delivery, permission enforcement, lower cost or improved outcomes.
The optional protocol, evaluators and Claude Chat/Cowork support are not covered.

## Licence

[MIT](LICENSE), copyright 2026 Alan Currie.
