# domain map

## domain terms

- **Blip:** a technology entry shown by the radar.
- **Tag:** a user-facing classification attached to a blip.
- **Available radar tag:** a unique, trimmed tag value derived from the visible blips.
- **Tag filter:** the selected tag criterion applied to visible blips.
- **Source whitespace:** incidental surrounding whitespace in stored tag content.

## candidate bounded contexts

- Radar presentation and filtering: owns selectable tag values and client-side matching.
- Content collection: supplies blip metadata, but is not changed by this slice.

## aggregates/entities/value objects

- Entity: `Blip`.
- Value-like input: normalized available tag string.
- Filter state: `RadarTagFilter`, including the `__all__` sentinel.

## commands

- Select a tag filter.
- Derive available tags from the currently visible blips.

## events

None. Filtering is a synchronous projection of current in-memory blips.

## policies/rules

- Empty or whitespace-only tags are not available options.
- Available tags are deduplicated case-insensitively and retain the first non-empty display spelling.
- Source tags are compared case-insensitively after surrounding whitespace is removed.
- The `__all__` filter returns the input blips unchanged.

## invariants

- A non-empty tag shown by `getAvailableRadarTags` must match every blip carrying that tag modulo case and surrounding whitespace.
- Filtering must not mutate the input blip collection or tag values.
- The change must not alter ADR filtering or Fuse search behavior.

## external systems

None for this local client-side behavior.

## integration points

- `apps/astro/src/hooks/useBlipSearch.ts` provides the pure helpers consumed by the radar UI.
- `apps/astro/src/hooks/useBlipSearchAdrFilter.test.ts` provides focused behavior coverage.

## ambiguity

The content pipeline does not formally declare whether whitespace is meaningful in tag identity. The current available-tag implementation already treats it as non-meaningful, which is sufficient for this UI-local repair.

## recommended next questions

No question blocks this slice. If future ingestion work canonicalizes tags, decide whether the normalized representation should be persisted or remain a presentation concern.
