# Offline Skills-first Candidate

Date: 2026-10-13. The user approved one offline skills-only candidate build with
refreshed source pins after consistency pass 115 was committed as `c1e1997`.
This does not authorise host installation/configuration changes, model trials,
public support claims, commit, push or publication.

- result: complete
- claim: One offline skills-only local candidate is built from 19 pinned core files and a package-facing README, without runtime/exporter additions or host/model execution.
- evidence: ZIP membership is exactly 20 regular files; CRC, extracted round-trip and direct archive-to-input comparisons pass. Nine skill metadata blocks and all 18 local resource links validate. Extra-member and changed-byte controls are rejected. Source validation and typecheck pass.
- remaining uncertainty: The README input is authored but uncommitted; exact provenance is recorded below. Host loading, model adherence, context/cost, third-party rights, source-publication privacy and release/support decisions are not qualified.
- next: needs review; review the README, inventory and archive before separately choosing a no-model host-loading check. No installation, model trial, commit, push or publication is implied.

## Contract And Boundaries

Build one local archive containing the 19 reviewed core files from
`c1e1997e8dec2a8807494b09ed0413836ff78f6b` plus a short candidate README.
The authored [PREVIEW.md](../../PREVIEW.md) becomes `README.md` inside the
archive, unchanged; its package-root links also work in the source checkout.
Keep the full source README/graphic, skills, templates, manifests/versions,
licence and runtime unchanged. Exclude every other source path, including
optional agents, development marketplace, tooling, run records and private data.
Keep generated inventory/checksums outside the payload under ignored `dist/`.

Source owns the engineering method; the artifact is a byte-pinned local
projection. Native hosts own discovery, execution and permissions; local
verification is not host qualification. Boundary review: **safe with noted risk**,
because a complete archive can still fail on an installed host. No new ADR is
required for a private mechanical candidate under the accepted
[standalone boundary](../adr/0023-standalone-work-receipt.md); a public distribution
or support decision remains separate.

## Decision Challenge

### Trigger

Package provenance, selected components and prospective support claims.

### Proposal And Claims

Export the approved 19-file core and one package-facing README; demonstrate
exact membership, unchanged source bytes, resource closure and ZIP round-trip.
Do not claim installed-host support, model adherence, context savings or release.

### Existing-platform Ownership

Hosts own loading/install routes and runtime controls. Native ZIP tools own
archive mechanics; EHS does not need another runtime or permanent exporter.

### Durable Differentiated Value

The existing engineering guidance can travel without adopting its development
repository. No effectiveness or superiority claim follows from packaging.

### Strongest Counterargument

Omitted agents and marketplace metadata remove conveniences from the checkout.
A lean but misleading README would obscure that difference. State the exclusions
and unqualified routes; retain checksums/inventory without calling them trusted
attestation or adding an EHS output schema.

### Claim-to-evidence Map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Core matches the approved current source | 19 regular files match the pinned commit; refreshed core digest below | No candidate built yet | Exact archive list and round-trip byte comparison |
| README travels independently | Candidate README links only to included skills/licence | Extraction not yet checked | Resolve every local resource within extracted payload |
| Artifact works on each host | Historical, source/staged observations only | No installed-candidate check or behavioural trial authorised | Keep support unqualified; separate route-specific approval |

### Minimum Credible Slice

One private local ZIP and extracted verification copy, with inventory outside
the payload. Use a disposable build helper, not a new committed exporter, CLI,
test framework, manifest format or dependency. Validate actual archive bytes.

### Stop Conditions

Stop on source drift, existing output collision, extra/missing members, symlinks,
escaping resources or mismatched bytes. Stop before host invocation, configuration
mutation, model/provider calls, packaging changes beyond the approved selection,
commit or publication.

### Verdict

**proceed**

### Rationale

Contents approval resolves review 114's candidate-selection gate only. The
current core contains 19 files/33,354 bytes. SHA-256 of the path-sorted
`JSON.stringify([{path,bytes,sha256}, ...])` entries is
`72aab98c1b1d614eb32b78681e56b2c598bcd4be391417eaab4da7a135255a07`.
It replaces no historical pin; it identifies this candidate's refreshed input.

## Verification

The candidate is retained under ignored
`dist/skills-first-candidate-c1e1997/`. The payload has a single
`extremely-hardcore/` root and exactly 20 regular files: nine skills, seven
templates, two byte-unchanged manifests, LICENSE and the candidate README.
No optional agents, development marketplace, source README/graphic, repository
instructions, Git data, run records, dependencies, scripts, tests or evaluations
are included. Positive membership is checked, not inferred from `.gitignore`.

| Output/input | Bytes | SHA-256 |
| --- | --- | --- |
| `extremely-hardcore-0.0.1-c1e1997-preview.zip` | 20,812 | `d8cc52b6b445cb7646e7ab9d56fb4637d901c647947b2c8492523e0f89105e3d` |
| README from uncommitted `PREVIEW.md` | 3,258 | `1258fc29cc34d7d926d8e1ed699412a7c5c6ed3e4820d4c9aa5bfe3c522043e5` |

Total uncompressed payload: 36,612 bytes. All 19 core inputs match the exact Git
commit; the README is explicitly a separately authored working-file input, not
silently attributed to that commit. `contents.json` outside the payload records
each input/output digest and byte count. `verification.json` records the local
checks. These are local generated records, not signatures, hostile-workspace
attestation, a public schema or a new EHS receipt protocol.

A disposable helper under `/private/tmp/ehs-candidate-116.fRzEhu/` exports only
the fixed inclusion list and refuses an existing output, source drift, symlinks,
unexpected membership, escaped resources or mismatched bytes. Native
`/usr/bin/zip -X` writes the archive; `unzip -Z -1`, `unzip -tq` and extraction
verify its member list, CRC and byte-preserving round-trip. A separate parent
check uses `unzip -p` on every member and compares it directly with the pinned
Git input or authored README; all 20 comparisons pass. Native ZIP listing shows
20 regular, non-executable file entries. Both manifests remain version 0.0.1/MIT,
and Codex's skill path resolves inside the extracted payload.

Two disposable negative copies outside the candidate are rejected for the
expected reasons: an extra development-record file fails membership, and an
altered change-contract file fails byte comparison. The delivered archive and
source files are not mutated by those controls. All 18 explicit local links
resolve within both the staged and extracted payload; nine YAML metadata blocks
parse with the expected names and valid descriptions.

`bun run validate`, repository typecheck, local document links and whitespace
checks pass. No product code, skill, template, manifest/version or test changes
require another behavioural suite run in this export-only slice; no full suite
or model trial was rerun. Archive checks establish packaging integrity, not
agent adherence, effective permission controls or compatibility with every host.

One initial patch was rejected for an empty move hunk before any build helper
or candidate was written; correcting that patch syntax did not change the
approved contents. The single actual build completed successfully. The artifact
is local and ignored; the authored README, this record and roadmap/index updates
remain uncommitted. No permanent exporter, host invocation/install, credentials
inspection, configuration change, provider/model call, push or publication ran.
