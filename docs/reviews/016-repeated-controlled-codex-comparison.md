# bounded-context review: repeated controlled Codex comparison

## proposed change

Operate the existing adapter six times against two temporary clones, then add a redacted descriptive comparison record without changing source or adapter contracts.

## affected contexts

- Evaluation operator: clone preparation, ordering, and raw artifact custody.
- Codex adapter: six independent existing process executions.
- Evaluation core: unchanged scenario and strict assessment consumption.
- Repository documentation and protocol: redacted operational evidence only.

## allowed dependencies

Temporary clone -> existing evaluation CLI -> temporary artifacts. Documentation may consume aggregate report data, integrity checks, and redaction review outcomes.

## suspicious dependencies

Changing prompts or scenarios between modes, parallelizing runs into shared output paths, copying raw responses into Git, parsing provider logs as verified routing, or changing source to improve results.

## data ownership

Temporary clones and raw artifacts belong to the evaluation operator. The repository owns contracts, report summary, and protocol evidence only.

## transaction boundaries

Each adapter run is independently complete or failed. A comparison is recorded only after all six reports validate; no failed run is silently retried.

## integration events

Six existing local Codex CLI executions, each issuing 13 remote provider requests under existing adapter control.

## anti-corruption needs

Keep declared mode and requested model clearly labelled as operator configuration; do not transform them into proof of provider behaviour.

## verdict

safe with noted risk. The campaign improves repetition and configuration control, but its small classification sample remains insufficient for performance or causality claims.
