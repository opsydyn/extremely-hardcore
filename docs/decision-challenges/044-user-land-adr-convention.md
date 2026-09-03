# decision challenge: user-land ADR convention

## trigger

This proposal changes the public `architecture-decision` skill contract and
describes a potential repository-write boundary. It must distinguish EHS
installation behavior from an agent creating an ADR during an approved change.

## proposal and claims

Add documentation that:

- EHS installation never creates or mutates a user repository.
- An agent first discovers and reuses an existing ADR convention.
- If an ADR is required and no convention exists, the change contract proposes
  `docs/adr/`, and the first ADR creates that directory as part of the change.
- No empty ADR directory is created, and no ADR is required when the trigger
  list does not apply.

The proposal changes Markdown guidance only. It does not add a scaffolder,
installer command, runtime write, or new protocol state.

## existing-platform ownership

The user's repository owns its documentation layout and approval policy. The
host owns plugin installation and any host configuration. EHS owns the
architecture trigger list, the convention-first guidance, and the evidence
boundary around the decision.

## durable differentiated value

The durable value is a small, provider-neutral engineering method that keeps
architecture decisions explicit without imposing a package-specific directory
or setup ceremony on every repository.

## strongest counterargument

Even a lazy fallback could encourage agents to add `docs/adr/` where a project
would prefer no ADR system at all. The guidance must therefore require a real
architecture trigger, repository inspection, and a proposed path in the change
contract before the first directory is created.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Installation does not create user ADR files | Current package exposes manifests and Markdown skills only; no installer or `init` command exists | A future host could add its own setup behavior | Keep this as an EHS contract and do not add a scaffolder |
| Existing ADR conventions are reused | Current skill has a trigger list but no path-selection guidance | No cross-repository sample proves every convention is discoverable | Add explicit inspection examples and preserve project-local authority |
| `docs/adr/` is created only with the first required ADR | This is a proposed documentation rule | No runtime enforcement is intended | Content assertions and review confirm the wording; dogfood can assess adoption later |
| Non-architecture changes do not get an ADR | Current skill has a `when not to use` section | The no-ADR outcome is not tied to storage guidance | Keep the trigger list and explicit no-ADR statement together |

## minimum credible slice

Update the architecture skill, README, and user guide with the convention-first
and lazy-creation rule, then run content assertions and repository checks. Do
not add code, a command, or a directory-management utility.

## stop conditions

- The wording implies automatic setup during installation.
- The fallback overrides an existing repository convention.
- The change requires runtime, installer, protocol, or provider code.
- The architecture trigger list becomes broader or less precise.

## verdict

proceed

## rationale

The proposal resolves a concrete newcomer ambiguity with a small, reversible
public-guidance change. It keeps repository ownership with the user and makes
the only proposed write occur as part of a real, reviewable ADR change. The
package remains standalone and does not acquire scaffolding machinery.
