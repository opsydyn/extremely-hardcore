bosh. paste this into codex as the project handoff.

# codex handoff: create `extremely-hardcore`
## mission
create a new repo called `extremely-hardcore`.
this is an architecture-first skill system for coding agents. it is inspired by `superpowers`, but it must not be a clone. the goal is to create a stricter, more engineering-heavy system built around:
- change contracts
- ddd discovery
- architecture decision gates
- bounded-context review
- test-first implementation
- evidence-ledger output
- small, safe, reviewable changes
the tone should be dry, serious, slightly funny, and not cringe. avoid hype. avoid “ai magic” language.
## product idea
most coding agents are fast junior developers with root access and no sense of architecture.
`extremely-hardcore` gives them adult supervision.
it should help codex, claude, and similar agents behave like careful staff engineers: understand the domain, limit scope, make architecture explicit, test behaviour, and leave evidence.
## non-goals
do not create 40 skills.
do not build a framework.
do not add runtime code unless needed.
do not over-engineer.
do not use heavy dependencies.
do not create a vague prompt pack.
this v0 should be mostly markdown, templates, examples, and a small validation script.
## repo structure
create this structure:
```txt
extremely-hardcore/
  README.md
  AGENTS.md
  package.json
  tsconfig.json
  .gitignore
  skills/
    using-extremely-hardcore/
      SKILL.md
    change-contract/
      SKILL.md
      templates/
        change-contract.md
    architecture-decision/
      SKILL.md
      templates/
        adr.md
    domain-discovery/
      SKILL.md
      templates/
        domain-map.md
    bounded-context-review/
      SKILL.md
      templates/
        bounded-context-review.md
    test-first-implementation/
      SKILL.md
      templates/
        implementation-plan.md
    evidence-ledger/
      SKILL.md
      templates/
        evidence-ledger.md
  agents/
    scout.md
    architect.md
    implementer.md
    test-critic.md
    architecture-critic.md
    delivery-critic.md
    pr-scribe.md
  policies/
    scope-policy.md
    command-policy.md
    dependency-policy.md
    architecture-policy.md
  examples/
    saved-search-ddd-change/
      README.md
      change-contract.md
      domain-map.md
      adr.md
      implementation-plan.md
      evidence-ledger.md
  scripts/
    validate.ts

package setup

use pnpm.

create a minimal package.json:

{
  "name": "extremely-hardcore",
  "version": "0.0.1",
  "private": true,
  "description": "architecture-first skills for coding agents",
  "type": "module",
  "scripts": {
    "validate": "tsx scripts/validate.ts",
    "check": "pnpm validate"
  },
  "devDependencies": {
    "@types/node": "latest",
    "tsx": "latest",
    "typescript": "latest"
  }
}

README requirements

write a strong README with these sections:

1. what is extremely-hardcore?
2. why this exists
3. core loop
4. included skills
5. agent roles
6. policies
7. example workflow
8. installing for codex
9. installing for claude
10. project status

the core loop should be:

1. create change contract
2. discover domain and architecture impact
3. decide whether an adr is needed
4. plan the smallest safe change
5. implement test-first
6. review boundaries and delivery risk
7. produce evidence ledger

include this positioning line:

architecture before acceleration.
evidence before confidence.
scope before action.
small changes before big dreams.

AGENTS.md

create an AGENTS.md that instructs coding agents to use the skills.

it must say:

* always start non-trivial work with change-contract
* always check whether architecture-decision applies
* use domain-discovery when domain language, persistence, api shape, or cross-context logic is involved
* use bounded-context-review before changing imports, module boundaries, shared packages, database shape, or integration flows
* use test-first-implementation before writing code
* always finish with evidence-ledger
* never expand scope without stating why
* never silently change public api, auth, persistence, ci, deployment, or observability behaviour
* prefer small diffs
* prefer explicit trade-offs
* prefer boring code

skill style

each SKILL.md should include:

* when to use this skill
* when not to use this skill
* required inputs
* required output
* procedure
* quality bar
* failure modes

skills should be imperative and clear.

avoid vague advice like “think carefully”.

instead write operational rules like:

identify changed public contracts.
list affected bounded contexts.
state whether an adr is required.
record evidence.

skill: using-extremely-hardcore

purpose:

explain the full system and how other skills compose.

must include:

for trivial edits, do not run the full loop.
for non-trivial edits, use the full loop.
for risky edits, add architecture and delivery critics.

define trivial edits as:

* typo
* local copy change
* one-line test fix
* local style change with no behaviour impact

define non-trivial edits as:

* feature
* bug fix with uncertain cause
* refactor
* api change
* state management change
* persistence change
* package change
* deployment or ci change

skill: change-contract

create a template with:

# change contract
## user intent
## current understanding
## allowed scope
## forbidden scope
## affected areas
## public contracts
## assumptions
## risks
## acceptance evidence
## stop conditions

the skill must force the agent to define scope before editing.

skill: architecture-decision

create an adr template:

# adr: <title>
## status
proposed | accepted | superseded
## context
## decision
## consequences
## options considered
## trade-offs
## follow-up work
## review date

the skill must say an adr is required when changing:

* runtime
* framework
* database schema
* persistence model
* public api
* auth
* deployment
* ci
* observability
* cross-context flow
* shared package contract
* external dependency
* domain model invariant

skill: domain-discovery

create a domain-map template:

# domain map
## domain terms
## candidate bounded contexts
## aggregates/entities/value objects
## commands
## events
## policies/rules
## invariants
## external systems
## integration points
## ambiguity
## recommended next questions

the skill should be ddd-first but pragmatic. avoid over-modelling.

skill: bounded-context-review

create a review template:

# bounded-context review
## proposed change
## affected contexts
## allowed dependencies
## suspicious dependencies
## data ownership
## transaction boundaries
## integration events
## anti-corruption needs
## verdict

verdict must be one of:

safe
safe with noted risk
needs redesign
needs human decision

skill: test-first-implementation

create an implementation plan template:

# implementation plan
## behaviour to protect
## first failing test
## smallest implementation
## refactor step
## checks to run
## rollback plan
## notes

the skill must instruct the agent to write or update tests before implementation where practical.

skill: evidence-ledger

create evidence template:

# evidence ledger
## summary
## changed files
## commands run
## passing checks
## failing checks
## architecture impact
## public contract impact
## risks left open
## human review needed
## final recommendation

final recommendation must be one of:

merge
hold
needs review
needs follow-up

agent role files

create short markdown files for each role.

scout

reads the repo, finds relevant files, explains current shape. does not edit code.

architect

proposes design, boundaries, trade-offs, adr need. does not edit code unless asked.

implementer

makes the smallest safe code change based on an approved plan.

test-critic

finds missing tests, edge cases, weak assertions, and false confidence.

architecture-critic

checks coupling, bounded contexts, public contracts, dependency direction, and domain leakage.

delivery-critic

checks ci, deployment, observability, rollback, and operational risk.

pr-scribe

writes final pr summary, test evidence, risks, and reviewer notes.

policies

create concise policy docs.

scope-policy.md

rules:

* do not expand task scope silently
* do not refactor unrelated code
* do not fix drive-by issues unless they block the task
* note discovered issues separately
* ask for human decision if the task requires product or architecture judgement

command-policy.md

rules:

* prefer read-only commands first
* before destructive commands, explain intent
* never delete files unless required by the change contract
* never reset, clean, rebase, or force-push unless explicitly asked
* record all meaningful commands in evidence ledger

dependency-policy.md

rules:

* do not add dependencies by default
* prefer platform and standard library
* justify each dependency
* check package health before recommending
* dependency changes usually need architecture-decision

architecture-policy.md

rules:

* domain code must not depend on delivery mechanisms
* external systems should sit behind ports/adapters
* public contracts must be explicit
* data ownership must be clear
* observability is part of the design
* dangerous shortcuts must be named

example

create a realistic example under:

examples/saved-search-ddd-change/

scenario:

web and mobile have different saved-search shapes. product wants shareable saved searches. the system needs a canonical saved-search format.

write example files showing:

* change contract
* domain map
* adr
* implementation plan
* evidence ledger

keep it realistic and specific.

use terms like:

* saved search
* vehicle search
* filter
* make
* model
* fuel type
* price range
* canonical format
* web
* mobile
* api
* persistence

validation script

create scripts/validate.ts.

it should:

* check all required files exist
* check each SKILL.md has required headings:
    * #
    * ## when to use
    * ## when not to use
    * ## required inputs
    * ## required output
    * ## procedure
    * ## quality bar
    * ## failure modes
* check templates exist
* print a clear pass/fail result
* exit non-zero on failure

keep script simple and dependency-light.

tone rules

use uk english.

write like a serious engineering tool.

allowed tone:

dry
plain
direct
slightly funny
architecturally sharp

avoid:

bro language
hype
ai magic
corporate fluff
long manifestos
fake certainty

quality bar

before finishing, run:

pnpm install
pnpm check

then provide:

* files created
* validation result
* any assumptions
* next suggested improvements

final expected result

a complete v0 repo scaffold that can be committed immediately.

do not stop at a plan.

create the files.

i’d also add this as the first issue once codex creates it:
```md
# issue: dogfood extremely-hardcore against itself
run the `extremely-hardcore` loop on this repo and identify where the skills are vague, duplicated, too weak, or too annoying.
acceptance:
- produce a change contract
- produce an evidence ledger
- open at least 5 improvement issues
- identify which skill failed hardest

