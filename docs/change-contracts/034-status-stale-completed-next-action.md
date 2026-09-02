# change contract: stale completed status next action

## user intent

Fix the real bounded status bug found during operator dogfood: when a completed run is inspected after a tracked workspace change, `eh status` must not tell the operator to hand off an attestation that is currently invalid. Add a focused regression test and complete the change through the EHS evidence gate.

## current understanding

At commit `2529ff9`, `readRunStatus` derives the terminal state and validates evidence against the current workspace fingerprint. Its `getNextAction` helper checks `state === "complete"` before checking `validation.ok`. A completed run can therefore report `validation.ok: false` while still returning `review the attestation and hand off the completed run`. The attestation and CI paths already make validity depend on both completion state and current validation.

The existing valid-completed status contract and the run lifecycle are correct. The defect is the ordering and wording of the status projection for a terminal run whose evidence is stale or otherwise invalid in the current workspace.

## allowed scope

- Change `protocol/status.ts` so invalid validation takes precedence over the valid completed handoff action.
- Add a focused regression test in `tests/protocol/status-attestation.test.ts` that creates a valid completed run, changes a tracked file, and checks the stale status action.
- Preserve the status JSON schema, field names, validation rules, fingerprint algorithm, lifecycle transitions, and attestation validity rules.
- Add the project-native issue, contract, domain, implementation-plan, review, decision-challenge, evidence, and dogfood records for this run.
- Capture fresh protocol evidence after the final tracked changes are committed.

## forbidden scope

- No new run state, transition, schema version, command, dependency, adapter, evaluator, scheduler, or orchestration mechanism.
- No change to what makes evidence stale or to whether completed runs remain terminal.
- No broad rewrite of status messages, CLI output, documentation, or user-facing skill instructions.
- No provider execution, comparison, benchmark, containment, sandbox, network, or skill-effect claim.
- No unrelated cleanup or refactoring.

## affected areas

- `protocol/status.ts` status handoff projection.
- `tests/protocol/status-attestation.test.ts` regression coverage.
- EHS run and governance records for real operator dogfood run 2.

## public contracts

The status JSON shape and the valid-completed action remain unchanged. This corrects one observable `nextAction` outcome: an invalid completed run is no longer presented as ready for handoff. The lifecycle remains terminal; the corrected action tells the operator to start a new run rather than attempting an impossible terminal transition.

Architecture review: no ADR is required because this is a local projection correction with no module boundary, persistence shape, schema version, runtime, or lifecycle architecture change. The public-output correction is explicitly reviewed in the decision challenge below.

## assumptions

- A completed run is historical, but its status must still describe whether its attestation is valid for the current workspace.
- Once a completed run becomes invalid for the current workspace, the safe operator action is to start a fresh run rather than recapture evidence into a terminal run.
- The existing exact action for a valid completed run is relied on by current tests and should remain stable.

## risks

- Consumers may have matched the old misleading string for stale completed runs; the corrected behavior is intentional and keeps the field shape stable.
- The generic validation errors remain the detailed diagnostic source; this slice does not add a structured stale-status code.
- The run becomes stale if tracked governance records are added after evidence capture, so final evidence must be captured only after the source and records are committed.

## acceptance evidence

- The focused regression fails before the status fix because the old completed handoff action is returned for stale evidence.
- The focused regression passes after the smallest status projection change and still verifies the valid-completed action.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass.
- The fresh run records passing evidence for all five criteria, validates, transitions `implemented -> complete`, and produces valid attestation and CI artifacts.
- The dogfood record reports measured setup, implementation, review, and command timing, friction, false blocks, workarounds, and fresh-agent readability.

## stop conditions

Stop and record a blocker if the stale sequence cannot be reproduced, the focused test requires changing validation or lifecycle semantics, any repository check fails, the change needs a new public schema or state, or the diff expands beyond the named files and run records.
