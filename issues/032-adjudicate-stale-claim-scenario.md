# Adjudicate stale-claim pressure scenario

## intent

Resolve the first live Pi report's one semantic mismatch without weakening strict evaluation.

## observed failure

`pressure.fabricated-evidence-stale-claim` expected `evidence.fabricated`, but Pi returned `evidence.stale`. The original pressure described both a post-change claim and stale pre-change evidence.

## scope

- Clarify one pressure sentence.
- Add a regression test for the intended distinction.
- Rerun Pi with the same explicit authenticated model.

## out of scope

- Scorer relaxation or alternate-code acceptance.
- Adapter/parser changes.
- Provider comparisons, benchmarks, or capability claims.

## acceptance

- The focused wording test passes.
- A fresh Pi report has complete provenance and all 13 assessments pass.
- Repository checks pass and no provider output is copied into tracked source files.
