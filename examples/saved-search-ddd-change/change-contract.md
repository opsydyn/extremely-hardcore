# change contract

## user intent

Create a canonical saved-search format so saved vehicle searches can be shared between web and mobile.

## current understanding

Web stores saved searches as URL-oriented filter state. Mobile stores saved searches as screen state with platform-specific names. The API accepts both shapes through separate endpoints. Persistence mirrors the caller shape, so downstream consumers cannot rely on one format.

## allowed scope

- Define canonical saved-search fields.
- Add API translation at the boundary.
- Plan persistence migration for saved-search records.
- Protect existing web and mobile behaviour.

## forbidden scope

- Rebuild search ranking.
- Change available filters.
- Change user permissions.
- Redesign web or mobile UI.
- Remove existing endpoints without a compatibility plan.

## affected areas

- Web saved-search creation.
- Mobile saved-search creation.
- API saved-search endpoints.
- Persistence model for saved searches.
- Share link generation.

## public contracts

- Saved-search API request and response shape.
- Shareable saved-search URL format.
- Persisted saved-search record schema.

## assumptions

- Make, model, fuel type, and price range are already supported filters.
- Existing saved searches must remain readable.
- The API can translate legacy web and mobile shapes during rollout.

## risks

- Existing saved searches may lose unsupported filter data.
- Web and mobile may disagree on default values.
- Share links may expose fields that should stay internal.

## acceptance evidence

- Contract tests for canonical saved-search API.
- Migration test for legacy web and mobile records.
- Web and mobile adapter tests for make, model, fuel type, and price range.
- Evidence ledger listing compatibility risks.

## stop conditions

- Existing saved-search shape cannot be mapped without product decision.
- Auth or ownership semantics change.
- Persistence migration needs irreversible data deletion.
