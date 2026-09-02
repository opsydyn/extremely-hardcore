# decision challenge: validate postcode search coordinates at the client boundary

## trigger

This proposal changes the runtime behaviour of a public client method and the
boundary between caller input and external HTTP execution. The decision-challenge
gate is required before implementation planning.

## proposal and claims

Extend the existing `searchPostcodes` validation so non-finite or out-of-range
coordinates return `ApiValidationError` before the HTTP client runs. The proposal
claims that valid text and coordinate searches remain unchanged and that the
client-owned error is more useful and more deterministic than forwarding invalid
input to the server.

## existing-platform ownership

The upstream postcodes.io contract owns the coordinate domain and server-side
request handling. The generated transport owns request construction and response
decoding. The handwritten wrapper owns the public Effect service boundary and is
the appropriate place to enforce the subset of request rules promised to callers.

## durable differentiated value

The durable value is a small, reviewable no-request guarantee at the public
boundary, backed by a typed error and a regression. EHS contributes the explicit
scope, evidence, and stopping discipline; it does not become a transport or
validation framework.

## strongest counterargument

The stricter behaviour could surprise callers that currently rely on the server
to reject invalid coordinates, and a local copy of upstream bounds can drift. A
broader validation policy would be unjustified without a complete request-domain
audit.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The upstream request contract declares coordinate ranges and finite values. | Generated `PostcodeLookupParams` checks latitude, longitude, and finiteness. | The wrapper does not enforce those checks before transport. | Red regression showing the public method reaches the transport or fails with the wrong error. |
| Invalid coordinates should fail before HTTP. | Package docs promise invalid search input fails before a request. | No no-request public-boundary regression exists. | Passing regression with a transport counter that remains zero. |
| Valid search behaviour remains unchanged. | Baseline postcode operation tests pass. | No post-change evidence yet. | Existing operation tests, package check, and build. |
| All postcode query policy is known. | Only coordinate ranges are source-backed here. | Empty query and other optional upstream parameters are not audited. | Make no broader claim; keep them outside scope. |

## minimum credible slice

One table-driven public-boundary regression, one local validation extension, and
the existing package checks. Do not edit generated code or introduce a shared
validator.

## stop conditions

Stop if the guard runs after transport execution, changes a valid request, needs
generated/spec/dependency changes, or cannot prove the active checkout and target
worktree remain separate.

## verdict

proceed

## rationale

The repository already states the desired early-validation behaviour and the
upstream schema supplies the numeric bounds. The proposed correction is narrow,
reversible, directly testable, and does not support a broader platform or release
claim.
