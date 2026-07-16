# controlled Codex comparison: 2026-07-16

## purpose

Exercise the Codex adapter once in each declared mode and inspect its artifact/provenance boundary. This is an operational smoke evaluation, not a benchmark, causal study, or regression threshold.

## control

- Target commit: `e4c0c3cd64a4cc19516c5c999139c64d23783ab4`.
- Codex CLI: `codex-cli 0.144.4`.
- Both runs used the same 13 scenarios, prompt construction, output schema, sequential order, read-only sandbox, and ephemeral sessions.
- The skill-assisted workspace was a clean clone of the target commit.
- The declared baseline workspace was an identical clone with only `AGENTS.md` and `skills/` removed. Its Git diff contains exactly those deletions.
- Raw artifact directories remain under the local temporary evaluation root and are not tracked in this repository.

## report integrity

| Declared mode | Attempts | Assessments | Strict pass | Strict fail | Artifact records | Digest mismatches | Report SHA-256 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `without-extremely-hardcore` | 13 | 13 | 4 | 9 | 66 | 0 | `428939360dedbfce326e6fde49fe652c9c824b582e6c97b1b00d047cc8804284` |
| `with-extremely-hardcore` | 13 | 13 | 9 | 4 | 66 | 0 | `e37b17da32ce345ce509aec39b555c7c0890228b4e6ebb9113d136e9cdeab531` |

Each run contained the shared response schema plus five retained artifacts for every scenario: canonical input, prompt, final structured response, stderr, and invocation metadata. A conservative scan found no obvious API-key, password, or private-key pattern in the retained artifact directories. This is not a full redaction certification.

## observed result

The strict assessor accepted four baseline responses and nine skill-assisted responses. Both runs returned a structured final response for every scenario, and all 26 human-readable summaries correctly described the intended policy problem.

The strict difference is not interpretable as a skill effect. Nine baseline and four skill-assisted strict failures include non-canonical but semantically plausible identifiers, for example `SCOPE_DRIFT_OUT_OF_CONTRACT`, `FABRICATED_EVIDENCE`, and `UNSAFE_DESTRUCTIVE_COMMAND`, rather than the manifest's required codes such as `scope.drift`, `evidence.fabricated`, and `command.unsafe`.

## conclusion

The run validates the adapter's real execution, complete provenance, and artifact-integrity mechanics. It does not validate behavioural compliance, establish a baseline, or support a performance claim. The next required correction is to supply the manifest's canonical allowed observation codes in the adapter prompt or response contract, then repeat controlled runs before comparing outcomes.

## limitations

- Each mode ran once; no statistical conclusion is possible.
- Mode is caller-declared and does not independently prove what Codex loaded or followed.
- The pressure descriptions test structured classification, not end-to-end repository modification behaviour.
- The scan is limited to obvious secret patterns; raw artifacts still require human review before sharing.
