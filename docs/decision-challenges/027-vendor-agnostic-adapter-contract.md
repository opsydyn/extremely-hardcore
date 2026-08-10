# decision challenge: vendor-agnostic adapter contract

## trigger

This proposal adds a public experimental adapter contract across the evaluation/provider boundary and could be used for future provider comparison claims.

## proposal and claims

Add a provider-neutral read-only adapter contract and runner. The only supported claims in this slice are that the runner can validate adapter shape, preserve opaque artefact digests, and reuse the existing assessor. No claim is made about provider equivalence, execution safety, sandbox enforcement, or performance.

## existing-platform ownership

Each provider owns its executable, prompts, sessions, output/event formats, model routing, and sandbox semantics. The existing protocol owns change state and evidence validity. The scenario manifest and assessor own expected observations and scoring. This repository owns the adapter seam and claim limits.

## durable differentiated value

The durable value is a shared evidence/scoring boundary that can compare observable attempts without forcing providers into identical process or session models. Provider-specific artefacts remain reviewable rather than being collapsed into a generic transcript abstraction.

## strongest counterargument

The interface may be premature. A generic read-only method can hide the differences that matter most: whether a runtime actually controls commands, how sessions resume, whether output is complete, and what its sandbox means. The fake adapter may create false confidence.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The evaluator can own scoring independently of providers. | `AgentAttempt` and `assessAgentAttempt` already provide a pure assessor. | No shared adapter runner yet. | Runner tests that vary adapter output while keeping scorer unchanged. |
| Artefact retention can be shared safely. | Codex adapters digest retained files locally. | No provider-neutral root/path integrity helper. | Tests for missing, outside-root, symlink, and digest mutation. |
| Capability claims can be represented without overclaiming. | Existing docs distinguish requested settings from enforcement. | No common evidence-level vocabulary. | Capability descriptor tests and claim-limit documentation. |
| Claude or Pi can implement the seam. | No direct local capability evidence. | Runtime/session/output APIs are unknown. | A later leaf adapter preflight and controlled read-only run. |

## minimum credible slice

A pure runner with a fake adapter: request only scenario identity/pressure/workspace/output root, assess returned `AgentAttempt` values centrally, and fail closed when retained artefacts are unsafe or altered.

## stop conditions

- The contract needs expected answers, provider flags, transcript parsing, session handles, or sandbox enforcement.
- Adapter metadata is used as automatic proof of capability or isolation.
- A live provider or credential is required for the shared runner tests.
- The runner changes the canonical assessor or scenario manifest.

## verdict

proceed

## rationale

This is a bounded, provider-free seam that makes the next adapter implementations less likely to leak vendor assumptions into the evaluation kernel. It remains experimental and does not advance the provider execution or comparison gates.
