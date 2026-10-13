# Claude Turn-Counter Semantics Review

Date: 2026-10-13. Approved offline follow-up to
[observation 108](108-claude-implementation-turn-counter-stop.md).
No Claude process or provider call launched; no observer gate changed.

- result: complete
- claim: The private observer's turn rejection compares different units. In the pinned normal-success path, num_turns counts the initial prompt plus emitted user messages, not the query-loop counter limited by --max-turns. This is an observer defect, not evidence of eleven agentic iterations.
- evidence: Eight pinned native source excerpts identify separate counters and the native max-turn terminal path. Retained 108 reconstructs num_turns exactly: 1 initial prompt + 7 tool-result messages + 3 injected skill-text messages = 11. All 55 original artefact hashes match; the original rejection is unchanged.
- remaining uncertainty: Static inspection is not a live limit-boundary probe or independent accounting of every provider attempt. Four distinct assistant message IDs corroborate a different count but are not a substitute enforcement counter. Full EHS adherence and release acceptance remain open.
- next: needs follow-up; add focused no-model regression coverage for a future private observer's result interpretation, preserving the eight-turn native request and all other guards. Do not retry or rescore 108, raise the limit to 11, or add EHS instructions to compensate.

## Trigger

Review of a failed developer-observation threshold and its provenance, before
proposing any criterion correction. Scope is pinned source/retained trace
analysis and documentation only. No auth, cache, permission, adapter, skill,
threshold or historical-result mutation. Stop on binary or artefact drift.

## Proposal And Claims

Treat the success result's `num_turns` as its native reported user-message
counter, not a direct comparison against the requested query-loop budget.
Future private observation tooling should preserve `--max-turns 8`, reject
native `error_max_turns` and other unsuccessful results, and retain independent
closure, startup, scoped-tool and input/parent-verification checks.
Counter metadata must remain valid and visible; discarding it or substituting
assistant event/ID counts would hide the distinction rather than fix it.
This proposal is not implemented or used to accept 108 in this review.

No new ADR is required: this review changes documentation, not the installed
method, ADR 0021's read-only adapter, a public contract or an execution boundary.

## Existing-Platform Ownership

Native Claude owns query-loop budgeting and result serialization. The reviewed
binary is 2.1.289, SHA-256
`03d66745e3bb69ec727d66023696f3820bc0a00a8a5ba725eb6706d0c67cbe69`.
The inspected normal print-mode path distinguishes:

- **Success reporting:** the engine initializes its non-deferred counter to one,
  increments it on each emitted user event, and places it in success `num_turns`.
- **Query-loop limit:** headless options forward the configured maxTurns to the
  query loop. Its guard starts at one and increments on continuation to another
  query, independently of how many user/tool-result messages were emitted.
- **Limit termination:** an attempted continuation beyond that budget emits a
  max-turn attachment/terminal reason. The result's `error_max_turns` path uses
  the limit attachment's loop count, not the normal-success user counter.

Thus the same result field is not a uniform enforcement unit across subtypes.
The original private observer assumes it is; its success `num_turns <= 8`
condition is not a faithful check of the configured loop limit.

## Durable Differentiated Value

Keep EHS standalone. Accurate evidence labels and an honest engineering receipt
matter here; implementing another budgeting runtime does not. No method or
provider-efficiency claim follows from fixing a developer-observer assumption.

## Strongest Counterargument

Relying on the native cap result does not independently prove hard enforcement,
absence of hidden provider attempts or OS containment. Do not upgrade those
claims. Equally, a known unit mismatch cannot establish an agent overrun merely
because it is a stricter-looking check. Name the actual supported boundary.

## Claim-To-Evidence Map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Successful num_turns is not the configured loop count | Native initialization, user-event increment and success serialization | Other modes/versions may differ | Pin this route; reject drift before future use |
| Run 108's reported 11 is accounted for | Initial prompt plus ten retained user events, seven results/three skill texts | Not a complete provider-attempt ledger | Do not infer eleven API/model iterations |
| The native eight-turn request is separate | Dispatch argv and headless/query-loop/limit-result source | No live at-limit enforcement probe | Keep native ownership and declared-proof limits |
| The historical result is preserved | All 55 artefacts and unchanged observer rejection verified | No prospective fix tested here | Add offline regression tests before any future criterion change |

## Minimum Credible Slice

Next, test the private observer's actual result path with local child fixtures:
a valid normal-success user-message count above eight must not be labelled an
agentic-budget breach; native max-turn/error results and missing/malformed
metadata must still be rejected. Keep the requested loop limit at eight and
test the existing catalogue/tool/path/deadline rules unchanged. Predeclare the
corrected interpretation for future use; no provider call is needed for that
regression. Do not alter permanent EHS evaluators or build a new accounting
service for this private defect.

## Stop Conditions

Stop if resolving the mismatch requires widening tools, changing the budget,
claiming independent enforcement from message IDs, modifying source/retained
108 output, reading private reasoning into a report, or invoking another model.
An unreviewed runtime/version requires fresh review, not a permissive fallback.

## Verdict

**proceed**

## Rationale

Proceed with a separately approved, focused offline regression correction for
future private observations. The semantics question is resolved for the pinned
path; historical 108 remains rejected by its original observer. Its previously
corroborated source fix and truthful verification limits remain useful evidence.
No retrospective pass, repeat provider task or full standalone qualification is
needed or justified merely to resolve this counter defect.

## Retention And Verification

Private root: `/private/tmp/ehs-claude-109.EiqMbz`. Two mode-0600 files retain a
read-only extraction/reconciliation helper and JSON evidence, with native byte
offsets and excerpt hashes; directory mode 0700. The helper reads source and
trace metadata without executing native modules or reproducing private reasoning.
Temporary retention may expire.

- Review: `3a590309f486c96372b73fc17d2683f0b286365d7559844abc4582cb7e4fe05b`.
- Manifest: `03eae332749deb0e425cd5cf2053d2647e1dfc7357a55d8c0a197315b006cba5`.

Reconciliation/pin checks, scaffold validation, local documentation links and
whitespace checks pass. Full product tests were not rerun for this review-only
diff. No product code, skill, adapter, observer gate, auth/cache, commit or
publication changed.
