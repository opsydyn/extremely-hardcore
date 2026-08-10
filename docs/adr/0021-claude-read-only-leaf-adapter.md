# ADR: Claude read-only leaf adapter

## status

accepted

## context

ADR 0020 defined a provider-neutral read-only adapter contract. Claude Code 2.1.224 is installed locally and exposes print-mode JSON output, JSON-schema validation, plan permission mode, tool selection, and no-session persistence. The repository needs one concrete leaf implementation without moving Claude assumptions into the shared runner.

## decision

Implement a Claude Code leaf adapter that:

- requires an explicit model and new output directory;
- invokes `claude --print --output-format json --json-schema <schema> --no-session-persistence --permission-mode plan --tools "" --model <model> <prompt>`;
- constructs prompts from the scenario pressure and global canonical observation vocabulary, without passing the scenario expected answer;
- retains raw stdout, stderr, prompt, schema, invocation metadata, and normalized response files;
- parses only structured response fields or a JSON-encoded result field and rejects malformed/free-form output;
- returns normalized attempts to the shared runner, which remains the only scorer and artifact-integrity authority.

The adapter reports capability claims as requested/declared metadata. It does not claim that Claude enforced filesystem, network, sandbox, identity, or command-ownership boundaries. It does not implement writes, resume, or action fixtures.

## consequences

- Claude-specific flags and parsing are isolated in one leaf module.
- Provider raw output is retained for review but can contain sensitive context.
- A passing classification run remains non-discriminative and does not support comparison claims.
- Claude CLI output shape may change and requires adapter-specific maintenance.
- Pi remains a separate adapter because its CLI is not locally installed or verified.

## options considered

### Reuse the Codex adapter with a different executable

Rejected because Claude flags, output envelope, session controls, and artifact model differ.

### Add Claude semantics to the shared runner

Rejected because it would make the vendor-neutral contract provider-coupled.

### Implement a Claude leaf over the shared runner

Accepted because it preserves ownership and keeps the claim surface narrow.

## review date

After the first live Claude report or before adding Claude writable/resume execution, whichever comes first.
