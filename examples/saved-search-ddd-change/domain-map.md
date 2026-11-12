# domain map

## domain terms

- Saved search: a named vehicle search saved by a user.
- Vehicle search: filter set used to find vehicles.
- Filter: one search constraint such as make, model, fuel type, or price range.
- Canonical format: shared representation accepted by API and persistence.
- Share link: URL that lets another user open a saved search.

## relevant workflow

Save or share a vehicle search: accept client input, validate the search and
current ownership/sharing policy, decide the allowed operation, then persist
and return a public result. Expected rejections include an invalid price range,
unsupported legacy filters and a caller without sharing permission. Keep the
rule decision separate from persistence and share-link delivery where useful.

## candidate bounded contexts

- Search: owns filter semantics and canonical query shape.
- Saved searches: owns naming, ownership, persistence, and sharing.
- Web and mobile are adapters with different UI/input representations, not
  separate bounded contexts merely because they are different clients.

## aggregates/entities/value objects

- SavedSearch aggregate: id, owner, name, canonical vehicle search, sharing state.
- VehicleSearch value object: make, model, fuel type, price range, and future filters.
- PriceRange value object: minimum and maximum price.

Use validated construction for PriceRange so callers cannot accidentally create
a minimum greater than the maximum through its supported constructor. Do not
add a type for every primitive or mistake a TypeScript cast for validation.
If private/shared searches have different required data, model those alternatives
explicitly rather than `isShared` plus unrelated optional fields. Use existing
project mechanisms; these are design examples, not a new library requirement.
Static distinctions do not replace runtime ownership, revocation or concurrency
checks against the current resource.

## commands

- SaveVehicleSearch.
- UpdateSavedSearch.
- ShareSavedSearch.
- OpenSharedSavedSearch.

## events

- SavedSearchCreated.
- SavedSearchShared.
- SavedSearchMigratedToCanonicalFormat.

## policies/rules

- A saved search belongs to one owner.
- Shared searches expose search filters, not private owner metadata.
- Unknown legacy filters must be preserved or rejected explicitly.

## invariants

- Canonical saved search stores one vehicle search shape.
- Price range minimum cannot exceed maximum.
- Make and model must use canonical identifiers, not display labels.

## external systems

- Web app.
- Mobile app.
- API.
- Persistence store.
- Share link router.

## integration points

- Web adapter maps URL filters to canonical format.
- Mobile adapter maps screen state to canonical format.
- API validates and persists canonical format.
- Legacy readers translate old persisted shapes.

## ambiguity

- Whether shared searches can include location or user-specific availability.
- Whether unknown legacy filters should block migration or be stored as extensions.
- Whether share links need versioning.

## recommended next questions

- Which filters are required for launch?
- Are share links public, private, or permissioned?
- What should happen to legacy filters not present in the canonical model?
