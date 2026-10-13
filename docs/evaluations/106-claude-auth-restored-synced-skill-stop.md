# Claude Auth Restored, Synced-Skill Preflight Stop

Date: 2026-10-13. Follow-up to
[auth stop 105](105-claude-implementation-auth-stop.md) for the explicitly
approved limited observation in [review 104](104-claude-implementation-boundary-review.md).
No model observation launched.

- result: blocked
- claim: Normal Claude subscription sign-in is restored, but fresh configuration inspection finds an unreviewed synced-skill source. The approved implementation observation remains undispatched.
- evidence: Native login exits successfully; default and proposed-profile auth status report loggedIn true, claude.ai and firstParty. CLI/build and staged plugin checks pass. The previously absent user skill directory now contains 15 additional SKILL.md-bearing directories. Ten local observer tests/48 assertions pass; fixture bytes remain unchanged.
- remaining uncertainty: Whether this cache enters the proposed runtime inventory or model context is unknown. Its contents were not read or staged. There is no model startup, native EHS invocation, Edit, implementation result or parent final verification.
- next: needs follow-up; review native synced-skill loading controls without a model, credential substitution, cache deletion or guard relaxation. No further login is needed; do not automatically launch after auth recovery.

## Scope And Recovery

The user separately authorised starting Claude's normal subscription login.
`claude auth login --claudeai` reported Login successful and exited 0; redacted
default auth confirmed readiness. The user then reported signed in, resuming
preparation for the already approved limited task, not authorising another
payload, broader tools or a retry.

A fresh proposed-profile auth check at `2026-10-13T13:27:21.765Z` also exits 0:
loggedIn true, authMethod claude.ai, apiProvider firstParty. No credential values
or raw account identity were retained. Normal host credential handling remains
host-owned; this is not a new EHS auth mechanism or copied credential route.
Record 105 remains historical; its failed checks were not rewritten.

## Passing Local Checks

CLI remains 2.1.289 and its binary pin matches 104. The fresh skills-first
plugin contains the same 17 files and nine skills. Native validation/list/details
pass; model/tool/permission flags parse without a model. Inspected user settings
hash matches the earlier preflight; listed provider override environment names
remain unset. These are partial local diagnostics, not an effective runtime or
remote-managed-policy attestation.

The new disposable fixture contains the original defective source and fixed
13 tests, plus requirements and staged plugin. Original source SHA-256 remains
`017be8a1bc3d8a6830cda26cd5fffc14354cec7ac3dcf85b39bf2c1440e891e0`;
tests remain `afc6e9c732eb5fba31be29386472e92322840726ff8c71c893bcfa5faaac2ec0`.
Fresh red qualification was not reached because configuration checks stop first.
Prior regression qualification is not presented as a new run.

Private observer preparation validates exactly Read/Skill/Edit before reusing
the existing predicate's catalogue checks through a local projection. The
repository's Read/Skill-only predicate is unchanged; no native event is rewritten
or accepted globally. Initial tests against the unchanged predicate fail two
cases (candidate rejected; missing Edit accepted). After the private wrapper,
ten tests/48 assertions pass, covering catalogue/tool drift, scoped paths,
forbidden edits/tools, clean and malformed JSON, split UTF-8, successful synthetic
Skill/Edit results, outside reads, permission errors, missing result and child
deadline closure. All subprocesses are local fake fixtures, not Claude calls.
The observer's live path remains untested.

## Stopping Evidence

Fresh presence inspection finds `~/.claude/skills/synced`, contrary to the
earlier absent-user-skills snapshot. A metadata-only directory inspection finds
15 non-symlink directories with SKILL.md: algorithmic-art, built-in-browser,
chrome-browser, computer-use, deep-research, docs, docx, google-workspace,
import-memory, mcp-builder, morning, pdf, pptx, skill-creator and xlsx.
Two other entries are metadata files. No skill bodies or cache-manifest contents
were inspected or copied, and account-specific bucket identifiers are omitted
from the retained inventory and this record.

These names differ from the 17 built-in skill names reviewed in 085/090.
Their presence does not establish runtime loading, invocation, maliciousness,
or disclosure. Conversely, the staged plugin's nine-component inventory cannot
establish that this user cache is excluded. Installed help exposes no standalone
skills-inventory subcommand. Further source/control review is needed; do not
launch merely to discover unreviewed instruction exposure.

The local prepare helper stops at its configuration assertion, before writing
the ready gate, running original-red qualification or dispatching the CLI.
The later local observer tests do not resume that helper or clear its stop.
There is no dispatch marker, implementation request, result, usage or elapsed
model budget. Model-launch and model-retry counts remain zero.

Decision challenge verdict for launch: **hold**. Fresh auth does not override
the configuration stop in 104. No new architecture/permission mechanism,
adapter or persistent policy is introduced; no new EHS ADR needed. Do not remove
the user's synced skills, switch to API-key/bare auth, silently accept extra
catalogue entries, enable Bash, or build a permission shim to force a pass.

This is a developer-trial provenance hold, not an EHS behavioural failure or
evidence that ordinary EHS installation is broken. The method does not require
users to erase their other skills. A materially revised trial profile or
accepted exposure needs its own review before the single unlaunched task.

## Retention And Verification

Private root: `/private/tmp/ehs-claude-106.eS7M6k`. Thirty-nine regular,
symlink-free files are SHA-256 pinned; files mode 0600, directories 0700.
Retention includes fixed fixture/plugin, diagnostic records, redacted auth,
configuration presence, metadata-only synced inventory, private observer/helper
sources and local test results. There is no provider transcript. Temporary
retention may expire; review/redact before sharing.

- Manifest: `479b70c55fb0ccf7db7b9a3a8d250f747306a6e54073638fec86ddf454cd1403`.
- Profile auth: `16663d4cfba602f0d89399067acf968e62a5950e7afcd0276237fb46841d7659`.
- Configuration: `9094b6873ba28473cc98d3ab08f7492a13ece5b3a760cad2e6157c541f33d5fe`.
- Synced inventory: `6d58888c8e95b12cb32e7004d71d722c7439188ac49381396c4f4c3c8167f287`.

Repository scaffold validation passes. Full product tests were not rerun for
this temporary preparation and documentation work. No product code, skill,
adapter, CI, commit or publication changes occurred.
