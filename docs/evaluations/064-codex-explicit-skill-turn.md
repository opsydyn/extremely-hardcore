# Codex explicit-path skill turn: single probe

Date: 2026-09-22. User-approved retry of the
[blocked preflight](063-codex-loading-turn-blocked.md). This is one harmless
read-only model turn, not a controlled comparison or release acceptance.

## Contract and boundary

Determine whether the installed signed-in Codex app-server accepts an explicit
skill path from a pinned EHS copy and retains a reviewable turn trace. Ask the
model to make one small in-memory design choice using `simple-made-easy`.
The repository and temporary task workspace must remain unchanged. Preserve
the control inventory, host events, available usage, and uncertainty about
instruction delivery. No adapter, scorer, public contract, or architecture
change was made; ADR 0006 remains the relevant future adapter boundary.

## Host-captured setup

- Source commit: `5e19c43ed1c8e93d3826d20f2adc164a58f1a158`.
  The `skills/` tree was clean against that commit. All nine skill directories,
  including templates, were copied to a fresh temporary workspace under
  `.agents/skills`. The source and staged 16-file manifests matched before the
  turn and remained byte-for-byte unchanged afterward. Sorted path/size/SHA-256
  manifest digest: `5a19b8108349ce3dd71450ad3639302dd2779e829ef1ea537979e95674665043`.
- `skills/list` with `forceReload` returned zero EHS skills for the temporary
  control workspace and all nine enabled EHS skills for treatment. It also
  returned 17 ambient personal, plugin, and bundled skills in both inventories.
  No discovery errors or duplicate `simple-made-easy` path were observed.
- `thread/start` returned `ephemeral: true`, model `gpt-6-astra`, provider
  `openai`, `approvalPolicy: never`, and `sandbox.type: readOnly` with tool
  `networkAccess: false`. The task sent a text input naming the skill and a
  native `skill` input item with the absolute path under the staged tree.
- The user approved normal signed-in host-state access and provider transfer
  for this one turn after the earlier automatic review rejection. A first
  signed-in retry reached discovery but stopped at `thread/start` because the
  request used `readOnly` where that field requires `read-only`; it started no
  turn. The corrected request completed one turn.

## Observed result

The event stream contains a completed `userMessage` with `text` and `skill`
content. The `skill` item names `simple-made-easy` and carries the staged
absolute `SKILL.md` path. The turn completed without error. Its answer chose
the direct map and used the skill's seven compact-check fields: outcome,
options checked, selected path, entanglement avoided, safeguards preserved,
omitted scope, and remaining uncertainty. The prompt requested a compact
simplicity check but did not enumerate those fields.

Completed item types were one user message, one reasoning item, and two agent
messages. There were no command, file-change, or other tool items. Raw events
were retained locally; the reasoning item was not used as verification evidence
or copied into this record. A host usage event reported 22,835 input tokens,
12,416 cached input tokens, and 248 output tokens for this turn. These numbers
include ambient host context and are not an EHS overhead or cost estimate.

The app-server emitted no dedicated skill-load or full-instruction-delivery
event. `thread/start.instructionSources` was empty; that field does not attest
to the explicit skill item. The accepted native item and skill-shaped output
support that this route works for one task, but do not independently prove the
exact skill bytes sent to the model or sustained engineering adherence. The
control workspace was inventoried only; it did not receive a model turn.

## Retained provenance

Local temporary directory:
`/var/folders/wv/3m5dhh6x5pv9w0fbfzymldnw0000gn/T/ehs-loading-kJKTNn/`.
It contains `requests.jsonl`, `events.jsonl`, `manifest.json`, and
`report.json`. The host may later remove it. Review and redact raw events
before sharing; this record retains only the relevant projections.

| Artifact | SHA-256 |
| --- | --- |
| `requests.jsonl` | `d7d36a38d26c67bb1a82b0818c48bf60d0034c67ace3d7b722dd57f06e24ff26` |
| `events.jsonl` | `ae1dfe5b5758442b4f7f7216dcdd234c6028c8ae5b9a54ac6d07bfb38d64f17f` |
| `manifest.json` | `9590f7538252ca11b033ca851699ee83a4c02e31bbcd5b7508257c6bc69b3203` |

## Interpretation and next step

The narrow explicit-path loading probe succeeded operationally. It removes
the previous uncertainty about whether this installed app-server accepts an
EHS skill item and completes a read-only turn. It does not qualify a pinned
baseline-versus-EHS experiment: ambient skills remain available, no model
control arm was run, no full-byte delivery attestation is exposed, and one
design-choice answer cannot establish engineering quality or improvement.
The comparative-execution hold remains.

Next, define the minimum credible comparison control: how to isolate ambient
skills and user config without losing signed-in access, retain both arms'
traces and usage, and score independent outcomes. Avoid another provider run
until that design is reviewable; do not infer a performance threshold here.

- result: complete
- claim: One explicit-path EHS skill turn completed with a retained host trace and skill-shaped answer.
- evidence: Native skill input event, completed turn, unchanged file manifests, and usage event.
- remaining uncertainty: Exact injected bytes, baseline isolation, repeated adherence, and comparative effect.
- next: Design an isolated, independently scored comparison prerequisite before further runs.

Recommendation: needs follow-up.
