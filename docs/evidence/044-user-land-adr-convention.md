# evidence ledger: user-land ADR convention

## work receipt

- result: complete
- claim: EHS now documents a convention-first, lazy ADR-directory policy for user repositories without adding install-time or runtime scaffolding.
- evidence: The deliberate pre-change content assertion exited 1; the post-change assertion passed for eight required statements; scaffold validation, 135 tests, TypeScript, whitespace, and documentation-link checks passed; review found no runtime or installer change.
- remaining uncertainty: The policy is Markdown guidance and is not runtime-enforced. No external user-repository dogfood has yet measured convention discovery or ceremony.
- next: Human-review the wording, then commit this bounded documentation and governance slice if accepted.

## summary

This ledger records the clarification of how EHS handles ADR storage in a
user's repository. Installation remains side-effect free. A required ADR uses
the project's existing convention or a proposed `docs/adr/` fallback created
with the first ADR only.

## changed files

- `skills/architecture-decision/SKILL.md`
- `README.md`
- `docs/user-guide.md`
- `docs/change-contracts/044-user-land-adr-convention.md`
- `docs/decision-challenges/044-user-land-adr-convention.md`
- `docs/adr/044-user-land-adr-convention.md`
- `docs/implementation-plans/044-user-land-adr-convention.md`
- `docs/reviews/044-user-land-adr-convention.md`
- `issues/044-user-land-adr-convention.md`
- this evidence ledger

## commands run

- Pre-change content assertion for `## repository ADR convention` -> exit 1;
  the contract heading was absent.
- Post-change Bun content assertions -> exit 0; eight required statements
  were present across the skill, README, and user guide.
- `bun run check` -> exit 0; scaffold validation passed.
- `bun run test` -> exit 0; 135 tests passed, 0 failed, 481 expect calls
  across 27 files.
- `bunx tsc --noEmit` -> exit 0.
- `git diff --check` -> exit 0.
- Public-document diff inspection -> no runtime or installer changes found.
- Initial combined changed-document assertion -> exit 1 because the inline
  command over-escaped its tab matcher; this was a harness error, not a
  repository finding, and no files were changed.
- Local Markdown-link and changed-document whitespace assertions -> exit 0.

## passing checks

- The content contract is present and consistent across the three public
  documents.
- Existing project conventions, lazy fallback, no-empty-directory behavior,
  and the no-ADR path are stated explicitly.
- The repository scaffold, full test suite, TypeScript check, and whitespace
  check pass.
- Review confirms that EHS remains standalone and provider-neutral.

## failing checks

- The pre-change content assertion failed deliberately as the red phase. No
  post-change repository check failed. The initial combined document assertion
  was corrected and rerun successfully after the escaping error.

## architecture impact

The public skill guidance changes, so ADR 044 records the decision. No runtime,
module boundary, dependency, persistence, schema, lifecycle, installer, or
deployment architecture changes.

## public contract impact

The `architecture-decision` skill now defines repository-local path discovery
and a lazy `docs/adr/` fallback. It does not define a forced path or an
installation side effect. README and user-guide wording project the same
contract.

## risks left open

- The policy is advisory and cannot prove that a provider or agent followed
  it.
- A repository-specific convention may be difficult to discover.
- Real external-repository dogfood is needed before adding any automation.

## human review needed

Yes. Review whether the fallback is clear and proportionate for new users. No
runtime or architecture implementation decision remains open.

## final recommendation

needs review
