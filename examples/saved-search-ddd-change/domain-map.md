# domain map

## domain terms

- Saved search: a named vehicle search saved by a user.
- Vehicle search: filter set used to find vehicles.
- Filter: one search constraint such as make, model, fuel type, or price range.
- Canonical format: shared representation accepted by API and persistence.
- Share link: URL that lets another user open a saved search.

## candidate bounded contexts

- Search: owns filter semantics and canonical query shape.
- Saved searches: owns naming, ownership, persistence, and sharing.
- Web client: owns URL state and UI mapping.
- Mobile client: owns screen state and UI mapping.

## aggregates/entities/value objects

- SavedSearch aggregate: id, owner, name, canonical vehicle search, sharing state.
- VehicleSearch value object: make, model, fuel type, price range, and future filters.
- PriceRange value object: minimum and maximum price.

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
