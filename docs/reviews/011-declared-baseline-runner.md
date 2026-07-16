# bounded-context review: declared baseline runner

## proposed change

Add an evaluation-core baseline assessor plus a thin CLI that reads one declared baseline JSON file and prints one aggregate report.

## affected contexts

- Evaluation core: validates complete agent-attempt coverage and assesses attempts.
- Delivery CLI: reads JSON and maps invalid input to non-zero exit status.
- External harness: produces the declaration and attempts; it remains outside this repository's trust boundary.
- Protocol: unchanged.

## allowed dependencies

`scripts/evaluate-baseline.ts -> evaluation/run-declared-baseline.ts -> evaluation manifest and assessor`. Protocol must not import any evaluation or delivery module.

## suspicious dependencies

Provider SDKs, HTTP clients, environment credentials, transcript stores, database access, or protocol mutation.

## data ownership

The input file belongs to the caller. The report is emitted to stdout only. This slice persists no baseline result.

## transaction boundaries

Validation and assessment are pure. The CLI has one read boundary and one stdout write boundary.

## integration events

None. A later adapter may generate input compatible with this contract.

## anti-corruption needs

The `kind: "without-extremely-hardcore"` marker is explicitly a declaration, preventing delivery code from presenting it as verified provenance.

## verdict

safe with noted risk. The new CLI is an experimental public contract; strict structural validation and explicit self-report limitations contain the risk.
