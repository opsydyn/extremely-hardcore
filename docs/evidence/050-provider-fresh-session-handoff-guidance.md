# evidence ledger: provider fresh-session handoff guidance

## work receipt

- result: complete with qualitative field-burden evidence
- claim: The provider onboarding guide now gives Codex, Claude, and Pi users a
  provider-neutral status-snapshot handoff vocabulary without claiming that EHS
  implements file-reading resume.
- evidence: The planned red assertion failed before the edit; the final guide
  names the optional status source, session boundary, expected/observed result,
  and explicit limitations; Run 050 captured 9/9 criteria; validation,
  attestation, CI, and repository checks pass.
- remaining uncertainty: Run 050 did not launch a provider. Timing,
  productivity effect, provider adherence, file-reading resume, containment,
  comparison, and release remain unmeasured or unproved.
- next: Review Runs 049 and 050 together before proposing any stronger resume
  boundary.

## summary

Run 050 is the second real documentation use of the future dogfood template. It
adds a provider-neutral fresh-session handoff section to
`docs/provider-onboarding.md`. The section explains how to capture optional
`eh status` output, supply it as prompt input, record the session boundary, and
label the result as prompt-fed rather than file-reading resume.

## changed files

- `docs/provider-onboarding.md`
- `docs/change-contracts/050-provider-fresh-session-handoff-guidance.md`
- `docs/domain/050-provider-fresh-session-handoff-guidance.md`
- `docs/implementation-plans/050-provider-fresh-session-handoff-guidance.md`
- `docs/reviews/050-provider-fresh-session-handoff-guidance.md`
- `issues/050-provider-fresh-session-handoff-guidance.md`
- `docs/dogfood/050-provider-fresh-session-handoff-guidance.md`
- this evidence ledger

The Run 049 and earlier working-tree changes were preserved. No provider
credentials or raw provider transcripts were added.

## commands run

### Test-first and protocol checks

- Planned red content assertion -> exit 1 with the expected missing
  fresh-session-section message before editing the guide.
- The first `onboarding-provider-neutral` capture -> exit 1 because its pattern
  required a literal `provider-neutral` label; the guide expresses the same
  boundary through host-section and non-inference wording. The criterion was
  refreshed with a structural assertion. The first invocation of that
  replacement also failed before Bun ran because a nested shell command
  contained an unescaped apostrophe; it was rerun with apostrophe-free terms.
  That assertion then assumed `host sections above` would be on one physical
  line and exited 1; it was refined to separate substrings. All failed captures
  were retained as harness-pattern or command-construction misses.
- Nine final content and repository evidence captures -> all exit 0 at one
  final workspace fingerprint.
- `bun run eh validate .extremely-hardcore/runs/050-provider-fresh-session-handoff-guidance`
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
- Record-reported: claim-boundary friction and qualitative burden.
- Not evidenced: a provider interpreting a snapshot in this run, timing,
  productivity effect, resume, adherence, containment, comparison, or release.

## passing checks

- The guide names the optional status snapshot source and records expected versus
  observed result and session boundary fields.
- Prompt-fed interpretation is explicitly separated from file-reading resume.
- Provider-specific mechanics remain in their host sections.
- Run 050 has 9/9 criteria, 0 blockers, valid completion, and retained local
  evidence.
- Structural, test, type, and whitespace checks pass.

## failing or blocked checks

- The first `onboarding-provider-neutral` evidence pattern failed on a missing
  literal label, and its first replacement invocation failed on shell quoting;
  the apostrophe-free replacement then failed on Markdown wrapping; the
  separate-substring replacement passed and is the final criterion reference.
- Run 050 did not execute a provider; the section documents a boundary rather
  than proving provider behavior.
- Timing and productivity effect remain not measured.

## architecture impact

No runtime architecture, protocol schema, provider adapter, dependency,
persistence, integration, sandbox, network, CI, deployment, or orchestration
behavior changed. The edit is provider-onboarding guidance only.

## public contract impact

The provider onboarding documentation now distinguishes a supplied status
snapshot from file-reading resume. No provider, CLI, skill, plugin, or protocol
contract changed.

## risks left open

- A reader could still mistake a well-formed marker for proof of file access or
  adherence; the guide repeats the limitation but this run did not measure
  comprehension.
- Provider-specific session flags may differ; the generic section intentionally
  avoids prescribing them.
- No accepted containment boundary exists for writable execution.
- Release remains held by Run 047 gaps and unproved stronger resume behavior.

## human review needed

Yes. Review Runs 049 and 050 together and decide whether the template should
remain a lightweight convention before any file-reading resume proposal.

## final recommendation

needs review
