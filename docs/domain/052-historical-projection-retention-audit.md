# domain map: historical projection retention audit

## domain terms

- **run record:** durable `run.json`, transition history, criterion links, and
  captured evidence for one bounded change.
- **evidence record:** a command result tied to a criterion, log digest, and
  workspace fingerprint.
- **completion transition:** the append-only event that records why a run was
  allowed to become complete.
- **attestation projection:** a derived JSON representation of current run
  validation, not the source of run state.
- **CI projection:** the derived summary and attestation written for a review
  or CI boundary.
- **historical retention:** continued availability of the original projection
  and its fingerprint context after later workspace changes.
- **current revalidation:** checking retained records against the current
  workspace fingerprint; it is not historical recovery.

## candidate bounded contexts

- **protocol record:** owns run state, transitions, criteria, evidence, and
  workspace fingerprints.
- **projection/export:** derives attestations, summaries, and CI output from
  the current record without becoming source of truth.
- **dogfood governance:** owns the human-readable retention claim, limitations,
  and release-gate status.

## aggregates/entities/value objects

- Run record, completion transition, evidence record, workspace fingerprint,
  attestation, and CI projection.
- No new entity or schema is introduced by this audit.

## commands

- Inspect retained run and projection paths.
- Read `eh status` for each historical run.
- Attempt `eh ci` into a disposable temporary directory.
- Record the audit result without mutating historical runs.

## events

- Historical completion transitions already exist in Runs 033 through 035.
- Run 052 records an audit decision; it does not emit a new protocol event for
  the historical runs.

## policies/rules

- A projection is derived evidence, not the authority for run state.
- A current projection with stale evidence cannot stand in for an original
  projection.
- Ephemeral output is not durable retention.
- Missing historical proof is reported as a gap, never silently backfilled.

## invariants

- Historical claims retain their original fingerprint and provenance labels.
- Current validation must not rewrite or relabel prior evidence.
- Release status remains separate from projection-retention status.
- No provider or external execution is needed to audit local retention.

## external systems

- Local filesystem paths under `/tmp` are ephemeral and not a durable product
  store.
- Git supplies the current revision and workspace diff used for fingerprints.
- CI may consume a projection, but no CI service is contacted in this slice.

## integration points

- `eh status`, `eh attest`, and `eh ci` read the protocol record.
- Dogfood and roadmap documentation explain the result to future operators.

## ambiguity

The retained run records support a historical claim that completion was valid at
the captured fingerprint, but the missing original projections prevent a fresh
reader from inspecting those exact derived outputs. Whether that gap is
acceptable for release is not an engineering fact and remains for human review.

## recommended next questions

- Should future release evidence require projections to live in a tracked or
  otherwise durable store rather than only under `/tmp`?
- Which projection files are the minimum durable set at the review boundary?
- Who owns retention when a run is performed in an external repository or CI
  worker?
