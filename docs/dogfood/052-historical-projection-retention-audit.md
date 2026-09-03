# Real Operator Dogfood Run 052: historical projection retention audit

## purpose

Use the approved retention gate to audit Runs 033 through 035 and establish
whether their missing attestation and CI projections can be recovered without
turning current invalid output into historical proof.

## change

- **Change type:** Retention and provenance documentation
- **Risk lane:** Standard
- **Target:** EHS repository
- **Target baseline:** `master` at `432f76d`, preserving the existing Runs 046 through 051 working-tree changes
- **Run:** `.extremely-hardcore/runs/052-historical-projection-retention-audit/`
- **Scope:** Audit retained historical artefacts, document the confirmed gap,
  and add a no-backfill rule. No protocol implementation or historical run file
  changes.

## protocol path

1. Defined a standard-risk Run 052 with seventeen acceptance criteria.
2. Ran the planned red decision-content assertion; it exited 1 because the
   retention audit had not yet been recorded.
3. Inspected Runs 033 through 035. Their run definitions, linked evidence,
   logs, and completion transitions remain present. The original external
   attestation and CI projection paths are absent.
4. Captured current `eh status` for each historical run. Each reports complete
   state and full criterion coverage but invalid stale evidence.
5. Attempted current `eh ci` generation into unique `/tmp` directories. Each
   command exited non-zero and wrote an invalid current-fingerprint attestation;
   those outputs are not historical recovery and are not retained as product
   artefacts.
6. Recorded the no-backfill decision, future template rule, index status, and
   roadmap status. No historical run file was changed.
7. The first attempt to capture `eh validate` as a criterion exited 1 because
   the criterion was necessarily uncovered while it was being captured. This
   was a harness-pattern miss, so the self-referential criterion was removed;
   validation remains a post-capture gate.
8. Captured all final evidence, validated and completed Run 052, and generated
   valid attestation and CI projections for Run 052 itself.

## operator timing

| Phase | Started | Finished | Observed interval | Provenance |
| --- | --- | --- | --- | --- |
| Setup and inspection | not measured | not measured | not measured | no phase timestamp capture in this slice |
| Implementation and verification | not measured | not measured | not measured | no phase timestamp capture in this slice |
| Review and handoff | not measured | not measured | not measured | no phase timestamp capture in this slice |

## friction and false blocks

| Category | Observation | Resolution | Bypass used |
| --- | --- | --- | --- |
| Projection retention | Source run state was retained, but the original attestation and CI projection paths were not. | Recorded the gap and prohibited historical backfill. | no |
| Current revalidation | `eh status` and `eh ci` correctly rejected historical evidence as stale against the current workspace. | Preserved the invalid result and separated it from the historical completion record. | no |
| Claim boundary | A new projection could be generated syntactically, but it could not support the historical claim. | Labelled temporary outputs current and invalid; did not retain them as product proof. | no |

- **False-block outcome:** Zero product false blocks observed. The stale
  results are the intended provenance guard, not a false block. The planned red
  assertion and invalid regeneration attempts were expected test/audit signals.
- **Workarounds:** None. No protocol, provider, environment, or command
  workaround was used.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 17/17 covered |
| Open blockers | 0 |
| Protocol validation | valid at the final workspace fingerprint |
| Final transition | `implemented -> complete` after final evidence capture |
| Focused and broad checks | `bun run check`, `bun run test`, `bunx tsc --noEmit`, and whitespace checks pass |

## evidence quality

- **Run/evidence/log retention:** Run 052 and its criterion-linked evidence and
  logs are retained. Runs 033 through 035 retain source run state, evidence,
  logs, and completion transitions. Their original external attestation and CI
  projection paths are missing.
- **Attestation and CI projection retention:** Run 052's projections were
  generated under `/tmp` for local validation. The three historical regeneration
  attempts were invalid and are disposable audit outputs, not replacements.
- **Host-captured evidence:** Retained-path checks, missing-path checks, three
  current `eh status` results, disposable `eh ci` results, documentation
  assertions, repository checks, and Run 052 protocol commands.
- **Record-reported evidence:** The original Runs 033 through 035 descriptions
  of their historical completion and final-capture context.
- **Not evidenced:** The contents of the missing original projections, the
  exact historical checkout beyond recorded fingerprints, release acceptance,
  or a durable retention implementation.

## fresh-session resume

- **Snapshot source:** Not applicable; this slice audited local records and did
  not launch a provider or fresh session.
- **Host and version:** Not applicable.
- **Session boundary:** Not applicable.
- **Expected action or marker:** Not applicable.
- **Observed action or marker:** Not applicable.
- **Claim supported:** None.
- **Not proved:** Provider loading, adherence, resume, containment, comparison,
  productivity, or release readiness.

## limitations

The audit confirms that source records survived while the original derived
projections did not. It cannot reconstruct files or a workspace snapshot that
is no longer retained. The original runs remain historical records and were not
backfilled or rewritten. Whether the confirmed gap is acceptable for release
requires human review.

## next

Human review should decide whether to accept the confirmed historical retention
gap for release evidence or approve a separately designed durable-retention
proposal. Keep file-reading resume, provider expansion, writable execution, and
release claims gated independently.
