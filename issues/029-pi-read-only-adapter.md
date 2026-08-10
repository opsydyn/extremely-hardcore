# Pi read-only adapter

## intent

Implement the second concrete leaf adapter for the installed Pi coding agent, using Pi's JSON event stream for one-shot read-only classification through the shared provider-neutral runner.

## observed preflight

- Local executable: `pi` resolves through the fnm Node 24.15.0 installation.
- Version: `0.84.1`.
- Local help exposes `--mode json`, `--print`, `--no-session`, `--no-tools`, `--no-extensions`, `--no-skills`, `--no-prompt-templates`, `--no-themes`, `--no-context-files`, `--no-approve`, `--offline`, and `--model`.
- Pi JSON mode emits LF-delimited event objects; the final authoritative assistant content is carried by a `message_end` event.

## scope

- Add a Pi-specific leaf adapter under `evaluation/`.
- Keep Pi flags, prompt construction, JSONL event parsing, runtime metadata, and raw artefact retention in that leaf.
- Add a CLI wrapper requiring an explicit model, workspace, and new output directory.
- Use one ephemeral, no-tools Pi process per agent-attempt scenario.
- Add fake-executor tests before any live provider call.

## exclusions

- Pi workspace writes, action fixtures, resume, network, sandbox, or containment claims.
- Pi skill-effect comparison or benchmark claims.
- Changes to the shared adapter contract, protocol, assessor, or Claude adapter.
- Direct imports from the globally installed Pi package.

## acceptance

- Fake-executor tests prove constrained argv construction, strict JSONL event parsing, normalized response extraction, artefact retention, and failure behaviour.
- The leaf does not receive or pass a scenario's expected error code.
- A live run, if authentication and model access work, produces a report with 13 attempts, 13 assessments, retained raw artefacts, and explicit provider claim limits.
- The parser accepts only a JSON object in the final assistant text. It rejects code fences, prose, missing final assistant events, invalid JSONL, and unsupported observation codes.
- No provider output is interpreted by the shared runner; only the Pi leaf parses it into `AgentAttempt`.

## stop conditions

- Pi cannot run in JSON mode with tools and session persistence disabled.
- Pi requires project-local resources despite explicit disable/ignore flags.
- Output cannot be parsed without prose heuristics or transcript-specific assumptions.
- A live run requires writable workspace, tool execution, or unverified containment assumptions.
- The result is presented as a benchmark or provider comparison.
