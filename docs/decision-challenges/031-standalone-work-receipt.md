# decision challenge: standalone EHS work receipt

## trigger

This proposal changes the public output contract of an installed skill and could accidentally create a shared orchestration or evaluation protocol.

## proposal and claims

Add a small Markdown work receipt to the existing `evidence-ledger` skill. The receipt contains `result`, `claim`, `evidence`, `remaining uncertainty`, and `next`. It should improve reviewability and composability without making EHS depend on a loop runner or evaluation product.

The proposal does not claim that Markdown is trusted provenance, that an agent can attest its own command execution, or that EHS should own retries, scheduling, budgets, or scoring.

## existing-platform ownership

- EHS owns engineering behaviour, scope, evidence language, stopping guidance, and the standalone receipt.
- The host or command runner owns captured execution facts.
- The local `eh` protocol remains an optional proof and completion consumer.
- Evaluation systems own experiments, baselines, aggregation, and comparative claims.
- Any future loop runtime owns continuation, budgets, retries, and scheduling.

## durable differentiated value

The durable value is a concise, honest engineering handoff that a person can read without reconstructing the agent session. It remains useful when no protocol, loop runtime, or evaluation harness is present.

## strongest counterargument

The existing ledger already contains the needed information. Adding a receipt may create duplicate prose, increase agent verbosity, and encourage downstream systems to parse an informal Markdown convention as if it were trusted structured data.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| EHS already has the necessary concepts. | The manifesto names claims, traceable evidence, blockers, review, and remaining uncertainty. | They are distributed across the ledger rather than summarized together. | Review the updated skill and template. |
| A compact receipt improves handoff. | Existing status and summary commands show that concise next-action output is useful. | No receipt has been dogfooded as an installed skill convention. | Dogfood the updated ledger on this repository and inspect the resulting handoff. |
| The receipt does not require orchestration. | The proposed fields are Markdown only and contain no scheduler or event semantics. | Future consumers could over-interpret it. | Explicit claim limits in the ADR, skill, and docs. |

## minimum credible slice

Update only the existing `evidence-ledger` skill and template, add boundary wording to the main documentation, and dogfood the result against this repository. Do not add runtime code, a schema, or a new command.

## stop conditions

- The receipt becomes a second full evidence ledger.
- Agents cannot distinguish declared evidence from host-captured evidence.
- A consumer requires JSON, an event bus, or protocol imports to use the receipt.
- The change starts to define retries, budgets, scheduling, or evaluation scoring.

## verdict

proceed

## rationale

The slice strengthens an existing EHS concept rather than adding a new subsystem. Its value can be reviewed directly in Markdown, its limits are explicit, and the proposed contract remains useful when EHS is installed without any external runtime.
