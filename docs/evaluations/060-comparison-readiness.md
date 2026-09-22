# Comparison readiness: local preflight

Date: 2026-09-20. Inspection of the current working tree; no model/provider run.

The preflight below is historical. See the approved scorer correction at the end
for the resolved scoring gap; the comparative-execution hold remains current.

## Contract and architecture

Assess pinned skill selection, loading evidence, trace capture, and independent
scoring before comparative execution. Read local adapters, run deterministic
controls, and record gaps. No provider configuration, runtime, schema, sandbox,
or scoring changes are authorised by this assessment. No new ADR is required
for this documentation-only result; future provenance changes need their own review.

## Trigger and proposal

Comparison-readiness review under `decision-challenge`. Proposal: use the existing
evaluation adapters to establish a baseline-versus-pruned EHS comparison.

## Existing-platform ownership

The host owns model dispatch, skill loading, permissions, and available telemetry.
EHS should verify what the host exposes, not implement a new runtime or infer
enforcement from requested settings.

## Durable value and strongest counterargument

EHS can supply task definitions, independent checks, pinned source provenance,
and evidence interpretation. The strongest reason not to run the comparison now
is that neither the experimental treatment nor the classifier's discrimination
is established. More repetitions would not fix either defect.

## Claim-to-evidence map

| Requirement | Current local evidence | Gap |
| --- | --- | --- |
| Select a skill build | `run-codex-adapter.ts` writes `options.mode` into report metadata | Mode does not select, load, or exclude an EHS build; no pinned skill path/digest |
| Observe loading | Neither Codex adapter verifies which EHS files were consumed | Model output and declared mode cannot establish treatment |
| Retain trace | Action adapter captures stdout JSON events, prompt, stderr, invocation, optional final message, and digests | No loading attribution or usage interpretation; read-only adapter discards stdout |
| Protect expected answers | Real process prompt uses global vocabulary, not per-case expected answers | Read-only executor request still carries `expectedErrorCode`; injected executors must not be treated as independent evidence |
| Discriminate outcomes | Assessor checks whether expected codes are present | Extra allowed codes do not fail assessment |
| Execute safely | Existing documents retain containment gaps | This preflight does not establish current provider auth, isolation, or accepted writable execution |

## Deterministic negative control

Computed the union of all six allowed observation codes and supplied that same
array to `assessAgentAttempt` for each of the 13 agent-attempt scenarios.
Observed: **13/13 passed**. No model, network request, or provider process was used.
This proves a present scorer weakness, not that earlier agents used this strategy.

Existing focused tests: `bun test ./tests/evaluation/codex-adapter.test.ts
./tests/evaluation/codex-action-fixture-adapter.test.ts
./tests/evaluation/agent-attempts.test.ts` passed 10 tests with 70 assertions.
Green existing tests therefore do not establish this negative-control property.

## Minimum credible slice and stop conditions

First reproduce extra-code acceptance in a regression test and correct it without
changing the scenario oracle to fit results. Review any resulting report-contract
impact before implementation. Then verify a host-supported pinned-build and trace
path with a bounded loading probe before attempting repeated comparison.

Stop comparative execution while selection/loading, scorer discrimination, or
the applicable containment boundary is unresolved. Do not invent performance
thresholds after seeing outcomes or add a new dispatch framework to bypass gaps.

## Verdict and receipt

Verdict: **hold** on comparative execution.

- result: blocked
- claim: Existing adapters do not yet establish a credible EHS comparison.
- evidence: Local source inspection, all-codes negative control, 10 passing existing tests.
- remaining uncertainty: Current provider capability and authentication were not tested.
- next: Fix the scorer's extra-code acceptance with a focused regression test.

Recommendation: hold. This preflight is complete; the comparison is not ready.

## Approved follow-up: strict code-set scoring

The user approved a bounded regression fix after this preflight. Scope: reject
surplus observations without changing expected answers, provider execution,
thresholds, or report structure. Reviewed against ADR 0006: the assessor remains
pure and provider-neutral; no new architectural boundary or ADR is needed.
Scoring is intentionally stricter: consumers must not interpret an empty
`missingErrorCodes` list alone as a pass. Expected and observed lists already
retain enough information to inspect surplus-only failures.

Host-captured verification:

- Before implementation, the two focused test files produced 5 passes and 16
  failures, all from surplus-code acceptance (including the aggregate control).
- After implementation, `bun run test`: 160 passed, 0 failed, 543 assertions.
  This includes exact-answer positive controls and all-codes negative controls
  across all 13 scenarios, aggregate rejection across three repetitions, unknown
  surplus rejection, and duplicate expected-code acceptance.
- `bunx --no-install tsc --noEmit` and `bun run validate` exited 0.

- result: complete
- claim: The assessor rejects missing or surplus codes with unchanged report shape.
- evidence: Failing regression tests before the fix and full-suite checks after it.
- remaining uncertainty: No provider runs or historical-score reassessment; loading,
  trace, and containment gaps remain.
- next: Assess a host-supported pinned-build/loading and trace probe.

Recommendation: needs follow-up. The scorer correction is complete, not comparison readiness.
