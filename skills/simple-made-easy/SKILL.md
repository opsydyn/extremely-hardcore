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

The existing outcome/constraints, project conventions and available helpers,
dependencies or platform capabilities; ownership context when relevant.

## required output

Record only a material choice and its trade-off in the existing conversation,
contract or plan: which complete path was selected, why it avoids unnecessary
coupling, and any meaningful limitation. A sentence is enough; there is no
required field list. If the check does not change the choice or confidence, omit
the report rather than restating the contract.

Do not create a separate simplicity document by default. If the decision is
durable architecture or domain policy, hand it to `architecture-decision` or
the existing domain map instead. Do not retain a grilling transcript or a
private reasoning dump.

## procedure

1. Use the existing outcome and constraints without restating the contract.
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
7. Record only decision-relevant trade-offs or omitted scope, not a second checklist.
8. Use applicable domain, architecture, boundary and testing guidance; this lens
   owns none of their gates.

## quality bar

The complete solution is justified by structural separation and project fit, not
line count or familiarity. Safeguards remain intact. Do not claim token, cost,
speed or skill-effect gains without independent evidence.

## failure modes

- Treating “simple” as the shortest diff or fewest files.
- Removing safeguards or braiding concerns to make a patch shorter.
- Asking an exhaustive interview after the design is clear.
- Creating another tracker, workflow, score or report for this lens.
- Calling a result simple instead of addressing an actual domain, boundary,
  testing or evidence concern.
