# domain map: Simple Made Easy lens

## domain terms

- **simple:** structurally separated; concerns are not braided together.
- **easy:** familiar, nearby, or convenient for the current operator or agent.
- **complecting:** intertwining concerns so that a change requires reasoning
  about unrelated parts at the same time.
- **least entangled complete path:** the smallest coherent implementation that
  satisfies the outcome without dropping required safeguards.
- **decision-bearing question:** a question whose answer can change the chosen
  implementation path, scope, or boundary.
- **simplicity check:** the compact inline record of options, choice,
  entanglement avoided, safeguards, omissions, and uncertainty.

## candidate bounded contexts

- **change contract:** owns outcome, scope, minimum complete change, risks, and
  stop conditions.
- **simple-made-easy lens:** compares complete paths and identifies accidental
  entanglement.
- **domain discovery:** owns product vocabulary, rules, and ownership so a
  local simplification does not erase a domain distinction.
- **architecture decision:** owns durable structural and boundary choices.
- **decision challenge:** owns adversarial review of high-consequence claims.
- **evidence ledger:** owns verification records and remaining uncertainty.

## aggregates/entities/value objects

No runtime aggregates are introduced. The useful method objects are the
outcome, candidate paths, selected path, entanglement findings, safeguards,
omitted scope, and remaining uncertainty.

## commands

- Clarify the outcome before selecting an implementation.
- Inspect existing helpers, patterns, standard-library capabilities, native
  platform features, and installed dependencies.
- Ask only decision-bearing questions.
- Choose the least entangled complete path.
- Record the compact simplicity check in an existing EHS document.

## events

- The change contract fixes the finish line.
- The simplicity lens compares viable paths.
- The selected path is handed to architecture, boundary, and test skills when
  their triggers apply.
- Evidence and review test the result rather than the elegance of the prose.

## policies/rules

- YAGNI removes speculative need; it does not remove required behavior.
- Reuse beats new abstraction when the existing boundary is a good fit.
- Standard and native capabilities are considered before new dependencies.
- Structural simplicity is not a line-count, token, or file-count target.
- More separate parts can be simpler than fewer entangled parts.
- “KISS” is a prompt for inspection, not an acceptance criterion.
- A question loop stops when the answer no longer changes the path.
- No separate simplicity document is created by default.

## invariants

- The user outcome remains complete.
- Validation, security, error handling, accessibility, tests, rollback, and
  evidence are not traded away for a shorter implementation.
- Existing project conventions and EHS skill ownership remain authoritative.
- The package, protocol, and runtime remain unchanged.

## external systems

- The coding-agent host loads the Markdown skill and provides interaction.
- Git and repository files provide current implementation context.
- Bun runs structural, test, and type checks.
- The optional EHS protocol records verification but does not score
  structural simplicity.

## integration points

- `using-extremely-hardcore` routes the lens only when multiple paths or
  complexity risks exist.
- `change-contract` receives the outcome, omitted scope, and minimum complete
  change.
- `domain-discovery` and `architecture-decision` receive durable vocabulary
  and structural decisions when applicable.
- `evidence-ledger` records evidence and uncertainty without inventing a
  simplicity score.

## ambiguity

“Simple” can mean familiar, short, or structurally unentangled. This slice
resolves the term in favor of structural separation. “Minimum” means complete
and safe, not the fewest lines. “Socratic” means targeted questions, not an
unbounded interview or a private reasoning transcript.

## recommended next questions

- Does one inline simplicity check improve real design choices without adding
  material ceremony?
- Do agents preserve safeguards when prompted to choose the least entangled
  complete path?
- Does the lens remain distinct from `change-contract` and
  `decision-challenge` after external dogfood?
