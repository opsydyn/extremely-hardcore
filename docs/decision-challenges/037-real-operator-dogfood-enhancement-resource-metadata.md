# decision challenge: real operator dogfood enhancement resource metadata

## trigger

The proposal changes the accepted source compiler boundary. It therefore changes observable compilation behaviour and must be checked against the existing architecture and fail-closed claims before implementation.

## proposal and claims

Add an exact source-key allowlist to the `Enhancements` divide modifier compiler branch and reject unrelated metadata with a blocking diagnostic. The bounded claim is that this prevents one known class of silent source-to-IR information loss. It does not claim whole-catalogue qualification, improved provider behaviour, lower cost, or a general source-schema validator.

## existing-platform ownership

- `40k-builder` ADR 0022 owns the BSData source ACL, source-independent IR, blocking diagnostics, and publication gate.
- `@aab/bsdata` owns the compiler acceptance decision for this source shape.
- `@aab/engine` owns evaluation and must remain unchanged.
- EHS owns the contract, test-first protocol, evidence ledger, and dogfood record; it does not own target compiler semantics.

## durable differentiated value

The durable value of this slice is explicit loss prevention at a real source boundary: a modifier is either represented by the existing typed IR or rejected with provenance. The implementation does not add a new framework or generalise beyond the audited family.

## strongest counterargument

An exact-key allowlist can reject legitimate upstream metadata if the audit is incomplete. The proposal is justified only because the target already uses narrow, source-audited fail-closed branches and the test records the supported shape. Any new upstream key must be audited and deliberately admitted later.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| Unknown Enhancement divide metadata is currently accepted and dropped. | The committed compiler branch checks selected values but has no modifier-key allowlist. | No red test yet. | Source-shaped extra-key test fails before implementation. |
| The existing contract has a finite supported key set. | The committed fixture and compiler branch use source `id`, native type/field/value/conditions, plus optional operator and ordering fields. | The pinned whole-catalogue corpus is not part of this run. | Contract records the audited set; review checks the diff and fixture. |
| The fix preserves the existing IR/runtime boundary. | ADR 0022 and the compiler's typed `EnhancementResourceModifier` output. | No post-change evidence yet. | Focused compiler tests, typecheck, lint, and diff review. |

## minimum credible slice

One compiler regression test and one exact-key rejection guard in `@aab/bsdata`, using the existing fixture and no downstream changes. Complete one isolated EHS protocol run against the target worktree.

## stop conditions

- The exact key set needs a new source acquisition or upstream network claim.
- The test requires changing engine semantics, IR, schemas, or qualification rules.
- The allowlist would admit a key whose semantics are not represented.
- Baseline failures prevent attribution to this change.
- The target worktree is no longer isolated from the user's dirty checkout.

## verdict

proceed

## rationale

The proposal is a small correction inside the target's existing anti-corruption boundary. The red test is falsifiable, the implementation has no downstream surface, and the main risk is explicitly handled by keeping the allowlist audited and narrow.
