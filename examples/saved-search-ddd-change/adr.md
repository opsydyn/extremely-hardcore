# adr: canonical saved-search format

## status

proposed

## context

Web and mobile currently use different saved-search shapes. Product wants shareable saved searches, which requires the API and persistence model to understand one canonical vehicle search format.

## decision

Introduce a canonical saved-search format owned by the Saved Searches context. Web and mobile will translate their local state into this format at the API boundary. Persistence will store the canonical shape with a format version.

## consequences

- Web and mobile keep local UI state without becoming the source of truth.
- The API becomes responsible for validating canonical saved-search payloads.
- Existing saved searches need compatibility readers or migration.
- Future filters need canonical identifiers before clients can share them reliably.

## options considered

- Keep separate web and mobile shapes and translate only for share links.
- Make web URL state the canonical format.
- Introduce a canonical API and persistence format.

## trade-offs

The canonical format adds translation work now, but avoids letting either client define the long-term domain model. That is boring. Boring is the point.

## follow-up work

- Define versioning for saved-search payloads.
- Add migration or compatibility readers for legacy records.
- Add contract tests for web and mobile adapters.

## review date

After the first shared saved-search release.
