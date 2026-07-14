# implementation plan: core pressure-scenario runner

## first failing test

Import `runCoreScenarios` from the missing evaluation module and assert that it returns seven passing results with the expected taxonomy categories.

## smallest implementation

Create the evaluation result types, isolated workspace helpers, seven direct protocol scenarios, and a thin Bun script that serialises the report as JSON.

## checks

- Targeted evaluation tests.
- `bun run evaluate` parsed as JSON.
- `bun run check`, `bun run test`, and `bunx tsc --noEmit`.

## rollback

Remove `evaluation/`, `scripts/evaluate.ts`, its package script, and evaluation tests. Protocol data and runtime behaviour are untouched.
