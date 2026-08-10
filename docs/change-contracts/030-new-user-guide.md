# change contract: new user guide

## user intent

Give a new user a reliable first-run path for installing, testing, and understanding Extremely Hardcore from a fresh checkout.

## current understanding

The repository is a private Bun package and Codex plugin source tree. The host-facing skills are Markdown under `skills/`. The repository also contains a Bun reference CLI (`eh`), deterministic evaluation commands, a proof-carrying completion demo, and experimental provider adapters. There is no `eh init` command; a run definition is currently created by placing `run.json` under a run directory.

## allowed scope

- Add `docs/user-guide.md` with executable newcomer workflows.
- Link the guide from `README.md`.
- Record this documentation change and its verification in the repository's existing governance document pattern.

## forbidden scope

- Change runtime code, CLI command syntax, protocol schemas, package metadata, or provider adapters.
- Add a new installation mechanism for Codex, Claude, or Pi.
- Claim that deterministic tests prove model capability, sandbox enforcement, network isolation, provider identity, or benchmark performance.
- Rewrite existing roadmap, evaluation, or provider documentation beyond the guide link.

## affected areas

- User-facing documentation.
- Existing Bun scripts and CLI examples, which must be quoted accurately.
- Existing plugin manifest and host-agent skill directories, as installation references only.

## public contracts

No runtime or API contract changes. The guide documents the existing commands `bun run check`, `bun run test`, `bun run evaluate`, `bun run evaluate:full`, `bun run dogfood`, `bun run evaluate:action-fixture`, and the `eh` CLI without changing them.

## assumptions

- A new user has a Git checkout and can install Bun dependencies.
- Provider credentials and provider CLIs are optional for the first-run path.
- A new output directory can be selected for commands that reject an existing output directory.

## risks

- A documented command can drift if it is not checked against the current scripts.
- Host-specific skill installation steps differ by agent environment, so the guide must describe repository-owned paths and manifest files without inventing host commands.
- The repository is currently schema version 1 and experimental; the guide must keep that boundary visible.

## acceptance evidence

- The guide contains a no-model first-run path, an isolated proof demo, a real `eh` run smoke flow, host-agent loading guidance, optional provider paths, and troubleshooting.
- README links to the guide.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass.
- The deterministic evaluator and action-fixture reference command run successfully with a new output directory.

## stop conditions

Stop if the guide requires a new command, a changed public contract, a provider credential, or a host-specific installation detail that cannot be verified from this repository.
