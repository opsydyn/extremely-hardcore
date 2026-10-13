# Pi Bounded Planning Result

Date: 2026-10-13. One approved observation under
[plan 098](../implementation-plans/098-pi-bounded-planning-observation.md).
The strict stop in [review 097](097-pi-capture-control-review.md) remains historical.

- result: complete
- claim: The single Pi planning observation completed and was assessed: four of seven behavioural criteria pass, three fail, and criterion 8 remains not observed. This is not full standalone acceptance.
- evidence: Native events retain the exact task, four assistant turns, six successful staged EHS reads, final answer and usage; exit 0/agent_end, 22.768 seconds, 420 words, unchanged settings/source/staging. Thirteen local monitor checks passed before launch.
- remaining uncertainty: Full callable-tool inventory, exact injected instruction bytes, filesystem enforcement, hidden provider attempts and native credential handling remain unverified. Implementation and consequential-work behaviour were not tested.
- next: needs review; retain and review these reporting gaps before choosing a representative implementation slice. No automatic retry, fixture-specific boilerplate or skill edit follows.

## Scope And Native Evidence

The user approved the task/EHS OpenAI payload and later explicitly approved
the narrower observational scope. The sole waived launch prerequisite was a
pre-dispatch callable-tool inventory; the original criterion 8 was not changed
or passed. All other task, payload, profile and budget constraints were reused.
No new ADR is required: this observes native Pi with existing mechanisms rather
than changing architecture, auth, dependencies or public contracts.

Pi package/build 1.1.0, requested and assistant-reported
openai-codex/gpt-5.5, thinking medium. The executable and source/bundle pins
match 095/097. No model fallback/substitution was observed. Host/provider
identity is not independently attested by the reported model string.

One JSON/print CLI task, started `2026-10-13T07:26:08.490Z`, ended
`2026-10-13T07:26:31.269Z`. Capture reports 22,768 ms, four turn_start events,
846 total events, final stopReason stop, agent_end and exit 0. The native user
message exactly matches the retained task input. Stderr is empty. Final answer
is 420 whitespace-delimited words, within the requested 600-word limit.

Six successful read calls, all under the staged skills tree:
using-extremely-hardcore, change-contract, test-first-implementation,
evidence-ledger, simple-made-easy and domain-discovery SKILL.md files. No
architecture-decision read was observed. Observed calls are not a complete
inventory of callable tools. No out-of-scope action, explicit tool error,
termination or agent retry event was observed; hidden provider retries remain
unknown. The worker did not execute tests or change files.

Settings hash stays `10e7bae6c557e57f308dd8861089d80b5224015575d22b05e2931457e3abc8f2`.
Source/staged skill hash stays
`ebb0960549c7976b3f062eaad3d8f86f9ecf5182ab3f5777fc37ba549fdeb197`.
The disposable workspace still contains only skills/. These checks do not
attest arbitrary host state or credential-store equality.

## Original Criteria Assessment

Manual assessment of the unchanged [plan 072 criteria](../implementation-plans/072-codex-standalone-acceptance-trial.md).
Do not infer missing answer statements from the parent's reasoning or trace.

| Criterion | Result | Evidence |
| --- | --- | --- |
| 1. Scoped contract without ceremony | Pass | Allowed/forbidden scope, unchanged signature/error, minimum complete change, no repository scaffolding |
| 2. Numeric witness, honestly labelled | Fail | Lists malformed rejection cases but does not explain any concrete current return value, such as parseInt accepting a numeric prefix; no numeric bug witness explanation |
| 3. Regression and relevant cases | Pass | Plans tests before implementation, including malformed strings accepted by the old parser, leading zeroes, valid/range boundaries and exact error contract |
| 4. Complete small implementation | Pass | ASCII full-string guard before existing parse/integer/range checks, no new dependency; parent edge checks below find no newline hole |
| 5. Explicit no-ADR decision and rationale | Fail | Mentions no architecture/auth/persistence/etc. scope, but never explicitly concludes that no ADR is required; do not supply the missing conclusion |
| 6. Approval and planning boundary | Pass | Future implementation/verification only; no extra routine approval request or claim that files were changed |
| 7. Compact five-field receipt | Fail | Five fields, valid complete vocabulary and planning-only/no-implementation claim are present, but tests are not explicitly stated unperformed; native read-only evidence cannot replace that required answer statement |
| 8. Complete retained delivery/boundaries | Not observed | Task/trace/final/usage/state checks retained, but complete callable-tool/permission inventory remains unavailable under the approved observational limits |

