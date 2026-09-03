# Real Operator Dogfood Run 049: user-guide record workflow

## purpose

Apply the future dogfood record template to a real EHS documentation change:
make the record workflow discoverable to a new user without turning it into a
required second protocol.

## change

- **Change type:** New-user documentation
- **Risk lane:** Standard
- **Target:** EHS repository
- **Target baseline:** Current working tree, preserving Runs 046 through 048
- **Run:** `.extremely-hardcore/runs/049-user-guide-real-change-record-workflow/`
- **Scope:** Add one concise section to `docs/user-guide.md` linking the
  template, naming unavailable-measurement and no-backfill rules, and preserving
  the standalone/optional-protocol boundary.

## protocol path

1. Defined a standard-risk Run 049 with nine acceptance criteria.
2. Ran the planned red content assertion; it exited 1 because the guide did
   not yet link `dogfood/template.md`.
3. Added the smallest user-guide subsection and no runtime or protocol change.
4. The first `guide-no-runtime-scope` capture used a single-line pattern and
   exited 1 because the sentence wrapped in Markdown. It was refreshed with a
   structural substring assertion; this was an assertion-pattern miss, not a
   product failure.
5. No blocked or human-decision transition was needed for this low-risk edit.
6. Captured all final evidence, validated the run, completed it, and generated
   attestation and CI projections.

## operator timing

| Phase | Started | Finished | Observed interval | Provenance |
| --- | --- | --- | --- | --- |
| Setup and inspection | not measured | not measured | not measured | no timestamp capture in this slice |
| Implementation and verification | not measured | not measured | not measured | no timestamp capture in this slice |
| Review and handoff | not measured | not measured | not measured | no timestamp capture in this slice |

## friction and false blocks

| Category | Observation | Resolution | Bypass used |
| --- | --- | --- | --- |
| Field selection | The concise section needed explicit wording for standalone use, unavailable measurements, and historical preservation. | Kept the guide to one paragraph and linked the template instead of copying its fields. | no |
| Evidence assertion | One content pattern assumed a sentence would stay on one physical line. | Refreshed the criterion with a structural substring assertion. | no |

- **False-block outcome:** Zero product false blocks observed. The expected red
  content assertion was a test-first signal, and the failed single-line pattern
  was an evidence-harness wording miss, not an operational false block.
- **Workarounds:** None. No protocol, provider, environment, or command
  workaround was used.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 9/9 covered |
| Open blockers | 0 |
| Protocol validation | valid at the final workspace fingerprint |
| Final transition | `implemented -> complete` after final evidence capture |
| Focused and broad checks | `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass |

## evidence quality

- **Run/evidence/log retention:** The Run 049 directory and nine
  criterion-linked evidence records are retained. No provider output was
  generated or retained.
- **Attestation and CI projection retention:** Attestation and CI outputs were
  generated under `/tmp` for local validation and are not committed as product
  records.
- **Host-captured evidence:** The red assertion, final content checks,
  repository commands, protocol validation, and completion output.
- **Record-reported evidence:** The field-selection observation and the
  standalone/no-backfill interpretation.
- **Not evidenced:** Timing, productivity effect, provider adherence, provider
  comparison, resume behavior, containment, or release readiness.

## fresh-session resume

- **Snapshot source:** Not applicable; this documentation change did not invoke
  a provider or fresh session.
- **Host and version:** Not applicable.
- **Session boundary:** Not applicable.
- **Expected action or marker:** Not applicable.
- **Observed action or marker:** Not applicable.
- **Claim supported:** None.
- **Not proved:** Any provider loading, adherence, or resume behavior.

## limitations

This is one documentation-only template application. It shows that the record
can stay concise when the target change is clear, but it does not measure
operator time or productivity and does not make the template mandatory for
trivial edits.

## next

Apply the same template to the provider-onboarding handoff clarification in Run
050, then review whether the fields remain low-burden across both changes.
