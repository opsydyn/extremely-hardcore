# evidence ledger: historical projection retention audit

## work receipt

- result: complete with historical retention gap confirmed and release held
- claim: Runs 033 through 035 retain their source run state and linked evidence,
  but their original attestation and CI projections cannot be recovered from
  the current checkout; the repository now records that no-backfill boundary.
- evidence: The retained-path audit found all source run/evidence/log links and
  completion fingerprints; all six documented original projection targets were
  absent; three current `eh status` checks and three disposable `eh ci` attempts
  reported stale invalid validation; Run 052 completed 17/17 with fresh
  repository checks and a valid local attestation/CI projection.
- remaining uncertainty: The missing original projection contents and exact
  historical checkout are unavailable. Human acceptance of the gap, durable
  retention policy, current provider loading, adherence, containment, and
  release remain open.
- next: Review the confirmed retention gap and decide whether release evidence
  needs a separately designed durable projection-retention change.

## summary

Run 052 audits the retention gap identified by Run 047. Runs 033 through 035
still contain their source run definitions, evidence records, logs, and
completion transitions. The documented external attestation and CI projection
paths are absent. Current validation correctly rejects the historical evidence
as stale, and current `eh ci` attempts emit invalid projections tied to the
present workspace. Those outputs cannot recover the original proof and were not
used as replacements.

The decision, dogfood template, index, and roadmap now state this boundary
explicitly. No runtime, schema, persistence, provider, CI, or historical run
files changed.

## changed files

- `docs/dogfood/decision.md`
- `docs/dogfood/README.md`
- `docs/dogfood/template.md`
- `ROADMAP.md`
- `docs/change-contracts/052-historical-projection-retention-audit.md`
- `docs/domain/052-historical-projection-retention-audit.md`
- `docs/decision-challenges/052-historical-projection-retention-audit.md`
- `docs/implementation-plans/052-historical-projection-retention-audit.md`
- `docs/reviews/052-historical-projection-retention-audit.md`
- `issues/052-historical-projection-retention-audit.md`
- `docs/dogfood/052-historical-projection-retention-audit.md`
- this evidence ledger

Runs 033 through 035 were preserved unchanged. No credentials, raw provider
transcripts, or temporary invalid projections were added to the repository.

## commands run

### Test-first and audit checks

- Planned red decision-content assertion -> exit 1 with the expected missing
  retention-audit message before editing.
- Retained run/evidence/log path audit -> pass for Runs 033 through 035.
- Completion-fingerprint audit -> pass for all three final transitions.
- Original external projection-path audit -> pass: all six documented targets
  are absent.
- `bun run eh status` for Runs 033 through 035 -> each reports complete state,
  full coverage, and invalid stale evidence.
- Disposable `bun run eh ci` attempts for Runs 033 through 035 -> each exits 1
  and writes an invalid current-fingerprint attestation.
- Final decision, template, index, roadmap, record, and hygiene assertions ->
  pass.
- Run 052 final evidence captures -> 17/17 exit 0 at one workspace fingerprint.
- `bun run eh validate .extremely-hardcore/runs/052-historical-projection-retention-audit`
  -> pass.
- `bun run eh transition ... complete` -> pass; final completion transition
  recorded.
- `bun run eh attest ...` -> valid attestation.
- `bun run eh ci ...` -> valid CI projection.

### Repository checks

- `bun run check` -> pass.
- `bun run test` -> pass; 136 tests, 0 failures, 483 expectations.
- `bunx tsc --noEmit` -> pass.
- Tracked and untracked whitespace scan -> pass.

### Evidence boundary

- Host-captured: path checks, current CLI results, documentation assertions,
  repository commands, and Run 052 protocol outputs.
- Record-reported: historical completion context from Runs 033 through 035.
- Not evidenced: missing original projection contents, exact historical checkout,
  durable retention, release acceptance, or provider behavior.

## passing checks

- Runs 033 through 035 retain source records and linked logs, but not the
  documented original external projections.
- Current validation distinguishes stale historical evidence from a valid
  current run.
- Current projection regeneration cannot be mistaken for historical recovery.
- The dogfood decision, template, index, and roadmap preserve the gap and keep
  release open.
- Run 052 has 17/17 criteria, 0 blockers, valid completion, and retained local
  evidence.
- Structural, test, type, and whitespace checks pass.

## failing or blocked checks

- The planned red assertion exited 1 as expected before the audit decision was
  recorded.
- The first attempt to capture `eh validate` as a criterion exited 1 because
  that criterion was uncovered during its own capture; the criterion was
  removed and validation was run as the post-capture gate.
- All three current regeneration attempts exited 1 because their evidence is
  stale; this is the intended audit result, not a product failure.
- The original attestation and CI projection contents are unavailable and were
  not backfilled.
- Human acceptance of the retention gap and release remains pending.

## architecture impact

No runtime architecture, protocol schema, provider adapter, dependency,
persistence, integration, sandbox, network, CI, deployment, or orchestration
behavior changed. This is a documentation and retention-audit slice.

## public contract impact

The dogfood template and project documentation now define a human-readable
retention boundary: ephemeral projection output is not durable historical proof,
and current reruns must not be relabelled as recovery. No machine-readable,
provider, CLI, plugin, or protocol contract changed.

## risks left open

- A historical record without its original derived projection is harder for a
  fresh reviewer to inspect independently.
- A future durable-retention design could add storage, CI, or provenance
  contracts and requires its own change contract, ADR, and decision challenge.
- Current Codex/Claude loading, provider adherence, containment, file-reading
  resume, comparison, measurement, and release remain open.

## human review needed

Yes. Human review is needed to decide whether the confirmed historical
retention gap is acceptable for release evidence or whether to commission a
separate durable-retention proposal. This run does not request implementation
approval for that proposal.

## final recommendation

needs review
