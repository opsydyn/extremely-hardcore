# Dogfood Run 1: proof-carrying completion gate

## change

Feature: added the first guarded `implemented -> complete` protocol transition, evidence capture, validation, workspace fingerprinting, CLI, tests, and executable demo.

Risk: standard. The change introduced an experimental local CLI and JSON protocol, but did not alter authentication, deployment, CI, or external services.

## gate record

Run directory: `.extremely-hardcore/runs/002-proof-carrying-completion/`.

Four criteria were captured against workspace fingerprint `e33e7df8a6e4211fa31860429b366de7f5305e3fadba86edf9a08116819130a6`:

| Criterion | Command | Exit | Duration |
| --- | --- | --- | --- |
| `repository-valid` | `bun run check` | 0 | 32 ms |
| `protocol-tested` | `bun run test` | 0 | 836 ms |
| `types-valid` | `bunx tsc --noEmit` | 0 | 403 ms |
| `demo-completes` | `bun examples/proof-carrying-completion/demo.ts` | 0 | 290 ms |

The gate validated and appended one `implemented -> complete` event with all four evidence IDs.

## observed behaviour

- No false block occurred after evidence was captured.
- The executable demo deliberately produced an uncovered-criterion rejection and stale-evidence rejection before completing, so the primary invalid states were exercised.
- Setup overhead was not separately timed. It must be measured in runs 2-5 before claiming the standard-lane overhead target.
- A fresh agent can reconstruct the completion decision from `run.json`, evidence records, logs, and `transitions.jsonl` without conversation history.
- No manual protocol edits or workarounds were used after the run directory was created.

## finding

This run establishes that the basic loop is operable on the project that introduced it. It does not yet establish representative reliability or acceptable operator friction.
