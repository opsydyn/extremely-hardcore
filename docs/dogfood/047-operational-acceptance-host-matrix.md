# Operational acceptance review 047: ten-run evidence and host matrix

## purpose

This review continues EHS dogfood after the core ten-run campaign. It
consolidates what the retained records can support, refreshes the current
Codex, Claude Code, and Pi host boundary, and keeps the release decision
separate from provider or adherence claims.

Run 047 is an operational review, not campaign case 13. Runs 1 through 10
remain the core denominator. Runs 11 and 12 are targeted supplemental dogfood
and are reported separately.

## review boundary

- Core records: `docs/dogfood/033` through `042`.
- Supplemental records: `docs/dogfood/045` and `046`.
- EHS protocol run: `.extremely-hardcore/runs/047-operational-acceptance-host-matrix/`.
- No provider credentials, raw model output, writable execution, or network
  isolation claim was added.

## aggregate result

| Measure | Core ten-run result | Evidence class |
| --- | --- | --- |
| Records | 10 records: 4 EHS-repository and 6 external-repository changes | Host-audited paths plus record-reported history |
| Documented acceptance coverage | 65/65 criteria reported covered | Historical run records; not a fresh target rerun |
| Run directories | 10/10 present | Host-captured path audit |
| Criterion-linked evidence and logs | 10/10 records have all referenced files present | Host-captured path/existence audit, not a fresh integrity attestation |
| Attestation and CI projections | 7/10 projection sets present; 033 through 035 are missing | Host-captured path audit |
| Final protocol validation | 10/10 records report valid final validation | Record-reported historical result |
| False-block field | 7 records explicitly report 0; 1 reports 1 corrected setup classifier mismatch; 2 omit the field | Record-reported; no defensible rate |
| Fresh-agent readability | 4 records explicitly report `Good`; 6 lack a common field | Record-reported qualitative evidence |
| Standard-lane setup/review overhead | Not consistently instrumented | Evidence gap |

The 65/65 figure is a coverage statement about the retained run definitions
and their reported outcomes. It is not a benchmark, a provider comparison, an
adherence rate, or proof that every target repository is currently green.

The two supplemental records add 13 documented criteria and both retain their
referenced run/evidence/log paths. Their attestation and CI projection paths
are present, so the all-record projection retention is 9/12. They do not
change the core ten-run denominator.

## friction and false-block findings

The records show useful operational friction, but they use different
vocabulary and do not support one additive severity score.

| Category | Observed records | Finding |
| --- | --- | --- |
| Risk/setup classification | 033, 035, 037 | A risk metadata mismatch, command-quoting correction, and one corrected setup classifier mismatch were caught without a source or protocol bypass |
| Dependency and host setup | 037, 038, 039, 040, 042 | Clean worktrees repeatedly required dependency/cache/tool recovery; isolated setup remains a real operator cost |
| Test/toolchain boundary | 039, 040, 046 | Existing Vanilla Extract setup failure, non-TTY Moon invocation, formatter scope, Moon resolution, and target toolchain failures were recorded instead of reclassified as passes |
| Implementation feedback | 037, 040 | A too-narrow first guard and Effect lint failures produced actionable red feedback before the final local shape |
| Evidence lifecycle | 042, 046 | Post-commit evidence became stale as expected; one integrity command needed refresh after a full-versus-short hash mismatch |
| Review mechanics | 047 | The validator caught an initially over-conservative risk assessment, and two content assertions were refreshed after wording/pattern mismatches; no gate or protocol bypass was used |

The only explicitly named false block is the Run 5 setup classifier mismatch,
which was corrected before completion. The other records that state `0` are
not enough to establish a campaign-wide rate because Runs 9 and 10 do not
provide the field. Absence is recorded as a gap, not inferred as zero.

## evidence quality and operator experience

The current audit gives two different answers:

- **Retention:** run definitions, criterion-linked evidence, and logs are
  available for all twelve records; 033 through 035 no longer have their
  external attestation/CI projections.
- **Validity:** each core record reports a valid final protocol result, but
  those historical claims are not being recomputed against every target in
  this review. The new Run 047 protocol result applies only to this aggregate
  documentation change.

Runs 033 through 036 explicitly describe fresh-agent readability as `Good`.
The later core records contain useful status, limitations, and next-action
text but do not carry a common readability field or a fresh-session timing
measure. The roadmap threshold for standard-lane overhead is therefore still
unproved.

## current host matrix

The host commands were run on 2026-09-03. Raw provider output was not retained.

| Host | Version | Discovery/readiness | Loading result | Claim supported |
| --- | --- | --- | --- | --- |
| Codex CLI | `0.147.0` | Local marketplace add and plugin install passed in a disposable isolated `CODEX_HOME`; `codex plugin list` showed `installed, enabled` `0.0.1` | Read-only model smoke exited `1` with `401 Unauthorized` because the disposable home had no bearer auth | Package discovery verified; model loading pending |
| Claude Code | `2.1.251` | Plugin file and local marketplace validation exited `0`; validation reported seven existing agent-frontmatter warnings | Read-only model smoke exited `1`: OAuth session expired and could not refresh | Metadata verified with warnings; model loading pending |
| Pi | `0.84.1` | `pi auth check --model openai-codex/gpt-5.3-codex-spark --json --no-refresh` reported `status=ready` | Explicit `--skill` smoke returned the exact `EHS_SMOKE provider=pi loaded=yes first_step=change-contract trivial=skip-full-loop` marker | Session-local loading verified |

This matrix distinguishes package discovery, skill loading, and engineering
adherence. It does not establish host sandbox enforcement, provider identity,
model quality, broad EHS adherence, or a provider comparison. The Codex and
Claude blocked smokes are environment/authentication boundaries, not loading
passes.

## release decision

**Review result:** complete as an evidence record.

**Release recommendation:** needs review. Keep release held.

The following gates remain open:

- human acceptance of the missing historical attestation/CI projections and
  inconsistent campaign fields;
- current Codex and Claude model-loading evidence in an authorized environment;
- fresh-session resume/readability evidence and standardized operator timing;
- engineering-adherence evidence across hosts;
- an accepted containment boundary before any writable provider execution.

## retained outputs

- Protocol run: `.extremely-hardcore/runs/047-operational-acceptance-host-matrix/`.
- Governance records: the matching files under `docs/change-contracts/`,
  `docs/decision-challenges/`, `docs/domain/`, `docs/adr/`,
  `docs/implementation-plans/`, and `docs/reviews/`.
- Evidence ledger: `docs/evidence/047-operational-acceptance-host-matrix.md`.

## limitations

- Historical target tests, commits, attestations, and CI projections are not
  re-run by this review.
- The aggregate is not a statistical sample and has no baseline comparison.
- The false-block and fresh-agent-readability fields cannot be backfilled
  without changing the meaning of the historical records.
- A passing local metadata or loading check does not prove arbitrary host
  configuration, provider adherence, containment, or publication.

## next

Define the minimum fields for future dogfood records: friction category,
false-block outcome, setup time, review time, fresh-session resume result, and
evidence-retention status. Then run one authorized fresh-session resume check.
Do not expand provider execution or claim release readiness before that review.
