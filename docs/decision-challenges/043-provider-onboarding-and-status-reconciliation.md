# decision challenge: provider onboarding and status reconciliation

## trigger

This slice crosses Codex, Claude Code, and Pi packaging boundaries and changes
the wording of provider support claims. It must distinguish host discovery,
skill loading, and model behaviour.

## proposal and claims

Add local Claude plugin metadata and marketplace entry, use the same local
marketplace entry for the existing Codex plugin manifest, document Pi's explicit
skill flag, and reconcile status documents with the completed ten-run campaign.

The only intended claims are:

- the installed Claude CLI can validate or discover the local checkout metadata;
- the existing Codex manifest and local marketplace are accepted by the
  installed Codex CLI in isolated temporary configuration;
- Pi can be invoked with the repository's skill file and, in the available
  authenticated smoke, returned the expected marker;
- the EHS method and `eh` CLI remain provider-neutral.

No claim is made about provider equivalence, skill adherence across tasks,
sandbox enforcement, network isolation, provider identity, or benchmark
performance.

## existing-platform ownership

Codex, Claude Code, and Pi own their plugin marketplaces, skill discovery,
session flags, credentials, model routing, output formats, and permission
semantics. EHS owns the Markdown method, local protocol, reference CLI, and
claim boundaries.

## durable differentiated value

The durable value is a small engineering method and evidence vocabulary that
can be loaded through each host without coupling the protocol to a provider
runtime. The manifests are distribution glue, not the product differentiator.

## strongest counterargument

Adding manifests may create a false sense of multi-provider support: discovery
can pass while a model ignores the skill, a provider is unauthenticated, or the
host's isolation semantics are weaker than expected. The documentation must
make a blocked or explicit-file smoke visible and avoid a green compatibility
badge based only on metadata validation.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Codex can discover a local EHS plugin | Installed CLI accepted `.claude-plugin/marketplace.json` and installed the root plugin in isolated `CODEX_HOME` | Model-level skill adherence remains unproven | Retain a loading smoke when authenticated network access is available |
| Claude can discover a local EHS plugin | Installed CLI exposes `--plugin-dir` and marketplace commands; the added component validation passes | Model-level loading remains unproven without authentication | Retain a loading smoke when authenticated access is available |
| Pi can load EHS | Installed Pi exposes `--skill`; authenticated smoke returned the exact marker | This is session-local evidence, not persistent installation or broad adherence | Retain command, version, model, and marker without a benchmark claim |
| Model behaviour is proven across providers | No current Claude smoke; Codex model smoke is blocked by local network/sandbox constraints | No matched provider runs | Separate future authenticated, current-version smoke campaign |
| The ten-run campaign is complete | Records 033 through 042 exist, including Run 10 | Aggregate friction and false-block decision is not yet published | Add a current campaign index and decision record |

## minimum credible slice

Ship the manifests, host-specific quickstart, corrected roadmap/dogfood status,
and a smoke matrix that reports `pass` for Pi, `blocked` for unauthenticated or
network-blocked providers, and no inferred provider support.

## stop conditions

- A manifest requires changing protocol or provider adapter code.
- A host cannot validate the local metadata without credentials or a persistent
  configuration mutation.
- A provider smoke requires sending credentials or raw private transcripts.
- Documentation would need to call a provider supported without direct loading
  evidence.

## verdict

proceed

## rationale

The proposed metadata is small, reversible packaging glue and the claims are
deliberately narrower than provider support or benchmark claims. The current
tool evidence is sufficient to document a Pi pass, Codex local installation,
and a Claude validation path, while the roadmap correction is directly
supported by the ten retained dogfood records.
