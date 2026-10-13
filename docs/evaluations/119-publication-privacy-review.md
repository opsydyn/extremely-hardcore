# Publication Privacy Review

Date: 2026-10-13. Approved follow-up: commit Pi evidence, then a bounded local
publication/privacy review. Pi record 118 and its pointers are committed as
`13f2ebff392ad8d8197cc93540bb77ab00616894`. The tree was clean before this review.
No remote, network upload, model trial, cleanup, history rewrite or push.

- result: complete
- claim: The bounded review identifies source/history publication decisions that are absent from the existing skills-only candidate; it does not clear the full development repository for publication.
- evidence: 913 tracked files and all 79 reachable commits reviewed by a local heuristic scan; 1,081 distinct text blobs scanned. There are 184 tracked run files, host paths and non-noreply Git identity metadata. Nine limited credential rules produce no matches. All 20 candidate files match their pins and contain none of the scanned markers. Both graphics have declared ChatGPT provenance and a separate metadata inspection.
- remaining uncertainty: This is not certified secret clearance, a legal-rights audit or behavioural qualification. Publication contents, Git identity, public visibility, support scope and explicit release approval remain owner decisions. Reflog/unreachable objects and arbitrary embedded binary data were not cleared.
- next: needs review; choose a clean skills-first public tree while retaining development history locally, or explicitly choose the larger full-source review/redaction route. No public-tree build or push is authorised by this review.

## Contract And Scope

Inspect tracked source, reachable Git blobs/commit metadata, current graphics and
candidate membership. Emit only categories, paths, line numbers and counts; do
not reproduce matched values or read host credential stores. Reports stay outside
the payload. Preserve all files, history, skills, manifests and previous evidence.
Only this assessment and roadmap/index pointers are written. No new ADR is needed
for assessment; a publication/source-selection decision is still separate under
the [standalone boundary](../adr/0023-standalone-work-receipt.md).

## Findings

