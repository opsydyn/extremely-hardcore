# review: provider onboarding and status reconciliation

## review findings

- The previous host guidance was too vague for a new Codex or Claude user and
  had no Pi path. `docs/provider-onboarding.md` now gives copyable local
  commands and a fixed loading smoke.
- The three claims are separated: package discovery, skill loading, and
  engineering adherence. A package or smoke pass is not presented as a
  benchmark, containment, or compliance result.
- Claude plugin and marketplace metadata are minimal and validated by the
  installed Claude CLI. The same local marketplace entry is accepted by the
  installed Codex CLI and resolves the existing Codex manifest.
- Pi's explicit `--skill` path passed an authenticated smoke using
  `openai-codex/gpt-5.3-codex-spark`. The existing Pi evaluation adapter remains
  correctly described as separate because it disables skills.
- The roadmap and dogfood index now show ten real operator records as complete,
  while retaining aggregate operational review, current-version provider
  smokes, containment, and release as open gates.

## boundary review

No protocol, schema, lifecycle, scoring, provider-adapter, dependency, or
runtime behavior changed. Host configuration remains host-owned and is changed
only when a user runs the documented installation command. Verification used an
isolated temporary Codex configuration and did not retain credentials or raw
provider transcripts.

## risks

- The current Codex and Claude model loading smokes could not complete in this
  environment, so package discovery must not be promoted to model support.
- Pi loading is session-local and one-prompt evidence; it does not establish
  persistent discovery or broad adherence.
- Plugin metadata is duplicated across host formats and must remain version
  aligned.

## verdict

safe with noted risk

## follow-up

Authenticate Claude and run current-version Codex and Claude loading smokes in
an approved network environment. Then publish the aggregate ten-run dogfood
review before considering provider comparison or writable execution.