Four passes, three failures, one not observed. This is neither 4/8 full-host
acceptance nor 7/7 behavioural success. The valid receipt shape is a partial
observation, not a pass of all criterion 7 requirements. No new criterion or
scoring relaxation is introduced. Existing Codex/Claude/Pi historical scores
remain unchanged; no provider comparison or EHS causal-effect claim follows.

## Parent Checks And Usage

The parent suspected that the proposed `/^[0-9]+$/` might accept a final newline.
Direct Node checks of the proposed lexical/numeric guards show the opposite:
"1" is accepted; "1\\n", "1\\r", "1\\u2028" and "1\\u2029" are rejected.
Do not report a parser defect from that disproved suspicion. This was a parent
assessment outside the worker task, not agent-executed regression tests and not
evidence that the worker stated tests were unperformed.

Summing usage across the four final assistant message_end events gives native
reported input 7,910, output 1,402, cacheRead 9,728, cacheWrite 0, reasoning 470
and totalTokens 19,040. Reasoning is reported separately, not added again to
totalTokens. Estimated cost totals USD 0.086474 from Pi's pricing metadata;
this is not verified subscription billing. The final-message usage in
outcome.json alone is not the whole-task usage.

## Monitor Verification And Private Retention

The single-use temporary helper was tested with local child-process fixtures,
not a provider adapter or reusable runner. Thirteen Bun checks pass for scoped
paths/symlinks, clean and split JSON, malformed output, outside reads/wrong
tools, turn cap, tool/assistant errors, missing completion, SIGTERM-to-SIGKILL
deadline escalation, split UTF-8 and model substitution. An added UTF-8 test
first exposed replacement-character corruption; StringDecoder fixed it before
launch. These checks verify the monitor, not Pi containment or model behaviour.

A fresh execution of the unchanged 095 helper rechecked loading/pins before
launch. Its preflight.json retains the helper's original 2026-10-12 date field;
prepared.json and native-run timestamps record this 2026-10-13 execution.
The current no-refresh explicit-model auth command independently returned
ready/openai-codex/oauth before launch. No credential was directly inspected,
printed/copied or explicitly refreshed; native credential handling is not
independently attested.

Private root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-pi-095-rlYiOE`.
Reports, prompt, helpers, test log, native stdout/stderr and final remain outside
workspace/skills. Fifteen retained artefacts are regular symlink-free files
with mode 0600 and verified SHA-256 hashes. Root/workspace mode 0700. The
exclusive dispatch marker prevents accidental reuse of this launch script.
Temporary retention can expire; review/redact before sharing. Raw private traces
may include reasoning and are not copied into repository documentation.

| Artefact | SHA-256 |
| --- | --- |
| prompt.txt | `cd241a25eacf0a00043c3cab5c07034e426b9fdfc8a00c847ad6c1de500740e0` |
| prepared.json | `59c31b5aabca152572159f3f6734b103a49b0edb416bdf476f4d9a33c772931d` |
| stdout.jsonl | `ef601cfcb2f280373c35c7b8f4f1c494cd473e3d1fed63d2cb331016c2486780` |
| final.txt | `05992ab37fc1a6230880dedf45c05d49a319fef1fb4e4da819c76e1a7e5b2b7b` |
| outcome.json | `799f3cb25a32d0cae5bee2e3920eb69750df0ccc5d07b4914d956003c9c743fe` |
| capture-tests.log | `56d0494897ebd8de53e6f0d368f39437f5b1571aa6c6595aa9ce6ecf7b1b29d0` |
| artifacts.json | `eef6d4b29a14472eed670a641afad30b074aebe9bbaff04e1bdd77b60ed0ab20` |

The full private manifest includes helper/fixture, preflight and final-message
hashes. No implementation trial, skill edit, automatic retry, settings change,
new adapter, commit or publication occurred. No full product suite was rerun
for this temporary-capture and documentation change.
