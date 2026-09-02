# Real Operator Dogfood Run 3: resolved blocked status next action

## purpose

Exercise a real bounded protocol bug fix through an actual blocker pause and resume. The defect was found in the EHS status projection: a blocked run whose blocker was resolved still instructed the operator to resolve it again.

## change

- **Change type:** Bounded protocol bug fix
- **Risk lane:** Standard
- **Run:** `.extremely-hardcore/runs/035-status-resolved-blocked-next-action/`
- **Working-tree baseline:** Run 2 remains intentionally uncommitted on `master`; Run 3 preserves it and adds only the named status/test/governance changes.

The implementation splits one status condition. The regression creates a real Git-backed run, records `implemented -> blocked`, observes the open-blocker handoff, marks the blocker resolved, observes the corrected resume handoff, and records `blocked -> implemented`.

## operator timing

Wall-clock checkpoints were captured with the host `date` command:

| Phase | Checkpoint | Observed interval |
| --- | --- | --- |
| Setup, inspection, contract, challenge, run definition, regression, and operator path | `2026-08-18T21:31:53.3Z` to `2026-08-18T21:34:40.3Z` | 167.0 seconds |
| Full repository verification completed | `2026-08-18T21:35:00.3Z` | 20.0 seconds after the operator path |

These are wall-clock checkpoints including reasoning and file inspection, not isolated process runtimes. The full repository test command reported 10.74 seconds; final protocol evidence retains command-level durations.

## protocol path

1. Created a standard-risk run with six acceptance criteria and one open blocker before the final evidence phase.
2. Recorded the public-output decision challenge with a `proceed` verdict and no-ADR architecture decision.
3. Added the resolved-blocker regression before implementation.
4. Confirmed the focused test failed because the old code returned the open-blocker action after resolution.
5. Changed only the blocked branch in `getNextAction`.
6. Ran the real CLI path: initial status, `implemented -> blocked`, blocked status, blocker resolution, resolved-blocked status, and `blocked -> implemented`.
7. Ran repository validation, full tests, TypeScript, and diff checks.
8. The first inline lifecycle evidence command hit shell quoting and exited before Bun ran; the same criterion was recaptured with safe quoting.
9. Captured fresh evidence for all six criteria and completed the run through the guarded transition.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 6/6 covered |
| Open blockers | 0 at completion |
| Completion validation | Valid at final capture fingerprint |
| False blocks | 0; the deliberate blocker was resolved and resumed through the existing path |
| Deliberate red phase | 1 expected focused-test failure before implementation |
| Workarounds | 1 command-quoting correction; no source or protocol bypass used |
| Fresh-agent readability | Good: status exposed resolve while open and resume-or-abandon after resolution |

## retained outputs

- Run artifacts: `.extremely-hardcore/runs/035-status-resolved-blocked-next-action/`
- Attestation: `/tmp/extremely-hardcore-dogfood-035-attestation.json`
- CI artifacts: `/tmp/extremely-hardcore-dogfood-035-ci/`

## limitations

This is the third real operator change in the ten-run campaign, not release evidence. It does not establish provider performance, agent quality, containment, sandbox enforcement, network isolation, or a skill effect. The substantive review decision was represented by a declared blocker status; the protocol does not independently verify that human decision.

## next

Run 4 should exercise `needs-human-decision` explicitly, including the status handoff before and after the decision, while preserving the current lifecycle and evidence boundaries.
