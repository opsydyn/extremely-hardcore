# domain map: real operator dogfood function name boundary

## domain terms

- `functionName`: public adapter option naming the generated Azure Functions entry directory and handler registration.
- `dist/api`: generated function-app artifact root.
- single path segment: a non-empty value that cannot change directory traversal when joined below `dist/api`.
- generated route reference: `/api/<functionName>` written into Static Web Apps configuration.

## candidate bounded contexts

- Adapter configuration: accepts and validates `functionName`.
- Artifact generation: writes `host.json`, function files, package metadata, and client routing configuration.
- Azure deployment/runtime: consumes the generated artifact and interprets the function identifier.

## aggregates/entities/value objects

No new aggregate is needed. `functionName` is a validated configuration value; the generated API directory and route references are derived artifacts.

## commands

- `generateAzureSwaFiles(options)`: validate configuration, then generate the deployment artifact tree.

## events

None. Generation is a local build step and does not introduce a durable event.

## policies/rules

- Validate `functionName` before any filesystem write.
- Reject empty values, both path separators, NUL, and complete dot segments.
- Preserve the same value in valid generated paths, package `main`, handler registration, and SWA rewrites.

## invariants

- Generated function files remain below `dist/api`.
- A rejected name produces no generated function output from this invocation.
- Valid existing names retain the current generated layout and route behavior.

## external systems

- Astro build lifecycle supplies the output directory.
- Azure Functions v4 consumes the generated function app.
- Azure Static Web Apps consumes `staticwebapp.config.json` and its `/api/<functionName>` rewrite.

## integration points

The only changed integration boundary is the adapter's public option validation before the existing filesystem and generated-config calls. No Azure request bridge or deployment workflow changes.

## ambiguity

The repository does not define a complete Azure function-name grammar. This slice intentionally addresses filesystem safety only and does not claim full platform validation.

## recommended next questions

- Does a separate deployment audit require additional Azure-specific name restrictions?
- Should the package publish a formal naming grammar in a future major-version contract?
