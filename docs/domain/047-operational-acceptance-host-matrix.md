# domain map: operational acceptance and current host matrix

## domain terms

- **core campaign:** the ten real operator records numbered 1 through 10.
- **targeted supplemental dogfood:** Runs 11 and 12, which exercise the
  optional `simple-made-easy` lens and are not part of the core denominator.
- **operational acceptance:** the review of whether the recorded workflow is
  understandable, proportionate, and supported by retained evidence.
- **evidence retention:** whether referenced run, evidence, log, attestation,
  and CI projection paths remain available for inspection.
- **false block:** a protocol or operator stop that should not have prevented
  the intended next action. A reported zero is not inferred when the field is
  absent.
- **fresh-agent readability:** explicit evidence that a new session can find
  state, blockers, and the next legal action without conversation history.
- **package discovery:** a host can find the EHS checkout and metadata.
- **skill loading:** a model answers the harmless EHS smoke from loaded
  instructions.
- **engineering adherence:** a host follows EHS on a real engineering task;
  this remains unmeasured by the loading smoke.
- **release gate:** a documented condition that must be satisfied before a
  public release recommendation can change.

## candidate bounded contexts

- EHS dogfood record and aggregate review.
- EHS provider onboarding and host capability matrix.
- Host-owned authentication, provider traffic, and session lifecycle.
- EHS roadmap and release decision boundary.

## aggregates/entities/value objects

- A campaign record identifies one real change, its target, protocol run, and
  limitations.
- An evidence-retention audit is a value object containing path existence
  results, not a validity attestation.
- A host matrix row contains host version, discovery evidence, loading evidence,
  and an explicit blocked or unverified state.
- A release recommendation is a value object constrained by observed evidence
  and open gates.

## commands

- Enumerate retained campaign records.
- Audit referenced protocol and projection paths.
- Classify recorded friction and missing fields.
- Capture current host versions and safe discovery/readiness checks.
- Update the aggregate decision and release gate status.

## events

No runtime events or protocol transitions are introduced. The EHS protocol run
records evidence for this documentation change only.

## policies/rules

- Keep the ten-run campaign denominator separate from targeted supplemental
  dogfood.
- Count only explicit fields; absence is a gap, not zero.
- Treat run-directory/evidence/log presence separately from attestation/CI
  projection retention and separately from current validation.
- Treat package discovery, skill loading, and engineering adherence as
  different claims.
- Summarize provider smoke output without retaining raw transcripts or secrets.
- Do not change release status from open while direct loading, retention, or
  containment gates remain unresolved.

## invariants

- Aggregate counts name their denominator and provenance.
- A blocked provider smoke cannot become a loading pass through prose.
- A valid historical record cannot be presented as fresh current execution.
- No host credential or raw provider output is stored in EHS.
- EHS remains standalone; hosts remain responsible for execution mechanics.

## external systems

- Codex CLI local marketplace and plugin cache.
- Claude Code plugin validator and disposable plugin directory loading path.
- Pi auth and explicit session-local skill loading path.

## integration points

- `docs/dogfood/` records historical change evidence and this aggregate review.
- `docs/provider-onboarding.md` describes host-specific discovery and loading.
- `ROADMAP.md` projects the evidence into milestone and release status.
- The local `eh` CLI captures evidence for this EHS documentation change.

## ambiguity

The existing records do not share one schema for friction, false blocks,
operator time, or fresh-agent readability. The review can classify what is
explicitly present but cannot retroactively recover missing denominators. It
also cannot decide whether the retained-projection gap is acceptable for a
release; that remains a human decision.

## recommended next questions

- Is the missing 033 through 035 attestation/CI projection retention acceptable,
  or should future campaign records require those projections before counting
  as independently auditable?
- Which minimum fields should every future dogfood record carry for friction,
  false blocks, setup time, review time, and fresh-session resume?
- What authorized environment will provide current Codex and Claude loading
  evidence without retaining credentials or transcripts?
