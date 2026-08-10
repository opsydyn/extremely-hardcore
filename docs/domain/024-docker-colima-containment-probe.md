# domain map: dedicated Docker/Colima containment probe

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Named profile | Fresh Colima VM identity created for this probe. | Operator/Colima |
| Docker context | Explicit client route to the named profile's Docker daemon. | Docker/Colima |
| Policy | Requested container flags and limits. | Host runner |
| Guest probe | No-model process that exercises filesystem, symlink, traversal, network, Bun, and Git behaviour. | Probe image |
| Observation | Raw command output or structured result from the guest/runtime. | Host runner |
| Evidence bundle | Immutable image identity, inspect/config data, command metadata, and probe output. | Host runner |
| Residual VM risk | Unproven behaviour above the Docker container boundary. | Operator decision |

## candidate bounded contexts

- Operator control owns profile creation, context selection, and output destination.
- Colima/Lima owns VM lifecycle and effective mounts.
- Docker owns container configuration, lifecycle, and inspect output.
- The probe image owns guest checks only.
- The repository runner owns report schema, evidence retention, and pass/fail classification.

## aggregates/entities/value objects

- `ContainmentPolicy`: immutable requested flags and limits.
- `ContainerObservation`: inspect and probe outputs for one container.
- `ContainmentReport`: one complete run with status and retained artefact paths.
- `EvidenceBundle`: output directory that must be new and complete.

## commands

- Build or select a known probe image.
- Start a fresh named Colima profile.
- Run the hardened container through an explicit context.
- Retain inspect, effective config, image identity, and probe output.
- Classify the run.

## events

- Profile selected.
- Container created.
- Policy inspected.
- Probe completed.
- Evidence retained.
- Run passed or failed closed.

## policies/rules

- No provider, model, credentials, or agent runtime enters the guest.
- No host path is available through an implicit or explicit container mount.
- Guest networking is disabled.
- Missing or ambiguous evidence is a failure, not an inferred pass.
- A container result cannot be promoted to a VM or provider-isolation claim.

## invariants

- The output directory did not exist before the run.
- The Docker context and image identity are recorded.
- Requested policy matches inspect output.
- Every attack probe has an explicit blocked/succeeded outcome.
- Raw evidence is retained even when classification fails.

## external systems

- Colima and Lima.
- Docker daemon and CLI.
- Local filesystem and Bun runtime.

## integration points

- Operator invokes the Bun CLI with an explicit context, image, host path, and output directory.
- Host runner invokes Docker without a shell and stores command results.
- Guest probe writes structured JSON to stdout; host runner retains it.

## ambiguity

- Docker inspect cannot establish kernel escape resistance or prove that the VM has no host mount.
- Image build preparation may use network and is separate from guest network evidence.
- Guest Git availability depends on the selected image and is reported rather than assumed.

## recommended next questions

Is this container-boundary evidence sufficient to define the first fixture-only runner, or is a VM-native runtime required before any agent execution is resumed?

