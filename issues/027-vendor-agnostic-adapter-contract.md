# Vendor-agnostic adapter contract

## intent

Create the first provider-neutral adapter seam so future Claude, Pi, and other runtimes can feed the same evaluation kernel without flattening provider-specific execution semantics.

## scope

- Define a schema-version-1 read-only adapter contract.
- Define capability vocabulary with explicit claim levels.
- Add a shared runner that scores `AgentAttempt` values with the existing assessor.
- Retain opaque provider artefact digests and fail closed on missing or mutated artefacts.
- Add a deterministic fake adapter only in tests.

## exclusions

- Claude, Pi, Codex, or any live provider invocation.
- Provider command construction, session management, prompt policy, or output parsing.
- Writable workspace execution, network access, sandbox enforcement, or containment claims.
- Cross-provider comparison, regression thresholds, or benchmark claims.
- New dependencies, protocol schema changes, or changes to the deterministic scorer.

## acceptance

- A provider-neutral adapter can describe capabilities and execute the 13 read-only agent-attempt scenarios through one shared runner.
- The runner never receives scenario expected answers and uses the existing assessor as the only score authority.
- Reports retain adapter identity, capability claim levels, attempts, assessments, and digest-checked opaque artefacts.
- Missing, duplicate, unknown, outside-root, or mutated artefacts fail closed.
- A fake adapter contract suite passes without invoking an external executable.
- Existing tests and provider-specific adapters remain unchanged in behaviour.

## stop conditions

- A generic contract needs provider flags, transcript parsing, session handles, or sandbox labels.
- Capability levels are treated as proof rather than declared/observed/attested metadata.
- A provider executable or credential becomes necessary to validate the contract.
- The shared runner must change scenario scoring or protocol semantics.
