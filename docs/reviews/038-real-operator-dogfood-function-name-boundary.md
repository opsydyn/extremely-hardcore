# review: real operator dogfood function name boundary

## proposed change

In an isolated `astro-azure-integration` worktree, reject unsafe public `functionName` values before the adapter writes generated Azure Functions output.

## review findings

- No correctness findings in the scoped target diff.
- The red test reproduced the intended gap: empty, dot-segment, separator, and NUL-containing names were accepted or produced raw filesystem failures.
- The final test covers both slash forms, empty and dot segments, NUL, and verifies that `dist/api` is not created.
- The guard runs before path resolution, directory creation, dependency reads, or generated-file writes.
- Existing valid `server` output, routing configuration, package metadata, and the adapter build remain covered by the existing suite.

## risks

- The guard is a path-safety rule, not a complete Azure function-name grammar. A separate platform audit is required before promising broader naming compatibility.
- Consumers relying on nested function names now receive an actionable failure.
- The target commit `560a5d0` is committed and remains isolated in the temporary worktree.

## verdict

safe with noted risk

## follow-up

Keep `560a5d0` isolated until the owner integrates it. Do not widen the naming contract or claim live Azure deployment compatibility from this run.
