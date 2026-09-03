# decision challenge: historical projection retention audit

## trigger

This proposal concerns the provenance and retention boundary for completion
proof. It is intentionally an audit and documentation change, not a proposal
to alter persistence or CI behaviour.

## proposal and claims

Audit Runs 033 through 035, attempt current projection generation in disposable
directories, and record whether the original attestation and CI projections
are recoverable. If they are not, document the gap and prohibit backfill or
relabeling. Add a future-record rule that distinguishes durable projection
retention from ephemeral output.

The proposal claims only that:

- the retained run state can be inspected;
- the documented projection paths can be checked;
- current regeneration can be classified as current and valid or invalid;
- the historical projection cannot be called recovered when its original
  fingerprint and output are unavailable.

It does not claim that the original implementation was incorrect, that the
protocol should change, or that release is approved.

## existing-platform ownership

- The EHS protocol owns run state, evidence, fingerprints, and transition
  validation.
- `eh attest` and `eh ci` own derived current projections.
- Git and the local filesystem provide revision and path evidence, but `/tmp`
  does not provide durable product retention.
- CI or a future review system may own its own archival policy; EHS does not
  infer that policy here.

## durable differentiated value

EHS preserves the distinction between a claim, the evidence captured for it,
the workspace against which it was captured, and a later projection of that
state. The useful value in this slice is refusing to turn an invalid current
rerun into historical proof.

## strongest counterargument

Regenerating all three projections now would be cheaper and more useful than
leaving a visible gap. That argument fails for a historical claim: the current
workspace is different, and the regenerated projections are invalid because
their evidence is stale. Publishing them as recovered would erase the exact
provenance boundary the completion gate is meant to protect.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Runs 033-035 retain source run state and linked logs | Local run directories, JSON records, transitions, and logs | None for the inspected paths | Run 052 path and link audit |
| Original attestation and CI projections are present | Run 047 reports 033-035 missing; documented paths are checked | Original projection contents unavailable | Durable copies at the original review boundary |
| Current CLI can recover the original projections | Current `eh ci` attempts produce invalid stale-evidence projections | Historical workspace snapshot and original outputs absent | A retained original projection or exact historical workspace |
| The retention gap is recorded without closing release | Decision, template, index, and roadmap wording | Human acceptance of the gap remains open | Explicit human release decision |

## minimum credible slice

Read-only audit of the retained paths plus disposable current regeneration
attempts, followed by documentation that says exactly what was and was not
recovered. Do not change the protocol or historical records.

## stop conditions

- Stop if a current output would be labelled as historical.
- Stop if recovery requires guessing, rewriting, or deleting historical files.
- Stop if the work expands into a persistence, CI, schema, provider, or release
  design without a new approved proposal.
- Stop before treating the gap as accepted release evidence.

## verdict

proceed

## rationale

The slice is falsifiable, local, and bounded. Its likely negative result is
valuable because it prevents an invalid projection from being mistaken for
recovered proof. Any actual retention implementation is a separate decision.
