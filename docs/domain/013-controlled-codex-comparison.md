# domain map: controlled Codex comparison

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Controlled baseline workspace | Temporary clone of the target commit with agent instructions and skills removed. | Evaluation operator |
| Skill-assisted workspace | Clean target checkout with its existing agent instructions and skills. | Evaluation operator |
| Mode declaration | Adapter metadata selected by the operator. | Evaluation operator |
| Raw artifact set | Adapter output retained outside the repository. | Evaluation operator |
| Comparison record | Bounded summary of two inspected reports. | Evaluation operator |

## candidate bounded contexts

- The Codex adapter owns scenario execution and artifact generation.
- The operator owns workspace preparation and comparison validity.
- The repository owns only the durable contract and a redacted operational summary.

## policies/rules

- Both workspaces start at the same commit.
- Only the baseline workspace removes `AGENTS.md` and `skills/`.
- Both runs use the existing read-only, ephemeral adapter with the same CLI version.
- The comparison states observed results, not causal attribution or benchmark quality.

## invariants

- Raw artifacts never enter the tracked repository.
- A missing or invalid report blocks the comparison record.
- Artifact hashes must match their report records before summary.

## external systems

The authenticated local Codex CLI and temporary local filesystem directories.

## ambiguity

The precise degree to which Codex loads or follows local instructions is not independently observable from adapter mode. Repetition, prompt controls, and a second provider remain deferred.

## recommended next questions

What minimum repeat count and redaction rules are necessary before a public comparison is defensible?
