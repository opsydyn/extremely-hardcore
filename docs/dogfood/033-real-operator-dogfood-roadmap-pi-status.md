# Real Operator Dogfood Run 1: roadmap Pi status

## purpose

Exercise the EHS protocol on a real non-trivial repository change: correct the stale Pi provider status in `ROADMAP.md` using already-retained live evidence, then complete the change through fresh evidence and the guarded completion transition.

## change

- **Change type:** Documentation/status correction
- **Risk lane:** Standard
- **Run:** `.extremely-hardcore/runs/033-real-operator-dogfood-roadmap-pi-status/`
- **Source commit before change:** `ef8abd1`

The roadmap now records the authenticated Pi 0.84.1 evidence, the first 12/13 post-auth report, the adjudicated 13/13 bounded repeat, and the limits against comparison, provider-performance, and containment claims.

## protocol path

1. Created a real run definition with four acceptance criteria before editing.
2. Applied the bounded `ROADMAP.md` correction.
3. Captured fresh roadmap-content, validation, full-test, and typecheck evidence.
4. Initial validation exposed a `risk.mismatch`: two medium factors classified the run as high while the declaration was standard.
5. Reclassified uncertainty from medium to low based on the directly retained evidence; the run then validated as standard.
6. Completed `implemented -> complete` with transition `36d905fb-ff1d-4c9b-abd4-ee82eae29704`.
7. Generated summary, attestation, and CI artifacts.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 4/4 covered |
| Open blockers | 0 |
| Completion validation | Valid at capture time |
| False blocks remaining | 0 |
| Friction events | 1 risk metadata mismatch, resolved without source-scope expansion |
| Workarounds | 1 explicit risk-assessment correction |
| Manual setup timing | Not separately instrumented in this run |
| Captured command time | 10.0 seconds across roadmap assertion, validation, tests, and typecheck |
| Fresh-agent readability | Good: status exposed the failing gate first, then showed `request the guarded completion transition`; summary exposed state, risk, coverage, blockers, validation, and next action |

## retained outputs

- Run artifacts: `.extremely-hardcore/runs/033-real-operator-dogfood-roadmap-pi-status/`
- Attestation: `/tmp/extremely-hardcore-dogfood-033-attestation.json`
- CI artifacts: `/tmp/extremely-hardcore-dogfood-033-ci/`

## limitations

This is one real documentation change, not operational-release evidence. It does not measure agent quality, provider performance, sandbox enforcement, network isolation, containment, or skill effect. The run's evidence was valid at the completion workspace fingerprint; later tracked changes, including this record, are separate workspace changes and require fresh evidence for a new run.

## next

Run 2 should be a real bounded bug fix in a repository with a meaningful targeted test. Instrument manual setup and review time explicitly, and deliberately exercise stale evidence or a real blocker in a later campaign run.
