# domain map: Claude read-only adapter

## domain terms

- Claude leaf adapter: Claude-specific process invocation and output translation.
- Claude envelope: provider-owned JSON returned by `claude --print --output-format json`.
- Structured response: Claude envelope field or parsed result containing canonical observed error codes.
- Requested policy: CLI flags supplied to Claude; not enforcement evidence.
- Live classification run: one provider execution across the 13 agent-attempt scenarios, not an action fixture.

## bounded contexts

- Shared evaluation contract owns requests, normalized attempts, scoring, and artifact integrity.
- Claude leaf owns flags, prompts, JSON schema, envelope parsing, version, and raw process files.
- Human review owns interpretation of requested policy and live result limitations.

## commands

- `evaluate:claude -- --output-dir <dir> --workspace <dir> --model <model>` invokes one Claude process per agent-attempt scenario.
- The adapter writes prompt, schema, invocation, stdout, stderr, and normalized response artefacts under the output root.

## invariants

- The adapter receives no scenario expected answer.
- `--tools ""` and `--no-session-persistence` are requested for this slice.
- The shared runner remains the only coverage/scoring authority.
- A live report cannot claim sandbox enforcement, network isolation, command ownership, provider identity, or skill loading.

## ambiguity

The exact Claude JSON envelope and structured-output field are provider-version details. The leaf parser may support documented envelope alternatives, but it must reject malformed or ambiguous output rather than infer from free-form prose.
