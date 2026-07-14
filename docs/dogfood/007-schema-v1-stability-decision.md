# Dogfood Run 5: blocked schema version 1 stability declaration

## change

High-risk decision request: declare the protocol schema version 1 stable.

Risk: high. A stability declaration creates a public compatibility expectation for durable run, evidence, and transition records.

## gate record

Run directory: `.extremely-hardcore/runs/007-schema-v1-stability-decision/`.

The run intentionally has no command evidence because passing commands cannot substitute for the required human decision. Its open blocker is `schema-v1-compatibility-policy`.

## rejected completion

The guarded transition rejected completion with:

```text
criterion.uncovered: human-stability-decision has no evidence
blocker.open: schema-v1-compatibility-policy is still open
```

`transitions.jsonl` remains empty. The run remains `implemented`; no approval or stability declaration was fabricated.

## abandonment

This run is deliberately abandoned, not completed. The required human authority and compatibility policy are outside the agent's authority. ADR 0004 remains proposed until a human owner decides whether to keep schema version 1 experimental, declare it stable with compatibility terms, or revise it.

## finding

The gate clearly prevents a technical agent from converting command success into a governance decision. Its limitation is equally clear: V1 cannot model formal human approvals or abandonment events, so the abandonment is documented alongside the immutable run state.
