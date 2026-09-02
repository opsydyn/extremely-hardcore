# adr: validate Bun custom-handler environment ports

## status

accepted

## context

The Bun entrypoint exposes `getAzureCustomHandlerPort()` and uses its result
when `azureBunServe()` constructs the Bun server options. The helper currently
uses `Number.parseInt` on the first available environment variable. That parser
accepts numeric prefixes and values outside the valid TCP listening-port range,
and an invalid custom-handler value masks a valid lower-priority `PORT` value.

This is a public runtime behavior correction at an existing adapter boundary,
not a new runtime abstraction. The package has no current error contract for
invalid environment configuration, and the helper already has a fallback
parameter.

## decision

Validate environment candidates locally in `src/bun.ts`. Trim the string,
require decimal digits, convert it to a number, and accept only an integer in
the inclusive range `1..65535`. Resolve the first valid value in this order:

1. `FUNCTIONS_CUSTOMHANDLER_PORT`
2. `PORT`
3. the existing fallback argument, defaulting to `3000`

Leave explicit `AzureBunServeConfig.port` values and all other runtime paths
unchanged. Do not add a dependency or a thrown configuration-error API.

## consequences

- Prefix parsing no longer turns malformed environment strings into a port.
- A malformed higher-priority value no longer hides a valid lower-priority
  value.
- Existing valid environment precedence and default behavior remain stable.
- An invalid environment configuration can still fall through to a local or
  caller fallback, so this decision does not claim fail-fast deployment
  diagnostics.
- The helper remains small, synchronous, dependency-free, and testable without
  Azure.

## options considered

- Keep `parseInt`: rejected because malformed and out-of-range values reach the
  server boundary.
- Throw on any invalid configured value: deferred because no thrown error
  contract exists and this slice should preserve the helper's fallback model.
- Validate only the selected variable: rejected because an invalid custom
  value would still mask a valid `PORT` value.
- Add a port-validation dependency: rejected because the rule is local,
  deterministic, and does not need another package.

## trade-offs

The first-valid-value policy is resilient for local development and preserves
the existing fallback shape, but it may hide an invalid deployment variable.
The standard TCP range is explicit and predictable, but platform-specific
ephemeral-port policies remain outside this decision.

## follow-up work

Reconsider an explicit configuration error only if downstream deployment
evidence shows silent fallback can produce an unreachable custom handler.

## review date

2026-09-02
