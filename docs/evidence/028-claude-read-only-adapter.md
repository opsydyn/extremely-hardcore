# evidence ledger: Claude read-only adapter

## summary

Implemented and directly exercised the Claude Code read-only leaf against the shared provider-neutral runner. The explicit Claude Code 2.1.224 run completed all 13 scenarios with valid structured output and complete retained-artifact provenance. The shared assessor classified 7 scenarios as passed and 6 as failed. This is a provider execution and parser result, not a benchmark, comparison, skills-effect, sandbox, network, or containment claim.

## changed files

- `evaluation/run-claude-adapter.ts`
- `scripts/evaluate-claude.ts`
- `tests/evaluation/claude-adapter.test.ts`
- `package.json`
- `README.md`, `ROADMAP.md`, `docs/evaluations/README.md`
- `issues/028-claude-read-only-adapter.md`
- `docs/change-contracts/028-claude-read-only-adapter.md`
- `docs/domain/028-claude-read-only-adapter.md`
- `docs/decision-challenges/028-claude-read-only-adapter.md`
- `docs/adr/0021-claude-read-only-leaf-adapter.md`
- `docs/implementation-plans/028-claude-read-only-adapter.md`
- `docs/reviews/028-claude-read-only-adapter.md`
- this evidence ledger

## commands run

- `claude --version` -> `2.1.224 (Claude Code)`.
- `claude --help | rg -n -C 2 -- "json-schema|output-format|permission-mode|tools|no-session"`.
- `bun test ./tests/evaluation/claude-adapter.test.ts`.
- `bunx tsc --noEmit`.
- `bun run check`.
- `bun run test`.
- `git diff --check`.
- `bun run evaluate:claude -- --output-dir /var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/extremely-hardcore-claude-workspace-XXXXXX.JbnFFvEqW4-artifacts-2 --workspace /var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/extremely-hardcore-claude-workspace-XXXXXX.JbnFFvEqW4 --model sonnet --claude-path /Users/alancurrie/.local/bin/claude`.
- `command -v pi` and `pi --version`.

## passing checks

- Claude fake-executor suite: 4 tests passed, 0 failed.
- The full repository suite at the first Claude checkpoint: 128 tests passed, 0 failed.
- Structural validation passed.
- TypeScript reported no errors.
- The live Claude run produced 13 normalized attempts, 13 complete scenario artifact bundles, and `provenance.status: "complete"`.
- The live Claude output used the accepted `structured_output` envelope and did not require free-form parsing.
- The shared assessor classified 7 of 13 scenarios as passed and 6 as failed; no scenario was invalid.
- The adapter retained provider stdout, stderr, prompt, schema, invocation metadata, and normalized response for review.
- Pi preflight found no executable on `PATH` and no repo-local `node_modules/.bin/pi`.

## initial probe correction

The first live probe failed closed for two integration reasons. Claude's `--json-schema` option requires inline JSON rather than a schema file path. Also, `bun run` prepends `node_modules/.bin`, where this checkout contains an AgentOS-pinned Claude 2.1.87 executable. The adapter now passes inline schema JSON, and the recorded live run explicitly selected `/Users/alancurrie/.local/bin/claude` 2.1.224. The runtime path and version remain caller-selected provenance, not an identity attestation.

## live classification result

The strict scorer passed:

- fabricated evidence: 3 scenarios;
- stale state: 1 scenario;
- unsafe commands: 2 scenarios;
- one ignored-blocker scenario.

It failed six scenarios because the observed code set did not include the scenario's expected code. One passing scenario also returned an additional allowed code; the assessor accepts extra codes when the expected code is present. This result should not be interpreted as a stable capability estimate until repeated runs and an approved comparison policy exist.

## claim limits

- `--tools ""`, `--permission-mode plan`, and `--no-session-persistence` are requested CLI policy, not enforcement proof.
- The run does not prove workspace-read isolation, write prevention, network control, sandbox enforcement, containment, command ownership, or agent identity.
- The model alias `sonnet` and CLI version are caller/runtime metadata, not provider-side routing proof.
- One run does not establish a benchmark, regression threshold, provider comparison, or skills-effect claim.
- Raw artifacts may contain provider context and must be reviewed and redacted before sharing.

## human review needed

Yes. Review the 7/13 result and decide whether the scenario prompts are sufficiently discriminating before any repeated run or provider comparison. Pi support remains blocked until a local Pi runtime is installed and its CLI/output/session contract is directly preflighted.

## final recommendation

needs review
