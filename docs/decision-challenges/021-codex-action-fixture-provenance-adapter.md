# decision challenge: Codex action-fixture provenance adapter

## trigger

The proposal introduces external writable-agent execution, a new provider-execution boundary, retained provider-process observability, and a potential product-differentiation claim. It requires challenge before planning.

## proposal and claims

Add an experimental adapter that invokes Codex for the fixture's `fix` and `resume` stages and preserves raw stage artefacts beside the immutable fixture ledger. The adapter claims only that the requested Codex invocation and its raw process outputs are retained with digest-linked fixture results. It does not claim that a provider event proves a command, that an agent owns an action, or that the run is network-isolated.

## existing-platform ownership

Codex owns process execution, model routing, authentication, and the meaning or completeness of `--json` output. The fixture runner owns copied-workspace setup, stale-state intervention, and the only pass/fail decision. The fixture CLI owns protocol record creation and its invocation ledger. Generic protocol validation owns evidence and completion validity. The adapter owns invocation construction, raw artefact retention, and report-level digest linkage.

## durable differentiated value

The repository's durable value is a bounded, independently scored fixture with immutable local protocol controls, plus reviewable provider execution evidence attached to that score. Codex already provides execution; Extremely Hardcore adds an auditable fixture boundary without pretending that opaque process output is a verifier.

## strongest counterargument

Persisting raw provider output may be operational theatre: without a stable provider event contract or external attestation, it cannot prove who ran which command. A generic provider abstraction or automatic event parser would add complexity while preserving this fundamental limitation.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| A provider process has a fixture-local path for evidence and completion. | `fixture-protocol.ts`, `FIXTURE.md`, ADR 0014, and runner tests establish the immutable local commands and structural ledger. | The current reference proof is not a provider run. | An adapter retaining raw provider artefacts adjacent to the resulting ledger. |
| The fixture result is independently scored. | `run-bounded-bug-fix-fixture.ts` validates staged protocol records and writes `ActionFixtureResult`. | An adapter could accidentally become a second scorer. | Tests showing the adapter returns the runner result without interpreting provider output. |
| Codex can be requested to work in the copied workspace. | Local `codex exec --help` documents `--sandbox workspace-write`, `--ephemeral`, and `--cd`. | Help text does not prove enforcement or model behaviour. | Record the requested arguments; do not make enforcement claims. |
| Raw provider artefacts can be retained without schema dependence. | Local help documents `--json`, `--output-last-message`; the existing adapter retains process metadata. | Event schema and semantic completeness are undocumented locally. | Treat stdout as opaque bytes and digest it; do not parse it for scoring. |
| The adapter can establish no-network execution. | Local `codex sandbox --help` names a network-disabling setting. | No invocation evidence establishes that a live `codex exec` used or enforced it. | Direct applied-policy attestation and enforcement evidence, otherwise no claim. |
| The adapter can prove agent-owned protocol commands. | Fixture ledger links commands to protocol artefacts. | Ledger and process artefacts do not cryptographically bind a human or model identity. | Provider-supported command attestation or an explicit weaker manual-review claim. |

## minimum credible slice

Implement a Codex-only, two-stage adapter with an injected executor. Preserve fixed prompts, invocation metadata, raw stdout, stderr, and any final message under `provider/<stage>/` outside the copied workspace. Return a new report that nests the unchanged `ActionFixtureResult` and digests all retained provider artefacts. Test it with a deterministic fake executor, without invoking Codex.

## stop conditions

- Stop if provider output must be parsed to select fixture status.
- Stop if the command requires an undocumented network or authentication mechanism.
- Stop any identity, command-attribution, no-network, provider-compliance, benchmark, or comparison claim.
- Stop for human review before operational live-run claims are introduced.

## verdict

proceed

## rationale

ADR 0014 resolved the prior blocker by giving the fixture an immutable local command surface and ledger. A narrow adapter can now retain the evidence needed for later human inspection without converting raw provider output into an unearned verifier. The slice is credible only because its claim is limited to requested configuration and retained artefact linkage; all stronger provenance and isolation claims remain explicitly unresolved.
