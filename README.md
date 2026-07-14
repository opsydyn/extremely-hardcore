# Extremely Hardcore

Architecture before acceleration.
Evidence before confidence.
Scope before action.
Small changes before big dreams.

Read [The Extremely Hardcore Manifesto](MANIFESTO.md) for the operating doctrine behind the skills.

See the [product roadmap](ROADMAP.md) for the protocol direction and recommended first slice.

## What Is Extremely Hardcore?

`extremely-hardcore` is an architecture-first skill system for coding agents. It is for non-trivial software changes where speed without judgement is not a feature.

It gives agents a dry set of guardrails: define the change, discover the domain, make architecture decisions explicit, test behaviour first, review boundaries, and record evidence.

## Why This Exists

Most coding agents are fast junior developers with root access and no sense of architecture. `extremely-hardcore` gives them adult supervision.

The goal is not to slow every edit to a committee meeting. Trivial edits stay trivial. Risky changes get the engineering ceremony they have been quietly asking for.

## Core Loop

1. Create change contract.
2. Discover domain and architecture impact.
3. Decide whether an ADR is needed.
4. Plan the smallest safe change.
5. Implement test-first.
6. Review boundaries and delivery risk.
7. Produce evidence ledger.

## Included Skills

- `using-extremely-hardcore`: decides when to run the full loop.
- `change-contract`: fixes intent, scope, risks, public contracts, and stop conditions before editing.
- `domain-discovery`: maps domain language, contexts, rules, integrations, and ambiguity.
- `architecture-decision`: records decisions when architecture, contracts, or operational behaviour changes.
- `bounded-context-review`: checks coupling, ownership, dependencies, transactions, and context leakage.
- `test-first-implementation`: plans behaviour-first implementation with the first failing test.
- `evidence-ledger`: records commands, checks, risks, architecture impact, and final recommendation.

## Agent Roles

The `agents/` directory contains short role prompts for focused review work:

- `scout`: reads the repo and explains the current shape.
- `architect`: proposes boundaries, decisions, and trade-offs.
- `implementer`: makes the smallest safe approved change.
- `test-critic`: finds weak tests and false confidence.
- `architecture-critic`: checks coupling, contracts, and domain leakage.
- `delivery-critic`: checks delivery and operational risk.
- `pr-scribe`: writes final review notes and evidence.

## Policies

The `policies/` directory defines the house rules:

- `scope-policy.md`: do not expand the task silently.
- `command-policy.md`: prefer read-only commands and record meaningful commands.
- `dependency-policy.md`: do not add dependencies by default.
- `architecture-policy.md`: keep domain code away from delivery machinery and name dangerous shortcuts.

## Example Workflow

See `examples/saved-search-ddd-change/` for a worked change where web and mobile saved-search formats need a canonical API and persistence model.

The example includes a change contract, domain map, ADR, implementation plan, and evidence ledger.

## Installing For Codex

For local development, keep this repo available and point Codex at the `skills/` directory or install it as a plugin once packaged. The Codex plugin metadata lives at `.codex-plugin/plugin.json`.

After changing the repo, run:

```bash
bun install
bun run check
```

## Proof-carrying Completion

The first executable protocol slice records verification commands and prevents an `implemented -> complete` transition until every criterion has fresh passing evidence and every blocker is resolved:

```bash
bun run eh evidence <run-path> <criterion-id> -- <command> [args...]
bun run eh validate <run-path>
bun run eh transition <run-path> complete
```

See [`examples/proof-carrying-completion/`](examples/proof-carrying-completion/) for an isolated end-to-end demo.

## Pressure Evaluation

The first Milestone 2 slice runs deterministic completion-gate pressure scenarios and prints a machine-readable report:

```bash
bun run evaluate
```

It currently covers uncovered criteria, failed and stale evidence, missing evidence artefacts, open blockers, and repeated completion. It does not yet execute or score external coding agents; see [`docs/evaluations/`](docs/evaluations/) for the result contract and scope boundary.

## Installing For Claude

Copy the skill folders from `skills/` into your Claude skills directory, or package the repo using the plugin mechanism available in your Claude environment.

The skill content is plain markdown and does not require runtime code to use.

## Project Status

V0 scaffold with an experimental completion gate. Useful enough to dogfood, not yet proven enough to trust blindly. That is why the evidence ledger exists.
