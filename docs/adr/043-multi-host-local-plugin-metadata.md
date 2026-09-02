# adr: multi-host local plugin metadata

## status

accepted

## context

EHS is intended to remain a standalone Markdown skill system, but its current
checkout only contains Codex plugin metadata. The user guide therefore cannot
give a concrete checkout-based Claude path, and it has no Pi path. The installed
CLIs expose different local loading boundaries: Codex accepts a local
marketplace source, Claude accepts a session-local plugin directory, and Pi
accepts an explicit skill file or directory.

The repository must distinguish package discovery from model behaviour. A local
plugin manifest can prove that a host can discover the checkout; it cannot prove
that a model used or followed EHS, and none of these metadata files provide
sandbox, network, identity, or containment guarantees.

## decision

Add minimal host-native metadata without changing the EHS runtime:

- `.claude-plugin/plugin.json` describes the same repository root for Claude
  Code, and `.claude-plugin/marketplace.json` exposes a local Claude marketplace
  entry.
- `.codex-plugin/plugin.json` remains the Codex manifest. The installed Codex
  CLI accepts the same local marketplace file for checkout installation.
- Pi remains session-local through its observed `--skill <path>` flag; no Pi
  package or global configuration is added.
- Documentation must show both discovery commands and a harmless loading smoke,
  then state what the smoke does not prove.

## consequences

- Claude and Codex users get copyable local checkout commands.
- The Claude marketplace and plugin metadata become packaging contracts that
  must be updated with the existing `.codex-plugin/plugin.json` version.
- Pi users can load the exact skill source without a separate package format.
- Provider smoke evidence remains separate from deterministic evaluation and
  does not establish provider equivalence, model performance, or isolation.
- Publishing still requires a marketplace or release process outside this
  private checkout.

## options considered

- Keep host installation deliberately vague: rejected because a new user cannot
  reliably reproduce the intended local path.
- Add only documentation: rejected because Claude local discovery requires
  host-native metadata that the checkout does not currently provide.
- Build a shared installer or provider abstraction: rejected because it would
  add runtime and lifecycle machinery to a documentation and packaging slice.
- Copy or transform skills into provider-specific trees: rejected because it
  creates drift and weakens the provider-neutral Markdown source.

## trade-offs

The Claude metadata adds a small amount of packaging duplication, but keeps the
host discovery contract explicit and leaves the skills as one shared source.
The same local marketplace entry is accepted by the installed Codex CLI, which
avoids a second marketplace document. Local marketplace commands modify a
user's host configuration when the user chooses to run them; repository
verification uses isolated temporary configuration where possible. Pi has a
less persistent path until a native package mechanism is justified by user
evidence.

## follow-up work

If EHS is published, add a release checklist that verifies all provider
manifests agree on version, skill inventory, and documented install commands.
Do not add a provider abstraction or writable smoke until a separate containment
decision is accepted.

## review date

2026-09-02
