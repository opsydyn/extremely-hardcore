# Evidence ledger: retention policy decision

## work receipt

- result: complete with the approved retention policy recorded; release held
- claim: The historical projection gap for Runs 033 through 035 is accepted as
  a documented limitation without backfill, and future release evidence now
  requires durable attestation and CI projections tied to the run and workspace
  fingerprint.
- evidence: Run 053 content assertions show the decision, template, index, and
  roadmap use the required boundaries; supporting records are present; the
  protocol run completed 13/13 with zero blockers; repository checks,
  typecheck, whitespace, attestation, and CI projection checks pass.
- remaining uncertainty: No durable retention mechanism or owner exists yet.
  Current Codex/Claude loading, measurement, adherence, containment, provider
  comparison, writable execution, file-reading resume, and release remain
  unproved or separately gated.
- next: Run authorized current Codex and Claude loading checks and a small
  standardized measurement campaign; design durable retention separately if
  implementation is still warranted.

## summary

Run 053 records the human retention-policy decision after Run 052 confirmed
that the original attestation and CI projections for Runs 033 through 035 are
not retained. The historical gap is accepted as a documented limitation and
is not backfilled or relabelled. Future release evidence must retain durable
projections with the run and workspace fingerprint; `/tmp` alone is
insufficient.

This is a documentation and governance slice. It does not implement storage,
change the protocol schema or CLI, launch a provider, measure agent
performance, or approve release.

## changed files

- `docs/dogfood/decision.md`
- `docs/dogfood/README.md`
- `docs/dogfood/template.md`
- `ROADMAP.md`
- `docs/change-contracts/053-retention-policy-decision.md`
- `docs/domain/053-retention-policy-decision.md`
- `docs/decision-challenges/053-retention-policy-decision.md`
- `docs/implementation-plans/053-retention-policy-decision.md`
- `docs/reviews/053-retention-policy-decision.md`
- `issues/053-retention-policy-decision.md`
- `docs/dogfood/053-retention-policy-decision.md`
- this evidence ledger

No historical Run 033 through 035 files, runtime files, credentials, or raw
provider transcripts changed.

## commands run

### Test-first and policy checks

- Planned red decision-content assertion -> exit 1 with the expected missing
  policy message before editing.
- Initial whitespace scanner -> exit 1 because its regular-expression end
  anchor was escaped in the command; the corrected scanner passed. This was a
  command-construction miss, not a repository failure.
- Final decision, template, index, roadmap, and supporting-record assertions ->
  pass.
- Run 053 final evidence captures -> 13/13 exit 0 at one workspace fingerprint.
- `bun run eh validate .extremely-hardcore/runs/053-retention-policy-decision`
  -> pass.
- `bun run eh transition ... complete` -> pass; final completion transition
  recorded.
- `bun run eh attest ...` -> valid attestation.
- `bun run eh ci ...` -> valid CI projection.

### Repository checks

- `bun run check` -> pass.
- `bun run test` -> pass.
- `bunx tsc --noEmit` -> pass.
- Tracked and untracked whitespace scan -> pass.

### Evidence boundary

- Host-captured: content assertions, repository commands, protocol validation,
  completion output, and local projection results.
- Record-reported: the approved human policy and its release-planning scope.
- Not evidenced: durable storage, retention enforcement, current provider
  loading, measurement, adherence, containment, comparison, writable
  execution, file-reading resume, or release.

## passing checks

- The historical gap is accepted without backfill or relabelling.
- Future release evidence requires durable projections tied to the run and
  workspace fingerprint.
- The template, dogfood index, and roadmap preserve the release boundary.
- Run 053 has 13/13 criteria, zero blockers, valid completion, and valid local
  attestation and CI projection output.
- Structural, test, type, and whitespace checks pass.

## failing or blocked checks

- The planned red assertion exited 1 as expected before the policy was
  recorded.
- The initial whitespace assertion exited 1 due to command construction; the
  corrected scan passed.
- Durable retention implementation and enforcement are not part of this run.
- Current provider loading, standardized measurement, adherence, containment,
  comparison, writable execution, file-reading resume, and release remain
  open or unproved.

## architecture impact

No runtime architecture, protocol schema, provider adapter, dependency,
persistence, integration, sandbox, network, CI, deployment, or orchestration
behaviour changed. This is a documentation and governance slice.

## public contract impact

The dogfood template and project documentation now state that future release
evidence requires durable attestation and CI projections. This is a
human-readable policy only; no machine-readable, provider, CLI, plugin, or
protocol contract changed.

## risks left open

- The future retention owner, storage location, retention period, access model,
  and enforcement are undefined.
- A reader could mistake acceptance of the historical limitation for release
  approval; the records explicitly keep release open.
- Provider loading and standardized measurement are still needed before an
  operational release assessment.

## human review needed

The retention policy decision is recorded from the approved human direction.
Further human review is needed before durable-retention implementation or any
release decision.

## final recommendation

needs follow-up
