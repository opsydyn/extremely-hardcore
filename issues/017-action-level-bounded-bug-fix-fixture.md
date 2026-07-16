# issue: implement the action-level bounded bug-fix fixture

## outcome

Add one provider-neutral, two-stage fixture runner that scores a bounded Bun/TypeScript bug fix, a required passing test, stale-evidence invalidation, fresh evidence, and one valid guarded completion.

## acceptance criteria

- A clean fixture starts with one deterministic failing test and contains a documented one-file source-change boundary.
- The runner copies fixture assets to a caller-selected new output root, creates a Git baseline, and invokes `fix` then `resume` staged executors.
- It rejects forbidden agent diffs and verifies the exact harness-owned stale-marker mutation.
- It requires valid Stage A evidence, proves it stale after intervention, then requires fresh Stage B evidence and exactly one valid completion transition.
- A reference executor dogfoods a passing run without any provider call.
- Focused failure tests, project checks, full suite, typecheck, and a completion-gate run pass.

## non-goals

- Provider execution, declared-mode comparison, transcript scoring, retry policy, benchmark claims, CI thresholds, or protocol-schema changes.
