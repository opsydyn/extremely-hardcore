# issue: real operator dogfood computed Effect boundary

## objective

Complete the ninth real operator dogfood run by fixing the literal computed
Effect execution false negative in `effect-oxlint` and recording evidence from
the isolated target worktree.

## scope

- Recognize static string computed Effect members in the existing internal
  predicate.
- Add direct rule and real Oxlint CLI regression coverage.
- Run the target package verification and EHS completion gate.
- Preserve the standalone EHS boundary and dynamic-key limitation.

## done when

- The red test demonstrates the old bypass.
- The green unit and CLI regressions pass.
- Full target verification is captured against one committed workspace.
- The EHS run is valid with all criteria covered and no blockers.
- The target change and EHS records are separately committed after review.

## not done when

- Dynamic property inference is added.
- Exported rule or config APIs change.
- The target is claimed to provide runtime, provider, sandbox, or network
  enforcement.
- Fixture-only lint failures are hidden.

## status

in progress
