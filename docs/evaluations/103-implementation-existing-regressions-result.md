# Implementation Under Existing Regressions

Date: 2026-10-13. One newly authorised native Codex worker under
[review 102](102-implementation-checkpoint-review.md), not a resumed worker or
extension of [result 101](101-implementation-dogfood-budget-stop.md).

- result: complete
- claim: One bounded label-merge fix passes the unchanged existing regressions and independent contract checks within the approved wall-clock cap.
- evidence: Worker closed after 91.955 seconds. Parent verifies only merge-labels.ts changed; all 13 tests/22 assertions and nine independent cases pass. Test, README and staged guidance bytes are unchanged.
- remaining uncertainty: Worker-internal command chronology, actual skill reads, exact model/instruction delivery, usage/cost and host-wide access are unattested. This is implementation under supplied tests, not spontaneous TDD, EHS effectiveness, Pi qualification or full standalone acceptance.
- next: needs review; review and commit the pending evidence/roadmap updates. Keep EHS instructions unchanged and standalone host acceptance open.

## Approved Scope And Decision

The user approved the explicit fresh OpenAI payload: synthetic label-merge
requirements/source, the 13 retained regression tests, nine EHS
skills/resources and test-critic, through one native Codex subagent. Only the
disposable merge-labels.ts could change. No retries, installs, unrelated network
tools, git, reviewer agent, further delegation or EHS edits were authorised.

Decision challenge verdict for this execution: **proceed**. The pending consent
in 102 was resolved by the new approval; its original review remains historical.
The platform owns execution and permissions. Prompt restrictions do not prove
isolation. The strongest counterargument remains that supplied tests narrow the
exercise and remove test-authoring from the observation. No new architecture,
dependency, public API or permission mechanism was introduced; no EHS ADR needed.

Minimum complete work was one uninterrupted fix under qualified regressions,
then independent parent verification without repairing worker output. A fresh
private fixture was prepared before dispatch. Original/reference/ordering
variants passed 4/9, 9/9 and 6/9 parent cases respectively. The existing tests
failed on the original source with six passes and seven duplicate-output
failures, not setup/import failures. Source/test hashes matched 101. All 17
staged guidance/resource files matched the current repository before launch.
Prior test-discrimination evidence in 102 is reused, not rescored as a new
worker test-writing result.

## Execution

- HEAD: `cbdd7b2c3d1e278978a23920a07a25c47ee466b5`; the pending documentation
  did not change installed skills or product code.
- Worker: `01a134d3-86ee-7483-a995-ab41dd243b74`, native nickname Turing.
- Fresh prompt with fork_context false; inherited model/effort, no overrides.
  No parent conversation, controller oracle, reference implementations,
  credentials, unrelated project files, memories or provider captures were
  deliberately staged. Platform-mandatory visibility is not independently
  attested.
- Dispatch initiated `2026-10-13T10:34:00.297Z`; deadline
  `2026-10-13T10:37:00.297Z`. Completed status was observed and the worker
  closed at `2026-10-13T10:35:32.252Z`, 91.955 seconds after initiation.
- The 180-second wall-clock cap included native startup, parent waits and
  closure. Local preparation preceded it; independent final checks followed
  closure. No follow-up prompt, release checkpoint, resume or retry occurred.
- Parent final verification was captured at
  `2026-10-13T10:35:54.830Z` and `2026-10-13T10:35:54.838Z`.

This observed elapsed bound is not exact model compute time, a speed comparison
with 101 or a cost estimate. There was no second phase to coordinate.

## Parent Acceptance

| Frozen requirement in 102 | Parent observation |
| --- | --- |
| Completed worker within the cap | Completed native status and closure within 92 seconds |
| Only source changes | Fixture file inventory unchanged; only merge-labels.ts hash differs |
| Fixed inputs stay unchanged | Tests, README and all staged guidance byte-identical |
| Existing regressions pass | 13 pass, 0 fail, 22 assertions; exit 0 |
| Independent contract cases pass | 9/9; exit 0 |
| Honest receipt | Five fields; actual claimed red/green commands; self-review and lack of independent review explicitly labelled |

Parent diff inspection found a call-local Set added to the existing trim/filter
path. Identity is String.toLowerCase; first spelling/order are retained without
sorting, normalization, input mutation or cross-call state. The exported
signature is unchanged. No blocking findings in this local source inspection;
it is not a separate reviewer-agent assessment.

The worker declares running the existing tests before editing and after the
fix. Parent independently captured pre-dispatch red and post-closure green on
the unchanged test bytes. Worker-internal sequencing and actual skill use remain
declarations, not tool-attested chronology. These were pre-existing tests; do
not combine 101 and 103 into a single worker-authored red-green history.

## Retention And Reproduction

Private root: `/private/tmp/ehs-implementation-103.JLm4bJ`. It retains the
original/final source, fixed tests/README, staged skills/critic, prompt,
dispatch/completion/closure metadata, exact returned worker receipt, parent
controller, qualification logs and final command records. Thirty-seven files
are SHA-256 pinned in controller/artifacts.json and verified as regular,
non-symlink mode-0600 files. Directories have private permissions. Temporary
retention may expire; review/redact before sharing. No raw provider session or
private reasoning transcript is retained.

- Original source: `017be8a1bc3d8a6830cda26cd5fffc14354cec7ac3dcf85b39bf2c1440e891e0`.
- Final worker source: `5c58d117efe9afdfc2645482fc7e3b76dbeb9c883f92ca4558e6174b1c53aa95`.
- Unchanged tests: `afc6e9c732eb5fba31be29386472e92322840726ff8c71c893bcfa5faaac2ec0`.
- Worker prompt: `d042e4dc272c9d1e42d88a86d643e9c9cb198076a70bb05c3de28209017d6bcf`.
- Manifest: `ebd84856d379e277c4077e11140af0e254623c97a351c021571bf24f7872c37e`.

While retention exists, reproduce the focused final suite without a model:

```bash
cd /private/tmp/ehs-implementation-103.JLm4bJ/fixture
bun test ./merge-labels.test.ts
```

The parent also reverified all 48 previous retained artifacts against 101's
manifest; no old attempt was repaired or rewritten. The final fixture has exactly
the three allowed file entries; staged skill directories match the repository
and all private directory modes are 0700. Repository scaffold validation, 114
local links across the six pending documents and whitespace/diff checks pass.
Product tests were not rerun for these documentation-only repository changes.
No commit or publication occurred.

## Disposition

All predeclared requirements for this narrower observation are met. Keep
existing concise EHS guidance: no instruction expansion follows. The
single-phase route completed on this case, without proving that removing the
handoff caused success or that EHS improved the outcome. Broader host acceptance,
Pi writable boundaries, comparisons and release decisions remain separate.
