# bounded-context review: action-level bounded bug-fix fixture

## proposed change

Add a local action-fixture runner that copies tracked assets, calls injected staged executors, and scores workspace/protocol state using existing protocol APIs.

## affected contexts

- Fixture assets: task contract and deterministic source/test oracle.
- Evaluation runner: setup, snapshots, diff validation, intervention, and result construction.
- Protocol: existing evidence, fingerprint, validation, and transition services.
- Future provider adapters: executor implementation only.

## allowed dependencies

`action fixture runner -> fixture assets + protocol APIs + local Bun/Git`. Reference executor may depend on the runner request and protocol APIs. Provider adapters may depend on the staged-executor interface later.

## suspicious dependencies

Provider SDKs, Codex imports in the runner, fixture-specific logic in protocol modules, evaluator mutation of agent-owned source, and transcript-derived scoring.

## data ownership

Fixture assets are repository-owned. Caller-selected output roots retain workspaces and reports. Protocol artifacts are written by the executor through existing APIs. The runner alone owns marker mutation and report construction.

## transaction boundaries

Stage A validates before marker mutation. A malformed Stage A ends the run without intervention. Stage B runs only after exact marker mutation and a proven stale Stage A fingerprint. Completion is delegated to the existing protocol transition.

## integration events

Two local staged-executor callbacks and local Bun/Git commands. No network or provider event is introduced.

## anti-corruption needs

Keep action-fixture status separate from `AgentAttemptAssessment`; do not encode provider output or mode declarations into the action oracle.

## verdict

safe with noted risk. The runner creates a new experimental evaluation contract but preserves protocol ownership and postpones provider coupling.
