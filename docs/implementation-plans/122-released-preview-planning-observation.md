# Released Preview Planning Observation

Date: 2026-10-14. Original preparation checkpoint; later execution after scoped
OpenAI payload/delegation consent is recorded in [result 123](../evaluations/123-released-preview-planning-result.md).
Discovery record 121 is committed locally as `909f3b2`.

- result: complete
- claim: One bounded native Codex planning-observation proposal is prepared using the actual released EHS tree and a frozen synthetic port-parser task.
- evidence: The released 21 files match inventory 120; the 16 skill/resource files total 30,685 bytes. Prompt/input pins are retained privately. Current native spawn/wait/close interfaces are listed; a read of the already closed worker 112 confirms completed-turn history is retrievable without resuming it. A parent-only check confirms the original parser accepts a malformed witness.
- remaining uncertainty: No new worker ran. Native route instructions are not containment, inherited host context is not isolated EHS treatment, and usage/model metadata may be unavailable. A planning response does not establish implementation adherence or general support.
- next: needs review; obtain the specific consent below, then refresh gates and dispatch at most one worker. Stop on drift rather than substituting a route, model or payload.

## Contract And Decision Challenge

Minimum complete change: one task, one fresh native worker, retained input/read/
final/closure evidence and a manual assessment of the frozen criteria. Reuse
the native route and history projection from 112; add no runner, adapter, schema,
grader, host configuration, installed skill copy or release change. No new ADR
is required: this observes existing instructions and host capabilities without
changing architecture, public contracts or permission policy.

Trigger: artifact provenance and the risk of overstating support from an agent
observation. Codex owns execution, permissions, ambient context and history;
EHS owns the unchanged engineering method. The strongest counterargument is
that a known, synthetic planning case can pass without useful real engineering
behaviour or isolated EHS contribution. The useful result is only whether this
released tree supports the observed planning response and receipt.

| Claim | Evidence / gap | Required boundary |
| --- | --- | --- |
| The guidance is from the public preview | All 21 extracted files match the fixed release inventory | Refresh exact membership and bytes before/after |
| A native worker/history route exists | Current schemas plus read-only history retrieval from closed worker 112 | New input/reads/final/closure still must be observed |
| The task contains an actual defect | Parent independently confirms malformed input is accepted | Keep witness/reference/assessment out of the worker payload |
| This proves containment or EHS effectiveness | Not established | Make no such claim; disclose mandatory ambient reads |

Verdict: **proceed** for preparation only. Runtime execution still requires the
express payload/delegation consent below; this verdict does not provide it.

## Frozen Payload And Limits

Destination: OpenAI through the signed-in native Codex host. One
`multi_agent_v1.spawn_agent` request with `fork_context: false`, inherited model/
effort and no overrides. Submit exactly two items: the released entrypoint as
a native `skill` item and the frozen prompt as `text`. Do not fork conversation
history. Do not use `create_thread`, CLI/app-server fallback or another worker.

Released root:
`/private/tmp/ehs-released-discovery-121.KVLYyu/extracted/extremely-hardcore/`.
Native entrypoint: `skills/using-extremely-hardcore/SKILL.md` beneath that root.
The nine skill bodies and their seven linked resources are the deliberately
available skill payload. The banner, manifests, package README, development
records, assessor material, reference/witness, credentials, memories and earlier
conversation are not deliberately supplied to the model. Normal host/system
instructions and any mandatory ambient skill reads remain possible; the native
route inherits host access and offers no fixture-only confidentiality boundary.

Private frozen input root:
`/private/tmp/ehs-released-planning-122.ROAeEo/`.

