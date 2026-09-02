# Reject unrepresented Enhancement divide metadata

## problem

The committed `40k-builder` compiler branch for Enhancement resource divide modifiers validates selected fields but does not reject unrelated source keys. A future source field can therefore be silently omitted while the modifier is accepted into source-independent IR.

## impact

The compiler can report a successful compilation for a source shape whose semantics are not fully represented. That weakens the target's ADR 0022 fail-closed publication boundary and makes later parity failures harder to attribute.

## expected behaviour

An Enhancement divide modifier containing a key outside the audited source contract is rejected with a blocking `unsupported-node` diagnostic that names the unsupported key. Existing valid divide-by-2 and divide-by-3 modifiers remain accepted.

## scope

One compiler regression test and one exact-key guard in `@aab/bsdata`. No engine, IR, API, schema, persistence, qualification, or upstream-source changes.

## verification

The source-shaped regression fails before the guard, passes after it, and is followed by focused tests, target typecheck, touched-file Biome, diff validation, and the completed EHS Run 5 protocol.
