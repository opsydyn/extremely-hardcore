# bounded-context review: Codex provenance adapter

## proposed change

Add a provider-specific delivery adapter that calls the local Codex CLI but emits only existing evaluation attempts plus a new provenance report.

## affected contexts

- Evaluation core: supplies scenario data and assesses attempts.
- Codex adapter: owns external-process invocation and artifact provenance.
- Delivery CLI: selects a workspace and output directory.
- External Codex CLI: executes the model under the supplied sandbox policy.
- Protocol: unchanged.

## allowed dependencies

`scripts/evaluate-codex.ts -> evaluation/run-codex-adapter.ts -> evaluation manifest and assessor`; the adapter may use Node filesystem, crypto, and child-process APIs. Protocol must not import adapter code.

## suspicious dependencies

Codex SDKs, provider HTTP clients, environment secrets, database storage, CI services, and adapter imports in protocol modules.

## data ownership

The caller owns the selected workspace and output directory. The adapter writes only under the new output directory. The model owns its generated final response; the adapter records it verbatim.

## transaction boundaries

One scenario invocation writes a complete artifact directory before contributing an attempt. The aggregate report is written only after all scenarios succeed.

## integration events

The Codex process boundary is synchronous and local. No network transport is added by this repository.

## anti-corruption needs

The response schema and parser prevent prose from becoming evaluator facts. Relative artifact paths and digests prevent adapter report fields from standing alone as untraceable claims.

## verdict

safe with noted risk. This is a real external-executable boundary, but it is constrained to read-only ephemeral invocation and caller-owned artifact storage.
