# change contract: record the human review decision

## user intent

Record the approved human review of Runs 049 and 050: keep the dogfood template
as a lightweight Markdown convention, and defer file-reading resume until a
separate proposal establishes its security and provenance boundary.

## current understanding

Runs 049 and 050 applied the template to two real documentation changes. Both
completed with fresh evidence and no runtime changes. Their qualitative result
is that the fields fit without a new schema or command; timing and productivity
effect remain unmeasured. The current decision and roadmap still describe this
review as pending.

## allowed scope

- Add a dated human-review decision to `docs/dogfood/decision.md`.
- Mark the template convention accepted and file-reading resume deferred.
- Update the dogfood index and roadmap to reflect that decision while keeping
  release, provider loading, adherence, retention, and containment gates open.
- Record this contract, domain map, implementation plan, review, issue, dogfood
  record, and evidence ledger.

## forbidden scope

- No file-reading resume implementation, session adapter, daemon, schema, CLI,
  credential, provider, network, sandbox, containment, or writable execution.
- No release approval, provider comparison, adherence claim, or productivity
  claim.
- No historical record backfill or deletion of failed assertion evidence.

## affected areas

- Dogfood decision and index documentation.
- Product roadmap status and next-gate wording.
- Run 051 protocol evidence only.

## minimum complete change

Add one explicit decision section and align the three status surfaces. Preserve
the current limitations and identify a separate future boundary review before
any file-reading resume work.

## architecture-decision check

No ADR is required. This records a human decision about documentation status;
it does not change architecture, runtime, persistence, provider behavior,
security boundaries, or public API contracts.

## public contracts

The roadmap and dogfood documentation now state the accepted convention and
deferred capability. No machine-readable or provider contract changes.

## risks

- A reader could mistake acceptance of the template for release approval.
- “Deferred” could be misread as a design commitment; the future proposal must
  still pass a fresh decision challenge.

## acceptance evidence

- A decision-content assertion fails before the dated decision exists.
- The final decision, index, and roadmap state the approval and deferral without
  closing unrelated release gates.
- Run 051 captures fresh evidence for all criteria and produces a valid
  attestation and CI projection.
- Repository checks pass.

## stop conditions

Stop if recording the decision requires changing executable behavior, changing
the protocol schema, or treating the approval as authorization for resume or
writable execution.
