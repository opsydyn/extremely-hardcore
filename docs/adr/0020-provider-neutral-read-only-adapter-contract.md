# ADR: provider-neutral read-only adapter contract

## status

accepted

## context

The evaluation corpus has a pure `AgentAttempt` assessor and Codex-specific leaf adapters. The roadmap now needs a reusable boundary for future Claude, Pi, and other runtimes. A generic process wrapper would incorrectly assume common flags, sessions, transcript formats, resume behaviour, or sandbox semantics.

## decision

Add an experimental schema-version-1 provider-neutral read-only adapter contract under `evaluation/`.

The shared contract contains:

- Adapter identity and runtime version metadata.
- Capability descriptors with evidence levels: `unknown`, `unsupported`, `declared`, `observed`, `attested`.
- A read-only request containing scenario ID, pressure text, workspace, and output root, but no expected answer.
- An attempt result containing one provider-neutral `AgentAttempt` and opaque retained artefact digests.
- A runner-owned report containing assessments from `assessAgentAttempt`, capability metadata, and artifact provenance status.

The runner is the only scorer. It validates scenario coverage, rejects duplicate/unknown attempts, verifies artefact paths remain regular files below the output root, and rechecks digest/byte-count integrity. It does not parse provider artefacts or infer sandbox, network, identity, command ownership, or provider compliance.

Provider-specific adapters remain leaf implementations responsible for executable invocation, prompt construction, session management, output parsing, runtime metadata, and raw artefact capture. Writable execution, resume, and containment are separate contracts requiring their own ADR and decision challenge.

## consequences

- Future adapters can share report and scoring mechanics without changing `protocol/` or the scenario assessor.
- Capability metadata has an explicit claim level and cannot silently become a boolean support claim.
- The fake adapter tests prove only runner mechanics; no provider capability is established.
- The contract is intentionally small and may require provider-specific companion contracts later.
- The local report is an experimental public surface and is not a benchmark or attestation.

## options considered

### Generic executable wrapper

Rejected because command flags, sessions, output, and sandbox semantics are not portable.

### Provider-specific adapters with no shared runner

Rejected because scoring, artefact integrity, and coverage checks would drift across providers.

### Shared read-only contract with leaf adapters

Accepted because it shares only stable evaluation concerns and leaves runtime semantics at the boundary.

## review date

Before implementing the first live Claude or Pi adapter, or before adding writable/resume capabilities.
