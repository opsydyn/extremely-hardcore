# decision challenge: fixture-local protocol CLI

## trigger

The proposal changes the provenance boundary for the action fixture and is a prerequisite to later external writable-agent execution and benchmark claims.

## proposal and claims

Add immutable local fixture commands that create standard evidence and guarded completion records, plus a retained ledger linking each command to its stage and resulting protocol artifact. The claim is limited to executable fixture-owned protocol actions and structural provenance capture; it does not claim that a ledger proves agent identity or provider compliance.

## existing-platform ownership

The generic protocol owns V1 evidence, fingerprint, validation, and completion semantics. The fixture runner owns workspace setup, stage order, immutability checks, scoring, and retained reports. The fixture owns the task oracle and will own its fixed command interface. A future provider adapter owns process execution and raw provider-side artifacts.

## durable differentiated value

The repository can evaluate whether a future provider process used the fixture's prescribed evidence and completion path, rather than letting the host executor supply those actions. The retained ledger is an independently scored link target for later provider-side provenance; it is not an identity attestation by itself.

## strongest counterargument

A writable executor can still forge files inside its workspace. A local CLI and ledger therefore cannot independently establish that an agent invoked the commands. Building it would be wasteful if later adapter design cannot retain and correlate provider-side process artifacts.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The fixture can define a bounded task. | `FIXTURE.md` and the existing copied workspace. | No local protocol action surface. | Immutable local commands documented in `FIXTURE.md`. |
| The fixture can create V1 evidence and completion state. | Host reference executor calls generic protocol APIs. | The copied workspace cannot perform those actions itself. | A local command script creates the standard artifacts in the copied workspace. |
| The runner can verify command-to-artifact links. | Runner validates evidence and transitions after executor return. | No invocation record ties artifacts to prescribed fixture commands. | Ledger entries linked to stage, fingerprint, evidence ID, and transition ID. |
| A future adapter can demonstrate agent-owned behaviour. | Held adapter decision identifies the required direction. | Provider-side process provenance is not implemented. | A later adapter retains raw execution artifacts and correlates them to the validated ledger. |

## minimum credible slice

Add the fixture-local commands, invocation ledger, runner validation, and deterministic reference proof. Keep provider execution out of scope and state the absence of identity proof explicitly.

## stop conditions

- Stop if the CLI needs a generic protocol contract change.
- Stop if the runner treats local ledger content as proof of an external agent or no-network execution.
- Stop if a provider adapter or transcript parser becomes necessary to make the local reference proof pass.

## verdict

proceed

## rationale

This is the smallest redesign that resolves the copied fixture's missing command surface without overstating what local artifacts prove. It preserves the generic protocol as authority and leaves the live provider boundary for a separately challenged slice.
