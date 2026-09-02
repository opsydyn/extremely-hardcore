# change contract: provider onboarding and status reconciliation

## user intent

Make the current EHS status truthful and make the first-use path concrete for
Codex, Claude Code, and Pi without turning provider support into an unverified
benchmark claim.

## current understanding

The standalone skills and Bun reference CLI are usable today. The roadmap still
describes the ten-run operator campaign as unfinished. The user guide explains
the local no-model path but leaves host installation deliberately vague. The
repository has a Codex plugin manifest, no Claude plugin metadata, and no
documented Pi loading path. The Pi read-only evaluation adapter deliberately
disables skills, so it is not evidence that Pi loaded EHS.

## allowed scope

- Reconcile roadmap, dogfood index, and decision text with the ten completed
  real operator records.
- Add a concise provider onboarding document and link it from the README and
  user guide.
- Add the minimum local Claude marketplace metadata needed for documented
  checkout-based installation. Preserve the existing Codex manifest and use the
  same local marketplace entry for the installed Codex CLI.
- Document Pi's explicit `--skill` loading path and its boundary.
- Record provider versions, CLI capability observations, smoke results, and
  blocked preflights without retaining credentials or raw private transcripts.
- Add repository governance records for this documentation and packaging slice.

## forbidden scope

- No changes to protocol runtime, schemas, lifecycle, scoring, or provider
  adapters.
- No writable provider execution, sandbox/containment claim, network-isolation
  claim, provider comparison, benchmark, or skills-effect claim.
- No modification of the user's persistent Codex, Claude, or Pi configuration
  as part of repository verification.
- No copying, printing, or committing credentials, raw model reasoning, or raw
  provider transcripts.
- No claim that an installed CLI alone proves EHS was loaded or followed.

## affected areas

- README and first-run user documentation.
- Roadmap and historical dogfood navigation.
- Codex and Claude local plugin metadata.
- Pi explicit skill-loading instructions.
- Provider smoke and evidence records.

## minimum complete change

Update the stale status claims, provide copyable local commands for each host,
add only the local manifests required by those commands, and record one
provider smoke result per host as `pass`, `blocked`, or `not run` with the exact
boundary that determines the status. Preserve the existing no-model and
read-only evaluation boundaries.

## public contracts

- `.claude-plugin/plugin.json` and its local marketplace become the Claude Code
  checkout plugin entry. The installed Codex CLI also accepts this local
  marketplace file and resolves the existing `.codex-plugin/plugin.json`.
- The provider onboarding document defines supported commands and explicitly
  labels unverified capabilities.
- No protocol, CLI, JSON, or evaluation schema contract changes.

## assumptions

- Local checkout installation is the only provider packaging path that can be
  verified without publishing EHS.
- Pi's supported explicit `--skill` flag is sufficient for a session-local
  loading path.
- Provider model calls may be unavailable because credentials or network access
  are host-specific; a blocked smoke is valid evidence of that boundary.

## risks

- Host CLIs may change their plugin metadata or flag semantics after this
  record, so versioned smoke evidence must remain dated.
- A plugin manifest can make discovery possible without proving the model used
  the skill; onboarding must retain an explicit loading smoke.
- The current checkout is private, so marketplace commands are local-development
  commands rather than public installation instructions.

## acceptance evidence

- Claude plugin metadata validates with the installed CLI.
- The existing Codex manifest and local marketplace are accepted by the
  installed CLI in an isolated temporary `CODEX_HOME`.
- Pi's explicit skill smoke returns the expected EHS marker.
- Claude and Codex model-smoke limitations are recorded without being converted
  into passes.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check`
  pass.
- A repository search finds no roadmap statement that the ten real runs are
  still pending.

## stop conditions

Stop if a host command requires changing persistent user configuration,
revealing credentials, modifying runtime/provider adapter code, or making a
support claim that cannot be tied to direct local evidence.
