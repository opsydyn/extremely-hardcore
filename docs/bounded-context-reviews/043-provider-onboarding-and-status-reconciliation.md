# bounded-context review: provider onboarding and status reconciliation

## proposed change

Add local Claude plugin metadata and a shared local marketplace entry that the
installed Codex CLI can also consume, document Pi's explicit `--skill` path,
and reconcile roadmap and dogfood status with the completed ten-run campaign.

## affected contexts

- EHS Markdown skill source.
- Codex and Claude host packaging metadata.
- Pi session invocation.
- User-facing onboarding and evaluation documentation.
- Roadmap and dogfood evidence navigation.

## allowed dependencies

- Existing `.codex-plugin/plugin.json` version and `skills/` tree.
- Host-owned CLI commands and their observed help output.
- Existing provider adapter documentation and claim limits.
- Existing dogfood records 033 through 042.
- Temporary host configuration used only for local verification.

## suspicious dependencies

- Importing provider runtime code into `protocol/` or `skills/`.
- Treating `evaluate:pi`, `evaluate:claude`, or `evaluate:codex` as loading
  evidence.
- Writing persistent user configuration during repository verification.
- Reading, copying, or retaining credentials and raw private transcripts.
- Adding a Pi installer or shared provider abstraction without user evidence.

## data ownership

The repository owns skill content, manifests, documentation, and evidence
summaries. Each host owns plugin configuration, credentials, model routing,
session state, and provider output. The repository records only bounded smoke
metadata and redacted outcomes; it does not own provider secrets or transcripts.

## transaction boundaries

There is no repository transaction or persistent runtime state. A user-selected
marketplace installation changes host configuration outside the repository.
Verification uses isolated temporary configuration where the host permits it.
The documentation update itself is reviewed as one repository change.

## integration events

No application integration events, network clients, protocol transitions, or
provider adapter calls are added. The only external interactions are optional
human-invoked host installation commands and the separately recorded Pi smoke.

## anti-corruption needs

Keep host terms such as marketplace, plugin directory, and `--skill` at the
documentation boundary. Do not make EHS skill content depend on a host-specific
CLI flag. Keep provider evaluation reports distinct from loading smoke records.
Keep roadmap status distinct from historical dogfood observations.

## verdict

safe with noted risk

The manifests and documentation stay outside the runtime and preserve the
provider-neutral skill source. The remaining risk is semantic: package discovery
and a one-line loading smoke can still overstate real engineering adherence, so
the matrix must retain explicit pending and unverified states.
