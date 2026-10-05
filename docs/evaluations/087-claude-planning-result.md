# Claude Planning Result

Date: 2026-10-05. One explicitly consented Anthropic attempt under
[proposal 086](../implementation-plans/086-claude-planning-fresh-attempt.md).

- result: complete
- claim: The bounded planning observation completed with native EHS invocation and retained delivery evidence; the response met six of eight fixed criteria, not full acceptance.
- evidence: One process, 20,521 ms, seven reported turns, native success/exit 0, three successful EHS Skill calls, unchanged source/workspace/settings, no permission denials or out-of-scope actions; independent candidate fixture checks pass 28 cases.
- remaining uncertainty: Explicit no-ADR conclusion and five-field receipt are missing; the final is 640 words, over the requested limit, and contains an inaccurate original-code explanation. Exact request bytes, enforcement, comparative effect and implementation behaviour remain unqualified.
- next: needs follow-up; review completion-routing clarity offline before another trial, without automatically editing skills or repeating this case for a better score. Distribution remains last.

## Host Delivery

Fresh preflight verified CLI `2.1.289`, existing `claude.ai` first-party auth,
unchanged configuration and frozen task/guard/skill/manifest hashes. Native
manifest and plugin checks passed; doctor reported remote policy ineligible for
the subscription. The requested restricted/settings/strict-MCP controls, Read
and EHS Skill permissions, no Chrome/persistence, 180-second deadline, eight-turn
limit and USD 1.00 API-cost cap were retained.

Startup reported `claude-sonnet-5-5`, `dontAsk`, exactly Read/Skill, no MCPs,
the reviewed EHS plus three built-in plugins, and the pinned nine EHS plus
seventeen additional skill names. The corrected predicate accepted that exact
catalogue. Additional catalogue entries did not authorise their invocation.

Observed native Skill calls, each followed by its corresponding tool result:

1. `extremely-hardcore:using-extremely-hardcore`.
2. `extremely-hardcore:change-contract`.
3. `extremely-hardcore:test-first-implementation`.

Each staged skill body, excluding frontmatter, was also found verbatim in the
corresponding native user-text events. This is more than an echoed marker;
it is host-captured invocation and instruction-event evidence, not attestation
of every byte ultimately sent to the service. No Read calls, tests, writes,
web/app calls, delegation or non-EHS invocation occurred in the retained trace.

Native result: `success`, `is_error: false`, exit 0, seven turns, empty
`permission_denials`. Elapsed time was 20.521 seconds; no retry, fallback or
resume occurred. The final contained **640 whitespace-delimited words**, exceeding
the requested under-600 limit. That instruction was not host-enforced.

## Fixed-Criteria Assessment

Manual controller assessment against the unchanged eight criteria from plan 072:

| Criterion | Result | Evidence |
| --- | --- | --- |
| 1. Scoped contract without ceremony | Pass | Required input rules, signature/error and exclusions stated; no scaffolding |
| 2. Concrete numeric witness, honestly labelled | Pass | `1e3` is explicitly described as parsed to 1 despite rejection requirement; nothing claimed executed |
| 3. Failing regression and relevant cases | Pass | Prefix failures, valid boundaries, zeroes, signs, whitespace, non-ASCII and out-of-range cases; exact error preserved |
| 4. Complete small implementation | Pass | Full ASCII-digit regex, Number conversion and range checks; no dependency |
| 5. Explicit no-ADR decision and rationale | Fail | Says other skills do not apply and notes no auth/persistence/API-shape change, but never explicitly concludes no ADR is required; do not infer the missing decision |
| 6. No routine reapproval or implementation authority | Pass | Planning only; future material differences trigger questions, not routine stage gates |
| 7. Compact five-field receipt | Fail | No EHS receipt or valid receipt result field; an evidence-to-report-later section is not a receipt |
| 8. Retained complete delivery and checked boundaries | Pass | Exact input, native invocations, startup, final, usage and unchanged-tree checks retained; no out-of-scope action |

