# issue: Codex action-fixture provenance adapter

## intent

Add a narrow experimental Codex adapter that executes the bounded action fixture in two writable stages and preserves the provider process artefacts beside the fixture-owned ledger.

## accepted scope

- Add an experimental `evaluate:codex-action-fixture` Bun command requiring a model and new output directory.
- Invoke Codex once for each `fix` and `resume` fixture stage with `--sandbox workspace-write`, `--ephemeral`, `--cd`, `--json`, and `--output-last-message`.
- Retain the stage prompt, invocation metadata, raw stdout event stream, stderr, and any final message below the caller-owned output directory.
- Emit digest-linked adapter provenance next to the runner-owned `ActionFixtureResult`.
- Add deterministic injected-executor and CLI tests. No test invokes Codex.

## exclusions

- No automatic command attribution from provider JSON events.
- No change to fixture scoring, protocol schemas, generic `eh` CLI, baseline evaluation, CI policy, or regression threshold.
- No claim of agent identity, provider capability, protocol compliance, network isolation, or sandbox enforcement.
- No live provider invocation as implementation or verification evidence.

## acceptance checks

- The adapter requests exactly two constrained Codex stages and retains raw process artefacts outside the copied fixture workspace.
- The adapter report records the requested model, local Codex version, sandbox selection, fixture result, and SHA-256 digests for retained provider artefacts.
- The bounded fixture runner remains the only scoring authority.
- The adapter rejects an existing output directory and missing required CLI arguments without overwriting files.
- Focused, full, static, and type checks pass without a live provider call.

## stop conditions

- Stop if the adapter must parse or trust provider events to determine fixture pass or fail.
- Stop if provider artefacts cannot remain outside the scored workspace.
- Stop if a no-network, command-ownership, identity, or compliance claim is needed to justify the slice.
- Stop for human review if local Codex invocation requires a new authentication, provider, network, or sandbox contract.
