# bounded-context review: future dogfood record and fresh-session resume

## proposed change

Add a human-readable template for future dogfood records and observe one Pi
fresh-session interpretation of a supplied `eh status` snapshot. No runtime or
host integration code changes.

## affected contexts

- EHS dogfood documentation and release review.
- EHS protocol status vocabulary, observed read-only.
- Pi authentication and session boundary, observed only.

## allowed dependencies

- Existing Markdown documentation and `eh status` output.
- Existing Pi CLI, authenticated model, and explicit skill entrypoint.
- No-tools, no-session, no-context-files invocation flags.

## suspicious dependencies

- Pi filesystem, shell, network, or workspace-write tools.
- Provider adapter code, a second schema, a tracker, or a resume daemon.
- Raw provider transcript, credentials, or session persistence.
- Treating prompt-fed interpretation as file-reading resume.

## data ownership

EHS owns the future record template and its dogfood evidence. The protocol owns
the status projection. Pi owns auth, model traffic, and session lifecycle. The
transient snapshot belongs to the operator and is summarized without secrets.

## transaction boundaries

There is one documentation boundary: update the template and status surfaces,
then capture Run 048 evidence against the final EHS workspace fingerprint. The
Pi session is disposable and has no repository write boundary.

## integration events

No runtime events or provider messages are added.

## anti-corruption needs

Keep future human-readable fields in `docs/dogfood/template.md`, protocol state
in the existing `eh status` vocabulary, and host-specific limitations in the
Run 048 record. Do not let a provider response alter protocol state or release
claims.

## verdict

safe with noted risk

## follow-up

Reassess the template after two or three subsequent records. Any file-reading
or writable resume proposal needs a new boundary review and decision challenge.
