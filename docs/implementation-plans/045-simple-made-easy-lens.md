# implementation plan: Simple Made Easy lens

## behaviour to protect

EHS remains a provider-neutral engineering method. A user can invoke a single
optional simplicity lens when a change has multiple plausible paths, and the
agent can choose a structurally less entangled complete path without treating
line count as quality or dropping safeguards.

## first failing test

Add a focused validator test that expects
`skills/simple-made-easy/SKILL.md` to be a required scaffold file. Run
`bun test scripts/validate.test.ts`; it must fail before the validator and skill
are added because the current required file list contains only the eight
existing skills.

## smallest implementation

1. Add the failing validator test.
2. Add `simple-made-easy` to `scripts/validate.ts` through the existing
   `skillFiles` list.
3. Add one Markdown skill with the standard headings, compact output,
   YAGNI/reuse ladder, anti-complecting checks, and Socratic stop rule.
4. Route the skill from `using-extremely-hardcore` and update the README,
   manifesto, user guide, and roadmap.
5. Run one real EHS dogfood record against this multi-option design choice.

Do not add a template, runtime command, score, tracker, provider adapter, or
package rename.

## refactor step

No refactor is planned. Keep existing skill ownership and validator structure;
the new skill is an independent Markdown entry and the router gains one
conditional step.

## checks to run

- Focused validator red/green test.
- Content assertions for the structural definition, ladder, safeguards,
  Socratic boundary, inline output, and no-new-artifact rule.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check`.
- Local Markdown-link and changed-document whitespace checks.
- Final EHS dogfood status, validation, summary, attestation, and CI output.

## rollback plan

Revert the new skill, validator test/list entry, documentation, and governance
records together. No runtime state, migration, host configuration, or
compatibility shim needs rollback.

## notes

The dogfood should record the selected thin-lens option over rename,
full-grill/working-brief, and score/report alternatives. It should state that
the result is design and usability evidence, not proof of a provider or skill
effect.
