# Real Operator Dogfood Run 11: Simple Made Easy lens

## purpose

Exercise the new `simple-made-easy` skill on the multi-option design decision
that created it. The run tests whether the lens can reject a package rename,
a full Grill/working-brief tracker, and a simplicity score/report in favor of
one optional inline Markdown skill that composes with EHS's existing gates.

## change

- **Change type:** multi-option public skill design
- **Risk lane:** Standard
- **Target:** EHS repository
- **Target branch:** `master`
- **Run:** `.extremely-hardcore/runs/045-simple-made-easy-lens/`
- **Scope:** add one optional `simple-made-easy` skill, route it conditionally,
  preserve the `extremely-hardcore` package identity, and document the
  structural simplicity versus convenience boundary.

## simplicity decision

The lens was applied to four candidate paths:

| Candidate | Decision | Reason |
| --- | --- | --- |
| Rename EHS to Simple Made Easy | Rejected | Breaks the existing package/plugin identity for a naming change. |
| Add a full Grill/working-brief tracker | Rejected | Duplicates EHS documents and introduces a second workflow state surface. |
| Add a simplicity score/report | Rejected | Creates false precision around a structural review judgment. |
| Add one optional inline Markdown lens | Selected | Adds the missing YAGNI/reuse and anti-complecting guidance with the least new machinery. |

The selected path records its output in the existing change contract or plan.
It preserves safeguards and treats a larger but more separated change as
potentially simpler than a shorter braided change.

## protocol path

1. Wrote the change contract, decision challenge, domain map, ADR, design
   specification, and implementation plan before implementation.
2. Added the validator regression first and confirmed the expected red result
   when the proposed skill was absent.
3. Added the skill, validator registration, conditional router step, and
   public documentation.
4. Captured six final criteria with the existing `eh` CLI against the current
   workspace fingerprint.
5. Validated and completed the run, then generated summary, attestation, and
   CI artefacts.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 6/6 covered |
| Open blockers | 0 |
| Protocol validation | valid at final workspace fingerprint |
| Deliberate red phase | 1 expected validator failure before implementation |
| Focused validator | 13 pass, 0 fail |
| Full repository tests | 136 pass, 0 fail |
| Typecheck and scaffold | pass |
| Structural simplicity claim | design/usability evidence only |
| Package identity | preserved as `extremely-hardcore` |

## retained outputs

- Run artefacts: `.extremely-hardcore/runs/045-simple-made-easy-lens/`
- Attestation: `/tmp/extremely-hardcore-dogfood-045-attestation.json`
- CI artefacts: `/tmp/extremely-hardcore-dogfood-045-ci/`

## limitations

This is targeted self-dogfood, not a provider comparison, benchmark, or skill-
effect result. It does not show that an external model will select the lens,
preserve safeguards, or produce a simpler artifact. It also does not justify a
new simplicity score, template, tracker, or runtime integration.

## next

Review whether the skill remains distinct from `change-contract`,
`domain-discovery`, and `decision-challenge` during the next external
multi-option dogfood. Keep the lens optional unless real use shows a repeatable
gap.
