# Clean Public Repo Preparation

Date: 2026-10-13. Original preparation checkpoint; the owner-publication follow-up
below records the later public push and keep-public decision.
The user approved committing review 119 and removing the square
artwork, then preparing a clean skills-only public repo with the landscape banner.
Development history stays local; no push is authorised. The first slice is
committed as `7dc35a5feb8f7595a3337bcae54224406c34811d`.

- result: complete
- claim: The approved clean skills-only publication tree is prepared as an independent local Git repo with the landscape banner and no copied development history.
- evidence: Exactly 21 regular, non-executable files are staged; nine skill metadata blocks and all 19 local links validate. Core/banner bytes match their committed inputs. Extra-record and altered-byte controls are rejected. Git storage is independent, contains only the 21 staged blobs, and has zero commits, refs or remotes.
- remaining uncertainty: The first public commit is pending the user's Git identity choice. This tree is not pushed, released, installed or behaviourally qualified; local content checks are not exhaustive secret clearance or legal-rights attestation.
- next: needs review; review the public README and provide or confirm the public Git identity before the first local public-repo commit. No push is authorised.

## Contract And Boundaries

Prepare an independent local Git repo under ignored
`dist/public-repo/extremely-hardcore/`, not a clone/worktree/shared object store.
Positive inclusion: 19 unchanged core files, one new self-contained public README
and the unchanged landscape banner. Keep inventory/verification sidecars outside
that repo. Use a disposable local helper, not a committed exporter or runtime.
Preserve candidate 116, source skills/templates/manifests/versions, licence,
development history and host configuration. No agents, marketplace, protocol,
evaluation records, dependencies, source instructions or private captures.

Initialise only fresh Git metadata on `main`; no remote/network action. Verify
independent Git/object storage and exact staged contents. The public author/email
choice is requested separately; do not create a first commit with an unapproved
identity. No existing history or identities are rewritten. Stop on collisions,
input drift, unexpected paths, symlinks, escaping resources or shared Git storage.

Boundary review: **safe with noted risk**. The public tree is a one-way projection
of reviewed instructions, not an authority to modify development records or host
permissions. No new ADR is required for this local, unpublished preparation under
the [standalone boundary](../adr/0023-standalone-work-receipt.md): no EHS runtime,
public API, operational contract or permission behaviour changes. Publication,
support scope and later maintenance remain explicit decisions.

## Decision Challenge

Trigger: prospective public source/provenance boundary. Proposal: prepare the
approved skills-only source projection, keeping development Git history private.
Git owns local repository storage and future transport; hosts own execution and
permissions. EHS owns unchanged engineering guidance and the selected resources.
The durable value is a standalone inspectable method, not a new release harness.

Strongest counterargument: a public projection can drift from development, while
omitting research removes reproducibility conveniences. Pin every copied input
and keep a truthful public README. Do not promise automated synchronisation,
general host qualification or effectiveness from this mechanical preparation.

| Claim | Evidence before work | Required check / limit |
| --- | --- | --- |
| Core can remain unchanged | Candidate 116's 19-file core and preserved source pins | Match current committed blobs and canonical digest |
| New repo will not expose development history | Approved independent-tree choice | Independent Git dir, no alternates/imported refs or commits |
| Public README is self-contained | Candidate README is already portable | Exact local link/resource closure plus banner identity |
| Public commit identity is approved | Not yet supplied | Leave first commit pending unless the user confirms identity |
| Repo is released or fully qualified | No such evidence or authority | No push, install, model trial or new support promise |

Minimum credible slice: exactly 21 source files and fresh local Git metadata,
with checksums/inventory outside the publication root. Stop before existing-output
replacement, unsupported contents, unapproved identity, configuration outside the
new repo, credentials, model calls, version changes or push. Verdict: **proceed**
for preparation; publication is not authorised.

## Prepared Tree And Verification

The local root is `dist/public-repo/extremely-hardcore/`. Its 21 source files
are nine skills, seven templates, the two existing manifests, LICENSE, README
and `assets/extremely-hardcore-skills-banner.jpg`. Total source bytes: 392,143.
There are no role prompts, marketplace entries, development records, private
captures, protocols, tests, dependencies, scripts or square image in this repo.

