# adr: recognize literal computed Effect member calls

## status

accepted

## context

The `effect-oxlint` plugin identifies Effect calls through an internal
`isEffectMemberCall` predicate. That predicate recognizes `Effect.runPromise`
but rejects the equivalent literal computed form `Effect["runPromise"]`.
Consequently, direct Effect execution can bypass the execution-boundary rules
without changing runtime semantics. The change affects observable lint output
and a shared internal recognizer, so it is a public behaviour decision even
though no exported TypeScript shape changes.

## decision

Recognize static string computed properties in the existing Effect member-call
predicate. Keep dynamic computed properties unclassified. Reuse the existing
method sets and rule messages; do not add a new rule, configuration option, or
dependency.

## consequences

- Literal computed calls receive the same existing diagnostics as dot calls.
- The two execution-boundary rules and other consumers of the shared predicate
  become consistent for statically known property access.
- Dynamic dispatch remains outside syntax-only rule claims.
- Existing boundary-path exemptions remain unchanged.
- The shared helper has a wider observable surface, so regression tests must
  include the actual Oxlint parser and existing package checks.

## options considered

1. Leave the bypass in place. Rejected because equivalent source forms would
   receive different safety guidance.
2. Patch only `isEffectRunCall`. Rejected because related rules using the shared
   Effect-call predicate would continue to disagree about literal computed calls.
3. Add a broad dynamic property resolver. Rejected because syntax-only analysis
   cannot safely infer runtime keys and would create false positives.
4. Accept static computed properties in the shared predicate. Chosen because it
   is the smallest consistent fix with a conservative dynamic boundary.

## trade-offs

The chosen fix improves bypass resistance and rule consistency at the cost of
additional diagnostics for literal computed calls in reusable modules. It does
not attempt semantic import resolution or runtime property analysis, so some
aliases and dynamic access remain outside the rule's claim.

## follow-up work

No follow-up is required for this slice. Review computed member coverage again
before any syntax-only rule is expanded to dynamic property inference.

## review date

Review after the ten-run real operator dogfood campaign or before a release
claim that the execution-boundary rules cover all equivalent JavaScript forms.
