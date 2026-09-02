# Real Operator Dogfood Run 2: stale completed status next action

## purpose

Exercise a real bounded source bug fix with a meaningful targeted regression test. The defect was found in the EHS status projection itself: a completed run with stale current evidence recommended handoff instead of a fresh run.

## change

- **Change type:** Bounded protocol bug fix
- **Risk lane:** Standard
- **Run:** `.extremely-hardcore/runs/034-status-stale-completed-next-action/`
- **Source state:** clean `master` at commit `2529ff9` before this slice; the working tree then contained only this slice's source and governance changes.

The implementation changes one conditional in `protocol/status.ts`. The regression creates a completed run, mutates a real tracked file, recomputes the workspace fingerprint, and asserts that status remains terminal but directs the operator to start a fresh run. The existing valid-completed handoff assertion remains in the same test file.

## operator timing

Wall-clock checkpoints were captured with the host `date` command rather than inferred from prose:

| Phase | Checkpoint | Observed interval |
| --- | --- | --- |
| Setup, inspection, contract, challenge, and run definition | `2026-08-18T21:22:32.3Z` to `2026-08-18T21:24:49.3Z` | 137.0 seconds |
| Test-first implementation and focused/full verification | `2026-08-18T21:24:49.3Z` to `2026-08-18T21:25:29.3Z` | 40.0 seconds |
| Diff review checkpoint | `2026-08-18T21:25:29.3Z` to `2026-08-18T21:26:27.3Z` | 58.0 seconds |

These are operator wall-clock checkpoints, including reasoning and file inspection, not isolated process runtimes. The full repository test command itself reported 10.90 seconds; protocol evidence retains command-level durations for the final run.

## protocol path

1. Created a standard-risk run with five acceptance criteria before editing.
2. Recorded the public-output decision challenge with a `proceed` verdict and no-ADR architecture decision.
3. Added the stale completed regression before implementation.
4. Confirmed the focused test failed because the old code returned `review the attestation and hand off the completed run`.
5. Changed only the completed branch in `getNextAction`.
6. Confirmed the focused regression passed, then ran repository validation, tests, TypeScript, and diff checks.
7. Captured fresh evidence for the five criteria and completed the run through the guarded transition.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 5/5 covered |
| Open blockers | 0 |
| Completion validation | Valid at final capture fingerprint |
| False blocks | 0 |
| Deliberate red phase | 1 expected focused-test failure before implementation |
| Workarounds | 0; no source or protocol bypass used |
| Fresh-agent readability | Good: a stale completed run now receives an explicit fresh-run action, while validation errors remain available for diagnosis |

## retained outputs

- Run artifacts: `.extremely-hardcore/runs/034-status-stale-completed-next-action/`
- Attestation: `/tmp/extremely-hardcore-dogfood-034-attestation.json`
- CI artifacts: `/tmp/extremely-hardcore-dogfood-034-ci/`

## limitations

This is the second real operator change in the ten-run campaign, not release evidence. It does not establish provider performance, agent quality, containment, sandbox enforcement, network isolation, or a skill effect. No downstream consumer or external agent was run against the changed message.

## next

Run 3 should be another real code change that records and resolves a blocker or human decision, so the campaign tests a non-stale handoff path as well as evidence freshness.
