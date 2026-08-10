# bounded-context review: dedicated Docker/Colima containment probe

## proposed change

Add a host-controlled, no-model Docker probe and a minimal guest image, with explicit policy construction and retained runtime evidence.

## affected contexts

- Operator profile/context selection
- Colima/Lima VM lifecycle
- Docker container lifecycle
- Guest probe image
- Repository evaluation and evidence reporting

## allowed dependencies

`operator -> named Colima profile`; `runner -> explicit Docker context`; `runner -> Docker inspect/run`; `runner -> new output directory`; `guest probe -> Bun/Git and local filesystem/network APIs`.

## suspicious dependencies

Host bind mounts, Docker socket access, inherited environment variables, credential discovery, host network/PID/IPC, privileged mode, implicit context selection, shell interpolation, unpinned image identity, and provider/model execution.

## data ownership

Colima/Lima owns effective VM configuration. Docker owns inspect/lifecycle data. The guest owns probe observations. The runner owns the structured report and retained raw artefacts. No existing fixture or provider report is modified.

## transaction boundaries

One run consists of image identity capture, container create/inspect, container execution, post-run inspection, and evidence retention. The output directory is created once and is never overwritten. A failed command stops subsequent execution while preserving prior artefacts.

## integration events

No transport or persistence event is added. Process boundaries are represented as retained command records.

## anti-corruption needs

Keep Docker/Colima vocabulary at the runner boundary. Do not let raw inspect fields or Docker exit semantics silently become a general agent-execution contract. Do not treat guest stdout as provider evidence.

## verdict

safe with noted risk

The change is bounded and read-only with respect to the repository, but Docker-in-Colima remains a layered runtime boundary. The report must state that residual VM risk and fail closed when policy or evidence is incomplete.

