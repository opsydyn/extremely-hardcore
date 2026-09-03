# review: user-land ADR convention

## review findings

- The architecture skill now answers the install-time question directly:
  EHS does not scaffold or mutate a user repository.
- The work-time rule is convention-first: an agent inspects and reuses
  `docs/adr/`, `adr/`, `docs/decisions/`, or another documented project path.
- The fallback is lazy and bounded: `docs/adr/` is proposed only when an ADR
  is required and is created only with the first ADR, never as an empty setup
  directory.
- The no-ADR path remains explicit for changes outside the architecture
  trigger list.
- README and user-guide wording matches the skill contract.

## boundary review

No installer, `init` command, runtime filesystem operation, protocol, schema,
provider, persistence, CI, or deployment behavior changed. The EHS repository's
own `docs/adr/` remains package documentation and is not copied into user
repositories.

## risks

- Guidance cannot enforce that an agent discovers every project-specific
  convention.
- The `docs/adr/` fallback may still be unsuitable for a project, so the
  change contract and repository owner remain authoritative.
- No external user-repository dogfood has yet measured whether this wording
  adds acceptable ceremony.

## verdict

safe with noted risk

## follow-up

Use the next real-repository dogfood run to check convention discovery and
whether the lazy fallback is understood. Do not add scaffolding or path
enforcement unless that evidence identifies a concrete failure.
