# issue: dogfood the proof-carrying completion gate

## status

Active. Runs 1 through 3 are recorded in `docs/dogfood/`.

## outcome

Run the completion gate on five non-trivial repository changes and decide whether the protocol improves completion reliability at acceptable cost.

## required runs

- One feature.
- One bug fix.
- One refactor or dependency change.
- One change that becomes stale during verification.
- One change with a real blocker or rejected completion attempt.

## record for each run

- Change type and risk.
- Criteria and captured commands.
- False blocks and missed invalid states.
- Setup time and gate overhead excluding command runtime.
- Whether a fresh agent can explain the completion decision without conversation history.
- Any manual protocol edits or workarounds.

## exit criteria

- Five completed or deliberately abandoned run directories are committed.
- Friction and failure findings are summarised by severity.
- Schema and CLI changes are proposed from evidence, not preference.
- A decision is recorded to proceed to the behavioural evaluation harness, revise the completion gate, or stop.

## non-goals

- Full lifecycle FSM.
- Risk-dependent gates.
- CI or hosted integration.
- Changing the schema during a run without recording the observed failure first.
