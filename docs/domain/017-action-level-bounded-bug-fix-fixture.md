# domain map: action-level bounded bug-fix fixture

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Fixture asset | Tracked task files copied into one temporary Git workspace. | Evaluation fixture |
| Staged executor | Provider-neutral callback that acts during `fix` or `resume`. | Evaluation adapter |
| Stage A evidence | Passing required-test evidence captured after the permitted source fix. | Staged executor through protocol |
| Stale marker | Exact tracked mutation made only by the harness between stages. | Fixture runner |
| Stage B evidence | Replacement passing evidence captured after the marker mutation. | Staged executor through protocol |
| Action fixture result | Machine-readable score from workspace, protocol artifacts, and snapshots. | Fixture runner |

## candidate bounded contexts

- Fixture assets define task, test oracle, permitted source path, and marker baseline.
- Fixture runner owns workspace creation, snapshots, stage sequencing, diff policy, and result assembly.
- Existing protocol owns evidence capture, fingerprint validation, and completion transition authority.
- Staged executors own work performed during each stage but do not own scoring semantics.

## policies/rules

- The agent may change `src/release-label.ts`; tests, package metadata, and `FIXTURE.md` are read-only.
- The harness changes only `fixture-state.txt` from its declared baseline to its declared stale value.
- Stage A must leave no completion transition and must contain valid passing evidence for `required-test-passes`.
- Stage B must replace that criterion's evidence after marker mutation and append exactly one valid completion transition.
- The final source must return `release:${name.trim()}` for the fixture's required test input.

## invariants

- Fixture initial test fails before the executor fixes the source.
- Every output root has one Git workspace and one retained `report.json`.
- Stage A agent diff is only `src/release-label.ts` plus `.extremely-hardcore/**`.
- Final non-protocol diff is exactly `src/release-label.ts` and `fixture-state.txt`.
- Stage A evidence is stale after intervention; final criterion evidence is fresh at the transition fingerprint.

## external systems

Local Bun executes the fixture test; local Git establishes workspace state and fingerprints. No provider is invoked.

## ambiguity

The reference executor establishes harness correctness only. Provider adapters and comparison policy remain deferred.

## recommended next questions

After the local fixture is dogfooded, what staged provider contract can execute it without interpreting model prose?
