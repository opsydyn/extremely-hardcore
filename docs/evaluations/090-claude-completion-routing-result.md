# Claude Completion Routing Result

Date: 2026-10-05. One scoped, explicitly approved Anthropic attempt under
[plan 089](../implementation-plans/089-claude-completion-routing-check.md).

- result: complete
- claim: The bounded planning observation completed and included a valid planning-only receipt; seven of eight fixed criteria pass, not full standalone acceptance.
- evidence: One process, 21,633 ms, six reported turns, native success and exit 0, EHS entrypoint invocation plus three successful in-tree reads, 599-word final, unchanged workspace/skills/settings and no permission denials. Separate offline candidate checks pass.
- remaining uncertainty: Explicit no-ADR conclusion is absent. This repeated development case does not establish causality, efficiency, isolation, implementation behaviour or release readiness.
- next: needs follow-up; retain the clarification and review accumulated local changes before the next independently authorised acceptance slice. Do not add no-ADR boilerplate or repeat this fixture to chase 8/8.

## Delivery And Boundaries

Fresh preflight passed the pinned CLI 2.1.289, first-party claude.ai auth route,
configuration checks, source/staged/manifest hashes and plugin diagnostics.
Doctor again reported remote managed settings not fetched because the
subscription is not Enterprise/Team. Native startup satisfied the reviewed
catalogue predicate: model `claude-sonnet-5-5`, dontAsk, exactly Read/Skill,
no MCPs, EHS plus the same three built-in plugins and seventeen built-in skill
names. Those additional names did not authorise their invocation.

Observed actions, with successful corresponding results:

1. Skill `extremely-hardcore:using-extremely-hardcore`.
2. Read `plugin/skills/change-contract/SKILL.md`.
3. Read `plugin/skills/test-first-implementation/SKILL.md`.
4. Read `plugin/skills/evidence-ledger/SKILL.md`.

The entrypoint body was found in native user-text events. Each Read result,
after removing the host's line-number prefixes, matches the full staged file.
An initial body search without removing those prefixes did not match the Read
results; that was an offline comparison limitation, not missing delivery.
These are native instruction/read events, not attestation of all service request
bytes or preventive isolation. No tests, writes, shell, web/app calls,
delegation, outside-tree reads or non-EHS Skill calls were observed.

Result: success, is_error false, exit 0, six reported turns and empty permission
denials. No deadline or budget error, retry, resume or fallback occurred. The
eight-turn limit and 180-second deadline were unchanged. The final is **599
whitespace-delimited words**, meeting the requested under-600 limit.

## Fixed Assessment

Manual assessment against all original criteria in plan 072:

| Criterion | Result | Evidence |
| --- | --- | --- |
| 1. Scoped contract without ceremony | Pass | Minimum complete change, allowed/forbidden scope, signature/error constraints and no scaffolding |
| 2. Numeric witness, honestly labelled | Pass | `1e3` explicitly parsed as 1; receipt says source reasoning only and no commands/tests run |
| 3. Regression and relevant cases | Pass | Malformed-input tests fail before fix; valid boundaries, zeroes, signs, whitespace, fractions, non-ASCII and range cases |
| 4. Complete small implementation | Pass | Adds full-string ASCII digit check before existing parse/range validation; no dependency |
| 5. Explicit no-ADR decision and rationale | Fail | Says nothing touches architecture/domain boundaries/persistence but does not explicitly conclude no ADR is required; do not infer the missing conclusion |
| 6. Approval and planning boundary | Pass | Implementation remains future work; no extra routine approval requested for this planning task |
| 7. Compact five-field receipt | Pass | Valid complete result, planning-only claim, agent-reasoned evidence, unperformed implementation/tests, uncertainty and follow-up recommendation |
| 8. Complete retained delivery/boundaries | Pass | Exact task/argv, native events/final/usage, matching inventory/hashes and no observed out-of-scope action |

The receipt is at the end of the response, not the beginning; criterion 7 asks
for its compact five-field shape and scope, not a response-position score.
Do not silently add another criterion. The next field asks to authorise future
implementation, with a separate valid needs-follow-up recommendation; this does
not claim current planning approval permits implementation.

This is **7/8**. Trial 087 remains 6/8 and earlier results are unchanged. The
receipt observation is consistent with the routing clarification but cannot
establish that the two sentences caused it. Tool choice, model variation and
host context remain confounders. Do not use elapsed time, turns, words or tokens
to claim an efficiency improvement. Full standalone acceptance remains open.

## Independent Candidate Checks

The proposed change keeps Number.parseInt and its existing integer/range checks,
adding `if (!/^[0-9]+$/.test(text))` with the existing Invalid port error first.
The controller extracted the TypeScript candidate from the retained final and
transpiled it locally, outside model-readable staging. Six valid and twenty-two
invalid assertions pass, including LF/CRLF, NUL, non-ASCII and 10,000 nines.
An additional 1,000-leading-zeroes-plus-80 assertion passes. Original `1e3`
returns 1. These are controller-run finite checks, not agent-executed tests or
production implementation evidence; they do not supplement the response score.

No inaccurate original-isInteger explanation from trial 087 was repeated.
The proposed regex rejects the tested trailing newline inputs in JavaScript;
this is not a general claim about `$` semantics across regex engines or flags.

## Usage And State

Host-reported usage: 6 ordinary input tokens, 9,291 cache-creation input tokens,
18,311 cache-read input tokens and 2,550 output tokens including 543 thinking
tokens. Reported USD 0.0663382 is a list-price estimate, not a subscription
charge. No comparative cost claim follows.

Source/staged skill hash before and after:
`3dec2859e4bc45808c1d5c3a381789b393f778e947ba95bd9feecf18ef505be1`.
Workspace inventory before and after:
`47b220030abf49a117abf6bf12e7992e806a38e4044347edd6c5beec4b2ffbda`.
Saved user settings unchanged. No skill, host setting, auth mechanism, adapter,
public contract or architecture changed during this trial; no new ADR required.

## Private Retention

Root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-claude-089-htrrEX`.
Files are outside staged workspace; review private traces before sharing.
Temporary retention can disappear.

| Artefact | SHA-256 |
| --- | --- |
| report.json | 59a2749cc70eb0be255a5fb6446e9217b6994ea79fa1c6d346bc29d9a4c7ac14 |
| stdout.jsonl | d4ab4ea000f979e757fe0171938509e8bab4a31f803ed556e1623e98ac4d4988 |
| final.txt | d0cfcad21f7aad481b0fd54798a64d20bf46efba008e3ea586b069ee021e70e3 |
| prompt.txt | 0f489447e4de5cb3c2117fde1cc2f7a62e9e3bd3cb6ffadb5461a052bbf9d7ae |
| invocation.json | 864d16146eae51ae79ecb23d75925779cbc03990681f87943f6528bfc137945f |

Controller and tool-guard copies were retained mode 0600 after report emission;
their pins are in plan 089, not retroactively added to the original report.
The human's approval of the explicitly stated payload is in this conversation;
the controller's consent-reference string alone is not authorisation proof.
No commit, publication or next provider run follows automatically.
