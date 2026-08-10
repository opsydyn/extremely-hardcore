# domain map: feature-complete gates

## domain terms

- Change run: durable local record for one delegated change.
- Risk lane: `trivial`, `standard`, or `high` governance class.
- Run state: current lifecycle position derived from append-only transition events.
- Approval: human decision tied to a gate and workspace fingerprint.
- Handoff: the durable status and next action a fresh agent reads before continuing.
- Evaluation repetition: one complete observation of the 20-scenario corpus.
- Attestation: digest-linked delivery summary derived from validated run state.

## bounded contexts

- Protocol: owns run definitions, evidence, approvals, transitions, fingerprints, and validation rules.
- Evaluation: owns scenario manifests, assessor policy, repetitions, and benchmark claim limits.
- Agent experience: owns skill/critic instructions and presentation of protocol state; it does not decide validity.
- Delivery: owns CI exit codes, summaries, and attestation files derived from protocol validation.
- Dogfood: owns controlled fixture orchestration and friction metrics; it does not redefine protocol semantics.

## aggregates and value objects

- Change run aggregate: run definition plus append-only transitions and approvals.
- Risk assessment: factors and derived lane; the persisted run lane remains the protocol input.
- Approval record: approver, gate, decision, timestamp, workspace fingerprint, and reason.
- Evaluation policy: corpus count, required repetitions, critical categories, and thresholds.
- Attestation: run identity, validation result, current state, fingerprint, and digests of source records.

## commands

- `eh status <run>` reads a run and returns the next action.
- `eh approve <run>` records a human approval or rejection.
- `eh transition <run> <target>` requests a legal lifecycle move.
- `eh summary <run>` renders a human review summary.
- `eh attest <run> [output]` writes a machine-readable local attestation.
- `eh ci <run> [output]` validates, summarizes, and emits CI artefacts.
- `evaluate:full` assesses repeated deterministic and structured attempt coverage.
- `dogfood` exercises representative local run paths.

## invariants

- The protocol, not the skill or delivery adapter, decides whether a transition is legal.
- `complete` requires fresh passing evidence, no open blockers, and a fresh approval for high-risk runs.
- Approval freshness is keyed to the current workspace fingerprint and gate.
- Terminal states cannot transition onward.
- Evaluation policy cannot infer provider performance from declared attempts.
- Attestations are derived output and never become input to validation.

## ambiguity

- External repository dogfood still needs real operator runs; the local ten-run harness is controlled evidence only.
- Schema 1 remains experimental until a migration and compatibility policy are accepted.
- CI summaries are review aids, not GitHub-hosted trust attestations.
