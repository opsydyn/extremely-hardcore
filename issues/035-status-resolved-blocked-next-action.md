# Status asks to resolve a blocker that is already resolved

## problem

After a blocked run's blocker is marked resolved, but before the run records `blocked -> implemented`, `eh status` still returns `resolve the open blocker, then resume or abandon the run`. The blocker count is zero and the existing lifecycle permits resumption.

## impact

A fresh operator can follow a contradictory handoff and repeat a completed resolution step instead of recording the legal resume transition. This makes the blocker path harder to operate and obscures whether the run is actually waiting on work.

## expected behaviour

While `state` is `blocked`:

- with one or more open blockers, direct the operator to resolve the blocker;
- with zero open blockers, direct the operator to resume or abandon the run.

## scope

One branch split in `protocol/status.ts`, one regression test, and one real Run 3 lifecycle exercise. No change to lifecycle legality, blocker schema, validation, or CLI shape.

## verification

The focused test must fail before the correction, pass after it, and the real run must record block, resolution, status inspection, resume, fresh evidence, and completion.
