# adr: keep trimmed radar tag matching local

## status

accepted

## context

The radar's available-tag builder trims surrounding whitespace before exposing tag options. The existing filter helper compares source tags without that normalization, so a source value such as `" Cloud "` cannot be selected through the displayed `Cloud` option.

The proposed fix is limited to the existing client-side filter helper and its focused test. It does not change content schemas, persistence, route generation, dependencies, or module ownership.

## decision

Normalize each source tag with `trim()` at the existing comparison point in `filterBlipsByTag`. Keep the existing case-insensitive comparison, display casing, sorting, and `__all__` sentinel behavior unchanged.

No broader architecture decision or shared normalization utility is required for this local behavior fix.

## consequences

- The selectable tag list and tag filtering use the same surrounding-whitespace identity.
- Existing source data with editorial whitespace becomes filterable without migration.
- Whitespace-only source tags remain ignored by the available-tag builder and do not become selectable.
- The behavior remains local to the radar search hook, so other content consumers are unaffected.

## options considered

- Trim tags during content ingestion: rejected because it expands the slice into schema/content-pipeline behavior and could alter stored or rendered data.
- Introduce a shared tag-normalization module: rejected because one existing comparison does not justify a new boundary.
- Keep the mismatch: rejected because the UI can present a selectable value that returns no results.

## trade-offs

This treats surrounding whitespace as editorial noise during filtering. That matches the existing available-tag behavior, but it does not canonicalize historical content or establish a repository-wide tag identity policy.

## follow-up work

None for this bounded change. Revisit tag identity only if content ingestion or another consumer needs a canonical persisted representation.

## review date

Not scheduled; revisit if the content schema or tag authoring workflow changes.
