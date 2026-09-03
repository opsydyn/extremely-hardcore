# Dogfood decision: proof-carrying completion gate

## sample

| Run | Change type | Outcome | Key result |
| --- | --- | --- | --- |
| 1 | Feature | Complete | Captured evidence and appended the first completion transition. |
| 2 | Bug fix | Complete | Missing evidence records became structured validation failures. |
| 3 | Refactor | Complete | Shared test infrastructure completed with no runtime change. |
| 4 | Stale verification | Complete after refresh | The gate rejected three stale proofs after a real workspace change. |
| 5 | High-risk blocker | Abandoned | The gate rejected an unapproved schema-stability declaration. |

## observed value

- Completion claims are mechanically tied to exact commands, logs, and workspace fingerprints.
- Missing persisted artefacts and stale proof are classified clearly enough for a fresh agent to act.
- An open blocker stops completion even when the agent can edit local files.

## Historical limits at the initial five-run decision

- At the initial five-run snapshot, all completed runs were self-hosted in this repository; cross-agent and cross-repository reliability was still unmeasured.
- Evidence capture and refresh add operational friction that has not been timed rigorously.
- V1 lacks human approval and abandonment events, so high-risk governance remains partly documentary.
- Malformed record content and non-ENOENT filesystem failures remain unclassified.

These limits describe the state when the first five-run decision was made. The
later lifecycle and external dogfood records supersede the first three bullets
as current status; they remain here to preserve the historical decision.

## Initial decision

Proceed to Milestone 2, the behavioural evaluation harness, while keeping schema version 1 explicitly experimental. Do not declare schema compatibility stable, add CI attestation, or build a broader lifecycle FSM until pressure scenarios show that the completion gate improves behaviour across agents and repositories.

## first evaluation requirement

The evaluation harness must include at least one scenario for each observed gate behaviour: uncovered criteria, failed commands, stale evidence, missing evidence record, missing log, open blocker, and attempted completion from an already complete run.

## Current campaign state

As of 2026-09-03, the ten-run real operator campaign is complete. Records 033
through 042 cover four EHS-repository changes and six external-repository
changes. The aggregate review in [Run 047](047-operational-acceptance-host-matrix.md)
reports 65/65 documented acceptance criteria covered and finds all referenced
run, evidence, and log paths present. Only 7/10 core attestation/CI projection
sets remain available: the 033 through 035 projection paths are missing.

Run 052 audited that gap. Runs 033 through 035 still retain their source run
definitions, linked evidence, logs, and completion transitions, but the six
documented original external attestation and CI projection targets are absent.
Current `eh status` reports stale invalid evidence for all three, and current
`eh ci` attempts write invalid projections tied to today's workspace. Those
outputs cannot recover the original proof and were not used as replacements.

The records explicitly report seven zero false-block outcomes and one corrected
setup classifier mismatch; two core records omit a false-block field. Four
core records explicitly report fresh-agent readability, while later records do
not use a common field. The review therefore does not claim a false-block rate,
fresh-agent-readability rate, or measured standard-lane overhead.

Current host checks are also separated by claim: Codex local discovery/install
passes but its disposable model smoke lacks auth, Claude metadata validation
passes with existing warnings but its model smoke lacks a live OAuth session,
and Pi passes the explicit session-local loading smoke on `0.84.1`.

This remains operational evidence, not a benchmark or release decision. Release
and provider expansion remain open pending human review of retention and
measurement gaps, current Codex/Claude loading evidence, engineering
adherence, and accepted containment. Provider comparison and writable execution
remain separately gated.

Run 048 adds the minimum future-record template and one narrow Pi fresh-session
check. Pi interpreted a supplied durable `eh status` snapshot under a
no-tools/no-session/no-context-files boundary and emitted the expected marker.
That is not file-reading resume evidence. Timing remains not measured, and
stronger resume, provider loading, containment, adherence, and release claims
remain open.

Runs 049 and 050 apply the template to two real documentation changes: making
the record workflow discoverable in the user guide and documenting the
provider-neutral fresh-session handoff boundary. Both records remain short and
needed no new schema, command, or protocol machinery. This is a qualitative
field-burden observation only; timing, omission rates, productivity effect, and
file-reading resume remain unmeasured or unproved.

## Historical projection retention audit (2026-09-03)

The approved retention audit confirms a historical projection gap rather than
closing it. The source records for Runs 033 through 035 are present, while the
original attestation and CI projections are not. Because later workspace
changes make their evidence stale, a current `eh ci` result cannot be called a
recovered historical projection.

The project will not backfill or relabel those outputs. The future dogfood
template now requires an operator to say `not retained` when an ephemeral
projection is gone and to keep current revalidation separate. This is a
documentation boundary, not a new schema or retention service. Whether the
confirmed gap is acceptable for release remains a human decision.

## Current provider loading and measurement (2026-09-03)

Run 055 refreshed the current host boundary without changing provider or EHS
runtime behaviour:

- Codex CLI `0.147.0` is installed and responsive, but the current default
  `codex plugin list` does not list the local EHS plugin. Its bounded
  15-second read-only smoke timed out before a trustworthy marker, so loading
  is unverified until the user installs EHS in that configuration and retries.
- Claude Code `2.1.251` validates the plugin and marketplace metadata; plugin
  validation reports seven existing agent-frontmatter warnings and marketplace
  validation exits cleanly. Its read-only model smoke did not reach a
  trustworthy marker because the current authentication state blocked the
  attempt; loading remains unverified.
- Pi `0.84.1` remains verified only for its explicit session-local loading
  smoke, as recorded previously.

The fixed `bun run eh status`/`bun run eh summary` path was repeated three
times. The observed command wall-time medians were 46.33 ms for `status` and
46.33 ms for `summary`; all `status` invocations exited 0 and all `summary`
invocations exited 1 because the run was incomplete during the probe. This is
descriptive local command timing, not active operator time, productivity,
adherence, provider comparison, or a performance threshold.

This refresh does not clear release. Current Codex/Claude loading, engineering
adherence, accepted containment, durable retention implementation, provider
comparison, writable execution, and file-reading resume remain separate gates.

## Retention policy decision (2026-09-03)

Human review approved the following retention policy for release planning:

- Accept the missing attestation and CI projections for Runs 033 through 035
  as a documented limitation of the existing campaign. Do not backfill or
  relabel current outputs.
- Require future release evidence to retain the attestation and CI projection
  at a durable, reviewable location tied to the run and workspace fingerprint.
  `/tmp` alone does not satisfy this requirement.
- Treat this as a forward-looking documentation policy, not an implementation
  of an archive, persistence service, or CI integration.
- This decision does not approve release, writable execution, provider
  comparison, file-reading resume, or self-evolving skill adoption. Current
  Codex/Claude loading, measurement, adherence, containment, and the durable
  retention implementation remain open.

## Human review decision (2026-09-03)

Human review approved the following bounded decision:

- Keep the future dogfood template as a lightweight recommended Markdown
  convention. Do not add a second schema, CLI command, or mandatory ceremony.
- Accept Runs 049 and 050 as qualitative field-burden evidence only. Timing,
  omission rates, and productivity effect remain unmeasured.
- Defer file-reading resume. Any future proposal must define its security,
  provenance, host, and operational boundaries and pass a separate decision
  challenge before implementation.
- Accept the historical retention gap as a documented limitation without
  backfill; require durable projections for future release evidence. The
  retention implementation remains open.
- Keep current Codex/Claude model loading, measurement, adherence,
  containment, provider comparison, and release as open gates.

This approval records the documentation convention; it is not release approval
and does not authorize provider execution or writable resume.
