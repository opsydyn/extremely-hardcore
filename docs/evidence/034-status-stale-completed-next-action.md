# evidence ledger: stale completed status next action

## work receipt

- result: complete
- claim: The status handoff no longer recommends handing off a completed run whose current validation is invalid; valid completed runs retain their existing handoff action.
- evidence: The focused regression failed against the old implementation with the stale completed handoff message, passed after the one-branch correction, and the repository checks passed with 134 tests and 0 failures. The fresh protocol run records five passing criteria, validation, completion, attestation, and CI output.
- remaining uncertainty: This covers the status projection and its current test boundary only; no downstream consumer compatibility run or broader multi-agent dogfood claim was made.
- next: Run a third real operator change that exercises a recorded blocker or human decision and compare its handoff friction with this stale-state case.

## summary

Run 2 fixed a contradiction in the operator handoff. After a completed run's tracked workspace changed, `readRunStatus` already reported invalid current validation, but its `nextAction` still recommended reviewing and handing off the completed run. The projection now tells the operator to start a fresh run for that terminal invalid state while preserving the valid-completed message.

The change is intentionally local. Evidence freshness, lifecycle terminality, attestation validity, and the status schema were not changed.

## changed files

- `protocol/status.ts`
- `tests/protocol/status-attestation.test.ts`
- `docs/change-contracts/034-status-stale-completed-next-action.md`
- `docs/decision-challenges/034-status-stale-completed-next-action.md`
- `docs/domain/034-status-stale-completed-next-action.md`
- `docs/implementation-plans/034-status-stale-completed-next-action.md`
- `docs/reviews/034-status-stale-completed-next-action.md`
- `issues/034-status-stale-completed-next-action.md`
- `docs/evidence/034-status-stale-completed-next-action.md`
- `docs/dogfood/034-status-stale-completed-next-action.md`

The ignored protocol run is `.extremely-hardcore/runs/034-status-stale-completed-next-action/`.

## commands run

- `bun test tests/protocol/status-attestation.test.ts` -> expected red phase: 2 pass, 1 fail; the stale completed case received the old handoff message.
- `bun test tests/protocol/status-attestation.test.ts` -> green phase: 3 pass, 0 fail.
- `bun run check` -> exit 0; scaffold validation passed.
- `bun run test` -> exit 0; 134 tests passed, 0 failed, 474 expect calls across 27 files.
- `bunx tsc --noEmit` -> exit 0.
- `git diff --check` -> exit 0.
- `bun run eh evidence ... status-regression -- bun test tests/protocol/status-attestation.test.ts` -> fresh protocol evidence.
- `bun run eh evidence ... repository-validation -- bun run check` -> fresh protocol evidence.
- `bun run eh evidence ... repository-tests -- bun run test` -> fresh protocol evidence.
- `bun run eh evidence ... repository-typecheck -- bunx tsc --noEmit` -> fresh protocol evidence.
- `bun run eh evidence ... diff-check -- git diff --check` -> fresh protocol evidence.
- `bun run eh validate ...` -> completion gate valid.
- `bun run eh transition ... complete --reason "status regression and repository checks verified"` -> `implemented -> complete`.
- `bun run eh summary ...` -> complete status projection.
- `bun run eh attest ...` -> valid attestation.
- `bun run eh ci ...` -> valid CI summary and attestation.

## passing checks

- The red/green regression proves both the stale completed branch and the unchanged valid-completed branch.
- Repository scaffold validation, full tests, TypeScript, and diff checks passed.
- The final protocol run covers all five criteria with no open blockers and a valid current workspace fingerprint.
- Completion, summary, attestation, and CI derivations succeed from the final run.

## failing checks

- The first focused test run failed as designed before implementation. It was the expected TDD red phase, not a residual failure.

## architecture impact

No architecture, module boundary, dependency, persistence, schema version, lifecycle, runtime, or deployment change. The architecture decision check concluded that no ADR is required.

## public contract impact

The status JSON shape and valid-completed action are unchanged. One invalid-completed `nextAction` outcome is corrected so it agrees with the existing validation and attestation rules. The decision challenge recorded `proceed` for this bounded public-output correction.

## risks left open

- A consumer that depended on the old misleading stale-completed string may need to adjust, although the field shape is stable.
- The action remains a human-readable string rather than a structured code; structured action identifiers are future work, not part of this fix.
- Two real operator changes do not establish operational readiness; the ten-run acceptance gate remains open.

## human review needed

Yes. Review whether the fresh-run wording is the right terminal-state handoff and whether the measured setup/review overhead is acceptable before generalising the status contract.

## final recommendation

needs follow-up
