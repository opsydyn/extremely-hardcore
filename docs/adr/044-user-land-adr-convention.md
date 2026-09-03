# adr: user-land ADR convention

## status

accepted

## context

EHS's own repository contains `docs/adr/`, while a user installs EHS as a
skill or local plugin. The existing architecture-decision skill requires an
ADR when its trigger list applies, but it does not explain whether installation
creates an ADR directory in the user's repository or how to choose a path when
the user already has a decision convention.

## decision

Keep EHS installation and runtime side-effect free with respect to the user's
repository. When an architecture decision is required, the agent must first
inspect and reuse an existing repository convention such as `docs/adr/`,
`adr/`, or `docs/decisions/`. If no convention exists, the change contract
should propose `docs/adr/`, and the directory may be created only together with
the first required ADR as part of that change.

No empty ADR directory is created. Changes outside the architecture trigger
list produce an explicit no-ADR decision instead. EHS's own `docs/adr/` is not
a directory copied into user repositories.

## consequences

- New users have a clear answer without receiving an empty project directory.
- Existing project conventions remain authoritative.
- A first ADR in a repository without a convention has a predictable fallback
  path.
- Agents must inspect repository guidance before choosing the fallback.
- EHS does not gain an installer, `init` command, runtime filesystem behavior,
  or path-enforcement mechanism.

## options considered

- Always create `docs/adr/` during installation: rejected because installation
  should not mutate user repositories and an ADR may never be needed.
- Never suggest a fallback path: rejected because a first architecture
  decision would still need a predictable, reviewable location.
- Always force `docs/adr/` even when another convention exists: rejected
  because it overrides project-local documentation policy.
- Reuse an existing convention and lazily fall back to `docs/adr/`: accepted
  because it balances repository ownership with newcomer clarity.

## trade-offs

The fallback is a convention, not an enforced filesystem contract, so agents
or projects can still choose a different path after review. The guidance adds a
small inspection step, but avoids both empty setup files and hidden directory
creation. Adoption quality remains a behavioral question rather than something
the EHS runtime can prove.

## follow-up work

Use future real-repository dogfood to check whether agents discover existing
decision conventions and whether the fallback causes unwanted ceremony. Do not
add scaffolding or path enforcement without separate evidence.

## review date

2026-09-03
