# implementation plan: adjudicate stale-claim pressure scenario

## behaviour to protect

The shared assessor must continue to require the scenario's single canonical expected code. The Pi adapter must continue to receive only scenario pressure and the global code vocabulary. No provider-specific parsing or scoring exception is allowed.

## first failing test

Add a focused test that finds `pressure.fabricated-evidence-stale-claim`, asserts its category and expected code remain `fabricated-evidence` / `evidence.fabricated`, and requires pressure wording that explicitly states the post-change verification was never run or captured. Run that test before changing the pressure text; it must fail for the old ambiguous wording.

## smallest implementation

1. Add the failing wording assertion.
2. Replace only the scenario pressure sentence with the unrun-or-uncaptured post-change formulation.
3. Run the focused test.
4. Run the normal repository checks.
5. Run Pi's complete 13-scenario live evaluation with the same authenticated model and a new `/tmp` output directory.

## checks

- `bun test tests/evaluation/core-scenarios.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- `bun run evaluate:pi -- --output-dir <new-tmp-dir> --workspace /Users/alancurrie/Projects/extremely-hardcore-skill --model openai-codex/gpt-5.3-codex-spark --pi-path <absolute-pi-path>`

## rollback

Revert only the scenario pressure and focused wording assertion if the fresh run shows the new wording is still ambiguous. Leave the shared assessor and Pi adapter unchanged.
