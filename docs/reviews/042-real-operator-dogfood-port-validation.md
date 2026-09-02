# bounded-context review: Bun custom-handler port validation

## proposed change

Tighten the existing environment-to-port parser in `src/bun.ts` so only trimmed
decimal integers in `1..65535` are accepted, and add focused coverage for
invalid values and fallback precedence.

## affected contexts

- Bun adapter configuration in `src/bun.ts`.
- Existing Bun helper and property tests.
- Downstream consumers that call `getAzureCustomHandlerPort()` or
  `azureBunServe()` without an explicit port.

## allowed dependencies

- Existing `process.env` values and local numeric/string APIs.
- Existing `AzureBunServeConfig` and `AzureBunServeOptions` boundaries.
- Existing Node test, Bun, TypeScript, Bun property-test, build, and package
  quality commands.

## suspicious dependencies

- Azure SDK, Azure network access, and Bun process startup are unnecessary for
  the parser rule and are forbidden for this slice.
- A new validation package or public configuration error would widen the
  boundary without evidence.
- Applying the parser to explicit `config.port` would change caller ownership
  and is outside the contract.

## data ownership

The operating environment owns raw strings. The Bun adapter owns conversion to
the numeric value passed to its server options. The caller owns explicit config
values. No persistent data is involved.

## transaction boundaries

There is no database or runtime transaction. The helper resolves a value before
the Bun server call; the EHS run captures evidence against the target workspace
fingerprint before completion.

## integration events

No integration events, provider calls, network requests, or cross-process
messages are added.

## anti-corruption needs

Keep local environment parsing separate from Azure deployment policy and Bun's
actual bind behavior. Do not import EHS protocol code into the target package or
make consumer code depend on the dogfood records.

## verdict

safe with noted risk

## follow-up

Review whether production deployment should fail fast on an invalid Azure port
variable. Do not broaden this slice into explicit config validation, deployment
diagnostics, or other adapter input parsing.
