# evidence ledger: future dogfood record and fresh Pi handoff

## work receipt

- result: complete with narrow fresh-session evidence
- claim: The future dogfood record now has a compact minimum template, and one
  fresh Pi session interpreted a supplied durable `eh status` snapshot without
  overstating file-reading resume.
- evidence: The template and index checklist are present; Run 048 captured all
  eleven criteria; the intentional human-decision pause and resume are recorded;
  Pi emitted the exact expected marker under no-tools/no-session/no-context-files;
  the final protocol validation, attestation, CI projection, and repository
  checks pass.
- remaining uncertainty: The Pi check was prompt-fed and retained only its exact
  final marker; it does not prove file access, arbitrary workspace resume,
  independent protocol enforcement, cross-provider adherence, containment, or
  release readiness. Timing remains not measured.
- next: Use the template on two or three real changes and reassess field burden
  before proposing a stronger file-reading resume boundary.

## summary

Run 048 is a small documentation and provider-boundary dogfood slice. It adds a
human-readable template for future real-change records, then tests one narrow
fresh Pi handoff. The fresh session receives an exact `eh status` snapshot as
prompt text and is prohibited from using tools or context files. The result is
useful evidence for interpreting a supplied receipt, not evidence that Pi read
the repository or resumed execution from local state.

## changed files

- `docs/dogfood/template.md`
- `docs/dogfood/048-future-dogfood-record-and-pi-resume.md`
- `docs/dogfood/README.md`
- `docs/dogfood/decision.md`
- `ROADMAP.md`
- this evidence ledger

Run 046 and Run 047 governance and dogfood files were already present as
working-tree changes and were preserved. No unrelated dirty files were
modified.

## commands run

### Protocol and content checks

- Deliberate pre-change content assertion -> exit 1 with the expected missing
  template and future-record message.
- `bun run eh transition ... needs-human-decision` -> pass; transition id
  `8a4f91ac-fdf9-4a67-85ac-43d07ffce5ed`.
- `bun run eh status ...` -> reported `needs-human-decision`, 11 uncovered
  criteria, 0 blockers, and the human-decision-or-abandon next action.
- Fresh Pi command with `--no-session --no-tools --no-context-files` and the
  current EHS skill -> exit 0; the exact
  `EHS_RESUME provider=pi state=needs-human-decision next=record-human-decision-or-abandon source=provided-status limitation=not-file-read`
  marker was present. Raw provider JSONL was not retained.
- `bun run eh transition ... implemented` -> pass; transition id
  `53eae06f-553f-4568-97b4-0b899495ab52`.
- Eleven final content and repository evidence captures -> all exit 0 at one
  final workspace fingerprint.
- `bun run eh validate ...` -> pass.
- `bun run eh transition ... complete` -> pass; final completion transition
  recorded.
- `bun run eh attest ...` -> valid attestation.
- `bun run eh ci ...` -> valid CI projection.

### Repository checks

- `bun run check` -> pass.
- `bun run test` -> pass; 136 tests, 0 failures, 483 expectations.
- `bunx tsc --noEmit` -> pass.
- `git diff --check` -> pass.

### Fresh-session boundary

- Host-captured: Pi `0.84.1`, model selection, process flags, supplied snapshot,
  exact marker, parser exit state, and EHS transition output.
- Record-reported: interpretation, friction, false-block classification, and
  limitation boundaries.
- Not evidenced: file-reading resume, arbitrary continuation, provider
  comparison, adherence, independent containment, or release.

## passing checks

- The template contains the minimum identity, protocol, timing, friction,
  false-block, evidence-quality, fresh-session, limitation, and next-action
  fields.
- The index directs future operators to the template and preserves historical
  records without requiring invented measurements.
- Run 048 records the intentional protocol pause, fresh-session marker, resume,
  final validation, and completion path.
- The narrow Pi smoke passed while keeping prompt-fed interpretation separate
  from file-reading claims.
- Repository checks and the final protocol attestation pass.

## failing or blocked checks

- No required check failed in the final run.
- Timing was not measured.
- The fresh-session check is intentionally limited to supplied prompt state;
  stronger resume evidence remains open.

## architecture impact

No runtime architecture, protocol schema, provider adapter, dependency,
persistence, integration, sandbox, network, CI, deployment, or orchestration
behavior changed. The template is a human-readable convention, and the Pi
check is a one-off no-tools smoke.

## public contract impact

The dogfood documentation now defines a recommended minimum record shape for
future operators. It does not change the `eh` protocol schema, skill files,
plugin manifest, or provider adapter interfaces.

## risks left open

- A prompt-fed marker can be mistaken for file-backed resume if its boundary is
  not read carefully.
- One Pi host and one narrow smoke cannot establish cross-agent adherence or a
  provider comparison.
- No accepted containment boundary exists for writable execution.
- Release remains held by the Run 047 retention, measurement, and loading gaps.

## human review needed

Yes. Review whether the minimum template is low-burden enough for two or three
future real changes, then decide whether stronger file-reading resume work is
worth its additional boundary and evidence cost.

## final recommendation

needs review
