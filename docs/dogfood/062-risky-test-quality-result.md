# Risky test-quality checkpoint trial

## Work Receipt

- result: complete
- claim: One approved checkpointed synthetic security fix preserved the failing
  regression before implementation and received independent review without blockers.
- evidence: Parent red: 38 relevant assertion failures on unchanged source; final
  green: 105 passing tests, 22 independent cases and original/four variant detections.
- remaining uncertainty: Checkpointed, not spontaneous TDD; role use/routing is not
  tool-attested. One optional durable test improvement remains. No real security
  integration, isolation proof, baseline comparison or efficacy claim.
- next: needs review; review and commit the proposal, result and evidence only.

## Approved Contract and Decision

The user approved [proposal 061](061-risky-test-quality-proposal.md) and its fresh
scoped OpenAI payload: one worker with a 240-second total active budget across
two phases, one read-only reviewer with 90 seconds, inherited model settings,
no retries or further delegation. No credentials, unrelated project files or
parent conversation are supplied. Source and test writes are restricted by
instructions to the disposable fixture; host isolation is not attested.

Decision challenge verdict: proceed. Native model execution and permissions
remain host-owned; EHS owns concise engineering guidance. The counterargument
and evidence limits in proposal 061 remain applicable. No EHS architecture or
runtime changes are proposed, so no new EHS ADR is required. The fixture includes
an accepted ADR defining the intended policy; this is a bug fix to that policy.

Minimum complete work: one test-only worker checkpoint, parent-captured red
evidence against unchanged source, same-worker implementation resume, independent
checks and separate review. No remediation after review, model retry, production
patch, Pi work, commit or push is authorised by this execution.

## Frozen Criteria

1. The test-only phase leaves source and policy inputs byte-identical. Snapshot
   tests and source and observe a relevant failing assertion before releasing
   implementation. Incidental failures do not clear the checkpoint.
2. Final worker tests pass; independent policy cases pass.
3. Worker tests detect the original cross-tenant admin defect and four named
   variants: missing tenant identity allowed, unknown role allowed, cross-tenant
   admin allowed, valid same-tenant reader denied. Defects must violate the
   independent contract; detection must be behavioural, not syntax/setup failure.
4. A fresh independent reviewer assesses real production-path tests, meaningful
   expected values/assertions and consequential policy coverage without modifying
   files. Findings remain findings; do not fix the worker output during the trial.
5. Report worker role handling and receipt, distinguishing declared self-review,
   controller-prompted independent review and observed evidence. Do not claim
   spontaneous test-first behaviour, automatic skill routing or instruction use
   from the forced checkpoint/dispatch alone.

Stop on observed forbidden action, source/policy drift at the first checkpoint,
budget expiry, missing worker/reviewer output or incidental red failure. Do not
relax criteria, retry a model or patch the result to create success.

## Execution

- Date: 2026-10-12. EHS HEAD: `ff8d565`; staged skills and critic roles are
  copied from that checkout. Prior Pi records were not changed.
- Root: `/tmp/ehs-risky-test-quality.TY7utA`; runtime Bun `1.4.2`.
- Worker: `01a1320b-22cd-7c40-9808-38545a4a3cff`; fresh prompt, inherited
  model/settings, no explicit override or independent model attestation.
- Parent baseline: 2 tests pass despite cross-tenant admin access being granted.
- First worker phase stopped with tests only. Parent snapshot confirmed source,
  README and accepted ADR byte-identical to initial inputs. Parent checkpoint
  execution at `2026-10-12T21:37:18.862Z` exited 1 with 67 passing and 38 failing
  assertions, specifically admin tenant mismatch/invalid-identity grants.
- Implementation release was submitted at `2026-10-12T21:37:36.984Z`, after the
  captured failing command finished. This is observed checkpoint ordering, not
  proof of spontaneous TDD or absence of intermediate edits and restoration.
- Same worker resumed and changed only the source in the second phase. Exported
  types/signature and accepted ADR remained unchanged. Worker was then closed.
- Conservative observed active upper bound: 163 seconds across phases, within
  the 240-second budget. Parent verification time between phases is excluded.
