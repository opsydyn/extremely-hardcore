# change contract: resolved blocked status next action

## user intent

Run the third real operator dogfood slice by correcting the blocker handoff: when a run is in `blocked` state but its blocker has been resolved, `eh status` must direct the operator to resume or abandon the run instead of asking them to resolve an already-closed blocker. Exercise the real `implemented -> blocked -> implemented` path and complete the slice through the EHS evidence gate.

## current understanding

At the current checkout, `readRunStatus` treats every `blocked` state as requiring blocker resolution. The lifecycle already allows a blocked run to resume to `implemented` once no blocker remains open, and the existing lifecycle test performs exactly that state change without testing the status projection between resolution and resumption.

The current worktree also contains the uncommitted Run 2 status correction and its records. No commit boundary was approved in the previous turn. Run 3 must preserve those intentional changes, add only its own bounded source/test/docs, and state that inherited workspace state in its evidence rather than silently treating the checkout as clean.

## allowed scope

- Change the blocked branch in `protocol/status.ts` so it distinguishes open blockers from a resolved blocker in a blocked run.
- Add a focused regression test in `tests/protocol/status-attestation.test.ts` covering the real blocked, resolved, and resumable sequence while preserving the open-blocker action.
- Exercise the Run 3 protocol path with `eh transition ... blocked`, status inspection, blocker resolution, status inspection, and `eh transition ... implemented`.
- Add the Run 3 contract, decision challenge, domain map, implementation plan, review, issue, evidence ledger, and dogfood record.
- Preserve Run 2 files and the existing lifecycle, validation, fingerprint, status schema, and CLI command shapes.

## forbidden scope

- No new lifecycle state, transition, blocker schema, status field, dependency, adapter, evaluator, scheduler, or orchestration mechanism.
- No change to `isLegalTransition`, blocker validation, evidence freshness, or terminal-state rules.
- No broad status-message rewrite or structured action protocol.
- No provider execution, comparison, benchmark, containment, sandbox, network, or skill-effect claim.
- No unrelated cleanup, formatting sweep, or edits to Run 2 records.

## affected areas

- `protocol/status.ts` blocked-state handoff projection.
- `tests/protocol/status-attestation.test.ts` lifecycle/status regression coverage.
- Ignored Run 3 artifacts under `.extremely-hardcore/runs/`.
- Run 3 governance, evidence, and dogfood records.

## public contracts

The status JSON schema, lifecycle states, and legal transitions remain unchanged. The correction changes only the `nextAction` returned for a blocked run with zero open blockers. The existing open-blocker action remains stable. Architecture review: no ADR is required because this is a local projection correction with no module boundary, persistence shape, schema version, runtime, or lifecycle architecture change. The public-output correction is reviewed in the decision challenge.

## assumptions

- A blocked run can legitimately remain in `blocked` state for a short interval after its blocker is resolved and before the operator records the resume transition.
- A fresh agent needs a different instruction in that interval because `blocked -> implemented` is now legal and blocker resolution is already complete.
- The previous Run 2 changes are intentional baseline state, not an invitation to refactor status logic broadly.

## risks

- Consumers may have matched the old misleading string for resolved blocked runs; the status shape and open-blocker behavior remain stable.
- Resolving a blocker is currently represented by editing the run definition, not by a dedicated protocol command; this slice exercises that existing boundary without adding one.
- Because Run 2 is uncommitted, the Run 3 fingerprint includes both intentional slices until a future commit boundary is approved.

## acceptance evidence

- The focused regression fails before the status correction because a blocked run with zero open blockers receives the old resolution action.
- The focused regression passes after the smallest branch correction and retains the open-blocker assertion.
- The real Run 3 path records `implemented -> blocked`, exposes the open-blocker action, observes the resolved-blocker resume action, and records `blocked -> implemented`.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass.
- The fresh run covers all six criteria, validates, completes, and produces valid attestation and CI artifacts.

## stop conditions

Stop and record a blocker if the resolved-blocker state cannot be reached through the existing lifecycle, the focused test requires changing lifecycle or blocker semantics, any repository check fails, the change needs a new public schema or command, or the diff expands beyond Run 3 and the inherited Run 2 files.
