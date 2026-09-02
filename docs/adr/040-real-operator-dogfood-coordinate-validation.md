# adr: validate postcode search coordinates at the client boundary

## status

accepted

## context

`postcodesio-effect-client` exposes `searchPostcodes` through a handwritten
Effect service wrapper. Its public search input accepts either a text query or a
latitude/longitude pair. The wrapper already rejects mixed and incomplete search
modes, but it forwards non-finite and out-of-range coordinates to the generated
HTTP client. The generated upstream request schema documents the numeric bounds,
and the package documentation promises invalid search input fails before HTTP.

Run 8 needs a small public-boundary correction without changing generated code or
the upstream specification.

## decision

Keep coordinate validation in `validatePostcodeSearch` within
`src/internal/ApiService.ts`. When the coordinate mode is selected, require a
finite latitude in `-90..90` and a finite longitude in `-180..180`, returning
`ApiValidationError` before the generated transport is invoked. Keep the existing
mode-shape validation and all valid request paths unchanged.

## consequences

- Invalid numeric coordinates fail locally with the package's typed validation
  error rather than a later server or transport failure.
- A public runtime behaviour is stricter, but no exported type or success
  contract changes.
- The generated transport and OpenAPI artefacts remain replaceable and untouched.
- The wrapper now owns a small amount of upstream request-domain knowledge; the
  source schema remains the reference for these bounds.
- Empty text-query policy and other upstream request options remain unresolved.

## options considered

- **Rely on the upstream server:** rejected because it violates the documented
  before-HTTP validation promise and produces less stable client errors.
- **Edit or regenerate generated transport:** rejected because the issue is the
  handwritten public wrapper boundary, not emitted transport code.
- **Add a shared validation dependency:** rejected because two scalar range
  checks do not justify a new dependency or abstraction.

## trade-offs

Local validation duplicates the relevant numeric constraints at the public
boundary and must be kept aligned if the upstream contract changes. That cost is
bounded and reviewable, and it gives callers a deterministic typed failure and a
testable no-request guarantee.

## follow-up work

Only revisit text-query or additional postcode search options when a separate
source-backed contract requires them. Do not infer a broader input-normalization
policy from this slice.

## review date

Review after the ten-run real operator dogfood campaign or before a schema-v2
public contract decision, whichever comes first.
