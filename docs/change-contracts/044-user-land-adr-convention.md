# change contract: user-land ADR convention

## user intent

Make it clear whether EHS creates an ADR directory in a user's repository and
define a lazy, convention-preserving rule for storing required ADRs.

## current understanding

EHS currently requires the `architecture-decision` skill to produce an ADR or
an explicit statement that no ADR is required. Its guidance does not define
how to discover a user's existing ADR convention or what happens when none
exists. The EHS repository's own `docs/adr/` directory is easy to mistake for
an install scaffold, although installation and the current runtime do not
mutate a target repository.

## allowed scope

- Add a repository-local ADR convention to `skills/architecture-decision`.
- State that installation is side-effect free and that a missing convention
  gets a lazy `docs/adr/` fallback only with the first required ADR.
- Explain the same behavior in the root README and user guide.
- Record the public-contract decision, challenge, plan, review, and evidence.

## forbidden scope

- No installer, `init` command, runtime scaffolder, or automatic empty-folder
  creation.
- No fixed path that overrides an existing user-repository convention.
- No ADR requirement for changes that do not meet the architecture trigger
  list.
- No changes to protocol, CLI, schema, provider, persistence, CI, or
  deployment behavior.

## affected areas

- Architecture decision skill guidance.
- Root README and first-run user documentation.
- Repository governance records for this public guidance change.

## minimum complete change

Document one deterministic rule: inspect and reuse an existing ADR convention;
otherwise propose `docs/adr/` in the change contract and create it only with
the first required ADR. Make the install-time no-mutation boundary explicit.
Keep the change Markdown-only and preserve the existing trigger list and
no-ADR outcome.

## public contracts

The `architecture-decision` skill gains a host-independent storage convention
for user-repository ADRs. README and user-guide text describe the same
behavior. No runtime, CLI, JSON, API, or provider contract changes.

## assumptions

- A user's repository may already have a documented ADR or decision path.
- `docs/adr/` is a reasonable fallback for a repository with no convention.
- The agent can state the proposed path before creating the first ADR.

## risks

- A project may have a convention that is present but not easy to discover;
  the agent must inspect repository guidance before choosing the fallback.
- The fallback path may still be unsuitable for a particular project, so the
  change contract and user review remain the authority.
- Clear creation guidance could be misread as a mandate; the trigger list and
  no-empty-directory rule must remain adjacent to it.

## acceptance evidence

- A pre-change content assertion fails because the new repository convention
  heading is absent.
- Post-change assertions cover existing-convention reuse, lazy `docs/adr/`
  creation, install-time no mutation, and the no-ADR path.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check`
  pass.
- The final review confirms that no runtime or installer behavior changed.

## stop conditions

Stop if implementing the guidance requires a new command, an installer,
automatic writes to a target repository, a protocol/schema change, or a
repository-specific path that cannot be stated as a fallback.
