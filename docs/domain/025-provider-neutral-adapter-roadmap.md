# domain map: provider-neutral agent adapter roadmap

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Agent adapter | Leaf integration that maps one provider runtime to the shared evaluation request and report surface. | Repository/provider boundary |
| Capability descriptor | Explicit observed or declared support for read-only work, writes, structured output, resume, network controls, and containment. | Adapter evidence |
| Execution request | Provider-neutral scenario or fixture request sent to an adapter. | Evaluation core |
| Provider artefact | Raw provider-owned prompt, output, event, stderr, or invocation record. | Adapter |
| Claim level | Boundary between requested, observed, attested, and unproven behaviour. | Evidence ledger |

## candidate bounded contexts

- Protocol owns state, criteria, transitions, and evidence validity.
- Evaluation owns scenarios, scoring, and provider-neutral result semantics.
- Each provider adapter owns command/session mapping and raw artefacts.
- Runtime containment owns filesystem/network enforcement evidence.
- Human review owns comparison, release, and irreversible-risk decisions.

## aggregates/entities/value objects

- `AgentAdapter` boundary.
- `CapabilityDescriptor`.
- `ExecutionRequest`.
- `ProviderAttempt`.
- `ProvenanceRecord`.

## commands

- Describe adapter capabilities.
- Execute one read-only scenario.
- Retain raw provider artefacts.
- Map structured observations into the shared assessment vocabulary.

## events

- Adapter preflight completed.
- Attempt started.
- Provider artefacts retained.
- Attempt classified.
- Provenance accepted or rejected.

## policies/rules

- Provider-specific behaviour remains in leaf adapters.
- The evaluator remains the scorer.
- Provider output is not containment proof.
- Missing or unknown capability is not treated as support.
- Writable execution requires separate containment evidence.

## invariants

- Existing protocol records remain provider-neutral.
- Every adapter attempt identifies provider and runtime version.
- Raw artefacts are retained and digest-checked.
- A comparison requires repeated controlled runs and an approved regression policy.

## external systems

- Claude runtime/CLI.
- Pi runtime/CLI.
- Codex CLI.
- Docker/Colima or another accepted execution boundary.

## integration points

Future adapters would sit under `evaluation/` and depend on the protocol-neutral scenario and assessment modules. No imports or integration flow changes are made in this roadmap slice.

## ambiguity

Claude and Pi command, session, output, resume, and sandbox capabilities have not been locally verified. The adapter contract must not assume parity until those facts are observed.

## recommended next questions

After V0 completion, what is the smallest read-only Claude or Pi adapter that can produce independently retained artefacts without changing the scorer?

