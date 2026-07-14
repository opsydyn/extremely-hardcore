# Dogfood Run 4: missing evidence log validation and stale proof

## change

Bug fix: a missing log referenced by an evidence record caused `eh validate` to expose raw `ENOENT`. Validation now reports `evidence.log-missing` and a guarded transition remains non-mutating.

Risk: standard. The change modifies one experimental CLI error path over persisted protocol artefacts. It does not change schema, command grammar, capture behaviour, dependencies, CI, authentication, or external services.

## observed stale sequence

Before the fix, the run captured passing evidence for repository validation, the existing focused suite, and TypeScript against fingerprint `d6dcbb41d2e22b4dca278218bfabb1c50be482fa974dba6214bb96050f1b0e9a`.

After adding the missing-log regression tests and validator branch, `eh validate` rejected the run with:

```text
criterion.uncovered: missing-log-regression has no evidence
evidence.stale: 0ee2916e-2bf0-45aa-8782-ae69b44dd411 belongs to a different workspace fingerprint
evidence.stale: 38312e62-bcb6-41bc-859a-7dd262e385ee belongs to a different workspace fingerprint
evidence.stale: 377a6e93-4e8b-46b3-82a9-0641f2f3a489 belongs to a different workspace fingerprint
```

This was a correct block: the pre-change evidence could not justify the changed validator.

## gate record

Run directory: `.extremely-hardcore/runs/006-missing-evidence-logs/`.

All criteria are refreshed after the code and documentation changes, then completion is requested only when every record shares the new workspace fingerprint.

## observed behaviour

- Pre-implementation validator and CLI regressions failed with raw `ENOENT` as expected.
- Missing logs now produce `evidence.log-missing` with the exact evidence ID and declared path.
- A transition against a missing log appends no history and rewrites no run data.
- Stale evidence was visible before refresh and prevented completion.
- Setup overhead was not separately timed; the repeated capture flow is now a measured friction point for the final campaign decision.

## finding

This is the strongest dogfood result so far: the gate caught a real change between verification and completion, gave an exact stale-evidence explanation, and accepted the run only after refreshed proof. The remaining blocker run must establish whether the same clarity holds for unresolved engineering judgement, not only artefact state.
