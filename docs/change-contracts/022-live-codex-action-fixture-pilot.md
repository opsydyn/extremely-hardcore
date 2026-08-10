# change contract: live Codex action-fixture pilot

## user intent

After committing the deterministic adapter work, perform the next roadmap slice: one controlled live Codex action-fixture pilot and report only evidence that its retained artefacts and independently scored fixture support.

## current understanding

Commit `b2d584f` contains the immutable fixture-local protocol CLI and experimental two-stage Codex adapter. The adapter requests two writable Codex stages and retains provider prompts, invocation metadata, raw stdout, stderr, and emitted final messages outside the scored workspace. It revalidates artefact containment, regular-file state, symlink ancestry, byte length, and SHA-256 digest before emitting its report. The fixture runner, not the adapter, determines fixture status. Local help documents the requested Codex CLI flags but not no-network enforcement, event completeness, or external-process identity.

## allowed scope

- One preflight check of local Codex availability and login status.
- One live adapter invocation using the repository's documented experimental command, model `gpt-5.6-sol`, and a unique temporary output directory.
- Read-only inspection of the produced report, fixture ledger, and provider-artifact inventory.
- One evidence ledger and roadmap-status update reflecting the actual result.

## forbidden scope

- Code or configuration changes, retries, alternate models, alternate providers, reruns, or benchmark/comparison aggregation.
- Parsing raw provider events as an automatic scoring or command-attribution signal.
- Any claim that the run proves no-network execution, sandbox enforcement, agent identity, command ownership, protocol compliance, skill loading, or provider performance.
- Sharing raw provider artefacts or treating a passing run as a release gate.

## affected areas

- Caller-selected temporary output directory only.
- Operational evidence and, if accurate, roadmap status documentation.

## public contracts

No public contract changes. The existing experimental adapter CLI and report schema are exercised exactly once.

## assumptions

- The locally installed Codex CLI is authenticated and accepts the previously tested requested model.
- A writable sandbox request may still use provider-controlled services; no isolation claim will be made.
- The temporary output directory is suitable for sensitive local artefacts and will not be shared.

## risks

- The provider invocation can consume quota and may fail because of authentication, routing, or tool availability.
- Retained raw artefacts may contain sensitive context.
- A passing fixture only establishes that this run met the fixture's scoring rules and that retained artefacts remain internally consistent; it cannot establish the excluded claims.

## acceptance evidence

- Preflight command results.
- One adapter report showing actual fixture and provenance statuses.
- Read-only checks of the retained artefact inventory and fixture protocol ledger.
- A written evidence ledger that distinguishes observed facts from excluded inferences.

## stop conditions

- Stop after one attempt.
- Stop on any non-passing/invalid condition and do not repair or rerun.
- Stop before publishing or generalising the result beyond this one operational pilot.
