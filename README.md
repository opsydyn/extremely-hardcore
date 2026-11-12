# Extremely Hardcore

Architecture before acceleration.
Evidence before confidence.
Scope before action.
Small changes before big dreams.

<p align="center">
  <img src="assets/extremely-hardcore-skills-banner.jpg" alt="Extremely Hardcore Skills" width="960">
</p>

Read [The Extremely Hardcore Manifesto](MANIFESTO.md) for the operating doctrine behind the skills.

See the [product roadmap](ROADMAP.md) for completed work, next priorities, release gates, and deferred initiatives.

## What Is Extremely Hardcore?

EHS is a standalone engineering method for coding agents, delivered as nine
Markdown skills. It is for non-trivial software changes: explicit scope, domain
and architecture judgement, meaningful tests, and evidence before completion.

It gives agents a dry set of guardrails: define the change, discover the domain, make architecture decisions explicit, test behaviour first, review boundaries, and record evidence.

## Why This Exists

A quick implementation still needs clear boundaries and verification. EHS
makes the intended change and its supporting evidence explicit.

The goal is not to slow every edit to a committee meeting. Trivial edits stay trivial. Risky changes get the engineering ceremony they have been quietly asking for.

## Start Here

Use the [user guide](docs/user-guide.md) to load the skills, give your host a
bounded task, and review its receipt. You need a checkout and your coding host's
usual setup/sign-in; no Bun, `eh` run, provider adapter or evaluation harness is
required to use the Markdown skills.

An [experimental v0.0.1 skills-only preview](https://github.com/opsydyn/extremely-hardcore/releases/tag/v0.0.1)
is public. This source checkout includes unreleased instruction changes; loading
it does not update or qualify the published preview. The package is not published
to npm. Choose the existing checkout-loading path for your host below. These commands
request installation/loading; they are not evidence that your host has followed
EHS or that a released artifact has been qualified.

A local `0.0.2` skills-only candidate is now prepared with the revised guidance
and aligned metadata. See the [preparation record](docs/evaluations/127-v0.0.2-preview-preparation.md)
for artifact checks and limits; it has not been tagged or published.

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

Pi discovers all nine EHS skills explicitly for a session:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
pi --skill "$EHS_ROOT/skills/"
```

Pass the skills directory, not only the entrypoint file, so routing can discover
the other eight skills. Check the native catalogue and diagnostics separately.
Pi does not require a separate plugin manifest for this path. The repository
claims session-local loading only; use the [provider onboarding guide](docs/provider-onboarding.md)
for the smoke prompt and current evidence boundary.

See [host evidence and limits](docs/provider-onboarding.md#evidence-and-limits)
before interpreting compatibility. Current Codex proof uses a staged native
worker, not the CLI marketplace route. Claude Code has planning and parent-verified
fix observations; Pi has session-local reading/planning observations. Full
host qualification remains open, with no Claude Chat/Cowork parity claim.

## Routine Work

Use the applicable parts, scaled to risk; this is not a mandatory state machine
or document-per-step workflow.

1. Establish scope and constraints, reusing a clear brief or existing record.
2. Make the smallest complete change, with meaningful behavioural RED where practical.
3. Run relevant verification and required repository checks.
4. Report the outcome, supporting results and limitations concisely.

Use domain discovery for unclear or changing rules; architecture/boundary review
for consequential choices, changed assumptions or ownership/contracts; challenge
high-consequence proposals before planning. Reuse accepted decisions without
waiving security, compatibility or required approvals. No fixed completion form,
routine no-ADR announcement or document per skill is required.

ADR storage is lazy and repository-local. Installing EHS never creates an
`docs/adr/` directory. During a change, the architecture-decision skill first
reuses the repository's existing convention; only when an ADR is required and
no convention exists does it propose `docs/adr/` and create it with the first
ADR. See the [user guide](docs/user-guide.md) for the newcomer explanation.

## Included Skills

- `using-extremely-hardcore`: decides when to run the full loop.
- `change-contract`: fixes intent, scope, risks, public contracts, and stop conditions before editing.
- `domain-discovery`: clarifies rules, workflows, valid states, expected rejections and ownership, using proportionate modelling in the existing stack.
- `simple-made-easy`: compares complete implementation paths and exposes accidental complexity without treating line count as quality.
- `architecture-decision`: records decisions when architecture, contracts, or operational behaviour changes.
- `bounded-context-review`: checks coupling, ownership, dependencies, transactions, and context leakage.
- `decision-challenge`: tests high-consequence execution, boundary, differentiation, and comparison claims before planning.
- `test-first-implementation`: plans behaviour-first implementation with the first failing test.
- `evidence-ledger`: supports completion claims with verification and limitations; ordinary reports can be a concise paragraph.

## Agent Roles

The `agents/` directory contains optional role prompts for focused review work:

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

## Optional Repository Tooling

The Bun CLI, protocol demos, evaluation adapters and CI projections are separate
development/evidence tools. They are not prerequisites for installing or using
EHS. Schema version 1 and provider adapters remain experimental; their gates do
not become guarantees of the standalone skills.

### Local Development

After changing the repo, run:

```bash
bun install --frozen-lockfile
bun run check
```

### Proof-carrying Completion

The first executable protocol slice records verification commands and prevents an `implemented -> complete` transition until every criterion has fresh passing evidence and every blocker is resolved:

```bash
bun run eh evidence <run-path> <criterion-id> -- <command> [args...]
bun run eh validate <run-path>
bun run eh transition <run-path> complete
```

See [`examples/proof-carrying-completion/`](examples/proof-carrying-completion/) for an isolated end-to-end demo.

### Durable Run Handoff

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

### Pressure Evaluation

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

The provider-neutral adapter surface now includes the shared runner and experimental Claude Code and Pi read-only leaves. The runner centralizes scenario coverage, scoring, capability evidence levels, and retained-artifact integrity; each leaf owns only its provider command construction, output parsing, and raw process artefacts. Writable execution, containment, fuller Pi engineering adherence, and provider comparisons remain separate evidence gates. See [`docs/adr/0020-provider-neutral-read-only-adapter-contract.md`](docs/adr/0020-provider-neutral-read-only-adapter-contract.md), [`docs/adr/0021-claude-read-only-leaf-adapter.md`](docs/adr/0021-claude-read-only-leaf-adapter.md), and [`docs/adr/0022-pi-read-only-leaf-adapter.md`](docs/adr/0022-pi-read-only-leaf-adapter.md).

### CI Attestation

The local delivery command writes `summary.txt` and `attestation.json`, and exits non-zero unless the run is valid and complete:

```bash
bun run eh ci <run-path> <output-directory>
```

See [the reference workflow](.github/workflows/extremely-hardcore.yml) and the [compatibility policy](docs/COMPATIBILITY.md). Attestations provide local traceability, not cryptographic trust.

## Project Status

The standalone feature set is implemented; release qualification is not
complete. See the [roadmap](ROADMAP.md) for the remaining support and distribution
choices.

V0 protocol mechanics now include risk-aware lifecycle states, high-risk
approval freshness, durable handoff status, repeated evaluation policy, CI
artefacts, and controlled dogfood. Ten real operator dogfood records are
complete. Schema version 1 remains experimental; aggregate operational review,
current-version provider loading evidence, accepted containment, and any
provider comparison remain separate evidence gates.

## Licence

MIT; see [LICENSE](LICENSE).
