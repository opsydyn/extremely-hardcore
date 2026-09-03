# Decision challenge: retention policy decision

## trigger

This slice records a provenance and release-evidence policy after Run 052
confirmed that historical projections are missing. It touches a public
documentation contract but does not propose runtime persistence or CI changes.

## proposal and claims

Record the human-approved policy that:

- Runs 033 through 035 retain a documented historical limitation and are not
  backfilled or relabelled.
- Future release evidence must retain attestation and CI projections durably
  with the run and workspace fingerprint.
- The policy is not a storage implementation and does not approve release.

The evidence-backed claims are limited to Run 052's audit and the approved
human decision. No claim is made about a durable store existing today, about
provider behaviour, or about release readiness.

## existing-platform ownership

- The protocol owns run state, evidence, transitions, and fingerprints.
- `eh attest` and `eh ci` own derived projections.
- Dogfood governance owns this human-readable policy and its limitations.
- A future repository or CI retention owner is intentionally undecided.

## durable differentiated value

The policy keeps historical provenance honest while creating a clear forward
gate. It prevents a current invalid rerun from being used as a substitute for
missing historical proof without turning EHS into a storage platform.

## strongest counterargument

Accepting the historical gap may weaken confidence in the ten-run campaign, so
the project should either backfill immediately or reject the campaign. The
correct response is to preserve the gap and let the human release decision
weigh it explicitly. Backfill would create a stronger-looking but false
historical claim; rejecting the policy would leave future operators without a
clear retention requirement.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Runs 033-035 have a confirmed historical projection gap | Run 052 audit and current path/status results | Original projection contents are unavailable | Retained original projections, which cannot be recreated now |
| The historical gap is accepted as a documented limitation | User-approved Run 053 decision | This is a human release-planning decision | Human review record, not a runtime test |
| Future release evidence must be durable | Run 053 decision and template wording | No durable store or enforcement exists yet | A future implementation and release-boundary check |
| Release remains open | Roadmap, provider matrix, and decision wording | Loading, measurement, adherence, containment remain open | Separate accepted release evidence |

## minimum credible slice

Write the approved policy once, align the operator template and roadmap, and
prove the documentation and protocol record are internally consistent. Do not
implement or test the future retention mechanism in this slice.

## stop conditions

- Stop if historical outputs would be rewritten or current output would be
  labelled as recovery.
- Stop if the work requires choosing or building a persistence, repository, or
  CI owner.
- Stop if provider execution, measurement, or writable boundaries are pulled
  into the slice.
- Stop before describing the policy as release approval or enforcement.

## verdict

proceed

## rationale

The user has approved a narrow documentation decision, and the result is
falsifiable through content and protocol checks. The future retention
implementation remains explicitly outside the decision's authority.
