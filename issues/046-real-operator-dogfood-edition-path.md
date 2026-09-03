# issue: real operator dogfood edition snapshot path

## intent

Exercise `simple-made-easy` on a real external repository by repairing the
stale path between the Flue edition writer and the Astro snapshot collection.

## scope

- Use an isolated `tech-radar-web` worktree.
- Align edition discovery and generated output with the current
  `content/editions/<YYYY-MM>/index.mdx` convention.
- Preserve deterministic metadata, narrative, provenance, and workflow result
  contracts.
- Refuse same-month collisions.
- Verify locally without provider or network execution.

## completion criteria

- Current-layout discovery, path metadata, matching frontmatter, and collision
  behavior are covered by focused tests.
- Target typecheck, tests, Astro check/build, and diff checks pass.
- The stale writer path is absent from the affected source and docs.
- EHS records fresh evidence for the isolated target run with no blockers.
- The dogfood record states that a generated index is not proof of a complete
  published edition.

## non-goals

- No active-checkout or `main` mutation.
- No AI provider, network, GitHub Actions, deployment, or publishing claim.
- No blip snapshot generation or content migration.
- No dependency, provider, workflow-permission, or result-schema change.
