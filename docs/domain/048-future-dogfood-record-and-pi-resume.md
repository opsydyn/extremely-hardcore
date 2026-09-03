# domain map: future dogfood record and fresh-session resume

## domain terms

- **future dogfood record:** a human-readable account of one real EHS change
  and its operating evidence.
- **minimum record:** the smallest set of fields needed to review scope,
  protocol outcome, operator experience, evidence retention, and next action.
- **durable handoff snapshot:** a captured `eh status` projection supplied to a
  later session without relying on conversation memory.
- **fresh-session interpretation:** a new host process identifies the next
  action from a supplied snapshot; it is weaker than file-reading resume.
- **fresh-session resume:** a stronger future capability in which a new agent
  reads the durable run state and continues legally; this slice does not prove
  it.

## candidate bounded contexts

- EHS dogfood record documentation.
- EHS protocol status and transition projection.
- Pi host session and authentication boundary.
- Human release and evidence review.

## aggregates/entities/value objects

- A dogfood record contains change identity, protocol result, operator
  observations, evidence retention, fresh-session result, limitations, and
  next action.
- A handoff snapshot contains `state`, `risk`, `criteria`, `blockers`,
  `validation`, and `nextAction`.
- A resume result contains host/version, prompt boundary, expected marker,
  observed marker, and supported claim.

## commands

- Fill a future dogfood record from the template.
- Capture a status snapshot from `eh status`.
- Pass the snapshot to a fresh no-tools Pi session.
- Compare the exact observed marker with the expected next action.
- Record the limitation and retain only a summary.

## events

No runtime events are added. Run 048's local protocol evidence records the
documentation change; the Pi smoke is a transient external observation.

## policies/rules

- Historical records are not rewritten to fit the future template.
- Missing measurements use `not measured` or `not available` plus a reason;
  they are not silently treated as zero.
- A prompt-fed snapshot must be labeled separately from file-reading resume.
- No provider raw output, credentials, or session state is retained.
- The template does not replace the change contract, architecture decision,
  tests, review, or evidence ledger.

## invariants

- Every future record has one named target and one protocol/run identity.
- Protocol counts, blockers, validation, and transition state are reported
  from the run rather than inferred from prose.
- A fresh-session pass never upgrades an adherence or containment claim.
- EHS remains standalone and Pi remains responsible for its host mechanics.

## external systems

- EHS `eh status` command.
- Pi `0.84.1` with an authenticated `openai-codex/gpt-5.3-codex-spark` model.

## integration points

- `docs/dogfood/template.md` defines the future human-readable record shape.
- `docs/dogfood/README.md` routes operators to the template.
- `docs/dogfood/048-future-dogfood-record-and-pi-resume.md` records one use.
- `docs/evidence/048-future-dogfood-record-and-pi-resume.md` records provenance
  and claim limits.

## ambiguity

The phrase "fresh-session resume" can mean model interpretation of supplied
state, host file discovery, or legal continuation through the protocol. This
slice intentionally tests only the first and leaves the stronger forms gated.

## recommended next questions

- Is the minimum template proportionate after two or three more real records?
- Should a future file-reading resume check be implemented only after an
  accepted read-only host boundary exists?
- Which fields, if any, should become machine-validated later rather than
  remaining human-readable documentation?
