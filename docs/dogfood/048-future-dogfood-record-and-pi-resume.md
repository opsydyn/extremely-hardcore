# Real Operator Dogfood Run 048: future record and fresh Pi handoff

## purpose

Exercise the minimum future-record convention and one authorized fresh Pi
session that receives only a durable `eh status` snapshot. This is a dogfood
check of record clarity and a handoff boundary, not a provider benchmark.

## change

- **Change type:** Future dogfood documentation and fresh-session handoff check
- **Risk lane:** Standard
- **Target:** EHS repository
- **Target baseline:** Current working tree, preserving Run 047 and earlier records
- **Run:** `.extremely-hardcore/runs/048-future-dogfood-record-and-pi-resume/`
- **Scope:** Add one reusable record template, document this run, and check that
  a fresh Pi session can interpret supplied status. No runtime, protocol schema,
  provider adapter, credential, or external writable-execution change.

## protocol path

1. Created a standard-risk Run 048 with eleven acceptance criteria.
2. Paused `implemented -> needs-human-decision` with transition id
   `8a4f91ac-fdf9-4a67-85ac-43d07ffce5ed` before the fresh-session check.
3. `bun run eh status` reported `needs-human-decision`, eleven uncovered
   criteria, zero blockers, and the next action to record the human decision or
   abandon the run.
4. Started Pi `0.84.1` with `--no-session --no-tools --no-context-files` and
   supplied the status snapshot as prompt text. The check required one exact
   handoff marker and did not retain raw provider output.
5. Resumed `needs-human-decision -> implemented` with transition id
   `53eae06f-553f-4568-97b4-0b899495ab52` after the marker passed.
6. Captured the final evidence set, validated the run, completed the protocol,
   and generated attestation and CI projections.

## operator timing

| Phase | Started | Finished | Observed interval | Provenance |
| --- | --- | --- | --- | --- |
| Setup and inspection | not measured | not measured | not measured | no timestamp capture in this slice |
| Implementation and verification | not measured | not measured | not measured | no timestamp capture in this slice |
| Review and handoff | not measured | not measured | not measured | no timestamp capture in this slice |

## friction and false blocks

| Category | Observation | Resolution | Bypass used |
| --- | --- | --- | --- |
| Handoff boundary | The durable status snapshot had to be explicitly supplied to the fresh session. | Pi returned the required marker from the supplied snapshot. | no |

- **False-block outcome:** Zero false blocks observed. The intentional
  `needs-human-decision` pause was a protocol boundary, not a false block.
- **Workarounds:** No source, protocol, environment, or command workaround was
  used. The shell parser retained only the exact marker; raw Pi JSONL was not
  retained.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria | 11/11 covered |
| Open blockers | 0 |
| Protocol validation | valid at the final workspace fingerprint |
| Final transition | `implemented -> complete` after final evidence capture |
| Focused and broad checks | `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass |

## evidence quality

- **Run/evidence/log retention:** The Run 048 directory and eleven
  criterion-linked evidence records are retained. The exact Pi marker and
  command boundary are recorded here; raw provider JSONL is not retained.
- **Attestation and CI projection retention:** Attestation and CI outputs were
  generated under `/tmp` for this local validation and are not committed as
  product records.
- **Host-captured evidence:** Pi version, the no-tools/no-session/no-context-files
  invocation, the exact marker, protocol transitions, and repository command
  results.
- **Record-reported evidence:** The purpose, interpretation, friction, and
  limitation classification in this record.
- **Not evidenced:** File-reading resume, arbitrary workspace continuation,
  cross-provider adherence, independent containment, provider comparison, or
  release readiness.

## fresh-session resume

- **Snapshot source:** Direct `bun scripts/eh.ts status
  .extremely-hardcore/runs/048-future-dogfood-record-and-pi-resume` output.
- **Host and version:** Current host, Pi `0.84.1`, model
  `openai-codex/gpt-5.3-codex-spark`.
- **Session boundary:** Fresh Pi process; no session persistence, tools, or
  context files; the EHS skill file was explicitly loaded; the status snapshot
  was prompt input.
- **Expected action or marker:**
  `EHS_RESUME provider=pi state=needs-human-decision next=record-human-decision-or-abandon source=provided-status limitation=not-file-read`
- **Observed action or marker:** The exact expected marker was emitted and the
  parser exited 0.
- **Claim supported:** One fresh Pi session interpreted a supplied durable
  status snapshot and preserved the stated next action and limitation.
- **Not proved:** Pi read the run from disk, resumed arbitrary work from files,
  enforced the protocol independently, or adhered to the method on a real code
  change.

## limitations

This slice adds a documentation convention and one prompt-fed Pi smoke. It does
not migrate historical records, add a validator or adapter, retain provider
transcripts, or establish timing rates. Codex and Claude model loading,
file-reading resume, accepted writable containment, and release remain open.

## next

Use the template on two or three real changes and reassess field burden before
considering a stronger file-reading resume proposal.
