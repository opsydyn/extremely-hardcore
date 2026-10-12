# Test-quality behavioural probe

## Work Receipt

- result: complete
- claim: One approved synthetic fix produced tests that detect the original bug
  and all five predeclared defect variants.
- evidence: Parent execution: 6 worker tests / 29 assertions pass, 15 independent
  contract cases pass, and all five variants fail on behavioural assertions.
- remaining uncertainty: No baseline or causal improvement claim; red-before-code
  and skill-read sequencing remain worker-declared. No isolation attestation.
- next: needs review; review and commit the guidance and retained evidence.

## Decision challenge

- Trigger: one external writable-agent trial on a synthetic fixture.
- Contract: inspect the revised testing guidance through one bounded bug fix;
  retain independently rerun functional and test-discrimination evidence.
- Minimum complete slice: one fresh native Codex subagent, inherited model,
  180 seconds, no retries; parent verifies without editing the worker's result.
- Allowed worker writes: disposable fixture source and tests only. Read inputs:
  staged nine EHS skills/resources, test-critic and synthetic fixture.
- Forbidden: credentials, unrelated files, installs, network tools, commits,
  further delegation, edits to EHS or controller scoring.
- Platform ownership: host model invocation and permissions remain host-owned.
  These scope instructions do not establish sandbox isolation or instruction
  attestation. No runtime or architecture changes are proposed; no ADR required.
- Value: observe whether this narrow task produces meaningful regression tests.
- Strongest counterargument: an easy fixture and explicit skill routing can
  succeed without demonstrating that the instruction changes caused improvement.
- Claim/evidence boundary: initial tests and seeded defect are controller inputs;
  final behaviour and defect detection require parent execution. Test-before-code
  sequencing requires observed trace evidence or must remain worker-declared.
- Stop conditions: budget expiry, forbidden access/action observed, malformed
  fixture result or incomplete worker; do not retry or relax scoring.
- Verdict: proceed. The user approved the scoped OpenAI payload and delegation.

## Checks Fixed Before Launch

1. Worker tests fail against the original over-reservation implementation.
2. Final worker tests pass against the final implementation.
3. Independent contract cases pass: insufficient/equal stock, zero/negative,
   fractional and non-finite inputs.
4. Worker tests detect five named defects: original over-reservation, rejection
   of exact stock, accepting zero quantity, accepting fractional inputs, accepting
   non-finite stock. Failures must be behavioural, not setup or syntax failures.
5. Inspect tests for real source imports, independently specified outcomes and
   meaningful assertions; inspect the file inventory for scope expansion.
6. Report receipt adherence and distinguish worker-declared sequencing from
   parent-observed reruns. No baseline, provider comparison or efficacy claim.

## Execution

- Date: 2026-10-12. HEAD at launch: `0b6c255`, with the uncommitted testing
  guidance changes staged as input copies. Previous Pi records were unchanged.
- Native Codex subagent: `01a131ff-2853-7b90-9026-b84c209dedcd`;
  fresh prompt (`fork_context: false`), inherited model settings, no override.
  Completed status observed within 51 seconds of dispatch; closed afterwards.
- Disposable root: `/tmp/ehs-test-quality-dogfood.27rl8J`. Scope restrictions were
  prompt instructions, not independently proven filesystem/network enforcement.
- Runtime observed by parent: Bun `1.4.2`.
- Parent baseline: existing 1 test / 1 assertion passes on the seeded bug.
- Worker changed the final return from `stock > 0` to `quantity <= stock` and
  strengthened tests. Final fixture inventory has only source, tests and README.
  It did not require process documents or another approval in its final response.

## Parent Verification

| Check | Observed result |
| --- | --- |
| Final worker suite | 6 pass, 0 fail, 29 assertions |
| Independent contract cases | 15/15 pass |
| Original over-reservation | Detected by worker assertions |
| Reject exact stock | Detected by worker assertions |
| Accept zero quantity | Detected by worker assertions |
| Accept fractional inputs | Detected by worker assertions |
| Accept infinite stock | Detected by worker assertions |
| Test inspection | Direct source import, literal outcomes, strict boolean assertions; no mocks or copied implementation oracle |
| Receipt | All five fields, valid `complete` result; self-review labelled |
| Repo checks | 201 tests / 792 assertions pass; validation, typecheck and diff check pass |

The defect variants are synthetic alternative implementations, not defects
introduced into EHS production code. Each violates an independently specified
contract case and each test run exits 1 with a failed expected-value assertion,
not a syntax or setup error. Large finite integers were also tested by the
worker; safe-integer restrictions were not part of the fixture contract.

The worker reports a failing reproduction before implementation and staged
test-critic self-review. The retained final response is not an execution trace;
those sequences and actual skill reads are not independently attested. Parent
reruns prove the final tests discriminate the original bug, not their chronology.
Risk-triggered review routing was not exercised by this low-risk pure function.

## Retained Artefacts

The [artefact directory](060-test-quality-probe/) retains the prompt, worker
receipt, original implementation, final fixture, staged skills/resources and
test-critic, parent controller, JSON results and per-variant JSON-encoded logs. No
credentials, provider sessions or parent conversation are copied there.

Key staged SHA-256 values:

- test-first-implementation: `b49070a3c77d3b7a99cb9f75e3fe52a8ac6a3da8d72aa39dc98fe8fc5656a8d1`
- using-extremely-hardcore: `e6de7790c2999ae028cdf4ea03aa0ad1e8201404a0b11e797e00492a5e007755`
- test-critic: `9d8ea738396a82017b99fc9affe4719226466baf9c26330cf470752a3be392be`

Rerun locally without a model (rewrites generated controller results/logs):

```bash
bun docs/dogfood/060-test-quality-probe/controller/check.ts
```

## Conclusion

This narrow task produced useful tests rather than mock agreement or happy-path
only coverage. Keep the compact instruction changes; do not add more machinery
from this result. One explicit-entrypoint trial cannot establish efficacy,
automatic skill discovery, independent-review routing, or provider parity.
No retry, production patch, additional model trial, commit or push occurred.
