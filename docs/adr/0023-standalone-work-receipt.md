# ADR: standalone EHS work receipt

## status

accepted; mandatory presentation superseded by [ADR 049](049-proportionate-guidance-and-functional-domain-modelling.md) on 2026-11-12. The original decision below is retained as history; its standalone-method boundary remains in force.

## context

EHS already asks agents to record claims, commands, results, risks, review, and remaining uncertainty. The evidence ledger is detailed enough for audit, but a fresh reader still has to reconstruct the central outcome from several sections. The ideation boundary is explicit: EHS should remain a standalone engineering method and should not become an orchestration runtime or evaluation product.

## decision

Add a compact Markdown work receipt at the top of the existing non-trivial-work evidence ledger with exactly these fields:

- `result`: `complete`, `blocked`, `needs-human-decision`, or `abandoned`.
- `claim`: the outcome being asserted.
- `evidence`: the relevant verification or review results, with provenance stated plainly.
- `remaining uncertainty`: what was not verified or remains risky.
- `next`: the next review, decision, follow-up, or handoff action.

The receipt is a projection for humans and future consumers. It is not a runtime event, trusted attestation, scheduler input, or required JSON schema. The existing detailed ledger remains authoritative for the full evidence record. Trivial edits remain outside this contract.

## consequences

- A reviewer can understand the outcome without reading the entire ledger first.
- EHS remains useful without a protocol, loop runner, provider adapter, or evaluator.
- A future consumer can read the receipt without creating a dependency on EHS internals.
- The receipt may duplicate information; the skill must keep it short and point to the detailed ledger rather than repeat it.
- Agent-declared evidence must not be described as host-captured or independently attested.

## options considered

### Add no receipt

Rejected because the existing evidence concepts are strong but distributed, making handoff and later review less efficient.

### Add a TypeScript or JSON receipt schema

Rejected because it would turn a small method convention into a public runtime contract and invite coupling to protocol or evaluation machinery.

### Add a general EHS event and workflow system

Rejected because scheduling, retries, budgets, leases, continuation, and projections belong to a controller above the engineering method.

### Replace the detailed ledger with the receipt

Rejected because compact communication and full auditability serve different readers and should remain separate.

## trade-offs

- The receipt improves scanning but cannot prove execution by itself.
- Markdown keeps the method portable but makes machine parsing intentionally best-effort.
- A five-field contract is small enough to remain stable but cannot encode every domain-specific claim.

## follow-up work

- Dogfood the receipt on representative real EHS changes and record whether it reduces review time or creates duplicate prose.
- Revisit the contract only after observed friction; do not add fields speculatively.

## review date

After five real operator dogfood changes or before introducing a schema version 2, whichever comes first.
