# bounded-context review: action-fixture protocol hardening

## proposed change

Add runner-local integrity validation around injected executor boundaries and artifact traversal.

## affected contexts

- Evaluation fixture runner
- Existing protocol read/validation APIs
- Focused action-fixture tests

## allowed dependencies

`action-fixture runner -> protocol validation/read APIs + local filesystem`.

## suspicious dependencies

Changes to protocol schema, generic validation semantics, or provider adapters are out of scope.

## data ownership

The runner owns the initial run-contract snapshot, request command, workspace inventory, retained-artifact selection, and report. Protocol owns evidence data formats and completion semantics.

## transaction boundaries

Each executor return is followed by runner validation before the next stage or report construction.

## integration events

No new events or external integrations.

## anti-corruption needs

Keep fixture-specific argv and immutability checks out of generic protocol validation.

## verdict

safe. The change tightens an existing runner boundary without changing imports, shared contracts, or protocol ownership.
