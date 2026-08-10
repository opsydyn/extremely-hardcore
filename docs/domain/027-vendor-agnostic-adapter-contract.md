# domain map: vendor-agnostic adapter contract

## domain terms

- Agent adapter: a leaf integration that turns one runtime's execution into provider-neutral attempts and retained artefact references.
- Capability claim: metadata describing the strongest evidence level currently available for one capability.
- Read-only scenario request: provider-neutral scenario identity and pressure text; it deliberately excludes expected answers.
- Provider artefact: opaque adapter-owned prompt, output, event, stderr, or invocation file.
- Attempt assessment: evaluator-owned classification of an `AgentAttempt` against the canonical scenario manifest.
- Provenance status: integrity status of retained artefact references, not identity or command attestation.

## bounded contexts

- Evaluation contract owns request/attempt/report shapes and invokes the assessor.
- Provider leaf adapter owns executable flags, prompts, sessions, parsing, runtime metadata, and artefact capture.
- Scenario manifest owns expected observations and pressure semantics.
- Containment owns filesystem/network enforcement evidence.
- Human review owns capability interpretation and comparison decisions.

## aggregates and value objects

- `AgentAdapter`: identity, capability descriptor, and one read-only execution function.
- `CapabilityDescriptor`: per-capability evidence level and note.
- `ReadOnlyScenarioRequest`: scenario ID, pressure, workspace, and output directory.
- `AdapterAttemptResult`: one provider-neutral attempt plus opaque artefact digests.
- `ProviderNeutralAdapterReport`: assessments, capability claims, and provenance status.

## commands and policies

- The runner asks an adapter for its descriptor and one attempt per agent-attempt scenario.
- The runner passes no expected error code to the adapter.
- The runner invokes `assessAgentAttempt`; adapters cannot choose pass/fail.
- Every referenced artefact must be a regular file under the output root and match its digest and byte count.
- Missing or unknown capability is not support, and declared capability is not enforcement proof.

## invariants

- Protocol and deterministic scenario scoring remain provider-neutral.
- Provider-specific flags and parsing never enter the shared contract.
- A provider-neutral report cannot claim sandbox, network, identity, or command ownership.
- Writable execution requires a separate containment decision and adapter contract.

## ambiguity

The contract does not yet model provider sessions, resume handles, structured event streams, or writable workspaces. Those must be introduced only when a concrete provider requires them and after an adapter-specific decision challenge.

## recommended next question

Which first read-only provider can supply a controlled, reviewable adapter run without requiring the shared contract to absorb provider-specific semantics?
