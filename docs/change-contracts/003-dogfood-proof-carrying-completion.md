# change contract: dogfood the proof-carrying completion gate

## intent

Operate the completion gate on five non-trivial changes and use the results to decide whether to build the behavioural evaluation harness, revise the gate, or stop.

## current understanding

The repository has one completed protocol run for the completion-gate implementation. Its evidence is bound to a Git workspace fingerprint and its completion transition is recorded in JSONL. The roadmap explicitly blocks Milestone 2 until five dogfood runs exist.

## allowed scope

- Record dogfood runs and their observed gate behaviour.
- Define a consistent run report and aggregate decision record.
- Update the dogfood issue as runs are completed or abandoned.
- Make product changes only when a recorded run provides concrete evidence for them.

## forbidden scope

- Changing the protocol schema, CLI, lifecycle, risk gates, CI, or hosted architecture as part of the campaign setup.
- Counting synthetic examples as real dogfood runs.
- Claiming the product moat or starting the evaluation harness before five runs are recorded.

## affected areas

- `docs/dogfood/`: campaign records and aggregate findings.
- `issues/003-dogfood-proof-carrying-completion.md`: campaign status.

## public contract impact

None. This slice changes internal operating records only.

## assumptions and risks

- Future non-trivial repository work will provide representative runs.
- One self-hosted feature run is useful but insufficient to establish product value.
- Runs may be abandoned; an honest abandonment record is more valuable than forcing completion.

## acceptance evidence

- Run 1 can be reconstructed from its run definition, evidence records, logs, and transition event.
- The campaign record specifies the remaining four required change types and decision thresholds.
- Repository validation remains green.

## stop conditions

- A proposed campaign task requires changing protocol semantics before a relevant failure is recorded.
- A candidate run is trivial or synthetic and cannot represent one of the required categories.
