# Decision challenge: current provider loading and measurement

## trigger

This slice runs external provider CLIs and updates public provider-status and
measurement claims. It must distinguish loading from adherence and command wall
time from human operator time, without turning the check into a benchmark or
provider comparison.

## proposal and claims

Run the current documented read-only Codex and Claude loading smokes, classify
their results from exact markers or bounded environment errors, and repeat a
fixed `eh status`/`eh summary` path three times for descriptive command-wall-time
measurements. Update the onboarding guide, dogfood decision, and roadmap.

The proposal claims only current host observations and a small timing sample.
It does not claim provider quality, adherence, productivity, equivalence,
comparison, containment, or release readiness.

## existing-platform ownership

- Codex and Claude own authentication, model traffic, sessions, and provider
  output.
- EHS owns the standalone skill, local protocol, onboarding instructions, and
  claim boundaries.
- The measurement record owns only the observed local command durations.

## durable differentiated value

The durable value is evidence discipline at the provider boundary: discovery,
loading, adherence, and timing are named as separate claims. This prevents a
successful process start or fast command from becoming an unsupported product
claim.

## strongest counterargument

Loading smokes and three timing repetitions add little product evidence and can
create false confidence. That is valid, so the slice keeps the measurement
descriptive, reports active operator time as unmeasured, and stops before
comparison or adherence. The checks are still useful because they can clear or
reconfirm a concrete onboarding blocker on the current host.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required treatment |
| --- | --- | --- | --- |
| Current Codex and Claude versions are known | Host version commands | Version does not prove loading | Record version separately |
| EHS is discoverable/loading on a host | Plugin/metadata checks and exact smoke marker | Auth or environment may block the marker | Classify pass or blocked without inference |
| EHS reduces operator burden | Three command wall-time repetitions | Active time, productivity, and baseline absent | Report descriptive timing only |
| EHS has provider-neutral behaviour | Separate host commands and claim limits | No adherence or comparison run | Keep comparison and adherence gated |

## minimum credible slice

Perform the two current read-only loading checks, the three-repetition fixed
command timing probe, and a documentation-only reconciliation with fresh local
evidence. Do not add a measurement library or provider adapter.

## stop conditions

- Stop if credentials or raw provider output would be exposed or retained.
- Stop if an auth block is presented as a skill failure or a marker is inferred
  from process success.
- Stop if command wall time is described as active operator time.
- Stop before provider comparison, adherence, writable execution, containment,
  or release claims.

## verdict

proceed

## rationale

The user approved this bounded next slice. It is falsifiable, local in its
measurement, and preserves the current evidence boundary even if both model
smokes remain blocked.
