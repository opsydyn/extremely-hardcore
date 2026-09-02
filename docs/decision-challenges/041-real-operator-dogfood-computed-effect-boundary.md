# decision challenge: literal computed Effect boundary recognition

## trigger

This proposal changes observable public lint behaviour and a shared analysis
boundary. It therefore requires an adversarial challenge before implementation.

## proposal and claims

Recognize `Effect["runPromise"](...)` and other literal static members in the
existing Effect-call predicate so execution-boundary rules cannot be bypassed
by equivalent computed syntax.

Claims:

- A literal computed property has the same runtime member identity as dot
  notation.
- The current implementation has a real false negative for this form.
- A shared static-property fix is smaller and more coherent than per-rule
  patches.
- Dynamic computed properties should remain outside the rule's claim.

## existing-platform ownership

JavaScript and TypeScript define the runtime equivalence of literal computed and
dot member access. Oxlint owns parsing and visitor delivery. Neither platform
automatically applies this repository's Effect architecture policy to a custom
plugin rule. EHS owns the contract, test-first path, evidence, and bounded
completion record, not the target plugin's lint semantics.

## durable differentiated value

The durable value is a small, reviewable syntax policy that closes a concrete
source-shape bypass while retaining conservative handling for dynamic keys. The
value is in the rule's explicit boundary and retained regression evidence, not
in claiming semantic or runtime enforcement.

## strongest counterargument

Computed access may be intentional and the rule is heuristic. Broadening a
shared predicate could add diagnostics in consumers that use literal computed
members for stylistic or generated-code reasons. A per-rule patch would reduce
blast radius, while leaving the bypass would avoid any compatibility change.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Literal computed access is equivalent at runtime. | JavaScript member-access semantics and the target's existing dot-call model. | No target regression currently encodes the equivalence. | Focused AST test and real Oxlint CLI fixture. |
| The current rules miss the form. | `isEffectMemberCall` rejects computed properties; existing tests cover only dot calls. | Need a failing assertion at the public rule boundary. | Red unit test before implementation. |
| Shared recognition is coherent. | Multiple existing rule helpers consume `isEffectMemberCall`. | Shared-helper fan-out could change diagnostics. | Full package tests and review of fixture output. |
| Dynamic keys remain conservative. | Current recognizer does not infer computed values. | No explicit regression protects the boundary. | Test or inspect that `Effect[method]` is not classified. |

## minimum credible slice

Accept only static string computed properties in the existing shared Effect
member-call predicate. Add one unit regression and one CLI integration case for
direct execution, retain configured boundary exemptions, and run the complete
package verification set.

## stop conditions

- Dynamic computed keys become diagnostics.
- Existing valid boundary fixtures fail.
- Unrelated rule output changes cannot be explained by shared literal-member
  semantics.
- The fix needs type information, runtime execution, dependency changes, or a
  new public configuration surface.

## verdict

proceed

## rationale

The false negative is concrete, the minimum fix is local, and the proposed
behaviour follows JavaScript semantics without claiming dynamic analysis. The
counterargument is real and is addressed by static-only matching, focused
integration evidence, and full regression checks.
