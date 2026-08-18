# change contract: real operator dogfood roadmap Pi status

## user intent

Run the first real operator dogfood change from the V0 campaign: correct the stale Pi status in `ROADMAP.md`, execute the EHS completion workflow against the real repository, and record operational friction and handoff quality.

## current understanding

The repository is clean at commit `ef8abd1`. The provider section of `ROADMAP.md` still says live Pi evidence is blocked on authentication. That statement is stale: the authenticated Pi 0.84.1 run used `openai-codex/gpt-5.3-codex-spark`; a bounded repeat produced 13/13 passing assessments with complete artifact provenance. The retained evidence also records that this is not a provider comparison or containment proof.

The controlled dogfood harness has 10/10 passing cases, but the roadmap requires 10 real repository changes. This slice is real operator dogfood run 1/10.

## allowed scope

- Correct the stale provider status and next-gate wording in `ROADMAP.md`.
- Create and complete `.extremely-hardcore/runs/033-real-operator-dogfood-roadmap-pi-status/`.
- Record the run's friction, false-block result, setup overhead, and fresh-agent readability under `docs/dogfood/`.
- Record the commands and evidence under `docs/evidence/`.
- Add the project-native contract, domain map, implementation plan, review, and issue records for this run.

## forbidden scope

- No runtime, protocol schema, CLI, adapter, evaluator, dependency, CI, or skill instruction changes.
- No provider comparison, benchmark, regression threshold, containment, sandbox, network, or skill-effect claim.
- No new orchestration, scheduler, receipt schema, or automatic roadmap generator.
- Do not edit or regenerate retained Pi raw artifacts.
- Do not count the controlled harness as a real operator run.

## affected areas

- `ROADMAP.md` provider status and gated next-step prose.
- Ignored local run artifacts under `.extremely-hardcore/runs/`.
- Dogfood/evidence/governance documentation.

## public contracts

No runtime or API contract changes. The roadmap is a product-status document; its wording must remain bounded by committed evidence. The EHS run protocol is exercised, not changed.

## assumptions and risks

- The retained Pi reports are sufficient evidence to correct the authentication-blocked statement.
- A documentation correction is a useful first real operator change because it tests status handoff and evidence capture without adding product scope.
- The run is standard risk because it changes product documentation but not executable behavior.

## acceptance evidence

- The roadmap contains the authenticated Pi status, 13/13 repeat result, and explicit claim limits.
- The run captures fresh passing evidence for the roadmap claim, `bun run check`, `bun run test`, and `bunx tsc --noEmit`.
- `eh validate`, `eh transition ... complete`, `eh summary`, `eh attest`, and `eh ci` succeed.
- The dogfood record reports timing, friction, false blocks, workaround count, and fresh-agent readability.
- `git diff --check` passes and the worktree contains only the intentional source/documentation changes until commit.

## stop conditions

Stop and record a blocker if the roadmap claim cannot be verified from retained evidence, the completion gate reports stale or missing evidence, any check fails, or the change expands beyond documentation and dogfood records.
