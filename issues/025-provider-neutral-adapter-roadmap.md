# issue: provider-neutral agent adapter roadmap

## intent

Add Claude and Pi support as a future provider-adapter track while making the remaining V0 feature-complete gates explicit. Preserve the existing provider-neutral protocol and avoid starting provider expansion before the core product is complete.

## accepted scope

- Add a V0 feature-complete checkpoint to `ROADMAP.md`.
- Add a deferred provider-neutral adapter track covering Claude and Pi.
- Record the future adapter contract, capability vocabulary, containment prerequisite, and decision gates.
- Record the current remaining work without changing its implementation status.

## exclusions

- No Claude or Pi invocation, package, credential, adapter, CLI, report schema, benchmark, or comparison run.
- No change to the Codex adapters or deterministic evaluator.
- No architecture decision for a future adapter API.
- No claim that Claude and Pi have equivalent command, session, sandbox, or resume capabilities.

## acceptance checks

- The roadmap distinguishes implemented core capability from remaining V0 gates.
- Claude/Pi generalisation is explicitly backlogged behind feature completion.
- The future adapter contract is described as a proposal requiring a later ADR and decision challenge.
- No runtime or package files change.

## stop conditions

- Stop if the roadmap edit starts prescribing an implementation contract as accepted architecture.
- Stop if provider support is described as implemented or comparable without live evidence.

