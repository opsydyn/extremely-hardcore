# domain map: resolved blocked status next action

## domain terms

- **blocked run:** an active run waiting on at least one recorded blocker or dependency.
- **resolved blocker:** a blocker whose status is `resolved`, allowing the existing lifecycle to resume the run.
- **blocked intermediate state:** the short period after a blocker is resolved and before the `blocked -> implemented` transition is recorded.
- **next action:** the single operator instruction projected by `eh status` and `eh summary`.

## candidate bounded contexts

- **blocker record:** owns blocker identity, description, and open/resolved status.
- **lifecycle:** owns legal transitions and current derived state.
- **status projection:** combines state and blocker counts into a fresh-agent handoff.
- **completion validation:** owns the rule that open blockers prevent completion.

## aggregates/entities/value objects

- Run definition and blocker list.
- Transition history and derived run state.
- Status projection with blocker counts and one next action.

## commands

- Move an active run to `blocked` with a reason.
- Resolve the recorded blocker through the existing run-definition boundary.
- Resume with `blocked -> implemented` and a reason.
- Inspect status before and after resolution.

## events

- `implemented -> blocked` records the dependency pause.
- Blocker status changes from open to resolved.
- Status projection changes from resolve-blocker to resume-or-abandon.
- `blocked -> implemented` records resumption.

## policies/rules

- A blocked transition requires at least one open blocker.
- A blocked run cannot resume while any blocker remains open.
- A blocked run with no open blockers can resume or be abandoned.
- Status must not instruct an operator to resolve a blocker that is already resolved.

## invariants

- The run remains `blocked` until a legal resume or abandon transition is recorded.
- Open blocker count and resolved blocker count reflect the run definition.
- Open-blocker status behavior remains unchanged.
- Human-decision state remains owned by its existing branch and is not collapsed into blocker handling.

## external systems

- Bun executes the CLI and checks.
- Git supplies the workspace fingerprint for evidence and transitions.

## integration points

- `readRunStatus` consumes derived state and blocker counts.
- `transitionTo` enforces blocker requirements for block and resume transitions.
- `validateCompletion` rejects open blockers at completion.

## ambiguity

The protocol has no dedicated command for resolving a blocker; the run definition is edited directly. This slice records that boundary and tests the handoff around it without inventing a blocker-resolution API.

## recommended next questions

- Should blocker resolution become an explicit append-only event before schema stability is considered?
- Should the status output expose a machine-readable action code in a future schema version?
