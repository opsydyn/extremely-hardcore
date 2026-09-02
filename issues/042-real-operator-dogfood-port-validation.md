# issue: real operator dogfood Bun port validation

## intent

Exercise the tenth real operator dogfood change against
`elysia-azurefunc-adapter` by correcting malformed environment port handling in
the Bun custom-handler helper.

## scope

- Protect the valid `FUNCTIONS_CUSTOMHANDLER_PORT` over `PORT` precedence rule.
- Reject numeric prefixes, fractional prefixes, zero, negative, and out-of-range
  environment values.
- Preserve the existing fallback, explicit config path, package shape, and
  dependency boundary.
- Record the EHS protocol and final evidence.

## completion criteria

- A red focused regression demonstrates the current invalid-port behavior.
- The green regression proves first-valid environment resolution and default
  fallback.
- The full package suite and quality gates pass.
- The EHS run completes with valid final and CI attestations.
- The dogfood record states what was and was not proven.

## non-goals

- No Azure deployment or live network test.
- No thrown configuration error.
- No explicit `config.port` validation.
- No change to unrelated adapter behavior.
