# bounded-context review: Claude read-only adapter

## proposed change

Add a Claude-specific leaf adapter that maps Claude Code print-mode structured output into the shared read-only adapter runner.

## affected contexts

- Claude leaf owns invocation, prompts, parser, version, and raw process artefacts.
- Shared evaluation owns request construction, scenario coverage, assessment, and artifact integrity.
- Human review owns claims about requested policy and live output.

## allowed dependencies

- Claude leaf may import the shared `AgentAdapter` types, scenario vocabulary, standard-library process/filesystem APIs, and the shared runner at its CLI boundary.
- The runner may not import Claude modules.

## suspicious dependencies

- Passing expected error codes into Claude prompts.
- Parsing Claude output in `evaluation/agent-adapter.ts`.
- Treating `--tools`, `--permission-mode`, or `--no-session-persistence` as enforcement proof.
- Reusing Codex command or report types.

## data ownership

Claude owns raw process bytes and envelope semantics. The leaf owns normalization. The shared runner owns normalized assessment and report-level artifact validation. No live report feeds protocol state.

## verdict

safe with noted risk

The boundary is sound for read-only classification. Provider output shape and requested-policy enforcement remain external risks and must stay explicit in the evidence ledger.
