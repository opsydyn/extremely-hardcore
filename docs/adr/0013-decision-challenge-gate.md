# ADR: decision challenge gate for high-consequence proposals

## status

accepted

## context

The proposed live Codex action-fixture adapter initially appeared to be a thin integration. An adversarial review exposed a fundamental mismatch: the copied fixture workspace cannot create the evidence and completion records currently supplied by the host reference executor. Building the adapter without resolving that boundary would produce a misleading code-patch demonstration rather than evidence of Extremely Hardcore compliance.

## decision

Add a `decision-challenge` skill for proposals involving external writable execution, architecture/security/isolation boundaries, public contracts, product differentiation claims, or benchmark claims. The skill must produce a claim-to-evidence map, duplication analysis, strongest counterargument, minimum credible slice, explicit verdict, and falsifiable stop conditions.

Dogfood the skill on the live Codex adapter proposal. Its accepted result is `hold`: redesign the fixture to make agent-owned protocol behavior executable within the fixture workspace, or explicitly narrow a future adapter to source-change-only and avoid a compliance claim.

## consequences

- High-consequence claims receive a documented challenge before planning commits the repository to an implementation path.
- The first live provider adapter is delayed until it can produce meaningful evidence.
- Ordinary local work does not incur a mandatory critic phase.
- The challenge adds documentation and review cost, and its verdict must remain bounded to avoid process theatre.

## options considered

### Implement the thin Codex adapter immediately

Rejected because adapter-authored evidence and completion would invalidate the claimed measurement.

### Require an adversarial review for every change

Rejected because it would impose unjustified overhead on trivial and low-risk work.

### Add a targeted decision challenge with explicit triggers

Accepted because it captures the discovered failure mode while preserving small-diff workflows.

## trade-offs

The challenge may defer work that seems implementable. This is intentional where the implementation would otherwise test a weaker proposition than the product claim. The trigger rubric requires judgment and cannot prove that every claim is complete.

## follow-up work

- Implement and dogfood the skill.
- Redesign the action fixture boundary before resuming the live Codex adapter proposal.

## review date

After three completed decision challenges or before adding a second provider adapter, whichever occurs first.
