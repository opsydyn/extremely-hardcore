# issue: pin Codex model configuration for repeatable evaluation

## outcome

Require every Codex adapter evaluation to declare a model, pass that exact model to
`codex exec`, and retain it in report and invocation provenance.

## acceptance criteria

- The adapter requires a non-empty requested model.
- Every scenario invocation passes the requested value using Codex CLI's `--model` option.
- The aggregate report and each invocation artifact retain the requested model.
- The CLI rejects an invocation that omits `--model` before starting the adapter.
- Existing evaluation modes, scenario corpus, strict assessor, and read-only sandbox remain unchanged.

## non-goals

- Selecting a provider default, changing reasoning effort, adding retries, or running the repeated comparison.
- Treating the configured name as proof of the provider's actual serving model.
