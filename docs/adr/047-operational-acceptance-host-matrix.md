# adr: record operational acceptance boundaries before release

## status

accepted

## context

The ten-run real operator campaign is recorded, and Runs 11 and 12 provide
targeted supplemental dogfood. The roadmap still needs an aggregate operational
review and a current-version host-loading matrix before release or provider
expansion can be considered.

The records are useful but not uniform. All referenced run, evidence, and log
paths remain present in the current audit, while the first three campaign
attestation/CI projection paths are absent. Only a subset of records explicitly
reports false blocks, timings, or fresh-agent readability. Current host checks
also have different evidence boundaries: Codex discovery succeeds in an
isolated home but its model smoke lacks auth, Claude metadata validates but its
model smoke lacks a live OAuth session, and Pi has a narrow explicit loading
pass.

## decision

Record operational acceptance as a documentation and evidence review. Keep the
core ten-run denominator separate from targeted supplemental dogfood, report
only fields that the retained records explicitly support, and keep release and
provider expansion open where retention, host loading, adherence, or
containment evidence is incomplete.

Treat package discovery, skill loading, and engineering adherence as separate
host claims. Do not add a metric collector, normalize old records in place, or
turn transient provider output into a repository artifact.

## consequences

- Reviewers get one place to see campaign coverage, retention gaps, friction
  categories, and current host states.
- The aggregate can report 65/65 documented core criteria without presenting it
  as a benchmark, false-block rate, or adherence result.
- Missing attestations and inconsistent fields remain visible instead of being
  silently reconstructed.
- Pi loading is verified for the current version and explicit path; Codex and
  Claude remain pending until an authorized model smoke succeeds.
- Release remains a human-reviewed decision, and writable execution remains
  separately gated.

## options considered

- Declare the ten-run campaign sufficient for release: rejected because
  retention, timing, current host loading, adherence, and containment gates are
  not all satisfied.
- Re-run every historical provider or target task: rejected because it would
  mix operational review with a new benchmark or provider campaign.
- Add a metrics schema and migrate all old records: rejected because it adds
  machinery before the evidence gap and product decision are understood.
- Aggregate existing records, refresh safe host checks, and preserve gaps:
  accepted as the least powerful complete review.

## trade-offs

The review produces a defensible status boundary rather than a single headline
score. It requires future records to improve their field consistency before
stronger rates can be claimed. It also leaves two provider loading checks
pending, which is slower than treating metadata or process startup as proof.

## follow-up work

Define the minimum future dogfood record fields for friction, false blocks,
operator timing, and fresh-session resume, then run one authorized fresh-session
resume check before considering release.

## review date

2026-10-03
