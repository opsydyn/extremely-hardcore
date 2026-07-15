# ADR: agent-attempt contract without provider coupling

## status

accepted

## context

The deterministic evaluation runner has scenario results but no shared contract for future Codex or Claude adapters. Building an adapter first would leak provider prompts, transcript formats, and credential assumptions into the core before we know what stable data is needed.

## decision

Declare the existing core scenarios in one manifest and add a pure `AgentAttempt` assessor. An attempt supplies a scenario ID, minimal agent identity, observed error codes, and duration. The assessor returns `passed`, `failed`, or `invalid` with the manifest expectation.

The contract is experimental and does not claim self-reported adapter output is independently verified.

## consequences

- Future adapters share one scenario vocabulary and comparison rule.
- Core evaluation remains provider-neutral and dependency-free.
- Raw transcripts and evidence provenance need a later explicit decision.

## options considered

### Build provider adapters first

Rejected because provider-specific invocation would define the shared contract accidentally.

### Parse natural-language agent output

Rejected because it is brittle and cannot provide reliable assessment semantics.

### Structured attempt plus manifest

Accepted because it establishes a portable seam with minimal commitment.

## review date

Before committing the first external adapter or adding benchmark thresholds.
