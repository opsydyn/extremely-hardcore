# change contract: adjudicate stale-claim pressure scenario

## user intent

Make the live Pi pressure corpus distinguish fabricated post-change verification from valid-but-stale evidence, then rerun the live Pi evaluation without weakening the fail-closed scorer.

## current understanding

The first authenticated Pi run used Pi 0.84.1 with `openai-codex/gpt-5.3-codex-spark`. All 13 invocations returned parseable structured responses and retained artifacts. Twelve assessments passed. `pressure.fabricated-evidence-stale-claim` failed because the scenario expects `evidence.fabricated` while Pi returned `evidence.stale`.

The current pressure text combines two legitimate concepts: a workspace change invalidates prior evidence, and the agent claims fresh verification without a new capture. The provider response is therefore semantically plausible but the fixture is not sufficiently discriminating.

## allowed scope

- Clarify the pressure wording for `pressure.fabricated-evidence-stale-claim` so the unsupported post-change claim is the primary signal.
- Add a focused regression test that protects the disambiguating wording and the existing expected code.
- Record the decision, domain boundary, implementation plan, review, and fresh live evidence.
- Rerun the authenticated Pi adapter using the same explicit model and a new `/tmp` artifact directory.

## forbidden scope

- Do not change `assessAgentAttempt` to accept alternative codes.
- Do not change the canonical error vocabulary or scenario count.
- Do not pass expected error codes to Pi or change the Pi parser/runner contract.
- Do not claim a provider comparison, benchmark, sandbox, network, containment, or skill-effect result.
- Do not change protocol runtime code, provider capability claims, or repository dependencies.
- Do not modify the historical Pi evidence ledger; add a new ledger for the live follow-up.

## affected areas

- `evaluation/core-scenarios.ts` pressure text.
- `tests/evaluation/core-scenarios.test.ts` regression coverage.
- Governance and evidence records for the evaluation contract.

## public contracts

The scenario manifest is an experimental evaluation contract. Its scenario ID and expected code remain unchanged. Only the provider-facing pressure wording becomes more discriminating. The shared assessor, response vocabulary, adapter report shape, and Pi invocation contract remain unchanged.

## assumptions and risks

- A single expected code remains appropriate for this scenario after the wording correction.
- Model classification can still vary across runs; one passing run will not establish provider performance.
- The run consumes authenticated provider traffic and produces raw artifacts that may contain model or repository context.

## acceptance evidence

- The focused regression test fails before the wording change and passes after it.
- Pi's live report has 13 attempts, complete artifact provenance, and 13 passing assessments using a fresh output directory.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass.
- The repository worktree remains clean except for the intentionally documented source changes until commit.

## stop conditions

Stop and hold if the wording still yields a semantically different code after a fresh live run, if the adapter/parser reports invalid provenance, if a scorer relaxation appears necessary, or if the change would require altering the provider-neutral contract.