All 19 core inputs are read directly from the committed `7dc35a5` source and
match the earlier canonical core digest
`72aab98c1b1d614eb32b78681e56b2c598bcd4be391417eaab4da7a135255a07`.
The banner is copied unchanged from the same commit, with SHA-256
`b242b967c565f715f8a435d3faceb81353e9443f4a209869355043d4a4fc528d`.
The authored public README is 5,306 bytes, SHA-256
`66510b78a55cd898547b7283c525243c0425e41264964a522c90ed95bd93be11`.
It includes the banner and declared ChatGPT provenance, target-project loading
guidance, all nine skills and surface-specific experimental support limits.
It links to no private development document or marketplace recipe.

Native `git init --initial-branch=main` uses an explicitly empty template.
Only the 21 approved paths are added. Git's top-level, Git dir and common dir
resolve to this new root; no symlink, commondir, object alternate, graft or shallow
history exists. The object database contains exactly 21 blobs matching the staged
file bytes, with no commit/tree objects or imported refs. The branch is unborn
`main`, with zero remotes. No initial commit silently adopts the development email.
The user was asked to supply a GitHub noreply address or explicitly approve the
existing identity; preparation does not wait on that future metadata choice.

All 19 local Markdown/image resources resolve inside the positive selection.
Nine frontmatter blocks and both manifests validate; versions remain 0.0.1/MIT.
Disposable copies reject an added record for membership mismatch and changed
core bytes for byte mismatch. No negative copy or Git metadata is included in
the staged public files. These are integrity checks, not agent-effectiveness tests.

Development HEAD remains `7dc35a5`, with prior `13f2ebf` ancestry intact. The
publication root is ignored by the development repo. Candidate 116's ZIP still
has SHA-256 `d8cc52b6b445cb7646e7ab9d56fb4637d901c647947b2c8492523e0f89105e3d`;
it was not rebuilt or relabelled as this public tree. No development record,
history, user Git identity, host configuration or permissions were rewritten.

## Retention And Limits

Mode-0600 sidecars stay outside the public repo in `dist/public-repo/`:

- `inventory.json`: `ee318419be54096e3051a030ddfeaf9116c6e03dad31cf5a2fdcecdf51496b81`.
- `content-verification.json`: `2766d2b20689ccfa1d73980cb9f0b5bbb2cb8eee4255864fef47b249d716db2e`.
- `git-verification.json`: `1a2b111bf5a0237a2f86dbb4b70fc5b920b8f8e2abcf67581eb5a0c1d9a7dc8d`.

The disposable helper and synthetic negative copies remain under
`/private/tmp/ehs-public-tree-120.afZcwZ/`; helper SHA-256 is
`01720ad3bb86b7cf93de1bbbe8879cac69390037dc817431e740584b8dc23cb4`.
These local records are not trusted attestation, public schemas or committed
tooling. Source validation and 22 focused tests/69 assertions passed before the
approved development commit; no core/runtime change requires a new full suite.

No model/host trial, auth operation, installation, remote configuration, push or
publication ran. This record and roadmap/index pointers are uncommitted for
review; public source files are staged, not yet committed. No automatic sync or
future publication is implied by the existence of this local preparation.

## Owner Publication Follow-up

After preparation, the user configured the development repo's `origin`, renamed
its branch to `main` and pushed `7dc35a5` to `opsydyn/extremely-hardcore`.
GitHub's read-only repository/ref/tree/history APIs confirm public visibility,
913 tracked files, 80 commits and 184 root-run files. The staged 21-file tree was
not the source of that push. The user explicitly chose **Keep it public** after
the mismatch and visibility consequences were explained. That choice supersedes
the earlier private-history intention; it is not exhaustive secret clearance or
release qualification. No privacy conversion or history rewrite follows.

Read-only refresh still shows public `main` at `7dc35a5` and no GitHub releases.
The agent has performed no push, force-push, deletion, tag, release upload or
visibility change. Earlier preparation checkpoints and pins above remain intact.
The separate repo's pending first-commit identity does not block preparing an
asset for the already-public development commit. No new identity is assumed.

