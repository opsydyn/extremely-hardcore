# Agent Instructions

Use the skills in `skills/` for non-trivial work in this repo.

- Always start non-trivial work with `change-contract`.
- Always check whether `architecture-decision` applies.
- Use `decision-challenge` before planning a proposal that introduces external writable-agent execution; changes an architecture, security, sandbox, isolation, or provenance boundary; changes public contracts, persistence, CI, deployment, or observability behaviour with material compatibility, data, security or operational consequences; or makes a product-differentiation, benchmark, provider-comparison, or regression-threshold claim. Reuse accepted decisions whose assumptions still hold; familiarity does not waive required approvals.
- Use `domain-discovery` when domain language, rules, valid states or ownership are unclear or changing.
- Use `bounded-context-review` when dependency direction, ownership, transaction boundaries or integration contracts change, not for an import alone.
- Use `test-first-implementation` before writing code.
- Always finish with `evidence-ledger`.
- Never expand scope without stating why.
- Never silently change public API, auth, persistence, CI, deployment, or observability behaviour.
- Prefer small diffs.
- Prefer explicit trade-offs.
- Prefer boring code.

Routine work follows scope/constraints, the smallest complete change, meaningful
verification and a concise outcome/limitations. Reuse a clear brief and accepted
decisions; no separate no-ADR declaration or fixed-format receipt is needed.
Trivial edits do not need the full loop. A typo is still a typo. Do not make it an opera.

For bounded local work, keep scope, plan, and evidence concise in the conversation;
do not generate a document per skill. Preserve required durable records and
approval gates for consequential work and existing protocol runs. Load only
applicable skills, reuse equivalent records from other required workflows, and
continue authorised work through relevant verification without extra stage approvals.
