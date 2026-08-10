# bounded-context review: Pi read-only adapter

## proposed change

Add a Pi-specific leaf adapter that maps Pi 0.84.1 JSON event output into the shared read-only adapter runner.

## affected contexts

- Pi leaf owns invocation, prompts, JSONL framing, final event selection, parser, version, and raw process artefacts.
- Shared evaluation owns request construction, scenario coverage, assessment, and artifact integrity.
- Human review owns claims about requested policy and live output.

## allowed dependencies

- Pi leaf may import shared `AgentAdapter` types, scenario vocabulary, the shared runner, and standard-library process/filesystem APIs.
- The runner may not import Pi modules or global package internals.

## suspicious dependencies

- Passing expected error codes into Pi prompts.
- Parsing Pi JSONL in `evaluation/agent-adapter.ts`.
- Treating `--no-tools`, `--no-session`, `--no-approve`, or `--offline` as enforcement proof.
- Using Pi RPC state or direct SDK imports for a one-shot classification slice.
- Searching free-form assistant prose for observation codes.

## data ownership

Pi owns raw event bytes and event semantics. The leaf owns final-message normalization. The shared runner owns normalized assessment and report-level artifact validation. No live report feeds protocol state.

## verdict

safe with noted risk

The boundary is sound for one-shot read-only classification. Pi event and project-resource behaviour remain external risks and must stay explicit in the evidence ledger.
