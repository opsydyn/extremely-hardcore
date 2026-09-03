# Real Operator Dogfood Run 053: retention policy decision

## purpose

Record the approved human decision on the historical projection gap and add a
forward-looking durable-retention requirement without implementing storage or
changing release status.

## change

- **Change type:** Human policy and roadmap documentation
- **Risk lane:** Standard
- **Target:** EHS repository
- **Target baseline:** `2b3a564` (`docs: record dogfood acceptance and retention audit`)
- **Run:** `.extremely-hardcore/runs/053-retention-policy-decision/`
- **Scope:** Align the dogfood decision, index, future record template, and
  roadmap with the approved retention policy.

## protocol path

1. Defined a standard-risk Run 053 with thirteen documentation and repository
   acceptance criteria.
2. Ran the planned red decision-content assertion; it exited 1 because the
   approved retention policy had not yet been recorded.
3. Recorded the policy: accept the historical Runs 033 through 035 projection
   gap as a documented limitation without backfill, and require durable
   projections for future release evidence.
4. Kept storage implementation, provider loading, measurement, writable
   execution, and release approval outside this slice.
5. The first whitespace assertion escaped its regular-expression end anchor
   and exited 1; the scanner was corrected and rerun successfully. This was an
   evidence-command construction miss, not a repository failure.
6. Captured final evidence, validated the run, completed it, and generated
   local attestation and CI projections.

## operator timing

| Phase | Started | Finished | Observed interval | Provenance |
| --- | --- | --- | --- | --- |
| Setup and inspection | not measured | not measured | not measured | no timestamp capture in this slice |
| Implementation and verification | not measured | not measured | not measured | no timestamp capture in this slice |
| Review and handoff | not measured | not measured | not measured | no timestamp capture in this slice |

## friction and false blocks

| Category | Observation | Resolution | Bypass used |
| --- | --- | --- | --- |
| Policy boundary | The historical acceptance, future durability rule, and release decision could be conflated. | Repeated the three claims separately in the decision, template, index, and roadmap. | no |
| Scope boundary | Durable retention could be mistaken for an implementation commitment. | Named storage ownership and enforcement as a separate future proposal. | no |
| Evidence command | The initial whitespace scanner escaped its regular-expression end anchor. | Corrected the scanner and captured the passing result. | no |

- **False-block outcome:** Zero product false blocks observed. The expected red
  content assertion and the failed whitespace scanner were evidence-harness
  signals, not operational false blocks.
- **Workarounds:** None. No provider, protocol, environment, or command
  workaround was used.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 13/13 covered |
| Open blockers | 0 |
| Protocol validation | valid at the final workspace fingerprint |
| Final transition | `implemented -> complete` after final evidence capture |
| Focused and broad checks | `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass |

## evidence quality

- **Run/evidence/log retention:** The Run 053 directory and thirteen
  criterion-linked evidence records are retained locally. No provider output
  was generated or retained by this documentation change.
- **Attestation and CI projection retention:** Attestation and CI outputs were
  generated under `/tmp` for local validation and are not committed as product
  records; this is precisely the future gap the policy addresses.
- **Host-captured evidence:** The red assertion, final content checks,
  repository commands, protocol validation, and completion output.
- **Record-reported evidence:** The approved policy and its release-planning
  limits.
- **Not evidenced:** A durable projection store, retention enforcement,
  provider loading, measurement, adherence, containment, comparison, or
  release.

## fresh-session resume

- **Snapshot source:** Not applicable; Run 053 records a policy and did not
  invoke a provider or fresh session.
- **Host and version:** Not applicable.
- **Session boundary:** Not applicable.
- **Expected action or marker:** Not applicable.
- **Observed action or marker:** Not applicable.
- **Claim supported:** The retention policy is recorded and aligned.
- **Not proved:** Durable storage, retention enforcement, provider loading,
  adherence, containment, comparison, or release.

## limitations

This run records a human policy, not a release decision or implementation. The
historical projection gap remains a documented limitation. The future storage
owner, retention period, access model, and enforcement are open.

## next

Run the authorized current Codex and Claude loading checks and a small
standardized operator measurement campaign. Keep durable-retention
implementation, file-reading resume, provider comparison, and writable
execution separately gated.
