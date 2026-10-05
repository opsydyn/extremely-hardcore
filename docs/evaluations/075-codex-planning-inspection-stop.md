# Codex planning inspection stop

Date: 2026-09-26. A fresh attempt was explicitly approved after the
[offline read-predicate repair](074-staged-skill-read-regression.md).
The fixed task and criteria in [plan 072](../implementation-plans/072-codex-standalone-acceptance-trial.md)
were reused unchanged: one read-only turn, 180 seconds, no retries.

- result: blocked
- claim: Fresh host gates passed and one planning turn began, but a repository-status/discovery command exceeded the trial's staged-file-read allowance and stopped capture.
- evidence: Exact task and native skill request retained; started/completed command events; one turn request; unchanged staged tree; private hashed capture.
- remaining uncertainty: No final plan, completed-turn event or usage record exists. Behavioural acceptance and effectiveness remain unestablished; detection did not prevent command completion.
- next: needs follow-up; clarify the non-repository fixture and model-visible inspection allowance before proposing another separately authorised attempt. Do not broaden the predicate or change EHS based on this result alone.

## Fresh Host Gates

`codex-cli 0.154.0`, `gpt-6-astra`, provider `openai`, reasoning `high`.
The accepted ephemeral thread reported approval `never`, read-only sandbox,
command network access false and `instructionSources: []`. Process-only
overrides left nine staged EHS skills enabled, no enabled ambient skills,
27 disabled/noncallable apps and configured MCPs disabled. The tested complete
MCP projection and known inactive-transport hook checks passed. No saved
settings were edited. This is not exact injected-instruction or tool-set
attestation.

Source/staged snapshot SHA-256 remained:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Captured user-message text and native skill name/path equal the dispatch input;
the host additionally supplies empty text-element metadata. The workspace
contains only `.agents/skills`, with no git repository or staged scorer.

## Observed Stop

The agent announced that it would inspect guidance without edits/tests. Its
first command was:

```text
/bin/zsh -lc "pwd; git status --short; rg --files -g 'AGENTS.md' -g 'SKILL.md' .agents"
```

The driver rejected this compound discovery command. Unlike record 073, this
is not the repaired literal `cat` case. `pwd` and a staged file listing are
read-only discovery, but git status is outside the predeclared staged-file
inspection boundary. The task did not explicitly enumerate allowed commands
or explain that its disposable workspace was intentionally not a repository;
that limitation matters when attributing the stop.

The completed event retained the cwd, git's `not a git repository` diagnostic,
and nine staged skill filenames. The compound command exited 0 because its
last command succeeded; that is not successful git status. No file-content
read, test, implementation, app call or final response was observed.
The command completed before shutdown: the driver detects, not prevents.
No retry or permission change followed. Both host processes exited and the
controller session finished with exit 1.

Criteria 1-7 are not observed because no completed plan exists. Criterion 8
fails: the command allowance was exceeded and final/completed-turn/usage
evidence is absent. One `turn/start`, zero final-phase completed messages,
zero `turn/completed` events and zero usage notifications were retained.
Cost/usage are unavailable, not zero. This does not establish a harmful
action, an EHS effectiveness defect, or successful planning acceptance.

## Retention And Next Boundary

Private directory:
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-acceptance-072-wgbKaf/`.
Both capture/report are mode 0600; temporary artefacts may disappear and
raw host data requires review/redaction before publication.

| Artefact | SHA-256 |
| --- | --- |
| `capture.json` | `10fc4f5375a66d73412f389583aead35a7898941589ba4dbd13031674f1ced59` |
| `report.json` | `fbfa8409cf94906149672555c0fb42a78daf96bda95925dcec7b4652a9ea1d16` |
| Driver at dispatch | `f8914d27eb625726500e28934e9e36c2565678037254b180dc65e667a6bb69c9` |
| Fixed plan | `6bf6e58220d9ac0337aa61d2fb7c80d09e77eab6a9379cc02e543cc08f3d86e0` |
| Task input | `e978e7900b3f775ea64a3114e6e1b96bd1e8f2a58428e1a97b3bb085abbe49e3` |

The seven focused read-predicate tests passed before dispatch. They did not
authorise compound discovery commands. No product/helper code or skill text
changed during this attempt. No new ADR is needed for observing the existing
read-only route. Standalone acceptance stays open, comparisons remain hold,
and distribution remains last.

Prefer a predeclared clarification of the fixture and allowed inspection over
another parser expansion. Retain this failed attempt and the original plan;
any revised input is a new task version, not a retrospective pass.
