# bounded-context review: literal computed Effect boundary recognition

## proposed change

Extend the existing internal Effect member-call predicate to recognize static
string computed properties. Add unit and real Oxlint CLI coverage for computed
direct execution while preserving dynamic-key and boundary-path behaviour.

## affected contexts

- Plugin AST analysis in `src/index.ts`.
- Unit and integration test fixtures in the same package.
- Downstream consumers that receive diagnostics from existing rule IDs.

## allowed dependencies

- Existing AST node shape and helper functions.
- Existing `effectRunMethods`, rule messages, and boundary-path configuration.
- Existing Bun, TypeScript, Oxlint, build, and package verification commands.

## suspicious dependencies

- Type information or import resolution is unnecessary for a literal key and is
  forbidden for this slice.
- Runtime execution, network calls, generated package changes, and new config
  options would cross the contract boundary.
- Broad dynamic property inference would make a syntax-only rule unsound.

## data ownership

The plugin owns no persistent business data. The AST owns the source shape; the
rule owns diagnostic classification; the fixture owns expected test output.

## transaction boundaries

There is no database or runtime transaction. The package build and pack checks
are delivery boundaries, and the EHS run captures evidence against the target
workspace fingerprint before completion.

## integration events

No integration events, provider calls, or cross-process messages are added.

## anti-corruption needs

Keep the target plugin's syntax-only classification separate from runtime
property resolution. Do not import EHS protocol code into the target package or
make consumer code depend on the dogfood records.

## current evidence

- The red unit and CLI regressions failed for the expected missing computed
  diagnostic before implementation.
- The green unit test reports the literal computed form and leaves dynamic keys
  unclassified.
- The real Oxlint fixture reports exactly one additional
  `no-hidden-effect-execution` diagnostic, and the configured server fixture
  remains clean.
- The complete target suite passes with 406 tests; typecheck, build, publint,
  API-doc, size, pack, and diff checks also pass after commit `444ad0e`.
- The post-commit EHS receipt covers 11/11 criteria with zero blockers. The
  final and CI attestations are valid with zero errors and fingerprint
  `5491986a7d182aa89f7c89b3e5af397bb85e8f7ccbd8649f7baf8ea6287c932a`.
- No unrelated fixture diagnostics changed.

## verdict

safe with noted risk

## follow-up

The approved five-file target diff is committed as `444ad0e` in the isolated
worktree. Keep the commit isolated until the owner chooses integration. Do not
broaden this slice into dynamic property inference, additional rule semantics,
generated-spec changes, or a complete plugin audit.
