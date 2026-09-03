# change contract: document the provider-neutral fresh-session handoff

## user intent

Make the provider onboarding guide explain how to hand off a durable `eh status`
snapshot to a fresh agent session while keeping the claim boundary explicit.
Users should be able to distinguish prompt-fed interpretation from file-reading
resume and should not infer provider adherence from a marker alone.

## current understanding

`docs/provider-onboarding.md` documents package discovery, skill loading, host
smokes, and the current provider matrix. Run 048 records one Pi no-tools,
no-session, no-context-files interpretation of supplied status text. The guide
does not yet provide a provider-neutral handoff procedure or name the stronger
file-reading resume claim as unproved.

## allowed scope

- Add one concise provider-neutral fresh-session handoff subsection.
- Show the optional `eh status` snapshot step and the session boundary to
  record: host/version, tools, session persistence, context files, expected and
  observed result, and limitation.
- State that prompt-fed interpretation is not file-reading resume or adherence
  evidence.
- Link the current narrow Run 048 evidence without presenting it as a provider
  comparison.
- Record this contract, domain map, implementation plan, review, issue, dogfood
  record, and evidence ledger.

## forbidden scope

- No resume adapter, session daemon, protocol schema, provider-specific API,
  credential handling, model call, network, sandbox, containment, or writable
  execution change.
- No provider comparison, performance claim, adherence claim, or release claim.
- No change to host loading commands or existing provider matrix results.
- No raw provider transcript or credential retention.

## affected areas

- Provider onboarding documentation.
- Fresh-session and evidence claim terminology.
- Run 050 protocol evidence only.

## minimum complete change

Add a short, provider-neutral subsection that describes the optional status
snapshot handoff and labels the exact boundary of what it proves. Do not invent
provider session semantics or add a new machine-readable receipt format.

## architecture-decision check

No ADR is required. This documents an existing optional protocol handoff and
does not change runtime, provider, persistence, integration, sandbox, network,
or public API behavior.

## public contracts

The provider onboarding documentation contract gains clearer claim limits. No
provider adapter, CLI, skill, or protocol contract changes.

## risks

- A concise marker could be over-read as proof of file-backed resume.
- A provider-neutral paragraph could accidentally imply that all hosts expose
  the same session flags.
- Linking Run 048 could be mistaken for a provider comparison if its narrow
  boundary is not repeated.

## acceptance evidence

- A content assertion fails before the subsection exists.
- The final guide names the status snapshot, session boundary, prompt-fed limit,
  and file-reading-resume gap.
- Run 050 captures fresh evidence for all criteria at one final fingerprint.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and whitespace checks
  pass.

## stop conditions

Stop if the guide needs provider-specific session control, writable execution,
credentials, a new protocol field, or a claim that cannot be directly evidenced
on the current host.