- Worker declared architecture/delivery/test self-review and explicitly named
  pending independent review. These statements are not tool-level skill-use
  attestation. All five receipt fields and valid `complete` value were present,
  bounded to the authorised phase rather than broad security completion.

## Parent Results

| Check | Observed result |
| --- | --- |
| Test-only source/README/ADR preservation | Exact bytes match initial snapshots |
| Parent checkpoint red | 67 pass, 38 fail; expected false, actual true |
| Final worker tests | 105 pass, 0 fail, 105 assertions |
| Checkpoint tests on final source | 105 pass; final test bytes unchanged |
| Independent policy cases | 22/22 pass |
| Original tenant-bypass implementation | Worker assertions fail |
| Allow missing tenant identity variant | Worker assertions fail |
| Allow unknown role variant | Worker assertions fail |
| Allow cross-tenant admin variant | Worker assertions fail |
| Deny valid same-tenant reader variant | Worker assertions fail |

Every named defect violates an independently specified contract case; failures
are behavioural assertions, not syntax/setup errors. The original and named
cross-tenant admin variant deliberately overlap; five detections are not five
distinct policy gaps. Counts alone are not a test-quality measure.

Observed fixture inventory remains source, tests, README and the pre-existing
ADR. No additional process document was created in the fixture. Source and test
scope restrictions remain instructions, not host-wide access attestation.

## Independent Review

Fresh read-only reviewer `01a1320d-e8f7-7412-8f9a-22e6ec595b7e` dispatched with
a 90-second budget, no conversation fork or explicit model override. Worker
receipts were excluded from reviewer inputs. Completed review observed within
79 seconds, then reviewer closed. No blocking findings. The reviewer assessed
direct source imports, literal contract-derived expected values, strict boolean
assertions, rejection paths and positive cases. Parameterisation was judged
readable/proportionate; two original reader tests duplicate matrix cases slightly.

Optional finding at fixture `access.test.ts:54`: retain `__proto__`, `constructor`
and `toString` in the worker role table to protect against a future plain-object
allowlist accepting inherited properties. These already pass the parent's
independent cases and the current implementation is not vulnerable. No worker
patch or EHS instruction change was made in response.

The reviewer reports separate read-only Bun runs and hash checks. Its report is
an independent-agent assessment; raw reviewer tool traces were not retained, so
its command execution is reviewer-declared rather than separately host-attested.
Parent commands/results remain independently captured. File hashes remained
unchanged after review, but that does not attest all host access or intermediate
writes. Explicit reviewer dispatch does not prove autonomous risk-based routing.

## Retention and Reproduction

The [artefact directory](062-risky-test-quality/) retains initial and final
fixtures, checkpoint source/tests, staged skill/role resources, both worker
prompts and phase receipts, reviewer prompt/report, dispatch/completion metadata,
parent source diff, controller results and JSON-encoded command output.
Receipts/review text is an archival rendering of returned content, not a private
reasoning dump or native event transcript. No credentials or provider session
capture is included.

Hashes:

- Initial/checkpoint source: `109def7e64660b469a092ffc9dca7f9b1affdc2788bc2634e00441d0f514cb72`
- Final source: `bf688312b1fa316ce35fa635083b0b21c13c2c91d3a30983ab85c3e65798ead2`
- Checkpoint/final tests: `27dc17476785d5914be213534b448c70dd283bd31ef13279cca3289d6efca806`

Rerun final verification without a model (rewrites generated final/variant
results, not the original checkpoint capture):

```bash
bun docs/dogfood/062-risky-test-quality/controller/check.ts final
```

Do not rerun `checkpoint` against the final fixture: that is a live pre-patch
observation step, not replayed chronology. Captured checkpoint timestamps precede
implementation release; final reruns cannot recreate that historical ordering.

Repository verification: 201 tests / 792 assertions pass; validation, typecheck
and diff checks pass. No production changes, Pi work, retry, commit or push.

## Conclusion

The trial clears its checkpoint, functional, mutation-discrimination and
independent-review criteria within the agreed budgets. Keep existing compact
guidance. The optional future-proofing test belongs in a later fixture change,
not a new skill or framework. Unprompted risk routing and spontaneous test-first
behaviour remain unqualified; do not turn this result into a broad adoption claim.
