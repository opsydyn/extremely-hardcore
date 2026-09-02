# decision challenge: stale completed status next action

## trigger

The proposal changes an observable CLI status action in the public handoff contract. It must preserve the status schema and avoid turning a local projection fix into a lifecycle redesign.

## proposal and claims

When `validation.ok` is false, make that failure take precedence over the completed handoff action. For a completed run that is invalid against the current workspace, return `start a new run; completed run validation is invalid`. Preserve `review the attestation and hand off the completed run` for valid completed runs.

The claim is limited to correcting an inconsistent status projection: the current status will no longer recommend handoff when the attestation path would report invalid. This does not claim that the run is tamper-proof, that evidence is externally trusted, or that a new run will succeed.

## existing-platform ownership

`validateCompletion` owns evidence and approval validity. `deriveCurrentState` owns lifecycle state. `createAttestation` and `eh ci` already combine terminal state with validation for their validity result. `readRunStatus` owns the concise operator handoff projection.

## durable differentiated value

The repository-owned value is the small, deterministic handoff contract that makes state and current evidence agree. The fix does not add a new runtime or evaluator capability.

## strongest counterargument

A completed run is historical, so its handoff action could be considered valid for the original completion fingerprint even after later workspace changes. However, `eh status`, `eh attest`, and `eh ci` all evaluate the current workspace; directing the operator to hand off an attestation that is currently marked invalid is materially misleading. Starting a new run is the only action compatible with the terminal lifecycle.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Status can report a completed run as invalid while recommending handoff. | `protocol/status.ts` checks `state === "complete"` before `validation.ok`; the workspace fingerprint invalidates evidence after tracked changes. | No existing regression covers this completed-plus-stale combination. | Reproduction and focused failing test. |
| Valid completed runs must retain their current handoff action. | Existing `status-attestation.test.ts` asserts the current action for a valid completed run. | The fix could accidentally change the normal handoff path. | Regression test covering both valid and stale completed runs. |
| No lifecycle or validation change is needed. | `attestation.ts` already uses `state === "complete" && validation.ok`; lifecycle makes complete terminal. | The corrected message is a new observable branch. | Diff review and full protocol suite. |

## minimum credible slice

One condition-ordering correction in `protocol/status.ts`, one focused regression test, and the normal repository/evidence gates. No schema, state, validator, or CLI command changes.

## stop conditions

- The stale completed sequence cannot be reproduced with the existing fingerprint mechanism.
- The fix requires changing evidence freshness, completion validation, or terminal transitions.
- Existing valid-completed status output changes unintentionally.
- Any result is described as proof of provider quality, containment, sandbox enforcement, or general agent reliability.

## verdict

proceed

## rationale

The proposal repairs a directly observable contradiction between the status handoff and the existing attestation validity rule. It is reversible, testable with a real tracked-file change, and leaves the lifecycle and evidence boundaries intact.
