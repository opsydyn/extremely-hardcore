# Real Operator Dogfood Run 4: minimum complete change heuristic

## purpose

Exercise the EHS protocol on a real documentation change that adds a minimum-complete-change decision to the standalone `change-contract` skill and template. Also exercise the existing `needs-human-decision` handoff without changing lifecycle or status behaviour.

## change

- **Change type:** Skill guidance and template documentation
- **Risk lane:** Standard
- **Run:** `.extremely-hardcore/runs/036-minimum-complete-change-heuristic/`
- **Working-tree baseline:** Run 2 and Run 3 remain intentionally uncommitted on `master`; Run 4 preserves them and adds only the named skill, template, governance, and dogfood records.

The implementation adds one required decision, one procedure check, one quality guard, one failure mode, and one matching template section. It does not add runtime, schema, command, hook, mode, or scoring behaviour.

## protocol path

The completed path was:

1. Created a standard-risk run with six acceptance criteria.
2. Recorded `implemented -> needs-human-decision`; status exposed `record the required human decision or abandon the run`.
3. Recorded the approved bounded decision and resumed with `needs-human-decision -> implemented`.
4. Captured final content, validation, test, typecheck, and diff evidence after sealing these records.
5. Validated, completed, summarized, attested, and generated CI artefacts.

## operator timing

Wall-clock checkpoints were captured with the host `date` command:

| Phase | Checkpoint | Observed interval |
| --- | --- | --- |
| Status path and human-decision handoff | `2026-09-02T07:22:51.3Z` start/end checkpoints | Under one second at displayed precision |
| Final repository checks | `2026-09-02T07:23:51.3Z` to `2026-09-02T07:24:01.3Z` | 10.0 seconds |

These are operator wall-clock checkpoints, not isolated process runtimes.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 6/6 covered |
| Open blockers | 0 |
| Completion validation | Valid at final capture fingerprint |
| False blocks | 0 |
| Deliberate red phase | 1 expected pre-change content assertion failure |
| Workarounds | 0; no source or protocol bypass used |
| Fresh-agent readability | Good: the `needs-human-decision` status exposed the required decision, and the existing resume transition remained the next legal action |

## retained outputs

- Run artifacts: `.extremely-hardcore/runs/036-minimum-complete-change-heuristic/`
- Attestation: `/tmp/extremely-hardcore-dogfood-036-attestation.json`
- CI artifacts: `/tmp/extremely-hardcore-dogfood-036-ci/`

## limitations

This is the fourth real operator change in the ten-run campaign, not release evidence. It does not establish token, cost, provider, agent-quality, containment, sandbox, network-isolation, or skill-effect claims. The content assertion checks presence of the guidance, not whether an agent will always apply it well.

## next

Choose the next real operator change after a deliberate commit boundary. Keep the remaining campaign focused on operational evidence rather than adding automation speculatively.
