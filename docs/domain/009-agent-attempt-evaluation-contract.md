# domain map: agent-attempt evaluation contract

## terms and ownership

| Term | Owner | Rule |
| --- | --- | --- |
| Scenario manifest | Evaluation core | Declares stable IDs, categories, and expected error codes. |
| Agent attempt | Future adapter | Reports structured observations for one scenario. |
| Attempt assessment | Evaluation core | Compares declared expectations to observed codes. |
| Agent identity | Adapter | Names the harness and agent without adding provider semantics to core. |
| Transcript or raw artefact | Future adapter | Is intentionally outside this first contract. |

## invariants

- An attempt cannot pass for an unknown scenario.
- An attempt passes only when every expected error code is observed.
- The assessor does not infer facts from prose or trust an attempt as tamper-proof provenance.

## boundaries

Evaluation core owns scenario expectations and comparison. Adapters own model invocation and raw artefacts. The protocol remains independent of both.

## ambiguity retained

Transcript retention, evidence provenance, retry semantics, and cross-agent scoring are deferred until an adapter exists.
