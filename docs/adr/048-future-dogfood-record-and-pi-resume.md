# adr: standardize future dogfood records without a second protocol

## status

accepted

## context

Run 047 found that the ten-run campaign records do not use a consistent set of
fields for operator timing, friction, false blocks, evidence retention,
fresh-agent readability, or next action. The EHS protocol already exposes a
compact durable status projection, but no fresh session has been tested against
a supplied status snapshot in this campaign.

Pi `0.84.1` is available for a user-authorized no-tools smoke. A no-tools
session cannot read the local run directory, so treating its interpretation of
prompt-supplied state as filesystem resume would overstate the evidence.

## decision

Add one optional Markdown template and README checklist for future dogfood
records. Keep the template human-readable and permit unavailable measurements
with an explicit reason. Do not add a JSON schema, validator rule, metrics
collector, or historical migration.

Run one Pi no-session/no-tools check using a host-captured `eh status` snapshot.
Record the exact marker, host version, prompt boundary, and limitation. Classify
the result as fresh-session interpretation evidence only, not file-reading
resume, adherence, containment, or provider comparison evidence.

## consequences

- Future records can be compared on a small stable vocabulary without changing
  the EHS protocol.
- Historical gaps remain visible and are not rewritten.
- The Pi check tests the durable handoff language while preserving a strict
  no-tools boundary.
- Stronger resume semantics remain a separate future slice requiring explicit
  host and boundary review.

## options considered

- Backfill every historical record: rejected because it changes historical
  meaning and adds no new observation.
- Add a machine-readable dogfood schema and validator: rejected because the
  current gap is vocabulary and evidence discipline, not parsing machinery.
- Build a provider resume adapter: rejected because it would cross host/session
  boundaries before an accepted execution contract exists.
- Add one Markdown template and one no-tools interpretation smoke: accepted as
  the least powerful complete change.

## trade-offs

The template improves consistency but does not enforce completion and may still
feel like ceremony. The Pi result is directly observed but intentionally weak:
it proves only that one fresh session returned the requested interpretation from
the supplied snapshot.

## follow-up work

Use the template on two or three subsequent real dogfood changes and reassess
whether its fields are proportionate. Consider file-reading resume only after a
read-only host boundary and explicit protocol contract are approved.

## review date

2026-10-03
