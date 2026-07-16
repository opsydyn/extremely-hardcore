# ADR: pinned Codex model for evaluation

## status

accepted

## context

The initial controlled comparison observed a model name only in Codex stderr. The adapter did not require a model selection, pass one to the CLI, or make it part of aggregate provenance. Repeating runs under a provider default would not establish a controlled model configuration.

## decision

Require `--model <model>` for `bun run evaluate:codex`. Pass it to every `codex exec` command and record the requested value in the aggregate report and each invocation artifact. Keep the same value for every scenario in one adapter run.

## consequences

- Repeated comparisons can explicitly hold the caller-selected model constant.
- Reports expose a reviewable configuration dimension without relying on transient stderr.
- Existing wrappers must add `--model`; omission fails before any external call.
- The field records requested configuration, not independently verified backend routing.

## options considered

### Rely on Codex provider default

Rejected because the default is not part of the adapter contract and can change without a repository diff.

### Parse model from stderr after execution

Rejected because it is provider-format-dependent, observed after the fact, and cannot control the run.

### Require and forward an explicit model

Accepted because it is supported by the installed CLI, controls the caller-visible configuration, and is straightforward to preserve as provenance.

## trade-offs

An explicit identifier can still be unavailable or alias provider routing. This increases command strictness and does not make the experiment a benchmark.

## follow-up work

Run three corrected paired comparisons using one declared model and describe results as controlled classification measurements only.

## review date

After the repeated controlled comparison set.
