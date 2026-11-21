# Blackbelt: Delivery-Flow Playbook

Opt in when real changes compete for review or verification time. Blackbelt is
for the delivery operator, not an extra coding skill. Use existing PRs, CI and
handoffs. It grants no permission to dispatch agents, change gates, merge,
deploy or release. Stop using it when there is no shared capacity decision.

## Lean Operating Model

Blackbelt adapts lean production to delivery work. Just-in-time and Kanban mean
pulling against downstream capacity; heijunka means balancing around the review
or verification bottleneck, not keeping every agent busy. Jidoka and andon mean
stopping promotion and making the blocker visible. Poka-yoke and kaizen mean
preventing repeat mistakes with durable checks and improving from observed
failures. Standardised work gives each handoff a predictable shape without
prescribing every step. The pilot limit below is tunable, not a universal rule.

## Run The Queue

1. **Reserve verification before pulling work.** In the existing handoff, name
   the change owner, independent verifier, exact head/base or artifact digest,
   required checks and review window. Check target-environment prerequisites
   before handoff. Pilot limit: two changes in review or verification, with one
   active independent review at a time. If full, unblock or finish before pulling.
2. **Promote only verified revisions.** An absent, pending or failed required
   check stops promotion, not authorised diagnosis. Name the affected revision,
   failed or missing check, next action and owner. Recheck after head, base or
   artifact changes. Turn material reproducible mistakes into durable checks;
   never bypass review, policy, or an environment blocker to get a green result.
3. **Record the decision in place.** Note ready and review-start times, the
   first verification verdict, rework and the decision that changed (or did
   not). Reuse PR/CI timestamps where they actually measure the relevant event;
   record missing evidence as unknown. Count coordination time and note escaped
   defects if observed. No additional receipt or dashboard.

## First Pilot Pair

Both FoldKit PRs were open and non-draft on 2026-11-21, targeting `f95039b`. This
is an observed overlap in available review work, not a booked reviewer window.
Confirm one shared verifier and the next window with the owners before pulling
either. Observe from enrollment onward; do not score earlier events as pilot work.

| Existing change | Verification question | Observed at selection |
| --- | --- | --- |
| [FoldKit #186](https://github.com/opsydyn/fold-kit-experiments/pull/186), preserve staging pilot configuration | Does the change preserve the existing service references and guards, and pass the required checks on the exact head? | `f8bf0e4`; hosted `check` in progress. |
| [FoldKit #185](https://github.com/opsydyn/fold-kit-experiments/pull/185), generated Zloz v0.8.0 release PR | Do the coordinated package versions and changelogs agree, and is the exact release PR head verified? | `673dc1e`; no hosted checks visible. Hold promotion. |

Proposed pull order: give #186 the first independent review slot while #185's
owner establishes its check path. If evidence changes, reconsider the order.
Use read-only review for this pilot window; do not trigger a deploy, release,
merge, or rerun. No reviewer was booked and no PR was changed by selection.

**Enrollment recheck (2026-11-21): blocked, 0 pilot cases.** #186 merged at
17:10 London time before enrollment. #185 was the only remaining open FoldKit
PR, with no hosted checks or review assignment visible. Do not count #186
retroactively or treat #185 as verified. Wait for another eligible open change,
then confirm the shared verifier and the new review window before pulling either.

**Shared read-only window (2026-11-21):** the operator approved one Codex review
slot for #187 first, then #185. No PRs or checks were changed.

- [#187](https://github.com/opsydyn/fold-kit-experiments/pull/187), head `e4387ff`
  and reported base `cfacedf`: source review found no blocker in the reviewed
  confirmed-version and loss-acknowledgement paths. The browser regression covers
  stale approval and downloaded bytes. **Hold promotion:** GitHub reported
  `BEHIND` and [the primary check](https://github.com/opsydyn/fold-kit-experiments/actions/runs/44939392163/job/136953040383)
  was pending. Next owner action is to refresh against the current base via the
  normal workflow and verify that revision. Staging was not verified here.
- #185, head `87babac` and reported base `cfacedf`: by the second slot it had
  merged at 19:23 London time. Four package and release-manifest versions, three
  adapter peer versions, and four changelog headings agree on `0.8.0`.
  [CI](https://github.com/opsydyn/fold-kit-experiments/actions/runs/44938966294)
  passed on that head. Retrospective only; no claim about publishing or registry
  state, and not a pre-promotion pilot result.

**Queue decision:** release the independent review slot while #187 waits for
CI and a current base; do not start more work just to keep it busy. Treat #185
as closed, not a second live case. The overlap could not be completed as planned.
Exact ready-to-review wait and first-pass verdict for #187 are unknown.

## Decide After The Pilot

Review after two weeks or six real changes, whichever comes first. Compare with
recent similar work descriptively; do not claim causality. Keep Blackbelt only
if a recurring constraint changes a useful decision more than once without
weaker checks or material reporting overhead. Otherwise keep the useful checks
and park expansion. The prior three handoff observations are not pilot cases.
