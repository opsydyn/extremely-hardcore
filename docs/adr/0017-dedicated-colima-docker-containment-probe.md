# ADR: use a dedicated Colima/Docker profile for the first local containment probe

## status

accepted

## context

The live Codex action-fixture pilot read `/Users/alancurrie/.codex/memories/MEMORY.md` outside its copied workspace. A provider adapter cannot be treated as isolated until the execution environment is tested directly. AgentOS was held because its supported package graph imports a broad agent runtime. Docker is available through Colima, but the default profile's effective Lima configuration contains a writable home mount.

## decision

Use a fresh named Colima profile with Docker runtime as the first local containment probe. Invoke the probe through an explicit Docker context and apply the following container policy:

- no bind mounts, Docker socket, host network, host PID/IPC, or privileged mode;
- `--network none`;
- read-only root filesystem;
- dedicated `tmpfs` work directories with `nosuid`, `nodev`, and `noexec`;
- non-root UID/GID;
- all capabilities dropped;
- `no-new-privileges`;
- bounded CPU, memory, and PIDs.

The host runner retains raw inspect/config/output artefacts and reports only observed container behaviour. It does not start a model, provider, or agent runtime.

## consequences

- The project gets a reproducible local enforcement probe without a new package dependency.
- The result is useful for the Docker container boundary but does not prove VM escape resistance, daemon security, or provider isolation.
- The default Colima profile remains disqualified for this probe.
- A later agent execution slice must consume this evidence and preserve the same policy rather than bypassing it.

## options considered

- Re-run the Codex pilot with stronger flags: rejected because the existing boundary assumption already failed.
- Add AgentOS: rejected in ADR 0016 because the supported package graph violates the no-model boundary.
- Use Apple Container: deferred because the CLI is not installed locally and the immediate slice needs a runnable local baseline.
- Use Lima plain mode directly: deferred because it does not provide the Docker execution path needed by this probe.
- Use the default Colima profile: rejected because its effective Lima configuration mounts the host home directory writable.

## trade-offs

This is a narrower and more available test than a VM-native or cloud sandbox, but Docker-in-Colima has a layered authority model. The evidence must preserve the effective VM configuration and state the residual risk every time.

## follow-up work

- Decide whether the retained container evidence is sufficient to design a fixture-only execution adapter.
- Evaluate Apple Container or another VM-native environment only under a new decision challenge.
- Do not resume provider execution solely because this probe passes.

## review date

2026-09-10

