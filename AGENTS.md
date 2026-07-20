# Agent Instructions

Use the skills in `skills/` for non-trivial work in this repo.

- Always start non-trivial work with `change-contract`.
- Always check whether `architecture-decision` applies.
- Use `decision-challenge` before planning a proposal that introduces external writable-agent execution; changes an architecture, security, sandbox, isolation, or provenance boundary; changes public contracts, persistence, CI, deployment, or observability behaviour; or makes a product-differentiation, benchmark, provider-comparison, or regression-threshold claim.
- Use `domain-discovery` when domain language, persistence, API shape, or cross-context logic is involved.
- Use `bounded-context-review` before changing imports, module boundaries, shared packages, database shape, or integration flows.
- Use `test-first-implementation` before writing code.
- Always finish with `evidence-ledger`.
- Never expand scope without stating why.
- Never silently change public API, auth, persistence, CI, deployment, or observability behaviour.
- Prefer small diffs.
- Prefer explicit trade-offs.
- Prefer boring code.

Trivial edits do not need the full loop. A typo is still a typo. Do not make it an opera.
