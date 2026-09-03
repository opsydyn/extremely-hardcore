# Domain map: retention policy decision

## domain terms

- **historical projection gap:** the original attestation or CI projection is
  absent even though source run records and evidence remain.
- **durable projection:** an attestation or CI projection retained at a
  reviewable location with its run identity and workspace fingerprint.
- **ephemeral projection:** output written to a temporary path such as `/tmp`
  that is not available as a durable release record.
- **release evidence:** the retained proof a reviewer may use at the release
  boundary; it is broader than a run's local completion transition.
- **policy decision:** a human-approved rule recorded in documentation, not a
  runtime enforcement mechanism.

## candidate bounded contexts

- **protocol record:** owns run state, evidence, transitions, and fingerprints.
- **projection/export:** derives attestations and CI summaries from a run; it
  does not become the source of truth.
- **dogfood governance:** owns the human-readable retention policy, limitations,
  and release status.
- **future retention owner:** not assigned by this slice; a later design must
  decide whether repository, CI, or another review boundary owns storage.

## aggregates/entities/value objects

The existing run record, evidence record, completion transition, workspace
fingerprint, attestation, and CI projection remain unchanged. No entity,
schema, or persistence mechanism is introduced.

## commands

- Record the human retention policy in the dogfood decision.
- Align template, index, and roadmap documentation.
- Validate and complete the documentation-only Run 053.

No provider or external execution command is in scope.

## events

- Run 052 records the historical audit result.
- Run 053 records the approved policy for future release evidence.
- No event is emitted for or written into Runs 033 through 035.

## policies/rules

- Missing historical projections are reported as not retained.
- Historical projections are never backfilled or relabelled from current output.
- Future release evidence requires durable attestation and CI projections tied
  to the relevant run and fingerprint.
- Acceptance of a historical limitation does not approve release.
- A future storage or CI implementation needs its own design and review.

## invariants

- Historical claims retain their original provenance labels.
- Current revalidation remains distinct from historical recovery.
- The policy does not silently change the protocol or CLI contract.
- Provider loading, measurement, adherence, containment, and release remain
  separate claims.

## external systems

None are contacted. The filesystem and existing local protocol records are
inspected only; no CI service, provider, network, or storage service is used.

## integration points

The decision is consumed by future dogfood record authors and release
reviewers. It does not add a runtime integration point.

## ambiguity

The policy says future release projections must be durable but deliberately
does not choose the storage owner, retention period, access model, or CI
transport. Those are implementation decisions and remain open.

## recommended next questions

- Which repository or CI boundary should own durable release projections?
- What minimum attestation and CI files must be retained together?
- How should retention failure surface before a release decision?
