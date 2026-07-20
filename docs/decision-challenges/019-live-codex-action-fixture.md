# decision challenge: live Codex action-fixture adapter

## trigger

The proposal introduces external writable-agent execution and would otherwise claim that a live Codex process demonstrates Extremely Hardcore protocol compliance. It therefore crosses the decision-challenge triggers for an execution, sandbox/isolation, provenance, and product-differentiation or benchmark claim.

## proposal and claims

Add a live Codex adapter that runs in the copied bounded bug-fix fixture, repairs the permitted source file, records required evidence, survives the stale-state intervention, and completes the fixture run. The intended claim is that the adapter measures live-agent compliance with the Extremely Hardcore protocol rather than only a correct source change.

## existing-platform ownership

The fixture package owns the task oracle only: `FIXTURE.md` defines the bounded defect, allowed source boundary, and required command in `evaluation/fixtures/bounded-bug-fix/`. It does not provide a fixture-local protocol instruction or interface. The action fixture runner owns staging, copied-workspace setup, stale-marker intervention, and fixture-specific scoring. The reference executor currently creates protocol evidence and the completion transition through the host-owned runner boundary. The protocol CLI owns evidence capture, freshness validation, and guarded completion. Codex owns its process, workspace-write sandbox selection, and any model-generated shell actions.

## durable differentiated value

The durable differentiated value is not a provider process repairing a known source file. It is independent evidence that the process obeyed the repository's bounded task, freshness, provenance, and guarded-completion controls. The current fixture can score the bounded source change, but it cannot yet make the provider own the protocol actions required for that stronger value claim.

## strongest counterargument

A workspace-confined writable Codex process could repair `src/release-label.ts` and run the fixture test. That would demonstrate a bounded source change, but not the stronger claim that the agent independently obeyed the protocol. If the adapter or host executor creates evidence or completes the run for it, the measured action belongs to the harness rather than the provider process.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The fixture has one bounded source-change contract. | `evaluation/fixtures/bounded-bug-fix/package.json` and `evaluation/fixtures/bounded-bug-fix/src/release-label.ts` define the package and defect. | A provider repair alone does not prove protocol compliance. | A fixture-local execution path that records agent-owned protocol actions. |
| The executor receives the intended task and restriction. | `evaluation/fixtures/bounded-bug-fix/FIXTURE.md` is the task oracle for the allowed source file and required test. | The fixture has no fixture-local protocol instruction or interface for the provider to create evidence or request guarded completion. | An immutable fixture-local protocol CLI with documented agent-owned actions, or a narrowed source-change-only adapter contract. |
| The reference run reaches valid completion. | `evaluation/reference-bounded-bug-fix-executor.ts` and `evaluation/run-bounded-bug-fix-fixture.ts` produce the deterministic local proof. | The host reference executor supplies evidence and completion actions, so it cannot prove a provider owns them. | A run where the provider process invokes the fixture-local evidence and completion interfaces. |
| The runner scores staged action behaviour independently of a provider. | `evaluation/run-bounded-bug-fix-fixture.ts` and `tests/evaluation/action-fixture.test.ts` verify the local oracle. | The runner cannot infer that a host-created record was an agent-owned action. | Preserved provider-side command provenance tied to fixture-local protocol actions. |
| The protocol boundary and staged adapter boundary are intentional. | ADR 0012 defines the provider-neutral fixture and narrow staged-executor boundary; ADR 0013 identifies the ownership mismatch. | No live adapter architecture resolves that mismatch. | One of the redesign paths below, reviewed before implementation. |
| `codex exec` can provide a writable confined process. | Local `codex exec --help` documents `--sandbox workspace-write`. | Workspace confinement is not evidence that the process created protocol records, and it does not attest to no-network execution. | Fixture-local protocol ownership plus an explicit, independently observable network policy if no-network is claimed. |
| Codex can apply a network-disabling sandbox state. | Local `codex sandbox --help` documents `--sandbox-state-disable-network`. | The adapter metadata and help text do not prove that a live provider run used or enforced that state. | A direct no-network attestation or removal of any no-network claim. |

## minimum credible slice

Either redesign the fixture to include an immutable fixture-local protocol CLI that the provider process must invoke for evidence and guarded completion, with retained command provenance; or deliberately narrow the adapter to a source-change-only demonstration that makes no Extremely Hardcore compliance, completion, or no-network claim.

## stop conditions

- Stop live-adapter implementation while the host reference executor can create evidence or completion records attributed to the provider run.
- Stop any compliance claim without fixture-local proof that the provider created the required evidence and completion records.
- Stop any no-network claim without direct attestation of the applied sandbox state and observed enforcement.
- Stop and return for human review if the redesign requires a protocol-schema, public CLI, or provider-execution contract change not covered by ADR 0012 or ADR 0013.

## verdict

hold

## rationale

The copied fixture workspace cannot create the protocol evidence and completion records currently created by the host reference executor. `FIXTURE.md` is a task oracle only; the fixture has no local protocol instruction or interface for those actions. A workspace-confined writable Codex process can repair the known source file but cannot demonstrate Extremely Hardcore compliance without either a fixture-local immutable protocol CLI or a deliberately narrowed source-change-only claim. An adapter must not supply those agent-owned actions.
