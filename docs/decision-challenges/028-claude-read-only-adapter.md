# decision challenge: Claude read-only adapter

## trigger

This proposal executes an external provider and crosses the provider/provenance boundary, even though the requested mode is read-only classification.

## proposal and claims

Add a Claude Code leaf adapter using print-mode JSON/schema output, plan permission mode, disabled tools, and disabled session persistence. Claim only that the adapter can retain and parse a controlled classification response. Do not claim read isolation, no-network execution, sandbox enforcement, command ownership, skill loading, or provider performance.

## existing-platform ownership

Claude Code owns process execution, model routing, JSON envelope semantics, permissions, tools, sessions, and authentication. The shared runner owns scenario coverage and scoring. The leaf owns provider artefacts and parsing. Human review owns interpretation of live evidence.

## durable differentiated value

The repository adds a repeatable, provider-neutral scoring boundary and explicit claim limits around a real provider run. It does not reimplement Claude execution or pretend CLI flags are an independent sandbox.

## strongest counterargument

This is still a constrained classification benchmark. Disabling tools means it cannot demonstrate repository action compliance, and a successful JSON response may only show that Claude can follow a prompt. The adapter could add provider-specific maintenance cost without increasing product evidence.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Claude can be invoked in print JSON/schema mode. | Local help lists the required flags. | Applied invocation not yet run. | One controlled command with retained argv/stdout/stderr. |
| Claude produces normalized attempts. | Shared assessor and planned leaf parser. | No Claude output evidence. | Fake parser tests plus a live 13-scenario report. |
| Tools and session persistence are disabled. | Requested `--tools ""` and `--no-session-persistence`. | Provider enforcement is not independently verified. | Treat as requested policy only; no stronger claim. |
| Claude is comparable with other providers. | No comparison evidence. | Classification is non-discriminative and mode/skills are not independently attested. | Do not make this claim in this slice. |

## minimum credible slice

Fake-executor contract tests plus one live read-only classification run, with raw provider artefacts and parser failures retained. If authentication or output shape fails, record the failure and stop rather than generalize the parser.

## stop conditions

- The command requires tools, writes, network, or persistent sessions.
- Output cannot be parsed from structured fields without prose heuristics.
- The provider executes outside the selected workspace or produces evidence that contradicts the requested boundary.
- The result is presented as a benchmark or provider comparison.

## verdict

proceed

## rationale

The local preflight exposes a narrow, explicit read-only classification path. The adapter is credible as a leaf integration if the live run remains a requested-policy and retained-artifact claim only.
