# decision challenge: align the Flue edition writer with snapshot content

## trigger

This is external writable-agent dogfood and changes a generated-content path,
an authoring workflow contract, and a CI-uploaded artifact boundary. The
challenge must keep the slice separate from AI provider behavior, deployment,
and a claim that a complete edition has been published.

## proposal and claims

- The edition writer should read current metadata from
  `apps/astro/src/content/editions/*/index.mdx` or `index.md`.
- A new draft should be written as `<YYYY-MM>/index.mdx` beneath the same
  collection root, with matching `YYYY-MM` frontmatter id.
- The writer should refuse an existing monthly id instead of overwriting it.
- The existing workflow can consume the same persisted `filePath` field after
  this correction.

The claims are limited to deterministic path and metadata alignment. They do
not claim that Flue output is correct, that an AI provider was exercised, that
blip snapshots exist, or that GitHub Pages can publish the result.

## existing-platform ownership

Astro content collections own the live snapshot path and schema. Flue owns
draft generation and deterministic metadata. The GitHub workflow owns artifact
upload and pull-request creation. EHS owns only the dogfood evidence and does
not become a target dependency.

## durable differentiated value

The value of this dogfood is not the path fix itself. It tests whether the EHS
simple-made-easy lens identifies the least entangled complete repair: reuse the
target's existing snapshot contract, preserve deterministic/provenance
boundaries, and avoid a compatibility loader or content-model rewrite.

## strongest counterargument

Changing the writer to create only an edition index may make the workflow appear
healthy while still producing an edition with no blips. A stricter approach
would generate or validate the full snapshot tree, or fail until content exists.
That is a real product question, but expanding this run would conflate path
reachability with content completeness and introduce unrequested AI/content
behavior.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The writer targets a retired path | Source inspection and current content config | No focused failing test | Baseline test against a current-layout fixture |
| Current snapshot metadata can be discovered deterministically | Existing `index.mdx` files and relationship-agent path helpers | Edition writer has no current-layout reader | Focused discovery test |
| A generated path can be loaded by Astro's collection | Collection pattern is `*/index.{md,mdx}` | No generated artifact yet | Path/frontmatter test and Astro check/build |
| Existing content must not be overwritten | Current ids include `2025-09` and `2026-05` | No writer collision rule | Collision regression test |
| Full Flue/AI/publishing behavior is fixed | None | Provider and CI are not exercised | Keep this claim out of the run |

## minimum credible slice

Add the focused red/green tests, align the writer with the existing snapshot
layout, add the collision guard, update the narrow prompt/docs, and run the
target's local deterministic quality gates without network or provider calls.

## stop conditions

- The fix requires reintroducing the retired content collection.
- The generated index cannot satisfy the existing Astro schema.
- The implementation changes the result envelope, narrative schema, provider,
  or workflow permissions.
- Collision behavior is silently overwrite, silent merge, or an invented id
  policy.
- The external worktree cannot remain isolated from active `main`.

## verdict

proceed

## rationale

The path drift is directly observable in source and current collection config.
The selected repair reuses an established local convention, is testable without
AI or network access, and has a clear boundary around what it does not prove.
