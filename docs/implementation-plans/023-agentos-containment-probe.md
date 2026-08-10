# implementation plan: AgentOS containment probe assessment

## behaviour to protect

No AgentOS runtime integration enters the project until a supported, proportionate no-agent dependency path exists.

## first failing test

Not applicable. The initial failing import test was removed when dependency inspection held implementation.

## smallest implementation

No implementation. The supported public package resolves bundled agent software and the internal core package is unsupported.

## refactor step

Do not add a workaround, evaluator registry, or shared abstraction while this proposal is held.

## checks to run

- `npm view @rivet-dev/agentos@0.2.15 dependencies peerDependencies engines --json`
- `bun add --exact @rivet-dev/agentos@0.2.15 --verbose` with manifest and lockfile inspection
- `npm view @rivet-dev/agentos-core@0.2.15 description dependencies exports --json`
- `git diff --check`

## rollback plan

No code rollback is required. Remove the held records only if a future supported SDK release makes them misleading.

## notes

The package-boundary failure recommends hold rather than an unsupported core package, direct sidecar protocol, Node workaround, or external sandbox.
