# Implementation plan: current provider loading and measurement

## behaviour to protect

Provider onboarding must classify discovery, loading, and environment blocks
separately. Timing output must describe fixed command wall time only and must
not become a provider benchmark or human productivity claim.

## first failing test

Before updating the onboarding guide or roadmap, run:

```bash
bun -e 'const guide = await Bun.file("docs/provider-onboarding.md").text(); const roadmap = await Bun.file("ROADMAP.md").text(); if (guide.includes("Run 055") || roadmap.includes("Run 055")) { console.error("expected red phase: current loading refresh is not yet recorded"); process.exit(1); } process.exit(1);'
```

Expected result: exit 1 because the current refresh has not yet been recorded.

## smallest implementation

Run the existing host commands through output-suppressing classifiers, repeat
the fixed `eh status`/`eh summary` path three times, and update only the
provider guide, dogfood decision/index, roadmap, and Run 055 records. No code,
dependency, schema, adapter, or measurement library is needed.

## refactor step

None. Reuse the existing onboarding commands, receipt format, and local CLI.

## checks to run

- Current version, discovery, metadata, and loading classifiers.
- Three-repetition measurement output with exit states and summary statistics.
- Provider guide, dogfood, roadmap, and supporting-record assertions.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check` and an untracked-file whitespace scan.
- Run 055 validation, high-risk approval, completion, attestation, and CI.

## rollback plan

Remove the fresh Run 055 records and revert only the current provider matrix,
dogfood, and roadmap wording. Do not alter provider configuration, historical
records, or runtime files.

## notes

The measurement output is intentionally descriptive. A real active-time or
productivity study needs a separate protocol, baseline, sampling plan, and
human review.
