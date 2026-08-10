# evidence ledger: live Codex action-fixture pilot

## summary

Ran exactly one live Codex action-fixture pilot using the committed experimental adapter. The runner returned a passing two-stage fixture result with one completion transition, and the adapter returned `provenance.status: "complete"`. Manual inspection of the retained raw event streams found that the process read `/Users/alancurrie/.codex/memories/MEMORY.md`, outside the copied fixture workspace. The pilot therefore demonstrates the recorded fixture and artefact-integrity result only; it does not demonstrate workspace-read isolation or sandbox enforcement.

## changed files

- `issues/022-live-codex-action-fixture-pilot.md`
- `docs/change-contracts/022-live-codex-action-fixture-pilot.md`
- `docs/decision-challenges/022-live-codex-action-fixture-pilot.md`
- `docs/domain/022-live-codex-action-fixture-pilot.md`
- `docs/reviews/022-live-codex-action-fixture-pilot.md`
- `docs/evidence/022-live-codex-action-fixture-pilot.md`
- `ROADMAP.md`

## commands run

- `codex --version`
- `codex login status`
- `bun run evaluate:codex-action-fixture -- --output-dir /tmp/extremely-hardcore-live-codex-action-fixture-20260723-1 --model gpt-5.6-sol`
- Read-only inspection of the adapter report, fixture report, invocation records, protocol ledger, fixture workspace diff, provider artefact inventory, and raw event streams.

## passing checks

- Local preflight reported `codex-cli 0.145.0` and an authenticated ChatGPT session.
- Both requested provider stages exited zero: `fix` in 45,469 ms and `resume` in 50,810 ms.
- The adapter report records `gpt-5.6-sol`, `workspace-write`, `--ephemeral`, `--cd`, `--json`, and `--output-last-message` for both stages.
- The fixture result passed both stages with exactly one transition; its structural ledger order was `fix` evidence, `resume` evidence, then `resume` completion.
- The adapter report returned `provenance.status: "complete"` with no reported containment or digest failures.
- The copied workspace diff contained the expected `src/release-label.ts` correction and the runner-owned `fixture-state.txt` intervention; retained protocol artefacts were present below the run directory.

## failing checks

- Manual review of the retained `resume` event stream showed a successful command that read `/Users/alancurrie/.codex/memories/MEMORY.md`. This was outside the copied fixture workspace.
- The requested `workspace-write` mode therefore did not provide demonstrated workspace-read isolation for this pilot.

## architecture impact

No runtime architecture changed. The pilot falsifies any interpretation that the adapter's requested sandbox setting alone confines provider reads to the fixture workspace. Existing fixture scoring and provenance-integrity boundaries remain intact.

## public contract impact

No CLI or schema changed. Documentation now records one live operational result and its read-isolation limitation.

## risks left open

- Raw provider events remain provider-owned data, not command-attestation or identity proof.
- The observed out-of-workspace read means provider prompts, configuration, and accessible local files require a stronger containment model before repeated execution.
- The run makes no claim about no-network execution, model routing, provider capability, or cross-agent performance.
- The local output directory may contain sensitive content and must not be shared without redaction.

## human review needed

Yes. Do not repeat, compare, benchmark, or add another provider until a human decides whether to redesign the execution containment boundary, for example through an isolated worktree, container, or provider-supported policy with direct enforcement evidence.

## final recommendation

needs review
