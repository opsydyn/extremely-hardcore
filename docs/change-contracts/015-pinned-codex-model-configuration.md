# change contract: pinned Codex model configuration

## user intent

Proceed with the next evidence-led evaluation slice: repeated controlled Codex comparisons. First make the model configuration explicit so those repetitions are meaningfully controlled.

## current understanding

The first paired comparison recorded `gpt-5.6-sol` and high reasoning effort only in provider stderr. The adapter's public command and report did not require, pass, or persist a model selection, leaving repeat runs vulnerable to an unobserved provider default change.

## allowed scope

- Require `--model <model>` in the Codex evaluation CLI.
- Require and pass the model through the adapter to every `codex exec` command.
- Record the requested model in adapter report and invocation artifacts.
- Add focused tests and matching operational documentation, decision, and proof records.

## forbidden scope

- Live provider calls, repeated comparison execution, scenario or assessor changes, retries, model fallback, reasoning-effort controls, CI gates, or benchmark claims.

## affected areas

- `scripts/evaluate-codex.ts`, `evaluation/run-codex-adapter.ts`, `evaluation/types.ts`, and focused adapter/CLI tests.
- Evaluation documentation and slice 015 protocol records.

## public contracts

`bun run evaluate:codex` gains a required `--model <model>` option. The experimental adapter report and per-scenario invocation JSON gain a requested `model` field.

## assumptions

Codex CLI accepts `--model <model>` as shown by the installed CLI help. Recording the requested name controls caller configuration but cannot independently prove backend routing.

## risks

The configured model can be unavailable or remapped by the provider. Requiring a model also intentionally makes older wrapper invocations fail until updated.

## acceptance evidence

- A focused adapter test initially fails because invocations and provenance omit the requested model.
- A focused CLI test initially fails because `--model` is not required.
- Tests verify each scenario receives the exact requested model and report/invocation artifacts preserve it.
- Existing evaluators, static checks, full tests, typecheck, and the completion gate pass.

## stop conditions

- The installed Codex CLI rejects `--model`, or only supports non-deterministic aliases without a stable caller-visible value.
- Implementing this needs provider-specific API calls, credential changes, or a scenario contract change.
