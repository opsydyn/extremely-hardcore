# Evidence ledger: current provider loading and measurement

## work receipt

- result: complete as a current provider-boundary and command-timing evidence
  refresh; release remains held
- claim: The onboarding guide, dogfood records, and roadmap now accurately
  distinguish current provider discovery, loading, authentication, and local
  command wall time without making adherence, productivity, comparison, or
  release claims.
- evidence: Run 055 records Codex CLI `0.147.0` as responsive but not loading
  EHS in the current default configuration, Claude Code `2.1.251` metadata as
  valid with seven plugin-validation warnings and clean marketplace validation,
  with model loading authentication-blocked, and three bounded `eh status`/
  `eh summary` repetitions. All sixteen
  criteria, repository checks, typecheck, whitespace, approval, validation,
  attestation, and local CI projection checks pass.
- remaining uncertainty: Codex needs an installed current plugin configuration
  and Claude needs usable authentication for fresh `loaded=yes` evidence.
  Active operator time, adherence, productivity, comparison, containment,
  durable retention implementation, and release remain unproved or separately
  gated.
- next: Retry provider loading in user-authorized current configurations, then
  design one separately approved engineering-adherence task.

## summary

Run 055 is a documentation-only refresh of the provider onboarding boundary.
The current default Codex configuration does not list EHS and the bounded
read-only smoke timed out before a trustworthy marker. Claude metadata
validation passes with seven plugin warnings and clean marketplace validation,
but the model smoke is blocked by the current authentication state. The fixed
local receipt path was repeated three times;
the result is command wall-time evidence only. No runtime, adapter, protocol,
provider, or persistence behaviour changed.

## changed files

- `docs/provider-onboarding.md`
- `docs/dogfood/README.md`
- `docs/dogfood/decision.md`
- `ROADMAP.md`
- `docs/change-contracts/055-current-provider-loading-and-measurement.md`
- `docs/domain/055-current-provider-loading-and-measurement.md`
- `docs/decision-challenges/055-current-provider-loading-and-measurement.md`
- `docs/implementation-plans/055-current-provider-loading-and-measurement.md`
- `docs/reviews/055-current-provider-loading-and-measurement.md`
- `issues/055-current-provider-loading-and-measurement.md`
- `docs/dogfood/055-current-provider-loading-and-measurement.md`
- this evidence ledger

No credentials, raw provider transcripts, provider session state, runtime code,
skill instructions, adapter code, protocol schema, or historical records
changed.

## commands run

### Test-first and provider checks

- Planned red content assertion -> exit 1 as expected before Run 055 was
  recorded. A first content assertion also missed a line-wrapped phrase and
  was corrected before final capture.
- Host version commands resolved to the explicit host binaries because
  `bun run` prepends the repository's `node_modules/.bin`, which contains a
  different Claude CLI fixture: Codex CLI `0.147.0`, Claude Code `2.1.251`,
  and Pi `0.84.1`.
- Current `codex plugin list` classifier -> exit 0; no local EHS entry found
  in the current default configuration.
- Current Codex read-only smoke classifier using the explicit host binary and a
  15-second bound -> exit 143 after timeout before a trustworthy marker; no
  pass was inferred from process failure or timeout.
- `claude plugin validate .claude-plugin/plugin.json` and the marketplace
  validation using the explicit host binary -> both exit 0; plugin validation
  reports seven existing agent-frontmatter warnings and marketplace validation
  reports zero.
- Current Claude read-only smoke using the explicit host binary ->
  authentication-blocked before a trustworthy marker; raw output was not
  retained.
- An earlier evidence wrapper used the repository's fixture Claude binary and
  reported `2.1.87`; that criterion record was superseded and is retained only
  as a command-path correction, not as host evidence.

### Measurement and protocol checks

- Three repetitions of `bun run eh status` and `bun run eh summary` -> all
  status commands exited 0; all summary commands exited 1 while Run 055 was
  incomplete. Status median 46.33 ms; summary median 46.33 ms.
- Final provider-guide, dogfood, roadmap, and supporting-record assertions ->
  pass.
- Sixteen final Run 055 evidence captures -> all exit 0 at one workspace
  fingerprint.
- `bun run eh validate .extremely-hardcore/runs/055-current-provider-loading-and-measurement`
  -> pass.
- Required high-risk approval -> recorded for the final workspace fingerprint.
- `bun run eh transition .extremely-hardcore/runs/055-current-provider-loading-and-measurement complete`
  -> pass; final completion transition recorded.
- `bun run eh attest .extremely-hardcore/runs/055-current-provider-loading-and-measurement`
  -> valid local attestation.
- `bun run eh ci .extremely-hardcore/runs/055-current-provider-loading-and-measurement`
  -> valid local CI projection.

### Repository checks

- `bun run check` -> pass: `validation passed: extremely-hardcore scaffold is complete`.
- `bun run test` -> pass; 136 tests, 0 failures, 483 expectations.
- `bunx tsc --noEmit` -> pass.
- Tracked and untracked text whitespace scan -> pass.

### Evidence boundary

- Host-captured: provider versions, discovery and metadata classifiers, smoke
  classifications, measurement output, content assertions, repository
  commands, protocol validation, approval, transition, attestation, and local
  CI projection.
- Record-reported: the concise operational interpretation and next action.
- Not evidenced: active human time, adherence, productivity, comparison,
  provider equivalence, containment, writable execution, file-reading resume,
  durable retention implementation, or release.

## passing checks

- Current Codex and Claude results are classified separately from package
  discovery, metadata validation, and process exit state.
- The current Codex default configuration is explicitly documented as not
  loading EHS and its bounded smoke timeout is visible; no installation was
  silently performed.
- Claude's existing metadata warnings and authentication block are visible
  without exposing raw output or credentials.
- The three-repetition sample reports command wall time and exit states without
  calling them active operator time or productivity.
- Run 055 has 16/16 criteria, zero blockers, required approval, valid
  completion, and valid local attestation and CI projection output.
- Structural, test, type, and whitespace checks pass.

## failing or blocked checks

- The planned red assertion exited 1 as expected before the public records were
  updated.
- Codex current loading remains unverified because the current default plugin
  configuration does not list EHS and the bounded smoke timed out before a
  marker.
- Claude current loading remains unverified because the model smoke is blocked
  by the current authentication state.
- The measurement's `eh summary` command exited 1 during all repetitions
  because the run was incomplete at measurement time; this is expected protocol
  state, not a repository failure.
- Active operator time, adherence, productivity, comparison, containment,
  writable execution, durable retention implementation, and release remain
  open or unproved.

## architecture impact

No runtime architecture, skill contract, provider adapter, dependency,
persistence, integration, sandbox, network, CI, deployment, or orchestration
behaviour changed. This is a documentation and host-observation slice.

## public contract impact

The provider onboarding, dogfood, and roadmap documents now include current
host observations and a command-wall-time measurement boundary. No
machine-readable, provider, CLI, plugin, skill, or protocol contract changed.

## risks left open

- The current Codex configuration and Claude authentication state prevent fresh
  current `loaded=yes` evidence for those hosts.
- The seven existing Claude metadata warnings remain unresolved.
- A small command-wall-time sample can be overread as productivity evidence;
  the docs explicitly rule that out.
- Local projections are valid for this run but are not a durable release
  archive; the approved retention policy remains unimplemented.
- No accepted containment boundary exists for writable provider execution.

## human review needed

The approved bounded slice is recorded. Human review is still needed before
using authenticated provider runs as adherence evidence, making any comparison
or productivity claim, implementing durable retention, accepting containment,
or approving release.

## final recommendation

needs follow-up
