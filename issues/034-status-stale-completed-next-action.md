# Status recommends handoff for an invalid completed run

## problem

After a run completes successfully, a later tracked workspace change makes its evidence stale. `eh status` reports `validation.ok: false`, but `nextAction` still says `review the attestation and hand off the completed run` because the completed-state branch runs before the validation branch.

## impact

A fresh operator or agent can follow a handoff instruction that contradicts the attestation and CI validity result. The run is terminal, so attempting to repair it in place is not a valid lifecycle action.

## expected behaviour

For a completed run with invalid current validation, status should say `start a new run; completed run validation is invalid` and retain the detailed validation errors. A valid completed run should retain its existing handoff action.

## scope

One branch-order correction in `protocol/status.ts` and one regression test covering a real tracked-file mutation. No lifecycle, validator, schema, or dependency changes.

## verification

The regression must fail against the current implementation, pass after the correction, and be followed by the repository check, test, typecheck, diff, and fresh protocol completion gates.
