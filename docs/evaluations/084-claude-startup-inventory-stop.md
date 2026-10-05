# Claude Startup Inventory Stop

Date: 2026-10-05. One approved attempt after
[runtime review 083](083-claude-runtime-gate-review.md), with explicit scoped
Anthropic consent in the conversation.

- result: blocked
- claim: The authorised Claude process reached native startup, then the controller stopped on previously unreviewed built-in plugins. No planning answer or behavioural acceptance was obtained.
- evidence: One process, 1,713 ms, exit 143; one native init event; Read/Skill only, empty MCP inventory, expected permission mode/version and resolved Sonnet; three additional built-in plugins; zero observed tool calls; source/staged files and user settings unchanged.
- remaining uncertainty: No final/result/usage event or native EHS invocation was retained. The trace does not establish whether a model request reached Anthropic before termination, exact instruction bytes, enforcement or adherence. Cost is unavailable, not zero.
- next: needs follow-up; review the retained built-in entries and startup predicate offline before proposing any fresh attempt. No retry is authorised by this stopped trial.

## Execution And Gates

The controller used the exact text task in plan 080 with unchanged EHS content,
CLI `2.1.289`, requested `sonnet`/high, a 180-second deadline, eight-turn limit,
USD 1.00 API-cost cap, no persistence, no Chrome, restricted mode, empty ordinary
settings sources, process-only disabled hooks/memory, strict empty MCP config,
`Read,Skill`, `dontAsk`, and scoped Read/EHS Skill permission rules. No Bash,
Write, Edit, web, app or delegation tool was requested.

Immediately before dispatch, native manifest, inline-plugin inventory and
redacted subscription auth checks passed. Doctor again reported remote policy
ineligible for the subscription. Inspected ambient/endpoint-managed paths were
absent, listed provider/config overrides unset, and the known user settings hash
unchanged. Only the manifest and nine skill directories were staged, with no
symlinks, credentials, private captures, memories, oracle or unrelated source.

The native startup event reported:

- Model: `claude-sonnet-5-5`; permission mode: `dontAsk`; CLI: `2.1.289`.
- Tools: exactly `Read` and `Skill`; MCP servers: none.
- All nine qualified EHS skill names in the skill catalogue.
- EHS plugin at the expected staged path, source `extremely-hardcore@inline`.
- Three additional plugins at path `builtin`: `cc-plugin-agents-md`,
  `cc-plugin-telemetry`, `cc-plugin-plugin-authoring`, each labelled with its
  corresponding `@builtin` source.
- Seventeen additional unqualified skill catalogue names, including `design`,
  `debug`, `verify`, `simplify`, `loop` and `plugin-authoring`.

The preflight `plugin list` exposed only inline EHS; it was not the complete
runtime catalogue. The driver required exactly that single plugin in startup
and stopped with `unexpected startup plugins`. It sent SIGTERM to the detached
process group and retained exit 143. No retries, fallback or resume followed.
The approved single attempt is consumed even though no completed turn was seen.
`modelInvocations: 1` in the controller report counts the spawned Claude
process, not an independently observed provider inference or completed turn.

These entries are host-labelled built-ins, not evidence of user-installed
plugins, private file exposure or out-of-scope tool execution. Conversely,
their names/source labels alone do not justify silently ignoring them, changing
the frozen guard or claiming isolation. This is a controller/host-inventory
finding, not an EHS behavioural failure. Catalogue presence is not invocation.

## Assessment

The original eight criteria are unchanged. No behavioural score is inferred
from a missing answer.

| Criteria | Disposition | Reason |
| --- | --- | --- |
| 1-7: contract, witness, tests, implementation path, ADR decision, approval behaviour, receipt | Not observed | No candidate planning answer |
| 8: complete retained delivery and verified boundaries | Fail | Startup guard stopped; no native invocation, completion or usage |

Exact prompt SHA-256:
`0f489447e4de5cb3c2117fde1cc2f7a62e9e3bd3cb6ffadb5461a052bbf9d7ae`.
Source/staged skill snapshot before and after:
`950395136804be0786a803d6688b10f3f04cde43ada26753074d689b429aa596`.
Whole staged workspace inventory before and after:
`0545b50b5f4ce24914486b2bdf8c6c51bf3a325abd0a4f8e49cfaf9c9b6a1f95`.
User settings remain unchanged. No EHS skill, adapter, auth mechanism or public
contract changed; no new ADR was required for this observation.

## Controller Verification

The temporary read/skill guard was tested before dispatch. Its unimplemented
stub failed all eight checks; the first implementation then failed two legitimate
reads because macOS canonicalises `/tmp` to `/private/tmp`. After accounting
for the workspace alias, eight checks passed with nine assertions, including
outside-tree reads, escaping symlinks, undeclared/non-EHS skills and shell tools.
Those tests exercise the controller predicate, not Claude permissions or EHS.
Startup-plugin discrimination itself was not regression-tested against a native
init event before this attempt; that coverage gap is material to the next review.

`bun test` completed with 186 passing tests, zero failures and 700 assertions;
it also traversed the reference Superpowers test files. No product implementation
was added. These checks do not clear a failed provider attempt or prove
filesystem containment. Detection of streamed events is not prevention.

## Private Retention

Root:
`/private/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-claude-084-8riZZG`.
Reports/traces/controller copies are mode-0600 files outside the staged workspace.
Temporary files may disappear; do not publish them without review.

| Artefact | SHA-256 |
| --- | --- |
| `report.json` | `93d75963fbe96fa6a9f40c2a0b9896a0f809171263ebb1392c0caa3db8e03db5` |
| `stdout.jsonl` | `5606bdf003d6adf297430e0aaafd7f1fc1cb8a1e804caad720cf1a3dae5be40f` |
| `invocation.json` | `0028407dc2c8274571117a65356fc0bd45a0000842ce8f5ebdc34f0c757af1f9` |
| `stderr.txt` (empty) | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `ehs-084-trial.mjs` | `deb8de917a69dc9c6897fe6c77f26c612ae7369184952f3e0c18a8349bac55d2` |
| `ehs-084-audit.mjs` | `baf16a5b78bf40b7b443a9e7db2be5f9e879ab5b03430e9ba465dd7747e51396` |
| `ehs-084-audit.test.ts` | `03d77096c11c898b7aac07278b680cf0275b66fa8644c0b6e409fefd632d468a` |

Controller copies were added after report emission; their digests are recorded
here, not backfilled into the original report. No final answer file exists.
Next scope is an offline, evidence-led decision about built-in catalogue
handling, with a focused startup regression before any separately authorised
retry. Claude acceptance, Pi acceptance, comparisons and release remain open.
