# ADR: Pi read-only leaf adapter

## status

accepted

## context

ADR 0020 defined a provider-neutral read-only adapter contract, and ADR 0021 established the Claude leaf pattern. Pi 0.84.1 is now installed locally and exposes one-shot JSON event mode, no-session mode, no-tools mode, project-resource disable flags, offline startup mode, and explicit model selection. Pi does not expose Claude-style JSON-schema final output, so its event stream needs a separate leaf parser.

## decision

Implement a Pi leaf adapter that:

- requires an explicit model and new output directory;
- invokes `pi --mode json --print --no-session --no-tools --no-extensions --no-skills --no-prompt-templates --no-themes --no-context-files --no-approve --offline --model <model> <prompt>`;
- constructs prompts from scenario pressure and the global canonical observation vocabulary without passing expected answers;
- retains raw JSONL stdout, stderr, prompt, invocation metadata, and normalized response files;
- parses every stdout record as JSON, selects the final authoritative assistant `message_end` event, and parses only its text content as the normalized JSON object;
- rejects malformed JSONL, missing final assistant text, code fences, prose, and unsupported observation codes;
- returns normalized attempts to the shared runner, which remains the only scorer and artifact-integrity authority.

The adapter reports requested capability metadata. It does not claim that Pi enforced filesystem, network, sandbox, identity, project-resource, or command-ownership boundaries. It does not implement writes, resume, or action fixtures.

## consequences

- Pi-specific flags, event framing, parsing, runtime metadata, and raw artefacts remain isolated in one leaf module.
- The leaf depends on Pi's documented JSON event shape but not on the globally installed package's TypeScript internals.
- JSON event mode is structured transport, not schema enforcement; final response parsing remains strict and fail-closed.
- Provider raw output can contain repository or model context and must be reviewed before sharing.
- A passing report remains non-discriminative and does not support a comparison or benchmark claim.
- Pi RPC mode and direct SDK imports remain future options, not part of this one-shot slice.

## options considered

### Reuse the Claude adapter with a different executable

Rejected because Pi's JSONL event stream, no-tools/session flags, and final-message shape differ.

### Use Pi RPC mode

Rejected for this slice because one-shot JSON mode is sufficient and RPC introduces interactive state and command-response handling that is not needed for classification.

### Import the global Pi package directly

Rejected because it would bypass CLI process provenance and add a runtime/package dependency outside the repository's Bun graph.

### Implement a Pi leaf over the shared runner

Accepted because it preserves ownership and keeps the claim surface narrow.

## review date

After the first live Pi report or before adding Pi writable/resume/RPC execution, whichever comes first.
