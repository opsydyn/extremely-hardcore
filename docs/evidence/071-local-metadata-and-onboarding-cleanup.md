# Local metadata and onboarding cleanup

Date: 2026-09-26.

- result: complete
- claim: Claude agent metadata and stale onboarding labels are corrected; distribution remains last and live qualification stays open.
- evidence: Seven frontmatter regression cases reproduced the missing metadata, then passed; Claude Code plugin and marketplace validation passed without warnings.
- remaining uncertainty: Actual agent discovery/delegation, model loading/adherence on each host, comparative effectiveness, optional protocol qualification, and publication readiness were not tested.
- next: Plan a representative Codex standalone acceptance trial before any model execution.

## Scope and boundaries

The user asked to tidy loose ends before distribution. This bounded slice adds
only `name` and concise `description` YAML to the seven existing agent roles,
preserving their instruction bodies. No tool, model, permission, hook, or
delegation-policy override is introduced. Claude may use the descriptions for
discovery/delegation; this record does not prove actual invocation or enforcement
of prose-only role constraints. The host owns permissions.

The [official agent reference](https://code.claude.com/docs/en/sub-agents)
documents the required metadata. No new ADR is needed: this completes the
existing [local metadata decision](../adr/043-multi-host-local-plugin-metadata.md)
without changing runtime, dependency, auth, persistence, or public contracts.
No marketplace configuration was edited or installation refreshed.

The September 3 smoke matrix is preserved as historical, not a current auth or
compatibility claim. Later metadata/capability evidence is distinguished from
model adherence. The guides now say that requesting loading or echoing the
prompt's expected marker does not establish instruction delivery. No skills,
scorer, evaluator thresholds, or existing failed-attempt records were changed.

The roadmap lists remaining qualification work separately and explicitly puts
distribution last. No export, version bump, publishing, saved-settings change,
authentication request, host model turn, or comparative run occurred.

## Verification

`bun test scripts/validate.test.ts --test-name-pattern 'minimal parseable Claude agent metadata'`
failed seven cases on absent frontmatter before edits, then passed all seven
with 35 assertions. It uses Bun's YAML parser and requires only the two intended
metadata fields, matching names and non-empty text descriptions.

Claude Code `2.1.259` validated `.claude-plugin/plugin.json` and
`.claude-plugin/marketplace.json` with exit 0 and no warnings after correction.
This is metadata evidence, not a model loading check or directory approval.

Final local checks: `bun run test` passed 179 tests with 654 assertions across
29 files; `bunx --no-install tsc --noEmit`, `bun run validate`, and
`git diff --check` passed. Local link checks found no missing targets in the
four edited/new documents. Comparing all seven role bodies with `HEAD` after
removing only the new frontmatter found no instruction-body changes.

Recommendation: needs follow-up on standalone acceptance; distribution deferred.