Current bounded work: package the same 21 approved files as one local preview
ZIP and update current status. Keep Git metadata and all inventory/evidence
sidecars outside the archive. Check exact members, CRC and extracted bytes;
preserve both repos and candidate 116. No new ADR is required for this mechanical
local derivative; no runtime, public API or operational behaviour changes.

The existing decision challenge remains **proceed** for local preparation only.
The strongest additional counterargument is that a downloadable skills-only
asset can be confused with the public development checkout. Label them separately:
the proposed asset has 21 selected files, while GitHub's automatic source archives
at the existing development commit are not skills-only. An archive neither erases
public history nor qualifies host behaviour. Do not infer release upload or
force-push permission from the visibility choice.

### Local Preview Archive

`dist/public-repo/extremely-hardcore-0.0.1-skills-only-preview.zip` is now built
from the fixed 21-file inventory: 375,125 bytes, SHA-256
`fa8ba33095dac8c493810f9e9fd606fcd24fca3aeec21daf6e659887c61e01f3`.
Its single `extremely-hardcore/` root contains exactly those regular files,
392,143 uncompressed bytes. Native ZIP CRC, all 21 direct archive/input byte
comparisons and actual extraction/byte comparisons pass. Source inputs and the
older candidate remain unchanged. No Git metadata, sidecar, development record,
temporary helper, optional role or square image is in the ZIP.

The private `preview-archive-verification.json` sidecar is outside the payload.
Its local native-command and comparison evidence is not release qualification or
trusted attestation. The disposable packaging helper and extracted verification
copy are under `/private/tmp/ehs-preview-121.2rJG5d/`, not committed tooling.
Sidecar SHA-256:
`2292c9abaee5407d855375cdfc578e9ee5716953fddf81595dede34fddf8d4c8`.
Helper SHA-256:
`89f3099f7f9133947b1e48d1709b7c40bd8f68fbfe94640ea123fac25f82161d`.

At the local archive checkpoint, the outcome was **complete** for preparation
and status correction. Recommendation then: **needs review** for a versioned experimental preview release
with this ZIP, preserving current public `main` and its history. No GitHub
release/tag, upload, push, visibility change or history rewrite was performed by
the agent. Public source files remain staged in the separate unborn repo;
the documentation/status diff remains uncommitted in the development repo.

## Approved Experimental Prerelease

The user explicitly approved publishing GitHub prerelease `v0.0.1` in
`opsydyn/extremely-hardcore` at existing commit
`7dc35a5feb8f7595a3337bcae54224406c34811d`, uploading only the fixed 21-file
skills-only preview ZIP above. Notes must label it experimental, state limited
host qualification and distinguish GitHub's automatic full-development source
archives. Preserve public visibility, `main` and history. No model trial,
force-push, clean-repo first commit, npm or marketplace publication is approved.

The minimum complete change is one prerelease, its explicit commit-bound tag
and one existing ZIP asset, followed by independent download/integrity checks
and a durable local status update. Stop on changed payload pins, unexpected
members, tag/release conflicts, target drift or insufficient native permissions.
The fresh GitHub checks show public `main` at the approved SHA, write access,
zero releases and no `v0.0.1` tag-prefix match. These are preconditions, not proof
of publication.

Decision challenge: the public/provenance boundary is triggered. GitHub owns
release storage and automatic source archives; EHS owns the selected guidance
and truthful support claims. The strongest counterargument is that experimental
release assets may be mistaken for qualified host support or a clean source
history. Explicit prerelease status, narrow host limits and a named skills-only
download address that risk without claiming to eliminate it. Artifact hashes
and exact-membership checks support identity, not effectiveness or legal rights.
Verdict: **proceed** for this expressly approved experimental release only.

No new ADR is required: this executes the existing standalone and host-metadata
decisions in ADRs 0023 and 043 without changing the method, manifests, runtime,
permissions, public API or CI/deployment behaviour. Publication does not waive
the separate host qualification or marketplace review gates.

### Published Release And Verification

