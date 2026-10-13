# Pi Candidate Discovery

Date: 2026-10-13. The user approved committing the reviewed docs/banner and then
checking Pi discovery against the extracted candidate. The prior seven-file
slice is committed locally as `c85542914acd0c319fa100a55befc15a0d89dd10`; its tree
was clean before this follow-up. The provided GitHub destination is recorded in
the roadmap, without remote configuration, push or publication.

- result: complete
- claim: Installed Pi's native skill-loader API discovers the exact nine EHS skills from candidate 116's extracted directory, without a full CLI session or model call.
- evidence: Zero native diagnostics; nine canonical names, descriptions and package-local file paths; nine generated catalogue entries. The single-file control registers only the entrypoint. All 20 extracted files, the archive and loader pins remain unchanged.
- remaining uncertainty: This is native API discovery, not full CLI startup, installed-route support, model-visible instruction delivery, engineering adherence, measured cost or permission enforcement. Rights/privacy and release approval remain open.
- next: needs review; review this evidence, then perform a read-only source/history privacy and artwork-provenance review before any publication decision. No model trial, remote configuration or push is implied.

## Contract And Boundaries

Use installed Pi's existing native skill-loader API against candidate 116's
unchanged extracted skills directory. Take the directory argument from its actual
README, verify the nine canonical names, native diagnostics and resolved paths,
and check the complete candidate/archive pins before and after. Inspect the
installed loader before importing it. Keep reports and disposable diagnostic code
outside the payload; do not change any skill, manifest, package or host setting.

Do not start Pi's full CLI, a model/session, auth flow, extension/resource loader,
default skill scan or installation. No credentials or provider payload. No new
ADR is required for this local observation under the existing
[standalone boundary](../adr/0023-standalone-work-receipt.md). Discovery is not a
public support promise or proof of model-visible instruction delivery.

## Decision Challenge

Trigger: artifact provenance and possible transfer of narrow discovery evidence
into support claims. Proposal: one native loader probe, with no full CLI or model.
Pi owns loading and execution; EHS owns its unchanged engineering instructions.
The useful result is candidate-specific discovery evidence, not a new harness.

Strongest counterargument: a pure loader probe cannot establish full startup,
ambient-resource exposure, permission enforcement or engineering behaviour.
Accept the narrower result explicitly; do not add a runtime or widen the check.

| Claim | Current evidence | Gap / required evidence |
| --- | --- | --- |
| README selects the nine-skill directory | Existing package text and source probe 115 | Native probe against this exact extracted path |
| Candidate inputs are unchanged | Pins and archive checks in 116/117 | Fresh before/after file and ZIP verification |
| Native loader can discover candidate skills | Installed loader is still 1.1.0 with the inspected hash | Exact names, file paths and zero diagnostics |
| Pi has followed the candidate during engineering work | Not established by discovery | Separate approved behavioural qualification |

Minimum credible slice: direct `loadSkills` with explicit paths and defaults
disabled. Stop on input/module drift, unexpected names, warnings/collisions,
out-of-package paths or any need for auth, model, configuration or installation.
Verdict: **proceed** for this no-model discovery check only.

## Observed Native API Result

The installed package is `@earendil-works/pi-coding-agent` version `1.1.0`.
Its inspected `dist/core/skills.js` SHA-256 remains
`0e20ec500ed9783d5b01b5399e6600134fc3fdd10e6dc46c9113bc01565c9aa5`.
The probe imports that module directly, not Pi's root SDK or CLI. Inspected
imports provide local paths, package metadata and frontmatter parsing; no auth,
agent-session, model or extension factory is invoked.

The probe reads the actual extracted README's `$EHS_ROOT/skills/` argument and
resolves it against the extracted root. `loadSkills` receives that explicit path,
a private temporary cwd, an explicit unused agent-directory path and
`includeDefaults: false`. No default user/project skill scan is requested.

Native output contains exactly the nine canonical names, matching descriptions
and expected package-local `SKILL.md` paths, with zero warnings/collisions.
`formatSkillsForPrompt` produces nine catalogue entries. That local projection
does not establish that a model received or followed the instructions.
An actual single-file control returns only `using-extremely-hardcore`, with zero
diagnostics: it does not register siblings and is not the documented package path.

The archive and complete extracted-tree membership/bytes match the approved pins
before and after. Archive SHA-256 remains
`d8cc52b6b445cb7646e7ab9d56fb4637d901c647947b2c8492523e0f89105e3d`.
The core source remains pinned to `c1e1997`; the README, authored but uncommitted
at candidate creation, is now committed byte-identically in `c855429`. No rebuild
or retrospective alteration of candidate 116's provenance is implied.

This is an exercised native discovery API, not the full CLI command advertised
in the README. No CLI startup, settings/credential access, auth operation,
installation, model request or persistent host-configuration change was requested.
No native runtime inventory, enforcement or broad compatibility claim follows.

## Local Verification And Retention

Before commit `c855429`, source validation and 22 focused tests/69 assertions
passed. All 161 local links across the six prior documents resolved; source-core,
README, archive and banner pins matched; staged whitespace checks passed.
No product code, skill, template, manifest/version, dependency or test changes
were made. The full protocol/behavioural suite was not rerun for this diagnostic
and documentation-only follow-up.

Controller-captured native output, input inventory and options are retained in
mode-0600 `discovery.json` under `/private/tmp/ehs-pi-candidate-118.JUbGAn/`, outside
the candidate. Temporary retention can expire. The local record is not signed or
independently trusted attestation. The disposable helper is not committed tooling.

- `discovery.json`: `067411894b646162b9a8d299c2093cf263e48ec81c23f090bb9981154fb302e2`.
- `check.mjs`: `1a046b1b6b74832dca2ad5f7891785c48a8823ebf7cb8d6a8a71e7f105a5d952`.

This new record and its roadmap/index pointers remain uncommitted for review.
The earlier seven-file slice is committed; no remote was added, no branch renamed,
and no push/publication or further model task occurred.
