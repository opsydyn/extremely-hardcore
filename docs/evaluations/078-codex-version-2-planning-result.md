# Codex version 2 planning result

Date: 2026-09-27. The user explicitly authorised transmitting the version 2
task and staged EHS skill/resource content to OpenAI through the signed-in
Codex host for one read-only, 180-second trial with no retries. This resolves
the consent prerequisite in [record 077](077-version-2-launch-approval-stop.md)
for this attempt only; it is not blanket permission for further model runs.

- result: complete
- claim: One version 2 planning trial completed and was assessed; technical capture passes, but the response meets six of eight predeclared criteria, not full planning acceptance.
- evidence: Exact input, completed final answer/turn and usage retained; one permitted staged-file read; unchanged workspace; 35,293 ms controller elapsed; 362 final words.
- remaining uncertainty: Concrete before-fix numeric witness and explicit no-ADR conclusion are missing; implementation, tests, cross-host acceptance and causal EHS effect are unverified.
- next: needs review; review these narrow completeness gaps before proposing a further behavioural trial. No automatic retry or skill change; distribution remains last.

## Host And Capture

Used [task version 2](../implementation-plans/076-codex-planning-explicit-inspection.md)
with the unchanged eight criteria from [plan 072](../implementation-plans/072-codex-standalone-acceptance-trial.md).
Host: `codex-cli 0.154.0`, `gpt-6-astra`, `openai`, reasoning `high`.
Fresh gates confirmed nine staged EHS skills, no enabled ambient skills,
27 disabled/noncallable apps, disabled configured MCPs, complete accepted
MCP projection and the known inactive-transport hook. Accepted thread:
ephemeral, approval `never`, sandbox `readOnly`, command network access false.
No saved settings changed; model-service traffic was explicitly authorised.

One command completed with exit 0:

```text
/bin/zsh -lc 'cat .agents/skills/change-contract/SKILL.md .agents/skills/test-first-implementation/SKILL.md .agents/skills/evidence-ledger/SKILL.md'
```

The captured output exactly matches those three staged files. Exact task text
and native entrypoint name/path match the host user-message item. This proves
the native request and observed reads, not every injected instruction byte.
The complete source/staged snapshot remained
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Workspace still contains only `.agents/skills`; no tests, implementation,
out-of-scope command, app call or delegation was observed.

The final message has host phase `final_answer`; its ID/text also appear in
the completed turn. The report's final text matches it, and usage carries the
same thread/turn IDs. A check for phase `final` alone would be incorrect for
this capture. One turn was dispatched and completed; the host processes and
controller exited. No retry followed.

## Assessment

Manual controller assessment, not independent review or an automatic score.
Do not relax criteria retrospectively or count earlier interrupted attempts.

| Criterion | Result | Evidence or gap |
| --- | --- | --- |
| 1. Concise contract/scope | Pass | Function plus focused tests; signature/error and exclusions retained; no scaffolding |
| 2. Concrete static witness | Fail | Names `80abc` and explains prefix parsing/returning a value, but does not state the concrete before-fix return `80`; runtime results are correctly unclaimed |
| 3. Test-first verification | Pass | Proposed red cases, malformed/valid inputs, leading zeroes, boundaries and exact error checks; explicitly not executed |
| 4. Small complete implementation | Pass | Add empty-input/non-ASCII-digit rejection to existing conversion/integer/range checks; no dependency |
| 5. ADR applicability | Fail | Says no architectural or ownership change, but does not explicitly conclude no ADR is required or explain that decision |
| 6. Approval boundary | Pass | Planning completed without another routine approval request; implementation remains unauthorised |
| 7. Receipt/uncertainty | Pass | Five fields, valid `complete` result for planning only; tests unperformed and no runner supplied |
| 8. Host evidence/boundary | Pass | Exact native input, final/completed turn, usage, matching reads, fresh gates, unchanged tree and budget |

The proposed predicate is `text.length === 0 || /[^0-9]/.test(text)` added to
the existing rejection condition. Static inspection supports the narrow fix:
non-digits and trailing newlines reject, while leading zeroes remain allowed
and existing numeric range checks apply. The plan also calls out long leading
zero prefixes. This is assessment of a proposal, not executed correctness
evidence. The two failures concern required explanation completeness, not a
demonstrated faulty implementation or a reason for new framework machinery.

## Usage And Retention

Controller elapsed: 35.293 seconds; host turn duration: 35.288 seconds.
Final response: 362 whitespace-separated words, within the requested 600.
Host-reported total usage: input 32,221; cached input 14,848; output 989;
reasoning output 312; total 33,210 tokens. Preserve the host categories rather
than adding cached/reasoning values again. Monetary cost was not supplied.
One constrained trial provides no comparative efficiency evidence.

Private directory:
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-acceptance-072-t21k4d/`.
Capture/report have mode 0600; temporary retention is not durable publication.
Raw host data requires review/redaction before sharing.

| Artefact | SHA-256 |
| --- | --- |
| `capture.json` | `1d1c4505c254b4bcf8ba5437dbd0325957a856d4af7bcf2cb415116508618596` |
| `report.json` | `98f55861a59ed6298858a34487ba0dc034123def9a218ad7e352ad9ffdf2a6c2` |
| Driver | `c3dab6c8ee3656238d47b84f925501ec536392e32db13bf37a225efcafc5ffe4` |
| Plan 076 | `72ecb718ce761664b4f92134ed943e91d599bc2d85f827b6680479c18b69c634` |
| Task input | `4432348ebdc895a6477f23c63e8e5095aa2e49651ca6682060a441d967142dd0` |

Seven focused read-predicate tests and driver syntax checks passed before
dispatch. No product code or EHS instructions changed in this trial. The release
roadmap separately queues Claude measurement/distribution guidance; that does
not qualify acceptance. Full standalone acceptance stays open and comparisons
remain hold. No new ADR is required for observing the unchanged host route.