- `prompt.txt`: 2,116 bytes; SHA-256 `06a47991dd960171e45bbe35ec5aa23c0bd6d709bf5f006afff57144dbfef59a`.
- `inputs.json`: SHA-256 `31cfcb321bf252bb4a48f0543266edcb54d5873f1f9414f84c4282ed1b6808e6`.
- Skill/resource digest: `2da98cae54b6fb2b23d6f5baa545fac3dc4b88826e72a1b7d5bdb3660a1a9c9b` (SHA-256 of JSON.stringify of path-sorted `{path,bytes,sha256}` entries).
- Public ZIP SHA-256: `fa8ba33095dac8c493810f9e9fd606fcd24fca3aeec21daf6e659887c61e01f3`; release source commit `7dc35a5feb8f7595a3337bcae54224406c34811d`.

The prompt reuses the port behaviour/source from plan 076 but requests the
released absolute skill path and explicitly acknowledges mandatory host reads.
It supplies the complete synthetic context and says there is no target checkout
or Git status to inspect. It contains no witness, expected answer or rubric.
Read the pinned prompt for dispatch; do not reconstruct it from older plans.

Budget: one worker, one input, 180 seconds from dispatch through closure, final
under 600 words. No follow-up, retry, resume, further delegation or model override.
Request closure early enough to leave time within the cap; record actual elapsed
time and any overrun rather than claiming a guaranteed host-enforced limit.
There is no guaranteed monetary/spend cap. Model service traffic is necessary.

The task requests only literal read commands for released skill/resources,
plus host-mandatory ambient instruction reads. No writes, tests, builds,
directory discovery, Git operations, installs, network/app tools or unrelated
reads. These are worker instructions, not accepted read-only sandbox settings.
Inspect observable actions; detection cannot retract access or a sent payload.

## Preflight, Assessment And Stop Conditions

Before dispatch, verify prompt/manifest pins, exact 21-file package membership,
all 16 skill/resource bytes and native tool schemas. Reuse the current native
signed-in route; do not read or copy credentials. Stop on missing access, drift,
missing trace capability or any need to change configuration/authority. Parent
snapshot checks must distinguish pre-existing documentation changes from worker
changes. Never revert concurrent user changes.

Behavioural criteria are exactly criteria 1-7 from
[plan 072](072-codex-standalone-acceptance-trial.md#assessment-criteria): bounded
contract, accurate static witness, useful regression/boundary tests, complete
small implementation proposal, justified ADR applicability, no unnecessary
planning approval pause, and an honest five-field planning-only receipt.
Do not transmit that assessment or the parent's witness to the worker.

Native delivery criterion 8 is declared separately from 072's different
app-server inventory/sandbox criterion: retain the exact submitted input,
completed final, observable tool events with at least one body-matching released
skill read, final package/repository change checks and successful closure within
the cap. Retrieve native history with outputs large enough to avoid truncating
decisive reads/actions; pagination gaps or unavailable decisive evidence remain
not observed/blocked. Accepted skill input alone is not injected-byte attestation.
Retain actual model/usage metadata if exposed; otherwise label it unavailable,
not zero, and make no cost/efficiency claim. Do not rescore historical trials.

Close on attempted out-of-scope action, provider/auth error, timeout, input drift
or disproved assumptions. Missing evidence cannot become a behavioural pass.
Retain only necessary native commands, relevant released read outputs, final
receipt, pins and closure metadata outside the package; exclude private reasoning
and unrelated ambient skill bodies. No automatic skill edit follows any outcome.

## Execution Consent

Ask the user to authorise one fresh native Codex worker sending the frozen
synthetic prompt/source and nine released EHS skills/resources to OpenAI, with
normal host context and mandatory ambient reads acknowledged. Name the single
180-second observation, inherited model/effort, no retries/follow-up/delegation,
no requested writes/tests/network tools, no guaranteed spend cap and lack of
filesystem containment. No model dispatch, push or release mutation occurred
during preparation. This proposal and its status pointers remain uncommitted.

## Execution Follow-up

After the specific consent question, the user explicitly approved this one
observation. Result 123 records its completed/closed native worker and seven
of eight criteria passing, with the concrete numeric-witness criterion failed.
The frozen prompt, input pins, criteria and limits above were not changed.
No retry, automatic EHS edit, implementation or wider qualification follows.
