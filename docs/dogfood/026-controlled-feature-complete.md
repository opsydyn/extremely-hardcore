# Controlled Dogfood Run 026: V0 feature-complete mechanics

## purpose

Exercise the new lifecycle, approval, status, attestation, and evaluation paths without invoking an external provider or writing to the repository checkout.

## command

```bash
bun run dogfood
```

## result

| Case | Change type | Risk | Expected path | Result |
| --- | --- | --- | --- | --- |
| feature | Feature | standard | evidence -> complete | Passed |
| bug-fix | Bug fix | standard | evidence -> complete | Passed |
| refactor | Refactor | standard | evidence -> complete | Passed |
| dependency-change | Dependency change | standard | evidence -> complete | Passed |
| persistence-change | Persistence change | high | missing approval -> approval -> complete | Passed |
| ci-change | CI change | standard | evidence -> complete | Passed |
| stale-refresh | Stale verification | standard | stale rejection -> recapture -> complete | Passed |
| blocked-resume | Blocked work | standard | blocked -> resolve -> resume -> complete | Passed |
| high-risk-approval | High-risk change | high | missing approval -> approval -> complete | Passed |
| abandoned | Abandoned change | standard | implemented -> abandoned | Passed |

Aggregate: 10 total, 10 passed, 0 failed, 0 false blocks.

## observed value

- High-risk completion cannot bypass a missing or stale approval.
- A blocked run cannot resume while its blocker remains open.
- Stale evidence is rejected and can be refreshed before completion.
- Terminal abandonment is durable and cannot be advanced.
- The harness records protocol interaction counts as a bounded friction proxy.

## limitations

These are controlled temporary Git repositories, not real operator changes. The report does not measure human setup time, agent quality, provider behaviour, command ownership, sandbox enforcement, or network isolation. Ten real repository changes remain required before an operational release claim.
