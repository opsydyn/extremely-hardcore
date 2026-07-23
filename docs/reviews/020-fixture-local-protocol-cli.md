# bounded-context review: fixture-local protocol CLI

## proposed change

Add a fixture-owned command script and ledger, then validate the new artifacts in the existing action-fixture runner.

## affected contexts

- Bounded bug-fix fixture assets
- Fixture runner and deterministic reference executor
- Existing protocol artifact validation

## allowed dependencies

`reference executor -> fixture-local Bun command`; `fixture runner -> protocol read/validation APIs + fixture ledger`; `fixture-local command -> local Bun, Git, and V1 artifact files`.

## suspicious dependencies

Host-path imports from copied fixture assets, provider SDKs, generic protocol mutations, transcript parsing, and adapter-specific scoring.

## data ownership

The fixture script owns the ledger. The fixture runner owns its interpretation and report. Generic protocol owns evidence and transition formats. Provider-side provenance remains outside this slice.

## transaction boundaries

Each command invocation writes its protocol artifact before appending the linked ledger entry. The runner validates after each staged executor return.

## integration events

No external integration occurs. A future adapter may consume retained ledger entries as correlation targets.

## anti-corruption needs

The runner must not translate a valid local ledger into an identity, sandbox, network, or provider-compliance claim. Fixture-specific commands must not leak into the generic protocol CLI.

## verdict

safe with noted risk. The new boundary is fixture-local and preserves one-way ownership, but its structural provenance requires later independent provider-side correlation.
