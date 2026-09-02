# Align radar tag filtering with normalized options

## problem

The radar builds selectable tag options after trimming surrounding whitespace, but `filterBlipsByTag` compares source tags without trimming them. A blip tagged `" Cloud "` is therefore displayed as part of the `Cloud` option but is omitted when that option is selected.

## impact

Users can select a visible tag and receive incomplete results. The mismatch is silent because the source data and filter option differ only by editorial whitespace.

## expected behaviour

Compare each source tag after removing surrounding whitespace, while preserving case-insensitive matching, the `__all__` sentinel, input immutability, and existing display casing.

## scope

One comparison change in `apps/astro/src/hooks/useBlipSearch.ts` and one regression in `apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts`. No content schema, route, persistence, dependency, build, or deployment change.

## verification

The new regression fails before the comparison change and passes after it. The focused search tests, Astro build, app lint, diff check, and EHS Run 7 completion gate pass. The repository-wide Vitest command retains one pre-existing Vanilla Extract file-scope failure in `BlipHistory.test.ts`.
