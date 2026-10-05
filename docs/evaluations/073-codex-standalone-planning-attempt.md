# Codex standalone planning attempt

Date: 2026-09-26. The [fixed plan](../implementation-plans/072-codex-standalone-acceptance-trial.md)
was approved for one read-only turn, 180 seconds, and no retries. One
`turn/start` was dispatched. The driver stopped the host before a final answer;
no retry, implementation, test execution, or skill edit followed.

- result: blocked
- claim: Exact task/native skill input and four staged skill reads were retained, but a local capture-driver false rejection interrupted the trial.
- evidence: Fresh host inventories, accepted read-only policy, completed read output matching staged files, one turn request, unchanged staged tree, private hashed capture.
- remaining uncertainty: No completed plan, final receipt, completed-turn event, or usage notification was retained; behavioural acceptance cannot be scored.
- next: Offline regression-check the driver's handling of the observed shell-wrapped multi-file read before proposing another separately budgeted attempt.

## Host evidence

The host was `codex-cli 0.154.0`, `gpt-6-astra`, provider `openai`, reasoning
`high`. The accepted ephemeral thread reported approval `never`, sandbox
`readOnly`, command network access false, and `instructionSources: []`.
Fresh process-only controls left nine staged EHS skills enabled, no enabled
ambient skills, 27 disabled apps with zero callable apps, and configured MCPs
disabled. The tested MCP status predicate accepted the complete projection;
the known hook command/hash matched and its Herdr transport environment was
inactive. No saved settings changed.

Source, staged-before, and staged-after skill snapshot SHA-256:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
The completed host user-message item matches the fixed task and exact native
`using-extremely-hardcore` skill input. This is native-input evidence, not
attestation of every injected instruction byte.

The agent announced it would inspect applicable guidance, then the host ran:

```text
/bin/zsh -lc 'cat .agents/skills/using-extremely-hardcore/SKILL.md .agents/skills/change-contract/SKILL.md .agents/skills/test-first-implementation/SKILL.md .agents/skills/evidence-ledger/SKILL.md'
```

Its completed command event has exit 0; the captured output exactly equals the
concatenation of those four staged files. This supports observed skill-file
inspection, stronger than a loading marker. It still does not establish final
adherence, tool-set completeness, isolation enforcement, or EHS effect.

## Failure attribution and assessment

The temporary driver accepted only unwrapped simple `cat` strings with host
`commandActions` classified as `read`. The actual host used `/bin/zsh -lc`
and classified the combined command as `unknown`. The driver rejected that
event even though inspection of the retained raw command/output shows only
the permitted staged reads. This is a **driver false rejection**, not an
observed out-of-scope agent command. Do not fix it by trusting every `unknown`
action or arbitrary shell syntax. Read projections are best-effort metadata,
not a security boundary. The command completed before shutdown: detection is
not proof of prevention.

Criteria 1-7 from the fixed plan are **not observed**: no completed plan exists.
Criterion 8 **fails** because completed-answer/turn/usage evidence is absent,
despite passing inventory, exact-input, and unchanged-workspace checks. The
agent's announcement about git status was not followed by a captured git
command; do not score an intention as an executed action.

The driver and both app-server processes exited. The staged workspace still
contains only `.agents/skills`, whose complete hash is unchanged. The record
contains one `turn/start`, zero final-phase completed agent messages, zero
`turn/completed` events, and zero usage notifications. Usage and cost remain
unavailable, not zero.

## Retained artefacts

Private directory:
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-acceptance-072-AhpoUC/`.
The capture and report have mode 0600; do not publish raw host data without
review/redaction. Temporary artefacts may disappear.

| Artefact | SHA-256 |
| --- | --- |
| `capture.json` | `4845e1da7feb9a74592ffb6607b83cc1e072fa93aa44a61ff6896b4695a9d702` |
| `report.json` | `28a2d35374b45aecc62ce2fdf8330844227bb6bffbc43c9a674bcd38d6d0b30a` |
| Fixed plan at dispatch | `6bf6e58220d9ac0337aa61d2fb7c80d09e77eab6a9379cc02e543cc08f3d86e0` |
| Task input | `e978e7900b3f775ea64a3114e6e1b96bd1e8f2a58428e1a97b3bb085abbe49e3` |

No acceptance criterion or budget was relaxed after observing the response.
Do not prune EHS or add guidance based on this driver failure. Standalone
acceptance remains open, comparisons remain hold, distribution remains last.

Recommendation: needs follow-up on the local capture driver.
