# bounded-context review: Codex action-fixture provenance adapter

## proposed change

Add a Codex-specific executor adapter outside the fixture workspace. It adapts runner stage requests into process invocations and writes provider artefacts under the caller-owned output root.

## affected contexts

- Codex adapter boundary
- Bounded action fixture runner
- Fixture-local protocol ledger
- Experimental evaluation CLI

## allowed dependencies

`Codex action adapter -> action fixture runner/types + Node process/filesystem APIs`; `adapter executor -> local Codex CLI`; `fixture runner -> fixture/protocol validation`. The adapter may derive its output root from its explicit options, not from mutable fixture state.

## suspicious dependencies

Provider JSON schema parsing, provider SDKs, generic protocol writes, fixture scoring imports into provider code, and reuse of read-only behavioural-assessment types.

## data ownership

The fixture runner owns workspace and score. The fixture CLI owns ledger entries. The adapter owns `provider/<stage>/` files and its report. Codex owns emitted output semantics.

## transaction boundaries

The adapter writes prompt and invocation metadata before starting a provider process, then writes stdout/stderr before returning control to the runner. The runner evaluates only after the executor returns. The adapter report is written after the runner returns.

## integration events

There is no event transport. Raw stdout is retained as an opaque local artefact. Fixture protocol ledger records remain independent from provider artefacts.

## anti-corruption needs

Do not allow opaque Codex events to enter fixture validation or generic protocol logic. Keep provider-specific request construction in the new adapter, rather than extending the provider-neutral executor contract.

## verdict

safe with noted risk. Ownership and dependency direction remain one-way, but raw retained output does not establish identity or isolation.
