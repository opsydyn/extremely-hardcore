# domain map: literal computed Effect boundary recognition

## domain terms

- **Effect module:** a source file importing `effect`, an Effect submodule, or
  the supported atom package.
- **direct Effect execution:** a call to one of the existing `Effect.run*`
  methods.
- **runtime boundary:** a configured app, CLI, worker, route, server, or test
  path where Effect execution is owned.
- **static computed member:** a member access whose key is a string literal.
- **dynamic computed member:** a member access whose key requires runtime
  evaluation, such as `Effect[method]`.

## candidate bounded contexts

- Plugin analysis: owns AST recognition and diagnostic emission.
- Fixture and test oracle: owns expected parser and rule behaviour.
- Consumer source: receives lint diagnostics and configures allowed boundaries.

## aggregates/entities/value objects

- `Effect` member-call AST node: the analyzed syntax value.
- `effectRunMethods`: the existing set of direct execution method names.
- Boundary-path configuration: the existing value that allows runtime ownership.

## commands

- Analyze a source file with the configured plugin.
- Report a direct execution diagnostic outside a boundary.
- Suppress the same diagnostic inside a configured boundary.

## events

No domain events or persistence are introduced. A lint diagnostic is an
observable analysis result, not a runtime event.

## policies/rules

- `Effect.runPromise` and `Effect["runPromise"]` are equivalent when the key is
  a literal static string.
- `Effect[method]` is not statically classified.
- Existing rule method sets and boundary path configuration remain authoritative.

## invariants

- Static literal recognition must not alter exported rule names or messages.
- Boundary exemptions must continue to apply to both dot and literal computed
  forms.
- The recognizer must not claim to resolve aliases or dynamic dispatch.

## external systems

- Oxlint parses TypeScript and invokes the JavaScript plugin visitor.
- The target package's build and pack tooling publish the plugin surface.

## integration points

- `src/index.ts` internal AST predicate.
- `tests/plugin.test.ts` direct rule harness.
- `tests/fixtures/oxlint/platform-boundary-shared.ts` real parser fixture.
- `tests/oxlint.integration.test.ts` CLI assertion.

## ambiguity

The shared predicate is used by more than execution-boundary rules, so this
slice may expose existing diagnostics for other literal computed Effect calls.
That is acceptable only when the diagnostic follows the existing named method
policy and the full suite remains stable. Generated or aliased property access
is intentionally unresolved.

## recommended next questions

- Before release, should the package document literal computed coverage as part
  of its syntax-only claim?
- If users report false positives, should those be handled with boundary paths,
  targeted rule configuration, or a narrower recognizer?
