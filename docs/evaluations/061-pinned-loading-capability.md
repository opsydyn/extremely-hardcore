# Pinned skill loading: capability assessment

Date: 2026-09-22. Local CLI/schema inspection and official documentation review.
No model invocation, authentication inspection, user configuration change, or
app-server session was performed.

## Contract and architecture

Assess the smallest host-supported route to selecting a pinned EHS build and
retaining loading evidence. Preserve the pending scorer/documentation changes.
Do not implement an adapter, alter scoring, or start comparative execution.
This assessment changes no architecture; no new ADR is required. A subsequent
adapter/provenance contract change needs its own decision under ADR 0006.

## Trigger

Decision challenge: proposed provenance and comparison prerequisites.

## Proposal and claims

Use native host capabilities, first to establish discovery without a model,
then separately to qualify explicit loading. Neither discovery nor a submitted
skill path proves the model consumed or followed the instructions.

## Existing-platform ownership

Codex owns discovery, instruction injection, execution permissions, and events.
EHS owns the skill snapshot and checks on retained evidence, not a replacement
runtime or an assertion of host enforcement.

## Durable differentiated value

Reproducible engineering-method inputs and independent outcome checks. A new
transport is not itself product value.

## Strongest counterargument

An app-server integration could cost more than this experiment warrants. A CLI
loading smoke may suffice, but a model reading a requested path is different
from testing native skill injection. Do not silently substitute one experiment
for the other or build a general-purpose client before testing discovery.

## Claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Capture CLI trace | Installed `codex exec --help` lists `--json`; official non-interactive docs describe events and usage | Read-only EHS adapter discards stdout | Retained real trace; missing events/usage labelled unavailable |
| Select explicit skill path | Installed `TurnStartParams.json` includes `SkillUserInput` requiring type, name, path; official app-server docs describe instruction injection | Schema is not runtime acceptance or loading evidence | Accepted explicit-path request plus host evidence of injection or successful full-file read |
| Inspect discovery without a turn | Installed `SkillsListParams.json` supports cwds and forceReload | No runtime discovery call made | Inventory resolves intended snapshot and exposes competing copies |
| Follow current docs | CLI is `codex-cli 0.154.0` | Documented perCwdExtraUserRoots is absent from generated stable schema | Use version-supported fields; do not assume newer/experimental fields |
| Exclude ambient instructions | CLI offers ignore-user-config | This does not establish exclusion of all skills, plugins, or ancestor instructions | Inventory and controlled discovery roots for both arms |
| Verify containment | Read-only sandbox flag exists | Requested configuration is not enforcement evidence | Separate acceptance of the actual execution environment |

## Minimum credible slice

Recommend a disposable, no-model discovery probe using the installed app-server
protocol before choosing an adapter transport. Use a fresh temporary workspace
outside this repository's instruction ancestry and a temporary host home, with
no copied credentials or personal configuration. Preserve normal security rules;
do not use ignore-rules or bypass flags to make the probe work.

Copy the full selected skill tree, including referenced templates, rather than
symlinking the changing checkout. Record relative file paths, byte lengths and
SHA-256 digests; identify dirty working-tree content as a snapshot, not merely a
Git commit. Reject symlinks and verify the same manifest after probing.

Limit the probe to initialisation and skills/list with forceReload, then stop the
process. Inventory the empty control workspace and the staged-skill workspace.
Retain requests, responses, CLI version, errors and snapshot manifest. Do not
call thread/start or turn/start. Discovery alone cannot lift the comparison hold.

A later separately approved loading probe must distinguish: available skill,
requested skill, host-observed instruction delivery, and behavioural adherence.
Pinning the router alone does not establish loading every EHS skill. An echoed
marker or final claim is insufficient. Preserve raw evidence locally with
restricted access, redact before sharing, and do not require reasoning dumps.

## Stop conditions

Stop on ambiguous/duplicate discovery, unavailable version-specific methods,
unexpected authentication/network requirements, snapshot changes, or evidence
that cannot distinguish discovery from loading. Do not work around these by
copying credentials, relaxing permissions, or inventing a loader.

## Verdict

proceed

## Rationale

Proceed only to the bounded no-model discovery probe, not an adapter rewrite or
comparison. The installed schema makes that a credible next experiment; it does
not prove the runtime result. Comparative execution remains on hold.

## Evidence and sources

Host-captured commands exited 0: `codex --version`, `codex exec --help`,
`codex app-server --help`, `codex app-server generate-json-schema --help`, and
`codex app-server generate-json-schema --out /tmp/ehs-codex-capability.hYLcmh`.
CLI commands warned that PATH aliases could not be created under current
permissions; this did not prevent help/schema generation. Temporary generated
schemas are inspection artefacts, not repository dependencies.

Inspected generated v2 TurnStartParams, SkillsListParams and
ThreadTokenUsageUpdatedNotification. An attempted standalone ThreadItem.json
lookup failed because that file is absent; no event-schema completeness claim
is made. No behavioural tests were run for this documentation-only assessment.

- [Native skill invocation and discovery](https://learn.chatgpt.com/docs/app-server)
- [CLI JSON events and usage](https://learn.chatgpt.com/docs/non-interactive-mode)
- [Skill configuration](https://learn.chatgpt.com/docs/build-skills)

## Receipt

- result: complete
- claim: A version-grounded candidate path is identified, not runtime-qualified.
- evidence: Installed CLI help/schema and official documentation; no model run.
- remaining uncertainty: Discovery, injection, baseline exclusion, auth, and containment.
- next: Run the disposable no-model discovery probe before choosing integration.

Recommendation: needs follow-up.
