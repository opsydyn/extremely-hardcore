# change contract: future dogfood record and fresh-session resume

## user intent

Standardize the minimum information a future EHS dogfood record must carry and
dogfood the durable handoff with one authorized fresh Pi session. Keep the
result standalone, small, and honest about what a no-tools resume check can
prove.

## current understanding

- Run 047 found that historical records do not consistently report friction,
  false blocks, setup/review time, fresh-agent readability, or projection
  retention.
- The EHS protocol already exposes the durable handoff fields `state`, `risk`,
  `criteria`, `blockers`, `validation`, and `nextAction` through `eh status`.
- Pi `0.84.1` is currently authenticated and passed the explicit EHS loading
  smoke. Codex and Claude model loading remain blocked in the current
  environment.
- A no-tools fresh session cannot read a local run file. The resume check must
  therefore pass a host-captured status snapshot in the prompt and label that
  limitation explicitly.

## allowed scope

- Add one concise `docs/dogfood/template.md` for future records.
- Add a README checklist that points future operators to the template and says
  which fields are required without backfilling historical records.
- Record one fresh Pi session that receives a durable status snapshot and
  returns the expected next-action marker.
- Add Run 048 governance, dogfood, evidence, and protocol records.
- Update the roadmap and dogfood decision with the template and narrow resume
  evidence.
- Run the EHS structural, test, typecheck, whitespace, and protocol checks.

## forbidden scope

- Do not migrate or rewrite Runs 1 through 12.
- Do not change the protocol schema, validator, status projection, CLI, skill
  instructions, provider adapters, or plugin manifests.
- Do not introduce a JSON schema, metrics collector, tracker, resume daemon,
  orchestration layer, or new dependency.
- Do not allow Pi filesystem, shell, network, or workspace-writing tools for
  this check.
- Do not persist credentials, raw provider transcripts, encrypted reasoning,
  or a provider session.
- Do not claim file-reading resume, host containment, provider adherence,
  provider comparison, or release readiness.
- Do not commit or change unrelated dirty work.

## affected areas

- Future dogfood record documentation.
- Dogfood index and operational decision.
- Roadmap agent-experience and release-gate status.
- Pi host onboarding evidence for a narrow fresh-session handoff check.
- EHS local protocol evidence for this documentation change.

## minimum complete change

Add one compact Markdown template covering record identity, protocol result,
operator timing, friction and false-block outcome, evidence retention,
fresh-session resume/readability, limitations, and next action. Use it to
record one current Pi no-tools resume interpretation check from a durable
`eh status` snapshot, with version, command boundary, exact observed marker,
and limitation. Complete a standard-risk Run 048 with fresh EHS evidence.

## public contracts

- The recommended minimum fields for future human-readable dogfood records.
- The documented distinction between a prompt-fed fresh-session handoff and
  actual filesystem or workspace resume.
- Existing `eh status` fields and the standalone five-field work receipt remain
  unchanged.

## assumptions

- A Markdown template is sufficient to standardize future records without
  creating a second machine protocol.
- The user-authorized Pi account may be used for one no-tools, no-session,
  read-only prompt; no credential material will be accessed or stored.
- A host-captured final marker is evidence that the fresh session produced the
  requested interpretation, not independent proof that Pi loaded every EHS
  instruction or would follow it on real work.

## risks

- A prompt-fed snapshot can be mistaken for the model reading a run directory;
  the record must name this limitation prominently.
- A template can become ceremony if every field is treated as a mandatory
  essay. Keep values short and permit `not measured` or `not available` with a
  reason.
- One Pi resume check cannot establish cross-provider resume behavior or a
  fresh-session success rate.

## simplicity check

- **outcome:** make future dogfood records comparable enough to review and
  test one durable handoff interpretation.
- **options checked:** backfill all historical records; add a JSON schema and
  validator; create a resume adapter; or add one Markdown template plus one
  no-tools host check.
- **selected path:** one optional Markdown template, a short README checklist,
  and one prompt-fed Pi check recorded with explicit limits.
- **entanglement avoided:** no protocol schema, provider adapter, tracker,
  host tool permission, or historical migration.
- **safeguards preserved:** explicit evidence provenance, no raw output or
  credentials, no-tools boundary, existing `eh status` vocabulary, and final
  protocol validation.
- **omitted scope:** file-reading resume, writable execution, metrics,
  comparison, and release approval.
- **remaining uncertainty:** whether future operators find the template
  proportionate remains to be tested on later real changes.

## acceptance evidence

- A pre-change content assertion fails because the future-record template and
  Run 048 record do not yet exist.
- The template and README checklist contain the required minimum fields and
  explicitly permit unavailable measurements with reasons.
- A fresh Pi `0.84.1` no-tools session returns the exact resume marker from the
  supplied durable status snapshot; raw output is not retained.
- Run 048 captures fresh content, repository, and protocol evidence, validates
  at one final fingerprint, and produces a valid attestation and CI projection.
- No historical record or public protocol schema changes.

## stop conditions

Stop and record a blocker if the template requires a new machine schema, if the
Pi command needs tools or session persistence, if the model cannot distinguish
the supplied snapshot from actual file access, if credentials or raw output
would be retained, or if the documentation starts making a provider or release
claim.
