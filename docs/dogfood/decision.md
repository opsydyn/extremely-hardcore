# Dogfood decision: proof-carrying completion gate

## sample

| Run | Change type | Outcome | Key result |
| --- | --- | --- | --- |
| 1 | Feature | Complete | Captured evidence and appended the first completion transition. |
| 2 | Bug fix | Complete | Missing evidence records became structured validation failures. |
| 3 | Refactor | Complete | Shared test infrastructure completed with no runtime change. |
| 4 | Stale verification | Complete after refresh | The gate rejected three stale proofs after a real workspace change. |
| 5 | High-risk blocker | Abandoned | The gate rejected an unapproved schema-stability declaration. |

## observed value

- Completion claims are mechanically tied to exact commands, logs, and workspace fingerprints.
- Missing persisted artefacts and stale proof are classified clearly enough for a fresh agent to act.
- An open blocker stops completion even when the agent can edit local files.

## observed limits

- All completed runs were self-hosted in this repository; cross-agent and cross-repository reliability is still unmeasured.
- Evidence capture and refresh add operational friction that has not been timed rigorously.
- V1 lacks human approval and abandonment events, so high-risk governance remains partly documentary.
- Malformed record content and non-ENOENT filesystem failures remain unclassified.

## decision

Proceed to Milestone 2, the behavioural evaluation harness, while keeping schema version 1 explicitly experimental. Do not declare schema compatibility stable, add CI attestation, or build a broader lifecycle FSM until pressure scenarios show that the completion gate improves behaviour across agents and repositories.

## first evaluation requirement

The evaluation harness must include at least one scenario for each observed gate behaviour: uncovered criteria, failed commands, stale evidence, missing evidence record, missing log, open blocker, and attempted completion from an already complete run.
