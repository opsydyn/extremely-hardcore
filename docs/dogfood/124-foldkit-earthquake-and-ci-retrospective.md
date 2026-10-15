# FoldKit Charts And CI Retrospective

Recorded 2026-10-14; consolidated 2026-10-15 after the radar merge. Approved
retrospective of ordinary engineering work in `opsydyn/fold-kit-experiments`,
not an additional protocol-campaign run. Keep this existing record/path rather
than create another campaign case or per-skill document.

- result: complete
- claim: The recorded earthquake globe, mobile feedback repair, bounded release-changelog normalization and functional/AI radar are merged; the retrospective preserves failures, recovery and qualification limits without changing EHS.
- evidence: Retained chart receipts report regression, browser and build checks. The original 2026-10-14 review confirmed the globe/CI merges and post-merge CI below; fresh 2026-10-15 GitHub reads confirm radar PR 24 merged and its PR check succeeded. Local verification counts are historical receipt evidence, not rerun by this consolidation.
- remaining uncertainty: This mixed EHS/Superpowers session has no baseline, cost measurement or isolated released-skill delivery proof. Physical-device, Safari and screen-reader acceptance are not established. The normalization write path remains unqualified.
- next: needs follow-up; return to the standalone release-acceptance track in the roadmap, not further internal chart tasks or skill expansion. Actual released-package implementation/verification remains open. Observe normalization only on the next genuine package release, without manufacturing a release, retrying the writer or weakening checks.

## Work And Evidence

The user's constraints were a recorded earthquake snapshot, pure FoldKit/SVG,
no new rendering dependency, inline development and separately approved
publication. Sphere primitives belong to Viz; application-specific layout,
data, selection and gestures belong to the application. The original globe
changed public geometry/provenance, followed by a bounded UI fix and separately
approved CI/security-boundary work; the later radar reused the sphere helpers.

