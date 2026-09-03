# Simple Made Easy lens design

## intent

Add a small `simple-made-easy` skill to Extremely Hardcore. It gives an agent
a structural simplicity lens for choosing among multiple complete
implementation paths, while leaving EHS's existing change contract, evidence,
architecture, testing, and review skills as the authorities for their own
concerns.

The package remains `extremely-hardcore`. `simple-made-easy` is an augmenting
skill name, not a product or plugin rename.

## design

The lens runs after the change outcome and scope are understood, and before an
implementation path is selected. It is appropriate when there are multiple
plausible paths or a choice may introduce an abstraction, dependency, state
boundary, module boundary, or cross-context coupling. It is skipped for
trivial work and obvious local choices.

It walks a short ladder:

1. Remove speculative need.
2. Reuse existing code and project conventions.
3. Prefer the standard library or native platform capability.
4. Prefer an already-installed dependency when it is a good fit.
5. Add the minimum new structure that fully satisfies the outcome.

The selected path is judged by structural entanglement, not line count. The
agent checks for shared mutable state, hidden temporal coupling, duplicated
policy, cross-context knowledge, unnecessary configuration, and delivery or
provider leakage. Validation, security, error handling, accessibility, domain
correctness, and evidence remain mandatory.

The output is a compact simplicity check recorded inline in the current change
contract or implementation plan:

```text
outcome:
options checked:
selected path:
entanglement avoided:
safeguards preserved:
omitted scope:
remaining uncertainty:
```

Questions are Socratic only where an answer can change the design. Settled
terms go into the existing change contract, domain map, or ADR. The skill does
not retain a transcript, create a new tracker, or require a new document by
default.

## composition

- `change-contract` owns intent, scope, risks, minimum complete change, and
  stop conditions.
- `domain-discovery` prevents the lens from simplifying the wrong concept.
- `simple-made-easy` compares complete paths and identifies accidental
  entanglement.
- `architecture-decision` records durable structural choices.
- `decision-challenge` remains the adversarial gate for high-consequence
  claims and boundaries.
- `bounded-context-review` checks coupling after a path is selected.
- `test-first-implementation` protects behavior.
- `evidence-ledger` records what was proved and what remains uncertain.

## non-goals

- No package, plugin, or provider rename.
- No runtime, protocol, scheduler, tracker, daemon, or evaluator change.
- No shortest-diff, token, cost, or speed objective without independent
  evidence.
- No mandatory grilling session for every change.
- No deletion of validation or safety work in the name of simplicity.
