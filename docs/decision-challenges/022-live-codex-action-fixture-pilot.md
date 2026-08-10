# decision challenge: live Codex action-fixture pilot

## trigger

This is external writable-agent execution with a provider-process, sandbox, provenance, and potential product-differentiation implication. It requires a challenge before the live operation.

## proposal and claims

Run the committed experimental Codex adapter once with `gpt-5.6-sol`, then inspect the generated report and retained artefact inventory. The allowed claim is narrow: one requested Codex process sequence produced the recorded fixture and provenance statuses at a specific time. It is not a provider benchmark, comparison, security demonstration, or proof of command ownership.

## existing-platform ownership

Codex owns authentication, model routing, process behaviour, sandbox implementation, network behaviour, and emitted event semantics. The fixture runner owns staged scoring. The fixture protocol CLI owns evidence and completion records. The adapter owns requested invocation construction, raw artefact retention, and integrity revalidation. The operator owns the decision to run, local output handling, and interpretation limits.

## durable differentiated value

The repository's value is not that Codex can modify a source file. It is that a bounded fixture preserves independent scoring and retains reviewable provider artefacts without promoting opaque output into a verifier. One pilot tests this integration boundary under its stated limits.

## strongest counterargument

One live run is anecdotal. Even a passing result cannot establish that Codex reliably follows the protocol, that the recorded process has a specific identity, or that any sandbox or no-network property held. It could therefore create more apparent confidence than evidence.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The committed adapter can request two writable Codex stages. | Deterministic injected-executor tests and ADR 0015 verify request construction. | No default executor has been exercised live. | One recorded command result and report. |
| The runner independently scores the fixture. | Fixture tests and protocol ledger validation are local deterministic evidence. | A live run may fail or expose unmodelled interaction. | The resulting runner report and ledger. |
| Retained provider artefacts are internally intact at report emission. | Deterministic tests cover mutation, symlink, and executor-failure cases. | Internal integrity is not external-process attestation. | `provenance.status` and digest inventory from the actual report. |
| Requested Codex configuration is known. | Invocation metadata records model and fixed flags. | It does not prove routing, sandbox enforcement, or network state. | Record the requested configuration only; make no stronger claim. |
| Provider output identifies commands or agent ownership. | Raw stdout is retained. | Event semantics and completeness are not a stable verifier. | Provider-supported attestation; excluded from this pilot. |

## minimum credible slice

Perform exactly one live invocation, preserve its output directory locally, inspect only the report and artefact inventory needed to classify the pilot, and record the outcome without retry. Do not convert it into a comparative evaluation.

## stop conditions

- Stop after the one attempted invocation.
- Stop on authentication, model, command, fixture, provenance, or output-handling failure.
- Stop and return for human decision before any claim beyond the narrow recorded-result statement.

## verdict

proceed

## rationale

The prior decision challenge held live execution until the fixture had a local protocol surface. ADR 0014 and ADR 0015 supply that surface and a narrow raw-artefact boundary. The user explicitly approved the operational next step after reviewing those limits. A single, non-retried pilot is the minimum credible way to learn whether the committed default executor integrates with the fixture; the evidence cannot support a broader conclusion.
