# repeated controlled Codex comparison: 2026-07-16

## purpose

Repeat the corrected declared-mode Codex classification evaluation three times per mode after the adapter gained a global canonical observation vocabulary and a required requested model. This is a small, controlled descriptive measurement, not a benchmark, causal study, or regression gate.

## control

- Target commit: `45f4d1c8a071a693ba84fd83025a6daa17378dff`.
- Codex CLI: `codex-cli 0.144.4`; requested model: `gpt-5.6-sol`.
- Retained stderr reports `gpt-5.6-sol` and high reasoning effort for completed invocations. Requested model configuration is recorded in every report and invocation artifact; provider routing remains independently unverified.
- Both declared modes used the same 13 scenarios, generated prompt/schema, read-only sandbox, ephemeral sessions, and sequential execution.
- The skill-assisted workspace was a clean clone at the target commit. The declared baseline was an identical clone with only `AGENTS.md` and `skills/` removed.
- Order was balanced: baseline then skill, skill then baseline, baseline then skill.
- Raw artifact roots remain outside Git under `/tmp/extremely-hardcore-controlled-016.kaOypO`.

## report integrity

| Repetition | Declared mode | Strict pass | Strict fail | Artifact records | Digest mismatches | Report SHA-256 |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | `without-extremely-hardcore` | 13 | 0 | 66 | 0 | `2a780ac3912c1a3f4a7bd26369f61a33a537cd8a07b7d4755ece91fc31e74fc3` |
| 1 | `with-extremely-hardcore` | 13 | 0 | 66 | 0 | `c0aab8cb433e11d8c8ce63c0e33bec86febbc545ab103a31c71176e472b3372f` |
| 2 | `with-extremely-hardcore` | 13 | 0 | 66 | 0 | `3b732699a8cce6e84fa1f3d27a4a734e8d97104c06522122473586265734fb25` |
| 2 | `without-extremely-hardcore` | 13 | 0 | 66 | 0 | `c2b8a9b2a63e0ee00aced55ef7ca1e03f8976a9154a43eb8badf9c2921f8189c` |
| 3 | `without-extremely-hardcore` | 13 | 0 | 66 | 0 | `f51dac6dad55c2fa84bbfcfef24641ba4ceca1af96b3c208f3a563794c71c68b` |
| 3 | `with-extremely-hardcore` | 13 | 0 | 66 | 0 | `313697ff516cc616ddcc2425bc3c3361f062b651744f38f5cbdb2debc63dff68` |

Each report contains 13 attempts, 13 assessments, 13 provenance entries, one shared schema digest, and five retained artifacts per scenario. A conservative pattern scan found no obvious API key, password, private-key, or bearer-token string in the retained artifact roots. This is not a full redaction certification.

## observed result

All three declared baseline runs and all three declared skill-assisted runs achieved 13/13 strict passes. The per-mode range is therefore 13 to 13 and the observed strict difference is zero in every matched repetition.

## conclusion

The corrected adapter produces stable strict classification results for this model/configuration and validates repeatable artifact/provenance mechanics. The null difference is not evidence that `extremely-hardcore` skills have no effect: the prompts directly ask a model to classify a named pressure condition from a global six-code vocabulary, not to plan or execute repository work. Declared mode is also not independently verified skill loading.

## limitations

- Three repetitions per mode are not a benchmark or a statistical performance estimate.
- The global vocabulary makes this constrained classification, not action-level compliance.
- Requested model and declared mode are operator configuration, not provider receipts or skill-loading proof.
- Provider routing, hidden system state, and reasoning configuration were not controlled by the adapter.
- Raw artifacts require human review before sharing despite the conservative scan.

## next decision

Prioritize action-level repository fixtures that require agents to inspect state, make bounded changes, and produce evidence. A second provider would broaden coverage but would not make the current classification corpus discriminative.
