# Claude Candidate Metadata Validation

Date: 2026-10-13. After candidate 116, the user requested a replacement repository
README graphic and to move to the next bounded check. Scope: the supplied graphic
and no-model Claude Code diagnostics against the existing extracted candidate.
No installation, authentication operation, model trial, commit or publication.

- result: complete
- claim: The repository README uses the supplied landscape graphic unchanged; Claude Code's no-model diagnostics accept the existing extracted candidate and discover its nine skills.
- evidence: Image hashes match; strict manifest validation, component details and session inventory exit 0. All 20 candidate files and the archive retain their pinned bytes. Source validation and 22 focused tests pass.
- remaining uncertainty: Native validation covers the manifest, not skill bodies. Diagnostic discovery and token estimates do not establish installed-route support, runtime exposure, measured cost or engineering adherence. Publication rights/privacy and release approval remain open.
- next: needs review; review the package README, inventory and support wording before choosing an installed-route or behavioural qualification task. No installation, model call or publication is implied.

## Contract And Boundaries

Add the attachment unchanged as a landscape README banner, retaining the previous
artwork. Do not add either graphic to candidate 116 or rebuild its archive.
Verify image identity and the README path. Refresh the candidate and installed CLI
pins before native validation, component details and session inventory; recheck
candidate bytes afterward. Retain raw diagnostic commands/results outside the
payload. Stop on input drift, failed diagnostics or requests for authentication,
installation or persistent configuration changes. No print/task/eval command.

This is a local observation under the existing
[standalone boundary](../adr/0023-standalone-work-receipt.md), not a new execution
mechanism or support contract. No new ADR is required. Host-owned metadata
discovery is separate from EHS instructions, model adherence and installed-route
qualification. Existing source changes and historical evidence remain intact.

## Decision Challenge

Trigger: candidate provenance and prospective host-support claims. Proposal:
validate the extracted 20-file candidate with the existing native diagnostics,
without treating success as installation, runtime exposure or release acceptance.
Claude owns discovery and diagnostics; EHS supplies the unchanged engineering
method. The useful result is a route-specific observation, not a new harness.

Strongest counterargument: native validation can pass without validating skill
bodies or observing any engineering work. Keep that limit explicit rather than
use a green metadata result to imply broader support.

| Claim | Current evidence | Gap / required evidence |
| --- | --- | --- |
| The banner is the supplied image | Source and destination SHA-256 match | Final README path/diff check |
| The candidate preserves approved inputs | Candidate 116 records exact membership and hashes | Fresh before/after checks |
| Claude discovers candidate components | Earlier staging diagnostics only | Fresh native candidate details/list |
| The installed artifact guides engineering correctly | Not established by metadata | Separate approved route and behavioural qualification |

Minimum credible slice: the README asset change and one no-model diagnostic pass.
Stop before auth, install, model dispatch, persistent settings writes, packaging
changes or publication. Verdict: **proceed** for this scope only.

## Observed Results

Claude resolves to `/Users/alancurrie/.local/share/claude/versions/2.1.289`,
reports `2.1.289 (Claude Code)` and retains binary SHA-256
`03d66745e3bb69ec727d66023696f3820bc0a00a8a5ba725eb6706d0c67cbe69`.
Commands run from a private temporary directory, targeting
`dist/skills-first-candidate-c1e1997/roundtrip/extremely-hardcore/` explicitly.

The process-only profile requests restricted mode, empty setting sources,
disabled ordinary hooks/auto-memory, strict empty MCP configuration, Read/Skill
tools, dontAsk/no permission prompts, no Chrome and no session persistence.
These are diagnostic requests, not evidence of effective model-time isolation;
managed policy and ambient runtime exposure were not assessed. No model, auth,
install, update or eval command was invoked. No saved-settings mutation was
requested; complete host-state immutability was not independently attested.

| Native command under that profile | Result | Evidence boundary |
| --- | --- | --- |
| `plugin validate <extracted-root> --strict --json` | Exit 0; success, no errors/warnings; `contents: []` | Manifest validation only, not skill-body validation |
| `plugin details extremely-hardcore` | Exit 0; nine named skills; zero agents/hooks/MCP/LSP | Component discovery and projected cost, not model invocation |
| `plugin list --json` | Exit 0; only `extremely-hardcore@inline`, 0.0.1, enabled, session scope | Explicit extracted-directory diagnostic route, not a persistent install |

The details output estimates **~376 always-on tokens** and approximately
410-1,100 on-invocation tokens per skill. These are rounded native estimates,
not measured usage, billing or comparative efficiency. Optional agents remain
excluded; no instruction pruning or package change followed these estimates.

Fresh before/after checks confirm exactly 20 regular, symlink-free extracted
files matching candidate 116's approved inputs. Archive SHA-256 remains
`d8cc52b6b445cb7646e7ab9d56fb4637d901c647947b2c8492523e0f89105e3d`.
No candidate file or archive changed. Candidate 116's historical no-host build
result remains intact; this is a separate subsequent host diagnostic observation.

## README Graphic And Local Checks

The supplied 1280 x 720 JPEG is copied unchanged to
`assets/extremely-hardcore-skills-banner.jpg` (353,483 bytes). Its source and
destination SHA-256 both equal
`b242b967c565f715f8a435d3faceb81353e9443f4a209869355043d4a4fc528d`.
The root README references it at width 960 with descriptive alt text, following
the existing centered-image pattern. The previous square artwork is retained.
Neither graphic is in candidate 116; publication rights are not established by
the user's choice of a local README image.

`bun run validate` passes. `bun test ./scripts/validate.test.ts` passes 22 tests
with 69 assertions. No runtime, skill, template, manifest/version, dependency or
test code changed, so the full protocol/behavioural suite was not rerun.
All 161 explicit local document/asset links across the six affected documents
resolve, and `git diff --check` passes. Source and extracted-candidate checks
remain distinct. These changes and the earlier candidate documentation are
uncommitted; no commit or publication was performed.

## Retention

Raw controller-captured argv, cwd, exit state, stdout and stderr are retained in
mode-0600 JSON files under `/private/tmp/ehs-claude-candidate-117.txYq1e/`, outside
the payload. Temporary retention can expire. No credential contents or private
reasoning were read or retained. The disposable `check.mjs` is not a permanent
exporter or committed runtime.

- `summary.json`: `74a1365e843ba7180cb8744f9f0d31524d292777ebb094825ba02677f492bd7b`.
- `check.mjs`: `f8ed35f1fb90272cfca464aff7ac6643e937a572e448d93266d6917e0392757d`.

The summary includes the input pin, full file inventory and native validation /
session catalogue; `details.json` retains the component/token output. This local
record is not trusted attestation, installation proof, an effectiveness claim or
release approval. All earlier behavioural scores and support limits remain intact.
