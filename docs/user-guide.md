# Extremely Hardcore User Guide

Start by loading the standalone Markdown skills into Codex, Claude Code or Pi
and using them on a bounded change. Your host needs its usual setup and sign-in
for model work; EHS adds no runtime prerequisite. Bun and the `eh` protocol are
only needed for the optional repository tooling later in this guide.

The [experimental v0.0.1 skills-only preview](https://github.com/opsydyn/extremely-hardcore/releases/tag/v0.0.1)
is public, but not generally host-qualified. This source checkout contains
unreleased instruction changes; the commands below load source, not a new
release. EHS is not published to npm. Current
[host evidence and limits](provider-onboarding.md#evidence-and-limits) distinguish
staged Codex work, Claude Code observations and Pi session-local planning.
Discovery alone does not establish loading or engineering adherence.

## 1. Load the skills into your host

The host-facing source is the `skills/` directory. The repository-owned Codex
metadata is `.codex-plugin/plugin.json`; Claude metadata is under
`.claude-plugin/`.

Use the [provider onboarding guide](provider-onboarding.md) for the complete
commands and dated evidence snapshots. The short local-checkout paths are:

Codex CLI:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
codex plugin marketplace add "$EHS_ROOT"
codex plugin add extremely-hardcore@extremely-hardcore-dev
```

Claude Code:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
claude plugin validate "$EHS_ROOT/.claude-plugin/plugin.json"
claude --plugin-dir "$EHS_ROOT"
```

Pi:

```bash
EHS_ROOT=/absolute/path/to/extremely-hardcore-skill
pi --skill "$EHS_ROOT/skills/"
```

For Pi, pass the directory so the native catalogue can discover all nine skills,
not only the router. Check for missing names or diagnostics before relying on it.

These commands request installation or explicit loading. Verify host discovery
and loading separately; a successful command or echoed smoke marker does not
prove that instructions reached the model or that it follows EHS during work.

## 2. Use EHS on a bounded change

After checking discovery, give a concrete task and acceptance criteria in a
disposable project, with a prompt such as the one below. The provider guide's
loading smoke is an optional model diagnostic, not a prerequisite or loading
attestation.

```text
Use Extremely Hardcore to fix <the observed problem>. Preserve <the relevant
compatibility constraint>. Verify <the observable outcome> and report what
was checked and what remains unverified.
```

The expected agent behaviour is:

- Establish scope and constraints, reusing the brief rather than announcing every skill.
- Reuse accepted architecture; review new consequential choices or changed assumptions using the project's decision convention.
- Reproduce changed behaviour with a meaningful failing test where practical, then run relevant verification after the fix.
- Keep the diff bounded.
- Finish with the outcome, supporting checks/results and limitations rather than an unsupported completion claim.

A concise paragraph or short bullets are enough for ordinary completion. No
fixed fields, separate no-ADR declaration or protocol run is required. Required
repository records, checks and approvals still apply.

Also test the trivial path:

```text
Fix this one obvious spelling mistake in the README. Do not change anything else.
```

The full ceremony should not be forced onto a genuinely trivial copy edit. This distinction is part of the `using-extremely-hardcore` skill contract.

### ADRs in a user repository

Installing EHS does not create an ADR directory in the repository where you
use it. The `docs/adr/` directory in this checkout stores EHS's own decisions;
it is not copied into a user's project.

First reuse an accepted decision when its assumptions still hold. A routine
extension does not require another ADR; new consequential choices or changed
assumptions do. Look for the project's existing convention, such as `docs/adr/`,
`adr/`, or `docs/decisions/`, and write the decision there. If no convention exists, the
change contract should propose `docs/adr/`; the directory is created together
with the first required ADR, not as an empty setup side effect. Decision reuse
never waives required approval, compatibility review or verification.

## 3. Optional Simple Made Easy lens

EHS remains the product and package. `simple-made-easy` is an optional skill
for a non-trivial change with multiple plausible implementation paths or a
risk of accidental coupling. It is not required for an obvious local fix and
does not replace the change contract, architecture decision, tests, review, or
evidence ledger.

Use a prompt such as:

```text
Use Simple Made Easy for this change. Compare complete paths, inspect reuse,
standard-library, native-platform, and installed-dependency options, then
select the least entangled complete path. Do not optimize for line count or
drop validation, security, accessibility, tests, rollback, or evidence.
Mention only trade-offs that materially affect the choice or confidence.
```

Use a sentence in the existing conversation or plan when the choice matters;
omit a redundant report. No fixed simplicity form, tracker or transcript is needed.

### Domain modelling when it matters

For unclear or changing business rules, EHS's domain skill uses selected ideas
from Scott Wlaschin's *Domain Modeling Made Functional*: model the relevant
workflow, valid states, expected rejections and effects before inventing tables
or classes. Use existing types and validated construction proportionately;
separate decision logic from I/O when useful. It requires no functional language,
library or extra layers, and does not replace runtime checks or meaningful tests.
Use agreed ubiquitous language in code, tests and documentation within each
bounded context; preserve legitimate differences between contexts and reuse
existing definitions rather than creating a glossary by default.
The [saved-search example](../examples/saved-search-ddd-change/domain-map.md)
shows the distinction; routine rendering or plumbing needs no domain catalogue.

## 4. Optional repository tooling

This repository has three related surfaces:

- `skills/` contains the Markdown skills that a coding-agent host loads.
- `scripts/eh.ts` is a Bun reference CLI for evidence, run status, validation, transitions, approvals, summaries, attestations, and CI artefacts.
- `evaluation/` and `tests/` contain deterministic protocol tests and experimental provider adapters.

`package.json` has `"private": true`, preventing npm publication; that does not
mean the GitHub repository or experimental preview is private. Treat this as a
local plugin and skill source tree, not an npm registry package. The Codex plugin
manifest is [`.codex-plugin/plugin.json`](../.codex-plugin/plugin.json).

The protocol is schema version 1 and experimental. It provides local traceability in a normal workspace. It is not cryptographic signing, hostile-workspace tamper resistance, sandbox enforcement, or a benchmark system.

### Tooling prerequisites

You need:

- Git.
- Bun.
- A checkout of this repository.

Codex, Claude Code, Pi, model credentials, Docker, and Colima are not required for this no-model tooling path.

From the repository root, verify the tools and install the locked dependencies:

```bash
bun --version
git --version
bun install --frozen-lockfile
```

Dependency installation is the only step in this guide that normally needs package-registry access. The deterministic tests below do not invoke a model provider.

## 5. Optional local health checks

Run the structural check, test suite, TypeScript check, and whitespace check:

```bash
bun run check
bun run test
bunx tsc --noEmit
git diff --check
```

Expected result: every command exits with status 0. `bun run check` validates the repository scaffold and skill contracts. `bun run test` exercises protocol, CLI, evaluation, and adapter tests. They are separate checks; a passing structural check is not a substitute for the test suite.

## 6. Optional no-model evaluations

Start with the deterministic pressure suite:

```bash
bun run evaluate
```

It prints JSON and exits 0 only when all seven deterministic scenarios pass. The scenarios cover uncovered criteria, failed evidence, stale evidence, missing evidence records and logs, open blockers, and repeated completion.

Run the full local policy corpus:

```bash
bun run evaluate:full
```

The default run uses the checked-in declared fixture and three repetitions. It checks assessor and repetition mechanics. It does not invoke Codex, Claude, Pi, or a model API, and it is not a skills-effect comparison.

Run the controlled local dogfood harness:

```bash
bun run dogfood
```

This creates temporary Git repositories and exercises representative lifecycle paths. It is controlled local evidence, not real operator dogfood against an external project.

Run the bounded action-fixture reference proof:

```bash
bun run evaluate:action-fixture -- --output-dir /tmp/extremely-hardcore-action-fixture-user-guide
```

The output directory must not already exist. Choose another new path if that command has been run before. This command uses the deterministic reference executor; no provider is invoked. It retains a copied fixture workspace and a report under the selected directory.

For the detailed report contracts and provider-specific boundaries, see [`docs/evaluations/README.md`](evaluations/README.md).

## 7. Optional proof-carrying demo

The isolated demo creates and removes its own temporary Git repository:

```bash
bun examples/proof-carrying-completion/demo.ts
```

Read the output rather than only checking its exit code. The demo intentionally shows:

1. Completion blocked because one criterion has no evidence.
2. Previously captured evidence becoming stale after a workspace change.
3. Fresh evidence allowing one accepted completion transition.

The demo uses the real `eh` CLI and the real protocol files. Its full description is in [`examples/proof-carrying-completion/README.md`](../examples/proof-carrying-completion/README.md).

## 8. Optional CLI workflow

There is currently no `eh init` command. A run is a directory containing a `run.json` definition plus generated evidence, logs, transitions, and optional approvals.

For a disposable smoke run, copy the example definition and use its two criteria:

```bash
RUN_PATH=".extremely-hardcore/runs/user-guide-smoke"
mkdir -p "$RUN_PATH"
cp examples/proof-carrying-completion/run.json "$RUN_PATH/run.json"

bun run eh evidence "$RUN_PATH" criterion-a -- bun run check
bun run eh evidence "$RUN_PATH" criterion-b -- bun run test
bun run eh status "$RUN_PATH"
bun run eh validate "$RUN_PATH"
bun run eh transition "$RUN_PATH" complete
bun run eh summary "$RUN_PATH"
bun run eh attest "$RUN_PATH" /tmp/extremely-hardcore-user-guide-attestation.json
bun run eh ci "$RUN_PATH" /tmp/extremely-hardcore-user-guide-ci
```

What these commands demonstrate:

- `evidence` runs the command from the Git workspace root, captures bounded output, records the exit code and workspace fingerprint, and links the evidence to a criterion.
- `status` gives a handoff view: state, risk, criterion coverage, blockers, approval status, validation, and next action.
- `validate` checks evidence freshness, command success, log integrity, blockers, and high-risk approval requirements.
- `transition ... complete` appends a completion event only when the gate is valid.
- `summary` renders a concise completion summary.
- `attest` writes a derived JSON traceability record.
- `ci` writes `summary.txt` and `attestation.json` to the selected output directory.

For a real change, create a new run definition with criteria that describe that change. Do not reuse the example descriptions as a substitute for project-specific acceptance criteria. Capture all evidence after the final workspace changes; otherwise validation will report `evidence.stale`.

For a high-risk run, record a human approval against the current workspace before completing:

```bash
bun run eh approve "$RUN_PATH" \
  --approver "your-name" \
  --decision approved \
  --reason "reviewed the current evidence and completion scope"
bun run eh transition "$RUN_PATH" complete
```

### Record a real change

For a change documented through this optional tooling, start from the
[dogfood record template](dogfood/template.md) and create a record for that change.
Standalone skill use does not require this record or a protocol run. Keep the record short, write
`not measured` or `not available` with a reason when a field was not captured,
and do not backfill older records to fit later conventions. The template is a
human-readable companion to the optional `eh` protocol; it does not add a CLI
command or change the protocol schema.

## 9. Optional provider evaluations

Run provider adapters only after the no-model path is green. Each provider command requires a new output directory and an explicit target workspace. Review and redact retained prompts and raw output before sharing them.

Claude Code read-only evaluation:

```bash
bun run evaluate:claude -- \
  --output-dir ./claude-evaluation-artifacts \
  --workspace /path/to/target-workspace \
  --model sonnet \
  --claude-path "$(command -v claude)"
```

The explicit executable path avoids accidental selection of a repository-local `claude` binary when running through Bun. This is a read-only classification adapter. Its requested tool and permission flags are configuration evidence, not proof of filesystem or network enforcement.

Pi read-only evaluation:

```bash
bun run evaluate:pi -- \
  --output-dir ./pi-evaluation-artifacts \
  --workspace /path/to/target-workspace \
  --model provider/model-id \
  --pi-path "$(command -v pi)"
```

Replace `provider/model-id` with an authenticated Pi provider and model. If Pi reports that credentials are not configured, stop at that preflight. Do not turn an unauthenticated or failed provider run into a passing result. Pi's `--offline` setting controls startup operations only; it does not control model-provider traffic.

These adapters do not establish provider identity, model routing, network isolation, sandbox enforcement, workspace containment, command ownership, resume behaviour, benchmark performance, or a provider comparison. The detailed boundaries are documented in [`docs/evaluations/README.md`](evaluations/README.md).

## 10. Interpret optional-tooling failures

- `bun run check` failing means the repository scaffold or skill contract is invalid.
- `bun run test` failing means a tested behaviour regressed or a test setup is broken.
- `eh validate` or `eh transition` returning status 1 is a gate failure, not a reason to edit evidence by hand.
- `eh` usage errors return status 2. Check the command shape printed by the CLI.
- `evaluate` and the reference fixture return status 1 when their result is not fully passing.
- `evidence.stale` means the workspace changed after evidence was captured. Recapture the affected criteria after the final change.
- `approval.required` or `approval.stale` means a high-risk completion needs a fresh human approval tied to the current workspace fingerprint.
- An output-directory error means the selected directory already exists. Pick a new directory so artifacts from separate runs cannot be confused.

Keep raw provider artifacts private until you have checked them for prompts, repository content, paths, credentials, and other sensitive data.

## 11. Optional tooling completion checklist

You have exercised the optional local tooling when these checks pass. This is
not an installation prerequisite or full host-engineering qualification:

- `bun install --frozen-lockfile` completed.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` passed.
- `bun run evaluate` passed.
- The proof-carrying demo showed both stale/uncovered rejection and eventual completion.
- The action-fixture reference proof passed in a new output directory.
- You can inspect a run with `eh status`, validate it, complete it, and produce a CI attestation.

The next deeper reading is the [project README](../README.md), the [evaluation reference](evaluations/README.md), and the [compatibility policy](COMPATIBILITY.md).
