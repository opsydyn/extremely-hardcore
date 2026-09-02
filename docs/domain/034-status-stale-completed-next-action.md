# domain map: stale completed status next action

## domain terms

- **completed run:** a terminal protocol run that passed its completion gate at a recorded workspace fingerprint.
- **current validation:** whether the run's evidence and approvals are valid against the workspace being inspected now.
- **stale completed run:** a completed run whose current validation is invalid, typically because tracked workspace content changed after evidence capture.
- **next action:** the concise operator instruction projected by `eh status` and `eh summary`.

## candidate bounded contexts

- **lifecycle:** owns legal run states and terminality.
- **validation:** owns evidence, log, blocker, risk, and approval validity.
- **status projection:** combines lifecycle and current validation into a fresh-agent handoff.
- **attestation delivery:** derives a validity result from state and current validation.

## aggregates/entities/value objects

- Run definition and transition history.
- Workspace fingerprint.
- Validation result and validation errors.
- Status projection with one `nextAction` string.

## commands

- Inspect a run with `eh status` or `eh summary`.
- Validate current evidence with `eh validate`.
- Start a fresh run when a terminal run is invalid for the current workspace.

## events

- Evidence capture binds a criterion to a workspace fingerprint.
- A tracked workspace change makes prior evidence stale.
- Status inspection derives current state and validation together.

## policies/rules

- Completed runs have no legal outgoing lifecycle transition.
- Current validation must be valid before a completed run can be handed off as complete.
- A stale completed run is historical evidence, not an active run to resume.
- The status projection must not recommend an action contradicted by its validation result.

## invariants

- The run remains `complete` even when later workspace changes make current validation invalid.
- `attestation.valid` is false unless both state is complete and current validation is valid.
- A valid completed run keeps the existing handoff action.
- An invalid completed run directs the operator to a fresh run and exposes validation errors for diagnosis.

## external systems

- Git provides the current workspace fingerprint inputs.
- Bun executes the protocol CLI and test commands.

## integration points

- `readRunStatus` combines lifecycle and validation.
- `createAttestation` independently derives validity from the same current validation.
- The CLI formats `nextAction` into JSON and human-readable summaries.

## ambiguity

The status output has one free-form action string rather than a structured action code. This slice preserves that experimental contract and corrects only the stale terminal branch; a future schema decision could introduce structured action identifiers, but that is out of scope.

## recommended next questions

- Should a future status schema expose a machine-readable action code alongside the human message?
- Should stale historical runs retain an explicit original completion fingerprint in the summary, or is the validation error sufficient?
