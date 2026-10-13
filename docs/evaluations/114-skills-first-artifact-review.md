# Skills-first Artifact Review

Date: 2026-10-13. Approved no-model contents review after the standalone-first
documentation/MIT cleanup was committed locally as `843f5a6`. No package was
built, exported, installed, pushed or published; no host executable was invoked.
Official documentation was fetched for manifest/default-discovery facts only.

- result: complete
- claim: The existing skill resources form a small source selection; the full development checkout and its README are not a lean distribution artifact.
- evidence: At `843f5a6`, nine skills and seven templates total 29,607 bytes. All eight explicit local link occurrences resolve inside that selection. Adding the two existing plugin manifests and LICENSE gives 19 regular files/32,276 bytes with no symlink ancestors. Static inventory and document checks pass.
- remaining uncertainty: Contents approval, delivery route, artifact-specific documentation, installed-route qualification, actual host context cost and publication remain open. Source bytes are not token measurements or execution proof; third-party rights and historical record contents were not audited.
- next: needs review; approve a skills-only local candidate with the 19 unchanged source files and a short candidate README, omitting optional agents and development records. This is not support or publication approval.

## Change Contract

Identify the smallest existing resource closure, unwanted host-discovery surfaces
and documentation dependencies before choosing a package. Preserve skills,
templates, agents, manifests/versions, commands, runtime and historical results.
The minimum complete review is a source-pinned inventory with explicit exclusions
and honest remaining gates, not an exporter or another evaluation framework.
No ADR is required for assessment alone; a later distribution/public-contract
decision must check the trigger again.

## Source Selection

Source commit: `843f5a612175888ae4688d51299eab7186bd9712`.
The tracked checkout has **906 files** at that commit.

| Proposed inclusion | Files | Reason |
| --- | --- | --- |
| `skills/*/SKILL.md` | 9 | Installed engineering guidance, unchanged |
| `skills/*/templates/*.md` | 7 | All explicitly linked supporting resources, unchanged |
| `.codex-plugin/plugin.json` | 1 | Existing Codex metadata, version 0.0.1 |
| `.claude-plugin/plugin.json` | 1 | Existing Claude Code metadata, version 0.0.1 |
| `LICENSE` | 1 | Approved root MIT notice |

The seven templates belong to architecture-decision, bounded-context-review,
change-contract, decision-challenge, domain-discovery, evidence-ledger and
test-first-implementation. The entrypoint and simple-made-easy have no supporting
file links. Manual reference inspection plus the explicit inline-link inventory
found no required resource outside these 16 skill files. Role names are optional
review guidance; Bun commands apply only when an existing protocol run is used.
Neither creates a bundled runtime requirement.

For reproducibility, SHA-256 of `JSON.stringify(entries)` is
`4e2ef60ddb423dc7f344fb843ff6acf43c8fe4578694a7423e697ef5d5110c1a`.
`entries` is the 19 paths sorted lexically, each object constructed with keys
`path`, `bytes`, `sha256`, using exact file bytes. This pins the proposed source
selection, not an archive, installer or attestation.

## Findings

1. **Use a positive inclusion list, not the full checkout.** Exclude every
   path outside the chosen selection, including development instructions,
   protocol/tooling, evaluations, examples, policies, CI, handoffs, dependencies,
   reference checkouts and run records. Path-only Git inventory finds **184
   tracked protocol files across 14 runs**: 78 evidence JSON files, 78 logs,
   14 run records and 14 transition ledgers. Their contents were not inspected.
   `.gitignore` neither removes tracked files nor defines an export allowlist.
   Artifact exclusion does not remove them from Git history: publishing the
   source repository needs a separate content/privacy review.
2. **The source README cannot travel unchanged.** It has 16 local Markdown
   link occurrences and one HTML image reference. Against the 19-file selection,
   **12 unique paths** would be absent: MANIFESTO, ROADMAP, user/provider guides,
   proof-carrying example, evaluation index, ADRs 0020-0022, reference workflow,
   compatibility policy and the graphic. The links work in the source checkout;
   this is a proposed-package dependency finding, not a source link regression.
   Prefer a short candidate README rather than including a development-docs
   closure. Preserve the repository README and its requested graphic unchanged.
