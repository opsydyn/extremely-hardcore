# bounded-context review: operational acceptance and current host matrix

## proposed change

Aggregate retained EHS dogfood records, refresh safe current host-loading
evidence, and update the roadmap and onboarding documentation. Add no runtime
or provider integration code.

## affected contexts

- EHS dogfood records and aggregate release review.
- Provider onboarding documentation.
- Host-owned authentication and session boundaries, which are observed only.
- EHS roadmap and local protocol evidence.

## allowed dependencies

- Existing Markdown records and the local `eh` CLI.
- Existing Codex, Claude Code, and Pi command-line interfaces for version,
  metadata, discovery, or readiness checks.
- Existing run artefact paths and repository validation commands.

## suspicious dependencies

- Provider session credentials or raw model transcripts.
- New provider adapters, comparison runners, metrics schemas, or orchestration.
- Treating host process startup or metadata validation as engineering
  adherence.
- Rewriting old records to fill missing fields.

## data ownership

EHS owns its dogfood records, roadmap claims, and local protocol artefacts.
Each provider owns its authentication, session, model traffic, and host
configuration. No provider data is imported into EHS beyond a summarized
version or loading status.

## transaction boundaries

There is one local documentation boundary: update the aggregate and status
surfaces, then capture protocol evidence against the final EHS workspace
fingerprint. Provider commands are disposable observations and do not write to
the repository.

## integration events

No runtime events, provider messages, or cross-process integration contracts are
added.

## anti-corruption needs

Keep host capabilities and auth outcomes in the provider guide, historical
change outcomes in `docs/dogfood/`, and release interpretation in `ROADMAP.md`
and `docs/dogfood/decision.md`. Do not let a provider's self-report or a
successful CLI exit erase an explicit blocked boundary.

## verdict

safe with noted risk

## follow-up

Standardize the minimum future dogfood fields only after the human release
review confirms that the current evidence gaps matter. Do not use this review
to justify writable provider execution.
