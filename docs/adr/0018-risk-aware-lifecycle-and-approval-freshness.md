# ADR: risk-aware lifecycle and approval freshness

## status

accepted

## context

The protocol currently supports only `implemented -> complete`. The run already carries a risk label, but blocked work, abandoned work, pending human decisions, and high-risk approval freshness are documentary rather than executable. Broadening the FSM is a public contract and must preserve existing schema 1 fixtures.

## decision

Extend the experimental schema 1 protocol with these states:

- `implemented`: active work that may be validated or escalated.
- `blocked`: active work waiting on a recorded blocker or dependency.
- `needs-human-decision`: active work waiting on an explicit human decision.
- `abandoned`: terminal state for a deliberately stopped run.
- `complete`: terminal state for a validated run.

Allow transitions from `implemented`, `blocked`, and `needs-human-decision` to `blocked`, `needs-human-decision`, `implemented`, `abandoned`, or `complete` where the target is meaningful. Terminal states have no outgoing transitions. Keep the existing `implemented -> complete` command behaviour and reject illegal history.

For `high` risk runs, `complete` additionally requires an `approvals.jsonl` record with decision `approved`, gate `complete`, and the current workspace fingerprint. Any workspace fingerprint change makes that approval stale. Approvals are local traceability records, not signatures or external trust anchors.

## consequences

- Fresh agents can distinguish waiting, stopped, and finished work from JSON state.
- High-risk completion gains an executable human gate.
- The transition history and approval records become broader experimental public contracts.
- Schema 1 remains experimental; no migration or version promotion is implied.
- Concurrent writers and hostile local edits remain outside the threat model.

## options considered

### Keep lifecycle states documentary

Rejected because the roadmap requires validators to reject illegal transitions and stale approvals.

### Replace the current state machine wholesale

Rejected because it would break existing fixtures and expand the change into a workflow engine.

### Add bounded states and preserve existing entry points

Accepted because it provides the needed governance while retaining the local protocol boundary.

## review date

After the first ten-run dogfood report or before schema version 2, whichever comes first.
