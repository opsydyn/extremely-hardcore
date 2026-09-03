# Completion-gate dogfood

This directory records real use of the proof-carrying completion gate. A run counts only when it corresponds to a non-trivial repository change and preserves its `.extremely-hardcore/runs/<change-id>/` evidence directory.

Each record states the change type, risk, captured commands, gate behaviour, setup overhead, friction, fresh-agent readability, and any workaround. Failed or abandoned runs remain records; they are not erased to improve the headline result.

## Required sample

| Run | Required change type | Status |
| --- | --- | --- |
| 1 | Feature | Complete |
| 2 | Bug fix | Complete |
| 3 | Refactor or dependency change | Complete |
| 4 | Change made stale during verification | Complete |
| 5 | Real blocker or rejected completion | Abandoned with recorded blocker |

The initial five-record sample is complete. The current ten-run campaign index
is below; the original five-run decision remains a historical record in
`decision.md`.

## Current ten-run campaign

| Run | Record | Change type | Target |
| --- | --- | --- | --- |
| 1 | [roadmap Pi status](033-real-operator-dogfood-roadmap-pi-status.md) | Documentation/status correction | EHS repository |
| 2 | [stale completed status](034-status-stale-completed-next-action.md) | Protocol bug fix | EHS repository |
| 3 | [resolved blocked status](035-status-resolved-blocked-next-action.md) | Protocol bug fix | EHS repository |
| 4 | [minimum complete change](036-minimum-complete-change-heuristic.md) | Skill guidance | EHS repository |
| 5 | [Enhancement resource metadata](037-real-operator-dogfood-enhancement-resource-metadata.md) | Compiler hardening | `40k-builder` |
| 6 | [function name boundary](038-real-operator-dogfood-function-name-boundary.md) | Filesystem/public-boundary fix | `astro-azure-integration` |
| 7 | [trimmed radar tags](039-real-operator-dogfood-trimmed-radar-tags.md) | Frontend filtering fix | `tech-radar-web` |
| 8 | [postcode coordinate validation](040-real-operator-dogfood-coordinate-validation.md) | Public input validation | `postcodesio-effect-client` |
| 9 | [computed Effect boundary](041-real-operator-dogfood-computed-effect-boundary.md) | Lint-rule correctness fix | `effect-oxlint` |
| 10 | [Bun port validation](042-real-operator-dogfood-port-validation.md) | Runtime configuration fix | `elysia-azurefunc-adapter` |

All ten records exist. Runs 5 through 10 target external repositories; the
retained records state their exact worktrees, checks, limitations, and
attestations. The aggregate operational review is recorded in [Run 047](047-operational-acceptance-host-matrix.md).

Run 047 is an acceptance review, not an additional campaign case. It reports
65/65 acceptance criteria covered in the ten records, confirms that all
criterion-linked evidence and log paths are present, and records that three
core attestation/CI projection paths are no longer present. It does not infer
false-block or fresh-agent-readability rates where the older records omit
those fields.

Run 052 follows up on the retention finding without rewriting the historical
records. It confirms that Runs 033 through 035 retain source run state,
evidence, logs, and completion transitions, while their documented original
attestation and CI projections are absent. Current revalidation is stale and
current regeneration is invalid, so the missing historical projections are not
backfilled or relabelled.

## Targeted design dogfood

Run 11 applies the optional `simple-made-easy` lens to the multi-option design
decision that introduced it. It is targeted self-dogfood, not a provider
comparison or a skill-effect benchmark.

| Run | Record | Change type | Target |
| --- | --- | --- | --- |
| 11 | [Simple Made Easy lens](045-simple-made-easy-lens.md) | Multi-option public skill design | EHS repository |

## Targeted external dogfood

Run 12 applies the optional `simple-made-easy` lens to a concrete external
repository repair. It is path-contract dogfood, not a provider execution or
skills-effect benchmark.

| Run | Record | Change type | Target |
| --- | --- | --- | --- |
| 12 | [Simple Made Easy edition snapshot path](046-real-operator-dogfood-edition-path.md) | Filesystem/public-boundary fix | `tech-radar-web` |

## Operational acceptance

| Review | Scope | Result |
| --- | --- | --- |
| [047 operational acceptance and host matrix](047-operational-acceptance-host-matrix.md) | Ten-run aggregate, supplemental dogfood, current Codex/Claude/Pi host checks | Review complete; release remains open pending retention, current loading, adherence, and containment evidence |

The current provider-loading details live in the [provider onboarding guide](../provider-onboarding.md).

## Future record minimum

Start each new real-change record from [the dogfood record template](template.md).
The minimum fields are:

- change identity, target, risk lane, scope, and protocol run path;
- protocol path, acceptance criteria, blockers, validation, and final
  transition;
- setup, implementation, verification, review, and handoff timing with
  provenance or an explicit unavailable reason;
- friction categories, workarounds, and an explicit false-block outcome;
- run/evidence/log retention and attestation/CI projection retention;
- host-captured versus record-reported evidence;
- fresh-session host/version, boundary, expected and observed action, supported
  claim, and limitation;
- limitations and the next bounded action.

This is a human-readable documentation convention, not a second protocol
schema. Existing records remain historical and are not backfilled.

If a projection was written only to an ephemeral path and is no longer present,
write `not retained`. A current rerun must remain labelled as current
revalidation or invalid output; it cannot restore historical projection proof.

## Fresh-session dogfood

[Run 048](048-future-dogfood-record-and-pi-resume.md) uses the template and
records one Pi no-tools interpretation of a durable `eh status` snapshot. It is
not evidence that Pi read local files or can resume arbitrary workspace
execution.

## Template field-burden dogfood

Runs 049 and 050 apply the template to two real documentation changes. The
qualitative result is recorded in each run: the required fields fit without a
new schema or protocol command, while operator timing and any productivity
effect remain not measured.

| Run | Record | Change type | Target |
| --- | --- | --- | --- |
| 049 | [User-guide record workflow](049-user-guide-real-change-record-workflow.md) | New-user documentation | EHS repository |
| 050 | [Provider fresh-session handoff](050-provider-fresh-session-handoff-guidance.md) | Provider-boundary documentation | EHS repository |

## Human review

Human review on 2026-09-03 accepted the template as a lightweight recommended
Markdown convention and deferred file-reading resume. Runs 049 and 050 remain
qualitative field-burden evidence; timing, omission rates, and productivity
effect are not measured. Release, provider loading, adherence, containment, and
retention gates remain open. Run 052 confirms the historical retention gap;
accepting that gap or designing durable retention still requires separate human
review.
