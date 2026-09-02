# implementation plan: real operator dogfood postcode coordinate validation

## behaviour to protect

`searchPostcodes` must accept the existing text and valid coordinate forms. A
non-finite or out-of-range coordinate must return `ApiValidationError` without
invoking the supplied HTTP client. The caller's search object and all successful
response behaviour remain unchanged.

## first failing test

Add a public `PostcodesClient.layer` test with a counting HTTP client and table
entries for latitude `91`, longitude `-181`, and `Number.NaN`. Call
`searchPostcodes` for each entry, assert `isApiValidationError`, and assert the
transport counter remains zero. Run:

```bash
bun run test -- test/postcodeOperations.test.ts -t "rejects invalid coordinate searches before issuing a request"
```

The test must fail before implementation because the current validator accepts
the coordinate pair and reaches the transport.

## smallest implementation

Extend `validatePostcodeSearch` in `src/internal/ApiService.ts` with finite and
range checks for the coordinate branch. Return field-specific
`ApiValidationError` values and leave the generated client, public types, and
valid branch unchanged.

## refactor step

No refactor is planned. Keep the checks local until repeated domain evidence
justifies a shared request validator.

## checks to run

- Focused red and green regression.
- `bun run test -- test/postcodeOperations.test.ts`.
- `bun run check`.
- `bun run build`.
- `bun run lint:code`.
- `bun run fmt:check`.
- `bun run lint`.
- `git diff --check`.
- Fresh EHS evidence for all Run 8 criteria, validation, completion, attestation,
  and CI output.

## rollback plan

Remove the local coordinate checks and the focused regression, leaving generated
transport and successful request behaviour untouched. If the target is committed,
revert only the target commit in the isolated branch; do not modify the active
checkout.

## notes

Commit approval remains a separate human decision after target review. Protocol
artefacts are retained in the target worktree but are excluded from the target
source commit.
