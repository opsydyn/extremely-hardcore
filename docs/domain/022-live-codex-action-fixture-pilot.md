# domain map: live Codex action-fixture pilot

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Live pilot | One non-retried external Codex execution of the experimental adapter. | Operator |
| Requested configuration | Model and CLI flags recorded before process launch. | Adapter |
| Provider artefact bundle | Raw stage prompt, invocation metadata, stdout, stderr, and optional final message. | Adapter |
| Fixture result | The runner's independent staged score. | Fixture runner |
| Provenance status | Adapter integrity result for retained artefacts, distinct from fixture status. | Adapter |

## candidate bounded contexts

- Operator control owns one-attempt policy and result interpretation.
- Codex owns external execution semantics.
- Adapter owns provider artefact retention.
- Fixture runner and fixture protocol own scoring and protocol records.

## commands

- Inspect local Codex availability and login status.
- Run one Codex action-fixture evaluation.
- Inspect retained report and artefact inventory.

## events

- Pilot requested.
- Provider stages invoked or rejected.
- Fixture scored.
- Provider artefact integrity assessed.

## policies/rules

- Exactly one attempt and no retry.
- Fixture status and provenance status are reported separately.
- Raw output is not a scoring signal or identity proof.
- A failed attempt is evidence, not an invitation to mutate the implementation during the pilot.

## invariants

- No source change occurs in the repository checkout; only the copied temporary fixture workspace is writable.
- The output directory remains local and is not shared.
- No claim exceeds the recorded report and artefact inspection.

## external systems

Local Codex CLI and its provider service. Their network, routing, authentication, and sandbox implementation remain outside repository control.

## integration points

The existing adapter invokes Codex and writes an isolated temporary output bundle. No code or protocol integration changes occur in this pilot.

## ambiguity

The exact semantics and completeness of raw provider event output remain unverified and are not interpreted automatically.

## recommended next questions

After the pilot, does the observed result justify a second provider or repeated-run design, or does it expose a defect requiring a new bounded fix slice?
