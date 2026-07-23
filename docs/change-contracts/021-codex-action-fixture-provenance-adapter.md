# change contract: Codex action-fixture provenance adapter

## user intent

Move the staged bounded bug-fix fixture forward with a live Codex adapter, while keeping engineering rigour: preserve provider-side execution artefacts and correlate them to the fixture-owned ledger without overstating what the evidence proves.

## current understanding

The fixture now has immutable local `evidence` and `complete` commands and a runner-validated invocation ledger. `runBoundedBugFixFixture` owns copying, staging, stale-state intervention, and fixture pass/fail. The existing Codex adapter is read-only and assesses structured behavioural responses; it does not exercise this fixture. Local `codex exec --help` documents `workspace-write`, `--json`, `--output-last-message`, `--ephemeral`, and `--cd`, but does not establish a stable event schema, agent identity, or no-network enforcement.

## allowed scope

- Add a separate experimental Codex action-fixture adapter, types, CLI, focused tests, and evaluation documentation.
- Run one injected Codex execution per fixture stage with the fixed `workspace-write` invocation shape.
- Retain raw provider stdout/stderr, prompts, invocation metadata, optional final messages, and SHA-256 digests outside the scored fixture workspace.
- Return the existing runner result unchanged inside a separate adapter report.

## forbidden scope

- Changing fixture scorer behaviour, generic protocol artefacts, or the existing read-only Codex evaluation adapter.
- Parsing provider events as a pass/fail signal or asserting provider command ownership from them.
- Live Codex execution in automated tests or verification.
- Network, identity, sandbox-enforcement, skill-loading, benchmark, comparison, or compliance claims.
- CI thresholds, persistence, concurrency, retries, provider abstraction, or new dependencies.

## affected areas

- `evaluation/types.ts`
- A new Codex action-fixture adapter and CLI
- Focused adapter and CLI tests
- `package.json`, evaluation documentation, and this slice's decision records

## public contracts

Adds experimental `bun run evaluate:codex-action-fixture -- --output-dir <new-dir> --model <model>`. Its JSON report is a new V1 experimental adapter artefact. Existing evaluator, protocol, fixture, and read-only Codex adapter contracts remain unchanged.

## assumptions

- The local Codex CLI accepts the documented invocation flags.
- A caller supplies a usable model and authenticated Codex environment when they later elect to run the experimental command.
- Raw stdout from `--json` can be retained as an opaque artefact without relying on its schema.

## risks

- Provider output may contain sensitive workspace context and requires review/redaction before sharing.
- A successful fixture result proves the fixture protocol artefacts are valid, not that an independently identifiable agent performed each action.
- `workspace-write` is recorded requested configuration, not proof of sandbox or network enforcement.

## acceptance evidence

- Deterministic fake-executor tests prove the request shape, retained external artefacts, report digests, and unchanged fixture scoring ownership.
- CLI tests prove argument validation and a successful fake-free reference is not substituted for a provider run.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, `git diff --check`, and a fresh deterministic adapter fixture run pass.

## stop conditions

- Stop if the adapter needs to alter or reinterpret fixture scoring.
- Stop if raw artefact retention cannot be tested without a live provider.
- Stop and request human review for any required identity, network, authentication, or provider-isolation guarantee.
