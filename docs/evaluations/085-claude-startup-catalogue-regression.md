# Claude Startup Catalogue Regression

Date: 2026-10-05. Approved offline follow-up to
[the stopped startup attempt](084-claude-startup-inventory-stop.md).

- result: complete
- claim: The offline startup predicate now distinguishes the exact observed normal-host catalogue from unreviewed exposure, without weakening the Read/Skill boundary or changing EHS.
- evidence: The old single-plugin condition reproduced two rejection failures; 13 focused tests pass with 87 assertions; retained native init replay passes; the full repository suite passes 199 tests with 787 assertions; validation and diff checks pass.
- remaining uncertainty: This is a host-projection predicate, not instruction attestation, permission enforcement or a successful model trial. The historical driver is unchanged and no live integration has been exercised.
- next: needs follow-up; propose one separately authorised fresh Claude planning attempt using this pinned predicate and refreshed preflight. Trial 084 remains blocked; no provider was invoked during this follow-up.

## Decision Challenge

Trigger: provider-specific startup provenance assumptions. Proposal: discriminate
the exact retained Claude catalogue from unexpected exposure, without claiming
that catalogue acceptance establishes instruction isolation or skill adherence.

Claude owns built-in plugin/skill discovery and permissions. EHS remains the
unchanged engineering method. The evaluation leaf owns only a fail-closed
predicate over host-reported metadata; no scheduler, runner, schema, runtime or
new skill is proposed.

Strongest counterargument: a plugin labelled `builtin` may still affect model
instructions. Trusting that label generically would conceal unreviewed exposure.
The alternative of retaining a single-plugin predicate prevents the approved
normal-host observation from running on this captured build. Accepting the
observed host catalogue is appropriate only for that limited observation,
not the stronger comparison/isolation gate.

| Claim | Evidence | Limit |
| --- | --- | --- |
| Three extra plugins are host-labelled built-ins | Retained native init: exact names, `builtin` paths and `@builtin` sources | Their contents are not inspected or attested |
| No extra execution tool was exposed | Init lists only Read/Skill and no MCPs | Metadata is not permission enforcement |
| Predicate distinguishes known and changed catalogues | Sanitised retained event, mutated fixtures and actual retained-init replay pass | Fixture tests do not establish live behaviour |

Minimum credible slice: one pure evaluation-leaf predicate, a sanitised startup
fixture and focused regressions. Keep the observed three built-ins and seventeen
additional skill names explicit; reject all other entries, duplicates, malformed
fields, model/version/permission drift, wrong staging paths and added tools/MCPs.
Non-EHS invocation remains out of scope even when a built-in name is catalogued.
Stop on disagreement with the retained event; do not rerun Claude to repair it.

Verdict: **proceed**, for offline regression only. Any fresh provider attempt
requires renewed scoped authorisation and fresh preflight. Original trial 084
stays blocked; its criteria and evidence are not rewritten.

## Boundaries

Bounded-context verdict: **safe with noted risk**. Tests depend on the optional
evaluation leaf; the leaf depends on no provider process, installed skill,
protocol or filesystem API. It consumes a host projection and returns a boolean.
The host still owns native enforcement; this is not a security boundary.
No existing caller or public contract changes and no new ADR is required.
There is no new domain model or persistence shape. The retained private trace
is not copied into the repository; only necessary catalogue/control fields are
represented in a sanitised fixture.

Scope excludes live dispatch, auth/settings changes, skill edits, changing
behavioural criteria, generic `@builtin` trust and distribution. The trade-off is
deliberate brittleness: a changed build/catalogue requires review rather than
automatic acceptance.

## Implementation And Verification

Added [the predicate](../../evaluation/claude-startup.ts) and
[regressions](../../tests/evaluation/claude-startup.test.ts) to the existing
optional evaluation/test directories. No new runner, command or dependency was
added. The private historical controller and raw records were not modified.

The predicate pins CLI `2.1.289`, model `claude-sonnet-5-5`, `dontAsk`, the
expected working/staged-plugin paths, inline EHS `0.0.1`, the three recorded
host-labelled built-ins, all nine qualified EHS skills and seventeen recorded
additional catalogue names. Collection order may differ; membership, identity,
paths, sources, duplicate counts, tools and MCP state may not. A built-in
acquiring a version field also requires review. Other startup fields are not
attested by this projection; no complete-instruction claim follows.

Tests first ran against the historical single-plugin condition: 9 passed and
2 failed, including the sanitised retained startup and its order permutation.
After correction, 11 passed; two additional adversarial cases expanded coverage
to 13 tests and 87 assertions. Coverage rejects unknown plugins even when labelled
`builtin`, missing/duplicate entries, external built-in paths, changed sources,
versions, skill names, malformed collections, extra execution tools, active MCPs,
missing control fields and version/model/permission/path drift.

Controller replay of the actual retained `report.json` startup returns true.
The source report and raw trace digests still match record 084. This does not
reinterpret the stopped attempt as successful or show native skill invocation.
No provider executable, model service, host auth check or network command was
invoked during this offline follow-up.

Fresh commands:

- `bun test tests/evaluation/claude-startup.test.ts`: 13 pass, 0 fail, 87 assertions.
- `bun run test`: 199 pass, 0 fail, 787 assertions across 31 files; reference
  Superpowers tests are excluded by this repository script.
- `bun run validate`: scaffold validation passes.
- `git diff --check`: passes.

Predicate SHA-256:
`72a89c97430dc05e2eb6b321d4ca95f5d754549ea3dc3e93296335d2152d5557`.
Test SHA-256:
`21be011fcd381a6d0df2deb5d33b517b413148844fc2aed1df2ebe3b5b0864dc`.

## Disposition

The corrected predicate is available for a future temporary controller; it is
not wired into a live provider adapter or retrofitted into trial 084's artefacts.
A proposed fresh attempt must use the same behavioural criteria, task and
read-only limits, obtain renewed Anthropic payload consent, and stop on new
host/catalogue drift. Catalogue presence still does not permit invoking any
non-EHS skill. Comparisons keep their stronger isolation/provenance requirements
and remain on hold. No skill change, release qualification or publication follows.
