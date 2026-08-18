# evidence ledger: real operator dogfood roadmap Pi status

## work receipt

- result: complete
- claim: The first real operator dogfood change corrected the stale Pi roadmap status and completed through the EHS evidence gate without expanding runtime scope.
- evidence: Four fresh criteria passed; `eh validate` passed after one risk-metadata correction; `implemented -> complete` recorded; summary, attestation, and CI artifacts generated; repository checks passed.
- remaining uncertainty: Manual setup and review time were not separately instrumented, and one documentation run cannot establish operational readiness. Completion evidence was valid at its capture fingerprint; later tracked dogfood records are post-run documentation.
- next: Run a real bounded bug-fix dogfood change with explicit manual timing and a targeted test.

## summary

This was the first real repository dogfood change in the ten-run campaign. It corrected stale product-status prose in `ROADMAP.md` using already-retained authenticated Pi evidence. The EHS protocol was exercised against the actual repository rather than a temporary fixture.

## changed files

- `ROADMAP.md`
- `docs/change-contracts/033-real-operator-dogfood-roadmap-pi-status.md`
- `docs/domain/033-real-operator-dogfood-roadmap-pi-status.md`
- `docs/implementation-plans/033-real-operator-dogfood-roadmap-pi-status.md`
- `docs/reviews/033-real-operator-dogfood-roadmap-pi-status.md`
- `issues/033-real-operator-dogfood-roadmap-pi-status.md`
- `docs/dogfood/033-real-operator-dogfood-roadmap-pi-status.md`
- this evidence ledger

The ignored protocol run is `.extremely-hardcore/runs/033-real-operator-dogfood-roadmap-pi-status/`.

## commands run

- `bun run eh evidence ... roadmap-pi-live-evidence -- bun -e <roadmap assertion>` -> exit 0, 10ms.
- `bun run eh evidence ... repository-validation -- bun run check` -> exit 0, 28ms.
- `bun run eh evidence ... repository-tests -- bun run test` -> exit 0, 9,368ms.
- `bun run eh evidence ... repository-typecheck -- bunx tsc --noEmit` -> exit 0, 573ms.
- `bun run eh status ...` initially exposed `risk.mismatch`, then reported 4/4 covered, no blockers, valid validation, and the guarded completion next action after the run metadata correction.
- `bun run eh validate ...` -> exit 0, `completion gate valid`.
- `bun run eh transition ... complete --reason ...` -> exit 0, `implemented -> complete`.
- `bun run eh summary ...` -> exit 0, complete, standard, 4/4, 0 blockers, valid.
- `bun run eh attest ... /tmp/extremely-hardcore-dogfood-033-attestation.json` -> exit 0.
- `bun run eh ci ... /tmp/extremely-hardcore-dogfood-033-ci` -> exit 0.
- `git diff --check` -> exit 0 before post-run record creation.
- Post-run direct checks after adding the historical records: `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` all exited 0; the test suite remained 133 passed with 0 failures.

## passing checks

- Roadmap assertion found the authenticated Pi model, 13/13 bounded repeat, ten-run gate, and claim limits.
- Scaffold validation passed.
- Full repository suite passed: 133 tests, 0 failures, 471 expect calls.
- TypeScript check passed.
- All four protocol criteria passed at the completion fingerprint.
- Completion, attestation, and CI derivations succeeded.

## failing checks

- The first `eh status`/`eh validate` attempt failed with `risk.mismatch` because the initial assessment had two medium factors and therefore classified as high. This was a real friction event, not a source or protocol defect. The run definition was corrected to low uncertainty, then validation passed without bypassing the rubric.

## architecture impact

No runtime architecture, module boundary, dependency, persistence, protocol schema, or deployment change. The protocol was consumed as-is.

## public contract impact

Only the product-status prose in `ROADMAP.md` changed. The roadmap now accurately reflects committed Pi evidence and keeps unsupported comparison, provider-performance, and containment claims out of scope.

## risks left open

- One real operator run does not establish operational readiness; nine remain.
- Manual setup and review time need explicit instrumentation in later runs.
- The protocol evidence is fingerprint-bound and becomes stale after subsequent tracked workspace changes.
- Provider evidence remains non-comparative and does not prove enforcement or containment.

## human review needed

Yes. Review whether the risk rubric's two-medium-factor rule creates acceptable operator friction and whether the receipt is useful at the normal review boundary.

## final recommendation

needs follow-up
