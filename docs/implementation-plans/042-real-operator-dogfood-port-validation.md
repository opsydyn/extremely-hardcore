# implementation plan: real operator dogfood Bun port validation

## behaviour to protect

Valid `FUNCTIONS_CUSTOMHANDLER_PORT` values continue to win over valid `PORT`
values. A valid `PORT` value remains usable when the custom-handler variable is
absent or invalid. Both invalid values return the existing fallback. Explicit
`azureBunServe(app, { port })` configuration remains caller-owned.

## first failing test

Add a Bun helper test that sets malformed and out-of-range custom-handler values
with a valid lower-priority `PORT`, then checks that both invalid values fall
through to `PORT` and that invalid values in both variables return `3000`. Run
the focused test against the built baseline; it must fail because the current
`parseInt` implementation returns the malformed prefix or out-of-range number.

## smallest implementation

Add one private parser in `src/bun.ts` that trims, requires decimal digits,
converts, and range-checks the environment string. Apply it independently to
the two environment variables with nullish fallback to the next candidate.
Avoid imports, dependencies, new options, thrown errors, or changes to
`createAzureBunServeOptions` beyond consuming the existing helper result.

## refactor step

Only refactor if the parser or resolution expression is unclear after tests
pass. Do not generalize configuration validation beyond this helper.

## checks to run

- Focused invalid-port regression in the red and green phases.
- Full `bun run test`.
- `bun run typecheck`.
- `bun run build`.
- `bun run lint:all`.
- `bun run docs:api:check`.
- `bun run size`.
- `bun run pack:dry-run`.
- `git diff --check`.
- EHS evidence, completion validation, attestation, and CI output.

## rollback plan

Revert the isolated target commit. The change is local to the Bun helper and its
tests, has no migration or persistent state, and does not require a compatibility
shim.

## notes

The target package uses `package-lock.json`; Bun installation may create an
untracked `bun.lock`, which must remain outside the target commit.
