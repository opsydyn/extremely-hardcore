# decision challenge: provider-neutral agent adapter roadmap

## trigger

The future proposal crosses provider and provenance boundaries and could create a public adapter contract or comparison surface. This slice only records the proposal; it does not implement or execute it.

## proposal and claims

Backlog a provider-neutral adapter surface for Claude and Pi. The only current claim is that the existing protocol and deterministic evaluator are suitable shared foundations. No claim is made about provider equivalence, sandbox enforcement, or ease of implementation.

## existing-platform ownership

Claude, Pi, and Codex own their CLIs, sessions, output formats, model routing, and sandbox semantics. The repository owns the change protocol, scoring rules, evidence ledger, and limits on claims. Docker/Colima owns the tested local container boundary.

## durable differentiated value

The durable value is one evidence and transition model across different agent runtimes, with provider-specific behaviour retained as inspectable artefacts rather than flattened into a lowest-common-denominator wrapper.

## strongest counterargument

The adapters may look similar at the command boundary while differing materially in session state, tool ownership, output completeness, resumability, and containment. A generic contract could create false portability and encourage unsupported comparisons.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The core protocol can be shared. | `protocol/` and deterministic fixture scoring have no Codex dependency. | No second live provider adapter exists. | Contract tests against at least two leaf adapters. |
| Codex-specific assumptions are isolated. | Codex flags and reports are in `evaluation/run-codex*` and Codex report types. | Shared types may still need extraction. | Boundary review before implementation. |
| Claude and Pi can support the same read-only scenarios. | No local Claude/Pi adapter evidence. | CLI/session/output capabilities unknown. | Direct preflight and one controlled read-only run per provider. |
| Writable provider execution can be generalised safely. | Docker container probe passed selected container checks. | VM and provider isolation remain unproven. | Runtime-specific containment evidence and approved fixture runs. |

## minimum credible slice

After V0 feature completion, define a capability descriptor and adapter contract without changing the protocol scorer, then add one read-only provider adapter and its raw-artifact tests.

## stop conditions

- Provider capability differences cannot be represented without weakening claims.
- A provider requires unsupported credentials, broad dependencies, or unproven writable execution.
- A comparison is proposed before repeated controlled runs and regression policy exist.

## verdict

proceed

## rationale

Proceed with backlog documentation only. The proposal has a credible future boundary, but implementation is intentionally gated behind V0 completion and a new architecture decision.

