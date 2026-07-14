# bounded-context review: shared protocol Git test fixture

## proposed change

Introduce a test-only helper that owns temporary Git workspace initialisation for three protocol test files.

## contexts and dependencies

The helper sits entirely in `tests/protocol/`. Test files depend on it; production code does not. It may use Node standard-library filesystem and child-process APIs already present in the tests.

## ownership and transaction boundary

Each caller owns its temporary path and cleanup. The helper owns only initial Git state: repository creation, identity, tracked fixture file, and initial commit.

## suspicious dependencies

Do not move criterion, evidence, transition, or command fixtures into the helper. Those describe individual test cases and must remain local.

## verdict

safe. The refactor narrows test setup ownership without changing runtime boundaries or public contracts.
