# Extremely Hardcore User Guide

This is the first-run guide for someone who has just checked out Extremely Hardcore. It starts with local, no-model tests. Provider CLIs are optional; host loading and provider evaluation are separate paths.

## 1. Understand what you have

This repository has three related surfaces:

- `skills/` contains the Markdown skills that a coding-agent host loads.
- `scripts/eh.ts` is a Bun reference CLI for evidence, run status, validation, transitions, approvals, summaries, attestations, and CI artefacts.
- `evaluation/` and `tests/` contain deterministic protocol tests and experimental provider adapters.

This checkout is currently a private package (`package.json` has `"private": true`). Treat it as a local plugin and skill source tree, not as an npm package to install from a registry. The Codex plugin manifest is [`.codex-plugin/plugin.json`](../.codex-plugin/plugin.json).

The protocol is schema version 1 and experimental. It provides local traceability in a normal workspace. It is not cryptographic signing, hostile-workspace tamper resistance, sandbox enforcement, or a benchmark system.

## 2. Prerequisites

You need:

- Git.
- Bun.
- A checkout of this repository.

Codex, Claude Code, Pi, model credentials, Docker, and Colima are not required for the first-run path.

From the repository root, verify the tools and install the locked dependencies:

```bash
bun --version
git --version
bun install --frozen-lockfile
```

Dependency installation is the only step in this guide that normally needs package-registry access. The deterministic tests below do not invoke a model provider.

## 3. Run the local health checks

Run the structural check, test suite, TypeScript check, and whitespace check:

```bash
bun run check
bun run test
bunx tsc --noEmit
git diff --check
```

Expected result: every command exits with status 0. `bun run check` validates the repository scaffold and skill contracts. `bun run test` exercises protocol, CLI, evaluation, and adapter tests. They are separate checks; a passing structural check is not a substitute for the test suite.

## 4. Run the no-model evaluations

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

## 5. Walk through the proof-carrying demo

The isolated demo creates and removes its own temporary Git repository:

```bash
bun examples/proof-carrying-completion/demo.ts
```

Read the output rather than only checking its exit code. The demo intentionally shows:

1. Completion blocked because one criterion has no evidence.
2. Previously captured evidence becoming stale after a workspace change.
3. Fresh evidence allowing one accepted completion transition.

The demo uses the real `eh` CLI and the real protocol files. Its full description is in [`examples/proof-carrying-completion/README.md`](../examples/proof-carrying-completion/README.md).

## 6. Run the CLI against a local change

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

### ADRs in a user repository

Installing EHS does not create an ADR directory in the repository where you
use it. The `docs/adr/` directory in this checkout stores EHS's own decisions;
it is not copied into a user's project.

When `architecture-decision` applies to a change, the agent should first look
for the project's existing convention, such as `docs/adr/`, `adr/`, or
`docs/decisions/`, and write the decision there. If no convention exists, the
change contract should propose `docs/adr/`; the directory is created together
with the first required ADR, not as an empty setup side effect. Changes that do
not meet the architecture trigger list should record why no ADR is required.

## 7. Load the skills into an agent host

The host-facing source is the `skills/` directory. The repository-owned Codex
metadata is `.codex-plugin/plugin.json`; Claude metadata is under
`.claude-plugin/`.

Use the [provider onboarding guide](provider-onboarding.md) for the complete
commands and current evidence matrix. The short local-checkout paths are:

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
pi --skill "$EHS_ROOT/skills/using-extremely-hardcore/SKILL.md"
```

These commands establish package discovery or explicit skill loading; they do
not prove that a model will follow EHS during arbitrary engineering work.

After loading the skills, use the harmless loading smoke in the provider guide,
or this equivalent prompt in a disposable project:

```text
Use Extremely Hardcore for this non-trivial change. Before editing, report the change contract, whether an ADR applies, the first verification test, and the evidence you will record. Keep the change limited to one small source file.
```

The expected agent behaviour is:

- Classify the request as non-trivial.
- Establish scope and stop conditions with `change-contract`.
- Check `architecture-decision` and state why it does or does not apply.
- Use test-first planning before implementation.
- Keep the diff bounded.
- Finish with an evidence ledger and its compact work receipt rather than claiming completion from conversation text alone.

The receipt has five fields: `result`, `claim`, `evidence`, `remaining uncertainty`, and `next`. It is standalone Markdown; it does not require the `eh` protocol or an evaluation harness.

Also test the trivial path:

```text
Fix this one obvious spelling mistake in the README. Do not change anything else.
```

The full ceremony should not be forced onto a genuinely trivial copy edit. This distinction is part of the `using-extremely-hardcore` skill contract.

## 8. Optional provider evaluations

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

## 9. Interpret failures correctly

- `bun run check` failing means the repository scaffold or skill contract is invalid.
- `bun run test` failing means a tested behaviour regressed or a test setup is broken.
- `eh validate` or `eh transition` returning status 1 is a gate failure, not a reason to edit evidence by hand.
- `eh` usage errors return status 2. Check the command shape printed by the CLI.
- `evaluate` and the reference fixture return status 1 when their result is not fully passing.
- `evidence.stale` means the workspace changed after evidence was captured. Recapture the affected criteria after the final change.
- `approval.required` or `approval.stale` means a high-risk completion needs a fresh human approval tied to the current workspace fingerprint.
- An output-directory error means the selected directory already exists. Pick a new directory so artifacts from separate runs cannot be confused.

Keep raw provider artifacts private until you have checked them for prompts, repository content, paths, credentials, and other sensitive data.

## 10. New-user completion checklist

You have tested the package locally when all of these are true:

- `bun install --frozen-lockfile` completed.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` passed.
- `bun run evaluate` passed.
- The proof-carrying demo showed both stale/uncovered rejection and eventual completion.
- The action-fixture reference proof passed in a new output directory.
- You can inspect a run with `eh status`, validate it, complete it, and produce a CI attestation.
- Your host agent can load the `skills/` directory and follows the trivial versus non-trivial distinction.

The next deeper reading is the [project README](../README.md), the [evaluation reference](evaluations/README.md), and the [compatibility policy](COMPATIBILITY.md).
