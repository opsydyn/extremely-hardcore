# implementation plan: dedicated Docker/Colima containment probe

## behaviour to protect

The repository must not resume external agent execution based on an untested copied-workspace assumption. A live probe must report failure when requested Docker policy is missing, evidence is incomplete, or any filesystem/network denial assertion succeeds unexpectedly.

## first failing test

Add focused tests for a pure policy builder and report classifier. The initial test should assert that the generated Docker argument vector contains no mounts or socket, uses `none` networking, read-only root, non-root execution, dropped capabilities, no-new-privileges, tmpfs workspaces, and resource limits. Add failure cases for a missing policy field and a successful forbidden probe.

## smallest implementation

- A typed policy builder and classifier with no Docker dependency.
- A host runner that invokes Docker with argument arrays, captures command results, and writes a new output bundle.
- A guest probe TypeScript file and Dockerfile.
- A CLI requiring explicit output directory, Docker context, image, and host path.

## refactor step

Only after focused tests pass, extract small command/output helpers if they reduce duplication. Do not introduce a general runtime abstraction, provider registry, sandbox interface, persistence layer, or automatic Colima lifecycle manager.

## checks to run

- Focused containment tests.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.
- Fresh named Colima profile status and effective Lima config capture.
- Docker image build/identity capture.
- Live containment probe with raw inspect and guest output retained.

## rollback plan

Remove the new probe files and package script if the runtime cannot satisfy the contract. Do not stop, delete, or modify the existing default Colima profile. Preserve the evidence bundle and decision records for diagnosis.

## notes

The live result is a container-boundary observation only. The next decision must explicitly decide whether that evidence is enough for a fixture-only runner.