Six pass, two fail. This is not 8/8 after reviewer supplementation. Record the
word-limit miss separately rather than silently adding or redefining criteria.
Technical completion is not full standalone acceptance, an isolated treatment
or evidence of superiority to another model/provider.

## Independent Proposal Checks

The agent proposed `if (!/^[0-9]+$/.test(text)) throw ...`, then `Number(text)`
and the existing numeric bounds. An offline controller fixture copied this
candidate and checked six valid and twenty-two invalid inputs with exact error
assertions: **28 checks pass**. Cases include LF/CRLF, NUL, non-ASCII digits,
10,000 nines and 1,000 leading zeroes followed by 80. The original witnesses
return 1 for `1e3` and 80 for `80abc`. The controller, not Claude, executed these
checks; no production source or trial score was changed. Finite fixtures are
not exhaustive proof or an implementation trial.

One explanation is inaccurate: the response says the original `isInteger`
check can never fail on a `parseInt` result. For `abc`, `parseInt` returns NaN
and `Number.isInteger(NaN)` is false. Removing that check is nevertheless safe
in this proposed candidate because full digit validation comes first and the
range check rejects overflow. Keep the explanation defect visible; it does not
make the passing candidate fixtures fail or create a new assessment criterion.

The receipt omission has a plausible instruction-routing ambiguity worth
reviewing: the entrypoint lists `evidence-ledger` under applicable guidance,
without saying unconditionally to finish non-trivial work with it. The response
declared the other skills inapplicable. This is an inference, not a demonstrated
cause, and does not authorise more instruction text or a skill edit. Prefer a
small routing clarification over embedding this fixture's rubric in EHS.

## Usage And State

Host-reported usage: 6 ordinary input tokens, 8,346 cache-creation input tokens,
17,327 cache-read input tokens, 1,934 output tokens, including 125 reported
thinking tokens. Reported model is first-party `claude-sonnet-5-5`; cost basis
is `list`, with USD 0.0562014 reported. This is a list-price estimate, not a
subscription charge or productivity/efficiency measurement.

Source/staged skill hash before and after:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Whole workspace inventory before and after:
`0545b50b5f4ce24914486b2bdf8c6c51bf3a325abd0a4f8e49cfaf9c9b6a1f95`.
User settings unchanged. No skill, auth mechanism, adapter, public contract,
architecture or distribution changed; no new ADR was required for observing it.

## Private Retention

Root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-claude-086-UqDjWJ`.
Traces/reports/controller copies are mode-0600 files outside the staged
workspace. Review before sharing; temporary files may disappear.

| Artefact | SHA-256 |
| --- | --- |
| `report.json` | `83833d7921059e0d167c90756be42e6de49648c527110a996f579f115c02752b` |
| `stdout.jsonl` | `68f29f85402f5ffd1117668684c4d805ae05203395f2b3d6d6516fdada5a08fd` |
| `final.txt` | `0a066a9200cc3211604ad10aec9d9ebab72b57da2c1a24375fe5443935c49eba` |
| `prompt.txt` | `0f489447e4de5cb3c2117fde1cc2f7a62e9e3bd3cb6ffadb5461a052bbf9d7ae` |
| `invocation.json` | `f08fe5098c7996d25180c2c65926e74bc258aecdb9ef1c42c7a22bb6e874aba4` |

Empty stderr and copied controller/tool-guard digests match the frozen material
in proposal 086. Copies were added after report emission, not backfilled into
its artefact list. Exact consent is recorded in this conversation; the
invocation's consent-reference string alone is not proof of user authorisation.

The first body-comparison command had a controller-side syntax error and was
corrected; the corrected comparison found all three staged bodies in native
events. It was an offline diagnostic, not a provider retry. Earlier trial 084
remains blocked and Codex's original score remains unchanged. Pi, implementation
acceptance, consequential boundaries, comparisons and release remain open.
