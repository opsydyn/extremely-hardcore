# Completion-gate dogfood

This directory records real use of the proof-carrying completion gate. A run counts only when it corresponds to a non-trivial repository change and preserves its `.extremely-hardcore/runs/<change-id>/` evidence directory.

Each record states the change type, risk, captured commands, gate behaviour, setup overhead, friction, fresh-agent readability, and any workaround. Failed or abandoned runs remain records; they are not erased to improve the headline result.

## Required sample

| Run | Required change type | Status |
| --- | --- | --- |
| 1 | Feature | Complete |
| 2 | Bug fix | Complete |
| 3 | Refactor or dependency change | Complete |
| 4 | Change made stale during verification | Complete |
| 5 | Real blocker or rejected completion | Pending |

Do not start the behavioural evaluation harness until all five records exist and their aggregate decision is recorded.
