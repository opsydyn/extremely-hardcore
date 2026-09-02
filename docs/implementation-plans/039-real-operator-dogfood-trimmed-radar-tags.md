# implementation plan

## behaviour to protect

Selecting a normalized tag option must include blips whose source tag has surrounding whitespace, while preserving case-insensitive matching, empty-tag omission, and the `__all__` sentinel.

## first failing test

Add a focused test in `apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts` with a blip tagged `" Cloud "`. Assert that `getAvailableRadarTags` returns `Cloud` and that filtering by that returned value includes the blip. Run:

```bash
bun run test -- apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts
```

The new assertion must fail before implementation because the displayed normalized value does not equal the untrimmed source tag.

## smallest implementation

Apply `tag.trim()` inside the existing `filterBlipsByTag` comparison and leave all surrounding helper behavior unchanged.

## refactor step

None. A shared normalization helper would add scope without removing meaningful duplication.

## checks to run

- Focused tag-filter test during the red/green loop.
- Full target `bun run test`.
- Target Astro app build/typecheck through `bun run --cwd apps/astro build`.
- Repository Moon check where the clean worktree supports it.
- `git diff --check` and final exact-file diff inspection.
- EHS protocol validation, summary, attestation, and CI output.

## rollback plan

Before target commit, restore only the two named target files in the isolated worktree. After commit, revert the single target commit without touching the active checkout or EHS records.

## notes

No decision challenge is required: this slice does not introduce external execution, change a public API, alter persistence, or cross a security, sandbox, provenance, deployment, or architecture boundary. No bounded-context review is required because imports, module ownership, and integration flows remain unchanged.
