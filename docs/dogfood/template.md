# Real Operator Dogfood Run <number>: <short title>

Use this template for new real-change records. Keep entries short. Write
`not measured` or `not available` with a reason when a value was not captured;
do not infer zero from an absent field. Do not rewrite historical records to
fit this template.

## purpose

## change

- **Change type:**
- **Risk lane:**
- **Target:**
- **Target baseline:**
- **Run:**
- **Scope:**

## protocol path

Record the initial state, meaningful blocked or human-decision handoffs, final
transition, and whether the final evidence was captured at one fingerprint.

## operator timing

| Phase | Started | Finished | Observed interval | Provenance |
| --- | --- | --- | --- | --- |
| Setup and inspection |  |  |  | host-captured, agent-declared, or not measured |
| Implementation and verification |  |  |  | host-captured, agent-declared, or not measured |
| Review and handoff |  |  |  | host-captured, agent-declared, or not measured |

## friction and false blocks

| Category | Observation | Resolution | Bypass used |
| --- | --- | --- | --- |
|  |  |  | yes/no |

- **False-block outcome:** observed count and what was classified as a false
  block. State `not measured` when the run did not distinguish it.
- **Workarounds:** source, protocol, environment, or command workarounds.

## result

| Measure | Result |
| --- | --- |
| Acceptance criteria |  |
| Open blockers |  |
| Protocol validation |  |
| Final transition |  |
| Focused and broad checks |  |

## evidence quality

- **Run/evidence/log retention:**
- **Attestation and CI projection retention:**
- **Host-captured evidence:**
- **Record-reported evidence:**
- **Not evidenced:**

When an attestation or CI projection was written to an ephemeral location and
is no longer present, record `not retained`. A current rerun may be recorded as
current revalidation or an invalid result, but must not be described as recovery
of the historical projection.

## fresh-session resume

- **Snapshot source:** `eh status` path or other durable handoff.
- **Host and version:**
- **Session boundary:** tools, session persistence, context files, and model.
- **Expected action or marker:**
- **Observed action or marker:**
- **Claim supported:**
- **Not proved:**

## limitations

## next
