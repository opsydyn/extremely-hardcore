# Codex skill discovery: no-model probe

Date: 2026-09-22. Approved follow-up to the
[capability assessment](061-pinned-loading-capability.md).

## Contract

Test whether the installed Codex app-server discovers a pinned copy of this
working tree's full skill tree in a disposable home. Compare against an empty
control home. Stop after `initialize`, `initialized`, and `skills/list` with
`forceReload: true`. No thread, turn, model, provider adapter, or comparison run.
The repo's existing ADR 0006 still governs later provider and provenance work;
this local inventory probe introduces no contract or architecture change.

## Setup

Host: `codex-cli 0.154.0`. A temporary Node client started two separate
`codex app-server --stdio` processes. Each had its own empty workspace outside
the repository ancestry, its own `HOME` and `CODEX_HOME`, and an environment
limited to PATH, HOME, CODEX_HOME, TMPDIR and LANG. The treatment home received
a copy of all nine `skills/` directories, including templates. The control
home received none. Symlinks were rejected before copying. No personal config,
credential file, or auth token was copied into either home.

The source tree contained 16 files. A sorted manifest of relative path, byte
length and SHA-256 was computed before and after; its JSON SHA-256 was
`5a19b8108349ce3dd71450ad3639302dd2779e829ef1ea537979e95674665043`.
The staged manifest matched that source manifest exactly before startup. The
source and all staged files remained byte-for-byte unchanged after the probe.
This identifies a working-tree snapshot, including pending edits; it is not a
commit pin. The raw local response and manifest are retained at
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-discovery-NIeDoy/probe.json`.
That temporary file may be removed by the host.

## Observed result

| Case | EHS skills discovered | Other skills | `skills/list` errors |
| --- | ---: | ---: | ---: |
| Empty control | 0 | 6 bundled `.system` skills | 0 |
| Staged treatment | 9 | 6 bundled `.system` skills | 0 |

Treatment discovery returned enabled paths under the copied tree for
`architecture-decision`, `bounded-context-review`, `change-contract`,
`decision-challenge`, `domain-discovery`, `evidence-ledger`,
`simple-made-easy`, `test-first-implementation`, and
`using-extremely-hardcore`. No EHS path appeared in control. The host created
the bundled `.system` files in both homes during startup; these were the only
new files under either `skills/` directory. The first strict whole-directory
check exited 1 because it counted those files. Inspection found no changed
original file or other new path. The corrected check exited 0 on a rerun and
preserved the same 0-versus-9 discovery result.

The request log contains only the handshake and `skills/list`; an unsolicited
`remoteControl/status/changed` notification was observed. No thread or turn
was started. Discovery establishes that this host sees the staged EHS skill
metadata and paths. It does not establish injection into a turn, full skill
file consumption, adherence, baseline exclusion in a real task, or provider
isolation. It does not lift the comparison hold.

## Next boundary

A loading probe should use a fresh pinned copy and a single harmless task,
request the skill by its absolute staged path, retain host events and available
usage, and look for host-side evidence of instruction delivery. It must also
inventory the control arm and distinguish explicit skill request from actual
loading. If the host does not expose delivery evidence, record that limitation
instead of treating a final answer or marker echo as proof. Keep the task
read-only and review retained traces before sharing them.

## Receipt

- result: complete
- claim: The installed host discovers all nine copied EHS skills and none in the empty control.
- evidence: Two local `skills/list` responses, copied-file manifest, and a zero-exit corrected probe.
- remaining uncertainty: Turn-level instruction delivery, usage, and comparison isolation were not tested.
- next: Qualify one explicit-path loading turn and its retained trace.

Recommendation: needs follow-up.
