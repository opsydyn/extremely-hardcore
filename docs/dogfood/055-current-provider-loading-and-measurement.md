# Real Operator Dogfood Run 055: current provider loading and measurement

## purpose

Refresh the current Codex and Claude onboarding boundary and record a small
standardized measurement of the local EHS receipt commands without claiming
provider quality, adherence, productivity, comparison, or release readiness.

## change

- **Change type:** Provider-boundary and measurement documentation
- **Risk lane:** High
- **Target:** EHS repository
- **Target baseline:** `8daec4c` (`docs: roadmap governed skill evolution and add README art`)
- **Run:** `.extremely-hardcore/runs/055-current-provider-loading-and-measurement/`
- **Scope:** Update current provider observations, record three command-timing
  repetitions, and align the onboarding guide, dogfood records, and roadmap.

## protocol path

1. Defined a high-risk documentation run with sixteen acceptance criteria.
2. Ran the planned red content assertion; it exited 1 because Run 055 had not
   yet been recorded in the public guide or roadmap.
3. Captured current host state: Codex CLI `0.147.0`, Claude Code `2.1.251`,
   and Pi `0.84.1`.
4. Resolved the host binaries explicitly for evidence capture because
   `bun run` prepends the repository's `node_modules/.bin`; this avoids using
   the local AgentOS fixture Claude binary.
5. Classified the current Codex default configuration as `not-loaded` because
   discovery did not list EHS; its bounded 15-second smoke timed out before a
   trustworthy marker. Classified the Claude smoke as authentication-blocked
   after plugin metadata validation passed with seven existing warnings and
   marketplace validation exited cleanly.
6. Repeated `bun run eh status` and `bun run eh summary` three times and
   recorded command wall time and exit state. The summary command exited 1 in
   each repetition because the run was incomplete during the measurement.
7. Updated the public records, captured final evidence at one workspace
   fingerprint, recorded the required approval, completed the run, and
   generated local attestation and CI projections.

## operator timing

| Phase | Started | Finished | Observed interval | Provenance |
| --- | --- | --- | --- | --- |
| Setup and inspection | not measured | not measured | not measured | no human active-time capture in this slice |
| Implementation and verification | not measured | not measured | not measured | command wall-time sample is recorded separately |
| Review and handoff | not measured | not measured | not measured | no human active-time capture in this slice |

The fixed protocol-command sample measured `eh status` at 46.21-51.42 ms with
a 46.33 ms median, and `eh summary` at 46.29-48.77 ms with a 46.33 ms median.
These are host command intervals, not operator effort.

## friction and false blocks

| Category | Observation | Resolution | Bypass used |
| --- | --- | --- | --- |
| Codex configuration | The current default plugin list did not contain the local EHS plugin, and the bounded smoke timed out before a marker. | Recorded `not-loaded` and environment-blocked; left installation to the user-authorized onboarding path. | no |
| Claude authentication | Metadata validation passed, but the model smoke could not reach a trustworthy marker at the current auth boundary. | Recorded an authentication block; no credential or session-state workaround was used. | no |
| Evidence command path | `bun run` prepended the repository's `node_modules/.bin`, which contains a different Claude CLI fixture. | Used the explicitly resolved host binaries for provider evidence. | no |
| Measurement boundary | `eh summary` correctly returned exit 1 while Run 055 was incomplete. | Recorded the exit state as expected for the in-progress probe, not as a repository failure. | no |

- **False-block outcome:** Not measured. The Codex discovery/missing-marker
  result, Claude authentication block, and incomplete-run summary exit are
  expected state classifications, not evidence of a false protocol block.
- **Workarounds:** Output-suppressing Bun classifiers kept provider output out
  of records. No provider configuration, credential, or authentication bypass
  was used.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 16/16 covered |
| Open blockers | 0 |
| Protocol validation | valid at the final workspace fingerprint |
| Final transition | `implemented -> complete` after final evidence and approval |
| Focused and broad checks | `bun run check`, `bun run test`, `bunx tsc --noEmit`, and whitespace checks pass |

## evidence quality

- **Run/evidence/log retention:** The Run 055 directory contains the local run
  state, sixteen criterion-linked evidence records, and bounded logs. The
  protocol directory is ignored local state, consistent with existing runs.
- **Attestation and CI projection retention:** Valid local attestation and CI
  projections were generated under the Run 055 path. They are not a separate
  durable release archive, so the release-retention gate remains incomplete.
- **Host-captured evidence:** Versions, Codex discovery, provider smoke
  classifications, metadata validation, command timings, content assertions,
  repository checks, approval, validation, and final transition.
- **Record-reported evidence:** The concise interpretation of those classified
  observations and the next operator action.
- **Not evidenced:** Engineering adherence, active human time, productivity,
  provider comparison, provider equivalence, containment, writable execution,
  file-reading resume, durable retention implementation, or release readiness.

## fresh-session resume

- **Snapshot source:** Not applicable; this run did not test resume.
- **Host and version:** Codex CLI `0.147.0`; Claude Code `2.1.251`.
- **Session boundary:** Codex used `--ephemeral --sandbox read-only`; Claude
  used `--no-session-persistence --tools ""`; prompts prohibited edits and
  shell commands. No raw session state was retained.
- **Expected action or marker:** The exact provider-specific `EHS_SMOKE` marker
  with `loaded=yes`.
- **Observed action or marker:** Codex timed out before a trustworthy marker;
  Claude reached no trustworthy marker because of authentication state.
- **Claim supported:** The current host's provider loading boundary is known
  and documented without inferring a pass from process success.
- **Not proved:** Fresh-session interpretation, file-reading resume, arbitrary
  workspace continuation, adherence, containment, comparison, or release.

## limitations

The current default Codex configuration still needs the local plugin installed,
and its bounded smoke needs to complete; Claude needs a usable authorized model
session before either provider can produce current `loaded=yes` evidence. The timing sample is descriptive and
small; it does not measure human effort, productivity, or skill effect. The
existing metadata warnings remain open and were not repaired in this slice.

## next

In a user-authorized environment, install EHS in the current Codex
configuration and retry the read-only smoke; restore usable Claude
authentication and retry its smoke. Then design one separately approved
engineering-adherence task. Keep provider comparison, writable execution,
containment, file-reading resume, self-evolving skill adoption, and release
separately gated.
