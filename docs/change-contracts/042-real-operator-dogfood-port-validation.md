# change contract: real operator dogfood Bun port validation

## user intent

Run the tenth real EHS dogfood change in an isolated external repository. Make
the Bun custom-handler port helper reject malformed and out-of-range environment
values before they reach `Bun.serve`, while preserving valid environment
precedence and the standalone EHS boundary.

## current understanding

The target is `elysia-azurefunc-adapter` at committed `HEAD` `51ce593` in the
temporary worktree `/private/tmp/ehs-run10-elysia`, on branch
`ehs/run10-port-validation`. The active
`/Users/alancurrie/Projects/elysia-azurefunc-adapter` checkout has an unrelated
untracked `.DS_Store` and remains protected.

`getAzureCustomHandlerPort()` currently selects
`FUNCTIONS_CUSTOMHANDLER_PORT ?? PORT` and applies `Number.parseInt`, accepting
prefixes such as `7071junk`, fractional prefixes such as `1.5`, zero, negative
values, and ports above the valid TCP range. An invalid higher-priority value
also prevents a valid `PORT` value from being considered. Existing property
tests define valid environment ports as integers from `1` through `65535`.

## allowed scope

- Add focused regression coverage in the existing Bun helper tests.
- Tighten local environment parsing in `src/bun.ts`.
- Preserve the existing valid environment precedence and default fallback.
- Record the EHS Run 10 protocol in the isolated target worktree.
- Record Run 10 contract, ADR, decision challenge, domain map, plan, review,
  evidence, issue, and dogfood notes in this EHS repository.

## forbidden scope

- Do not edit the active `elysia-azurefunc-adapter` checkout or any other
  active repository checkout.
- Do not change `AzureBunServeConfig.port`, explicit caller-supplied ports,
  Azure host configuration, deployment files, package metadata, dependencies,
  generated output, release workflow, or public type shapes.
- Do not add a validation dependency, new public option, new error type, or
  fail-fast exception contract in this slice.
- Do not make live Azure, network, provider, sandbox, or release claims.
- Do not broaden the change into forwarded-header, request, response, cookie,
  or context behavior.

## affected areas

- Environment-to-port conversion in the Bun custom-handler subpath.
- `azureBunServe()` options passed to the Bun runtime.
- Bun helper unit and property tests.
- EHS Run 10 protocol and governance records.

## minimum complete change

Parse each environment candidate as a trimmed decimal integer and accept only
ports in the inclusive range `1..65535`. Use the first valid value in
`FUNCTIONS_CUSTOMHANDLER_PORT`, then `PORT`, then the existing caller fallback.
Preserve valid values, the existing default of `3000`, explicit
`AzureBunServeConfig.port`, module boundaries, and dependency ownership.

## public contracts

The runtime behavior of the existing exported `getAzureCustomHandlerPort`
helper becomes stricter for malformed and out-of-range environment strings.
Valid environment values retain their current precedence. The exported
signature, option shapes, successful handler response behavior, and explicit
`config.port` path remain unchanged.

## assumptions

- A TCP listening port for this helper is the inclusive range `1..65535`.
- Environment values are configuration strings and surrounding whitespace can
  be ignored without changing their intended numeric value.
- Preserving the helper's existing fallback model is less disruptive than
  introducing a new thrown configuration error in this slice.
- Azure normally supplies a valid `FUNCTIONS_CUSTOMHANDLER_PORT`; local and
  malformed configuration behavior can be tested without Azure or network
  access.

## risks

- Silently falling through from an invalid Azure-specific variable to `PORT` or
  `3000` can hide a deployment misconfiguration; a future explicit error
  policy remains separate.
- The repository does not establish every platform-specific Bun port policy,
  so this slice uses the standard numeric TCP range only.
- This run does not prove Azure host reachability, deployment startup, or
  release publication.

## acceptance evidence

- The new invalid-port regression fails before the parser change for the
  intended partial/out-of-range behavior and passes afterward.
- Existing Bun helper, property, request, response, and context tests pass.
- Package typecheck, build, Biome, Knip, publint, `attw`, TypeDoc, size, pack,
  and diff checks pass.
- The EHS protocol run has fresh passing evidence for every criterion, validates
  at the final target fingerprint, completes, and produces valid attestation
  and CI output.
- The operator record reports setup, baseline results, friction, false blocks,
  workarounds, and remaining uncertainty.

## stop conditions

Stop and record a blocker if valid ports change, explicit `config.port` changes,
the red test does not fail for the intended reason, the implementation requires
new dependencies or public options, the isolated worktree boundary is lost,
the target baseline has unrelated failures that cannot be separated, or
verification cannot distinguish this slice from a pre-existing failure.
