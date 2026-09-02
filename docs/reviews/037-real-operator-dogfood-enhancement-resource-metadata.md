# review: real operator dogfood enhancement resource metadata

## proposed change

In the isolated `40k-builder` worktree, reject unknown source keys on the audited `Enhancements` divide modifier instead of silently dropping them at the BSData compiler boundary.

## review findings

- No correctness findings in the scoped target diff.
- The red regression failed for the intended pre-fix reason: the compiler returned `Compiled` for a modifier containing `metadata`.
- The first green attempt exposed a legitimate `id` field in the existing source fixture; the allowlist was corrected to retain that accepted identity metadata before final verification.
- The final target diff contains only `packages/bsdata/src/compiler.ts` and `packages/bsdata/test/compiler.test.ts`; generated `bun.lock` churn was removed.
- The guard emits the existing blocking `unsupported-node` diagnostic and does not alter the typed IR, evaluator, or API contracts.

## risks

- The local fixture is not a complete upstream corpus. A future legitimate key still requires a separate source audit.
- The broader target test selection has six pre-existing failures when legacy 10th-edition snapshots are unavailable; those failures are not part of this compiler/resource slice.
- The reviewed target branch is committed as `cff8ea2` and remains isolated from the user's active checkout.

## verdict

safe with noted risk

## follow-up

Keep the two-file target commit isolated until the repository owner chooses how to integrate it. Do not widen the Enhancement resource contract or claim catalogue qualification from this run.
