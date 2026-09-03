# evidence ledger: operational acceptance and current host matrix

## work receipt

- result: complete with release held
- claim: The retained EHS dogfood campaign and current Codex, Claude Code, and Pi host boundary are documented without overstating incomplete evidence.
- evidence: Host-audited run/evidence/log paths, current CLI versions, isolated Codex discovery/install, Claude metadata validation, Pi readiness and exact loading marker, and a valid Run 047 protocol result after repository checks.
- remaining uncertainty: Three core attestation/CI projection sets are missing; false-block, timing, and fresh-agent-readability fields are incomplete; Codex and Claude model loading, adherence, and accepted containment remain unproved.
- next: Obtain human review of the retention and measurement gaps, standardize future dogfood fields, and run one authorized fresh-session resume check.

## summary

Run 047 is a documentation and evidence review, not a new provider campaign or
release approval. The ten-run core sample reports 65/65 documented acceptance
criteria covered. A host path audit found all twelve run directories and all
criterion-linked evidence/log files present, while the external attestation/CI
projection paths for Runs 1 through 3 are absent. The current host matrix
verifies Codex package discovery, Claude metadata validation with warnings, and
Pi session-local loading; the Codex and Claude model smokes are blocked by
disposable-environment authentication boundaries.

The aggregate deliberately does not compute a false-block rate, a
fresh-agent-readability rate, an overhead threshold, a provider comparison, or
an adherence result. The evidence supports a review-complete documentation
slice with a release hold.

## changed files

- `docs/change-contracts/047-operational-acceptance-host-matrix.md`
- `docs/decision-challenges/047-operational-acceptance-host-matrix.md`
- `docs/domain/047-operational-acceptance-host-matrix.md`
- `docs/adr/047-operational-acceptance-host-matrix.md`
- `docs/implementation-plans/047-operational-acceptance-host-matrix.md`
- `docs/reviews/047-operational-acceptance-host-matrix.md`
- `issues/047-operational-acceptance-host-matrix.md`
- `docs/dogfood/047-operational-acceptance-host-matrix.md`
- `docs/dogfood/README.md`
- `docs/dogfood/decision.md`
- `docs/provider-onboarding.md`
- `ROADMAP.md`
- this evidence ledger

Run 12 governance and dogfood files were already present as working-tree
changes before this slice and were preserved. No unrelated dirty files were
modified.

## commands run

### Host-captured transient checks

- `codex --version` -> `codex-cli 0.147.0`.
- `claude --version` -> `2.1.251 (Claude Code)`.
- `pi --version` -> `0.84.1`.
- `claude plugin validate .claude-plugin/plugin.json` -> exit 0 with seven
  existing agent-frontmatter warnings.
- `claude plugin validate .` -> exit 0 for the local marketplace manifest.
- Isolated Codex local marketplace add, plugin add, and `codex plugin list` ->
  exit 0; plugin `extremely-hardcore` installed and enabled at `0.0.1`.
- Codex read-only loading smoke -> exit 1 with `401 Unauthorized` because the
  disposable `CODEX_HOME` had no bearer auth.
- Claude read-only loading smoke -> exit 1 because the OAuth session was
  expired and could not refresh.
- `pi auth check --model openai-codex/gpt-5.3-codex-spark --json --no-refresh`
  -> `status=ready`.
- Pi explicit no-tools, no-session loading smoke -> exit 0 with the exact
  `EHS_SMOKE provider=pi loaded=yes ...` marker.
- Retained-path audit -> all twelve run directories and all referenced
  criterion evidence/log files present; 7/10 core and 9/12 all-record
  attestation/CI projection sets present.

Raw provider output and credentials were not persisted.

### Repository and protocol checks

- Deliberate pre-change content assertion -> exit 1 for the expected missing
  047 records.
- Initial `eh status` -> exposed a risk-assessment mismatch; the assessment was
  corrected to the standard lane because this slice retains no sensitive data
  and changes no runtime or operational behavior.
- Two initial content captures failed on an overly specific wording/pattern;
  both criteria were refreshed with exact assertions. The failed captures are
  retained as run artefacts and are not referenced by the final criteria.
- Run 047 content assertions -> pass after the records were written.
- `bun run eh validate .extremely-hardcore/runs/047-operational-acceptance-host-matrix`
  -> pass at the final workspace fingerprint.
- `bun run eh transition .extremely-hardcore/runs/047-operational-acceptance-host-matrix complete`
  -> pass; completion transition recorded.
- `bun run eh attest ...` -> valid attestation.
- `bun run eh ci ...` -> valid CI projection.
- `bun run check` -> pass.
- `bun run test` -> pass; 136 tests, 0 failures, 483 expectations.
- `bunx tsc --noEmit` -> pass.
- `git diff --check` -> pass.

## passing checks

- The aggregate record names the core denominator and keeps supplemental
  dogfood separate.
- Retention and historical validity are reported as different evidence
  classes.
- Provider discovery, metadata, readiness, loading, and adherence boundaries
  remain distinct.
- Run 047 has fresh evidence for every criterion, validates at one final
  fingerprint, and produces a valid attestation and CI projection.
- The EHS repository checks pass with no source/runtime change.

## failing or blocked checks

- Codex model loading is blocked by missing auth in the disposable isolated
  home; no loading claim is made.
- Claude model loading is blocked by an expired OAuth session; no loading claim
  is made.
- Three historical core attestation/CI projection sets are missing.
- Historical records do not provide complete false-block, timing, or
  fresh-agent-readability fields.

## architecture impact

No runtime architecture, protocol schema, provider adapter, dependency,
persistence, integration, sandbox, network, CI, or deployment behavior changed.
The ADR records a documentation boundary decision only.

## public contract impact

Roadmap, dogfood, decision, and provider-onboarding documentation now state the
current evidence and release limits. The `eh` protocol contract, skill files,
plugin manifests, and provider adapter interfaces are unchanged.

## risks left open

- Release could be overstated if historical record-reported validation is read
  as a fresh cross-repository qualification.
- Existing Claude plugin validation warnings may reduce metadata quality.
- A Pi loading pass remains a narrow smoke and does not demonstrate real-task
  adherence.
- No accepted containment boundary exists for writable execution.

## human review needed

Yes. Review whether the missing historical projections and incomplete operating
fields are acceptable, then approve or reject the next release and provider
campaign boundary explicitly.

## final recommendation

needs review
