# evidence ledger: new user guide

## summary

Added a newcomer-oriented guide for the current private Bun package and Codex plugin source tree. The guide starts with no-model health checks, explains the deterministic evaluations and proof-carrying demo, documents a real `eh` run smoke flow, describes host-agent loading without inventing host-specific commands, and keeps Claude/Pi provider claims bounded.

## changed files

- `docs/user-guide.md`
- `README.md` (new-user guide link)
- `docs/change-contracts/030-new-user-guide.md`
- this evidence ledger

The worktree already contained unrelated changes before this slice. Those changes were left untouched.

## commands run

- `bun install --frozen-lockfile`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- `bun run evaluate`
- `bun run evaluate:full`
- `bun run dogfood`
- `bun examples/proof-carrying-completion/demo.ts`
- `bun run evaluate:action-fixture -- --output-dir /tmp/extremely-hardcore-action-fixture-user-guide-20260810-a`
- `bun run eh evidence .extremely-hardcore/runs/user-guide-smoke criterion-a -- bun run check`
- `bun run eh evidence .extremely-hardcore/runs/user-guide-smoke criterion-b -- bun run test`
- `bun run eh status .extremely-hardcore/runs/user-guide-smoke`
- `bun run eh validate .extremely-hardcore/runs/user-guide-smoke`
- `bun run eh transition .extremely-hardcore/runs/user-guide-smoke complete`
- `bun run eh summary .extremely-hardcore/runs/user-guide-smoke`
- `bun run eh attest .extremely-hardcore/runs/user-guide-smoke /tmp/extremely-hardcore-user-guide-attestation.json`
- `bun run eh ci .extremely-hardcore/runs/user-guide-smoke /tmp/extremely-hardcore-user-guide-ci`

## passing checks

- Locked dependency installation completed with no changes.
- Structural validation passed.
- 132 tests passed across 27 files with 0 failures and 469 expect calls.
- TypeScript emitted no errors.
- `git diff --check` passed.
- The deterministic evaluator passed all seven scenarios.
- The full evaluator passed all three required repetitions across the 20-scenario corpus.
- Controlled dogfood passed 10/10 cases with 0 false blocks.
- The proof demo showed uncovered-criterion rejection, stale-evidence rejection, and accepted completion.
- The deterministic action-fixture reference proof passed with a fresh output directory.
- The documented `eh` smoke run reached valid completion with 2/2 criteria covered and produced attestation and CI artefacts.

## failing checks

None.

No live provider evaluation was attempted. Provider credentials and provider CLIs are intentionally outside the required first-run path.

## architecture impact

None. This is documentation-only. No runtime, protocol, dependency, sandbox, provider, CI, or package architecture changed. The architecture-decision trigger list was checked and no ADR is required.

## public contract impact

None. Existing commands and schemas are documented but unchanged. The guide explicitly states that the package is private, schema version 1 is experimental, and requested provider flags are not enforcement proof.

## risks left open

- Host-specific plugin installation commands remain environment-dependent and are intentionally not guessed.
- The documented `run.json` copy is a disposable smoke path; real projects still need project-specific run definitions and acceptance criteria.
- The protocol remains local traceability rather than cryptographic trust or hostile-workspace protection.
- Live provider execution, network isolation, sandbox enforcement, containment, and comparison claims remain separate evidence gates.

## human review needed

A quick documentation review is useful for the preferred Codex and Claude installation wording in the target environments. No implementation or architecture decision is blocked.

## final recommendation

merge
