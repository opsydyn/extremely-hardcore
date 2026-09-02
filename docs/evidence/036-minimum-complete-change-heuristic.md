# evidence ledger: minimum complete change heuristic

## work receipt

- result: complete
- claim: The standalone `change-contract` skill now requires a concise minimum-complete-change decision and protects required engineering obligations without adding runtime or orchestration behaviour.
- evidence: The pre-change content assertion failed as the expected red phase; the post-change assertion passed; the real CLI path recorded `implemented -> needs-human-decision -> implemented`; repository validation, 135 tests across 27 files, TypeScript, and diff checks passed; the final Run 4 protocol gate, attestation, and CI artefacts are retained under the run path.
- remaining uncertainty: The semantic quality of an agent's chosen minimum cannot be established by a content assertion. No external consumer or provider run was used, and Run 2/3 remain inherited uncommitted workspace state.
- next: Continue the ten-run real operator campaign after a deliberate commit boundary and review whether the one-statement requirement adds acceptable overhead.

## summary

This ledger records the bounded documentation change that makes the minimum complete change explicit in EHS change contracts.

## changed files

- `skills/change-contract/SKILL.md`
- `skills/change-contract/templates/change-contract.md`
- Run 4 governance and dogfood records.

## commands run

- Pre-change content assertion -> exit 1 because both target files lacked the new phrase.
- Post-change content assertion -> exit 0; both target files contain the phrase and the skill names all protected obligations.
- `bun run check` -> exit 0; scaffold validation passed.
- `bun run test` -> exit 0; 135 tests passed, 0 failed, 481 expect calls across 27 files.
- `bunx tsc --noEmit` -> exit 0.
- `git diff --check` -> exit 0.
- Final Run 4 protocol evidence, validation, completion, attestation, and CI commands -> captured after this record was sealed.

## passing checks

- Post-change content assertion passed.
- The real CLI path exposed the required human-decision action and resumed to `implemented` through existing transitions.
- Scaffold validation, full tests, TypeScript, and diff checks passed.
- Final protocol artefacts are retained under `.extremely-hardcore/runs/036-minimum-complete-change-heuristic/`.

## failing checks

- The pre-change content assertion failed as the deliberate red phase because the target files lacked the new phrase.

## architecture impact

No architecture, module boundary, dependency, persistence, schema version, lifecycle, runtime, or deployment change. No ADR is required.

## public contract impact

The user-facing `change-contract` skill and template now require a concise minimum-complete-change statement for non-trivial work. No runtime, JSON, CLI, API, or provider contract changes.

## risks left open

- Run 4 measured the handoff and check window, but broader operator overhead and semantic adoption remain uncertain.
- The inherited Run 2 and Run 3 changes remain uncommitted in the workspace.

## human review needed

Yes. Review whether the concise required statement improves scope decisions without adding disproportionate ceremony. No architecture or runtime decision remains open.

## final recommendation

needs follow-up
