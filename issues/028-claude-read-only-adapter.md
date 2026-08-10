# Claude read-only adapter

## intent

Implement the first concrete leaf adapter for Claude Code against the shared vendor-neutral read-only runner, then run one controlled classification pass over the 13 agent-attempt scenarios.

## observed preflight

- Local executable: `claude` at `/Users/alancurrie/.local/bin/claude`.
- Version: `2.1.224 (Claude Code)`.
- Local help exposes `--print`, `--output-format json`, `--json-schema`, `--no-session-persistence`, `--permission-mode plan`, and `--tools`.
- `pi` is not currently available on `PATH`; Pi work must not be guessed from Claude semantics.

## scope

- Add a Claude Code leaf adapter under `evaluation/`.
- Keep Claude command flags, prompt construction, envelope parsing, and raw artefact retention in that leaf.
- Add a CLI wrapper requiring an explicit model, workspace, and new output directory.
- Run one controlled read-only classification evaluation with tools disabled and session persistence disabled.

## exclusions

- Claude workspace writes, action fixtures, resume, network, sandbox, or containment claims.
- Claude skill-effect comparison or benchmark claims.
- Pi implementation in the same leaf module.
- Changes to the shared adapter contract, protocol, assessor, or Codex adapter.

## acceptance

- Fake-executor tests prove Claude argv construction, schema handling, envelope parsing, artefact retention, and failure behaviour.
- A live run, if authentication and model access work, produces a report with 13 attempts, 13 assessments, retained raw artefacts, and explicit provider claim limits.
- The run uses `--print`, `--output-format json`, `--json-schema`, `--no-session-persistence`, `--permission-mode plan`, and `--tools ""`.
- No provider output is interpreted by the shared runner; only the Claude leaf parses it into `AgentAttempt`.

## stop conditions

- Claude cannot run with tools disabled and session persistence disabled.
- The JSON-schema response is not stable enough to parse without transcript heuristics.
- A live run requires writable workspace, network, or sandbox assumptions.
- The provider reads outside the selected workspace or exposes evidence that makes the classification unsafe to claim.
