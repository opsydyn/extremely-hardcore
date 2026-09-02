# evidence ledger: real operator dogfood postcode coordinate validation

## work receipt

- result: complete
- claim: Run 8 completed a real isolated `postcodesio-effect-client` dogfood change that rejects non-finite and out-of-range postcode search coordinates before HTTP transport execution.
- evidence: The pre-change public regression failed with `unexpected HTTP request`; the corrected regression passed for latitude `91`, longitude `-181`, and `NaN` with zero transport calls; the target suite passed 40 tests, package check passed, build, code lint, source/test formatting, package lint, and diff check passed; EHS validation completed with 8/8 criteria, no blockers, and valid attestation/CI output.
- remaining uncertainty: The full target `bun run fmt:check` command includes generated EHS protocol JSON and fails after evidence capture, so the recorded format criterion checks `src` and `test` explicitly. Target commit `c5f0716` remains isolated in its temporary worktree, and no live network or release evidence was collected.
- next: Preserve the coordinate-only validation boundary for future search-contract work and use another clean repository area for Run 9.

## summary

Run 8 dogfooded EHS on a real public API wrapper change in a temporary
`postcodesio-effect-client` worktree. The fix aligns the handwritten search
validator with the finite numeric ranges already declared by the generated
upstream request schema.

## changed files

Target worktree `/private/tmp/ehs-run8-postcodesio`:

- `src/internal/ApiService.ts`
- `test/postcodeOperations.test.ts`

EHS repository records:

- `docs/change-contracts/040-real-operator-dogfood-coordinate-validation.md`
- `docs/adr/040-real-operator-dogfood-coordinate-validation.md`
- `docs/decision-challenges/040-real-operator-dogfood-coordinate-validation.md`
- `docs/domain/040-real-operator-dogfood-coordinate-validation.md`
- `docs/implementation-plans/040-real-operator-dogfood-coordinate-validation.md`
- `issues/040-real-operator-dogfood-coordinate-validation.md`
- `docs/reviews/040-real-operator-dogfood-coordinate-validation.md`
- `docs/evidence/040-real-operator-dogfood-coordinate-validation.md`
- `docs/dogfood/040-real-operator-dogfood-coordinate-validation.md`

## commands run

- `bun install --frozen-lockfile` -> exit 0; 590 packages installed without lockfile churn.
- Baseline `bun run test` -> exit 0; 39 tests passed.
- Baseline `bun run typecheck` -> exit 0.
- Baseline `bun run lint:code` -> exit 0.
- Baseline `bun run fmt:check` -> exit 0; 56 files formatted.
- Baseline `bun run build` -> exit 0; package build completed.
- Baseline `bun run lint` -> exit 0; publint and attw passed with one repository URL suggestion.
- `bun run test -- test/postcodeOperations.test.ts -t "rejects invalid coordinate searches before issuing a request"` before the fix -> exit 1 with the expected `unexpected HTTP request` transport trap.
- The same focused regression after the fix -> exit 0; 1 test passed.
- First post-fix `bun run lint:code` -> exit 1; the new imperative helper and nested test pipeline violated repository Effect lint rules. The implementation was reshaped to `Match` and a flat pipeline.
- `bun run test -- test/postcodeOperations.test.ts` -> exit 0; 40 tests passed.
- `bun run check` -> exit 0; typecheck and 40 tests passed.
- `bun run build` -> exit 0; public package build completed.
- `bun run lint:code` -> exit 0.
- Initial post-evidence `bun run fmt:check` -> exit 1 because generated EHS evidence JSON and the rewritten `run.json` were included in the formatter input.
- `bun node_modules/oxfmt/dist/cli.js --config oxfmt.config.ts --check src test` -> exit 0; 32 source/test files formatted.
- `bun run lint` -> exit 0; publint and attw passed with one repository URL suggestion.
- `git diff --check` -> exit 0.
- Post-commit Run 8 evidence capture -> eight current criteria exited 0: `ff1325d2-56fc-4cc5-967a-7c464f6a3102`, `5231bcd2-f5b2-49d2-af87-20c48e6c9fc4`, `8f177ce4-c8f7-412b-b534-18d5642ac448`, `ab70bb61-e794-475c-809e-78db6bb12546`, `849a014c-3220-444b-afa0-2c88332e0913`, `6f128d89-db96-488f-b9fa-6fc9805c99ac`, `ef7a1d9e-c323-486d-a417-df31f2f27af7`, and `e1716452-ad9b-4827-9a51-1d61d7aad4ec`. Earlier pre-commit criterion records and the failed format record remain retained but are not the current references.
- `bun ... eh validate <run>` -> exit 0; completion gate valid.
- `bun ... eh transition <run> complete --reason "coordinate validation and package checks verified"` -> exit 0; transition `a4756e1f-a328-4a61-9f2c-5e2aa7d65ebd`.
- `bun ... eh summary <run>` -> exit 0; 8/8 criteria, 0 blockers, validation valid.
- `bun ... eh attest <run> /tmp/extremely-hardcore-dogfood-040-attestation.json` -> exit 0; valid attestation at workspace fingerprint `b80b54ab1e9cb5aabc2f9d19bd99db2d9f912f03ead4bbf73e19345cb3fb84d8`.
- `bun ... eh ci <run> /tmp/extremely-hardcore-dogfood-040-ci` -> exit 0; valid CI attestation and summary at the same fingerprint.

## passing checks

- Invalid coordinate searches now return `ApiValidationError` before transport.
- Valid text and coordinate searches remain covered by the existing postcode
  operation tests.
- The target package check passes with 40 tests and typechecking.
- The public package build passes.
- Code lint passes with the repository's Effect-specific rules.
- Source and test formatting passes when protocol artefacts are excluded.
- Packed-package lint passes; the only output is the existing repository URL
  suggestion.
- The scoped target diff has no whitespace errors.
- The final protocol run covers all eight criteria with no blockers and valid
  attestation and CI output.

## failing checks

- The deliberate pre-change regression failed as expected because invalid input
  reached the transport.
- The first implementation attempt failed the repository Effect lint rules; it
  was corrected before final evidence capture.
- The full `bun run fmt:check` command fails after EHS evidence capture because
  generated protocol JSON is included in its file set. The source/test-scoped
  equivalent passes and is the bounded verification used for this run.

## architecture impact

The architecture assessment records a public-boundary behaviour correction but no
structural architecture change. The fix remains inside the existing search
validator; no imports, module boundaries, generated transport, OpenAPI input,
dependencies, persistence, routes, or deployment behaviour changed.

## public contract impact

No exported TypeScript type or successful response shape changed. Invalid runtime
coordinates now produce the client-owned `ApiValidationError` before HTTP, in
line with the package documentation and generated upstream numeric constraints.

## risks left open

- The full target formatter command needs a future explicit exclusion or protocol
  integration decision; this run does not alter formatter configuration.
- The package reports one existing `publint` repository URL suggestion.
- Text-query validation and additional upstream search options remain outside
  this slice.
- No live API, network, release, or consumer migration evidence was collected.
- Target commit `c5f0716` remains isolated in its temporary worktree; the active user checkout was not modified.
- Protocol attestation provides local traceability, not cryptographic signing,
  agent identity, sandbox enforcement, or provider compliance.

## human review needed

Yes. The scoped two-file target diff was reviewed and committed as `c5f0716`.
Do not infer a broader request-domain or query normalization decision from this
local wrapper fix.

## final recommendation

complete with noted risk
