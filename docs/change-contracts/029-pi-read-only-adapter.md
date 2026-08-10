# change contract: Pi read-only adapter

## goal

Add a narrow Pi 0.84.1 leaf adapter that converts one-shot JSON event streams into the existing provider-neutral read-only attempt contract.

## invariants

- `protocol/`, the deterministic assessor, the shared runner, and the Claude adapter remain unchanged.
- Pi never receives a scenario's expected error code.
- The shared runner remains the only owner of coverage, scoring, report status, and retained-artifact integrity validation.
- Pi's requested flags are recorded as configuration evidence, not enforcement proof.
- The adapter fails closed on malformed event streams, missing final assistant text, free-form output, unsupported codes, non-zero exits, and mutated/unsafe artefacts.
- No session is persisted and no tool is enabled by the adapter profile.

## provider request

Each scenario invokes the selected Pi executable with:

```text
--mode json --print --no-session --no-tools --no-extensions --no-skills
--no-prompt-templates --no-themes --no-context-files --no-approve --offline
--model <model> <prompt>
```

`--offline` disables Pi startup network operations only. Model-provider traffic remains outside this adapter's control and is not classified as network enforcement.

## provider response

The leaf retains raw stdout as LF-delimited JSONL and stderr as a separate log. It parses every non-empty stdout line as JSON, selects the final `message_end` event whose message role is `assistant`, concatenates its text content blocks, and parses that text as JSON. It accepts only `{ observedErrorCodes: string[], summary: string }` with codes from the global scenario vocabulary. It does not strip markdown fences or search arbitrary prose for codes.

## artefacts

Each scenario retains `prompt.txt`, `stdout.jsonl`, `stderr.log`, `invocation.json`, and `normalized-response.json`. The shared runner receives relative SHA-256 digests for these files and validates them before report emission.

## out of scope

Writes, tools, resume, RPC session control, provider comparison, benchmark thresholds, skill loading claims, network isolation, sandbox enforcement, command ownership, agent identity, and containment.

## rollback

Remove the Pi leaf, CLI, tests, package script, and Pi-specific governance/evidence documents. The shared adapter contract and Claude leaf remain unchanged.
