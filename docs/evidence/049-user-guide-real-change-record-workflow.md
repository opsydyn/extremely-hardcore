# evidence ledger: user-guide real-change record workflow

## work receipt

- result: complete with qualitative field-burden evidence
- claim: The EHS user guide now makes the future real-change record workflow
  discoverable without creating a second protocol or forcing the template onto
  trivial edits.
- evidence: The planned red assertion failed before the edit; the final guide
  links the template and states the unavailable-measurement and no-backfill
  boundaries; Run 049 captured 9/9 criteria; validation, attestation, CI, and
  repository checks pass.
- remaining uncertainty: Timing and productivity effect were not measured. This
  documentation-only run provides no provider adherence, resume, containment,
  comparison, or release evidence.
- next: Apply the template to Run 050 and review field burden across both real
  changes.

## summary

Run 049 is the first real documentation use of the future dogfood template. It
adds one concise section to `docs/user-guide.md` so a new user can find the
template, understand explicit unavailable measurements, and preserve historical
records. The section keeps standalone EHS use separate from the optional `eh`
protocol.

## changed files

- `docs/user-guide.md`
- `docs/change-contracts/049-user-guide-real-change-record-workflow.md`
- `docs/domain/049-user-guide-real-change-record-workflow.md`
- `docs/implementation-plans/049-user-guide-real-change-record-workflow.md`
- `docs/reviews/049-user-guide-real-change-record-workflow.md`
- `issues/049-user-guide-real-change-record-workflow.md`
- `docs/dogfood/049-user-guide-real-change-record-workflow.md`
- this evidence ledger

The Run 048 and earlier working-tree changes were preserved. The provider
onboarding edit for Run 050 was completed in the same working session before
final evidence capture but is recorded separately under Run 050.

## commands run

### Test-first and protocol checks

- Planned red content assertion -> exit 1 with the expected missing-template
  message before editing the guide.
- The first `guide-no-runtime-scope` capture -> exit 1 because its pattern
  required a sentence to stay on one physical line; the criterion was refreshed
  with a structural substring assertion and the failed capture was retained as
  a harness-pattern miss.
- Nine final content and repository evidence captures -> all exit 0 at one
  final workspace fingerprint.
- `bun run eh validate .extremely-hardcore/runs/049-user-guide-real-change-record-workflow`
  -> pass.
- `bun run eh transition ... complete` -> pass; final completion transition
  recorded.
- `bun run eh attest ...` -> valid attestation.
- `bun run eh ci ...` -> valid CI projection.

### Repository checks

- `bun run check` -> pass.
- `bun run test` -> pass; 136 tests, 0 failures, 483 expectations.
- `bunx tsc --noEmit` -> pass.
- `git diff --check` -> pass.

### Evidence boundary

- Host-captured: content assertion results, protocol outputs, and repository
  command exits.
- Record-reported: field-selection friction and qualitative burden.
- Not evidenced: timing, productivity effect, provider behavior, resume,
  adherence, containment, comparison, or release.

## passing checks

- The guide links the existing template rather than duplicating it.
- The standalone and optional-protocol boundary is explicit.
- Missing measurements require an explicit unavailable reason and historical
  records are not backfilled.
- Run 049 has 9/9 criteria, 0 blockers, valid completion, and retained local
  evidence.
- Structural, test, type, and whitespace checks pass.

## failing or blocked checks

- The first `guide-no-runtime-scope` evidence pattern failed on Markdown line
  wrapping; its replacement passed and is the final criterion reference.
- Timing and productivity effect remain not measured.
- No provider or fresh-session check was required for this documentation change.

## architecture impact

No runtime architecture, protocol schema, provider adapter, dependency,
persistence, integration, sandbox, network, CI, deployment, or orchestration
behavior changed. The edit is a user-guide clarification.

## public contract impact

The user-facing documentation is more discoverable. No machine-readable
protocol, CLI, plugin, skill, or provider contract changed.

## risks left open

- The guide can drift from the template if the convention changes later.
- A reader could still over-apply the template to trivial edits; the guide
  preserves the existing EHS distinction but this run did not measure it.
- No provider, resume, adherence, containment, comparison, or release claim is
  supported.

## human review needed

Yes. Review whether one linked paragraph is enough for new users and whether the
same fields remain low-burden in Run 050.

## final recommendation

needs review
