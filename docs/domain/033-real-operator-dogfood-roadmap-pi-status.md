# domain map: real operator dogfood roadmap Pi status

## domain terms

- **real operator dogfood:** a non-trivial change made in a real repository while using the EHS protocol and recording its operational experience.
- **roadmap status:** a bounded product statement derived from committed implementation and evidence records.
- **provider evidence:** retained output from one explicitly configured provider run; it is not automatically a capability or enforcement claim.
- **claim limit:** a statement of what the evidence does not establish.
- **fresh evidence:** evidence captured after the final workspace change and bound to the current workspace fingerprint.

## candidate bounded contexts

- **roadmap documentation:** owns product status and gated sequencing.
- **EHS protocol run:** owns run state, acceptance criteria, evidence, validation, and completion transition.
- **dogfood record:** owns operator friction, false-block observations, and handoff readability.
- **provider evaluation:** owns raw Pi reports and provider-specific evidence; it is read-only input to the roadmap correction.

## aggregates/entities/value objects

- Change run: `run.json`, evidence records, transitions, and derived delivery artifacts.
- Roadmap status statement: prose backed by committed evidence references and explicit limits.
- Dogfood record: one real change record with outcome and operational observations.

## commands

- Correct the stale roadmap statement.
- Capture criterion evidence through `eh evidence`.
- Validate and complete through `eh validate` and `eh transition`.
- Produce summary and attestation artifacts.

## events

- Evidence capture.
- Completion transition.
- Derived summary and attestation generation.

## policies/rules

- Roadmap claims must not exceed retained evidence.
- A completed run requires fresh passing evidence for every criterion.
- Controlled fixture results and provider reports remain separate from real operator dogfood evidence.
- Pi read-only evidence does not establish comparison, containment, sandbox, network, identity, or skill-effect claims.

## invariants

- The protocol implementation is unchanged by this run.
- The roadmap's Pi status and next gate agree with committed evidence.
- The run artifacts stay under `.extremely-hardcore/` and do not affect workspace fingerprints.
- The dogfood record distinguishes observed friction from assumptions.

## external systems

- Git working tree and Bun commands.
- Previously retained Pi report directories under `/tmp`.

## integration points

- `ROADMAP.md` links product status to the provider evidence ledger.
- `eh` captures commands against the current workspace and writes ignored run artifacts.
- Dogfood/evidence records provide the human review projection.

## ambiguity

The broader campaign still needs nine more real changes across representative change types. This run does not establish operational readiness or a provider comparison.

## recommended next questions

- Does the receipt reduce review time on a code change, or only on documentation changes?
- Which of the next nine runs should deliberately exercise stale evidence and a real blocker?
- What friction threshold should cause the protocol to be simplified before release?
