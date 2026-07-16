# adr: declared baseline without provider execution

## status

accepted

## context

The corpus now has thirteen behavioural cases, but there is no way to assess a complete no-skill baseline. Calling a model from the reference repository would couple the core to credentials, prompt formats, and provider behaviour before those provenance requirements are decided.

## decision

Add a JSON-only declared-baseline runner. It accepts exactly one structured attempt for every `agent-attempt` scenario, requires a `without-extremely-hardcore` declaration, validates complete coverage, and emits per-scenario assessments plus summary counts. The declaration is labelled self-reported.

## consequences

- External harnesses can produce comparable complete reports without changing core semantics.
- The reference repository remains dependency-free and runnable offline.
- The runner cannot establish whether the skill was actually absent or whether observations derive from real agent behaviour.

## options considered

### Invoke a provider from the reference CLI

Rejected because credentials, prompts, retries, and transcripts would prematurely define the contract.

### Accept partial attempt collections

Rejected because partial reports make aggregate baseline comparison ambiguous and hide missing coverage.

### Require complete declared input

Accepted because it gives a clear, comparable unit of assessment without claiming trusted provenance.

## trade-offs

Baseline generation remains external, and users must supply a full corpus in one input. Resumable benchmarks require a later persistence decision.

## follow-up work

Define portable raw-artifact provenance and implement the first real agent adapter.

## review date

Before publishing any baseline comparison or adding adapter-generated input.
