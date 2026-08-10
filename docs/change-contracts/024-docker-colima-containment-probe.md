# change contract: dedicated Docker/Colima containment probe

## user intent

Evaluate a practical local execution environment for future agent work without adding a model, provider, credentials, or a broad agent runtime. The immediate goal is enforcement evidence for filesystem and network policy, not a production sandbox claim.

## current understanding

The live Codex pilot demonstrated that a copied fixture workspace did not prove process-level read isolation. AgentOS was held because its supported package graph crossed the no-model boundary. Docker is installed through Colima, but the default profile is stopped and its effective Lima state exposes a writable host home mount; it must not be used for this probe.

## allowed scope

- Add slice documentation, a Dockerfile/probe fixture, a Bun host runner, focused tests, and one package script.
- Use a newly named Colima profile and explicit Docker context for the live run.
- Use a caller-selected output directory that must not already exist.
- Retain raw runtime and probe artefacts without importing them into the repository.

## forbidden scope

- Model or provider execution, credentials, Codex, AgentOS, Flue, cloud sandboxes, or network-enabled guest actions.
- Host bind mounts, Docker socket mounts, SSH-agent forwarding, privileged mode, host networking, host PID/IPC, capability additions, or default-profile reuse.
- Changes to existing fixture, Codex, protocol, persistence, CI, deployment, or public report schemas.
- Treating a passing container probe as proof of VM escape resistance or provider isolation.

## affected areas

- `evaluation/containment/` owns the guest probe source and image definition.
- `evaluation/run-docker-containment-probe.ts` owns host orchestration and report retention.
- `scripts/evaluate-docker-containment.ts` owns the operator-facing CLI.
- `tests/evaluation/` owns deterministic policy and classification tests.
- `docs/` owns the decision, domain, review, plan, and evidence records.

## public contracts

The new operator command is:

```text
bun run evaluate:docker-containment -- --output-dir <new-dir> --profile <name> --context <docker-context> --image <image> --host-path <absolute-path> --lima-config <absolute-path>
```

The command requires an explicit profile, Docker context, image reference, absolute host path to probe, effective Lima config path, and new output directory. It does not start a VM, authenticate, read credentials, or invoke a model.

## assumptions

- The operator has already started a fresh named Colima profile with Docker runtime and can identify its Docker context.
- Image build/pull preparation is a trusted operator step and is recorded separately from guest execution.
- Docker inspect is an authoritative observation of the requested container configuration, not of the entire VM kernel boundary.

## risks

- Docker-in-Colima has a VM layer and the effective profile configuration may retain a default home mount; this remains a residual risk and must be recorded.
- A probe image can demonstrate selected policy behaviour but cannot prove absence of kernel or daemon vulnerabilities.
- Network denial is tested from the guest only; host-side image preparation may use network and must not be conflated with the probe.

## acceptance evidence

- Focused tests and repository checks pass.
- Fresh-profile and Docker-context identity are recorded.
- Effective Lima configuration and Docker inspect output are retained.
- Image ID, command arguments, stdout/stderr, and a structured report are retained.
- Filesystem, traversal, symlink, and network attempts are all blocked; Bun and Git availability are reported.

## stop conditions

- Any required policy is missing or unverifiable.
- Any host path or guest network attempt succeeds.
- The output directory exists, raw evidence is lost, or the profile/context identity is ambiguous.
- Any request to broaden this into provider execution, cloud execution, or VM-escape assurance.
