# implementation plan: literal computed Effect boundary recognition

## behaviour to protect

In a non-boundary Effect module, direct literal computed execution such as
`Effect["runPromise"](program)` must receive the existing execution-boundary
diagnostic. The equivalent form in a configured boundary must remain allowed.
Dynamic keys must remain unclassified.

## first failing test

Add a direct rule-harness case for `no-run-effect-outside-boundary` using a
computed `Effect["runPromise"]` call, plus a CLI fixture line and exact
integration expectation. Run the focused unit assertion before changing
`src/index.ts`; it must fail because the current report count is zero.

## smallest implementation

Update `isEffectMemberCall` to accept a literal string property when
`computed === true`, and update the existing named-method lookup to read that
static property. Leave dynamic computed expressions outside the predicate.

## refactor step

No refactor is planned. If the helper change causes unrelated fixture output to
move, stop and inspect the diff rather than broadening the change.

## checks to run

- Focused unit regression.
- Focused Oxlint CLI integration regression.
- `bun run test`.
- `bun run typecheck`.
- `bun run build`.
- `bun run lint`.
- `bun run docs:api:check`.
- `bun run size`.
- `bun run pack:dry-run`.
- `git diff --check`.
- EHS evidence, validation, attestation, and CI artefacts.

The fixture-only `bun run lint:examples` command is expected to report the
repository's intentional anti-pattern examples and will be recorded separately.

## rollback plan

Before target integration, remove the isolated commit or revert the single
target commit. The EHS records remain historical evidence and do not alter the
target package. No migration, deployment, or external-state rollback exists.

## notes

The target branch is `ehs/run9-computed-effect-boundary`, based on `ac7dc2a`.
The EHS protocol run is `041-real-operator-dogfood-computed-effect-boundary`.
