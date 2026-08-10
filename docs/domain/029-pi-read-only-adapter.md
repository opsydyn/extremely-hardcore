# domain discovery: Pi read-only adapter

## domain terms

- **scenario pressure:** the provider-neutral situation supplied to Pi without the expected answer.
- **JSON event stream:** Pi's LF-delimited `--mode json` stdout protocol.
- **final assistant event:** a `message_end` event whose message role is `assistant`.
- **normalized response:** the strict JSON object extracted from final assistant text.
- **requested policy:** flags selected by the adapter, not independently verified enforcement.

## context boundaries

- `evaluation/agent-adapter.ts` owns the neutral request/result contract, scenario coverage, scoring, and artifact integrity.
- `evaluation/run-pi-adapter.ts` owns Pi argv, prompt wording, JSONL framing, event selection, version discovery, and raw provider artefacts.
- `protocol/` remains unaware of Pi processes and provider output.
- Human review owns interpretation of live Pi output and any claim beyond retained process provenance.

## invariants

- Expected error codes stay in the shared scorer and are never sent to Pi.
- The parser must not infer policy codes from prose or markdown.
- A missing or ambiguous final assistant message is invalid provider output.
- `--no-tools`, `--no-session`, `--no-approve`, and `--offline` remain requested settings with explicit claim limits.
