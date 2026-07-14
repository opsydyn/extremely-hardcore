# evidence ledger

## summary

Canonical saved-search format designed for web, mobile, API, and persistence alignment.

## changed files

- API saved-search contract.
- Saved-search domain model.
- Web adapter.
- Mobile adapter.
- Persistence compatibility reader.

## commands run

- `bun test api/saved-search.contract.test.ts`
- `bun test web/saved-search-adapter.test.ts`
- `bun test mobile/saved-search-adapter.test.ts`

## passing checks

- Canonical API contract accepts make, model, fuel type, and price range.
- Web URL filters map to canonical format.
- Mobile screen state maps to canonical format.

## failing checks

- None in this example.

## architecture impact

Saved Searches owns canonical saved-search persistence. Search owns filter semantics. Web and mobile are adapters.

## public contract impact

Saved-search API request and response shape changes. Compatibility required for legacy web and mobile shapes.

## risks left open

- Legacy unknown filters need product decision.
- Share-link permissions need final security review.

## human review needed

Yes. Product must confirm unsupported filter handling and share-link visibility.

## final recommendation

needs review
