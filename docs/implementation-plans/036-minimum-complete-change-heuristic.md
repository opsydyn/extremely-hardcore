# implementation plan: minimum complete change heuristic

## behaviour to protect

Non-trivial change contracts should explicitly state the smallest complete implementation. The wording must preserve the trivial-edit exemption, existing scope and evidence fields, and the requirement to retain validation, security, error handling, accessibility, and architectural fit.

## first failing test

This is a Markdown guidance change, not executable behaviour. The first failing check is a content assertion run before implementation: it expects the phrase `minimum complete change` in both target files and fails because neither file contains it. The repository validator does not encode the semantic quality of prose, so a source-code red test is not practical for this slice.

## smallest implementation

1. Add `minimum complete change` to the `change-contract` required output.
2. Add one procedure step asking for the least powerful implementation that fully satisfies the contract, with the protected-obligation guard.
3. Add one quality-bar check and one failure mode for unsafe minimality.
4. Add a matching `## minimum complete change` section to the template.

Do not add a new skill, command, schema, validator rule, dependency, hook, mode, or scoring mechanism.

## refactor step

No refactor is required. Review the wording for brevity, imperative style, and consistency with the existing headings after the content assertion passes.

## checks to run

- Post-change content assertion for both target files and all protected obligations.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.
- Real Run 4 status path: `implemented -> needs-human-decision -> implemented`.
- Fresh protocol evidence, validation, completion, summary, attestation, and CI output.

## rollback plan

Restore the two target Markdown files to their pre-slice content. Preserve the Run 4 governance and dogfood records as historical evidence if the slice is abandoned; no runtime or external-state rollback is required.

## notes

No ADR is required: this stays within existing skill Markdown ownership and changes no architecture, module boundary, persistence, schema, runtime, dependency, or operational mechanism. Bounded-context review is not triggered because no imports, shared packages, database shape, or integration flow changes.
