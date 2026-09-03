# Change contract: retention policy decision

## user intent

Record the approved human decision about the historical projection gap: accept
the missing projections for Runs 033 through 035 as a documented limitation,
do not backfill them, and require durable projections for future release
evidence.

## current understanding

- Run 052 confirms that the source records for Runs 033 through 035 remain,
  while their original attestation and CI projections are not retained.
- Current revalidation and current projection generation cannot recreate the
  historical outputs because the evidence is stale against today's workspace.
- The user approved the retention policy, not release, provider execution, or
  a durable storage implementation.
- The existing template already prohibits historical backfill but does not yet
  state that future release evidence requires durable projections.

## allowed scope

- Record the dated human retention-policy decision in the dogfood decision.
- Align the dogfood index, record template, and roadmap with that decision.
- Create a documentation-only Run 053 with protocol evidence and an evidence
  ledger.
- Run repository checks and validate the new local protocol record.

## forbidden scope

- Do not modify or backfill Runs 033 through 035 or their historical evidence.
- Do not treat a current rerun as recovery of a missing historical projection.
- Do not implement an archive, persistence service, schema, CLI command, CI
  workflow, provider adapter, network access, sandbox, or writable execution.
- Do not run current Codex or Claude model checks, provider comparisons, or
  measurement in this slice; those are the next separately scoped slice.
- Do not approve release, file-reading resume, or self-evolving skill work.

## affected areas

- `docs/dogfood/decision.md` human decision and release-gate wording.
- `docs/dogfood/README.md` index and operational acceptance wording.
- `docs/dogfood/template.md` future projection-retention rule.
- `ROADMAP.md` retention status and next-gated-slice wording.
- Documentation-only Run 053 records under `docs/` and `issues/`.

## minimum complete change

Record the approved policy in one place, repeat it consistently in the future
record guidance and roadmap, and leave implementation and release approval
explicitly open. The policy must distinguish three things: historical proof
that is no longer retained, future evidence that must be durable, and the
separate release decision.

## architecture-decision check

No ADR is required for this slice. It records a human policy and changes
documentation only; it does not change runtime, persistence, schema, CI, or
integration behaviour. A future durable-retention implementation requires a
new change contract, domain review, ADR check, and decision challenge.

## public contracts

The dogfood template and roadmap gain a human-readable release-evidence rule:
future attestation and CI projections must be durably retained with their run
and fingerprint. No machine-readable, CLI, provider, plugin, or protocol
contract changes.

## assumptions

- The Run 052 audit is the source of truth for the historical retention gap.
- The approved decision applies to release planning and does not waive future
  evidence requirements.
- Durable retention means a reviewable location that survives the operator's
  temporary session; `/tmp` alone is insufficient.

## risks

- A reader may mistake acceptance of the historical limitation for release
  approval.
- The future durable-retention requirement is a policy boundary, not an
  implemented storage guarantee.
- The exact owner and repository/CI location for durable projections remain
  undefined and require a separate design.

## acceptance evidence

- The dated decision records historical-gap acceptance, no backfill, the future
  durable-projection requirement, and the separate release gate.
- The template states that missing durable projections make future release
  evidence incomplete.
- The dogfood index and roadmap use aligned wording and name the next gated
  loading and measurement slice.
- All supporting Run 053 records are present and contain no secrets or raw
  provider transcripts.
- Repository validation, tests, typecheck, whitespace checks, protocol
  validation, completion, attestation, and CI projection pass.

## stop conditions

Stop if this slice requires changing historical records, adding persistence or
CI machinery, launching a provider, defining a machine-readable retention
contract, or closing the release gate. Stop before implementing durable
retention; that is a new proposal.
