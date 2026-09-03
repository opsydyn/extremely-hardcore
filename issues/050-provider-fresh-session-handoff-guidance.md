# issue: document the provider-neutral fresh-session handoff

## intent

Give Codex, Claude, and Pi users one clear handoff vocabulary for durable EHS
status without implying that EHS already provides file-reading resume.

## scope

- Add a provider-neutral handoff subsection to `docs/provider-onboarding.md`.
- Describe optional `eh status` snapshot input and the session boundary.
- Keep prompt-fed interpretation separate from file-reading resume, adherence,
  containment, comparison, and release claims.

## completion criteria

- The guide names the snapshot source, boundary fields, expected/observed result,
  and explicit limitations.
- Run 050 has fresh evidence for all criteria, no blockers, and a valid
  attestation.
- No provider adapter, session control, schema, credential, or runtime change
  is introduced.

## non-goals

- No file-reading resume implementation.
- No provider comparison, benchmark, or model-performance claim.
- No network, sandbox, containment, or writable execution work.
