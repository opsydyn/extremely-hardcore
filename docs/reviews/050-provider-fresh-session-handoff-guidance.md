# bounded-context review: provider-neutral fresh-session handoff guidance

## proposed change

Add a provider-neutral fresh-session handoff section to
`docs/provider-onboarding.md` that explains supplied status snapshots and
explicitly excludes file-reading resume claims.

## affected contexts

- Optional EHS `eh` status output.
- Provider onboarding and host session boundaries.
- Human-readable evidence and claim limits.

## allowed dependencies

- The existing `bun run eh status` command.
- Existing provider matrix terminology.
- The narrow Run 048 documentation record.

## suspicious dependencies

- A shared provider session abstraction.
- Provider-specific flags in the generic section.
- A new resume adapter, schema, daemon, credentials, or network path.
- Treating requested tool settings as enforcement evidence.

## data ownership

The protocol owns the status snapshot. Each host owns session mechanics. The
guide owns explanatory boundaries. No persistence or transaction boundary
changes.

## integration events

None. The section documents a handoff procedure; it does not create a runtime
message or provider call.

## anti-corruption needs

Keep prompt-fed interpretation, file-reading resume, loading, adherence, and
containment as separate claims. Do not let provider flags leak into the shared
protocol contract.

## verdict

safe with noted risk

## follow-up

Review the handoff wording after two or three real records before proposing any
file-reading resume implementation.
