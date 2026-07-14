# implementation plan

## behaviour to protect

Existing web and mobile saved searches remain readable. New saved searches use the canonical vehicle search format. Share links expose make, model, fuel type, and price range consistently.

## first failing test

Add an API contract test that posts a canonical saved search with make, model, fuel type, and price range, then asserts the response and persisted record use the canonical format version.

## smallest implementation

Add a canonical saved-search value object and API validator. Add web and mobile adapter functions that map existing client shapes to the canonical format.

## refactor step

Move duplicate filter normalisation into the Search context only after adapter tests pass.

## checks to run

- API contract tests.
- Web adapter unit tests.
- Mobile adapter unit tests.
- Persistence migration or compatibility tests.

## rollback plan

Keep legacy readers and endpoints during rollout. If canonical writes fail in production, disable share-link creation and continue reading existing saved searches through compatibility readers.

## notes

Do not remove legacy fields until migration evidence exists.
