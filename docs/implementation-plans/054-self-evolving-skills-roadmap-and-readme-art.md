# Implementation plan: self-evolving skills roadmap and README art

## behaviour to protect

Roadmap ambition must not silently become a product claim or runtime feature.
Self-evolving skills remain a human-governed, evidence-gated backlog item, and
the README asset must be a stable, accessible relative reference.

## first failing test

Before editing `ROADMAP.md` or `README.md`, run:

```bash
bun -e 'const roadmap = await Bun.file("ROADMAP.md").text(); const readme = await Bun.file("README.md").text(); if (roadmap.includes("Self-evolving skills moat hypothesis") || readme.includes("assets/extremely-hardcore-skills.jpg")) { console.error("expected red phase: the new roadmap and README slice is not yet represented"); process.exit(1); } process.exit(1);'
```

Expected result: exit 1 because the new wording and asset reference have not
yet been added.

## smallest implementation

Update the existing governed skill-evolution section with a clearly labelled
moat hypothesis and staged gates. Copy the supplied JPEG to `assets/`, add one
README reference with alt text and a bounded width, and create the Run 054
documentation records. Do not add code or dependencies.

## refactor step

None. Reuse the existing roadmap initiative and README structure.

## checks to run

- Roadmap and README content assertions.
- Asset existence, JPEG type, dimensions, and SHA-256 digest check.
- `bun run check`.
- `bun run test`.
- `bunx tsc --noEmit`.
- `git diff --check` and an untracked-file whitespace scan.
- Run 054 protocol validation, completion, attestation, and CI projection.

## rollback plan

Remove the new roadmap wording, README reference, supplied asset, and Run 054
documentation. Do not alter the existing governed skill-evolution guardrails
or runtime files.

## notes

The image is a presentation asset only. The roadmap's moat language must
remain explicitly hypothetical until independent held-out evidence exists.
