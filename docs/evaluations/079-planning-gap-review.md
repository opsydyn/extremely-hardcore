# Planning gap review

Date: 2026-09-27. Offline controller follow-up to
[the version 2 result](078-codex-version-2-planning-result.md).

- result: complete
- claim: The proposal's concrete numeric witness and ADR applicability are resolved by reviewer evidence, without revising the original agent-response assessment.
- evidence: Original `80abc` input returns `80`; proposed guard rejects it; 28 local fixture checks pass; architecture-decision trigger review concludes no ADR is required.
- remaining uncertainty: These are copied reviewer fixtures, not a production checkout or a new agent trial. Cross-host adherence and full standalone acceptance remain unverified.
- next: needs follow-up; prepare an equivalent Claude planning acceptance trial rather than expand EHS instructions to repair two explanation omissions. Execution requires a bounded plan and payload consent.

## Concrete Witness

The original supplied function computes `Number.parseInt("80abc", 10)` as
`80`. Its integer/range condition therefore accepts the malformed input.
The proposed additional rejection condition,
`text.length === 0 || /[^0-9]/.test(text)`, rejects `80abc` with exactly
`Invalid port` while retaining the original conversion and range checks.

This time the witness was actually executed by the controller. It must not be
attributed to the trial agent, which correctly reported no executed tests.

Command: `bun test /tmp/ehs-079-plan-review.test.ts` on Bun `1.4.2`.
Result: 28 pass, 0 fail, 28 assertions. One original-behaviour witness,
six valid-input checks and 21 malformed/range checks. The reviewer fixture
copies the supplied function and adds exactly the proposed predicate to the
rejection condition; it does not edit or implement a user repository.

Checks include 1/65535 boundaries, leading zeroes, zero/out-of-range values,
empty input, numeric prefixes, signs, fractions, exponents, whitespace, hex,
non-ASCII digits, LF/CRLF, NUL, 10,000 nines and 10,000 leading zeroes followed
by 1. Invalid cases assert the exact error message. Finite tests support these
cases, not every possible input or a production integration.

Temporary test SHA-256:
`4c055bdc1036c56819925081706ffa8ac95714046f4ac959017fb6f991125d5f`.
The file may disappear; it is not part of the installed skill or ongoing suite.

## ADR Decision

**No ADR is required for this fixture's proposed correction.** It restores
the already supplied input rule. It introduces no runtime, framework,
dependency, persistence, schema, authentication, deployment, CI, observability,
ownership, cross-context or architectural change. The function signature and
existing error message are preserved. No actual public integration or caller
contract is available to change in this planning-only fixture.

This conclusion is fixture-specific. A real repository with a conflicting
accepted contract or material caller dependency would require renewed scope
and ADR assessment. No empty ADR directory or new decision record is needed.

## Acceptance Disposition

Record 078 remains a 6/8 assessment of the agent's original response. The
missing explanations remain known omissions, not unresolved facts about the
proposed fix. Reviewer supplementation does not turn that response into 8/8,
prove unaided adherence or establish causal EHS effect. No scoring criteria
changed and no model was invoked. Do not add mandatory witness/ADR boilerplate
to every EHS task based on this single constrained case.

The two proposal questions are closed; broader standalone qualification remains
open. A further Codex repetition purely to obtain preferred wording is not the
recommended next slice. Prepare the already-roadmapped equivalent Claude
planning trial, keeping evidence and release claims host-specific. Distribution
remains last and comparisons remain hold.
