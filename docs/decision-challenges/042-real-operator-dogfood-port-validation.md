# decision challenge: validate Bun custom-handler environment ports

## trigger

This changes public runtime behavior at the Bun custom-handler configuration
boundary and can affect deployment startup port selection. The change is
limited to existing exported behavior and does not introduce external writable
execution, a new provider, or a new isolation boundary.

## proposal and claims

- `getAzureCustomHandlerPort()` should not accept numeric prefixes or ports
  outside `1..65535` from environment strings.
- An invalid higher-priority environment value should be skipped so a valid
  lower-priority value can be used.
- Existing valid values and explicit `config.port` behavior should remain
  unchanged.

## existing-platform ownership

Azure owns the environment variables and the custom-handler host contract. Bun
owns the eventual server binding. The adapter owns the mapping from its
environment inputs to `Bun.serve` options; it does not own Azure deployment
provisioning or platform-specific reachability.

## durable differentiated value

The package can provide a deterministic, dependency-free adapter boundary that
does not reinterpret malformed environment text as a valid port. This is a
small correctness guarantee, not a claim to replace Azure or Bun validation.

## strongest counterargument

Falling through to `PORT` or `3000` can hide a malformed
`FUNCTIONS_CUSTOMHANDLER_PORT` and leave an Azure custom handler listening on a
port the host does not use. Throwing a clear configuration error may be safer
for production, even though it would be a new error behavior.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| `parseInt` accepts malformed prefixes and out-of-range values | Direct baseline invocation and source inspection | No regression yet | Red test, then focused green test |
| Valid ports currently preserve custom-over-`PORT` precedence | Existing unit and property tests | No post-change proof yet | Existing tests plus full suite |
| First-valid fallback is bounded and deterministic | Proposed local parser rule | No implementation evidence yet | Invalid custom/valid `PORT` and invalid-both cases |
| Explicit `config.port` remains unchanged | Scope and source boundary review | No live Bun server required | Existing `azureBunServe` mock test and diff review |
| This proves Azure deployment behavior | None | Live host not exercised | Keep the claim out of this run |

## minimum credible slice

Add a regression covering malformed, fractional, zero, negative, and out-of-range
environment values with valid lower-priority and default fallbacks. Implement a
local static parser and run the package's existing quality gates.

## stop conditions

Hold if the change alters valid values or explicit config, requires a new public
error contract, needs Azure or network access to verify, or the red test does
not demonstrate the current bug. Do not expand into deployment diagnostics or
platform-specific port allocation.

## verdict

proceed

## rationale

The bug is directly observable in the current helper, the minimum slice is two
target files, and the existing fallback API provides a compatible behavior
model. The strongest counterargument is retained as a deployment risk rather
than silently treated as resolved.
