# decision challenge: future dogfood record and fresh-session resume

## trigger

This slice defines a future operating/documentation contract and invokes an
external provider session. It must not quietly become a new protocol schema,
provider adapter, or claim that a model can resume from local files.

## proposal and claims

- Recommend one compact Markdown template for future dogfood records.
- Require future records to state identity, protocol result, timing, friction,
  false-block outcome, evidence retention, fresh-session result, limitations,
  and next action.
- Run one current Pi no-tools session from a durable `eh status` snapshot and
  record whether it identifies the next legal action.

The proposed evidence is deliberately narrow. It does not claim that Pi read a
run directory, used workspace tools safely, adhered to EHS on real work, or
supports general resume semantics.

## existing-platform ownership

The EHS protocol owns the status vocabulary and next-action projection. Pi owns
authentication, model traffic, and session lifecycle. The Markdown template
belongs to the EHS dogfood documentation boundary. No layer needs a new shared
runtime object.

## durable differentiated value

The value is a small, reviewable operating record that makes missing evidence
visible and keeps the durable handoff vocabulary consistent across hosts. It is
not a provider feature or an orchestration product.

## strongest counterargument

A Markdown template may add ceremony without improving decisions, and a
prompt-fed status snapshot is weaker than a model reading the actual run files.
The slice should therefore avoid historical migration, allow `not measured`,
and report the Pi check as an interpretation smoke rather than resume proof.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required treatment |
| --- | --- | --- | --- |
| Future records need a common minimum | Run 047 found inconsistent fields | No user-cost data for a template | Add the smallest optional template and test it on one run |
| EHS has a durable handoff vocabulary | `eh status` exposes state, risk, criteria, blockers, validation, and nextAction | A fresh model has not interpreted a supplied snapshot in this campaign | Use one no-tools Pi check |
| Pi can resume from a local run | None | No-tools mode cannot read files | Do not make this claim; test prompt-fed interpretation only |
| The template improves operator experience | None | One run cannot measure improvement | Record the template as a hypothesis and keep the success measure open |

## minimum credible slice

Add one Markdown template and README field list, run one authorized Pi
no-tools/no-session handoff interpretation, preserve raw-output boundaries,
and complete a valid local protocol run.

## stop conditions

- The template requires a new JSON schema, validator, or tracking service.
- Pi needs filesystem, shell, network, or workspace-write tools.
- The observed result cannot be separated from the prompt-fed snapshot.
- The record implies provider comparison, adherence, containment, or release
  readiness.

## verdict

proceed

## rationale

The proposal addresses a concrete Run 047 evidence gap with one additive
document and a narrow host check. Its limitations are falsifiable and can be
kept visible without expanding EHS into a resume runtime.
