# domain map: provider-neutral fresh-session handoff

## terms

- **status snapshot:** durable JSON output from the optional `eh status` path
  that states run state, coverage, blockers, validation, and next action.
- **prompt-fed interpretation:** a fresh session receives the snapshot as input
  and interprets it without reading the repository.
- **file-reading resume:** a stronger future capability where a fresh session
  reads durable run artifacts from the workspace and continues from them.
- **session boundary:** the host/version, model, tools, session persistence, and
  context-file conditions under which a handoff result was observed.

## ownership

- The `eh` protocol owns status JSON and executable run state.
- The provider onboarding guide owns provider-neutral user guidance and claim
  limits.
- Each host owns its session flags and loading mechanics.
- The evidence ledger owns the distinction between host-captured evidence and
  record-reported interpretation.

## rules and invariants

- A supplied snapshot must be labeled prompt-fed.
- No marker proves that a provider read local files or enforced a protocol.
- Provider-specific flags remain in provider-specific onboarding sections.
- A host loading smoke is not engineering adherence or a provider comparison.
- Raw provider transcripts and credentials remain outside the repository.

## ambiguity to preserve

The protocol has durable status output, but EHS does not currently promise a
provider-independent file-reading resume mechanism. The guide must preserve
that gap rather than papering over it with a generic command.

## next question

After repeated real changes, is a file-reading resume boundary worth the added
host, security, and provenance complexity?
