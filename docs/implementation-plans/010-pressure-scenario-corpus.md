# implementation plan: pressure-scenario corpus

## behaviour to protect

The core runner reports only genuinely executable protocol scenarios. The agent-attempt assessor compares any declared scenario using the same manifest.

## first failing test

Assert that the manifest has 20 unique scenarios, covers the six roadmap failure categories, and marks only the seven existing core fixtures as `deterministic`. Assert the assessor passes a behavioural scope-drift attempt.

## smallest implementation

Extend `ScenarioDefinition`, declare the 13 behavioural scenarios beside the existing seven, export a filtered deterministic list, and make the runner iterate that list.

## refactor step

Replace the runner's hard-coded result list only where it can safely derive scenario metadata from the deterministic manifest. Keep scenario execution functions explicit.

## checks to run

- Focused evaluation tests.
- `bun run evaluate`.
- `bun run check`, `bun run test`, and `bunx tsc --noEmit`.
- Completion-gate validation.

## rollback plan

Revert the manifest expansion and ADR together. No persisted schema, protocol state, or external integration changes.

## notes

No provider calls or benchmark thresholds belong to this slice.