- [PR 19](https://github.com/opsydyn/fold-kit-experiments/pull/19) merged the globe at `b524988373e86ecd6d07914b2c49fe7a456cca1a`. Its retained execution receipt reports 377 accepted snapshot observations, 21 geometry tests, 378 web tests, SVG raster checks and five browser passes with one intentional desktop-touch skip. These are historical receipt-reported checks, not rerun for this retrospective.
- [PR 21](https://github.com/opsydyn/fold-kit-experiments/pull/21) merged the three-file mobile repair at `b7e7c3b62917d770875c7d03e019801a1c925dc2`. The retained regression failed on the unchanged 390x844 layout because the selected location heading had viewport ratio zero; after the CSS repair, feedback was visible without auto-scroll or duplicate state. Its final browser receipt reports seven passes and one intentional skip.
- [PR 22](https://github.com/opsydyn/fold-kit-experiments/pull/22) merged changelog repair and the native-gate ADR. [PR 23](https://github.com/opsydyn/fold-kit-experiments/pull/23) merged the five-file normalization hook at `f2cc4000cd575d710a8c5bd28ea5ad9ea9797f37`. The preceding local receipt reports 28 hook tests and 918 total passes with one existing artifact skip; hook tests replace only GitHub transport.
- The original 2026-10-14 GitHub reads of [main CI](https://github.com/opsydyn/fold-kit-experiments/actions/runs/38619060944) confirm lint/format, typechecks, tests and production build all passed on that exact merged revision. Its [release workflow](https://github.com/opsydyn/fold-kit-experiments/actions/runs/38619060776) reports `release: success` and `normalize-changelogs: skipped`; release-please found no user-facing package commits requiring a release PR. This consolidation does not refresh that historical writer observation.
- Fresh 2026-10-15 reads confirm [PR 24](https://github.com/opsydyn/fold-kit-experiments/pull/24) merged the functional/AI radar at `670a00833a353cdef2aba1fbb8172135890028a9` on 2026-10-14. Its [PR CI](https://github.com/opsydyn/fold-kit-experiments/actions/runs/38639889138), reporting head `73a087a8316cf62752e7df913ee97da1ca7b9c56`, passed strict lint/format, typechecks, workspace tests and build. This is PR CI evidence, not a new post-merge-main, deployment or release-writer claim.

## Radar Evidence And Recovery

The [committed radar receipt](https://github.com/opsydyn/fold-kit-experiments/blob/670a00833a353cdef2aba1fbb8172135890028a9/docs/superpowers/plans/2026-10-14-functional-ai-radar.md#execution-evidence)
retains the original 32-entry demo scope, pure FoldKit/SVG boundary, scoped
input lifetime and local verification. It reports 55 radar tests and 973 total
workspace passes with one existing skip, not 973 tests of EHS. The combined
radar/globe Chromium suite reports 16 passes and two deliberate desktop-touch
skips; both mobile emulated-touch journeys passed. All 32 radar records were
individually inspected in both viewports. These counts are receipt-reported,
not fresh execution or independent attestation in this retrospective.

Browser checks reproduced focus loss when a selected keyed marker moved to
the end of the SVG. Stable interactive targets plus inert foreground paint
restored keyboard focus without imperative focus repair or shared runtime
changes. A fresh read-only reviewer then identified intercepted browser modifier
shortcuts and missing complete shell outlines. Both findings gained failing
regressions before repair; the parent reran the full suite, build and browser
checks. The reviewer did not rerun those checks or perform a second review.

The record also preserves two executor mistakes: a geometry checkpoint was
committed before strict lint passed, then corrected in a separate commit;
later full-suite verification overlapped a typecheck-triggered package rebuild
and failed an existing HTTP smoke. The unchanged serial rerun passed. These
are failures and recovery, not evidence that EHS prevented them or that
infrastructure failure supplied a meaningful product RED.

Historical chart receipts and scope are retained in the
[FoldKit implementation plan](https://github.com/opsydyn/fold-kit-experiments/blob/f2cc4000cd575d710a8c5bd28ea5ad9ea9797f37/docs/superpowers/plans/2026-10-14-earthquake-globe.md).
The gate and normalization decisions remain in that repository's ADRs 0001 and
0002. This record does not duplicate or supersede them.

## Friction And Disposition

| Observation | Response and limit |
| --- | --- |
| Correct selection state did not ensure visible mobile feedback | Assert the actual selected content's viewport visibility at the production-browser boundary; repair the existing layout rather than add state or auto-scroll. |
| Concurrent package builds invalidated an early browser attempt | Reject that attempt as evidence; run build and browser verification serially. Missing-browser startup failures are not meaningful RED tests either. |
| A radar checkpoint was committed before strict lint passed, and later checks again overlapped shared builds | Retain the failed checkpoints and subsequent correction/serial verification; do not describe this as reliable prevention or relax repository checks. |
| Passing unit checks missed browser focus loss and two independent-review findings | Test actual keyboard focus, browser default-action handling and rendered shell outlines. Add discriminating regressions before fixing the observed defects. |
| Release generation repeatedly produced formatter-incompatible changelogs | Preserve strict checks and native merge enforcement. Add only a trusted-source, two-changelog, head-checked hook with no retry, force-push or merge authority. |
| A green release workflow did not exercise the writer | Retain the skipped result honestly. No live permission, atomic-write or final bot-revision CI qualification follows from an idle run. |
| CI recovery displaced chart work | Recovery was separately scoped and approved before returning to the chart. The consolidated next step is now EHS acceptance, not more chart work. No operator-time or productivity effect was measured. |

No demonstrated failure requires changing skill instructions. The discriminating
regressions, source notices and repository-local ADRs already retain the useful
reasoning. Do not promote this experience into another mandatory checklist.

## Roadmap Disposition

Close this mixed-method engineering observation and return to the
[standalone release track](../../ROADMAP.md#ship-ehs). No new ADR is required:
documentation consolidation preserves ADR 0023's standalone-method boundary
and does not change runtime, host authority, public support or release policy.
No further coached internal task is proposed merely to increase a dogfood count.
The next acceptance gap is fresh-session use of the actual released package
for a bounded real implementation/verification task, starting with a selected
Codex route. Repository/task choice, payload consent and any execution remain
separate; this record does not launch that work or clear a host gate.

## Qualification And Retention

This was ordinary host-guided engineering, not a controlled EHS-effect trial,
provider comparison, new fresh-session test or proof of the released ZIP being
loaded throughout. There was no protocol run, completion-gate attestation or
fingerprint-bound projection for this work; it does not extend the ten-run
campaign or satisfy its separate release-evidence gate. Cost, human active time,
false-block rate and fresh-agent readability were not measured.

The historical browser evidence is Chromium viewport/emulated-touch evidence,
not physical-phone or Safari acceptance. Private reasoning, credentials and
host captures are not included. GitHub links and committed receipts retain the
decisive summaries; Actions logs, local logs and screenshot artifacts may expire.
No extra model trial or private trace archive was created for this retrospective.
The radar's actual read-only reviewer belongs to the engineering work, not an
isolated EHS-effect experiment. Ambient Superpowers, repository instructions and
human guidance remain attribution limits; do not infer comparative quality,
productivity, cost, provider parity or successful released-ZIP installation.

**Live normalization qualification remains pending the next genuine package
release.** At that point inspect the actual PR output, token-authorized job,
exact formatting-only commit, head pin and required CI on the final revision.
Preserve existing human workflow approval. A skipped or no-op result is not
write-path evidence. No dispatch, synthetic release or retry is approved here.
