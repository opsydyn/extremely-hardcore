# issue: dedicated Docker/Colima containment probe

## intent

Create the first local, no-model, no-network execution probe after the live Codex action-fixture pilot read outside its copied workspace. The probe must test the effective Docker container policy and retain enough raw evidence to distinguish a container-boundary result from a VM-boundary claim.

## accepted scope

- Add a Bun host runner and a small probe image source.
- Run the probe through a fresh named Colima profile and an explicit Docker context.
- Apply no host bind mounts, no Docker socket, no host network, no privileged mode, a read-only root filesystem, ephemeral tmpfs work directories, a non-root UID, dropped capabilities, no-new-privileges, and resource limits.
- Exercise exact host-path access, parent traversal, symlink access, guest network access, and guest Bun/Git availability.
- Retain Docker inspect output, effective Colima/Lima configuration, image identity, probe output, and command metadata in a new output directory.

## exclusions

- No model, provider, credential, Codex, AgentOS, Flue, cloud sandbox, or external writable-agent execution.
- No default Colima profile reuse as a containment claim.
- No host repository, home directory, Docker socket, SSH agent, or credential mount.
- No `--privileged`, host PID/IPC/network, capability additions, CI, deployment, persistence, or public runtime API.
- No claim that a Docker-in-Colima result proves a malicious VM escape cannot occur.

## acceptance checks

- Focused unit tests cover policy construction, output-directory safety, report parsing, and pass/fail classification.
- The live probe uses an explicit fresh named Colima profile and explicit Docker context.
- Raw pre-run and post-run `docker inspect` output, effective Lima configuration, Docker/image identity, and probe output are retained.
- The probe passes only when every filesystem and network attempt is blocked and the requested policy is visible in inspect output.
- Any unexpected mount, socket, privilege, network, or host-path access fails closed and is reported.

## observed outcome

The first live run blocked all guest filesystem and network attempts but exposed a classifier defect: Docker 27 records tmpfs policy under `HostConfig.Tmpfs` and reports no top-level mounts. That run was retained at `/tmp/extremely-hardcore-docker-containment-024`. After correcting the classifier and pinning the base image digest, the final run passed at `/tmp/extremely-hardcore-docker-containment-024-pinned`.

The effective Lima configuration still contains Colima's writable home mount and host port-forwarding rules. The result is therefore container-boundary evidence only, not VM or provider isolation evidence. The post-edit final bundle is `/tmp/extremely-hardcore-docker-containment-024-final-code`.

## stop conditions

- Stop if the named profile cannot be shown to be fresh or its effective configuration contains an unexpected explicit host mount.
- Stop if Docker cannot expose the requested policy through inspect output.
- Stop if the image is not identified by an immutable local image ID.
- Stop if any blocked-access assertion succeeds or if raw evidence cannot be retained.
