# change contract: standalone EHS work receipt

## user intent

Keep Extremely Hardcore standalone as an engineering method while making its existing evidence ledger easier for a human, a future controller, or an evaluator to consume.

## current understanding

The installed EHS surface is the Markdown under `skills/`. The existing `evidence-ledger` skill already requires commands, results, risks, uncertainty, review, and a final recommendation, but it does not define a compact receipt at the top. The local `eh` protocol and experimental evaluation/provider code are separate repository surfaces and are not required by installed skills.

## allowed scope

- Add a five-field work receipt to the existing `evidence-ledger` skill and template.
- Clarify that evidence may be agent-declared or host-captured and must not be represented as stronger than its provenance.
- Add concise standalone-boundary wording to the manifesto, README, roadmap, and new-user guide where it prevents future coupling.
- Record the decision, review, and final evidence for this slice.

## forbidden scope

- Add an event bus, scheduler, retry loop, budget, lease, daemon, workflow runtime, or new service.
- Add a TypeScript receipt library, JSON schema, package dependency, or new CLI command.
- Import protocol, Loopcraft, Skill Issue, or provider code into the installed skill contract.
- Change `protocol/`, `evaluation/`, provider adapters, package scripts, or schema version 1 behaviour.
- Require the receipt for trivial edits.

## affected areas

- `skills/evidence-ledger/` public skill guidance and template.
- High-level EHS documentation and user onboarding.
- Architecture governance records for the public skill contract.

## public contracts

The non-trivial-work evidence ledger gains a compact Markdown receipt with `result`, `claim`, `evidence`, `remaining uncertainty`, and `next`. This is a human-readable convention, not a machine protocol or runtime event contract.

## assumptions

- The existing detailed evidence ledger remains useful and should not be replaced by the receipt.
- A receipt is valuable only if it is shorter than the evidence it summarizes.
- Host-captured command evidence and agent-declared evidence must remain visibly distinct.

## risks

- The receipt could duplicate the ledger and increase ceremony.
- Agents could claim captured evidence when only a prose assertion exists.
- Future consumers could incorrectly treat Markdown as a trusted event stream.

## acceptance evidence

- The skill and template define exactly the five receipt fields and their intended use.
- Documentation states that the receipt is standalone Markdown and does not introduce orchestration or evaluation coupling.
- Trivial-edit guidance remains unchanged.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check` pass.
- A dogfood run captures the documentation checks and reaches a valid completion transition.

## stop conditions

Stop if implementation requires a runtime schema, a new command, automatic retries, provider execution, or a receipt longer than the detailed ledger it summarizes.
