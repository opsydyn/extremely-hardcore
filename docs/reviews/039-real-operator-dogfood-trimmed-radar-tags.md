# review: real operator dogfood trimmed radar tags

## proposed change

In an isolated `tech-radar-web` worktree, trim surrounding whitespace from source tags at the existing `filterBlipsByTag` comparison so normalized selectable options match their blips.

## review findings

- No correctness findings in the scoped two-file target diff.
- The red test reproduced the user-visible mismatch: `Cloud` was available but did not select a source tag of `" Cloud "`.
- The final regression proves the available tag remains `Cloud` and the matching blip is returned.
- Existing case-insensitive matching, `__all__` behavior, and the separate ADR filter remain untouched and covered.
- The implementation is one local `trim()` call; no shared utility, schema migration, or content rewrite was introduced.

## verification risks

- The repository-wide `bun run test` fails before and after the change in `apps/astro/src/components/BlipHistory.test.ts` because Vanilla Extract cannot assign styles to the imported file. The failure is outside the touched files; 54 tests pass after the change.
- App lint exits successfully but reports 337 existing CSS ordering/style warnings.
- `bun run moon:check` cannot run in this non-TTY environment because Moon requires an explicit task identifier; it was not used as a completion criterion.
- The test proves the pure filtering boundary, not manual browser interaction across every radar view.
- The target branch is committed as `ffc985c` and remains isolated in its temporary worktree.

## verdict

safe with noted risk

## follow-up

Keep commit `ffc985c` isolated until the owner integrates it. Do not broaden tag normalization into content ingestion or persisted schema behavior from this run.
