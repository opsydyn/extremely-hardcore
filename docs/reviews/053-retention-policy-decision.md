# Bounded-context review: retention policy decision

## proposed change

Record the approved human retention policy, preserve the historical projection
gap without backfill, require durable projections for future release evidence,
and align the dogfood template, index, and roadmap.

## affected contexts

- Dogfood governance and release-gate documentation.
- Existing protocol and projection vocabulary as referenced by documentation.

## allowed dependencies

- Run 052's retained audit result.
- Existing dogfood decision, template, index, and roadmap.
- Existing local Run 053 protocol tooling.

## suspicious dependencies

- Rewriting historical runs or evidence.
- Adding a projection archive, persistence service, schema, or CI workflow.
- Selecting a storage owner without a separate design.
- Launching provider or writable execution to justify the policy.

## data ownership

No data owner changes. The protocol remains authoritative for run state and
evidence; derived projections remain CLI outputs; dogfood governance records
the policy and release limitation.

## integration events

None. This slice changes Markdown and a local documentation-only protocol
record. It does not contact CI, providers, the network, or a storage service.

## anti-corruption needs

Keep these claims separate: historical completion at a recorded fingerprint,
retention of a derived projection, a future durability requirement, and human
release acceptance. The policy must not be read as enforcement or release
approval.

## verdict

safe with noted risk

## follow-up

The next bounded slice is authorized current Codex/Claude loading checks plus
standardized operator measurement. A durable-retention implementation needs a
new contract and architecture/provenance review before work begins.
