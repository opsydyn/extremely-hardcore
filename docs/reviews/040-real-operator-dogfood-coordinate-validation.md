# review: real operator dogfood postcode coordinate validation

## proposed change

In an isolated `postcodesio-effect-client` worktree, validate latitude and
longitude ranges at the existing `searchPostcodes` wrapper boundary before the
generated HTTP client executes. Add public-boundary regression coverage for
out-of-range and non-finite coordinates.

## review findings

- No correctness findings in the scoped two-file target diff.
- The red test proved the old public method reached a transport trap for invalid
  coordinates.
- The green regression covers latitude `91`, longitude `-181`, and `NaN`, and
  proves the transport counter remains zero.
- Existing text search, valid coordinate search, mode validation, and all
  postcode operation tests remain passing.
- The implementation keeps the numeric rules local to the existing validator;
  generated transport, OpenAPI inputs, response schemas, and dependencies are
  untouched.

## verification risks

- The full target `bun run fmt:check` command includes generated EHS protocol
  JSON and fails after evidence capture because those artefacts are not formatted
  by the repository formatter. The source/test-scoped formatter command passes
  and is the recorded Run 8 criterion.
- The package lint command exits successfully but reports the existing repository
  URL suggestion from `publint`.
- No live postcodes.io request or network compatibility check was run.
- The change tightens runtime handling of invalid coordinates; callers that
  previously relied on server-side rejection will now receive
  `ApiValidationError` earlier.
- Target commit `c5f0716` is committed and remains isolated in its temporary
  worktree.

## verdict

safe with noted risk

## follow-up

Keep target commit `c5f0716` isolated until the owner integrates it. Do not
broaden this slice into text-query normalization, additional upstream search
options, generated-spec changes, or a complete request-domain audit.
