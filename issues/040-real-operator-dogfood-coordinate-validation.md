# Validate postcode search coordinates before transport

## problem

The public postcode search wrapper accepts a complete latitude/longitude pair
based only on field presence. Non-finite and out-of-range values are forwarded to
the generated HTTP client even though the upstream request schema declares
numeric bounds and the package documentation promises invalid search input fails
before HTTP.

## impact

Callers receive a later server or transport failure instead of the package's
typed `ApiValidationError`, and invalid input can trigger a request that should
have been rejected locally.

## expected behaviour

Reject latitude outside `-90..90`, longitude outside `-180..180`, and non-finite
coordinate values before the HTTP client executes. Preserve valid text searches,
valid coordinate searches, existing mode validation, and input immutability.

## scope

One validation extension in `src/internal/ApiService.ts`, one public-boundary
regression in the existing postcode operation tests, and the Run 8 EHS records.
No generated transport, OpenAPI, dependency, response, persistence, or release
workflow change.

## verification

The no-request regression fails before the guard and passes after it. Existing
postcode tests, package checks, build, code lint, formatting, packed-package lint,
and diff integrity must pass.
