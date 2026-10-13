# Standalone Consistency Pass

Date: 2026-10-13. The user approved the holistic review's bounded consistency
pass: align manifesto/leaf guidance, correct Pi onboarding and describe optional
inline/subagent execution. No runtime, packaging or model trials are authorised.

- result: complete
- claim: The approved standalone instruction/onboarding consistency pass is implemented without new execution machinery or permission expansion.
- evidence: Native Pi loader check changes from one discovered skill to the exact nine for all three quick-start paths, with zero diagnostics. Source validation, typecheck, 201 tests/792 assertions, metadata/template checks, 185 local links and whitespace checks pass.
- remaining uncertainty: Model adherence, execution-mode choice, context/cost effects, full CLI startup and installed-release qualification were not tested. Historical observations and review 114's source pin predate these instruction edits.
- next: needs review; review and commit the bounded diff before selecting separately approved artifact/qualification work. No packaging, model trial, push or publication follows automatically.

## Scope And Architecture

Change the manifesto, entrypoint, domain-discovery and bounded-context-review
instructions, current Pi examples in README/user/provider guides, and the
roadmap/evaluation index. Preserve existing edits and historical observations,
including review 114's source selection. Do not change skill metadata, templates,
agents, manifests/versions, dependencies, protocol, adapters, tests or scores.

No new ADR is required: this clarifies the accepted
[standalone method boundary](../adr/0023-standalone-work-receipt.md), using existing
native host facilities without adding an execution route, authority, runtime or
persistence contract. Required consequential records and approval gates remain.

## Decision Challenge

### Trigger

Delegation guidance could be mistaken for new writable-agent authority or a
promise of cheaper/better execution; assess those claims before editing.

### Proposal And Claims

Clarify proportional records and optional host-native execution choices in
existing instructions. Correct the Pi path so all nine skills are discoverable.
Do not claim model adherence, cost reduction, isolation or host qualification.

### Existing-platform Ownership

Hosts own tools, delegation, permissions, context delivery and model execution.
EHS owns engineering guidance, not execution machinery.

### Durable Differentiated Value

Explicit scope and meaningful verification without compulsory ceremony or a
runtime. No comparative or moat claim is made.

### Strongest Counterargument

Extra delegation prose could add context cost or override an existing host
workflow. Preserve that workflow and user choice; default ordinary work inline
and do not require a mode picker, model override or per-task reviewer pipeline.

### Claim-to-evidence Map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Current Pi quick-start discovers the nine skills | Native loader returns only the entrypoint for each of three quick-starts | File path does not register siblings | Correct directory arguments; same loader returns the exact nine names without diagnostics |
| The pass preserves execution boundaries | Approved text-only scope; accepted ADR 0023 | Wording could imply new authority | Explicit availability/authorisation and no-extra-permission limits; unchanged runtime/manifests |
| New guidance improves adherence or cost | No such evidence | No behavioural/cost trial authorised | Make no claim; any trial requires separate approval |

### Minimum Credible Slice

Replace the fixed-state mandate with inspectable progress, make ordinary leaf
findings conversational, add brief optional execution guidance to the entrypoint
and correct current Pi loading paths. Reuse existing templates and gates.

### Stop Conditions

Stop before new machinery, extra permissions, changed consequential gates,
configuration mutation, provider/model calls, packaging, commit or publication.

### Verdict

**proceed**

### Rationale

The user approved this bounded correction. Native loader verification can test
Pi discovery without a CLI session, model, default-resource scan or credential
access. Static instruction review and existing local checks fit the prose scope;
do not manufacture wording-only unit tests or call them behavioural evidence.

## Verification

Before edits, the three quick-start paths each yield only
`using-extremely-hardcore`, with no diagnostics, instead of the expected nine.
The direct loader check exits 1 for that intended discovery failure.
The same check after edits exits 0: each directory path discovers exactly the
nine canonical EHS names and has zero diagnostics. This is a native discovery
regression check, not evidence that an agent read or followed the revised skills.

The probe extracts the actual `--skill` path from README, user guide and provider
guide without executing their CLI commands. It imports installed Pi 1.1.0's
`dist/core/skills.js`, pinned to SHA-256
`0e20ec500ed9783d5b01b5399e6600134fc3fdd10e6dc46c9113bc01565c9aa5`,
and calls `loadSkills` with the explicit path, repository cwd, an unused explicit
agent-directory path and `includeDefaults: false`. No default-resource discovery,
full CLI, agent session, model, extension loader or auth command is invoked.
No host configuration is changed. Do not transfer this narrow proof to a full
startup/resource inventory, enforcement or installed-artifact claim.

Fresh `bun run validate`, `bun ./node_modules/typescript/bin/tsc --noEmit` and
`bun run test` exit 0. The suite passes 201 tests, zero failures and 792 assertions.
All nine skill metadata blocks and seven templates match HEAD. The 38 Bash
examples match HEAD except the four authorised Pi file-to-directory argument
substitutions. All 185 local link destinations across the reviewed documents and
skills exist; whitespace checks pass. No new test code or permanent checker was
added for wording. Existing local tests are tooling/structure evidence, not a
behavioural baseline or proof of adherence.

Parent self-review checks conversational defaults, durable/consequential gates,
preserved host/user execution choice, delegation availability/authorisation,
no extra permissions, one owner for overlapping writes and parent verification.
It is not independent-agent review. Provider documentation explicitly labels
earlier observations as evidence for their retained pre-edit snapshots. Historical
scores, smokes, source pins and failed observations remain unchanged.

Changes remain uncommitted. The earlier artifact-review/index edits are preserved;
review 114 remains byte-unchanged during this pass. No runtime, agent, template,
manifest/version, dependency, protocol, adapter or test file changed. No provider
or model trial, package build/install, commit, push or publication occurred.
