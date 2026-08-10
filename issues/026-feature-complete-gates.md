# Feature-complete gates

## intent

Implement the five V0 gates that remain before provider expansion:

1. Repeated, policy-backed evaluation of the full 20-scenario corpus.
2. A risk-aware lifecycle with blocked, abandoned, and human-decision states.
3. Durable status, approval, and handoff information for fresh agents.
4. Stable CI validation, human summaries, and machine-readable attestations.
5. A controlled ten-run dogfood harness plus compatibility, installation, and worked-example documentation.

## scope

This slice extends the local Bun/TypeScript protocol without adding a service, database, daemon, provider adapter, network access, or runtime dependency. Existing schema version 1 remains experimental and backward-compatible fixtures must continue to validate.

## exclusions

- Claude, Pi, AgentOS, or any other provider execution.
- Writable external-agent execution or sandbox claims.
- Hosted dashboards, issue-tracker synchronization, or automatic code changes.
- Cryptographic signing or hostile tamper resistance.
- A generic orchestration engine.

## acceptance

- The full corpus has a machine-readable policy and repeated-run assessor with fail-closed coverage and critical-regression checks.
- Legal lifecycle transitions are rejected, high-risk completion requires a fresh approval, and approval evidence is invalidated by a workspace change.
- A fresh agent can obtain concise status and next action from the run directory and the skill documents describe the handoff contract.
- CI can emit stable exit status, human summary, and a digest-linked attestation without trusting agent prose.
- A local dogfood command exercises ten representative protocol paths and emits an honest report; compatibility and installation guidance are documented.
- Focused tests, full tests, type checks, structural validation, the full evaluator, and dogfood command pass.

## stop conditions

- A lifecycle change requires rewriting prior transition history.
- Existing V1 fixtures cannot remain readable without migration policy.
- CI output would be treated as a trust anchor rather than a local attestation.
- A provider, network, or external writable execution path becomes necessary.
- Standard-lane status overhead or protocol complexity cannot be kept bounded.
