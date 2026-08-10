# decision challenge: dedicated Docker/Colima containment probe

## trigger

The proposal introduces a local external execution boundary after a provider pilot failed to establish read isolation. It changes the evidence and sandbox boundary, even though it does not execute an agent or add a runtime dependency.

## proposal and claims

Use a fresh named Colima profile with Docker runtime and an explicit context. Run a purpose-built probe container with no mounts, `--network none`, read-only root, tmpfs work directories, non-root execution, dropped capabilities, no-new-privileges, and resource limits. Claim only that the observed container policy blocked the recorded filesystem and network attempts.

## existing-platform ownership

Colima/Lima owns the VM lifecycle and effective VM configuration. Docker owns container policy and inspect output. The image owns only the guest probe. The host runner owns command construction, evidence retention, and classification. This repository owns the contract and the limits of its claims.

## durable differentiated value

The durable value is evidence discipline at an execution boundary: explicit policy, adversarial probes, immutable image identity, raw inspect/config retention, and fail-closed classification. The value is not the existence of another container wrapper.

## strongest counterargument

Docker-in-Colima may provide only apparent container isolation while the VM still exposes host state or the daemon retains excessive authority. A passing probe could therefore create false confidence and delay a real VM-level containment decision.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The container receives the requested hardening policy. | Docker documents the relevant run flags; the implementation will construct them explicitly. | No local inspect result yet. | Raw pre-run and post-run `docker inspect` output. |
| The guest cannot read the selected host path. | The default profile failure makes this a necessary test. | No fresh named-profile run yet. | Exact path, parent traversal, and symlink probe results. |
| Guest network access is denied. | Docker documents the `none` network driver. | No local guest execution yet. | Probe result plus inspect `NetworkMode`. |
| The profile is suitable for the probe. | Colima is installed; the default profile is not suitable. | Fresh profile and effective config are not yet recorded. | Profile status, context identity, and effective Lima YAML. |
| This is production-grade agent isolation. | None. | Docker daemon/VM/kernel escape properties are untested. | Explicitly out of scope; no such claim may be made. |

## minimum credible slice

One deterministic host runner, one minimal guest probe image, focused tests, and one live run whose raw artefacts survive in a new output directory. No agent, model, provider, credential, or cloud dependency.

## stop conditions

- The fresh profile has unexpected explicit host mounts or the context is not the intended profile.
- Any requested policy is absent from inspect output.
- A filesystem or network denial assertion succeeds unexpectedly.
- Evidence is incomplete or the result would require a VM-level claim.

## verdict

proceed

## rationale

The slice is proportionate because it tests a concrete local boundary without importing the held AgentOS graph or invoking a provider. Its acceptance criteria and residual VM risk are explicit, so a passing result can be useful without being mistaken for complete sandbox assurance.

## post-run evidence

The final bundle at `/tmp/extremely-hardcore-docker-containment-024-final-code/` records a passing container-boundary run. Docker inspect shows the requested network, filesystem, user, capability, namespace, credential, tmpfs, and resource policy; the guest blocked absolute, traversal, symlink, and network attempts. The effective Lima YAML still contains Colima's writable home mount and port-forwarding rules, so the VM-level claim remains open and provider execution remains held.
