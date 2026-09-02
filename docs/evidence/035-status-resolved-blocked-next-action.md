# evidence ledger: resolved blocked status next action

## work receipt

- result: complete
- claim: A blocked run with a resolved blocker now receives a resume-or-abandon handoff, while an open blocker still receives the existing resolution handoff.
- evidence: The focused regression failed before the correction and passed after it; the real CLI run recorded `implemented -> blocked`, showed both blocker actions, recorded `blocked -> implemented`, and the final six-criterion protocol gate completed with valid attestation and CI artifacts after one recaptured criterion.
- remaining uncertainty: Run 3 continues on top of Run 2's intentional uncommitted changes, and no external consumer was run against the corrected message. The blocker status is operator-declared; this slice does not verify the substantive human decision.
- next: Run a fourth real operator change that exercises the `needs-human-decision` handoff, then decide whether the blocker and decision messages are clear enough to retain as a stable v1 surface.

## summary

Run 3 fixed a contradiction in the blocker handoff. After a blocked run's blocker was marked resolved, `readRunStatus` still told the operator to resolve an open blocker. The lifecycle already permitted `blocked -> implemented`, so the status projection now distinguishes the intermediate resolved-blocker state and directs the operator to resume or abandon the run.

The existing FSM, blocker schema, validation rule, fingerprint, status schema, and CLI commands were not changed.

## changed files

- `protocol/status.ts` (Run 2 and Run 3 status corrections remain in the same working-tree file.)
- `tests/protocol/status-attestation.test.ts` (Run 2 and Run 3 regressions remain in the same working-tree file.)
- `docs/change-contracts/035-status-resolved-blocked-next-action.md`
- `docs/decision-challenges/035-status-resolved-blocked-next-action.md`
- `docs/domain/035-status-resolved-blocked-next-action.md`
- `docs/implementation-plans/035-status-resolved-blocked-next-action.md`
- `docs/reviews/035-status-resolved-blocked-next-action.md`
- `issues/035-status-resolved-blocked-next-action.md`
- `docs/evidence/035-status-resolved-blocked-next-action.md`
- `docs/dogfood/035-status-resolved-blocked-next-action.md`

Run 2's uncommitted records remain intentionally present and are not repeated here. The ignored protocol run is `.extremely-hardcore/runs/035-status-resolved-blocked-next-action/`.

## commands run

- `bun test tests/protocol/status-attestation.test.ts` -> expected red phase: 3 pass, 1 fail; the resolved blocked case received the old open-blocker action.
- `bun test tests/protocol/status-attestation.test.ts` -> green phase: 4 pass, 0 fail.
- `bun run eh status <run>` before blocking -> implemented, one open blocker, resolution action.
- `bun run eh transition <run> blocked --reason "waiting for review decision"` -> `implemented -> blocked`.
- `bun run eh status <run>` while blocked -> one open blocker, resolution action.
- Blocker resolution updated the existing run definition from `open` to `resolved`.
- `bun run eh status <run>` after resolution -> blocked, zero open blockers, resume-or-abandon action.
- `bun run eh transition <run> implemented --reason "review decision recorded"` -> `blocked -> implemented`.
- `bun run check` -> exit 0; scaffold validation passed.
- `bun run test` -> exit 0; 135 tests passed, 0 failed, 481 expect calls across 27 files.
- `bunx tsc --noEmit` -> exit 0.
- `git diff --check` -> exit 0.
- `bun run eh evidence ... blocked-handoff-regression -- bun test tests/protocol/status-attestation.test.ts` -> fresh protocol evidence.
- First `bun run eh evidence ... blocked-lifecycle-path -- bun -e <transition-history assertion>` -> exit 1 because the shell split the inline assertion before Bun received it.
- Recaptured `bun run eh evidence ... blocked-lifecycle-path -- bun -e <safely quoted transition-history assertion>` -> exit 0; the failed record was superseded in the criterion reference.
- `bun run eh evidence ... repository-validation -- bun run check` -> fresh protocol evidence.
- `bun run eh evidence ... repository-tests -- bun run test` -> fresh protocol evidence.
- `bun run eh evidence ... repository-typecheck -- bunx tsc --noEmit` -> fresh protocol evidence.
- `bun run eh evidence ... diff-check -- git diff --check` -> fresh protocol evidence.
- `bun run eh validate ...` -> completion gate valid.
- `bun run eh transition ... complete --reason "blocker handoff and repository checks verified"` -> `implemented -> complete`.
- `bun run eh summary ...` -> complete status projection.
- `bun run eh attest ...` -> valid attestation.
- `bun run eh ci ...` -> valid CI summary and attestation.

## passing checks

- The red/green regression covers both open and resolved blocker status actions and the existing resume transition.
- The real CLI path recorded block, blocker resolution, the corrected intermediate status, and resume.
- Repository scaffold validation, full tests, TypeScript, and diff checks passed.
- The final protocol run covers all six criteria with no open blockers and a valid current workspace fingerprint.
- Completion, summary, attestation, and CI derivations succeed from the final run.

## failing checks

- The first focused test run failed as designed before implementation. It was the expected TDD red phase, not a residual failure.
- The first lifecycle evidence command failed at the shell-quoting boundary before Bun ran; the criterion was recaptured successfully with an explicitly quoted assertion.

## architecture impact

No architecture, module boundary, dependency, persistence, schema version, lifecycle, runtime, or deployment change. The architecture decision check concluded that no ADR is required.

## public contract impact

The status JSON shape, open-blocker action, lifecycle states, and legal transitions are unchanged. One resolved-blocker `nextAction` outcome is corrected so it agrees with the existing `blocked -> implemented` transition.

## risks left open

- Run 3 was performed on top of Run 2's uncommitted worktree, so the protocol fingerprint covers both intentional slices until a commit boundary is approved.
- Inline evidence commands need careful quoting when passed through the shell; the final passing record is the authoritative criterion evidence.
- Blocker resolution is operator-declared through the existing run-definition boundary; this slice proves handoff behavior, not decision correctness.
- The action remains a human-readable string rather than a structured code.
- Three real operator changes do not establish operational readiness; the ten-run acceptance gate remains open.

## human review needed

Yes. Review the resume-or-abandon wording and decide whether Run 2 and Run 3 should be committed together or separated before the next dogfood slice.

## final recommendation

needs follow-up
