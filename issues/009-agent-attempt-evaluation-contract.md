# issue: define agent-attempt evaluation contract

## outcome

Define a portable structured result submitted by a future Codex or Claude adapter and assess it against the existing core pressure-scenario expectations.

## acceptance criteria

- One manifest declares the seven core scenario IDs, categories, and expected error codes.
- A pure assessor marks a structured attempt `passed`, `failed`, or `invalid`.
- Unknown scenario IDs are invalid.
- No agent API, transcript parser, provider SDK, persistence, or threshold is introduced.

## non-goals

- Executing agents or prompts.
- Treating self-reported output as trusted benchmark evidence.
- Cross-agent scoring, baselines, CI gating, or scenario expansion.
