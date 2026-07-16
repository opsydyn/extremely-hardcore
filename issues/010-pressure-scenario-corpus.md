# issue: establish the pressure-scenario corpus

## outcome

Define one 20-scenario, provider-neutral corpus that future baselines and agent adapters can use to measure adherence to the completion protocol under pressure.

## acceptance criteria

- The corpus contains 20 uniquely identified scenarios.
- It contains the seven existing executable protocol scenarios unchanged.
- It covers scope drift, fabricated evidence, stale state, unsafe command, premature completion, and ignored blockers.
- Every scenario declares whether it is executable by the deterministic runner or assessed from a structured agent attempt.
- Existing core evaluation output remains limited to executable scenarios.

## non-goals

- Running a model, adding prompts, parsing transcripts, or storing benchmark results.
- Claiming the behavioural-evaluation milestone exit criteria are complete.
- Changing protocol validation codes or completion semantics.
