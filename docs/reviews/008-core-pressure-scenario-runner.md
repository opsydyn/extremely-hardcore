# bounded-context review: core pressure-scenario runner

## proposed change

Add a new evaluation context that depends on protocol public functions to create isolated scenarios and report JSON results.

## allowed dependencies

`scripts/evaluate.ts -> evaluation/ -> protocol/ -> Node standard library`.

Tests may depend on evaluation and Node standard-library APIs. The protocol must not import evaluation, tests, or scripts.

## data and transaction boundary

Each scenario owns a temporary workspace and cleans it up after producing a result. No production run directory, source workspace file, or persistent result file is mutated by default. Transition scenarios may write only inside their temporary run directory.

## suspicious dependencies

Do not import Codex, Claude, browser, database, CI, or test fixtures from the evaluation core. Do not parse CLI text when protocol results are available directly.

## verdict

safe with noted risk. The new context has a clean one-way dependency, but its result schema is an experimental public surface that must stay intentionally small.
