# evidence ledger: dedicated Docker/Colima containment probe

## summary

Implemented and ran the first local no-model, no-network containment probe through a fresh named Colima profile and explicit Docker context. The final pinned-image run passed its declared container-boundary checks. An earlier run was intentionally preserved after the classifier failed closed on Docker 27's actual tmpfs inspect representation; the classifier was corrected and the final run was repeated in a new output directory.

Final evidence bundle: `/tmp/extremely-hardcore-docker-containment-024-final-code/`.

The earlier pinned-image bundle before the final log-retention ordering change remains at `/tmp/extremely-hardcore-docker-containment-024-pinned/`.

Initial failed bundle retained for regression context: `/tmp/extremely-hardcore-docker-containment-024/`.

## changed files

- `ROADMAP.md`
- `issues/024-docker-colima-containment-probe.md`
- `docs/change-contracts/024-docker-colima-containment-probe.md`
- `docs/decision-challenges/024-docker-colima-containment-probe.md`
- `docs/adr/0017-dedicated-colima-docker-containment-probe.md`
- `docs/domain/024-docker-colima-containment-probe.md`
- `docs/reviews/024-docker-colima-containment-probe.md`
- `docs/implementation-plans/024-docker-colima-containment-probe.md`
- `docs/evidence/024-docker-colima-containment-probe.md`
- `evaluation/run-docker-containment-probe.ts`
- `evaluation/containment/Dockerfile`
- `evaluation/containment/probe.ts`
- `scripts/evaluate-docker-containment.ts`
- `tests/evaluation/docker-containment.test.ts`
- `package.json`

## commands run

- `colima start eh-containment --runtime docker --vm-type vz --cpu 2 --memory 4 --disk 20 --mount-type virtiofs`
- `colima list`
- `colima status eh-containment`
- `docker context ls`
- `docker --context colima-eh-containment build --tag extremely-hardcore/containment-probe:0.1.0 evaluation/containment`
- `bun test ./tests/evaluation/docker-containment.test.ts`
- `bunx tsc --noEmit --target ES2022 --module ESNext --moduleResolution Bundler --strict --noUncheckedIndexedAccess --esModuleInterop --skipLibCheck --types node,bun-types evaluation/run-docker-containment-probe.ts evaluation/containment/probe.ts scripts/evaluate-docker-containment.ts tests/evaluation/docker-containment.test.ts`
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- `bun run evaluate:docker-containment -- --output-dir /tmp/extremely-hardcore-docker-containment-024-final-code --profile eh-containment --context colima-eh-containment --image extremely-hardcore/containment-probe:0.1.0 --host-path /Users/alancurrie/.codex/memories/MEMORY.md --lima-config /Users/alancurrie/.colima/_lima/colima-eh-containment/lima.yaml`
- `jq` inspection of the final report and parsed container inspect output.
- `docker context use colima`
- `colima stop eh-containment`

## passing checks

- Final report status: `passed`.
- Image ID: `sha256:5494816aafefbbdf5961878ab3eaaf9f47104432d5dbcbc1832fd29209aea453`.
- Context: `colima-eh-containment`; profile: `eh-containment`; architecture: `aarch64`; runtime: Docker; VM type: VZ.
- Guest absolute host-path read: `blocked`.
- Guest parent traversal read: `blocked`.
- Guest symlink read: `blocked`.
- Guest network fetch: `blocked`.
- Guest Bun: available, `1.3.11`.
- Guest Git: available, `git version 2.47.3`.
- Post-run inspect: `NetworkMode=none`, `ReadonlyRootfs=true`, `User=10001:10001`, `WorkingDir=/workspace`, `Privileged=false`, `CapDrop=[ALL]`, `SecurityOpt=[no-new-privileges=true]`, `PidsLimit=128`, `Memory=536870912`, `NanoCpus=1000000000`, exact requested `HostConfig.Tmpfs`, `Binds=null`, top-level `Mounts=[]`, and `Networks={none:...}`.
- Container output, stderr, command results, pre/post inspect, image inspect, profile status, and effective Lima YAML are retained in the final bundle.
- Focused containment tests: 6 passed, 0 failed.
- `bun run check` passed.
- `bun run test` passed: 105 tests, 0 failures.
- `bunx tsc --noEmit` passed.
- `git diff --check` passed.
- The temporary `eh-containment` profile was stopped and the pre-existing `colima` Docker context was restored.

## failing checks

- The initial live run failed classification because the implementation expected tmpfs entries in top-level `Mounts`; Docker 27 reports them under `HostConfig.Tmpfs`. The raw failed run was retained, the classifier was corrected, and the pinned final run passed.
- No final probe assertion failed.

## architecture impact

The slice adds a local evaluation boundary and no runtime dependency. It does not modify the existing fixture protocol, Codex adapter, provider contracts, persistence, CI, or deployment. The probe uses a purpose-built image and a host runner that invokes Docker with argument arrays rather than a shell.

## public contract impact

Adds `bun run evaluate:docker-containment` with required explicit `--output-dir`, `--profile`, `--context`, `--image`, `--host-path`, and `--lima-config` arguments. The command starts no VM, model, provider, or agent runtime and rejects an existing output directory.

## risks left open

- Effective Lima configuration contains a writable `~` mount and Docker socket/port-forwarding rules at the VM boundary. The probe did not claim VM-level host isolation.
- Docker daemon, VZ VM, kernel, image-build supply chain, and escape resistance were not tested.
- Image preparation used network access; guest execution used `--network none` and was tested separately.
- `docker logs` retained the guest report; trusted `docker cp` transfer for future fixture inputs/outputs remains a separate slice.
- The evidence does not justify resuming Codex/provider execution.

## human review needed

Yes. Decide whether this container-boundary evidence is sufficient to design the first fixture-only runner, or whether a VM-native runtime must be evaluated before any external agent execution resumes.

## final recommendation

needs follow-up
