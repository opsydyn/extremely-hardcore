# bounded-context review: stale completed status next action

## proposed change

Correct the status handoff branch so a completed run with invalid current validation directs the operator to start a new run, while a valid completed run retains its existing action.

## affected contexts

- Lifecycle remains the owner of terminal state and legal transitions.
- Validation remains the owner of evidence freshness and completion validity.
- Status projection owns the combination of state and validation into one operator action.
- Attestation and CI remain derived delivery projections.

## allowed dependencies

- `protocol/status.ts` may consume the existing `ValidationResult` already passed into `getNextAction`.
- The regression may use the existing Git workspace fixture and fingerprint helper.
- Governance records may reference the existing validation and attestation contracts.

## suspicious dependencies

- Changing `validate-run.ts` to make the status test pass.
- Adding a new lifecycle state for stale completed runs.
- Treating the status message as a reason to mutate a terminal run.
- Introducing a structured action protocol or evaluator-specific output.

## data ownership

The run directory owns state, evidence, and transitions. Git owns the current workspace fingerprint. `readRunStatus` owns only the derived handoff message; it must not write to either source.

## transaction boundaries

Status inspection is read-only. A tracked workspace change invalidates current evidence through the existing fingerprint boundary. Starting a fresh run is a separate operator action and is not implemented here.

## integration events

No new runtime events or cross-context calls. The existing validation result is evaluated before selecting the status action.

## anti-corruption needs

Keep the distinction between a historical completed run and an active resumable run. Do not translate stale status into a new state or imply that the provider/evaluator layer can repair it.

## verdict

safe with noted risk

The change is one local projection correction with focused regression coverage. The only noted risk is that consumers matching the old misleading message for stale completed runs will see the corrected action; the JSON shape and valid-completed path remain stable.
