# change contract: historical projection retention audit

## user intent

Use the approved next gate to determine whether the missing attestation and CI
projection artefacts for Runs 033 through 035 can be recovered honestly, then
make the retention boundary explicit without backfilling historical proof.

## current understanding

- Runs 033 through 035 retain their run definitions, criterion-linked evidence,
  logs, and completion transitions.
- Run 047 reports that the original attestation and CI projection sets for
  those three runs are no longer present.
- The current checkout rejects each historical evidence set as stale because
  its recorded workspace fingerprint differs from the current fingerprint.
- A new `eh ci` invocation can inspect current state and write a projection,
  but it cannot recreate the original workspace fingerprint or the original
  projection contents.

## allowed scope

- Audit the durable state and documented projection paths for Runs 033 through
  035.
- Attempt current-state projection generation into unique temporary locations
  only to establish its validation result.
- Record whether historical projections are recoverable from the retained
  evidence.
- Update the dogfood decision, index, template guidance, and roadmap with the
  result and a concise future retention rule.
- Record this contract, domain map, decision challenge, implementation plan,
  review, issue, dogfood record, and evidence ledger.

## forbidden scope

- Do not modify Runs 033 through 035 or replace their historical evidence.
- Do not present a current-fingerprint projection as the missing historical
  attestation or CI result.
- Do not fabricate, infer, or backfill projection contents.
- Do not change the protocol schema, CLI behaviour, persistence model, CI
  workflow, provider adapters, credentials, network, sandbox, or writable
  execution boundary.
- Do not close the release gate or claim benchmark, adherence, containment,
  productivity, or provider-comparison evidence.

## affected areas

- `docs/dogfood/decision.md` and `docs/dogfood/README.md`.
- `docs/dogfood/template.md` retention guidance.
- `ROADMAP.md` retention-gate status.
- Documentation-only Run 052 protocol records.

## minimum complete change

Record a reproducible audit showing whether the original projections exist and
whether current CLI regeneration is valid. If the original proof is not
recoverable, state the gap plainly and add only the minimum future-record rule
needed to prevent an ephemeral projection from being mistaken for durable
retention.

## architecture-decision check

No ADR is required for this slice. It audits existing artefacts and changes
documentation only; it does not change runtime, persistence, schema, CI, or
integration behaviour. Any future durable-retention implementation requires a
new change contract and ADR review.

## public contracts

The dogfood template and project documentation gain a human-readable claim
boundary: missing historical projections are reported as not retained, and a
current rerun is not historical recovery. No machine-readable, CLI, provider,
or protocol contract changes.

## assumptions

- The paths named by Run 047 and the Runs 033 through 035 records are the
  complete locally retained paths available for this audit.
- The current workspace fingerprint is intentionally different from the
  historical fingerprints after subsequent repository changes.
- Temporary audit outputs are disposable and are not product artefacts.

## risks

- A reader may treat the original run's record-reported completion as stronger
  than the retained current evidence permits.
- A future operator may rerun `eh ci` and mistake a new invalid or current
  projection for recovered historical proof.
- Accepting the gap for release remains a human decision and is outside this
  slice.

## acceptance evidence

- Durable run, evidence, log, and completion-transition presence is checked for
  Runs 033 through 035.
- The six documented external projection targets are checked and found absent.
- `eh status` is captured for each run and reports complete state with stale
  evidence and an invalid current validation result.
- Current `eh ci` regeneration is attempted for each run in a unique temporary
  directory and is shown to exit non-zero with an invalid attestation.
- Decision, template, index, and roadmap wording distinguish historical
  retention from current revalidation and leave release open.
- Repository validation, tests, typecheck, protocol validation, and whitespace
  checks pass for the final workspace.

## stop conditions

Stop if recovery would require changing historical run files, guessing the old
workspace state, treating a current projection as historical, or modifying
runtime/persistence/CI/provenance behaviour. Stop before release approval even
if the audit is complete.
