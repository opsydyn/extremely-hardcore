# change contract: Claude read-only adapter

## user intent

Implement the Claude Code leaf adapter first, using the vendor-neutral read-only contract, then leave Pi for a separate capability-gated adapter because it is not installed locally.

## current understanding

The shared runner owns scenario coverage, attempt assessment, and retained-artifact integrity. Claude Code 2.1.224 is locally installed and exposes print-mode JSON/schema output, no-session persistence, plan permission mode, and tool selection. The current preflight is CLI help evidence only; it does not prove applied policy or provider behaviour.

## allowed scope

- `evaluation/run-claude-adapter.ts` or equivalent leaf module.
- `scripts/evaluate-claude.ts` and package script.
- Claude-specific tests using an injected process executor.
- One controlled live read-only run if local authentication/model access permits.
- Claude-specific evidence and roadmap records.

## forbidden scope

- Changes to `evaluation/agent-adapter.ts`, `protocol/`, `assess-agent-attempt.ts`, or Codex adapters.
- Generic provider flags, session handles, transcript parsing, or sandbox abstractions.
- Writable or network-enabled execution.
- Pi implementation or guessed Pi CLI integration.
- Provider comparison, regression, or performance claims.

## public contracts

Adds an experimental Claude-specific CLI and report format. The shared adapter contract remains unchanged. The CLI requires `--output-dir`, `--workspace`, and `--model`; output directories must not already exist.

## risks

- Claude's JSON envelope and structured output fields may change across versions.
- CLI flags are requested configuration, not proof of tool, network, or filesystem enforcement.
- Prompts and raw output can contain sensitive workspace context.
- A live classification pass is not an action-level compliance or skills-effect evaluation.

## acceptance evidence

- Red-first fake-executor tests for argv, schema, parser, artefact, non-zero exit, malformed output, and output-directory guards.
- Local `claude --version` and help preflight.
- Live report only if it passes explicit artifact/provenance checks; otherwise retain the failure evidence and stop.
- `bun run check`, focused tests, full tests, TypeScript, and diff checks.

## stop conditions

Stop Claude work if the runtime needs tools, writes, network, resume, or undocumented parser heuristics. Record the exact provider limitation and do not weaken the shared contract.
