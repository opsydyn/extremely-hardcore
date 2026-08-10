# decision challenge: Pi read-only adapter

## trigger

This proposal executes an external provider, introduces a provider-specific public adapter path, and crosses the process/provenance boundary.

## proposal and claims

Add a Pi 0.84.1 leaf using `--mode json --print`, disabled tools and sessions, disabled project-local resources, and offline startup mode. Claim only that the adapter can retain and strictly parse Pi's JSON event stream into the shared attempt shape. Do not claim tool enforcement, workspace isolation, network isolation, sandbox enforcement, command ownership, provider identity, or performance.

## existing-platform ownership

Pi owns process execution, provider/model routing, JSON event semantics, project trust, tool/session settings, authentication, and provider traffic. The shared runner owns scenario coverage and scoring. The Pi leaf owns argv, prompt, JSONL framing, event parsing, runtime metadata, and raw artefacts. Human review owns live-evidence interpretation.

## strongest counterargument

Pi JSON mode is an event stream, not schema-constrained output. A model can emit valid JSON events while returning the wrong policy code or no usable final object. The `--no-tools` and `--offline` flags are still self-reported request configuration, so this leaf could create false confidence if its report is treated as a capability proof.

## alternatives

- **Use Pi RPC mode:** rejected for this one-shot slice because it introduces interactive command/session state that is unnecessary for a single prompt and expands the parser surface.
- **Import the global Pi package directly:** rejected because it creates a package/runtime boundary outside this repository's Bun dependency graph and would bypass the CLI provenance we need to retain.
- **Reuse the Claude parser:** rejected because Pi's JSONL event protocol and final-message shape are different.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Pi supports one-shot JSON event output. | Installed 0.84.1 help and local `docs/json.md`. | Applied invocation not yet run by this adapter. | Fake argv test plus one controlled process run. |
| Pi produces normalized attempts. | Planned strict `message_end` parser. | No adapter implementation or provider output evidence. | Fake parser tests plus live 13-scenario report. |
| Tools and sessions are disabled. | Requested `--no-tools` and `--no-session`. | Provider enforcement is not independently verified. | Treat as requested policy only. |
| Pi is comparable with Claude/Codex. | No comparison evidence. | Runs are not matched or repeated. | Do not make this claim in this slice. |

## stop conditions

- Pi requires tools, writes, persistent sessions, or project-local resources for this classification path.
- JSONL cannot be parsed without transcript heuristics.
- Provider output contradicts the requested boundary in a way that makes the run unsafe to retain or claim.
- Any result is presented as a benchmark or provider comparison.

## verdict

proceed

## rationale

The installed CLI exposes a narrow one-shot JSON event path with explicit no-tools/no-session controls. A leaf implementation is credible if it treats those controls as requested metadata, parses only the documented final event shape, and fails closed on everything else.
