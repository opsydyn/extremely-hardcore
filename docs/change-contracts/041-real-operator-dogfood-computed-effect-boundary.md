# change contract: real operator dogfood computed Effect boundary

## user intent

Run the ninth real EHS dogfood change in an isolated external repository and
close a concrete lint-rule bypass in `effect-oxlint`: literal computed Effect
execution calls such as `Effect["runPromise"](program)` must receive the same
boundary diagnostic as `Effect.runPromise(program)`.

## current understanding

- Target repository: `@opsydyn/oxlint-effect` in `/private/tmp/ehs-run9-oxlint`.
- Target baseline: `ac7dc2a` (`docs: refresh published consumer examples`).
- The public boundary rules use `isEffectRunCall`.
- `isEffectRunCall` depends on `isEffectMemberCall`, which currently accepts
  only non-computed identifier properties.
- Existing unit and CLI fixtures cover dot notation, but no literal computed
  Effect execution form.
- The active target checkout at `/Users/alancurrie/Projects/effect-oxlint` was
  clean before the isolated worktree was created.

## allowed scope

- Update the internal Effect member-call recognizer in `src/index.ts` so static
  string computed properties are recognized with the same meaning as dot
  properties.
- Add focused unit coverage and one real Oxlint CLI fixture assertion for the
  direct execution boundary.
- Add Run 9 protocol artefacts in the target worktree and the nine EHS records
  for contract, architecture, challenge, domain, boundary review, plan, issue,
  evidence, and dogfood history.

## forbidden scope

- No dynamic computed-property inference such as `Effect[method](program)`.
- No changes to exported rule names, preset membership, configuration grammar,
  dependencies, generated package output, or release metadata.
- No changes to runtime Effect code, consumer repositories, EHS orchestration,
  provider execution, or network behaviour.
- No broad refactor of AST helpers or unrelated rule semantics.

## affected areas

- Plugin AST recognition for Effect member calls.
- `no-hidden-effect-execution` and `no-run-effect-outside-boundary`, plus any
  existing internal rule that reuses the same static Effect-call predicate.
- Unit and Oxlint integration fixtures.
- Local EHS evidence and completion records.

## minimum complete change

Treat a literal string computed member on `Effect` as equivalent to its dot
notation form inside the existing shared recognizer. Preserve dynamic-key
conservatism. Prove the public diagnostic at both the direct rule and real
Oxlint CLI boundaries, then run the package's normal type, build, test, lint,
documentation, size, pack, and diff checks.

## public contracts

The exported plugin API and rule identifiers remain unchanged. Observable lint
behaviour expands so `Effect["runPromise"](...)` and the other literal static
forms in the existing `Effect.run*` set cannot bypass the execution-boundary
rules outside configured boundary paths. Dynamic computed properties remain
unclassified.

## assumptions

- JavaScript treats `Effect["runPromise"]` and `Effect.runPromise` as the same
  property access when the key is a string literal.
- Literal computed access is sufficiently unambiguous for a syntax-only rule.
- The target's existing tests and local Oxlint integration provide the needed
  parser and diagnostic evidence without a live provider or network call.

## risks

- The shared recognizer is reused by more than the two execution rules, so
  literal computed calls may receive additional existing diagnostics.
- A consumer may intentionally use literal computed access in a non-boundary
  module; that is still semantically direct Effect API use and should be
  reviewed or moved to a configured boundary.
- The package's example lint command intentionally reports anti-pattern
  fixtures and is not a clean-release gate.

## acceptance evidence

- A focused unit test fails before the implementation because the computed
  execution call produces no report.
- The same unit test passes after the implementation.
- A real Oxlint CLI fixture reports the computed execution call and continues
  to allow configured boundary paths.
- Target full tests, typecheck, build, package lint, API-doc check, size check,
  pack dry run, and whitespace diff check pass, with deliberate fixture-only
  failures recorded separately.
- The EHS run validates with all criteria covered, no open blockers, and a
  post-commit attestation.

## stop conditions

- Stop if dynamic computed keys are reported without a statically known string.
- Stop if configured runtime boundaries stop allowing the existing valid forms.
- Stop if the shared-helper change causes unrelated existing diagnostics to
  change without a focused rationale.
- Stop if verification requires dependency, configuration, release, or
  consumer changes outside this contract.
