# bounded-context review: historical projection retention audit

## proposed change

Audit the missing attestation and CI projection paths for Runs 033 through 035,
record the inability to recover original proof from the current workspace, and
add a concise no-backfill rule for future records.

## affected contexts

- Protocol run records and evidence fingerprints.
- Derived attestation and CI projections.
- Dogfood retention and release-gate documentation.

## allowed dependencies

- Existing Runs 033 through 035 and Run 047's retention inventory.
- Existing `eh status` and `eh ci` commands.
- Existing dogfood template and roadmap wording.

## suspicious dependencies

- Rewriting historical run records or evidence.
- Treating `/tmp` as a durable artefact store.
- Adding a projection archive, schema, CI workflow, or persistence service.
- Turning the audit into release approval or a provider comparison.

## data ownership

The protocol owns run and evidence state. The CLI derives current projections.
The dogfood docs own the human-readable retention limitation. No data owner
changes in this slice.

## integration events

None. The audit invokes local commands only and writes disposable outputs under
`/tmp`; no CI, provider, network, or external service is contacted.

## anti-corruption needs

Keep these claims separate: historical completion at a recorded fingerprint,
current validation against today's workspace, projection retention, and release
acceptance. A current invalid projection must not cross the historical-proof
boundary.

## verdict

safe with noted risk

## follow-up

Human review must decide whether the confirmed historical retention gap is
acceptable for release evidence or whether a separately designed durable
retention change is warranted.
