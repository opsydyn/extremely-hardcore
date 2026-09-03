# change contract: expose the real-change record workflow in the user guide

## user intent

Make the future dogfood record workflow discoverable to a new EHS user. The
user guide should point to the existing template and explain the minimum honest
recording rule without adding protocol ceremony or changing runtime behavior.

## current understanding

`docs/user-guide.md` explains how to create a local `eh` run and how to use the
standalone work receipt, but it does not link the new
`docs/dogfood/template.md`. The template already defines the minimum fields and
states that unavailable measurements must be named rather than invented.
Existing dogfood records are historical and must not be rewritten to fit it.

## allowed scope

- Add one concise user-guide subsection linking `dogfood/template.md`.
- Explain that a real non-trivial change gets a new record, that missing
  measurements carry a reason, and that historical records are not backfilled.
- Keep the guidance compatible with both standalone EHS use and the optional
  `eh` protocol.
- Record this change contract, domain map, implementation plan, review, issue,
  dogfood record, and evidence ledger.

## forbidden scope

- No runtime, CLI, protocol schema, skill, plugin manifest, provider, auth,
  persistence, CI, deployment, or evaluation changes.
- No historical record migration or generated metrics.
- No new tracker, receipt schema, required command, or user-repository ADR
  scaffolding.
- No provider call, network access, or writable external-repository action.

## affected areas

- New-user documentation.
- The existing dogfood-record convention and its link surface.
- Run 049 protocol evidence only.

## minimum complete change

Add the smallest subsection that links the existing template, explains when to
use it, preserves explicit unavailable reasons, and says that historical
records remain historical. Do not duplicate the template fields in full.

## architecture-decision check

No ADR is required. This is a local documentation clarification with no
runtime, public API, persistence, dependency, integration, or operational
boundary change.

## public contracts

The user-facing documentation contract becomes easier to discover. No
machine-readable protocol or public API contract changes.

## risks

- The guide can drift from the template if future field changes are not linked.
- A new user could mistake the template for a mandatory second protocol if the
  standalone boundary is not stated clearly.

## acceptance evidence

- A content assertion fails before the guide subsection exists.
- The final guide links the template and preserves the standalone/no-backfill
  boundary.
- Run 049 captures fresh evidence for all criteria at one final fingerprint.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and whitespace checks
  pass.

## stop conditions

Stop if the change needs a new field schema, a runtime command, a historical
migration, or a cross-provider claim. Stop if the guide cannot explain the
template without duplicating or contradicting it.
