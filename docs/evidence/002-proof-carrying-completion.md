# evidence ledger: proof-carrying completion gate

## summary

Implemented the first protocol slice: command evidence capture, Git workspace fingerprints, completion validation, and an append-only `implemented -> complete` transition through a Bun CLI.

## changed files

- `protocol/`: versioned run, evidence, fingerprint, validation, and transition primitives.
- `scripts/eh.ts`: Bun CLI for `evidence`, `validate`, and `transition`.
- `tests/protocol/`: unit and subprocess-level end-to-end coverage.
- `examples/proof-carrying-completion/`: isolated executable demonstration.
- `skills/evidence-ledger/SKILL.md`: protocol-backed completion instructions.
- `README.md`, `ROADMAP.md`, and `package.json`: user-facing commands, milestone state, and focused checks.

## commands run

- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `bun examples/proof-carrying-completion/demo.ts`

## passing checks

- Structural repository validation passes.
- 21 focused tests pass, including stale evidence, failed commands, open blockers, paths with spaces, bounded logs, non-mutating rejection, and append-only completion.
- TypeScript reports no errors.
- The demo rejects uncovered and stale evidence, refreshes the stale criterion, and records one accepted transition.

## failing checks

- Expected red tests were observed before each protocol slice was implemented.
- No failing checks remain.

## architecture impact

The CLI is a delivery adapter over the protocol. The protocol owns run and evidence semantics and depends only on Bun-compatible Node standard-library APIs. Git fingerprinting is isolated behind `workspace-fingerprint.ts`; skills do not enter the runtime dependency graph.

Bounded-context review verdict: `safe with noted risk`. Filesystem writes are local and run-owned, but concurrent writers and crash-atomic JSONL append semantics are not addressed in this proof slice.

## public contract impact

Adds the experimental `eh evidence`, `eh validate`, and `eh transition` commands plus schema version 1 JSON records. No existing command or skill contract was removed.

## risks left open

- Runtime schema migration and strict structural parsing are not implemented.
- Concurrent evidence capture or transitions are not locked.
- A process crash can leave orphan evidence or a partial final JSONL line.
- The trust model is traceability in a non-adversarial local workspace, not tamper resistance.
- Product value and operating overhead still require five dogfood runs.

## human review needed

No additional design decision blocks this accepted slice. Review is still useful before treating schema version 1 as stable.

## final recommendation

merge