1. **Do not treat the development checkout as the reviewed public artifact.**
   HEAD has 913 tracked files, including 184 files across 14 root protocol runs:
   78 evidence JSON files, 78 logs, 14 run records and 14 transition ledgers.
   The [ignore rule](../../.gitignore) does not remove tracked data or history.
   The source has home-path markers in 38 current files, temporary-path markers
   in 58 and other-project host-path markers in nine; these counts overlap.
   Examples: [recorded command](../../.extremely-hardcore/runs/002-proof-carrying-completion/evidence/6f91e402-8bcd-4178-a487-a33b0a9cb446.json),
   [host-specific ADR](../adr/0017-dedicated-colima-docker-containment-probe.md) and
   [another project's dogfood contract](../change-contracts/037-real-operator-dogfood-enhancement-resource-metadata.md).
   Those are disclosure decisions, not automatically leaked credentials. Review
   them deliberately or exclude the development tree/history from public scope.
2. **Git identity is a separate publication choice.** All 79 commits contain
   the same non-noreply author/committer email. Values are withheld. Decide whether
   that identity is intended to be public or choose the identity for fresh public
   commits. Removing a current file does not remove its older Git blobs. No email,
   author identity or existing commit is rewritten by this assessment.
3. **The lean candidate avoids the observed development exposure.** The existing
   20-file selection contains no scanned credential/privacy markers, no logs/run
   records, development instructions, Git data or artwork. It is byte-unchanged.
   This makes it a better starting selection, not proof of exhaustive safety,
   installed support or agent effectiveness. Selected public README/graphics and
   Git metadata need their own reviewed inclusion decision.
4. **Artwork origin is now declared, not inferred.** In response to the provenance
   question, the user reports both images were created with ChatGPT and their own
   prompt. The graphics remain unchanged. Their creation sessions/prompts are not
   in the reviewed selection. The root MIT notice is not being presented as a
   third-party rights clearance; this review makes no legal conclusion.

## Scan Coverage And Limits

Native Git inspection covers 1,942 reachable objects across all local refs,
including 1,081 distinct UTF-8 text blobs and 79 commit objects. HEAD reaches the
same object set: other local refs add no extra content at this checkpoint. Two
refs are Codex-internal and one is a feature branch; none should be published by
an unreviewed mirror operation. Reflog-only/unreachable objects were not scanned.

The local rules check private-key markers, selected provider/GitHub/AWS/Google/
Slack token shapes, JWT shapes, URL credentials and quoted credential assignments.
They find zero credential candidates and no credential-named tracked files at
HEAD. Neither Gitleaks nor TruffleHog is available on PATH; no established secret
scanner or live credential validation ran. These rules can miss secrets and
produce false positives. Account-field-name markers in code/fixtures are not
evidence of real accounts or credentials. All 92 root-run JSON files parse;
structural inspection finds 78 command and 78 startedAt fields without emitting
values or alleging raw provider transcripts.

The initial helper had a syntax error before scanning. After correction, its
first email heuristic also matched package-version strings. Requiring an
alphabetic domain suffix eliminates those false positives: no current-file
email-shaped hits remain, while commit identity remains an actual finding.
The refined result is retained separately rather than rewriting the first report.

The two binary blobs are the JPEG graphics. A separate bundled-Pillow inspection
checks main/nested EXIF, GPS, IPTC, XMP presence and Photoshop resource keys. It
finds no GPS data, identifying text EXIF tags, IPTC records or XMP. Two Photoshop
resource keys are present; arbitrary embedded data is not forensically cleared.
No image was re-encoded, stripped, edited or uploaded. Metadata results are
controller-captured command evidence, not falsely attributed to the text report.

## Decision Challenge

Trigger: a prospective public source, provenance and identity boundary. Proposed
next choice: prepare a fresh skills-first publication tree rather than push the
entire development history. Hosts own permissions and instruction delivery; Git
owns history transport. EHS owns its reviewed instructions and disclosure scope,
not a new publication runtime or secrecy attestation system.

The durable value is a standalone method that users can inspect without adopting
its development records. Strongest counterargument: a lean public tree excludes
useful research, examples and reproducibility material. Keep development history
locally; publish additional reviewed material later if valuable. Do not claim a
clean source projection proves engineering improvement.

| Claim | Evidence | Gap / required decision |
| --- | --- | --- |
| Full-history push is already cleared | 184 run files, host/project paths and Git identity | Explicit disclosure choice or reviewed redaction route |
| Candidate is the least-exposing existing selection | Positive 20-file inventory and marker-free bounded scan | Public README/graphic selection and fresh Git identity |
| Artwork has known reported origin | User states ChatGPT plus their prompt; metadata check | Public inclusion/rights responsibility, not a fabricated licence audit |
| Skills are fully qualified or effective | Discovery and retained bounded observations only | Preserve support limits; no release or superiority claim |

Minimum credible next slice: a separately approved clean publication-tree
selection from existing inputs, with no permanent exporter or history mutation.
Stop before missing contents/identity approval, unexpected files, drift, credential
access, installation, model trials, remote setup or push. The alternative is an
explicit full-source disclosure/redaction review, not an implicit default.
Verdict: **needs-human-decision**. Publication recommendation: **hold**.

## Retention And Local State

Private root: `/private/tmp/ehs-publication-119.HeUob8/`. Reports contain only
redacted categories/locations, counts and binary paths; matched values are not
retained. The mode-0600 reports/helper are disposable local evidence, not new
committed tooling or a trusted attestation. Temporary retention can expire.

- `audit-refined.json`: `1598c45ea306ce3c3bb8175df28e8d7d7b306cde293e01426af9844ca79b2b72`.
- `audit.mjs`: `474ebc2160ebc333f2d447bbe68856379c61ed62f04c5b013f8a39d36c5d984e`.

Archive SHA-256 remains
`d8cc52b6b445cb7646e7ab9d56fb4637d901c647947b2c8492523e0f89105e3d`.
Banner SHA-256 remains
`b242b967c565f715f8a435d3faceb81353e9443f4a209869355043d4a4fc528d`;
previous graphic SHA-256 is
`10a0e10ae49f10f6db43c8f34e4cb05d2403b81122cfff2d64769d3f7eda10ca`.
Source validation, 22 focused tests/69 assertions, 164 local links and whitespace
checks passed before the Pi evidence commit. No code/skill/runtime change calls
for another full protocol or behavioural suite. This review and its pointers
remain uncommitted; no publication or cleanup occurred.

## Owner Artwork Follow-up

After this review, the user approved removing the previous square artwork.
`assets/extremely-hardcore-skills.jpg` is removed from the working tree; the
landscape README banner remains byte-unchanged. Current display references use
the banner only. Earlier artwork records, the audited `13f2ebf` snapshot, binary
counts and hashes above remain historical evidence, not rewritten results.
The square image still exists in Git history; this deletion is not history
sanitisation or publication approval. No public tree was prepared or pushed.
