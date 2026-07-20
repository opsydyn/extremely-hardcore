# issue: dogfood the decision-challenge skill

## intent

Record and close the decision-challenge skill slice that dogfoods the accepted decision-challenge skill against the proposed live Codex action-fixture adapter. The final review fixes must make the published trigger rubric and record template semantically validated while distinguishing a hold on that adapter claim from the implementation status of the skill itself.

## accepted scope

- Create the decision challenge record for the live Codex action-fixture adapter.
- Create this issue, the implementation plan, and the evidence ledger.
- Update the Behavioural Evaluation Harness roadmap status to record the implemented decision-challenge gate and held live provider adapter.
- Add semantic validator coverage for the complete trigger rubric, required record sections, evidence-gap map, and verdict options.
- Align the skill, template, AGENTS routing, README workflow, and dogfood record with that enforced contract.
- Capture a fresh local proof-carrying completion run only after all tracked Task 3 documentation is committed.

## exclusions

- No change to the protocol, fixture runner, reference executor, or provider adapter.
- No live Codex provider execution, comparison policy, regression threshold, second provider, transcript scoring, retry policy, or benchmark claim.
- No claim of verified network isolation from adapter metadata or CLI help.

## acceptance checks

- `docs/decision-challenges/019-live-codex-action-fixture.md` has the `hold` verdict, a complete claim-to-evidence map, the no-network-attestation gap, and both valid redesign paths.
- The validator rejects an incomplete decision-challenge trigger rubric or a template missing the strongest counterargument, evidence-gap map, stop conditions, or verdict.
- The implementation plan protects existing ownership boundaries and explicitly keeps live provider execution out of scope.
- The evidence ledger names commands, passing and failing checks, contract impact, remaining risk, human review status, and recommends `merge` for this documentation slice.
- `ROADMAP.md` says the decision-challenge gate is implemented and the live provider adapter is held pending fixture self-sufficiency, without changing provider-execution, comparison-policy, or threshold status.
- The committed documentation workspace produces a valid ignored run with `decision-challenge-validated` and `documentation-complete` criteria.

## held live-adapter follow-up

Do not resume the live adapter until the fixture can make agent-owned protocol actions executable through an immutable fixture-local CLI, or until a human accepts a deliberately source-change-only adapter contract with no compliance, completion, or no-network claim.