- result: complete
- claim: The expressly approved experimental `v0.0.1` prerelease is public with only the verified skills-only ZIP asset; public `main` and existing history remain intact.
- evidence: Fresh GitHub APIs confirm prerelease/not-draft/not-latest, tag target `7dc35a5`, one uploaded 375,125-byte asset and its expected digest. Native GitHub and unauthenticated public downloads are byte-identical to the approved ZIP; exact 21-member, CRC, all-input and committed-source checks pass.
- remaining uncertainty: Current installed-artifact engineering adherence, isolated effectiveness, cost and general host compatibility are not established. The separate clean repo remains staged/unborn; local release/status documents are not committed or pushed.
- next: needs review; review/commit the local release records, then propose one bounded installed-artifact qualification check. No further model run or publication is approved.

Release URL:
[v0.0.1](https://github.com/opsydyn/extremely-hardcore/releases/tag/v0.0.1).
GitHub release ID: `412147648`; asset ID: `638378330`.
Published timestamp returned by GitHub: `2026-10-13T22:03:22Z`.
The release is not a draft, is a prerelease and is not marked latest.
The new lightweight tag directly targets the approved commit SHA, as does
unchanged public `main`. Repository visibility stays public. No branch push,
force-push, history replacement or local Git metadata write was performed.

The single uploaded asset is
`extremely-hardcore-0.0.1-skills-only-preview.zip`, size 375,125 bytes, with
GitHub digest and independently computed SHA-256 both equal to
`fa8ba33095dac8c493810f9e9fd606fcd24fca3aeec21daf6e659887c61e01f3`.
Its exact 21 regular-file members total 392,143 uncompressed bytes. Inventory
pins and all archived inputs match; the 20 non-README inputs also match committed
`7dc35a5` blobs. Both host manifests retain `0.0.1`/MIT. The separate reviewed
README is identified explicitly in the release notes, not misattributed to the
development README. No private inventory, evidence sidecar, helper, Git metadata,
optional role or run record is uploaded.

Meaningful host-captured commands:

- Fresh `gh api` repository/main/ref, release-list and tag-prefix checks pass
  before publication with no conflicts and native write access.
- `gh release create v0.0.1 <the single ZIP> --repo opsydyn/extremely-hardcore
  --target <full 7dc35a5 SHA> --prerelease --latest=false --notes-file <reviewed notes>`
  returns the release URL. No generated notes or extra asset glob is used.
- Post-publication release/tag/main APIs and `gh release list --json
  tagName,isDraft,isPrerelease,isLatest,publishedAt` confirm the metadata above.
- `gh release download` selects only the named ZIP into temporary storage.
  Separately, `curl --fail --location` downloads its public URL without supplied
  authentication. Both comparisons with the original ZIP via `cmp` exit zero.
- The disposable verifier checks each download using native `unzip -Z -1`,
  `unzip -tq` and `unzip -p`, pinned inventory/input SHA-256, and committed source
  bytes. Both downloads pass. These are integrity observations, not attestation
  or model-behaviour evidence.
- `bun run validate` and `git diff --check` pass. No full runtime suite or
  provider/model trial is required or performed for this publication-only slice.

Local downloads, notes and the verifier are retained under
`/private/tmp/ehs-release-121.YlUqSE/`, outside the package and Git tree.
Reviewed notes SHA-256:
`1e6f934c273077622adb46befa653427707f131180269c9a7898a6251ca02409`.
Disposable verifier SHA-256:
`bbe490b37e137ba567fe27b1cacd1c3f177c59f323420077e9952646c37084cb`.
Earlier preparation inventories and consent labels remain historical checkpoints;
they are not rewritten to imply publication was already approved at preparation.
Current documentation changes are confined to this record, ROADMAP and the
evaluation index. Source skills/templates, manifests/versions, LICENSE, banner,
older candidate, developer HEAD and the separate clean repo are unchanged.

### Commit Approval Follow-up

On 2026-10-14 the user approved committing this record and its roadmap/index
updates, then moving to the next bounded check. Earlier uncommitted-state labels
are preparation/release checkpoints, not a claim that the approved commit must
remain pending. The next slice is no-model discovery against the actual released
ZIP in a fresh directory. No push, release replacement, host configuration
change or model trial follows from this local commit approval.
