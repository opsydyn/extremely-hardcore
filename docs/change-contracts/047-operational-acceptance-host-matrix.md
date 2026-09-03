# change contract: operational acceptance and current host matrix

## user intent

Continue EHS dogfood by reviewing the retained ten-run campaign as operating
evidence and refreshing the current-version Codex, Claude Code, and Pi
discovery/loading matrix. Record the release boundary honestly without adding
runtime machinery or claiming provider performance.

## current understanding

- The core campaign is recorded in Runs 1 through 10
  (`docs/dogfood/033` through `042`), with targeted supplemental dogfood in
  Runs 11 and 12 (`045` and `046`).
- A current host audit found all 12 referenced run directories and all
  criterion-linked evidence and log files present. The 033 through 035
  attestation and CI projection paths are absent; the remaining nine records'
  referenced projections are present.
- The core records report 65/65 acceptance criteria covered and valid final
  protocol validation, but these are historical record claims rather than a
  fresh re-execution of every target run.
- Fresh-agent readability and false-block fields are not standardized across
  the campaign. Four core records explicitly report fresh-agent readability;
  Runs 9 and 10 omit a false-block field.
- Current host versions are Codex CLI `0.147.0`, Claude Code `2.1.251`, and
  Pi `0.84.1`. Codex local discovery/install passes in an isolated home;
  Codex model loading is blocked by missing auth in that disposable home.
  Claude metadata validates with existing agent-frontmatter warnings; its
  model smoke is blocked by an expired OAuth session. Pi auth is ready and its
  exact session-local loading marker passes.

## allowed scope

- Aggregate the retained dogfood records and classify coverage, friction,
  false-block reporting, evidence retention, timing, and fresh-agent
  readability.
- Verify the existence of referenced run, evidence, log, attestation, and CI
  paths without rewriting historical records or retaining provider secrets.
- Capture current CLI versions, local Codex discovery/install, Claude metadata
  validation, Pi readiness, and the documented read-only loading boundary.
- Update the dogfood index, dogfood decision, roadmap, and provider onboarding
  guide with observed results and explicit limitations.
- Add the corresponding EHS change contract, decision challenge, domain map,
  ADR, bounded-context review, implementation plan, dogfood record, and
  evidence ledger.
- Run the EHS structural, test, typecheck, whitespace, and protocol checks.

## forbidden scope

- Do not add or change runtime code, provider adapters, protocol schemas, or
  host integrations.
- Do not run writable provider execution, provider comparisons, benchmarks,
  skills-effect experiments, containment probes, or network-isolation claims.
- Do not use or persist credentials, raw provider transcripts, encrypted model
  reasoning, or copied provider session state.
- Do not repair, regenerate, or silently reclassify historical evidence,
  missing attestations, false-block labels, or target-repository failures.
- Do not claim release readiness, broad engineering adherence, sandbox
  enforcement, provider identity, or model quality.
- Do not commit, tag, publish, or change unrelated dirty work.

## affected areas

- EHS dogfood records and aggregate decision.
- Provider onboarding and current host-loading status.
- Product roadmap and V0 release gates.
- EHS governance and protocol evidence records.

## minimum complete change

Produce one reviewable aggregate record for the core ten-run campaign, include
the two targeted supplemental records as explicitly separate evidence, refresh
the current host matrix, state which release gates remain open, and prove that
the changed EHS documentation and protocol run are internally consistent. The
smallest complete change is documentation and evidence only; it does not add a
new metric implementation or normalize old records in place.

## public contracts

- Roadmap and onboarding claims about campaign status, provider loading, and
  release readiness.
- The documented distinction between package discovery, skill loading, and
  engineering adherence.
- The evidence-ledger receipt fields and protocol run criteria remain
  unchanged.

## assumptions

- The current checkout and the retained paths listed by the dogfood records
  are the authority for this operational review.
- A transient provider smoke result may be summarized as host-captured output,
  but its raw output must not become a repository artifact.
- A missing historical attestation is a retention gap, not permission to
  recreate an equivalent claim from prose.
- A provider smoke blocked by auth or network is a blocked environment path,
  not a skill-loading failure.

## risks

- The aggregate cannot produce a defensible false-block rate or full
  fresh-agent-readability rate until future records use consistent fields.
- Missing 033 through 035 attestation and CI projections weaken independent
  replay of the earliest campaign records.
- Claude's existing validation warnings may reduce host metadata quality even
  though validation exits successfully.
- A passing Pi loading smoke is narrow and does not establish adherence on a
  real engineering task.

## acceptance evidence

- A deliberate pre-change content assertion fails because the new aggregate
  records do not exist.
- The aggregate record names the 10-run core denominator, the 65/65 reported
  coverage, retention audit, friction categories, false-block field gaps,
  timing/readability gaps, and release recommendation.
- The provider guide records current versions and separate discovery,
  metadata, readiness, loading, and blocked states for all three hosts.
- The protocol run captures content assertions for the aggregate, matrix, and
  roadmap alignment, plus passing EHS check, test, typecheck, and diff
  evidence; validation and attestation are valid at the final fingerprint.
- No credential or raw provider transcript is added to the repository.

## stop conditions

Stop and record a blocker if the retained records cannot be distinguished from
new evidence, if a provider command requires credential handling beyond a
readiness check, if the aggregate would imply a denominator that the records
cannot support, if the documentation contradicts observed output, or if the
slice requires runtime or public protocol changes.