3. **Optional roles can be discovered even without manifest declarations.**
   The checkout has seven `agents/*.md` files, totalling 4,118 bytes. Claude
   Code documents `agents/` as a default component directory when no overriding
   path is declared. The current manifest has no override, so full-checkout
   loading can expose these roles. This is a source/documentation inference,
   not a fresh native inventory or measured token overhead.
   [Claude Code manifest reference](https://code.claude.com/docs/en/plugins-reference#standard-layout).
   Omit the roles from a first skills-only candidate; retain them in the repo.
   The entrypoint explicitly permits skills-only use and labelled self-review
   when independent review is unavailable or unauthorised.
4. **Do not add a format migration to this slice.** Both existing manifests
   parse and identify EHS/version 0.0.1/MIT; neither declares a bundled MCP server
   or hook. OpenAI's current guidance prefers a portable root manifest for new
   packages and also accepts legacy/Claude-compatible formats. That supports
   reviewing the existing compatibility layout, not claiming the candidate is
   already accepted by an installed host or every OpenAI surface.
   [OpenAI package guidance](https://developers.openai.com/plugins/build/plugins#plugin-structure).
   The existing 404-byte development marketplace points to `./`; it is a
   route-specific extra, not part of the proposed 19-file core. Choose a route
   before including it or presenting marketplace commands in a candidate README.

The full-repository validator deliberately requires agents, examples and other
development files. Its pass verifies the source scaffold, not a lean artifact.
Do not bundle those files simply to satisfy that validator or treat static byte
counts as always-on/invocation context estimates. Native context diagnostics and
installed-route checks remain separate work.

## Verification

Fresh source scaffold validation and typecheck pass. All **173 local links**
across seven review/onboarding documents and the README image exist; tracked
and new-file whitespace checks emit no diagnostics. All **38 shell blocks**
match `fda87b1` byte-for-byte with identical multiplicity. The first one-off
comparer incorrectly required their original order and rejected the intentional
onboarding rearrangement; block-byte/multiplicity comparison resolves that check
without changing any file or adding a permanent checker.

Only this review and the roadmap/evaluation-index pointers differ from `843f5a6`.
No skill, template, agent, manifest, host command, runtime or test was changed.
No behavioural tests were added or rerun for this static review; source and
document checks do not establish archive or installed-host acceptance.

## Decision Challenge

### Trigger

Distribution contents, public support and provenance boundaries require a
challenge before implementation planning.

### Proposal And Claims

Prepare a local skills-only candidate from the 19 unchanged source files plus
a concise README, with no optional role catalogue or runtime. This is a content
proposal, not a claim of host parity, improved efficiency or release readiness.

### Existing-platform Ownership

Hosts own discovery, context delivery, tools, permissions and execution.
EHS owns its method and packaged resources; repository tools remain optional.

### Durable Differentiated Value

Coherent scope, test-quality and evidence guidance without a mandatory harness.
No competitor superiority or measurable productivity claim follows.

### Strongest Counterargument

Omitting role prompts reduces convenience for risky review work, and omitting the
development marketplace prevents copying the source checkout's install recipe.
A tiny but undocumented or untested artifact would be worse than a clearly
labelled checkout. File count alone is not a product-quality measure.

### Claim-to-evidence Map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Required skill resources fit in 16 files | Explicit links, manual references, regular-file containment | No candidate exported/loaded | Approved selection, byte-identical candidate and resource checks |
| Full checkout is a skills-only package | 906 paths, seven optional agents, 184 tracked run files | No export policy or privacy audit | Explicit allowlist; separate source-publication review |
| Lean selection reduces host context cost | Smaller source bytes; documented default discovery | No native token/context measurement | Selected-host diagnostics; no savings claim now |
| Existing README is portable | 12 absent paths against proposed selection | Candidate documentation does not exist | Short, self-contained README with honest route/support limits |
| Package will work across all hosts | Dated source/staged observations in [113](113-standalone-release-scope-review.md) | No chosen installed artifact or universal qualification | Separate surface-specific checks and support decision |

### Minimum Credible Slice

One offline local candidate after contents approval, with unchanged skills,
templates, manifests and licence plus minimal package-facing documentation.
Exclude optional agents, marketplace metadata unless its route is selected,
runtime and development records. Do not add a permanent exporter, migrate
formats, bump versions or launch a model to settle this content decision.

### Stop Conditions

Stop before building without contents approval; changing skills or manifests;
unreviewed included files, unresolved resources, host/configuration mutation,
new support claims, source publication or any provider/model dispatch.

### Verdict

**needs-human-decision**

### Rationale

The review is complete, but selecting a skills-only artifact over the full
checkout is a product/distribution choice. Recommend the lean candidate; no
implementation plan or package follows from this assessment. The approved
cleanup is already committed as `843f5a6`; this review and its index/roadmap
pointers remain uncommitted pending review. Source validation, typecheck,
local-link and whitespace checks pass; no installed-host test was performed.
