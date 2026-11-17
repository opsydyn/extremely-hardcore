# ADR: native Pi installation of the existing skills

## Status And Contract

Accepted, 2026-11-17, for the user's explicit implementation and isolated native
installation test request. Source base: `00d2be6e66cc0f338f9e1365b89fa8eb1949ec51`.
Add only `"pi": { "skills": ["./skills"] }` to the existing package manifest.
Preserve all nine skills, Claude/Codex metadata, versions, scripts, dependencies,
evaluation tooling and released ZIPs. Extend the existing validation/checks;
do not replace them, add a runtime extension or publish to npm.

## Decision Challenge And Boundary Review

The new public resource declaration makes native installation explicit. Pi owns
cloning, dependency installation, settings and skill discovery; EHS supplies the
same Markdown guidance. No model execution, new permissions or isolation claim
follows from installation. The manifest exposes only the existing skills root;
there is no extension, prompt or theme declaration and no skill duplication.

The strongest counterargument is that Git installation brings the full development
checkout and can run a dependency-install step even for a skills-only package.
Keep `private: true`, add no runtime dependency or lifecycle hook, document the
distinction from the lean ZIP, and test without normal user configuration or
credentials. Pi packages are not a sandbox. The package-gallery keyword is not
needed for Git installation and no npm discovery/publication is proposed.

Verdict: `proceed` within the approved scope. Stop on unexpected resource loading,
normal-settings writes, skill drift, provider/model invocation or a need to change
Claude/Codex/runtime behaviour. No commit, push or release is authorised by this
record. Future publication must not imply fresh engineering qualification.

## Validation

The existing validator now checks the exact skills-only manifest, canonical
nine-path discovery and parseable metadata with matching names/descriptions.
It rejects missing/filtered/escaping resource declarations, extra resource types,
missing/extra skills, loose root Markdown, malformed metadata and linked resources.
This is an EHS source contract, not a general implementation of Pi's loader.
The existing Codex, scaffold and decision-challenge checks remain intact.

Thirteen new cases were observed failing before implementation. Additional
malformed-metadata and symlink cases protect partial-catalogue rejection. Fixture
package JSON was made valid for the extended validation; no scorer, historical
fixture or evaluation threshold was changed.

## Actual Native Test

Host: macOS, Pi `1.5.2` (`@earendil-works/pi-coding-agent`), Node `24.15.0`.
Temporary workspaces are under `/tmp/ehs-pi-native.6C2ZdD/`. Each arm used a fresh
HOME, `PI_CODING_AGENT_DIR`, project directory and npm cache. Child processes used
an allowlisted environment without provider credentials, disabled Git credential
configuration/prompts, and `NPM_CONFIG_IGNORE_SCRIPTS=true`. This isolates package
configuration; it is not a VM/container or proof of hostile-code containment.

| Native operation | Observed result |
| --- | --- |
| `pi install git:github.com/opsydyn/extremely-hardcore` | Exit 0; real public Git clone installed at `00d2be6` |
| `pi list` | Names the Git source and its temporary installed path |
| Pi package resolver plus native skill loader, offline | Exactly nine skills, no diagnostics; every SKILL.md byte matches source |
| `pi update git:github.com/opsydyn/extremely-hardcore` | Exit 0, already up to date; Pi itself was not updated |
| Discovery after update | Same nine skills; zero extensions, prompts or themes |
| `pi remove git:github.com/opsydyn/extremely-hardcore` | Exit 0; temporary clone gone; `pi list` reports no packages |
| `pi install /Users/alancurrie/Projects/extremely-hardcore-skill` in a separate arm | Exit 0; actual candidate manifest loaded through native local-package installation |
| Candidate resolver/loader | Same nine names/bytes, zero diagnostics and zero non-skill resources |
| Candidate `pi remove <local-path>` and `pi list` | Declaration removed, no packages left; source repository preserved |

Both catalogues contain `using-extremely-hardcore`, `change-contract`,
`domain-discovery`, `simple-made-easy`, `architecture-decision`,
`decision-challenge`, `bounded-context-review`, `test-first-implementation` and
`evidence-ledger`. Discovery uses the installed Pi package resolver and
`loadSkills` API with explicit resolved file paths and default locations disabled;
it does not run a session, load extension code or send a prompt.

The public checkout predates this manifest and already works via conventional
directory discovery. The candidate arm tests the explicit manifest separately;
it is not evidence that uncommitted metadata was fetched from GitHub. The initial
helper incorrectly treated resolved files as directories and expected an absolute
local-source spelling; those two failed observations are retained. Correcting the
helper to use `loadSkills` and settings-relative paths produced the results above.
No skills or host code were changed to satisfy the test.

Native command/loader output and the disposable helper remain in the temporary
directory, including timestamped corrections; they may expire. This record retains
the commands, exact source pin, names, counts and limitations without credentials
or private reasoning. Normal Pi settings, Codex/Claude configuration, source
skills and previously installed EHS plugins were not modified by the tests.

## Evidence And Remaining Gaps

Full local suite: 236 passes, 909 assertions across 31 files. Structural validation
and TypeScript pass. The added validation runs under the existing Bun command;
Pi is not a new CI/development dependency. Native integration is an explicitly
run host check, not a model evaluation or a required network test in the suite.

At the implementation checkpoint these changes were uncommitted/unpushed. The
user subsequently authorised a feature-branch commit, push and PR, not a merge
or release. The manifest is not in the published `v0.0.2` preview ZIP.
Discovery on Pi `1.5.2` does not qualify older releases, Windows/Linux, actual
interactive command completion, model-visible loading or engineering adherence.
The update check did not exercise adopting a newer remote commit or conflict
recovery. Claude/Codex instructions and manifests are unchanged; no new host
behavioural trials were run. Source file paths are normalized for cross-platform
validation, but this native installation observation was on macOS only.

References: [Pi package format](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md),
[native CLI commands](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md),
and [skill discovery](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md).
