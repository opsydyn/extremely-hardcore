# evidence ledger: human review template decision

## work receipt

- result: complete with human decision recorded and release held
- claim: The repository now records human approval of the lightweight dogfood
  template convention and explicit deferral of file-reading resume without
  changing executable behavior or closing unrelated release gates.
- evidence: The planned red assertion failed before the decision existed; the
  final decision, index, and roadmap are aligned; Run 051 captured 12/12
  criteria; validation, attestation, CI, and repository checks pass.
- remaining uncertainty: Timing, omission rates, productivity effect, provider
  adherence, containment, current Codex/Claude model loading, and file-reading
  resume remain unmeasured or unproved.
- next: Select one remaining retention or measurement gate before proposing any
  stronger resume boundary.

## summary

Run 051 records the user's approval of the bounded review recommendation. The
future dogfood template is accepted as a lightweight recommended Markdown
convention. File-reading resume is explicitly deferred; a future proposal must
pass a fresh security, provenance, host, and operational review. Release and
provider gates remain open.

## changed files

- `docs/dogfood/decision.md`
- `docs/dogfood/README.md`
- `ROADMAP.md`
- `docs/change-contracts/051-human-review-template-decision.md`
- `docs/domain/051-human-review-template-decision.md`
- `docs/implementation-plans/051-human-review-template-decision.md`
- `docs/reviews/051-human-review-template-decision.md`
- `issues/051-human-review-template-decision.md`
- `docs/dogfood/051-human-review-template-decision.md`
- this evidence ledger

Runs 046 through 050 and their evidence remain preserved. No raw user
transcript, credential, or provider artifact was added.

## commands run

### Test-first and protocol checks

- Planned red decision-content assertion -> exit 1 with the expected missing
  human-review message.
- The first `template-accepted` capture -> exit 1 because it required literal
  `no new schema` and `no CLI command` phrases; the decision used equivalent
  “do not add” wording. The criterion was refreshed with a structural
  assertion, and the failed capture was retained as a harness-pattern miss.
- Twelve final content and repository evidence captures -> all exit 0 at one
  final workspace fingerprint.
- `bun run eh validate .extremely-hardcore/runs/051-human-review-template-decision`
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

### Decision boundary

- Host-captured: the explicit user approval in the current session and the
  resulting decision-document content.
- Record-reported: field-burden interpretation and deferred-resume rationale.
- Not evidenced: release approval, provider comparison, adherence, containment,
  productivity effect, or file-reading resume.

## passing checks

- The approved template convention is explicit and remains Markdown-only.
- File-reading resume is explicitly deferred and requires a separate proposal.
- The index and roadmap no longer treat this review as pending.
- Open retention, provider-loading, adherence, containment, and release gates
  remain visible.
- Run 051 has 12/12 criteria, 0 blockers, valid completion, and retained local
  evidence.
- Structural, test, type, and whitespace checks pass.

## failing or blocked checks

- The first `template-accepted` evidence pattern failed on equivalent wording;
  its structural replacement passed and is the final criterion reference.
- Timing, omission rates, and productivity effect remain not measured.
- File-reading resume and release remain intentionally unapproved.

## architecture impact

No runtime architecture, protocol schema, provider adapter, dependency,
persistence, integration, sandbox, network, CI, deployment, or orchestration
behavior changed. This is a documentation decision record.

## public contract impact

The roadmap and dogfood documentation now state the approved convention and
deferred capability. No machine-readable, provider, CLI, skill, or protocol
contract changed.

## risks left open

- Readers could mistake template acceptance for release approval; the decision
  keeps those claims separate.
- “Deferred” could be mistaken for a design commitment; any future resume work
  needs its own decision challenge.
- Retention, current Codex/Claude loading, adherence, containment, and timing
  gaps remain unresolved.

## human review needed

No further approval is needed for this documentation decision. A future
file-reading resume proposal requires fresh human review before planning or
implementation.

## final recommendation

needs follow-up
