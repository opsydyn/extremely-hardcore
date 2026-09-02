# domain map: real operator dogfood Bun port validation

## domain terms

- **custom-handler port:** The TCP port on which a Bun custom handler listens.
- **environment candidate:** A string from `FUNCTIONS_CUSTOMHANDLER_PORT` or
  `PORT`.
- **valid port:** A trimmed decimal integer in the inclusive range `1..65535`.
- **fallback:** The caller-provided port used when no environment candidate is
  valid; the default is `3000`.
- **explicit config port:** `AzureBunServeConfig.port`, which is supplied by
  the caller and is outside environment parsing.

## candidate bounded contexts

- Bun adapter configuration boundary.
- Test oracle for environment precedence and fallback.
- Azure custom-handler host integration, which remains external.

## aggregates/entities/value objects

The valid port is a small value object represented as a number. The environment
candidate remains an untrusted string until the adapter parser accepts it.

## commands

- Resolve the custom-handler port from environment candidates and fallback.
- Construct Bun serve options using the resolved port.

## events

No durable events are added. `Bun.serve` receives the resolved value as an
in-memory call argument.

## policies/rules

- Prefer `FUNCTIONS_CUSTOMHANDLER_PORT` when it is valid.
- Otherwise prefer `PORT` when it is valid.
- Otherwise return the existing fallback.
- Ignore surrounding whitespace, reject non-decimal text, and reject values
  outside `1..65535`.
- Do not reinterpret explicit `config.port` through this policy.

## invariants

- Every accepted environment value is an integer in the standard TCP range.
- Valid custom-handler values retain precedence over valid `PORT` values.
- Invalid higher-priority values do not prevent lower-priority resolution.
- No request, response, context, deployment, or persistent state is changed.

## external systems

- Azure Functions custom-handler host supplies environment configuration.
- Bun owns server binding and reports any actual runtime binding failure.

## integration points

- `getAzureCustomHandlerPort()` reads process environment.
- `createAzureBunServeOptions()` passes the result to `Bun.serve`.
- Existing Bun helper tests mock the runtime boundary.

## ambiguity

The codebase does not define whether invalid Azure configuration should throw or
fall back. This slice preserves the existing fallback-shaped API and records
fail-fast deployment diagnostics as a separate question.

## recommended next questions

- Does a real Azure custom-handler deployment need a distinct invalid-port
  startup error rather than fallback behavior?
- Should explicit `config.port` eventually receive the same range validation,
  or remain caller-owned?
