# domain map: real operator dogfood postcode coordinate validation

## domain terms

- `PostcodeSearch`: the public input value for postcode search.
- text search: a search using `query`.
- coordinate search: a search using both `latitude` and `longitude`.
- client validation: checks performed before generated HTTP transport execution.
- `ApiValidationError`: the typed client-owned failure for invalid input.
- upstream request contract: the numeric constraints declared by the generated
  postcodes.io request schema.

## candidate bounded contexts

- **Public client boundary:** owns `PostcodeSearch` mode validation and the
  client-visible error type.
- **Generated transport:** owns URL/query construction and upstream response
  decoding; it is not edited in this slice.
- **Upstream postcodes.io:** owns the external endpoint contract and eventual
  server handling.
- **EHS protocol:** owns evidence, workspace freshness, lifecycle, and handoff
  records; it does not own client validation.

## aggregates/entities/value objects

No aggregate is introduced. `PostcodeSearch` is an input value, and
`ApiValidationError` is the observable failure value.

## commands

- `searchPostcodes(search)` selects the text or coordinate search path.

## events

No domain event is introduced. A valid search may produce one HTTP request; an
invalid coordinate search must produce none.

## policies/rules

- Exactly one search mode is required.
- Coordinate mode requires both coordinates.
- Latitude must be finite and within `-90..90`.
- Longitude must be finite and within `-180..180`.
- Invalid coordinates fail as `ApiValidationError` before transport.

## invariants

- Valid text and coordinate searches retain their current request and response
  behaviour.
- Invalid coordinate input cannot reach the HTTP client.
- Validation does not mutate the caller's input object.
- No generated schema, persistence, or route contract changes.

## external systems

- postcodes.io, represented locally by the generated `PostcodesProduction`
  client.
- Effect `HttpClient`, which is the transport boundary to guard.
- The local Elysia mock server used by deterministic tests.

## integration points

- `makeApiService` constructs the rate-limited generated client.
- `validatePostcodeSearch` decides whether `production.PostcodeLookup` runs.
- `PostcodesClient.layer` exposes the wrapper with a caller-supplied HTTP client.

## ambiguity

The codebase does not establish whether empty or whitespace-only text queries
should be rejected, trimmed, or passed through. It also does not expose the
upstream `limit`, `radius`, `widesearch`, or `filter` options through
`PostcodeSearch`. Those questions remain outside Run 8.

## recommended next questions

- If a future request exposes more upstream search options, which subset belongs
  in the stable wrapper contract?
- Should text-query validation be source-backed separately, or remain delegated
  to postcodes.io?
- Has the upstream coordinate contract changed before a future schema update?
