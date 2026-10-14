# Released Preview Discovery

Date: 2026-10-14. After the user approved committing the release records and
moving next, the approved three-file slice was committed locally as
`40e7e3d0b552630d032327d6a15dea6c6c9f36d8`. The checkout was clean immediately
after that commit. No push ran; public release `v0.0.1` remains pinned to `7dc35a5`.

- result: complete
- claim: The actual public skills-only ZIP passes fresh no-model Claude metadata diagnostics and Pi native-loader discovery after extraction into a new directory.
- evidence: All 21 files match the reviewed inventory before/after; 19 resource links resolve. Claude validation/details/list exit zero and list nine skills. Pi discovers nine canonical skills with zero diagnostics; the single-file control discovers only the entrypoint. Source validation and 22 focused tests/69 assertions pass.
- remaining uncertainty: These checks do not establish model-visible delivery, engineering adherence, isolation, cost, persistent installation or Codex native session loading. Pi was tested through its loader API, not full CLI startup.
- next: needs review; review/commit this new record, then prepare one bounded read-only planning observation using the released package. Fresh provider-payload consent and host checks are required before dispatch.

## Scope And Decision

Minimum complete change: download the existing named ZIP anonymously, verify
its approved pin, extract into a fresh temporary directory and exercise only
existing no-model diagnostic/loading interfaces. Preserve the published release,
core files, earlier candidates, host settings and development history. No
installation, auth operation, model task, dependency install or release mutation.
Stop on input/native-module drift, unexpected catalogue entries, escaping
resources, warnings or any need to widen authority. No new ADR is required:
this observes the existing standalone/loading decisions without changing them.

Decision challenge: provenance and potential host-support claims apply.
The strongest counterargument is that another green loader result is not
engineering acceptance. Hosts own discovery/execution; EHS supplies unchanged
guidance. Record only released-artifact identity and narrow discovery, leaving
support limits intact. Verdict: **proceed** for no-model discovery only.

## Observations

The anonymous public download has SHA-256
`fa8ba33095dac8c493810f9e9fd606fcd24fca3aeec21daf6e659887c61e01f3`,
375,125 compressed bytes and 21 files. Every extracted file matches inventory
120 before/after; the 20 non-README files also match committed `7dc35a5` bytes.
The distribution README is the separately reviewed package README. All 19
local resources resolve inside the extracted root.

Claude Code is `2.1.289`, binary SHA-256
`03d66745e3bb69ec727d66023696f3820bc0a00a8a5ba725eb6706d0c67cbe69`.
Process-only diagnostic options reuse check 117: explicit extracted plugin,
empty setting sources, disabled ordinary hooks/memory, strict empty MCP, Read/
Skill and no session persistence. They request a narrow profile, not proven
isolation or complete host-state immutability.

- `plugin validate <root> --strict --json`: success; no errors/warnings.
  Its empty `contents` result is manifest validation, not skill-body validation.
- `plugin details extremely-hardcore`: nine skills, zero agents/hooks/MCP/LSP.
  The ~376 always-on token projection is an estimate, not measured consumption.
- `plugin list --json`: only `extremely-hardcore@inline`, enabled, 0.0.1,
  session scope and the fresh extracted root. No persistent install was requested.

Pi is `@earendil-works/pi-coding-agent` 1.1.0. The inspected loader SHA-256 is
`0e20ec500ed9783d5b01b5399e6600134fc3fdd10e6dc46c9113bc01565c9aa5`.
Direct `loadSkills` uses the README's nine-skill directory, a temporary cwd,
explicit unused agent directory and `includeDefaults: false`. Names, descriptions
and package-local paths match all nine source skills; diagnostics are empty.
Its prompt catalogue contains nine entries. The entrypoint-only control returns
one skill, reinforcing the documented directory route. No Pi CLI/session,
extension/default-resource loader, credentials or provider is invoked.

Codex's explicit-path README route and resource closure were checked locally;
no native Codex install/session or model-visible read is claimed.

## Retention And Follow-up

Raw Claude argv/results and the native loader summary remain mode-0600 under
`/private/tmp/ehs-released-discovery-121.KVLYyu/`, outside the package. Temporary
retention can expire; these records are not trusted attestation.
Summary SHA-256:
`0e8742e70496a175b68ac685995b0558a34d9b9bc35850ec360e827f15c5fc61`.
Disposable helper SHA-256:
`4f4edb8ee246c6ee84e23da5fa9daa5bcc6605cb327c569919e667c56b7b938a`.
No helper is committed or introduced as an EHS runtime.

This record and its roadmap/index pointers are a new, uncommitted follow-up,
distinct from the approved release-record commit. Validation, focused tests,
resource checks and whitespace checks pass; no runtime suite or behavioural
trial was run. The next useful step is one explicitly consented model-visible
planning observation of this package, not more discovery checks or machinery.
