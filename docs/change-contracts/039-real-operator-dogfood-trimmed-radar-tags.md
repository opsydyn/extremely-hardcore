# change contract: real operator dogfood trimmed radar tags

## user intent

Run the seventh real EHS dogfood change in an isolated external repository. Fix the radar tag filter so a tag with incidental source whitespace can be selected from the normalized tag list and still match its blips.

## current understanding

The target is `tech-radar-web` at committed `HEAD` `a7c194a4867e6c933c8d17ba8f5d874e9109bb3d` in `/private/tmp/ehs-run7-tech-radar`, a temporary branch created from the clean active repository. The active `/Users/alancurrie/Projects/tech-radar-web` checkout is clean and remains protected.

`getAvailableRadarTags` trims each source tag before presenting unique values. `filterBlipsByTag` compares the original untrimmed source tag, so a blip tagged `" Cloud "` is exposed as `Cloud` but is omitted when the user selects `Cloud`.

## allowed scope

- Add one regression to `apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts`.
- Normalize source tag whitespace at the existing comparison point in `apps/astro/src/hooks/useBlipSearch.ts`.
- Record the EHS Run 7 protocol and governance evidence in this repository.

## forbidden scope

- Do not edit the active `tech-radar-web` checkout or any other active repository checkout.
- Do not change Fuse search fields, tag display casing, sorting, ADR filters, route behavior, content schemas, persistence, dependencies, build configuration, or deployment workflows.
- Do not broaden tag normalization beyond surrounding whitespace or introduce a shared utility for one local comparison.
- Do not claim that all historical content is normalized or that the visual application has been manually tested from this unit-level change alone.

## affected areas

- Radar tag filtering in the Astro app's client-side search utilities.
- Focused Vitest regression coverage.
- EHS Run 7 protocol and evidence records.

## minimum complete change

Trim each source tag before the existing case-insensitive comparison, preserve the existing `__all__` behavior and tag display values, and prove that a normalized option returned by `getAvailableRadarTags` selects a source tag containing surrounding whitespace.

## public contracts

No exported TypeScript API or persisted schema changes. The user-facing filter behavior becomes consistent with the already-normalized tag options.

## assumptions

- Whitespace around a tag is editorial noise rather than meaningful tag identity.
- The existing available-tag normalization is the intended local contract.
- Empty or whitespace-only tags should remain unavailable and should never match a selected non-empty tag.

## risks

- A consumer could theoretically treat surrounding whitespace as meaningful, but the current UI already removes it from the selectable tag values.
- The test proves pure filtering behavior, not every rendered radar interaction or content-ingestion path.

## acceptance evidence

- The new focused regression fails before the implementation because the normalized available value does not match the untrimmed source tag.
- The focused hook test passes after the one-line comparison change.
- The Astro app typecheck/build and repository test/check commands pass where the target toolchain supports them.
- The final target diff contains only the named hook and test files and has no whitespace errors.
- The EHS protocol run has fresh evidence for every criterion and valid completion output.

## stop conditions

Stop and record a blocker if matching requires changing the content schema, tag identity semantics, search architecture, or build/deployment path; if the red test does not fail for the stated mismatch; if existing case-insensitive or `__all__` behavior changes; if the isolated worktree boundary is lost; or if final verification cannot distinguish this fix from pre-existing failures.
