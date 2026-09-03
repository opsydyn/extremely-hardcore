# Extremely Hardcore

Architecture before acceleration.
Evidence before confidence.
Scope before action.
Small changes before big dreams.

<p align="center">
  <img src="assets/extremely-hardcore-skills.jpg" alt="Extremely Hardcore Skills" width="520">
</p>

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
4. Challenge high-consequence proposals before planning when the trigger rubric applies.
5. Plan the smallest safe change.
6. Implement test-first.
7. Review boundaries and delivery risk.
8. Produce evidence ledger.

ADR storage is lazy and repository-local. Installing EHS never creates an
`docs/adr/` directory. During a change, the architecture-decision skill first
reuses the repository's existing convention; only when an ADR is required and
no convention exists does it propose `docs/adr/` and create it with the first
ADR. See the [user guide](docs/user-guide.md) for the newcomer explanation.

## Included Skills

- `using-extremely-hardcore`: decides when to run the full loop.
- `change-contract`: fixes intent, scope, risks, public contracts, and stop conditions before editing.
- `domain-discovery`: maps domain language, contexts, rules, integrations, and ambiguity.
- `simple-made-easy`: compares complete implementation paths and exposes accidental complexity without treating line count as quality.
- `architecture-decision`: records decisions when architecture, contracts, or operational behaviour changes.
- `bounded-context-review`: checks coupling, ownership, dependencies, transactions, and context leakage.
- `decision-challenge`: tests high-consequence execution, boundary, differentiation, and comparison claims before planning.
- `test-first-implementation`: plans behaviour-first implementation with the first failing test.
- `evidence-ledger`: records a compact work receipt plus commands, checks, risks, architecture impact, and final recommendation.

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

For a local checkout with the Codex CLI, register the repository's local
marketplace and install the plugin:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
codex plugin marketplace add "$EHS_ROOT"
codex plugin add extremely-hardcore@extremely-hardcore-dev
codex plugin list
```

The Codex plugin metadata lives at `.codex-plugin/plugin.json`. The full
loading smoke and the explicit fallback for environments without local
marketplace support are in the [provider onboarding guide](docs/provider-onboarding.md).

New users should start with the [user guide](docs/user-guide.md), which walks through the no-model health checks, proof-carrying demo, local `eh` CLI, host-agent loading, and optional provider evaluations.

For concrete Codex, Claude Code, and Pi checkout loading commands, see the
[provider onboarding guide](docs/provider-onboarding.md). It separates package
discovery, a model loading smoke, and real engineering adherence.

After changing the repo, run:

```bash
bun install --frozen-lockfile
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

## Durable Run Handoff

Run state survives the agent session. A fresh agent should inspect it before editing:

```bash
bun run eh status <run-path>
bun run eh summary <run-path>
```

Use `blocked`, `needs-human-decision`, and `abandoned` transitions with a reason when work cannot proceed. High-risk completion requires an approval tied to the current workspace fingerprint:

```bash
bun run eh approve <run-path> --approver <name> --decision approved --reason "reviewed"
bun run eh transition <run-path> complete
```

The status output is the handoff contract: current state, risk lane, criterion coverage, blockers, validation, and one next action.

## Pressure Evaluation

The first Milestone 2 slice runs deterministic completion-gate pressure scenarios and prints a machine-readable report:

```bash
bun run evaluate
```

It currently covers uncovered criteria, failed and stale evidence, missing evidence artefacts, open blockers, and repeated completion. The deterministic protocol runner does not invoke external coding agents; explicit provider adapters are documented separately in [`docs/evaluations/`](docs/evaluations/).

The full local policy runner combines all 20 manifest scenarios for three repetitions. Its structured agent attempts are assessor inputs, not provider evidence:

```bash
bun run evaluate:full
```

The controlled dogfood command exercises ten temporary Git repositories across completion, stale refresh, blocking, approval, and abandonment paths:

```bash
bun run dogfood
```

The results are deliberately labelled controlled evidence. They do not replace real operator dogfood or establish provider claims.

The provider-neutral adapter surface now includes the shared runner and experimental Claude Code and Pi read-only leaves. The runner centralizes scenario coverage, scoring, capability evidence levels, and retained-artifact integrity; each leaf owns only its provider command construction, output parsing, and raw process artefacts. Writable execution, containment, live Pi evidence, and provider comparisons remain separate evidence gates. See [`docs/adr/0020-provider-neutral-read-only-adapter-contract.md`](docs/adr/0020-provider-neutral-read-only-adapter-contract.md), [`docs/adr/0021-claude-read-only-leaf-adapter.md`](docs/adr/0021-claude-read-only-leaf-adapter.md), and [`docs/adr/0022-pi-read-only-leaf-adapter.md`](docs/adr/0022-pi-read-only-leaf-adapter.md).

## CI Attestation

The local delivery command writes `summary.txt` and `attestation.json`, and exits non-zero unless the run is valid and complete:

```bash
bun run eh ci <run-path> <output-directory>
```

See [the reference workflow](.github/workflows/extremely-hardcore.yml) and the [compatibility policy](docs/COMPATIBILITY.md). Attestations provide local traceability, not cryptographic trust.

## Installing For Claude

Validate the local Claude metadata, then load the checkout for one session:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
claude plugin validate "$EHS_ROOT/.claude-plugin/plugin.json"
claude --plugin-dir "$EHS_ROOT"
```

To install the local marketplace at a chosen scope:

```bash
claude plugin marketplace add "$EHS_ROOT" --scope user
claude plugin install extremely-hardcore@extremely-hardcore-dev
```

The skill content is plain markdown and does not require runtime code to use.

## Installing For Pi

Pi loads the EHS entrypoint explicitly for a session:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
pi --skill "$EHS_ROOT/skills/using-extremely-hardcore/SKILL.md"
```

Pi does not require a separate plugin manifest for this path. The repository
claims session-local loading only; use the [provider onboarding guide](docs/provider-onboarding.md)
for the smoke prompt and current evidence boundary.

## Project Status

V0 protocol mechanics now include risk-aware lifecycle states, high-risk
approval freshness, durable handoff status, repeated evaluation policy, CI
artefacts, and controlled dogfood. Ten real operator dogfood records are
complete. Schema version 1 remains experimental; aggregate operational review,
current-version provider loading evidence, accepted containment, and any
provider comparison remain separate evidence gates.
