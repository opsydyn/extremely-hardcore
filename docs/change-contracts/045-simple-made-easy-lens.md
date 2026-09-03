# change contract: Simple Made Easy lens

## user intent

Add a standalone `simple-made-easy` skill that augments EHS with a low-ceremony
structural simplicity check. It should incorporate the useful parts of
Ponytail, Socratic grilling, shared documentation, and YAGNI/KISS without
turning EHS into a shortest-diff tool or another orchestration system.

## current understanding

At contract creation, EHS exposed eight installable skills. `change-contract`
already requires a minimum complete change, `domain-discovery` maps language and
ownership, `decision-challenge` provides targeted adversarial/Socratic review,
and the roadmap keeps orchestration outside the standalone method. The missing
piece is an explicit, reusable lens for choosing the least entangled complete
path before implementation.

## allowed scope

- Add `skills/simple-made-easy/SKILL.md` as one optional installable skill.
- Add its routing rule to `using-extremely-hardcore` and the repository's
  scaffold validator.
- Document the trigger, compact output, Socratic question boundary, and
  composition with existing EHS skills.
- Update the README, user guide, roadmap, and manifesto enough to make the
  distinction between structural simplicity and convenience explicit.
- Record the design, architecture decision, domain map, challenge, plan,
  review, issue, and evidence for this slice.
- Dogfood the lens once on the current multi-option skill-design change.

## forbidden scope

- No rename of the `extremely-hardcore` package, plugin, or existing skill
  paths.
- No separate tracker, daemon, scheduler, event bus, protocol schema, runtime
  command, evaluator, or provider adapter.
- No mandatory artifact for every change and no retained grilling transcript.
- No shortest-diff, token, cost, or benchmark claim.
- No removal or weakening of tests, security, validation, accessibility,
  rollback, domain, architecture, or evidence obligations.

## affected areas

- Public Markdown skill surface and routing.
- Scaffold validation and its focused test.
- README, manifesto, user guide, and roadmap.
- Repository governance and dogfood evidence.

## minimum complete change

Add one validated skill with a clear trigger, a five-line simplicity check, a
YAGNI/reuse ladder, anti-complecting questions, and a Socratic stop rule. Route
it only to multi-option or boundary-sensitive work, document how it composes
with the existing skills, and prove the scaffold and repository remain valid.
Keep the package identity and runtime untouched.

## public contracts

- `skills/simple-made-easy/SKILL.md` becomes an installable EHS skill.
- `using-extremely-hardcore` documents when the new skill is appropriate.
- README and user guide document the same invocation and output boundary.
- `scripts/validate.ts` requires the new skill to be present and structurally
  valid.
- No runtime, CLI, JSON, API, provider, or package identity contract changes.

## assumptions

- A compact inline check is enough for durable simplicity evidence; a separate
  template would add more ceremony than value in this first slice.
- Structural entanglement can be reviewed qualitatively with explicit prompts;
  line count is not a reliable proxy.
- The existing EHS skills and optional protocol remain the authorities for
  scope, architecture, tests, and evidence.

## risks

- Agents may interpret “simple” as “shortest” and omit necessary safeguards.
- The new skill may overlap with `change-contract`, `domain-discovery`, or
  `decision-challenge` if its ownership is not stated precisely.
- A Socratic prompt can become an unbounded interview if questions are not
  limited to decision-bearing uncertainty.
- The skill is a public addition, but one dogfood run cannot establish a skill
  effect or moat.

## acceptance evidence

- A focused validator test fails before the new skill is added and passes after
  the scaffold is updated.
- Content assertions find the ladder, structural definition, safeguards,
  Socratic boundary, inline output, and no-new-artifact rule.
- `bun run check`, `bun run test`, `bunx tsc --noEmit`, and `git diff --check`
  pass.
- A real EHS run records the multi-option design choice and final verification.
- Final review confirms no package rename, runtime, protocol, or orchestration
  change.

## stop conditions

Stop if the skill requires a new runtime mechanism, persistent tracker,
mandatory transcript, package rename, shortest-diff objective, or weakened
safety/evidence obligation. Stop and revise the contract if it duplicates an
existing EHS skill rather than adding a distinct simplicity lens.
