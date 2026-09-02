# change contract: real operator dogfood function name boundary

## user intent

Run the sixth real EHS dogfood change in an isolated external repository. Harden the `astro-azure-integration` adapter so a user-provided Azure function name cannot escape the generated `dist/api` directory.

## current understanding

The target is `astro-azure-integration` at committed `HEAD` `8685a58` in `/private/tmp/ehs-run6-astro`, a temporary branch created from the clean active repository. The active `/Users/alancurrie/Projects/astro-azure-integration` checkout is clean and remains protected.

`generateAzureSwaFiles` joins `dist/api` with the public `functionName` option before creating directories and writing generated files. The current implementation accepts separators, dot segments, and an empty name, so path normalization can redirect writes or produce an invalid function layout.

## allowed scope

- Add a source-shaped regression to `packages/astro-azure-swa/test/generate.test.ts`.
- Add one input validation guard to `packages/astro-azure-swa/src/generate.ts` before any generated output is written.
- Document the single-path-segment constraint in `packages/astro-azure-swa/README.md`.
- Record the EHS Run 6 protocol in the isolated target worktree.
- Record Run 6 governance, review, evidence, and operator notes in this EHS repository.

## forbidden scope

- Do not edit the active `astro-azure-integration` checkout or any other active repository checkout.
- Do not change the Azure request bridge, routing semantics, runtime selection, dependency resolution, deployment workflows, or generated output shape for valid names.
- Do not add a dependency, path library, whitelist of undocumented Azure names, or runtime service.
- Do not alter the public adapter's other options or generated package metadata.
- Do not claim Azure deployment compatibility, containment, or release readiness from this local boundary test.

## affected areas

- `@opsydyn/astro-azure-swa` public adapter option validation.
- Generated Azure Static Web Apps artifact layout under `dist/api`.
- Package configuration documentation and regression tests.
- EHS Run 6 protocol and evidence records.

## minimum complete change

Reject an empty `functionName`, either path separator, either dot path segment, or a NUL character before `mkdir` or any file write. Emit a stable actionable error, preserve existing valid names, and prove the guard with a failing-then-passing test. Preserve existing output, routing, validation, error handling, and architecture obligations.

## public contracts

The public `functionName` option becomes stricter: it must be a non-empty single path segment without `/`, `\\`, NUL, `.` or `..` as the complete value. Valid existing names continue to produce the same generated files and route references. No exported type changes.

## assumptions

- `functionName` is an artifact directory and Azure function identifier, not a nested output path.
- The adapter owns the generated `dist/api/<functionName>` layout and must validate data before filesystem writes.
- Rejecting only path-boundary hazards is preferable to inventing a broader undocumented character whitelist.

## risks

- A consumer may currently rely on a nested or dot-segment name even though the option is documented as a function name; this is an intentional stricter safety boundary.
- No fresh Azure platform naming audit is included in this slice; names outside the local path-safety rule remain unclaimed.
- Full deployment and live SWA evidence remain outside scope.

## acceptance evidence

- The new unsafe-name test fails before the guard because the current implementation does not reject the input.
- The test passes after the guard and proves no generated path is accepted for unsafe names.
- Existing generator tests pass, including valid output and configuration behavior.
- Root typecheck, build/check, package lint, and `git diff --check` pass where the target toolchain supports them.
- The EHS protocol run has fresh passing evidence for every criterion, validates at the final target fingerprint, completes, and produces a valid attestation/CI output.
- The operator record reports setup time, baseline limitations, friction, false blocks, workarounds, and remaining uncertainty.

## stop conditions

Stop and record a blocker if the path boundary cannot be proven before writes, valid existing names change unexpectedly, the fix requires routing/deployment changes, the red test does not fail for the intended reason, the isolated worktree boundary is lost, or verification cannot distinguish this slice from pre-existing failures.
