# issue: user-land ADR convention

## intent

Clarify whether EHS creates an ADR directory in a user's repository and define
the smallest useful behavior for a first architecture decision.

## scope

- Document that installation does not mutate a user repository.
- Reuse an existing ADR convention when one is present.
- Propose and lazily create `docs/adr/` only with the first required ADR when
  no convention exists.
- Preserve an explicit no-ADR path for changes outside the trigger list.

## completion criteria

- The architecture skill contains the convention-first and lazy-creation rule.
- README and user guide answer the install-time question directly.
- Governance records state the public-contract and boundary decision.
- Repository checks and focused content assertions pass.

## non-goals

- No installer, `init` command, runtime scaffolder, or empty-folder creation.
- No forced directory path or changes to protocol, CLI, schema, provider, or
  persistence behavior.
