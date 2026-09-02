# decision challenge: resolved blocked status next action

## trigger

The proposal changes an observable CLI status action in the public handoff contract. It must remain a projection correction and must not turn a blocker dogfood run into a lifecycle redesign.

## proposal and claims

When a run is in `blocked` state with zero open blockers, return `resume the run now that blockers are resolved, or abandon it`. When the run has an open blocker, preserve `resolve the open blocker, then resume or abandon the run`.

The claim is limited to making status agree with the existing legal transition and blocker count. It does not claim that the blocker was substantively resolved, that the run is complete, or that the protocol independently verifies human judgement.

## existing-platform ownership

The run definition owns blocker descriptions and statuses. `validateCompletion` owns the rule that open blockers prevent completion. `isLegalTransition` owns whether `blocked -> implemented` is legal. `readRunStatus` owns the concise handoff projection. Human operators own the substantive decision that changes a blocker to resolved.

## durable differentiated value

The repository-owned value is a small status contract that tells a fresh agent which legal action is available from the recorded state and blocker facts. No new runtime capability is proposed.

## strongest counterargument

A blocked run with a resolved blocker is an intermediate state that an operator could inspect without needing a special message; the state itself may be enough. However, the status contract promises one next action, and the current message explicitly tells the operator to resolve an already-resolved blocker. The correction removes a direct contradiction without changing the FSM.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Status gives the wrong action after a blocker is resolved. | `status.ts` checks `state === "blocked"` before considering `openBlockers`; lifecycle tests resolve a blocker before resuming but never inspect status. | No focused status regression covers the intermediate state. | Red test using a real blocked run and resolved blocker. |
| The existing lifecycle already supports resumption. | `isLegalTransition` permits `blocked -> implemented`; `lifecycle.test.ts` passes that path. | The operator handoff is not verified in the middle state. | Real CLI path with status before and after resolution. |
| Open-blocker behavior must remain unchanged. | Existing status and validation semantics use open blocker count. | The new branch could accidentally affect active runs with open blockers. | Regression asserts both open and resolved blocker actions. |

## minimum credible slice

One branch correction in `protocol/status.ts`, one focused regression, and one real protocol run through block, resolve, status, resume, evidence, and completion. No FSM, schema, validator, or CLI command change.

## stop conditions

- The blocked/resolved intermediate state cannot be reached without changing the lifecycle.
- The fix requires changing blocker ownership, completion validation, or transition legality.
- Open-blocker or human-decision status behavior changes unintentionally.
- The result is described as proof of human decision quality, provider quality, containment, or general agent reliability.

## verdict

proceed

## rationale

The contradiction is directly observable, the legal resume path already exists, and the smallest fix is local and reversible. The real run provides evidence that the status handoff is useful at the exact blocker boundary without expanding protocol scope.
