# evidence ledger: Pi read-only adapter

## summary

Implemented and locally verified the Pi 0.84.1 read-only leaf against the shared provider-neutral runner. Pi's executable, JSON event mode, and no-tools/no-session CLI surface were directly preflighted. Fake-executor coverage passes, but no live model call was attempted because Pi reports provider credentials are not configured for Anthropic, OpenAI Codex, or Google.

## changed files

- `evaluation/run-pi-adapter.ts`
- `scripts/evaluate-pi.ts`
- `tests/evaluation/pi-adapter.test.ts`
- `package.json`
- `README.md`, `ROADMAP.md`, `docs/evaluations/README.md`
- `issues/029-pi-read-only-adapter.md`
- `docs/change-contracts/029-pi-read-only-adapter.md`
- `docs/domain/029-pi-read-only-adapter.md`
- `docs/decision-challenges/029-pi-read-only-adapter.md`
- `docs/adr/0022-pi-read-only-leaf-adapter.md`
- `docs/implementation-plans/029-pi-read-only-adapter.md`
- `docs/reviews/029-pi-read-only-adapter.md`
- this evidence ledger

## commands run

- `pi --version` -> `0.84.1`.
- `pi --help`.
- `pi --offline --no-tools --no-session --mode json --print --help`.
- `pi auth check --provider anthropic --json --no-refresh`.
- `pi auth check --provider openai-codex --json --no-refresh`.
- `pi auth check --provider google --json --no-refresh`.
- `bun test ./tests/evaluation/pi-adapter.test.ts`.
- `bun test ./tests/evaluation/pi-adapter.test.ts ./tests/evaluation/claude-adapter.test.ts`.
- `bun run test`.
- `bun run check`.
- `bunx tsc --noEmit`.
- `git diff --check`.

## passing checks

- Pi fake-executor suite: 4 tests passed, 0 failed.
- Combined Pi and Claude leaf suites: 8 tests passed, 0 failed.
- Full repository suite: 132 tests passed, 0 failed.
- The fake Pi adapter covered all 13 agent-attempt scenarios through the shared scorer.
- The leaf asserted JSONL event framing, final assistant `message_end` extraction, split text-block joining, strict JSON parsing, code-fence rejection, malformed-stream rejection, non-zero exit handling, and pre-invocation guards.
- Requested Pi argv includes JSON event mode, print mode, no session, no tools, disabled project-local resources, no approval, offline startup mode, and explicit model selection.
- Pi's installed command and version are directly available outside the repository dependency graph.
- No provider credentials were printed or persisted by these checks.

## live execution boundary

No live Pi classification run was started. All three checked providers returned `{"status":"not_ready","reason":"credentials_not_configured"}` with `--no-refresh`. Starting `/login`, providing an API key, or using a subscription credential would be a separate user-authorized authentication step.

## claim limits

- `--no-tools`, `--no-session`, `--no-approve`, and `--offline` are requested CLI policy, not enforcement proof.
- `--offline` disables Pi startup network operations but does not control model-provider traffic.
- JSON event mode is structured transport, not schema-constrained model output.
- No live run proves workspace isolation, write prevention, network control, sandbox enforcement, containment, command ownership, provider identity, or provider performance.
- No comparison or benchmark claim is supported.

## human review needed

Yes. Authenticate one intentionally selected Pi provider before a live run, choose the model explicitly, and review the prompt discriminability exposed by the Claude 7/13 result before treating cross-provider outputs as comparable.

## final recommendation

needs authentication and review
