---
name: simple-made-easy
description: Use before choosing among multiple implementation paths or when a non-trivial change may introduce accidental complexity.
---

# simple-made-easy

## when to use

Use after the change outcome and scope are understood, and before choosing an
implementation path, when:

- two or more complete approaches are plausible;
- the change may introduce an abstraction, dependency, state or module
  boundary, or cross-context coupling;
- a familiar or convenient path may braid unrelated concerns together; or
- the user asks for the simplest, smallest, or cleanest solution.

Use it as a lens, not as a second full planning workflow. If an unresolved
choice could change the design, ask one decision-bearing question at a time.

## when not to use

Do not use for:

- a typo or genuinely trivial copy edit;
- an obvious local fix with one complete path;
- a choice already fixed by a project convention or approved architecture; or
- chasing fewer lines, files, tokens, or minutes as a quality target.

Do not use simplicity to override required behavior, validation, security,
error handling, accessibility, tests, rollback, domain correctness,
architecture, or evidence.

## required inputs

- The current change contract and its outcome.
- Relevant repository conventions, helpers, dependencies, and platform
  capabilities.
- Domain and ownership context when the choice crosses a boundary.
- Required safeguards, verification, and stop conditions.

## required output

Add a compact simplicity check to the existing change contract or
implementation plan:

```text
outcome:
options checked:
selected path:
entanglement avoided:
safeguards preserved:
omitted scope:
remaining uncertainty:
```

Do not create a separate simplicity document by default. If the decision is
durable architecture or domain policy, hand it to `architecture-decision` or
the existing domain map instead. Do not retain a grilling transcript or a
private reasoning dump.

## procedure

1. Restate the user outcome and the forbidden scope from the change contract.
2. Inspect the existing code, project conventions, helpers, standard library,
   native platform capabilities, and already-installed dependencies.
3. If an unanswered question could change the path, ask it plainly and one at
   a time. Stop asking once the path is no longer uncertain.
4. Walk this ladder before adding new structure:
   1. Remove speculative need.
   2. Reuse an existing helper, pattern, or boundary.
   3. Prefer the standard library or native platform capability.
   4. Prefer an already-installed dependency when it is a good fit.
   5. Add the minimum new structure that fully satisfies the outcome.
5. Check the candidates for accidental entanglement:
   - shared mutable state;
   - hidden temporal or control-flow coupling;
   - duplicated policy or knowledge;
   - cross-context ownership leakage;
   - unnecessary configuration or dependency coupling; and
   - provider, transport, or delivery concerns leaking into domain code.
6. Select the least entangled complete path. A larger diff or more separate
   parts may be simpler than a shorter, braided change.
7. Record the simplicity check, including safeguards preserved and speculative
   scope deliberately omitted.
8. Pass durable architecture choices to `architecture-decision`, high-
   consequence claims to `decision-challenge`, boundary concerns to
   `bounded-context-review`, and behavior concerns to
   `test-first-implementation`. This lens owns none of those gates.

## quality bar

- The selected path still satisfies the user outcome completely.
- Structural separation, not line count or familiarity, supports the choice.
- Existing project code and conventions were considered before new structure.
- Required safeguards and meaningful verification remain intact.
- Questions were limited to uncertainty that could change the design.
- The output is concise enough to help a reviewer rather than create ceremony.
- Claims about tokens, cost, speed, or skill effect have independent evidence or
  are not made.

## failure modes

- Treating “simple” as the shortest diff or fewest files.
- Repeating YAGNI or KISS as slogans without inspecting the actual boundary.
- Choosing a familiar tool that creates more intertwined runtime behavior.
- Removing validation, tests, security, accessibility, or rollback to make the
  implementation look smaller.
- Asking an exhaustive interview after the design path is already clear.
- Creating a second tracker, workflow, score, or durable document for this
  lens.
- Replacing domain discovery, architecture decisions, adversarial review,
  testing, or evidence with a claim that the result is “simple.”
