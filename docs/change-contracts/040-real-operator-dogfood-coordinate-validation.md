# change contract: real operator dogfood postcode coordinate validation

## user intent

Run the eighth real EHS dogfood change in an isolated external repository. Make
invalid coordinate searches fail at the client boundary before an HTTP request,
while preserving valid postcode search behaviour and the existing standalone EHS
boundary.

## current understanding

The target is `postcodesio-effect-client` at committed `HEAD`
`dbaf17e32c19e94acd63d2f1c9f7f5958ada5f7b` in the temporary worktree
`/private/tmp/ehs-run8-postcodesio`, on branch
`ehs/run8-validate-search-coordinates`. The active
`/Users/alancurrie/Projects/postcodesio-effect-client` checkout is clean and
remains protected.

The public `PostcodeSearch` input supports either a text query or a complete
latitude/longitude pair. `validatePostcodeSearch` currently checks only which
fields are present. The generated upstream request schema declares latitude as
`-90..90`, longitude as `-180..180`, and both values as finite numbers, but the
wrapper does not enforce those constraints before calling the generated client.
The package documentation says invalid search inputs fail before an HTTP request.

## allowed scope

- Add a public-boundary regression in the existing postcode operation tests.
- Extend the existing local search validation in `src/internal/ApiService.ts`.
- Record the EHS Run 8 protocol in the isolated target worktree.
- Record Run 8 contract, ADR, decision challenge, domain map, plan, review,
  evidence, issue, and dogfood notes in this EHS repository.

## forbidden scope

- Do not edit the active `postcodesio-effect-client` checkout or any other active
  repository checkout.
- Do not change the generated transport, OpenAPI input, endpoint set, query
  semantics, response schemas, rate limiting, dependencies, or release workflow.
- Do not add a new validator package, public type, service, or runtime.
- Do not normalize text queries, add radius/limit options, or broaden the search
  API in this slice.
- Do not call the live postcodes.io service or claim live compatibility,
  release readiness, or provider behaviour from this local run.

## affected areas

- The `PostcodeSearch` public input boundary.
- `makeApiService` validation before generated HTTP transport execution.
- Local contract tests and package verification.
- EHS Run 8 protocol and governance records.

## minimum complete change

Reject a coordinate search when latitude or longitude is non-finite or outside
the upstream documented range. Return a stable actionable `ApiValidationError`
for the offending field before the HTTP client executes. Preserve valid text and
coordinate searches, input immutability, existing error mapping, and the current
module and dependency boundaries.

## public contracts

The runtime behaviour of the existing `searchPostcodes` method becomes stricter
for invalid numeric coordinates: it returns the client-owned
`ApiValidationError` before transport execution. No exported TypeScript type or
successful response shape changes.

## assumptions

- The generated request schema is the source of the coordinate ranges and
  finite-number rule.
- The wrapper owns early validation because it owns the public Effect error
  boundary and can prove that invalid input makes no request.
- Empty or whitespace-only text queries are outside this slice because the
  upstream contract and current public type do not establish a local policy.

## risks

- A caller passing invalid coordinates may previously have received a server or
  transport error; this intentionally makes the failure earlier and typed.
- The repository does not establish the complete upstream policy for every query
  value, so text-query normalization remains unclaimed.
- This run does not prove live API responses, network reliability, or release
  publication.

## acceptance evidence

- The new no-request regression fails before the validation guard for the
  intended reason and passes after the guard.
- Existing postcode operation tests and the package check pass.
- Package build, code lint, formatting, packed-package lint, and diff checks pass.
- The EHS protocol run has fresh passing evidence for every criterion, validates
  at the final target fingerprint, completes, and produces valid attestation and
  CI output.
- The operator record reports setup, baseline results, friction, false blocks,
  workarounds, and remaining uncertainty.

## stop conditions

Stop and record a blocker if validation cannot be proven before transport, any
valid existing search changes, the implementation requires generated/spec or
dependency changes, the red test does not fail for the intended reason, the
isolated worktree boundary is lost, or verification cannot distinguish this
slice from a pre-existing failure.
